set check_function_bodies = off;

CREATE OR REPLACE FUNCTION rls_helpers.file_exists_on_ticket(ticket_id bigint)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$BEGIN
 RETURN EXISTS (SELECT FROM storage.objects o
   WHERE (storage.foldername(o.name))[2]::int8 = ticket_id);
END;$function$
;


