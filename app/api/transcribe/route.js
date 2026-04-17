import { experimental_transcribe as transcribe } from "ai";
import { groq } from "@ai-sdk/groq";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("audio");

    if (!(file instanceof File)) {
      return Response.json({ error: "Audio file is required." }, { status: 400 });
    }

    const bytes = new Uint8Array(await file.arrayBuffer());

    const result = await transcribe({
      model: groq.transcription(
        process.env.GROQ_TRANSCRIBE_MODEL || "whisper-large-v3-turbo",
      ),
      audio: bytes,
      mediaType: file.type || "audio/webm",
      providerOptions: {
        groq: {
          responseFormat: "verbose_json",
        },
      },
    });

    return Response.json({
      text: result.text,
      segments: result.segments ?? [],
      language: result.language ?? null,
      durationInSeconds: result.durationInSeconds ?? null,
    });
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Failed to transcribe audio.",
      },
      { status: 500 },
    );
  }
}
