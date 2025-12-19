import { GoogleGenAI } from "@google/genai";

/**
 * Processes a passport photo using the Gemini 2.5 Flash Image model.
 * Performs background removal and replaces it with pure white (#FFFFFF).
 */
export async function autoProcessPhotoAI(imageBase64: string): Promise<string | null> {
  try {
    // The API key must be obtained from the environment.
    // Standard initialization per guidelines.
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
      console.error("Gemini API Error: API_KEY is missing in the environment.");
      return null;
    }

    const ai = new GoogleGenAI({ apiKey: apiKey });
    
    // Clean base64 data to get raw bytes
    const base64Data = imageBase64.includes(',') ? imageBase64.split(',')[1] : imageBase64;
    
    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: 'image/jpeg'
      }
    };

    // Very specific instruction for the background removal task
    const textPart = {
      text: "Remove the background of this portrait and replace it with a solid, flat, pure white color (#FFFFFF). Do not add any shadows or artistic effects. Keep the person exactly as they are. Return ONLY the edited image as the response."
    };

    // Use the recommended model for image editing tasks
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [imagePart, textPart] }
    });

    if (!response || !response.candidates || response.candidates.length === 0) {
      throw new Error("Empty response from AI model.");
    }

    // Extract the image from the parts
    const parts = response.candidates[0].content.parts;
    for (const part of parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }

    console.warn("AI responded but no image data part was found.");
    return null;

  } catch (err) {
    console.error("Gemini AI Processing failed:", err);
    return null;
  }
}