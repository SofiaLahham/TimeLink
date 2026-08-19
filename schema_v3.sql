-- TimeLink v3 — foto de perfil (Storage) e apelidos pessoais entre amigas.

alter table public.profiles_turma add column if not exists avatar_url text;

create table if not exists public.apelidos_turma (
  user_id uuid not null references auth.users(id) on delete cascade,
  amigo_id uuid not null references auth.users(id) on delete cascade,
  apelido text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, amigo_id)
);

alter table public.apelidos_turma enable row level security;

create policy "apelidos_turma_select_own" on public.apelidos_turma
  for select using (auth.uid() = user_id);

create policy "apelidos_turma_upsert_own" on public.apelidos_turma
  for insert with check (auth.uid() = user_id);

create policy "apelidos_turma_update_own" on public.apelidos_turma
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "apelidos_turma_delete_own" on public.apelidos_turma
  for delete using (auth.uid() = user_id);

insert into storage.buckets (id, name, public)
values ('avatars_turma', 'avatars_turma', true)
on conflict (id) do nothing;

create policy "avatars_turma_public_read" on storage.objects
  for select using (bucket_id = 'avatars_turma');

create policy "avatars_turma_owner_write" on storage.objects
  for insert with check (bucket_id = 'avatars_turma' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "avatars_turma_owner_update" on storage.objects
  for update using (bucket_id = 'avatars_turma' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "avatars_turma_owner_delete" on storage.objects
  for delete using (bucket_id = 'avatars_turma' and (storage.foldername(name))[1] = auth.uid()::text);
