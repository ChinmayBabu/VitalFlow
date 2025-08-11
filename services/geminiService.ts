
import { GoogleGenAI, Chat } from "@google/genai";

let chat: Chat | null = null;

const getChatInstance = (): Chat => {
  if (!chat) {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are a friendly and helpful AI assistant for a blood donation service called VitalFlow. Your role is to conduct a preliminary eligibility screening for potential blood donors. Be conversational and clear.

        Your primary goals are:
        1. Ask questions one at a time to determine if the user is eligible to donate blood.
        2. Keep your responses concise and easy to understand.
        3. Explain why certain conditions (like recent tattoos, travel to certain countries, or specific medications) might lead to a temporary deferral.
        4. If a user seems ineligible, gently explain the reason and encourage them to check back later or consult with a healthcare professional.
        5. Never give medical advice. Always state that this is a preliminary screening and a final decision will be made by medical staff.
        
        Start the conversation by introducing yourself and asking the first question. Example questions to ask (one by one):
        - Are you feeling well and healthy today?
        - How old are you? (Must be between 17 and 65, typically)
        - Have you had any tattoos, piercings, or acupuncture in the last 3 months?
        - Have you traveled outside of the country in the last 6 months? If so, where?
        - Are you taking any medications?
        - Have you ever tested positive for HIV?
        
        Maintain a supportive and encouraging tone throughout.`
      },
    });
  }
  return chat;
};

export const getChatbotResponse = async (message: string): Promise<string> => {
  try {
    const chatInstance = getChatInstance();
    const response = await chatInstance.sendMessage({ message: message });
    return response.text;
  } catch (error) {
    console.error("Gemini API error:", error);
    // Invalidate chat instance on error
    chat = null;
    return "I'm sorry, an error occurred while processing your request. Please try again.";
  }
};
