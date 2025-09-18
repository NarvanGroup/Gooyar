import express from "express";

const router = express.Router();

// Mock data for contact points (in a real app, this would come from a database)
let phoneNumbers = [
  {
    id: "1",
    phone_number: "+989123456789",
    country_code: "+98",
    is_verified: true,
    is_primary: true,
    label: "Primary",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
  },
];

let whatsappAccounts = [
  {
    id: "1",
    phone_number: "+989123456789",
    account_name: "Business WhatsApp",
    is_connected: true,
    qr_code: null,
    session_data: "encrypted_session_data",
    last_connection_check: "2024-01-15T10:00:00Z",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
  },
];

let telegramAccounts = [
  {
    id: "1",
    phone_number: "+989123456789",
    username: "business_bot",
    account_name: "Business Telegram",
    is_connected: true,
    qr_code: null,
    session_data: "encrypted_session_data",
    last_connection_check: "2024-01-15T10:00:00Z",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
  },
];

let instagramAccounts = [
  {
    id: "1",
    username: "business_instagram",
    account_name: "Business Instagram",
    is_connected: true,
    access_token: "encrypted_access_token",
    refresh_token: "encrypted_refresh_token",
    last_connection_check: "2024-01-15T10:00:00Z",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
  },
];

// Phone Numbers Routes
router.get("/phone-numbers", (req, res) => {
  try {
    res.json({
      success: true,
      data: phoneNumbers,
      total: phoneNumbers.length,
    });
  } catch (error) {
    console.error("Get phone numbers error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch phone numbers",
      message: error.message,
    });
  }
});

router.post("/phone-numbers", (req, res) => {
  try {
    const { phone_number, country_code, label, is_primary } = req.body;

    if (!phone_number) {
      return res.status(400).json({
        success: false,
        error: "Phone number is required",
      });
    }

    const newPhoneNumber = {
      id: Date.now().toString(),
      phone_number,
      country_code: country_code || "+98",
      is_verified: false,
      is_primary: is_primary || false,
      label: label || "Phone",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    phoneNumbers.push(newPhoneNumber);

    res.status(201).json({
      success: true,
      data: newPhoneNumber,
      message: "Phone number added successfully",
    });
  } catch (error) {
    console.error("Add phone number error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to add phone number",
      message: error.message,
    });
  }
});

router.put("/phone-numbers/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { phone_number, country_code, label, is_primary, is_verified } =
      req.body;

    const phoneIndex = phoneNumbers.findIndex((p) => p.id === id);

    if (phoneIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "Phone number not found",
      });
    }

    phoneNumbers[phoneIndex] = {
      ...phoneNumbers[phoneIndex],
      ...(phone_number && { phone_number }),
      ...(country_code !== undefined && { country_code }),
      ...(label !== undefined && { label }),
      ...(is_primary !== undefined && { is_primary }),
      ...(is_verified !== undefined && { is_verified }),
      updated_at: new Date().toISOString(),
    };

    res.json({
      success: true,
      data: phoneNumbers[phoneIndex],
      message: "Phone number updated successfully",
    });
  } catch (error) {
    console.error("Update phone number error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update phone number",
      message: error.message,
    });
  }
});

router.delete("/phone-numbers/:id", (req, res) => {
  try {
    const { id } = req.params;
    const phoneIndex = phoneNumbers.findIndex((p) => p.id === id);

    if (phoneIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "Phone number not found",
      });
    }

    phoneNumbers.splice(phoneIndex, 1);

    res.json({
      success: true,
      message: "Phone number deleted successfully",
    });
  } catch (error) {
    console.error("Delete phone number error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete phone number",
      message: error.message,
    });
  }
});

router.post("/phone-numbers/send-otp", (req, res) => {
  try {
    const { phone_number } = req.body;

    if (!phone_number) {
      return res.status(400).json({
        success: false,
        error: "Phone number is required",
      });
    }

    // Mock OTP sending (in real app, integrate with SMS service)
    res.json({
      success: true,
      message: "OTP sent successfully",
      verification_id: "mock_verification_id_" + Date.now(),
    });
  } catch (error) {
    console.error("Send OTP error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to send OTP",
      message: error.message,
    });
  }
});

router.post("/phone-numbers/verify-otp", (req, res) => {
  try {
    const { phone_number, otp, verification_id } = req.body;

    if (!phone_number || !otp) {
      return res.status(400).json({
        success: false,
        error: "Phone number and OTP are required",
      });
    }

    // Mock OTP verification (in real app, verify with SMS service)
    res.json({
      success: true,
      message: "Phone number verified successfully",
      is_verified: true,
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to verify OTP",
      message: error.message,
    });
  }
});

