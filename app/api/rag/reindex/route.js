import { buildVectorStore } from "@/lib/rag/vector-store";

export async function POST() {
  try {
    const payload = await buildVectorStore();
    return Response.json({
      ok: true,
      total: payload.total,
      generatedAt: payload.generatedAt,
    });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Failed to build index.",
      },
      { status: 500 },
    );
  }
}
