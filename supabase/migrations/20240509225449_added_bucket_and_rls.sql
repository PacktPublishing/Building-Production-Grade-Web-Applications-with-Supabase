create policy "tenant ticket comment upload 1sxagxu_0"
on "storage"."objects"
as permissive
for select
to authenticated
using (((bucket_id = 'comment-attachments'::text) AND (EXISTS ( SELECT
   FROM tenants
  WHERE (tenants.id = (storage.foldername(objects.name))[1]))) AND (EXISTS ( SELECT
   FROM tickets
  WHERE (tickets.id = ((storage.foldername(objects.name))[2])::bigint)))));


create policy "tenant ticket comment upload 1sxagxu_1"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (((bucket_id = 'comment-attachments'::text) AND (EXISTS ( SELECT
   FROM tenants
  WHERE (tenants.id = (storage.foldername(objects.name))[1]))) AND (EXISTS ( SELECT
   FROM tickets
  WHERE (tickets.id = ((storage.foldername(objects.name))[2])::bigint)))));



