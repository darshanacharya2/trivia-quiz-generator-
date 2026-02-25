import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `You are an expert trivia question writer for a fun, engaging quiz game. 
Generate high-quality multiple-choice trivia questions that are accurate, interesting, and appropriately challenging.

Return ONLY a valid JSON object — no markdown, no code fences, no extra text.

The JSON must have exactly this structure:
{
  "questions": [
    {
      "id": number starting from 1,
      "question": "string — the trivia question (clear and unambiguous)",
      "options": ["option A", "option B", "option C", "option D"],
      "correctIndex": number 0–3 (index into the options array of the correct answer),
      "explanation": "string — a fascinating 1-2 sentence explanation of why the answer is correct, with extra context",
      "funFact": "string — one bonus surprising fact related to this question topic"
    }
  ]
}

Rules:
- All 4 options must be plausible — no obviously wrong "joke" answers
- Shuffle correct answer position randomly across questions (don't always make index 0 correct)
- Questions must be factually accurate
- Mix question styles: who/what/when/where/why/how
- For "easy": well-known mainstream facts
- For "medium": requires some knowledge but not obscure
- For "hard": specialist knowledge, tricky details, or surprising facts
- For "mixed": vary difficulty across questions
- Keep questions concise — under 25 words each
- Make explanations genuinely interesting and educational`;

/**
 * Generates a trivia quiz using Gemini.
 * @param {string} topic - The quiz topic
 * @param {string} difficulty - easy | medium | hard | mixed
 * @param {number} count - Number of questions (5, 10, or 15)
 */
export async function generateQuiz(topic, difficulty, count) {
  const userPrompt = `Generate exactly ${count} trivia questions about: "${topic}"
Difficulty: ${difficulty}
Make them varied, interesting, and accurate.`;

  try {
    // Try with gemini-2.0-flash (requires paid billing)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(`${SYSTEM_PROMPT}\n\n${userPrompt}`);

    const text = result.response.text().trim();
    const cleaned = text.replace(/^```json?\n?/, "").replace(/\n?```$/, "");
    const parsed = JSON.parse(cleaned);

    if (!Array.isArray(parsed.questions) || parsed.questions.length === 0) {
      throw new Error("Invalid quiz format returned from AI.");
    }

    return parsed;
  } catch (error) {
    // Check if it's a quota error
    if (error.message.includes("quota") || error.message.includes("429")) {
      throw new Error("API quota exceeded. Please enable billing in your Google Cloud project or wait for quota reset.");
    }
    
    console.error("Error generating quiz:", error.message);
    throw new Error(`Failed to generate quiz: ${error.message}`);
  }
}
