create schema if not exists "api";

create table "api"."api_keys" (
    "api_key" text not null,
    "tenant" text not null
);


alter table "api"."api_keys" enable row level security;

CREATE UNIQUE INDEX api_key_id ON api.api_keys USING btree (api_key);

CREATE UNIQUE INDEX api_key_tenant ON api.api_keys USING btree (tenant);

alter table "api"."api_keys" add constraint "api_key_id" PRIMARY KEY using index "api_key_id";

alter table "api"."api_keys" add constraint "api_key_tenant" UNIQUE using index "api_key_tenant";

alter table "api"."api_keys" add constraint "api_keys_tenant_fkey" FOREIGN KEY (tenant) REFERENCES tenants(id) not valid;

alter table "api"."api_keys" validate constraint "api_keys_tenant_fkey";


