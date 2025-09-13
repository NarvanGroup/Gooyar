import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// We'll use dynamic imports to avoid ES module issues
let TelegramClient, StringSession, Api;

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class TelegramService {
  constructor() {
    this.client = null;
    this.session = null;
    this.isConnected = false;
    this.messageHandlers = [];

    // Telegram API credentials
    this.apiId = process.env.TELEGRAM_API_ID;
    this.apiHash = process.env.TELEGRAM_API_HASH;

    // Load session from file storage
    this.sessionString = this.loadSessionFromStorage();
  }

  // Initialize the Telegram client
  async initialize() {
    try {
      if (!this.apiId || !this.apiHash) {
        throw new Error(
          "TELEGRAM_API_ID and TELEGRAM_API_HASH must be set in environment variables"
        );
      }

      // Dynamic imports to avoid ES module issues
      if (!TelegramClient) {
        const telegramModule = await import("telegram");
        TelegramClient = telegramModule.TelegramClient;
        StringSession = telegramModule.sessions.StringSession;
        Api = telegramModule.Api;
      }

      this.session = new StringSession(this.sessionString);
      this.client = new TelegramClient(
        this.session,
        parseInt(this.apiId),
        this.apiHash,
        {
          connectionRetries: 5,
        }
      );

      console.log("Telegram client initialized");

      // Try to auto-login if session exists
      if (this.sessionString) {
        try {
          await this.client.connect();
          this.isConnected = true;

          if (await this.client.isUserAuthorized()) {
            console.log("Auto-login successful with saved session");
            return { success: true, autoLoggedIn: true };
          } else {
            console.log("Saved session is invalid, need to login again");
            this.sessionString = "";
            this.saveSessionToStorage("");
          }
        } catch (error) {
          console.log("Auto-login failed:", error.message);
          this.sessionString = "";
          this.saveSessionToStorage("");
        }
      }

      return { success: true, autoLoggedIn: false };
    } catch (error) {
      console.error("Failed to initialize Telegram client:", error);
      throw error;
    }
  }

  // Step 1: Send verification code to phone number
  async sendVerificationCode(phoneNumber) {
    try {
      // Ensure we have the required classes
      if (!TelegramClient) {
        await this.initialize();
      }

      if (!this.client) {
        await this.initialize();
      }

      // Always connect first
      if (!this.isConnected) {
        await this.client.connect();
        this.isConnected = true;
        console.log("Connected to Telegram");
      }

      // Check if already authorized
      if (await this.client.isUserAuthorized()) {
        console.log("Already authorized");
        return {
          success: true,
          message: "Already logged in",
          alreadyAuthorized: true,
        };
      }

      // Send verification code
      const result = await this.client.sendCode(
        {
          apiId: parseInt(this.apiId),
          apiHash: this.apiHash,
        },
        phoneNumber
      );

      // Store phone code hash for later use
      this.phoneCodeHash = result.phoneCodeHash;
      this.phoneNumber = phoneNumber;

      return {
        success: true,
        message: "Verification code sent to phone number",
        requiresCode: true,
        phoneCodeHash: result.phoneCodeHash,
      };
    } catch (error) {
      console.error("Send verification code error:", error);
      throw error;
    }
  }

  // Step 2: Complete login with verification code
  async completeLogin(verificationCode) {
    try {
      if (!this.client || !this.isConnected) {
        throw new Error("Telegram client not connected");
      }

      if (!this.phoneCodeHash || !this.phoneNumber) {
        throw new Error("No pending verification. Please send code first.");
      }

      // Sign in with the code
      const signInResult = await this.client.invoke(
        new Api.auth.SignIn({
          phoneNumber: this.phoneNumber,
          phoneCodeHash: this.phoneCodeHash,
          phoneCode: verificationCode,
        })
      );

      // Save session string for future use
      const sessionString = this.client.session.save();
      console.log("Session string:", sessionString);

      // Save session to storage for persistence
      this.saveSessionToStorage(sessionString);
      this.sessionString = sessionString;

      // Ensure we stay connected after login
      if (!this.client.connected) {
        await this.client.connect();
        this.isConnected = true;
        console.log("Reconnected after login");
      }

      // Clear temporary data
      this.phoneCodeHash = null;

      return {
        success: true,
        message: "Successfully logged in",
        sessionString: sessionString,
      };
    } catch (error) {
      console.error("Complete login error:", error);
      throw error;
    }
  }

  // Send message to a user or chat
  async sendMessage(recipient, message) {
    try {
      // Ensure client is initialized and connected
      if (!this.client) {
        await this.initialize();
      }

      // Check connection and reconnect if needed
      if (!this.isConnected || !this.client.connected) {
        console.log("Reconnecting to Telegram...");
        await this.client.connect();
        this.isConnected = true;
      }

      console.log(`Sending message to ${recipient}: "${message}"`);

      const result = await this.client.sendMessage(recipient, {
        message: message,
      });

      console.log("Message sent successfully, ID:", result.id);

      return {
        success: true,
        messageId: result.id,
        message: "Message sent successfully",
      };
    } catch (error) {
      console.error("Send message error:", error);
      throw error;
    }
  }

  // Send message to specific user by username
  async sendMessageToUser(username, message) {
    try {
      if (!this.client || !this.isConnected) {
        throw new Error("Telegram client not connected");
      }

      // Remove @ if present
      const cleanUsername = username.startsWith("@")
        ? username.slice(1)
        : username;

      const result = await this.client.sendMessage(`@${cleanUsername}`, {
        message: message,
      });

      return {
        success: true,
        messageId: result.id,
        message: "Message sent successfully",
      };
    } catch (error) {
      console.error("Send message to user error:", error);
      throw error;
    }
  }

  // Get conversations (dialogs)
  async getConversations() {
    try {
      // Ensure client is initialized and connected
      if (!this.client) {
        await this.initialize();
      }

      // Check connection and reconnect if needed
      if (!this.isConnected || !this.client.connected) {
        console.log("Reconnecting to Telegram...");
        await this.client.connect();
        this.isConnected = true;
      }

      const dialogs = await this.client.getDialogs({
        limit: 50,
      });

      return dialogs.map((dialog) => ({
        id: dialog.id,
        name: dialog.title,
        type: dialog.isUser ? "user" : dialog.isGroup ? "group" : "channel",
        lastMessage: dialog.message
          ? {
              text: dialog.message.text,
              date: dialog.message.date,
              sender: dialog.message.senderId,
            }
          : null,
        unreadCount: dialog.unreadCount || 0,
      }));
    } catch (error) {
      console.error("Get conversations error:", error);
      throw error;
    }
  }

  // Get recent messages from a chat
  async getMessages(chatId, limit = 10) {
    try {
      // Ensure client is initialized and connected
      if (!this.client) {
        await this.initialize();
      }

      // Check connection and reconnect if needed
      if (!this.isConnected || !this.client.connected) {
        console.log("Reconnecting to Telegram...");
        await this.client.connect();
        this.isConnected = true;
      }

      const messages = await this.client.getMessages(chatId, {
        limit: limit,
      });

      return messages.map((msg) => ({
        id: msg.id,
        text: msg.text,
        date: msg.date,
        sender: msg.senderId,
        isOutgoing: msg.out,
      }));
    } catch (error) {
      console.error("Get messages error:", error);
      throw error;
    }
  }

  // Start listening for incoming messages
  async startMessageListener(callback) {
    try {
      if (!this.client || !this.isConnected) {
        throw new Error("Telegram client not connected");
      }

      // Use a simple event handler for new messages
      this.client.addEventHandler(async (event) => {
        // Check if this is a new message event
        if (event && event.message && event.message.text) {
          const message = event.message;

          // Only process incoming messages (not our own)
          if (!message.out) {
            const messageData = {
              id: message.id,
              text: message.text,
              date: message.date,
              sender: message.senderId,
              chatId: message.chatId,
              isOutgoing: false,
            };

            // Call the callback with the message data
            if (callback && typeof callback === "function") {
              await callback(messageData);
            }

            // Emit to all registered handlers
            this.messageHandlers.forEach((handler) => {
              handler(messageData);
            });
          }
        }
      });

      console.log("Message listener started");
    } catch (error) {
      console.error("Start message listener error:", error);
      throw error;
    }
  }

  // Add message handler
  addMessageHandler(handler) {
    this.messageHandlers.push(handler);
  }

  // Remove message handler
  removeMessageHandler(handler) {
    const index = this.messageHandlers.indexOf(handler);
    if (index > -1) {
      this.messageHandlers.splice(index, 1);
    }
  }

  // Get current user info
  async getCurrentUser() {
    try {
      // Ensure client is initialized and connected
      if (!this.client) {
        await this.initialize();
      }

      // Check connection and reconnect if needed
      if (!this.isConnected || !this.client.connected) {
        console.log("Reconnecting to Telegram...");
        await this.client.connect();
        this.isConnected = true;
      }

      const me = await this.client.getMe();
      return {
        id: me.id,
        username: me.username,
        firstName: me.firstName,
        lastName: me.lastName,
        phone: me.phone,
      };
    } catch (error) {
      console.error("Get current user error:", error);
      throw error;
    }
  }

  // Disconnect from Telegram
  async disconnect() {
    try {
      if (this.client && this.isConnected) {
        await this.client.disconnect();
        this.isConnected = false;
        console.log("Disconnected from Telegram");
      }
    } catch (error) {
      console.error("Disconnect error:", error);
      throw error;
    }
  }

  // Clear session and force re-login
  async clearSession() {
    try {
      if (this.client) {
        await this.client.disconnect();
      }

      // Clear session string
      this.sessionString = "";
      this.client = null;
      this.isConnected = false;
      this.session = null;

      // Clear session from storage
      this.clearSessionFromStorage();

      console.log("Session cleared, ready for new login");
    } catch (error) {
      console.error("Error clearing session:", error);
      throw error;
    }
  }

  // Get connection status
  async getStatus() {
    try {
      const isAuthorized = this.client
        ? await this.client.isUserAuthorized()
        : false;
      return {
        isConnected: this.isConnected && this.client?.connected,
        isAuthorized: isAuthorized,
        isInitialized: !!this.client,
        hasSession: !!this.sessionString,
        sessionLength: this.sessionString ? this.sessionString.length : 0,
      };
    } catch (error) {
      console.error("Error checking status:", error);
      return {
        isConnected: false,
        isAuthorized: false,
        isInitialized: !!this.client,
        hasSession: !!this.sessionString,
        sessionLength: this.sessionString ? this.sessionString.length : 0,
      };
    }
  }

  // Ensure connection is maintained
  async ensureConnection() {
    try {
      if (!this.client) {
        const initResult = await this.initialize();
        if (initResult.autoLoggedIn) {
          console.log("Auto-login successful, connection ensured");
          return;
        }
      }

      if (!this.isConnected || !this.client.connected) {
        console.log("Ensuring connection to Telegram...");
        await this.client.connect();
        this.isConnected = true;
        console.log("Connection ensured");
      }

      // Check if user is authorized
      if (!(await this.client.isUserAuthorized())) {
        console.log("User not authorized, need to login first");
        throw new Error(
          "User not authorized. Please complete login process first."
        );
      }

      console.log("User is authorized and connected");
    } catch (error) {
      console.error("Failed to ensure connection:", error);
      throw error;
    }
  }

  // Check if user is authenticated
  async isAuthenticated() {
    try {
      if (!this.client) {
        // Try to initialize and auto-login
        const initResult = await this.initialize();
        if (initResult.autoLoggedIn) {
          return true;
        }
        return false;
      }

      if (!this.isConnected || !this.client.connected) {
        await this.client.connect();
        this.isConnected = true;
      }

      return await this.client.isUserAuthorized();
    } catch (error) {
      console.error("Error checking authentication:", error);
      return false;
    }
  }

  // Session storage methods
  getSessionFilePath() {
    return path.join(__dirname, "telegram-session.json");
  }

  loadSessionFromStorage() {
    try {
      const sessionPath = this.getSessionFilePath();
      if (fs.existsSync(sessionPath)) {
        const sessionData = JSON.parse(fs.readFileSync(sessionPath, "utf8"));
        console.log("Loaded session from storage");
        return sessionData.sessionString || "";
      }
    } catch (error) {
      console.error("Error loading session from storage:", error);
    }
    return "";
  }

  saveSessionToStorage(sessionString) {
    try {
      const sessionPath = this.getSessionFilePath();
      const sessionData = {
        sessionString: sessionString,
        savedAt: new Date().toISOString(),
      };
      fs.writeFileSync(sessionPath, JSON.stringify(sessionData, null, 2));
      console.log("Session saved to storage");
    } catch (error) {
      console.error("Error saving session to storage:", error);
    }
  }

  clearSessionFromStorage() {
    try {
      const sessionPath = this.getSessionFilePath();
      if (fs.existsSync(sessionPath)) {
        fs.unlinkSync(sessionPath);
        console.log("Session cleared from storage");
      }
    } catch (error) {
      console.error("Error clearing session from storage:", error);
    }
  }
}

// Create singleton instance
const telegramService = new TelegramService();

export default telegramService;
