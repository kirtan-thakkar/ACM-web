import { convertToModelMessages, generateText, streamText, tool } from "ai";
import { groq } from "@ai-sdk/groq";
import { z } from "zod";
import { buildFaqSystemPrompt } from "@/lib/chat-system-prompt";
import { formatFaqContext, retrieveFaqContext } from "@/lib/rag/retrieval";

const CHAT_MODEL = process.env.GROQ_CHAT_MODEL || "openai/gpt-oss-120b";
const PLANNER_MODEL = process.env.GROQ_PLANNER_MODEL || CHAT_MODEL;
const FAQ_TOP_K = 5;
const FAQ_MIN_SCORE = 0.2;

function buildSourcesLine(items = []) {
  const sources = Array.from(new Set(items.map((item) => item.source).filter(Boolean)));
  if (sources.length === 0) {
    return "No matched FAQ sources.";
  }

  return `Matched FAQ sources: ${sources.join(", ")}`;
}

function extractLatestUserPrompt(messages = []) {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const message = messages[i];
    if (message?.role !== "user") continue;

    if (typeof message.content === "string") {
      return message.content;
    }

    if (Array.isArray(message.parts)) {
      const text = message.parts
        .filter((part) => part.type === "text")
        .map((part) => part.text)
        .join("\n");

      if (text.trim()) {
        return text;
      }
    }
  }

  return "";
}

async function runSequentialRagPlanning(userPrompt) {
  // Step 1: Rewrite the user question into a concise retrieval query.
  const rewrittenQueryResult = await generateText({
    model: groq(PLANNER_MODEL),
    temperature: 0,
    prompt: [
      "Rewrite the following FAQ question into a compact retrieval query.",
      "Return only the rewritten query, no explanation.",
      `Question: ${userPrompt}`,
    ].join("\n"),
  });

  const rewrittenQuery = rewrittenQueryResult.text.trim() || userPrompt;

  // Step 2: Retrieve FAQ context from the vector store using the rewritten query.
  const contextItems = await retrieveFaqContext(rewrittenQuery, {
    topK: FAQ_TOP_K,
    minScore: FAQ_MIN_SCORE,
  });
  const contextText = formatFaqContext(contextItems);

  // Step 3: Create a short reasoning brief from retrieved snippets for the final responder.
  if (!contextText) {
    return {
      rewrittenQuery,
      contextItems,
      contextText: "",
      planningBrief:
        "No FAQ snippets matched the current query. Respond with the FAQ-not-found fallback and ask the user to contact support.",
    };
  }

  const planningBriefResult = await generateText({
    model: groq(PLANNER_MODEL),
    temperature: 0.1,
    prompt: [
      "Summarize the FAQ snippets into response-ready bullets.",
      "Keep it factual and avoid assumptions.",
      "Limit to 5 bullets.",
      "",
      "FAQ snippets:",
      contextText,
    ].join("\n"),
  });

  return {
    rewrittenQuery,
    contextItems,
    contextText,
    planningBrief: planningBriefResult.text.trim(),
  };
}

export async function POST(req) {
  try {
    const body = await req.json();
    const messages = Array.isArray(body?.messages) ? body.messages : [];

    if (messages.length === 0) {
      return new Response("Messages are required.", { status: 400 });
    }

    const userPrompt = extractLatestUserPrompt(messages).trim();
    if (!userPrompt) {
      return new Response("A user message is required.", { status: 400 });
    }

    const { rewrittenQuery, contextItems, contextText, planningBrief } =
      await runSequentialRagPlanning(userPrompt);

    const result = streamText({
      model: groq(CHAT_MODEL),
      system: [
        buildFaqSystemPrompt(contextText),
        "",
        "Sequential planning notes:",
        `- Retrieval query: ${rewrittenQuery}`,
        `- ${buildSourcesLine(contextItems)}`,
        planningBrief,
      ].join("\n"),
      messages: convertToModelMessages(messages),
      temperature: 0.3,
      tools: {
        searchFaq: tool({
          description: "Search FAQ context for a specific user query.",
          inputSchema: z.object({
            query: z.string().min(2),
          }),
          execute: async ({ query }) => {
            const entries = await retrieveFaqContext(query, { topK: 4 });
            return { entries };
          },
        }),
      },
      maxSteps: 2,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Failed to stream response.",
      },
      { status: 500 },
    );
  }
}
