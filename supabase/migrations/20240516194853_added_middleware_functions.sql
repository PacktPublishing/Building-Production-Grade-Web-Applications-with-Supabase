revoke update on table "public"."tickets" from "authenticated";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_most_recent_tickets()
 RETURNS json
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$BEGIN
  RETURN (
    SELECT json_agg(t.*) FROM (
      SELECT * FROM tickets
      WHERE tickets.tenant = 
       current_setting('request.headers', true)::json->>'x-tenant'
      ORDER BY tickets.created_at DESC 
      LIMIT 10
    ) t
  );
END;$function$
;

CREATE OR REPLACE FUNCTION public.my_api_middleware()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE 
given_api_key text := current_setting('request.headers', true)::json->>'x-tenant-api-key';
given_tenant text := current_setting('request.headers', true)::json->>'x-tenant';
given_request_path text := current_setting('request.path')::text;
grant_access boolean := false;
begin
  IF given_request_path != '/rpc/get_most_recent_tickets' THEN 
    RETURN; -- don't limit anything else
  ELSE 
    grant_access := (EXISTS(
      SELECT FROM api.api_keys WHERE api_key = given_api_key AND tenant = given_tenant
    ));

    IF grant_access = true THEN 
      RETURN; -- let the request pass through
    END IF;
  END IF;


  
  RAISE SQLSTATE 'PGRST' USING
  message = json_build_object(
    'code',    '123',
    'message', 'No permission found',
    'details', 'Wrong api key or tenant',
    'hint',    'Request your api key with your admin')::text,
  detail = json_build_object(
    'status',  403,
    'headers', json_build_object(
      'X-My-Custom-Response-header', 'Some data'))::text;

end;
$function$
;

ALTER ROLE authenticator
  SET pgrst.db_pre_request = 'public.my_api_middleware';

