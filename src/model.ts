import { OpenAIClient } from "@anvia/openai";
import "dotenv/config"

 const client = new OpenAIClient({
  apiKey: process.env.OPENAI_API_KEY!,
  baseUrl: process.env.OPENAI_BASE_URL,
});

export function getModel(modelId? : string) {
    const model = client.completionModel({
      modelId: modelId || "deepseek-v4.1-flash",
    });
    return model
}

