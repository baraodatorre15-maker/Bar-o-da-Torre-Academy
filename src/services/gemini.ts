import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface Message {
  role: "user" | "model";
  parts: { text: string }[];
}

export async function sendMessage(history: Message[], message: string) {
  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: "You are Lumina AI, a brilliant and creative assistant. You help users with writing, brainstorming, coding, and problem-solving. Your tone is sophisticated, helpful, and inspiring.",
    },
    history: history,
  });

  const response: GenerateContentResponse = await chat.sendMessage({ message });
  return response.text;
}

export async function* sendMessageStream(history: Message[], message: string) {
  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: "You are Lumina AI, a brilliant and creative assistant. You help users with writing, brainstorming, coding, and problem-solving. Your tone is sophisticated, helpful, and inspiring.",
    },
    history: history,
  });

  const response = await chat.sendMessageStream({ message });
  for await (const chunk of response) {
    const c = chunk as GenerateContentResponse;
    yield c.text;
  }
}

export async function analyzeImage(imageBuffer: string, prompt: string) {
  const response: GenerateContentResponse = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: imageBuffer,
          },
        },
        { text: prompt },
      ],
    },
  });
  return response.text;
}
