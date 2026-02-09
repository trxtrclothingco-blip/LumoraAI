import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { askLumora } from "./ai.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/chat", async (req, res) => {
  const { userId, message } = req.body;

  if (!userId || !message) {
    return res.status(400).json({ error: "Missing userId or message" });
  }

  const reply = await askLumora(userId, message);
  res.json({ reply });
});

app.listen(3000, () => {
  console.log("🌙 Lumora is running on http://localhost:3000");
});
