create policy "allow to fetch attachments if comment access"
on "public"."comment_attachments"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT
   FROM comments c
  WHERE (c.id = comment_attachments.comment))));


create policy "allow to insert attachment if comment owner"
on "public"."comment_attachments"
as permissive
for insert
to authenticated
with check (rls_helpers.is_same_user(( SELECT c.created_by
   FROM comments c
  WHERE (c.id = comment_attachments.comment))));



