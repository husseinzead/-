
import { GoogleGenAI, Type } from "@google/genai";
import type { GroundingChunk, SearchServiceResponse, VideoSummary } from '../types';

// This is a placeholder for the API key.
// In a real production environment, this should be handled securely.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY is not set in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const searchMobileIssues = async (query: string): Promise<SearchServiceResponse> => {
  if (!API_KEY) {
    throw new Error("API Key not configured.");
  }
  
  const prompt = `ابحث عن أفضل الشروحات والمقالات الاحترافية لمشكلة صيانة الجوال التالية: "${query}". وقدم ملخصاً موجزاً للحلول الشائعة. ركز على إيجاد فيديوهات تعليمية من يوتيوب ومقالات من مواقع تقنية متخصصة وموثوقة.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const summary = response.text;
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return { summary, groundingChunks };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to fetch search results from Gemini API.");
  }
};


export const summarizeVideo = async (videoUrl: string): Promise<VideoSummary> => {
  if (!API_KEY) {
    throw new Error("API Key not configured.");
  }
  
  const prompt = `أنت خبير في صيانة الهواتف المحمولة. قم بتلخيص الفيديو الموجود على الرابط التالي: ${videoUrl}. ركز على استخراج المعلومات العملية فقط باللغة العربية. أريد النتيجة بصيغة JSON حصرًا.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tools: {
              type: Type.ARRAY,
              description: "قائمة بالأدوات والمعدات المطلوبة المذكورة في الفيديو.",
              items: { type: Type.STRING }
            },
            steps: {
              type: Type.ARRAY,
              description: "قائمة مرتبة لخطوات الإصلاح أو العملية الموضحة.",
              items: { type: Type.STRING }
            },
            warnings: {
              type: Type.ARRAY,
              description: "قائمة بأي تحذيرات هامة أو نصائح احترازية تم ذكرها.",
              items: { type: Type.STRING }
            }
          },
          required: ["tools", "steps", "warnings"]
        },
      },
    });

    const jsonText = response.text;
    if (jsonText.trim().startsWith('{') && jsonText.trim().endsWith('}')) {
        return JSON.parse(jsonText) as VideoSummary;
    } else {
        console.error("Gemini API did not return valid JSON:", jsonText);
        throw new Error("فشل تحليل استجابة الملخص. حاول مرة أخرى.");
    }

  } catch (error) {
    console.error("Error calling Gemini API for video summary:", error);
    throw new Error("فشل جلب ملخص الفيديو من Gemini API.");
  }
};
