import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  const data = await req.json();
  const ticketId = data.record.id;

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL"),
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
  );

  const { data: ticket, error } = await supabaseAdmin
    .from("tickets")
    .select("title")
    .eq("id", ticketId)
    .single();

  await supabaseAdmin.from("testtable").insert({
    content: `New ticket added: "${ticket.title}" with id: ${ticketId}`,
  });

  return new Response(JSON.stringify(ticket), {
    headers: { "Content-Type": "application/json" },
  });
});
