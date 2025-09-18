import express from "express";
import whatsappService from "../whatsapp.js";

const router = express.Router();

// Initialize WhatsApp service
router.post("/initialize", async (req, res) => {
  try {
    await whatsappService.initialize();
    res.json({ success: true, message: "WhatsApp service initialized" });
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

    const result = await whatsappService.sendVerificationCode(phoneNumber);
    res.json(result);
  } catch (error) {
    console.error("Send code error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Step 2: Complete verification with verification code
router.post("/verify-code", async (req, res) => {
  try {
    const { phoneNumber, verificationCode } = req.body;

    if (!phoneNumber || !verificationCode) {
      return res
        .status(400)
        .json({ error: "Phone number and verification code are required" });
    }

    const result = await whatsappService.completeVerification(
      phoneNumber,
      verificationCode
    );
    res.json(result);
  } catch (error) {
    console.error("Verify code error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Send message to a phone number
router.post("/send-message", async (req, res) => {
  try {
    const { phoneNumber, message } = req.body;

    if (!phoneNumber || !message) {
      return res
        .status(400)
        .json({ error: "Phone number and message are required" });
    }

    const result = await whatsappService.sendMessage(phoneNumber, message);
    res.json(result);
  } catch (error) {
    console.error("Send message error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get connection status
router.get("/status", async (req, res) => {
  try {
    const status = await whatsappService.getStatus();
    res.json({ success: true, status });
  } catch (error) {
    console.error("Get status error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Check if phone number is verified
router.get("/verify-status/:phoneNumber", async (req, res) => {
  try {
    const { phoneNumber } = req.params;
    const isVerified = await whatsappService.isPhoneNumberVerified(phoneNumber);
    res.json({ success: true, isVerified });
  } catch (error) {
    console.error("Check verification status error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Clear verification data
router.delete("/clear-verification/:phoneNumber", async (req, res) => {
  try {
    const { phoneNumber } = req.params;
    await whatsappService.clearVerification(phoneNumber);
    res.json({ success: true, message: "Verification data cleared" });
  } catch (error) {
    console.error("Clear verification error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Disconnect from WhatsApp
router.post("/disconnect", async (req, res) => {
  try {
    await whatsappService.disconnect();
    res.json({ success: true, message: "Disconnected from WhatsApp" });
  } catch (error) {
    console.error("Disconnect error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

