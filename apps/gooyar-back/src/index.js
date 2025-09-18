import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import OpenAI from "openai";
import textToSpeech from "@google-cloud/text-to-speech";
import dotenv from "dotenv";
import util from "util";
import telegramRoutes from "./routes/telegram.js";
import whatsappRoutes from "./routes/whatsapp.js";
import agentsRoutes from "./routes/agents.js";
import contactPointsRoutes from "./routes/contact-points.js";
import knowledgeBaseRoutes from "./routes/knowledge-base.js";
import processesRoutes from "./routes/processes.js";
import telegramService from "./telegram.js";
import whatsappService from "./whatsapp.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// OpenAI setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Google TTS setup
const gTTSClient = new textToSpeech.TextToSpeechClient();

// Configure multer for audio file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `audio-${Date.now()}.wav`);
  },
});

const upload = multer({ storage });

// Middleware
app.use(
  cors({
    origin: "*", // Allow all origins for testing
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// API routes
app.use("/api/v1/telegram", telegramRoutes);
app.use("/api/v1/whatsapp", whatsappRoutes);
app.use("/api/v1/agents", agentsRoutes);
app.use("/api/v1/contact-points", contactPointsRoutes);
app.use("/api/v1/knowledge-base", knowledgeBaseRoutes);
app.use("/api/v1/processes", processesRoutes);

// WebSocket connection handling
io.on("connection", (socket) => {
  console.log("Client connected");

  // Handle Telegram message events
  socket.on("telegram:send-code", async (data) => {
    try {
      const result = await telegramService.sendVerificationCode(
        data.phoneNumber
      );
      socket.emit("telegram:send-code:response", result);
    } catch (error) {
      socket.emit("telegram:send-code:response", {
        success: false,
        error: error.message,
      });
    }
  });

  socket.on("telegram:verify-code", async (data) => {
    try {
      const result = await telegramService.completeLogin(data.verificationCode);
      socket.emit("telegram:verify-code:response", result);
    } catch (error) {
      socket.emit("telegram:verify-code:response", {
        success: false,
        error: error.message,
      });
    }
  });

  // Handle WhatsApp message events
  socket.on("whatsapp:send-code", async (data) => {
    try {
      const result = await whatsappService.sendVerificationCode(
        data.phoneNumber
      );
      socket.emit("whatsapp:send-code:response", result);
    } catch (error) {
      socket.emit("whatsapp:send-code:response", {
        success: false,
        error: error.message,
      });
    }
  });

  socket.on("whatsapp:verify-code", async (data) => {
    try {
      const result = await whatsappService.completeVerification(
        data.phoneNumber,
        data.verificationCode
      );
      socket.emit("whatsapp:verify-code:response", result);
    } catch (error) {
      socket.emit("whatsapp:verify-code:response", {
        success: false,
        error: error.message,
      });
    }
  });

  socket.on("telegram:send-message", async (data) => {
    try {
      console.log("Received send message request:", data);

      // Ensure connection before sending message
      await telegramService.ensureConnection();

      const result = await telegramService.sendMessage(
        data.recipient,
        data.message
      );
      console.log("Send message result:", result);
      socket.emit("telegram:send-message:response", result);
    } catch (error) {
      console.error("Send message error:", error);
      socket.emit("telegram:send-message:response", {
        success: false,
        error: error.message,
      });
    }
  });

  socket.on("whatsapp:send-message", async (data) => {
    try {
      console.log("Received WhatsApp send message request:", data);

      const result = await whatsappService.sendMessage(
        data.phoneNumber,
        data.message
      );
      console.log("WhatsApp send message result:", result);
      socket.emit("whatsapp:send-message:response", result);
    } catch (error) {
      console.error("WhatsApp send message error:", error);
      socket.emit("whatsapp:send-message:response", {
        success: false,
        error: error.message,
      });
    }
  });

  socket.on("telegram:get-conversations", async (data) => {
    try {
      // Ensure connection before getting conversations
      await telegramService.ensureConnection();

      const conversations = await telegramService.getConversations();
      socket.emit("telegram:get-conversations:response", {
        success: true,
        conversations,
      });
    } catch (error) {
      socket.emit("telegram:get-conversations:response", {
        success: false,
        error: error.message,
      });
    }
  });

  socket.on("telegram:get-messages", async (data) => {
    try {
      // Ensure connection before getting messages
      await telegramService.ensureConnection();

      const messages = await telegramService.getMessages(
        data.chatId,
        data.limit
      );
      socket.emit("telegram:get-messages:response", {
        success: true,
        messages,
      });
    } catch (error) {
      socket.emit("telegram:get-messages:response", {
        success: false,
        error: error.message,
      });
    }
  });

  socket.on("telegram:check-auth", async () => {
    try {
      const isAuthenticated = await telegramService.isAuthenticated();
      const status = await telegramService.getStatus();
      socket.emit("telegram:check-auth:response", {
        success: true,
        isAuthenticated: isAuthenticated,
        status: status,
      });
    } catch (error) {
      socket.emit("telegram:check-auth:response", {
        success: false,
        isAuthenticated: false,
        error: error.message,
      });
    }
  });

  socket.on("telegram:clear-session", async () => {
    try {
      await telegramService.clearSession();
      socket.emit("telegram:clear-session:response", {
        success: true,
        message: "Session cleared successfully",
      });
    } catch (error) {
      socket.emit("telegram:clear-session:response", {
        success: false,
        error: error.message,
      });
    }
  });

  socket.on("telegram:start-listener", async () => {
    try {
      await telegramService.startMessageListener((messageData) => {
        // Emit incoming messages to all connected clients
        io.emit("telegram:new-message", messageData);
      });
      socket.emit("telegram:start-listener:response", {
        success: true,
        message: "Listener started",
      });
    } catch (error) {
      socket.emit("telegram:start-listener:response", {
        success: false,
        error: error.message,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Audio processing endpoint
app.post("/api/process-audio", upload.single("audio"), async (req, res) => {
  console.log("Received audio processing request");
  try {
    if (!req.file) {
      console.log("No file received in request");
      return res.status(400).json({ error: "No audio file provided" });
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error("OpenAI API key is not set in environment variables");
      return res
        .status(500)
        .json({ error: "OpenAI API key is not configured" });
    }

    console.log("File received:", req.file);

    // 1. Speech-to-Text using Whisper
    try {
      console.log("Attempting to transcribe audio...");
      const filePath = req.file.path;
      console.log("File size (bytes):", fs.statSync(filePath).size);
      const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(req.file.path),
        model: "whisper-1",
      });

      const userText = transcription.text;
      console.log("User said:", userText);

      // 2. Understand user intent using GPT
      console.log("Sending text to GPT for processing...");
      const gptResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful support assistant answering in Farsi based on provided FAQs.",
          },
          {
            role: "user",
            content: userText,
          },
        ],
      });

      const answerText = gptResponse.choices[0].message.content;
      console.log("Answer:", answerText);

      // 3. Convert answer to speech using OpenAI TTS
      console.log("Converting response to speech...");
      const ttsResponse = await openai.audio.speech.create({
        model: "tts-1-hd",
        voice: "nova", // You can also use "echo", "fable", "onyx", "nova", or "shimmer"
        input: answerText,
      });

      // Convert the audio response to base64
      const audioBuffer = await ttsResponse.arrayBuffer();
      const audioBase64 = Buffer.from(audioBuffer).toString("base64");

      // Send the audio back through WebSocket
      io.emit("audioResponse", {
        audio: audioBase64,
        timestamp: Date.now(),
      });
      console.log("Audio sent through WebSocket");

      // Clean up the uploaded file
      fs.unlinkSync(req.file.path);
      console.log("Temporary file cleaned up");

      res.json({
        message: "Audio processed and sent back successfully",
        transcription: userText,
        response: answerText,
      });
    } catch (openaiError) {
      console.error("OpenAI API Error:", {
        message: openaiError.message,
        status: openaiError.status,
        type: openaiError.type,
        code: openaiError.code,
        cause: openaiError.cause,
      });

      // Clean up the uploaded file even if there's an error
      try {
        fs.unlinkSync(req.file.path);
        console.log("Temporary file cleaned up after error");
      } catch (cleanupError) {
        console.error("Error cleaning up file:", cleanupError);
      }

      return res.status(500).json({
        error: "Failed to process audio with OpenAI",
        details: openaiError.message,
        type: openaiError.type,
        code: openaiError.code,
      });
    }
  } catch (error) {
    console.error("Error processing audio:", error);
    res
      .status(500)
      .json({ error: "Failed to process audio", details: error.message });
  }
});

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
