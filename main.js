import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

const genAI = new GoogleGenerativeAI("YOUR_API_KEY");

const funcall = async () => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
Detect and extract all relevant information from a Pokémon card in the provided image. The response should be structured in the following JSON format: { \"name\": \"Pokémon name\", \"stage\": \"Evolution stage (Basic, Stage 1, Stage 2)\", \"evolvesFrom\": \"Previous Pokémon name, if applicable\", \"hp\": \"Hit Points (HP)\", \"type\": \"Pokémon type (Grass, Fire, Water, etc.)\", \"ability\": { \"name\": \"Ability name, if applicable\", \"description\": \"Ability description, if applicable\" }, \"attacks\": [ { \"name\": \"Attack name\", \"energyCost\": [{ \"energy type (e.g., Grass)\": amount }], \"damage\": \"Attack damage (if available)\", \"description\": \"Attack description (if available)\" } ], \"weakness\": { \"type\": \"Weakness type (e.g., Fire)\", \"bonus\": \"Weakness bonus (e.g., +20)\" }, \"retreatCost\": \"Number of energy cards required to retreat\", \"number\": \"Card number within the set\", \"exRule\": \"Special rules for the card, if applicable (EX, GX, etc.)\" }`;
    const imageData = fs.readFileSync("charizard.webp");

    const imagePart = {
      inlineData: {
        data: imageData.toString("base64"),
        mimeType: "image/webp",
      },
    };

    const result = await model.generateContent([{ text: prompt }, imagePart]);

    const responseText = await result.response.text();
    console.log(responseText);
  } catch (error) {
    console.error("Erro ao gerar conteúdo:", error);
  }
};

funcall();
