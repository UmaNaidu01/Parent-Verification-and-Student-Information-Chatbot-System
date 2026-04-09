require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return console.log("No API Key");
  const genAI = new GoogleGenerativeAI(apiKey);
  try {
    // There is no listModels in the standard SDK easily, it's usually via the client library.
    // In @google/generative-ai there isn't a direct listModels call.
    // We can try to fetch it manually.
    const axios = require('axios');
    const resp = await axios.get(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    console.log(JSON.stringify(resp.data, null, 2));
  } catch (e) {
    console.error(e.message);
    if (e.response && e.response.data) console.error(e.response.data);
  }
}
listModels();
