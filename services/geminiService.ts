import { GoogleGenAI } from "@google/genai";
import { SERVICES, COURSES, MEMBERSHIP_TIERS } from '../data';

const AI_INSTRUCTION = `
You are the AI Assistant for Master Du Qianzhang (杜乾彰師傅), a renowned Metaphysics and Feng Shui master in Hong Kong.
Your tone should be professional, wise, empathetic, and polite. You represent a high-end, luxury spiritual brand.
Use Traditional Chinese (Cantonese context permitted but keep it formal written Chinese mostly) for responses.

Knowledge Base:
1. Master Du combines traditional Chinese Metaphysics (Taoism, Feng Shui, I Ching) with Western Psychology (Hypnotherapy, NLP).
2. Membership Tiers: "Caring" ($6800), "Total Care" ($9800), "Supreme" ($12800). Mention specific benefits if asked.
3. Services: Rituals for Love (He He), Wealth, Karmic Debt, and Feng Shui for homes/offices.
4. Courses: Reiki, Tarot, Akashic Records, Six Ren (Liu Ren).

Strictly follow these rules:
- Do not make up prices. Refer to the data provided or ask the user to contact the master for a quote.
- If the user has a serious personal problem, offer empathy and suggest a consultation (Divination/Q&A) or a specific ritual.
- Emphasize the "scientific" and "psychological" approach Master Du takes, not just superstition.
- If asked about "Points", explain that 5000 points = $1 HKD.

Current available data context:
Services: ${JSON.stringify(SERVICES.map(s => s.name + " - $" + s.price))}
Courses: ${JSON.stringify(COURSES.map(c => c.name + " - $" + c.price))}
`;

export const getChatResponse = async (userMessage: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) throw new Error("API Key not found");

    const ai = new GoogleGenAI({ apiKey });
    
    // Using gemini-2.5-flash for fast, responsive chat
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: AI_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text || "抱歉，我現在無法連接到宇宙能量，請稍後再試。";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "抱歉，系統繁忙，請直接聯絡我們。";
  }
};
