import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function askSchoolAI(question: string, context?: any) {
  try {
    const systemInstruction = `
      You are Lumina, the AI assistant for Lumina Academy, a modern school.
      Your tone is professional, helpful, and welcoming.
      
      School Info:
      - Name: Lumina Academy
      - Levels: Pre-K to Grade 12
      - Focus: Excellence, Innovation, Holistic Development
      - Admissions: Open for next session. Fees are competitive.
      - System: Parents use this portal for admission applications, student records, and fee payments.

      User Context: ${JSON.stringify(context || {})}
      
      Instructions:
      - Answer questions about admissions, fees, and school procedures.
      - If you don't know something specific like exact fee amounts (if not provided), ask the user to contact the finance office via the dashboard.
      - Be concise.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: question }] }],
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "I'm not sure how to answer that right now.";
  } catch (error) {
    console.error("AI Error:", error);
    return "I'm having a bit of trouble connecting right now. Please try again or visit our help center.";
  }
}
