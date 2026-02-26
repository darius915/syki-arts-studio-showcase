-- Production Auth + RLS setup for Syki-Arts
-- Run in Supabase SQL Editor as project owner.

create extension if not exists pgcrypto;

-- Optional: enforce snake_case image column and remove legacy camelCase.
alter table public.artworks
  add column if not exists image_url text;

update public.artworks
set image_url = coalesce(image_url, "imageUrl")
where "imageUrl" is not null;

alter table public.artworks
  drop column if exists "imageUrl";

-- Admin list table keyed by Supabase auth user id.
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
alter table public.artworks enable row level security;

-- Public read policies.
drop policy if exists "artworks_public_read" on public.artworks;
create policy "artworks_public_read"
on public.artworks for select
using (true);

-- Admin-only write policies for artworks.
drop policy if exists "artworks_admin_insert" on public.artworks;
create policy "artworks_admin_insert"
on public.artworks for insert
to authenticated
with check (
  exists (
    select 1 from public.admin_users au
    where au.user_id = auth.uid()
  )
);

drop policy if exists "artworks_admin_update" on public.artworks;
create policy "artworks_admin_update"
on public.artworks for update
to authenticated
using (
  exists (
    select 1 from public.admin_users au
    where au.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.admin_users au
    where au.user_id = auth.uid()
  )
);

drop policy if exists "artworks_admin_delete" on public.artworks;
create policy "artworks_admin_delete"
on public.artworks for delete
to authenticated
using (
  exists (
    select 1 from public.admin_users au
    where au.user_id = auth.uid()
  )
);

-- Only admins can read admin_users.
drop policy if exists "admin_users_admin_read" on public.admin_users;
create policy "admin_users_admin_read"
on public.admin_users for select
to authenticated
using (
  exists (
    select 1 from public.admin_users au
    where au.user_id = auth.uid()
  )
);

-- Storage policies for bucket artworks.
-- Create the bucket from Storage UI with id: artworks, public: true.

drop policy if exists "storage_artworks_public_read" on storage.objects;
create policy "storage_artworks_public_read"
on storage.objects for select
using (bucket_id = 'artworks');

drop policy if exists "storage_artworks_admin_insert" on storage.objects;
create policy "storage_artworks_admin_insert"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'artworks'
  and exists (
    select 1 from public.admin_users au
    where au.user_id = auth.uid()
  )
);

drop policy if exists "storage_artworks_admin_update" on storage.objects;
create policy "storage_artworks_admin_update"
on storage.objects for update
to authenticated
using (
  bucket_id = 'artworks'
  and exists (
    select 1 from public.admin_users au
    where au.user_id = auth.uid()
  )
)
with check (
  bucket_id = 'artworks'
  and exists (
    select 1 from public.admin_users au
    where au.user_id = auth.uid()
  )
);

drop policy if exists "storage_artworks_admin_delete" on storage.objects;
create policy "storage_artworks_admin_delete"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'artworks'
  and exists (
    select 1 from public.admin_users au
    where au.user_id = auth.uid()
  )
);

-- Add your admin user after creating account in Supabase Auth:
-- insert into public.admin_users(user_id)
-- values ('<uuid-from-auth-users>')
-- on conflict (user_id) do nothing;

