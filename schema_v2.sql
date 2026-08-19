-- TimeLink v2 — personalização de perfil (emoji, cor, onboarding) e visibilidade de perfil entre amigas.

alter table public.profiles_turma add column if not exists emoji text not null default '🙂';
alter table public.profiles_turma add column if not exists cor text not null default '#c084fc';
alter table public.profiles_turma add column if not exists onboarding_feito boolean not null default false;

create policy "profiles_turma_update_own" on public.profiles_turma
  for update using (auth.uid() = id) with check (auth.uid() = id);

create policy "profiles_turma_select_friends" on public.profiles_turma
  for select using (
    exists (
      select 1 from public.amizades_turma a
      where a.status = 'aceito'
        and ((a.de_user_id = auth.uid() and a.para_user_id = profiles_turma.id)
          or (a.para_user_id = auth.uid() and a.de_user_id = profiles_turma.id))
    )
  );
