import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_KEY);
// document.addEventListener('DOMContentLoaded', function() {
//     var tab = document.getElementById('expandable-tab');
//
//     tab.addEventListener('click', function() {
//         tab.classList.toggle('hidden');
//     });
// });

async function run(prompt) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}

console.log(await run("How might the stars align to guide a journey of self-discovery for a Gemini navigating a crossroads in life?"));