// WhatsApp Routes
router.get("/whatsapp", (req, res) => {
  try {
    res.json({
      success: true,
      data: whatsappAccounts,
      total: whatsappAccounts.length,
    });
  } catch (error) {
    console.error("Get WhatsApp accounts error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch WhatsApp accounts",
      message: error.message,
    });
  }
});

router.post("/whatsapp", (req, res) => {
  try {
    const { phone_number, account_name } = req.body;

    if (!phone_number) {
      return res.status(400).json({
        success: false,
        error: "Phone number is required",
      });
    }

    const newWhatsAppAccount = {
      id: Date.now().toString(),
      phone_number,
      account_name: account_name || "WhatsApp Account",
      is_connected: false,
      qr_code: null,
      session_data: null,
      last_connection_check: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    whatsappAccounts.push(newWhatsAppAccount);

    res.status(201).json({
      success: true,
      data: newWhatsAppAccount,
      message: "WhatsApp account added successfully",
    });
  } catch (error) {
    console.error("Add WhatsApp account error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to add WhatsApp account",
      message: error.message,
    });
  }
});

router.get("/whatsapp/:id/qr-code", (req, res) => {
  try {
    const { id } = req.params;
    const account = whatsappAccounts.find((w) => w.id === id);

    if (!account) {
      return res.status(404).json({
        success: false,
        error: "WhatsApp account not found",
      });
    }

    // Mock QR code generation
    res.json({
      success: true,
      data: {
        qr_code:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        expires_at: new Date(Date.now() + 60000).toISOString(), // 1 minute
        session_id: "session_" + Date.now(),
      },
    });
  } catch (error) {
    console.error("Get WhatsApp QR code error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get QR code",
      message: error.message,
    });
  }
});

router.get("/whatsapp/:id/status", (req, res) => {
  try {
    const { id } = req.params;
    const account = whatsappAccounts.find((w) => w.id === id);

    if (!account) {
      return res.status(404).json({
        success: false,
        error: "WhatsApp account not found",
      });
    }

    res.json({
      success: true,
      data: {
        is_connected: account.is_connected,
        last_connection_check: account.last_connection_check,
        connection_error: account.is_connected ? null : "Not connected",
      },
    });
  } catch (error) {
    console.error("Check WhatsApp connection error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to check connection status",
      message: error.message,
    });
  }
});

// Telegram Routes
router.get("/telegram", (req, res) => {
  try {
    res.json({
      success: true,
      data: telegramAccounts,
      total: telegramAccounts.length,
    });
  } catch (error) {
    console.error("Get Telegram accounts error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch Telegram accounts",
      message: error.message,
    });
  }
});

router.post("/telegram", (req, res) => {
  try {
    const { phone_number, username, account_name } = req.body;

    if (!phone_number) {
      return res.status(400).json({
        success: false,
        error: "Phone number is required",
      });
    }

    const newTelegramAccount = {
      id: Date.now().toString(),
      phone_number,
      username: username || null,
      account_name: account_name || "Telegram Account",
      is_connected: false,
      qr_code: null,
      session_data: null,
      last_connection_check: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    telegramAccounts.push(newTelegramAccount);

    res.status(201).json({
      success: true,
      data: newTelegramAccount,
      message: "Telegram account added successfully",
    });
  } catch (error) {
    console.error("Add Telegram account error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to add Telegram account",
      message: error.message,
    });
  }
});

// Instagram Routes
router.get("/instagram", (req, res) => {
  try {
    res.json({
      success: true,
      data: instagramAccounts,
      total: instagramAccounts.length,
    });
  } catch (error) {
    console.error("Get Instagram accounts error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch Instagram accounts",
      message: error.message,
    });
  }
});

router.post("/instagram", (req, res) => {
  try {
    const { username, account_name } = req.body;

    if (!username) {
      return res.status(400).json({
        success: false,
        error: "Username is required",
      });
    }

    const newInstagramAccount = {
      id: Date.now().toString(),
      username,
      account_name: account_name || "Instagram Account",
      is_connected: false,
      access_token: null,
      refresh_token: null,
      last_connection_check: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    instagramAccounts.push(newInstagramAccount);

    res.status(201).json({
      success: true,
      data: newInstagramAccount,
      message: "Instagram account added successfully",
    });
  } catch (error) {
    console.error("Add Instagram account error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to add Instagram account",
      message: error.message,
    });
  }
});

export default router;
