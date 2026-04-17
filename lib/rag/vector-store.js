import { promises as fs } from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data");
const FAQ_SOURCE_PATH = path.join(DATA_DIR, "faqs.json");
const VECTOR_STORE_PATH = path.join(DATA_DIR, "faq-vectors.json");
const VECTOR_DIMENSIONS = 256;

function normalizeText(text = "") {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function tokenize(text = "") {
  return normalizeText(text).split(" ").filter(Boolean);
}

function hashToken(token, dimensions = VECTOR_DIMENSIONS) {
  let hash = 2166136261;
  for (let i = 0; i < token.length; i += 1) {
    hash ^= token.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash) % dimensions;
}

function createVectorFromText(text, dimensions = VECTOR_DIMENSIONS) {
  const vec = new Array(dimensions).fill(0);
  const tokens = tokenize(text);

  for (let i = 0; i < tokens.length; i += 1) {
    const unigram = tokens[i];
    vec[hashToken(unigram, dimensions)] += 1;

    if (i < tokens.length - 1) {
      const bigram = `${tokens[i]}_${tokens[i + 1]}`;
      vec[hashToken(bigram, dimensions)] += 0.75;
    }
  }

  const magnitude = Math.sqrt(vec.reduce((sum, value) => sum + value * value, 0));
  if (magnitude === 0) {
    return vec;
  }

  return vec.map((value) => value / magnitude);
}

function cosineSimilarity(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) {
    return 0;
  }

  let dot = 0;
  for (let i = 0; i < a.length; i += 1) {
    dot += a[i] * b[i];
  }

  return dot;
}

async function ensureDataDirectory() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function loadFaqDocuments() {
  const raw = await fs.readFile(FAQ_SOURCE_PATH, "utf8");
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? parsed : [];
}

export async function buildVectorStore() {
  const docs = await loadFaqDocuments();
  const entries = docs.map((doc) => {
    const content = `${doc.question ?? ""}\n${doc.answer ?? ""}\n${(doc.tags || []).join(" ")}`;
    return {
      id: doc.id,
      question: doc.question,
      answer: doc.answer,
      tags: Array.isArray(doc.tags) ? doc.tags : [],
      source: doc.source ?? "faq",
      content,
      vector: createVectorFromText(content),
    };
  });

  const payload = {
    dimensions: VECTOR_DIMENSIONS,
    generatedAt: new Date().toISOString(),
    total: entries.length,
    entries,
  };

  await ensureDataDirectory();

  try {
    await fs.writeFile(VECTOR_STORE_PATH, JSON.stringify(payload, null, 2), "utf8");
  } catch {
    // Ignore write failures in read-only environments and serve in-memory payload.
  }

  return payload;
}

export async function loadOrCreateVectorStore() {
  try {
    const raw = await fs.readFile(VECTOR_STORE_PATH, "utf8");
    const parsed = JSON.parse(raw);

    if (Array.isArray(parsed?.entries) && parsed.entries.length > 0) {
      return parsed;
    }
  } catch {
    // Build if file does not exist or parse fails.
  }

  return buildVectorStore();
}

export async function searchVectorStore(query, options = {}) {
  const { topK = 4, minScore = 0.16 } = options;
  const index = await loadOrCreateVectorStore();
  const queryVector = createVectorFromText(query, index.dimensions || VECTOR_DIMENSIONS);

  const scored = index.entries
    .map((entry) => ({
      ...entry,
      score: cosineSimilarity(queryVector, entry.vector),
    }))
    .filter((entry) => entry.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  return {
    query,
    total: scored.length,
    matches: scored,
    indexMeta: {
      generatedAt: index.generatedAt,
      totalEntries: index.total,
    },
  };
}
