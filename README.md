# AI FAQ Chatbot (Groq + Vercel AI SDK)

Competition-ready FAQ chatbot with:

- Streaming chat interface (message history + typing state)
- Retrieval-augmented responses (local vector store)
- Audio transcription input (`/api/transcribe`)
- Speech output (`/api/speech` with provider fallback)
- Sequential generation pipeline for stronger answer quality

## Stack

- Next.js App Router
- Vercel AI SDK (`ai`, `@ai-sdk/react`)
- Groq provider (`@ai-sdk/groq`) for chat + transcription
- Optional OpenAI provider (`@ai-sdk/openai`) for server TTS speech generation

## Setup

1. Copy environment template and fill keys:

```bash
cp .env.example .env.local
```

2. Install dependencies and run dev server:

```bash
npm install
npm run dev
```

3. Open `http://localhost:3000`.

## Sequential Generation Flow

The chat route uses a 3-step sequential chain before final streaming:

1. Rewrite user question into a retrieval-focused query.
2. Retrieve FAQ snippets from the vector store and format context.
3. Summarize snippets into planning bullets for the final response model.

Then it streams the final answer with context-grounded system instructions.

## API Routes

- `POST /api/chat`: streaming chat with tool-assisted FAQ search.
- `POST /api/transcribe`: uploads audio and returns transcript text.
- `POST /api/speech`: text-to-speech audio generation (requires `OPENAI_API_KEY`).
- `POST /api/rag/reindex`: rebuilds local FAQ vector index.

## Notes

- Groq does not provide embedding models via the AI SDK provider API today. This project uses a deterministic local vectorization fallback for RAG retrieval.
- If `OPENAI_API_KEY` is not set, speech playback falls back to browser Speech Synthesis on the client.
