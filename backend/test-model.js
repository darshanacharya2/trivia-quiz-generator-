import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testBasicCall() {
  try {
    console.log("Testing with gemini-2.0-flash...");
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent("Say OK");
    console.log("✓ Success:", result.response.text());
  } catch (error) {
    console.log("✗ Failed:", error.message);
  }
}

testBasicCall();
