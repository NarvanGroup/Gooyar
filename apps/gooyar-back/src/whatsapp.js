import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class WhatsAppService {
  constructor() {
    this.client = null;
    this.isConnected = false;
    this.messageHandlers = [];

    // WhatsApp Business API credentials
    this.accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
    this.phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    this.businessAccountId = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID;
    this.webhookVerifyToken = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN;

    // Store verification data
    this.verificationData = new Map();
  }

  // Initialize the WhatsApp client
  async initialize() {
    try {
      if (!this.accessToken || !this.phoneNumberId) {
        throw new Error(
          "WHATSAPP_ACCESS_TOKEN and WHATSAPP_PHONE_NUMBER_ID must be set in environment variables"
        );
      }

      console.log("WhatsApp service initialized");
      return { success: true, message: "WhatsApp service initialized" };
    } catch (error) {
      console.error("Failed to initialize WhatsApp service:", error);
      throw error;
    }
  }

  // Step 1: Send verification code to phone number
  async sendVerificationCode(phoneNumber) {
    try {
      if (!this.accessToken || !this.phoneNumberId) {
        throw new Error("WhatsApp service not properly configured");
      }

      // Clean phone number (remove + and spaces)
      const cleanPhoneNumber = phoneNumber.replace(/[\s+]/g, "");

      // Check if already verified
      const existingVerification = this.verificationData.get(cleanPhoneNumber);
      if (existingVerification && existingVerification.isVerified) {
        return {
          success: true,
          message: "Phone number already verified",
          alreadyAuthorized: true,
        };
      }

      // For demo purposes, we'll simulate the WhatsApp Business API call
      // In production, you would make actual API calls to Facebook Graph API
      const verificationId = `verification_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      // Store verification data
      this.verificationData.set(cleanPhoneNumber, {
        verificationId,
        phoneNumber: cleanPhoneNumber,
        code: this.generateVerificationCode(),
        isVerified: false,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      });

      // In production, you would call the WhatsApp Business API:
      /*
      const response = await fetch(`https://graph.facebook.com/v21.0/${this.phoneNumberId}/request_code`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          code_method: 'SMS',
          language: 'en'
        })
      });
      */

      console.log(`Verification code sent to ${phoneNumber}`);

      return {
        success: true,
        message: "Verification code sent to phone number",
        requiresCode: true,
        verificationId,
      };
    } catch (error) {
      console.error("Send verification code error:", error);
      throw error;
    }
  }

  // Step 2: Complete verification with code
  async completeVerification(phoneNumber, verificationCode) {
    try {
      const cleanPhoneNumber = phoneNumber.replace(/[\s+]/g, "");
      const verificationData = this.verificationData.get(cleanPhoneNumber);

      if (!verificationData) {
        throw new Error("No pending verification found for this phone number");
      }

      if (verificationData.expiresAt < new Date()) {
        this.verificationData.delete(cleanPhoneNumber);
        throw new Error("Verification code has expired");
      }

      if (verificationData.code !== verificationCode) {
        throw new Error("Invalid verification code");
      }

      // Mark as verified
      verificationData.isVerified = true;
      verificationData.verifiedAt = new Date();

      // In production, you would call the WhatsApp Business API:
      /*
      const response = await fetch(`https://graph.facebook.com/v21.0/${this.phoneNumberId}/verify_code`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          code: verificationCode
        })
      });
      */

      console.log(`Phone number ${phoneNumber} verified successfully`);

      return {
        success: true,
        message: "Phone number verified successfully",
        verificationId: verificationData.verificationId,
      };
    } catch (error) {
      console.error("Complete verification error:", error);
      throw error;
    }
  }

  // Generate a 6-digit verification code for demo purposes
  generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Send message to a phone number
  async sendMessage(phoneNumber, message) {
    try {
      if (!this.accessToken || !this.phoneNumberId) {
        throw new Error("WhatsApp service not properly configured");
      }

      const cleanPhoneNumber = phoneNumber.replace(/[\s+]/g, "");

      // Check if phone number is verified
      const verificationData = this.verificationData.get(cleanPhoneNumber);
      if (!verificationData || !verificationData.isVerified) {
        throw new Error("Phone number not verified");
      }

      // In production, you would call the WhatsApp Business API:
      /*
      const response = await fetch(`https://graph.facebook.com/v21.0/${this.phoneNumberId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: cleanPhoneNumber,
          type: 'text',
          text: {
            body: message
          }
        })
      });
      */

      console.log(`Message sent to ${phoneNumber}: "${message}"`);

      return {
        success: true,
        messageId: `msg_${Date.now()}`,
        message: "Message sent successfully",
      };
    } catch (error) {
      console.error("Send message error:", error);
      throw error;
    }
  }

  // Get connection status
  async getStatus() {
    try {
      return {
        isConnected: this.isConnected,
        isInitialized: !!this.accessToken && !!this.phoneNumberId,
        hasAccessToken: !!this.accessToken,
        hasPhoneNumberId: !!this.phoneNumberId,
        verifiedNumbers: Array.from(this.verificationData.values()).filter(
          (v) => v.isVerified
        ).length,
      };
    } catch (error) {
      console.error("Error checking status:", error);
      return {
        isConnected: false,
        isInitialized: false,
        hasAccessToken: false,
        hasPhoneNumberId: false,
        verifiedNumbers: 0,
      };
    }
  }

  // Check if phone number is verified
  async isPhoneNumberVerified(phoneNumber) {
    try {
      const cleanPhoneNumber = phoneNumber.replace(/[\s+]/g, "");
      const verificationData = this.verificationData.get(cleanPhoneNumber);
      return verificationData && verificationData.isVerified;
    } catch (error) {
      console.error("Error checking phone number verification:", error);
      return false;
    }
  }

  // Disconnect from WhatsApp
  async disconnect() {
    try {
      this.isConnected = false;
      this.verificationData.clear();
      console.log("Disconnected from WhatsApp service");
    } catch (error) {
      console.error("Disconnect error:", error);
      throw error;
    }
  }

  // Clear verification data for a phone number
  async clearVerification(phoneNumber) {
    try {
      const cleanPhoneNumber = phoneNumber.replace(/[\s+]/g, "");
      this.verificationData.delete(cleanPhoneNumber);
      console.log(`Verification data cleared for ${phoneNumber}`);
    } catch (error) {
      console.error("Error clearing verification:", error);
      throw error;
    }
  }
}

// Create singleton instance
const whatsappService = new WhatsAppService();

export default whatsappService;

