import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL"),
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
  );

  const fourWeeksAgo = new Date(
    Date.now() - 4 * 7 * 24 * 60 * 60 * 1000
  ).toISOString();

  const { data: tickets, error } = await supabaseAdmin
    .from("tickets")
    .select("*")
    .lte("created_at", fourWeeksAgo)
    .eq("status", "open");

  if (tickets && tickets.length > 0) {
    await supabaseAdmin.from("testtable").insert(
      tickets.map((ticket) => {
        return { content: `Ticket ${ticket.id} is due (${ticket.title})!` };
      })
    );
  }

  return new Response("processed tickets", {
    headers: { "Content-type": "text/plain" },
  });
});
