
import { GoogleGenAI, Type } from "@google/genai";
import { SummaryResult } from "../types";

const SYSTEM_INSTRUCTION = `You are a world-class academic research assistant specializing in biotechnology and molecular biology. 
Your task is to analyze scientific literature. 
Provide a comprehensive summary. 
CRITICAL REQUIREMENT: You MUST include a dedicated, detailed section on "Phage Display Peptide Technology" (噬菌体展示肽技术). 
Even if the paper does not focus solely on this, explain its relevance, potential applications, or if it's absent, how it could have been applied to the research presented.
Output MUST be in Chinese, structured for professional reading and suitable for WeChat Official Account publishing.`;

export const analyzeLiterature = async (text: string): Promise<SummaryResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Analyze the following scientific text and provide a structured summary:\n\n${text}`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          overallSummary: { type: Type.STRING, description: "A high-level executive summary of the paper." },
          keyFindings: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "List of top scientific discoveries or results."
          },
          phageDisplaySection: { 
            type: Type.STRING, 
            description: "Dedicated deep-dive into Phage Display Peptide Technology relevance in this context." 
          },
          methodology: { type: Type.STRING, description: "Detailed breakdown of techniques used." },
          conclusions: { type: Type.STRING, description: "Final thoughts and future implications." }
        },
        required: ["overallSummary", "keyFindings", "phageDisplaySection", "methodology", "conclusions"]
      }
    }
  });

  try {
    const result = JSON.parse(response.text || '{}');
    return result as SummaryResult;
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    throw new Error("Analysis failed to produce a valid report.");
  }
};
