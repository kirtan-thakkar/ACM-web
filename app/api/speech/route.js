import { experimental_generateSpeech as generateSpeech } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req) {
  try {
    const body = await req.json();
    const text = typeof body?.text === "string" ? body.text.trim() : "";

    if (!text) {
      return Response.json({ error: "Text is required." }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        {
          error:
            "Speech synthesis provider key is missing. Set OPENAI_API_KEY to enable server TTS.",
          code: "SPEECH_PROVIDER_NOT_CONFIGURED",
        },
        { status: 400 },
      );
    }

    const result = await generateSpeech({
      model: openai.speech(process.env.OPENAI_SPEECH_MODEL || "gpt-4o-mini-tts"),
      text,
      voice: body?.voice || process.env.OPENAI_SPEECH_VOICE || "alloy",
      language: body?.language || "en",
    });

    return Response.json({
      audioBase64: result.audio.base64,
      mimeType: "audio/mpeg",
      warnings: result.warnings ?? [],
    });
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Failed to generate speech.",
      },
      { status: 500 },
    );
  }
}
