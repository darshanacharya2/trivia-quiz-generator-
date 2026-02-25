import { Router } from "express";
import { generateQuiz } from "../services/claudeService.js";

export const quizRoute = Router();

const VALID_DIFFICULTIES = ["easy", "medium", "hard", "mixed"];
const VALID_COUNTS = [5, 10, 15];

quizRoute.post("/generate", async (req, res) => {
  const { topic, difficulty = "medium", count = 10 } = req.body;

  // Validation
  if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
    return res.status(400).json({ error: "Please provide a quiz topic." });
  }
  if (topic.trim().length > 150) {
    return res.status(400).json({ error: "Topic is too long. Max 150 characters." });
  }
  if (!VALID_DIFFICULTIES.includes(difficulty)) {
    return res.status(400).json({ error: `Difficulty must be one of: ${VALID_DIFFICULTIES.join(", ")}.` });
  }
  if (!VALID_COUNTS.includes(Number(count))) {
    return res.status(400).json({ error: `Question count must be one of: ${VALID_COUNTS.join(", ")}.` });
  }

  try {
    const result = await generateQuiz(topic.trim(), difficulty, Number(count));
    res.json({ topic: topic.trim(), difficulty, ...result });
  } catch (err) {
    console.error("Quiz generation error:", err);

    if (err.status === 401) {
      return res.status(500).json({ error: "Invalid API key. Check your .env file." });
    }
    if (err instanceof SyntaxError) {
      return res.status(500).json({ error: "AI returned unexpected format. Please try again." });
    }

    res.status(500).json({ error: "Failed to generate quiz. Please try again." });
  }
});
