import { searchVectorStore } from "@/lib/rag/vector-store";

export async function retrieveFaqContext(query, options) {
  if (!query || !query.trim()) {
    return [];
  }

  const result = await searchVectorStore(query, options);

  return result.matches.map((match, idx) => ({
    rank: idx + 1,
    id: match.id,
    question: match.question,
    answer: match.answer,
    tags: match.tags,
    source: match.source,
    score: Number(match.score.toFixed(4)),
  }));
}

export function formatFaqContext(contextItems) {
  if (!Array.isArray(contextItems) || contextItems.length === 0) {
    return "";
  }

  return contextItems
    .map((item) => {
      const tags = item.tags?.length ? item.tags.join(", ") : "none";
      return [
        `Context ${item.rank} (score=${item.score}, source=${item.source}, tags=${tags})`,
        `Q: ${item.question}`,
        `A: ${item.answer}`,
      ].join("\n");
    })
    .join("\n\n");
}
