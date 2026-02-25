import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
console.log("API Key present:", !!apiKey);
console.log("API Key length:", apiKey?.length);

if (!apiKey) {
  console.error("ERROR: GEMINI_API_KEY is not set in .env file");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function testModels() {
  try {
    console.log("\n=== Testing available models ===");
    
    // Try different model names
    const modelsToTry = [
      "gemini-1.5-flash",
      "gemini-1.5-pro",
      "gemini-2.0-flash",
      "gemini-pro",
      "gemini-1.0-pro"
    ];

    for (const modelName of modelsToTry) {
      try {
        console.log(`\nTrying model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hello, can you respond with 'OK'?");
        const text = result.response.text();
        console.log(`✓ ${modelName} works! Response: ${text.substring(0, 50)}`);
        return modelName;
      } catch (err) {
        console.log(`✗ ${modelName} failed: ${err.message.substring(0, 100)}`);
      }
    }
  } catch (err) {
    console.error("Test failed:", err.message);
    process.exit(1);
  }
}

testModels();
