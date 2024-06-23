import { getSupabaseAdminClient } from "@/supabase-utils/adminClient";
import { getOpenAIEmbedding } from "@/utils/openai";
import { NextResponse } from "next/server";

export async function GET() {
  const adminSupabase = getSupabaseAdminClient();
  const { data } = await adminSupabase
    .from("tickets")
    .select("id, title, description");

  for (const ticket of data) {
    const embedding = await getOpenAIEmbedding(
      "Ticket title = " + ticket.title
    );

    adminSupabase
      .from("tickets")
      .update({
        semantic_embedding: embedding,
      })
      .eq("id", ticket.id)
      .then(console.log);
  }

  return NextResponse.json({ done: true });
}
