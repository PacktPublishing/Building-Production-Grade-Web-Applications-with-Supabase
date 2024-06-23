drop policy "access own user data" on "public"."service_users";

create policy "access own user data"
on "public"."service_users"
as permissive
for select
to authenticated
using ((supabase_user = ( SELECT auth.uid() AS uid)));



