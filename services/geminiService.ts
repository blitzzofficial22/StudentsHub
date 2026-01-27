import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion } from "../types";

// NOTE: In a real production app, ensure API_KEY is managed securely.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const generateQuiz = async (topic: string): Promise<QuizQuestion[]> => {
  if (!apiKey) return [];

  const prompt = `Generate a 5-question multiple choice quiz about "${topic}" for nursing students. 
  Each question should have 4 options. 
  Provide the correct answer text strictly matching one of the options.
  Provide a short explanation.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              correctAnswer: { type: Type.STRING },
              explanation: { type: Type.STRING }
            },
            required: ["question", "options", "correctAnswer", "explanation"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as QuizQuestion[];
  } catch (error) {
    console.error("GenAI Quiz Error:", error);
    return [];
  }
};

export const askAIStudyBuddy = async (question: string): Promise<string> => {
  if (!apiKey) return "AI Configuration Error: Missing API Key.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an expert nursing and medical tutor. Answer the following question concisely and clearly: ${question}`,
      config: {
        maxOutputTokens: 500,
      }
    });
    return response.text || "No response generated.";
  } catch (error) {
    console.error("GenAI Chat Error:", error);
    return "Sorry, I'm having trouble connecting to the brain database right now.";
  }
};

export const getStudyRecommendations = async (weakAreas: string[]): Promise<string> => {
  if (!apiKey) return "Please configure API Key.";
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `The student is weak in the following areas: ${weakAreas.join(', ')}. Provide a brief, bulleted study plan.`,
    });
    return response.text || "No recommendations available.";
  } catch (error) {
    return "Could not generate recommendations.";
  }
}
