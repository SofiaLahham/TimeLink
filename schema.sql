-- Grade da Galera — schema isolado no mesmo projeto Supabase do Domus.
-- Tabelas com sufixo _turma para não colidir com nada do Domus.

create table public.profiles_turma (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text not null,
  chave text unique not null,
  created_at timestamptz not null default now()
);

alter table public.profiles_turma enable row level security;

create policy "profiles_turma_select_own" on public.profiles_turma
  for select using (auth.uid() = id);

create policy "profiles_turma_insert_own" on public.profiles_turma
  for insert with check (auth.uid() = id);

-- resolve uma chave em (user_id, nome) sem expor a tabela inteira
create or replace function public.resolve_chave_turma(p_chave text)
returns table(user_id uuid, nome text)
language sql
security definer
set search_path = public
as $$
  select id, nome from public.profiles_turma where chave = upper(p_chave);
$$;

grant execute on function public.resolve_chave_turma(text) to authenticated;

create table public.amizades_turma (
  id uuid primary key default gen_random_uuid(),
  de_user_id uuid not null references auth.users(id) on delete cascade,
  para_user_id uuid not null references auth.users(id) on delete cascade,
  de_nome text,
  para_nome text,
  status text not null default 'pendente' check (status in ('pendente','aceito')),
  created_at timestamptz not null default now(),
  unique (de_user_id, para_user_id)
);

alter table public.amizades_turma enable row level security;

create policy "amizades_turma_select" on public.amizades_turma
  for select using (auth.uid() = de_user_id or auth.uid() = para_user_id);

create policy "amizades_turma_insert" on public.amizades_turma
  for insert with check (auth.uid() = de_user_id and de_user_id <> para_user_id);

create policy "amizades_turma_update" on public.amizades_turma
  for update using (auth.uid() = para_user_id or auth.uid() = de_user_id);

create policy "amizades_turma_delete" on public.amizades_turma
  for delete using (auth.uid() = de_user_id or auth.uid() = para_user_id);

create or replace function public.amizades_turma_fill_nomes()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  select nome into new.de_nome from public.profiles_turma where id = new.de_user_id;
  select nome into new.para_nome from public.profiles_turma where id = new.para_user_id;
  return new;
end;
$$;

create trigger trg_amizades_turma_fill_nomes
  before insert on public.amizades_turma
  for each row execute function public.amizades_turma_fill_nomes();

create table public.aulas_turma (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  dia int not null check (dia between 0 and 6),
  sigla text,
  inicio time not null,
  fim time not null,
  predio text,
  sala text,
  created_at timestamptz not null default now()
);

alter table public.aulas_turma enable row level security;

create policy "aulas_turma_select_own" on public.aulas_turma
  for select using (auth.uid() = user_id);

create policy "aulas_turma_select_friends" on public.aulas_turma
  for select using (
    exists (
      select 1 from public.amizades_turma a
      where a.status = 'aceito'
        and ((a.de_user_id = auth.uid() and a.para_user_id = aulas_turma.user_id)
          or (a.para_user_id = auth.uid() and a.de_user_id = aulas_turma.user_id))
    )
  );

create policy "aulas_turma_insert_own" on public.aulas_turma
  for insert with check (auth.uid() = user_id);

create policy "aulas_turma_update_own" on public.aulas_turma
  for update using (auth.uid() = user_id);

create policy "aulas_turma_delete_own" on public.aulas_turma
  for delete using (auth.uid() = user_id);
