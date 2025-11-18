import { GoogleGenAI } from "@google/genai";
import { AnalyticsData, Metric, TimeRange } from '../types';

export class GeminiService {
  private ai: GoogleGenAI;
  private modelId = 'gemini-2.5-flash';

  constructor() {
    const apiKey = process.env.API_KEY || '';
    this.ai = new GoogleGenAI({ apiKey });
  }

  async generateInsights(metrics: Metric[], currentRange: TimeRange, data: AnalyticsData): Promise<string> {
    if (!process.env.API_KEY) {
      return "API Key not found. Please configure the process.env.API_KEY to enable AI insights.";
    }

    // Prepare a concise summary of the data for the prompt
    const metricsSummary = metrics.map(m => `${m.label}: ${m.value} (${m.change}% ${m.trend})`).join(', ');
    const topSource = data.sources.reduce((prev, current) => (prev.value > current.value) ? prev : current).name;
    
    const prompt = `
      You are a senior data analyst for a web analytics platform.
      Analyze the following dashboard snapshot for the time range: ${currentRange}.
      
      Key Metrics: ${metricsSummary}
      Top Traffic Source: ${topSource}
      
      Please provide a 3-sentence executive summary of the performance. 
      Highlight one positive trend, one area for improvement, and one actionable recommendation.
      Keep the tone professional, concise, and encouraging.
      Do not use markdown formatting like bold or headers, just plain text or bullet points.
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: this.modelId,
        contents: prompt,
      });
      return response.text || "No insights generated.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Unable to generate insights at this moment due to a connection error.";
    }
  }

  async askQuestion(question: string, contextData: any): Promise<string> {
     if (!process.env.API_KEY) {
      return "API Key missing.";
    }

    const prompt = `
      Context Data: ${JSON.stringify(contextData).slice(0, 1000)}... (truncated)
      User Question: "${question}"
      
      Answer the user's question based on the provided data context concisely.
    `;

    try {
        const response = await this.ai.models.generateContent({
            model: this.modelId,
            contents: prompt,
        });
        return response.text || "I couldn't find an answer.";
    } catch (error) {
        return "Error processing question.";
    }
  }
}

export const geminiService = new GeminiService();
