

create extension if not exists "vector" with schema "extensions";


alter table "public"."tickets" add column "semantic_embedding" vector(1536);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.match_tickets(search_embedding vector, match_offset integer, match_limit integer)
 RETURNS SETOF record
 LANGUAGE sql
 STABLE
AS $function$
  SELECT 
  tickets.*, 
  tickets.semantic_embedding <=> search_embedding as similiarity
  FROM tickets
  WHERE tickets.semantic_embedding <=> search_embedding < 0.4
  ORDER by tickets.semantic_embedding <=> search_embedding
  LIMIT match_limit OFFSET match_offset;
$function$
;

CREATE OR REPLACE FUNCTION public.match_tickets_count(search_embedding vector)
 RETURNS bigint
 LANGUAGE sql
 STABLE
AS $function$
  SELECT COUNT(tickets.id) FROM tickets
  WHERE tickets.semantic_embedding <=> search_embedding < 0.4;
$function$
;


