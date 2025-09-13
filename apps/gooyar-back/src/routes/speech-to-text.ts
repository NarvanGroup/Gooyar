// import multer from "multer";
// import express from "express";
// import { OpenAI } from "openai";
// const upload = multer();
// const router = express.Router();

// router.post("/speech-to-text", upload.single("audio"), async (req, res) => {
//   const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
//   const transcription = await openai.audio.transcriptions.create({
//     file: req.file,
//     model: "whisper-1",
//     response_format: "text",
//     language: "fa", // Farsi
//   });
//   res.json({ text: transcription });
// });
