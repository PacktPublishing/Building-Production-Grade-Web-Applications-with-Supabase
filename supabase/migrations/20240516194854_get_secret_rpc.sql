set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_secret(secretname text)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$BEGIN
  IF (auth.role() = 'service_role' OR (auth.role() IS NULL AND current_user = 'postgres')) THEN 
    RETURN (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = secretname);
  END IF;

  RAISE EXCEPTION 'no access';  
END;$function$
;


