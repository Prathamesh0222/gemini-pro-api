import { google } from "@ai-sdk/google";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, StreamingTextResponse, streamText } from "ai";

export async function POST(req: Request) {
    const reqBody = await req.json();
    if (!reqBody.data || !reqBody.data.prompt) {
        throw new Error("Invalid request body: 'data.prompt' is required.");
    }
    const prompt = reqBody.data.prompt;
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const streamingResponse = await model.generateContentStream(prompt);
    return new StreamingTextResponse(GoogleGenerativeAIStream(streamingResponse))

}