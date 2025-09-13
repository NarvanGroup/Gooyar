import express from "express";
import telegramService from "../telegram.js";

const router = express.Router();

// Initialize Telegram service
router.post("/initialize", async (req, res) => {
  try {
    await telegramService.initialize();
    res.json({ success: true, message: "Telegram service initialized" });
  } catch (error) {
    console.error("Initialize error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Step 1: Send verification code to phone number
router.post("/send-code", async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ error: "Phone number is required" });
    }

    const result = await telegramService.sendVerificationCode(phoneNumber);
    res.json(result);
  } catch (error) {
    console.error("Send code error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Step 2: Complete login with verification code
router.post("/verify-code", async (req, res) => {
  try {
    const { verificationCode } = req.body;

    if (!verificationCode) {
      return res.status(400).json({ error: "Verification code is required" });
    }

    const result = await telegramService.completeLogin(verificationCode);
    res.json(result);
  } catch (error) {
    console.error("Verify code error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Send message to a user or chat
router.post("/send-message", async (req, res) => {
  try {
    const { recipient, message } = req.body;

    if (!recipient || !message) {
      return res
        .status(400)
        .json({ error: "Recipient and message are required" });
    }

    const result = await telegramService.sendMessage(recipient, message);
    res.json(result);
  } catch (error) {
    console.error("Send message error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Send message to user by username
router.post("/send-message-to-user", async (req, res) => {
  try {
    const { username, message } = req.body;

    if (!username || !message) {
      return res
        .status(400)
        .json({ error: "Username and message are required" });
    }

    const result = await telegramService.sendMessageToUser(username, message);
    res.json(result);
  } catch (error) {
    console.error("Send message to user error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get messages from a chat
router.get("/messages/:chatId", async (req, res) => {
  try {
    const { chatId } = req.params;
    const { limit = 10 } = req.query;

    if (!chatId) {
      return res.status(400).json({ error: "Chat ID is required" });
    }

    const messages = await telegramService.getMessages(chatId, parseInt(limit));
    res.json({ success: true, messages });
  } catch (error) {
    console.error("Get messages error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get current user info
router.get("/me", async (req, res) => {
  try {
    const user = await telegramService.getCurrentUser();
    res.json({ success: true, user });
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get conversations (dialogs)
router.get("/conversations", async (req, res) => {
  try {
    const conversations = await telegramService.getConversations();
    res.json({ success: true, conversations });
  } catch (error) {
    console.error("Get conversations error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get connection status
router.get("/status", async (req, res) => {
  try {
    const status = telegramService.getStatus();
    res.json({ success: true, status });
  } catch (error) {
    console.error("Get status error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Start message listener
router.post("/start-listener", async (req, res) => {
  try {
    await telegramService.startMessageListener((messageData) => {
      // This callback will be called for each incoming message
      console.log("Received message:", messageData);
      // You can emit this to WebSocket clients here
    });

    res.json({ success: true, message: "Message listener started" });
  } catch (error) {
    console.error("Start listener error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Disconnect from Telegram
router.post("/disconnect", async (req, res) => {
  try {
    await telegramService.disconnect();
    res.json({ success: true, message: "Disconnected from Telegram" });
  } catch (error) {
    console.error("Disconnect error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
