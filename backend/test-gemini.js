require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testGemini() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is missing from .env");
    return;
  }
  
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    const result = await model.generateContent("Hello, are you working?");
    console.log("Gemini Response:", result.response.text());
  } catch (error) {
    console.error("Gemini Error:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
    }
  }
}

testGemini();
