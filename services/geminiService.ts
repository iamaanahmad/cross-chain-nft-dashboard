
import { GoogleGenAI } from "@google/genai";
import { Collection } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might have better error handling or a fallback.
  // For this environment, we'll log a warning.
  console.warn("Gemini API key not found. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const getMarketAnalysis = async (collection: Collection): Promise<string> => {
  if (!API_KEY) {
    return Promise.resolve("AI analysis is unavailable. API key is missing.");
  }

  const prompt = `
    Act as a savvy and witty NFT market analyst. Provide a brief, insightful market analysis for the following NFT collection.
    - Collection Name: "${collection.name}"
    - Blockchain: ${collection.chain}
    - Floor Price: ${collection.floorPrice} ${collection.currency}
    - Total Items: ${collection.totalItems}

    Your analysis should touch on potential market sentiment, what the floor price indicates, and a concluding remark on its potential.
    Keep the tone engaging and concise (2-3 sentences). Do not use markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.95,
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching Gemini analysis:", error);
    return "An error occurred while generating the AI analysis. Please try again later.";
  }
};
