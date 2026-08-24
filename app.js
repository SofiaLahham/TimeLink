(function(){
  const DIA_ORDEM = [1,2,3,4,5]; // seg..sex (sem fim de semana)
  const DIA_NOME = {0:'Domingo',1:'Segunda',2:'Terça',3:'Quarta',4:'Quinta',5:'Sexta',6:'Sábado'};
  const DIA_ABREV = {0:'Dom',1:'Seg',2:'Ter',3:'Qua',4:'Qui',5:'Sex',6:'Sáb'};
  const CORES = ['#f472b6','#c084fc','#60a5fa','#4ade80','#fbbf24','#fb7185','#2dd4bf','#a78bfa','#f87171','#fb923c','#facc15','#34d399','#22d3ee','#818cf8','#e879f9','#94a3b8'];
  const EMOJIS = [
    '🙂','😄','😎','🥳','🤓','😴','🥰','😇','😉','😌','🤩','🥹','😅','🫠','🤠','😏',
    '📚','✏️','📝','🎓','💻','🧠','🔬','📐','🏋️','🏃','🧘','⚽','🚴','🥗','🔍','💧',
    '💊','🧴','🪥','🧹','🛒','🐶','💼','👠','💰','📖','🎧','🎨','🎹','🌸','⭐','🔥',
    '💜','☕','🐱','🦋','🍀','🌙','⚡','🍕','🍔','🍜','🍩','🍎','🎮','🎬','🎵','⚽',
    '🏀','🏈','🎾','🚗','✈️','🏖️','⛰️','🌊','🌈','☀️','❄️','🎉','🎁','💡','🔑','📌'
  ];
  const BLOCOS = [
    { label:'AB', inicio:'08:00', fim:'09:30' },
    { label:'CD', inicio:'09:45', fim:'11:15' },
    { label:'EE1', inicio:'11:30', fim:'13:00' },
    { label:'GH', inicio:'14:00', fim:'15:30' },
    { label:'IJ', inicio:'15:45', fim:'17:15' },
    { label:'JK', inicio:'17:30', fim:'19:00' },
    { label:'LM', inicio:'19:15', fim:'20:45' },
    { label:'NP', inicio:'21:00', fim:'22:30' },
  ];
  const TIPOS = [
    { v:'aula', label:'Aula' },
    { v:'prova', label:'Prova' },
    { v:'trabalho', label:'Trabalho' },
  ];
  const TIPO_COR = { prova:'#ef4444', trabalho:'#f59e0b' };

  const ICONS = {
    gear: `<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 13a7.6 7.6 0 0 0 .1-1 7.6 7.6 0 0 0-.1-1l2-1.5-2-3.4-2.4 1a7.7 7.7 0 0 0-1.7-1L14.8 3h-4l-.5 2.6a7.7 7.7 0 0 0-1.7 1l-2.4-1-2 3.4L6 11a7.6 7.6 0 0 0 0 2l-2 1.5 2 3.4 2.4-1a7.7 7.7 0 0 0 1.7 1l.5 2.6h4l.5-2.6a7.7 7.7 0 0 0 1.7-1l2.4 1 2-3.4-2-1.5z"/></svg>`,
    calendar: `<svg class="icon" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>`,
    link: `<svg class="icon" viewBox="0 0 24 24"><path d="M9 15l6-6"/><path d="M10 5.5l1-1a4 4 0 0 1 5.7 5.7l-1.5 1.5"/><path d="M14 18.5l-1 1a4 4 0 0 1-5.7-5.7l1.5-1.5"/></svg>`,
    user: `<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6"/></svg>`,
    userCircle: `<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3"/><path d="M6.3 19a6 6 0 0 1 11.4 0"/></svg>`,
    chevronLeft: `<svg class="icon" viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>`,
    x: `<svg class="icon" viewBox="0 0 24 24" style="width:16px;height:16px"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
    pencil: `<svg class="icon" viewBox="0 0 24 24" style="width:16px;height:16px"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>`,
    camera: `<svg class="icon" viewBox="0 0 24 24"><path d="M4 8a2 2 0 0 1 2-2h1.2l.8-1.5h8l.8 1.5H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8z"/><circle cx="12" cy="13" r="3.3"/></svg>`,
    copy: `<svg class="icon" viewBox="0 0 24 24"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>`,
    logout: `<svg class="icon" viewBox="0 0 24 24"><path d="M15 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9"/><path d="M10 12h11m0 0l-3.5-3.5M21 12l-3.5 3.5"/></svg>`,
    chat: `<svg class="icon" viewBox="0 0 24 24"><path d="M21 12a7 7 0 0 1-7 7H8l-5 3 1.3-4.8A7 7 0 1 1 21 12z"/></svg>`,
    send: `<svg class="icon" viewBox="0 0 24 24"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>`,
    poll: `<svg class="icon" viewBox="0 0 24 24"><path d="M6 20V10M12 20V4M18 20v-7"/></svg>`,
    plus: `<svg class="icon" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>`,
  };

  const SUPABASE_URL = "https://nugflmccfcvsvbsihfql.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_g2-SsnBrrRhlq50Pp3_Bkw_QLwf6Z0G";
  const HCAPTCHA_SITEKEY = "1c382628-fc22-4028-8ae8-0f9a3e0c047e";
  // Chamado pelo script do hCaptcha quando termina de carregar (pode ser depois
  // da tela de cadastro já estar na tela, já que o script carrega em segundo plano).
  window.onHcaptchaLoad = function(){
    const el = document.querySelector('#f-cad .h-captcha');
    if(el && !el.hasChildNodes()) window.hcaptcha.render(el, { sitekey: HCAPTCHA_SITEKEY });
  };
  const TB_PROFILES = "profiles_turma";
  const TB_AMIZADES = "amizades_turma";
  const TB_AULAS = "aulas_turma";
  const TB_APELIDOS = "apelidos_turma";
  const TB_PRESENCAS = "presencas_turma";
  const TB_CONVERSAS = "conversas_turma";
  const TB_MEMBROS = "conversa_membros_turma";
  const TB_MENSAGENS = "mensagens_turma";
  const TB_ENQUETE_OPCOES = "enquete_opcoes_turma";
  const TB_ENQUETE_VOTOS = "enquete_votos_turma";
  const BUCKET_AVATARS = "avatars_turma";

  let sb = null;
  if (window.supabase && SUPABASE_ANON_KEY) {
    sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    sb.auth.onAuthStateChange((event, sess)=>{
      if(event === 'PASSWORD_RECOVERY'){
        emRecuperacaoSenha = true;
        session = sess;
        render();
      }
    });
  }

  let session = null;
  let profile = null;         // {id, nome, chave, emoji, cor, avatar_url, onboarding_feito}
  let perfilMap = {};         // id -> {id,nome,emoji,cor,avatar_url}
  let friends = [];           // [{amizadeId, otherId, otherNome}]
  let incoming = [];          // pedidos recebidos pendentes
  let outgoing = [];          // pedidos enviados pendentes
  let myAulas = [];
  let friendAulasMap = {};    // otherId -> aulas[]
  let presencaIndex = {};     // `${aula_id}|${data}` -> vai (bool)
  let apelidos = {};          // amigoId -> apelido definido por mim
  let conversas = [];         // [{id, tipo, nome, criado_por, membros:[{user_id}], ultimaMsg}]
  let conversaAbertaId = null;
  let mensagens = [];         // mensagens da conversa aberta
  let enquetes = {};          // mensagem_id -> { opcoes:[{id,texto,ordem}], votos:[{opcao_id,user_id}] }
  let novaConversaTipo = null; // 'escolher' | 'grupo' | 'privado' | null (tela de criar)
  let novaConversaSelecionados = []; // ids de amigas escolhidas
  let realtimeChannel = null;
  let criandoEnquete = false;
  let enqueteOpcoesCount = 2;

  let authScreen = 'login';   // login | cadastro
  let tab = 'grade';          // grade | conexoes | grupos | minhaarea | perfil
  let mostrarAjustes = false;
  let currentDay = (function(){ const h = new Date().getDay(); return (h===0||h===6) ? 1 : h; })();
  let busy = false;
  let editingAulaId = null;
  let obIndex = 0;
  let obTemAula = {};
  let diasSelecionados = [];
  let tipoSelecionado = 'aula';
  let emRecuperacaoSenha = false;

  const app = document.getElementById('app');

  function showStatus(msg){
    const el = document.getElementById('status');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(showStatus._t);
    showStatus._t = setTimeout(()=>el.classList.remove('show'), 2800);
  }

  function toMin(hhmm){ const [h,m] = hhmm.split(':').map(Number); return h*60+m; }
  function minToHHMM(min){ const h=Math.floor(min/60), m=min%60; return String(h).padStart(2,'0')+':'+String(m).padStart(2,'0'); }
  function fmtRange(a,b){ return `${a} – ${b}`; }
  function fmtDataCurta(d){ return String(d.getDate()).padStart(2,'0')+'/'+String(d.getMonth()+1).padStart(2,'0'); }
  function toISODate(dt){
    return dt.getFullYear()+'-'+String(dt.getMonth()+1).padStart(2,'0')+'-'+String(dt.getDate()).padStart(2,'0');
  }
  function datasSemanaAtual(){
    const hoje = new Date();
    const diaSemana = hoje.getDay();
    const offsetSegunda = diaSemana===0 ? -6 : 1-diaSemana;
    const segunda = new Date(hoje);
    segunda.setDate(hoje.getDate()+offsetSegunda);
    const mapa = {};
    DIA_ORDEM.forEach((d,i)=>{
      const dt = new Date(segunda);
      dt.setDate(segunda.getDate()+i);
      mapa[d] = { numero: dt.getDate(), iso: toISODate(dt) };
    });
    return mapa;
  }
  function fmtDataLonga(iso){
    const dt = new Date(iso+'T00:00:00');
    return `${DIA_ABREV[dt.getDay()]}, ${String(dt.getDate()).padStart(2,'0')}/${String(dt.getMonth()+1).padStart(2,'0')}`;
  }
  function horaCurta(iso){
    const dt = new Date(iso);
    return String(dt.getHours()).padStart(2,'0')+':'+String(dt.getMinutes()).padStart(2,'0');
  }
  function semestreAtual(){
    const hoje = new Date();
    const sem = (hoje.getMonth()+1) <= 7 ? 1 : 2;
    return `${hoje.getFullYear()}/${sem}`;
  }
  function tipoBadgeHtml(tipo){
    if(!tipo || tipo==='aula') return '';
    const cor = TIPO_COR[tipo] || TIPO_COR.prova;
    const label = TIPOS.find(t=>t.v===tipo)?.label || tipo;
    return `<span class="tipo-badge" style="color:${cor};border-color:${cor}66;background:${cor}1f">${label}</span>`;
  }
  function presencaHtml(it, ehHoje){
    if(it.pessoaId === session.user.id && ehHoje){
      return `<div class="presenca-switch" data-presenca-aula="${it.aulaId}">
        <button type="button" class="${it.naoVai?'':'sel'}" data-set-vai="1">Vou</button>
        <button type="button" class="off ${it.naoVai?'sel':''}" data-set-vai="0">Não vou</button>
      </div>`;
    }
    if(it.naoVai) return `<span class="naovai-tag">Não vai hoje</span>`;
    return '';
  }
  function tipoChipsHtml(prefix, atual){
    return `<div class="days-multi" id="${prefix}-tipo">` + TIPOS.map(t=>
      `<button type="button" data-tipo="${t.v}" class="${(atual||'aula')===t.v?'sel':''}">${t.label}</button>`
    ).join('') + `</div>`;
  }
  function corDe(id){
    let h=0; for(const c of String(id)) h = (h*31 + c.charCodeAt(0))>>>0;
    return CORES[h % CORES.length];
  }
  function iniciais(nome){
    return (nome||'?').trim().split(/\s+/).slice(0,2).map(s=>s[0]).join('').toUpperCase();
  }
  // Escapa texto vindo de qualquer usuária (nome, sigla, prédio, sala, emoji, cor...)
  // antes de inserir no HTML — sem isso, uma pessoa mal-intencionada poderia colocar
  // código malicioso no próprio nome/perfil e ele rodaria na tela de quem visse.
  function esc(s){
    return String(s==null?'':s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
  function avatarHtml(p){
    if(p && p.avatar_url) return `<img src="${esc(p.avatar_url)}" alt="">`;
    return esc((p && p.emoji) || iniciais(p && p.nome));
  }
  function nomeExibido(id, nomeReal){
    return apelidos[id] || nomeReal;
  }
  function gerarChave(){
    const alf = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let s = '';
    for(let i=0;i<6;i++) s += alf[Math.floor(Math.random()*alf.length)];
    return s;
  }
  function detectarBloco(inicio, fim){
    const iMin = toMin(inicio), fMin = toMin(fim);
    const exato = BLOCOS.find(b=> toMin(b.inicio)===iMin && toMin(b.fim)===fMin);
    if(exato) return exato.label;
    const abrangidos = BLOCOS.filter(b=> toMin(b.inicio) < fMin && toMin(b.fim) > iMin);
    if(abrangidos.length) return abrangidos.map(b=>b.label).join('+');
    return '';
  }
  function blocoChipsHtml(prefix){
    return `<div class="bloco-chips">` + BLOCOS.map(b=>
      `<button type="button" class="bloco-chip" data-prefix="${prefix}" data-label="${b.label}">${b.label}<span class="t">${b.inicio}-${b.fim}</span></button>`
    ).join('') + `</div>`;
  }
  function bindBlocoChips(prefix){
    document.querySelectorAll(`.bloco-chip[data-prefix="${prefix}"]`).forEach(ch=>{
      ch.onclick = ()=>{
        const b = BLOCOS.find(x=>x.label===ch.dataset.label);
        document.getElementById(prefix+'-sigla').value = b.label;
        document.getElementById(prefix+'-inicio').value = b.inicio;
        document.getElementById(prefix+'-fim').value = b.fim;
        document.querySelectorAll(`.bloco-chip[data-prefix="${prefix}"]`).forEach(c=>c.classList.remove('sel'));
        ch.classList.add('sel');
      };
    });
  }
  function headerHtml(title, sub){
    return `<header class="top">
      <div><h1>${title}</h1>${sub? `<div class="sub">${sub}</div>` : ''}</div>
      <button class="icon-btn" id="btn-ajustes" title="Ajustes">${ICONS.gear}</button>
    </header>`;
  }

  // ---------- Tema ----------
  function systemPrefersLight(){
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  }
  function getTema(){ return localStorage.getItem('timelink-theme') || 'system'; }
  function aplicarTema(){
    const pref = getTema();
    const efetivo = pref === 'system' ? (systemPrefersLight() ? 'light' : 'dark') : pref;
    if(efetivo === 'light') document.documentElement.setAttribute('data-theme','light');
    else document.documentElement.removeAttribute('data-theme');
  }
  function setTema(pref){
    localStorage.setItem('timelink-theme', pref);
    aplicarTema();
    render();
  }

  // ---------- Supabase helpers ----------
  async function fetchProfile(){
    let tentativa = 0;
    while(tentativa < 3){
      const { data, error } = await sb.from(TB_PROFILES).select('id,nome,chave,emoji,cor,avatar_url,onboarding_feito').eq('id', session.user.id).maybeSingle();
      if(!error){ profile = data; return; }
      console.error('fetchProfile falhou (tentativa '+(tentativa+1)+'):', error);
      tentativa++;
      if(tentativa < 3) await new Promise(r=>setTimeout(r, 600));
    }
    profile = undefined; // busca falhou de verdade (não é "perfil não existe") — não trata como conta nova
  }

  async function garantirProfile(nome){
    let tentativa = 0;
    while(tentativa < 6){
      const chave = gerarChave();
      const cor = CORES[Math.floor(Math.random()*CORES.length)];
      const { error } = await sb.from(TB_PROFILES).insert({ id: session.user.id, nome, chave, cor });
      if(!error){ await fetchProfile(); return; }
      console.error('garantirProfile: insert falhou (tentativa '+(tentativa+1)+'):', error);
      if(error.code !== '23505'){ throw error; }
      // Colisão de valor único: pode ser a "chave" de convite (tenta de novo com
      // outra) OU pode ser que o perfil já existisse (mesmo id) e a busca anterior
      // só não tinha conseguido encontrá-lo — confere antes de continuar tentando,
      // pra não ficar presa insistindo em criar um perfil que já existe.
      await fetchProfile();
      if(profile) return;
      tentativa++;
    }
    throw new Error('Não foi possível gerar uma chave única, tenta de novo.');
  }

  async function updateProfile(fields){
    const { error } = await sb.from(TB_PROFILES).update(fields).eq('id', session.user.id);
    if(error){ showStatus('Erro ao salvar'); console.error(error); return; }
    Object.assign(profile, fields);
    perfilMap[profile.id] = { id: profile.id, nome: profile.nome, emoji: profile.emoji, cor: profile.cor, avatar_url: profile.avatar_url };
    showStatus('Salvo');
    render();
  }

  async function fetchAmizades(){
    const uidMe = session.user.id;
    const { data, error } = await sb.from(TB_AMIZADES).select('*')
      .or(`de_user_id.eq.${uidMe},para_user_id.eq.${uidMe}`);
    if(error){ console.error(error); return; }
    const rows = data || [];
    friends = rows.filter(r=>r.status==='aceito').map(r=>{
      const souDe = r.de_user_id === uidMe;
      return { amizadeId: r.id, otherId: souDe ? r.para_user_id : r.de_user_id, otherNome: souDe ? r.para_nome : r.de_nome };
    });
    incoming = rows.filter(r=>r.status==='pendente' && r.para_user_id===uidMe)
      .map(r=>({ amizadeId: r.id, otherId: r.de_user_id, otherNome: r.de_nome }));
    outgoing = rows.filter(r=>r.status==='pendente' && r.de_user_id===uidMe)
      .map(r=>({ amizadeId: r.id, otherId: r.para_user_id, otherNome: r.para_nome }));
  }

  async function fetchPerfis(){
    const ids = [session.user.id, ...friends.map(f=>f.otherId)];
    const { data } = await sb.from(TB_PROFILES).select('id,nome,emoji,cor,avatar_url').in('id', ids);
    perfilMap = {};
    (data||[]).forEach(p=> perfilMap[p.id] = p);
  }

  async function fetchApelidos(){
    const { data } = await sb.from(TB_APELIDOS).select('amigo_id,apelido').eq('user_id', session.user.id);
    apelidos = {};
    (data||[]).forEach(r=> apelidos[r.amigo_id] = r.apelido);
  }

  async function definirApelido(amigoId, atual){
    const novo = prompt('Apelido para essa conexão (deixe vazio pra usar o nome dela):', atual || '');
    if(novo === null) return;
    const texto = novo.trim();
    if(!texto){
      await sb.from(TB_APELIDOS).delete().eq('user_id', session.user.id).eq('amigo_id', amigoId);
    } else {
      await sb.from(TB_APELIDOS).upsert({ user_id: session.user.id, amigo_id: amigoId, apelido: texto });
    }
    await fetchApelidos();
    render();
  }

  async function fetchAulas(){
    const ids = [session.user.id, ...friends.map(f=>f.otherId)];
    const { data, error } = await sb.from(TB_AULAS).select('*').in('user_id', ids);
    if(error){ console.error(error); return; }
    const all = data || [];
    myAulas = all.filter(a=>a.user_id===session.user.id);
    friendAulasMap = {};
    friends.forEach(f=>{ friendAulasMap[f.otherId] = all.filter(a=>a.user_id===f.otherId); });
  }

  async function fetchPresencas(){
    const ids = [session.user.id, ...friends.map(f=>f.otherId)];
    const { data, error } = await sb.from(TB_PRESENCAS).select('*').in('user_id', ids);
    if(error){ console.error(error); return; }
    presencaIndex = {};
    (data || []).forEach(p=>{ presencaIndex[`${p.aula_id}|${p.data}`] = p.vai; });
  }

  async function togglePresenca(aulaId, dataISO, marcarNaoVai){
    const { error } = await sb.from(TB_PRESENCAS)
      .upsert({ aula_id: aulaId, data: dataISO, user_id: session.user.id, vai: !marcarNaoVai }, { onConflict: 'aula_id,data' });
    if(error){ showStatus('Erro ao salvar presença'); console.error(error); return; }
    await fetchPresencas();
    render();
  }

  async function fetchConversas(){
    const { data: minhas, error: e1 } = await sb.from(TB_MEMBROS).select('conversa_id').eq('user_id', session.user.id);
    if(e1){ console.error(e1); return; }
    const ids = (minhas||[]).map(m=>m.conversa_id);
    if(ids.length===0){ conversas = []; return; }
    const [{ data: convs, error: e2 }, { data: todosMembros }, { data: ultimas }] = await Promise.all([
      sb.from(TB_CONVERSAS).select('*').in('id', ids),
      sb.from(TB_MEMBROS).select('conversa_id,user_id').in('conversa_id', ids),
      sb.from(TB_MENSAGENS).select('conversa_id,texto,tipo,created_at').in('conversa_id', ids).order('created_at', { ascending:false }),
    ]);
    if(e2){ console.error(e2); return; }
    conversas = (convs||[]).map(c=>{
      const ultima = (ultimas||[]).find(m=>m.conversa_id===c.id);
      return {
        ...c,
        membros: (todosMembros||[]).filter(m=>m.conversa_id===c.id).map(m=>m.user_id),
        ultimaMsg: ultima ? (ultima.tipo==='enquete' ? `📊 ${ultima.texto}` : ultima.texto) : null,
        ultimaData: ultima ? ultima.created_at : c.created_at,
      };
    }).sort((a,b)=> new Date(b.ultimaData) - new Date(a.ultimaData));

    // busca perfil de quem estiver num grupo comigo mas ainda não conhecido
    // (ex: colega adicionada por uma amiga em comum, sem ser minha conexão direta)
    const idsDesconhecidos = [...new Set(conversas.flatMap(c=>c.membros))].filter(id=> id!==session.user.id && !perfilMap[id]);
    if(idsDesconhecidos.length){
      const { data: extras } = await sb.from(TB_PROFILES).select('id,nome,emoji,cor,avatar_url').in('id', idsDesconhecidos);
      (extras||[]).forEach(p=> perfilMap[p.id] = p);
    }
  }

  function nomeConversa(c){
    if(c.tipo==='grupo') return c.nome || 'Grupo sem nome';
    const outroId = c.membros.find(id=>id!==session.user.id);
    const p = perfilDe(outroId);
    return nomeExibido(outroId, p.nome || '?');
  }

  async function fetchMensagens(conversaId){
    const { data, error } = await sb.from(TB_MENSAGENS).select('*').eq('conversa_id', conversaId).order('created_at', { ascending:true });
    if(error){ console.error(error); return; }
    mensagens = data || [];
    const enqueteIds = mensagens.filter(m=>m.tipo==='enquete').map(m=>m.id);
    enquetes = {};
    if(enqueteIds.length){
      const [{ data: opcoes }, { data: votos }] = await Promise.all([
        sb.from(TB_ENQUETE_OPCOES).select('*').in('mensagem_id', enqueteIds).order('ordem', { ascending:true }),
        sb.from(TB_ENQUETE_VOTOS).select('*').in('mensagem_id', enqueteIds),
      ]);
      enqueteIds.forEach(id=>{
        enquetes[id] = {
          opcoes: (opcoes||[]).filter(o=>o.mensagem_id===id),
          votos: (votos||[]).filter(v=>v.mensagem_id===id),
        };
      });
    }
  }

  async function fetchVotosDaMensagem(mensagemId){
    const { data } = await sb.from(TB_ENQUETE_VOTOS).select('*').eq('mensagem_id', mensagemId);
    if(!enquetes[mensagemId]) enquetes[mensagemId] = { opcoes:[], votos:[] };
    enquetes[mensagemId].votos = data || [];
  }

  function assinarRealtime(conversaId){
    if(realtimeChannel){ sb.removeChannel(realtimeChannel); realtimeChannel = null; }
    realtimeChannel = sb.channel(`conversa-${conversaId}`)
      .on('postgres_changes', { event:'INSERT', schema:'public', table:TB_MENSAGENS, filter:`conversa_id=eq.${conversaId}` }, async payload=>{
        if(mensagens.some(m=>m.id===payload.new.id)) return;
        mensagens = [...mensagens, payload.new];
        if(payload.new.tipo==='enquete'){
          const { data: opcoes } = await sb.from(TB_ENQUETE_OPCOES).select('*').eq('mensagem_id', payload.new.id).order('ordem', { ascending:true });
          enquetes[payload.new.id] = { opcoes: opcoes||[], votos: [] };
        }
        render();
      })
      .on('postgres_changes', { event:'*', schema:'public', table:TB_ENQUETE_VOTOS }, async payload=>{
        const msgId = (payload.new && payload.new.mensagem_id) || (payload.old && payload.old.mensagem_id);
        if(!msgId || !enquetes[msgId]) return;
        await fetchVotosDaMensagem(msgId);
        render();
      })
      .subscribe();
  }

  async function abrirConversa(id){
    conversaAbertaId = id;
    await fetchMensagens(id);
    assinarRealtime(id);
    render();
  }

  function sairDaConversa(){
    if(realtimeChannel){ sb.removeChannel(realtimeChannel); realtimeChannel = null; }
    conversaAbertaId = null; mensagens = []; enquetes = {};
  }

  async function enviarMensagem(texto){
    const t = texto.trim();
    if(!t || !conversaAbertaId) return;
    const conversaId = conversaAbertaId;
    const { error } = await sb.from(TB_MENSAGENS).insert({ conversa_id: conversaId, user_id: session.user.id, tipo:'texto', texto: t });
    if(error){ showStatus('Erro ao enviar mensagem'); console.error(error); return; }
    // não depende só do tempo real pra atualizar a própria tela (rede lenta, etc.)
    if(conversaAbertaId===conversaId){ await fetchMensagens(conversaId); render(); }
  }

  async function criarEnquete(pergunta, opcoesTexto){
    if(!conversaAbertaId) return;
    const conversaId = conversaAbertaId;
    const { data: msg, error } = await sb.from(TB_MENSAGENS)
      .insert({ conversa_id: conversaId, user_id: session.user.id, tipo:'enquete', texto: pergunta }).select().single();
    if(error){ showStatus('Erro ao criar enquete'); console.error(error); return; }
    const linhas = opcoesTexto.map((texto,i)=>({ mensagem_id: msg.id, texto, ordem:i }));
    const { error: e2 } = await sb.from(TB_ENQUETE_OPCOES).insert(linhas);
    if(e2){ showStatus('Erro ao salvar opções'); console.error(e2); return; }
    if(conversaAbertaId===conversaId){ await fetchMensagens(conversaId); render(); }
  }

  async function votarEnquete(mensagemId, opcaoId){
    const { error } = await sb.from(TB_ENQUETE_VOTOS)
      .upsert({ mensagem_id: mensagemId, opcao_id: opcaoId, user_id: session.user.id }, { onConflict: 'mensagem_id,user_id' });
    if(error){ showStatus('Erro ao votar'); console.error(error); return; }
    await fetchVotosDaMensagem(mensagemId);
    render();
  }

  async function criarConversa(tipo, membrosIds, nome){
    if(tipo==='privado'){
      const outroId = membrosIds[0];
      const existente = conversas.find(c=> c.tipo==='privado' && c.membros.includes(outroId));
      if(existente){ novaConversaTipo=null; novaConversaSelecionados=[]; return abrirConversa(existente.id); }
    }
    const { data, error } = await sb.from(TB_CONVERSAS)
      .insert({ tipo, nome: tipo==='grupo' ? nome : null, criado_por: session.user.id }).select().single();
    if(error){ showStatus('Erro ao criar conversa'); console.error(error); return; }
    const membrosParaInserir = [session.user.id, ...membrosIds].map(uid=>({ conversa_id: data.id, user_id: uid }));
    const { error: e2 } = await sb.from(TB_MEMBROS).insert(membrosParaInserir);
    if(e2){ showStatus('Erro ao adicionar membros'); console.error(e2); return; }
    novaConversaTipo = null; novaConversaSelecionados = [];
    await fetchConversas();
    abrirConversa(data.id);
  }

  async function sairDoGrupo(conversaId){
    if(!confirm('Sair desse grupo? Você deixa de ver as mensagens.')) return;
    await sb.from(TB_MEMBROS).delete().eq('conversa_id', conversaId).eq('user_id', session.user.id);
    sairDaConversa();
    await fetchConversas();
    render();
  }

  async function refreshAll(){
    await fetchAmizades();
    await fetchPerfis();
    await fetchApelidos();
    await fetchAulas();
    await fetchPresencas();
    await fetchConversas();
  }

  function perfilDe(id){
    return perfilMap[id] || { id, nome:'?', emoji:'🙂', cor: corDe(id) };
  }

  async function adicionarAmiga(chaveInput){
    const chave = chaveInput.trim().toUpperCase();
    if(!chave) return { error: 'Digite uma chave.' };
    const { data, error } = await sb.rpc('resolve_chave_turma', { p_chave: chave });
    if(error){ console.error(error); return { error: 'Erro ao buscar a chave.' }; }
    if(!data || data.length===0) return { error: 'Chave não encontrada.' };
    const alvo = data[0];
    if(alvo.user_id === session.user.id) return { error: 'Essa é a sua própria chave.' };
    const pedidoRecebido = incoming.find(i=>i.otherId===alvo.user_id);
    if(pedidoRecebido){
      const { error: upErr } = await sb.from(TB_AMIZADES).update({ status:'aceito' }).eq('id', pedidoRecebido.amizadeId);
      if(upErr) return { error: 'Não foi possível aceitar o pedido.' };
      await refreshAll();
      return { ok: 'Conexão aceita.' };
    }
    if(outgoing.find(o=>o.otherId===alvo.user_id)) return { error: 'Pedido já enviado, esperando aceitar.' };
    if(friends.find(f=>f.otherId===alvo.user_id)) return { error: 'Vocês já são conexões.' };
    const { error: insErr } = await sb.from(TB_AMIZADES).insert({ de_user_id: session.user.id, para_user_id: alvo.user_id });
    if(insErr) return { error: 'Não foi possível enviar o pedido.' };
    await refreshAll();
    return { ok: `Pedido enviado para ${alvo.nome}.` };
  }

  async function aceitarPedido(amizadeId){
    await sb.from(TB_AMIZADES).update({ status:'aceito' }).eq('id', amizadeId);
    await refreshAll(); render();
  }
  async function recusarPedido(amizadeId){
    await sb.from(TB_AMIZADES).delete().eq('id', amizadeId);
    await refreshAll(); render();
  }
  async function removerAmiga(amizadeId){
    if(!confirm('Remover essa conexão? Vocês deixam de ver a grade uma da outra.')) return;
    await sb.from(TB_AMIZADES).delete().eq('id', amizadeId);
    await refreshAll(); render();
  }

  async function upsertAula(dados){
    if(editingAulaId){
      const { error } = await sb.from(TB_AULAS).update(dados).eq('id', editingAulaId);
      if(error){ showStatus('Erro ao salvar'); console.error(error); return; }
      editingAulaId = null;
    } else {
      const { error } = await sb.from(TB_AULAS).insert({ ...dados, user_id: session.user.id });
      if(error){ showStatus('Erro ao salvar'); console.error(error); return; }
    }
    await fetchAulas(); render();
  }
  async function addAulaVariosDias(dadosBase, dias){
    const linhas = dias.map(dia=>({ ...dadosBase, dia, user_id: session.user.id }));
    const { error } = await sb.from(TB_AULAS).insert(linhas);
    if(error){ showStatus('Erro ao salvar'); console.error(error); return; }
    showStatus(dias.length>1 ? 'Aulas adicionadas' : 'Aula adicionada');
    await fetchAulas(); render();
  }
  async function delAula(id){
    const { error } = await sb.from(TB_AULAS).delete().eq('id', id);
    if(error){ showStatus('Erro ao remover'); console.error(error); return; }
    if(editingAulaId === id) editingAulaId = null;
    await fetchAulas(); await fetchPresencas(); render();
  }

  // ---------- combinar grade do dia ----------
  function combinarDia(dia, dataISO){
    const pessoas = [{ id: session.user.id, nome: 'Eu', emoji: profile.emoji, cor: profile.cor, avatar_url: profile.avatar_url, aulas: myAulas }]
      .concat(friends.map(f=>{
        const p = perfilDe(f.otherId);
        return { id: f.otherId, nome: nomeExibido(f.otherId, p.nome || f.otherNome), emoji: p.emoji, cor: p.cor, avatar_url: p.avatar_url, aulas: friendAulasMap[f.otherId] || [] };
      }));
    let itens = [];
    pessoas.forEach(p=>{
      p.aulas.filter(a=> a.tipo==='aula' || !a.tipo ? a.dia===dia : a.data===dataISO).forEach(a=>{
        const chavePresenca = `${a.id}|${dataISO}`;
        itens.push({
          pessoaId: p.id, nome: p.nome, cor: p.cor, emoji: p.emoji, avatar_url: p.avatar_url, tipo: a.tipo,
          inicio: a.inicio.slice(0,5), fim: a.fim.slice(0,5), sigla: a.sigla, predio: a.predio, sala: a.sala,
          inicioMin: toMin(a.inicio), fimMin: toMin(a.fim),
          aulaId: a.id, naoVai: presencaIndex[chavePresenca] === false
        });
      });
    });
    itens.sort((a,b)=>a.inicioMin-b.inicioMin);
    const grupos = [];
    itens.forEach(it=>{
      const last = grupos[grupos.length-1];
      if(last && it.inicioMin < last.fimMax){
        last.itens.push(it);
        last.fimMax = Math.max(last.fimMax, it.fimMin);
      } else {
        grupos.push({ itens:[it], inicioMin: it.inicioMin, fimMax: it.fimMin });
      }
    });
    return grupos;
  }

  function temNoDia(a, dia, dataISO){
    return (a.tipo==='aula' || !a.tipo) ? a.dia===dia : a.data===dataISO;
  }

  // Verifica se já existe, na própria grade, uma aula/prova/trabalho que
  // sobrepõe o mesmo dia (ou data) e horário — evita cadastro duplicado.
  function existeConflito(dia, dataISO, inicio, fim, ignorarId){
    const iMin = toMin(inicio), fMin = toMin(fim);
    return myAulas.some(a=>{
      if(ignorarId && a.id===ignorarId) return false;
      if(!temNoDia(a, dia, dataISO)) return false;
      return iMin < toMin(a.fim) && fMin > toMin(a.inicio);
    });
  }
  function todasPessoasComAula(dia, dataISO){
    const nomes = new Set();
    if(myAulas.some(a=>temNoDia(a,dia,dataISO))) nomes.add('Eu');
    friends.forEach(f=>{ if((friendAulasMap[f.otherId]||[]).some(a=>temNoDia(a,dia,dataISO))) nomes.add(nomeExibido(f.otherId, perfilDe(f.otherId).nome || f.otherNome)); });
    return nomes;
  }

  function proximosEventos(){
    const hojeISO = toISODate(new Date());
    const pessoas = [{ id: session.user.id, nome:'Eu', aulas: myAulas }]
      .concat(friends.map(f=>{
        const p = perfilDe(f.otherId);
        return { id: f.otherId, nome: nomeExibido(f.otherId, p.nome || f.otherNome), aulas: friendAulasMap[f.otherId] || [] };
      }));
    let eventos = [];
    pessoas.forEach(p=>{
      p.aulas.filter(a=> a.tipo && a.tipo!=='aula' && a.data && a.data>=hojeISO).forEach(a=>{
        eventos.push({ nome:p.nome, tipo:a.tipo, data:a.data, sigla:a.sigla, predio:a.predio, sala:a.sala, inicio:a.inicio, fim:a.fim });
      });
    });
    eventos.sort((a,b)=> a.data.localeCompare(b.data) || toMin(a.inicio)-toMin(b.inicio));
    return eventos.slice(0,8);
  }

  function periodoDe(minInicio){
    const h = Math.floor(minInicio/60);
    if(h < 12) return 'manha';
    if(h < 18) return 'tarde';
    return 'noite';
  }
  function nowMinutes(){ const d = new Date(); return d.getHours()*60+d.getMinutes(); }

  // ---------- render ----------
  function render(){
    app.style.paddingBottom = '';
    if(emRecuperacaoSenha) return renderNovaSenha();
    if(!session) return renderAuth();
    if(profile === undefined) return renderErroCarregarPerfil();
    if(!profile) return renderCompletarPerfil();
    if(!profile.onboarding_feito) return renderOnboarding();
    if(mostrarAjustes) return renderAjustes();
    if(tab === 'conexoes') return renderConexoes();
    if(tab === 'grupos') return renderGrupos();
    if(tab === 'minhaarea') return renderMinhaArea();
    if(tab === 'perfil') return renderPerfil();
    renderGradeGeral();
  }

  function renderErroCarregarPerfil(){
    app.innerHTML = `
      <div class="brand-hero"><h1>Ops</h1><p>Não deu pra carregar sua conta agora. Isso costuma ser algo passageiro de conexão — não significa que sua conta ou seus dados sumiram.</p></div>
      <button class="primary" type="button" id="btn-tentar-perfil">Tentar de novo</button>
      <div class="auth-toggle"><button class="link-btn" type="button" id="btn-sair-erro-perfil">Sair e trocar de conta</button></div>
    `;
    document.getElementById('btn-tentar-perfil').onclick = async ()=>{
      await fetchProfile();
      if(profile) await refreshAll();
      render();
    };
    document.getElementById('btn-sair-erro-perfil').onclick = async ()=>{
      await sb.auth.signOut();
      session = null; profile = null; authScreen = 'login';
      render();
    };
  }

  function renderCompletarPerfil(){
    app.innerHTML = `
      <div class="brand-hero"><h1>Quase lá</h1><p>Como você quer aparecer para suas conexões?</p></div>
      <form class="card" id="f-perfil">
        <div class="field"><label>Seu nome</label><input type="text" id="pf-nome" required></div>
        <div id="pf-err" class="err"></div>
        <button class="primary" type="submit">Salvar</button>
      </form>
      <div class="auth-toggle">Entrou com a conta errada? <button class="link-btn" type="button" id="btn-sair-perfil">Sair e trocar de conta</button></div>
    `;
    document.getElementById('btn-sair-perfil').onclick = async ()=>{
      await sb.auth.signOut();
      session = null; profile = null; authScreen = 'login';
      render();
    };
    document.getElementById('f-perfil').onsubmit = async (e)=>{
      e.preventDefault();
      const nome = document.getElementById('pf-nome').value.trim();
      if(!nome) return;
      try{
        await garantirProfile(nome);
        await refreshAll();
        render();
      }catch(err){
        console.error('Completar perfil falhou:', err);
        document.getElementById('pf-err').textContent = 'Não foi possível salvar, tenta de novo.';
      }
    };
  }

  function renderAuth(){
    if(authScreen === 'cadastro') return renderCadastro();
    if(authScreen === 'recuperar') return renderRecuperarSenha();
    app.innerHTML = `
      <div class="brand-hero">
        <h1>TimeLink</h1>
        <div class="tagline">Conectando você aos seus</div>
        <p>Sua grade acadêmica em um só lugar, conectada às pessoas que fazem parte da sua rotina.</p>
      </div>
      <form class="card" id="f-login">
        <div class="field"><label>E-mail</label><input type="email" id="li-email" required></div>
        <div class="field"><label>Senha</label><input type="password" id="li-senha" required></div>
        <div id="li-err" class="err"></div>
        <button class="primary" type="submit">Entrar</button>
      </form>
      <div class="auth-toggle">Ainda não tem conta? <button class="link-btn" id="go-cad">Cadastre-se</button></div>
      <div class="auth-toggle" style="margin-top:8px"><button class="link-btn" id="go-recuperar">Esqueci minha senha</button></div>
    `;
    document.getElementById('go-cad').onclick = ()=>{ authScreen='cadastro'; render(); };
    document.getElementById('go-recuperar').onclick = ()=>{ authScreen='recuperar'; render(); };
    document.getElementById('f-login').onsubmit = async (e)=>{
      e.preventDefault();
      if(busy) return; busy = true;
      const email = document.getElementById('li-email').value.trim();
      const senha = document.getElementById('li-senha').value;
      const errEl = document.getElementById('li-err');
      errEl.textContent = '';
      try{
        const { data, error } = await sb.auth.signInWithPassword({ email, password: senha });
        if(error) throw error;
        session = data.session;
        await fetchProfile();
        await refreshAll();
        render();
      }catch(err){
        errEl.textContent = 'E-mail ou senha incorretos.';
      }
      busy = false;
    };
  }

  function renderRecuperarSenha(){
    app.innerHTML = `
      <div class="brand-hero">
        <h1>Recuperar senha</h1>
        <p>Digite seu e-mail e enviaremos um link pra você criar uma senha nova.</p>
      </div>
      <form class="card" id="f-recuperar">
        <div class="field"><label>E-mail</label><input type="email" id="rc-email" required></div>
        <div id="rc-err" class="err"></div>
        <div id="rc-ok" style="color:var(--ok);font-size:12.5px;margin-top:8px;display:none">Link enviado! Confira seu e-mail (e o spam).</div>
        <button class="primary" type="submit">Enviar link</button>
      </form>
      <div class="auth-toggle"><button class="link-btn" id="go-login-2">Voltar para o login</button></div>
    `;
    document.getElementById('go-login-2').onclick = ()=>{ authScreen='login'; render(); };
    document.getElementById('f-recuperar').onsubmit = async (e)=>{
      e.preventDefault();
      if(busy) return; busy = true;
      const email = document.getElementById('rc-email').value.trim();
      const errEl = document.getElementById('rc-err');
      const okEl = document.getElementById('rc-ok');
      errEl.textContent = ''; okEl.style.display = 'none';
      try{
        const redirectTo = window.location.origin + window.location.pathname;
        const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo });
        if(error) throw error;
        okEl.style.display = 'block';
      }catch(err){
        errEl.textContent = 'Não foi possível enviar o link, confira o e-mail digitado.';
      }
      busy = false;
    };
  }

  function renderNovaSenha(){
    app.innerHTML = `
      <div class="brand-hero">
        <h1>Nova senha</h1>
        <p>Escolha uma senha nova pra sua conta.</p>
      </div>
      <form class="card" id="f-nova-senha">
        <div class="field"><label>Nova senha</label><input type="password" id="ns-senha" required minlength="6"></div>
        <div class="field"><label>Confirmar senha</label><input type="password" id="ns-senha2" required minlength="6"></div>
        <div id="ns-err" class="err"></div>
        <button class="primary" type="submit">Salvar nova senha</button>
      </form>
    `;
    document.getElementById('f-nova-senha').onsubmit = async (e)=>{
      e.preventDefault();
      if(busy) return; busy = true;
      const senha = document.getElementById('ns-senha').value;
      const senha2 = document.getElementById('ns-senha2').value;
      const errEl = document.getElementById('ns-err');
      errEl.textContent = '';
      if(senha !== senha2){
        errEl.textContent = 'As senhas não coincidem.';
        busy = false; return;
      }
      try{
        const { error } = await sb.auth.updateUser({ password: senha });
        if(error) throw error;
        emRecuperacaoSenha = false;
        showStatus('Senha alterada');
        const { data } = await sb.auth.getSession();
        session = data.session;
        await fetchProfile();
        if(profile) await refreshAll();
        render();
      }catch(err){
        errEl.textContent = 'Não foi possível salvar a nova senha.';
      }
      busy = false;
    };
  }

  function renderCadastro(){
    app.innerHTML = `
      <div class="brand-hero">
        <h1>Criar conta</h1>
        <p>Você preenche sua própria grade. Depois é só trocar a chave com suas conexões.</p>
      </div>
      <form class="card" id="f-cad">
        <div class="field"><label>Seu nome</label><input type="text" id="cd-nome" required></div>
        <div class="field"><label>E-mail</label><input type="email" id="cd-email" required></div>
        <div class="field"><label>Senha</label><input type="password" id="cd-senha" required minlength="6"></div>
        <div class="field" style="display:flex;justify-content:center"><div class="h-captcha" data-sitekey="${HCAPTCHA_SITEKEY}"></div></div>
        <div id="cd-err" class="err"></div>
        <button class="primary" type="submit">Criar conta</button>
      </form>
      <div class="auth-toggle">Já tem conta? <button class="link-btn" id="go-login">Entrar</button></div>
    `;
    if(window.hcaptcha) window.hcaptcha.render(document.querySelector('#f-cad .h-captcha'), { sitekey: HCAPTCHA_SITEKEY });
    document.getElementById('go-login').onclick = ()=>{ authScreen='login'; render(); };
    document.getElementById('f-cad').onsubmit = async (e)=>{
      e.preventDefault();
      if(busy) return; busy = true;
      const nome = document.getElementById('cd-nome').value.trim();
      const email = document.getElementById('cd-email').value.trim();
      const senha = document.getElementById('cd-senha').value;
      const errEl = document.getElementById('cd-err');
      const captchaToken = window.hcaptcha ? window.hcaptcha.getResponse() : undefined;
      errEl.textContent = '';
      if(!captchaToken){
        errEl.textContent = 'Confirme que você não é um robô antes de continuar.';
        busy = false; return;
      }
      try{
        const { data, error } = await sb.auth.signUp({ email, password: senha, options: { captchaToken } });
        if(error) throw error;
        session = data.session;
        if(!session){
          errEl.textContent = 'Conta criada! Confirme seu e-mail e faça login.';
          authScreen = 'login'; busy=false; return render();
        }
        await garantirProfile(nome);
        await refreshAll();
        render();
      }catch(err){
        console.error('Cadastro falhou:', err);
        if(window.hcaptcha) window.hcaptcha.reset();
        errEl.textContent = err.message === 'User already registered' ? 'Esse e-mail já tem conta.' : 'Não foi possível criar a conta.';
      }
      busy = false;
    };
  }

  // ---------- Onboarding ----------
  function renderOnboarding(){
    const dia = DIA_ORDEM[obIndex];
    const total = DIA_ORDEM.length;
    let html = `<div class="ob-progress">` + DIA_ORDEM.map((_,i)=>`<div class="dot ${i<=obIndex?'on':''}"></div>`).join('') + `</div>`;
    html += `<div class="ob-day-title">${DIA_NOME[dia]}-feira</div>`;
    html += `<div class="ob-day-sub">Passo ${obIndex+1} de ${total} — sua grade fixa</div>`;

    const temAula = obTemAula[dia];
    html += `<div class="yn-row">
      <button data-yn="sim" class="${temAula===true?'sel':''}">Tenho aula</button>
      <button data-yn="nao" class="${temAula===false?'sel':''}">Não tenho</button>
    </div>`;

    if(temAula){
      html += `<form class="card" id="ob-form">
        <div class="section-title" style="margin-top:0">Toque num bloco ou digite o horário</div>
        ${blocoChipsHtml('ob')}
        <div class="row2" style="margin-top:14px">
          <div class="field"><label>Sigla</label><input type="text" id="ob-sigla" placeholder="Ex: AB"></div>
          <div class="field"></div>
        </div>
        <div class="row2">
          <div class="field"><label>Início</label><input type="time" id="ob-inicio" required></div>
          <div class="field"><label>Fim</label><input type="time" id="ob-fim" required></div>
        </div>
        <div class="row2">
          <div class="field"><label>Prédio</label><input type="text" id="ob-predio"></div>
          <div class="field"><label>Sala</label><input type="text" id="ob-sala"></div>
        </div>
        <button class="primary" type="submit">Adicionar aula</button>
      </form>`;

      const aulasDoDiaAtual = myAulas.filter(a=>a.dia===dia).sort((a,b)=>toMin(a.inicio)-toMin(b.inicio));
      aulasDoDiaAtual.forEach(a=>{
        html += `<div class="ob-added-item">
          <div class="swatch" style="background:${esc(profile.cor)}"></div>
          <div class="grow"><div class="t1">${a.sigla?(esc(a.sigla)+' · '):''}${a.inicio.slice(0,5)}–${a.fim.slice(0,5)}</div><div class="t2">${[a.predio,a.sala].filter(Boolean).map(esc).join(' · ')||'sem local'}</div></div>
          <button class="del" data-del-ob-aula="${a.id}">${ICONS.x}</button>
        </div>`;
      });
    }

    html += `<div class="ob-nav">
      ${obIndex>0? `<button class="ghost" id="ob-back">Voltar</button>` : ''}
      <button class="primary" id="ob-next" style="flex:1">${obIndex===total-1? 'Concluir':'Próximo'}</button>
    </div>`;
    html += `<div style="text-align:center;margin-top:16px"><button class="link-btn" id="ob-skip-all">Pular e preencher depois</button></div>`;

    app.innerHTML = html;

    document.querySelectorAll('[data-yn]').forEach(b=>{
      b.onclick = ()=>{ obTemAula[dia] = b.dataset.yn==='sim'; render(); };
    });

    if(temAula){
      bindBlocoChips('ob');
      document.getElementById('ob-form').onsubmit = (e)=>{
        e.preventDefault();
        const sigla = document.getElementById('ob-sigla').value.trim().toUpperCase();
        const inicio = document.getElementById('ob-inicio').value;
        const fim = document.getElementById('ob-fim').value;
        const predio = document.getElementById('ob-predio').value.trim();
        const sala = document.getElementById('ob-sala').value.trim();
        if(!inicio || !fim) return;
        if(existeConflito(dia, null, inicio, fim, null)){ showStatus('Já existe uma atividade nesse horário nesse dia'); return; }
        const siglaFinal = sigla || detectarBloco(inicio, fim);
        addAulaOnboarding({ dia, sigla: siglaFinal, inicio, fim, predio, sala });
      };
      document.querySelectorAll('[data-del-ob-aula]').forEach(b=>{
        b.onclick = ()=> delAula(b.dataset.delObAula);
      });
    }

    const backBtn = document.getElementById('ob-back');
    if(backBtn) backBtn.onclick = ()=>{ obIndex--; render(); };
    document.getElementById('ob-next').onclick = async ()=>{
      if(obIndex < total-1){ obIndex++; render(); }
      else { await concluirOnboarding(); }
    };
    document.getElementById('ob-skip-all').onclick = async ()=>{ await concluirOnboarding(); };
  }

  async function addAulaOnboarding(dados){
    const { error } = await sb.from(TB_AULAS).insert({ ...dados, user_id: session.user.id });
    if(error){ showStatus('Erro ao salvar'); console.error(error); return; }
    await fetchAulas();
    render();
  }

  async function concluirOnboarding(){
    await sb.from(TB_PROFILES).update({ onboarding_feito: true }).eq('id', session.user.id);
    profile.onboarding_feito = true;
    obIndex = 0; obTemAula = {};
    render();
  }

  // ---------- Grade (visão combinada) ----------
  function renderGradeGeral(){
    const hoje = new Date().getDay();
    const datas = datasSemanaAtual();
    const grupos = combinarDia(currentDay, datas[currentDay].iso);
    const subtitulo = currentDay===hoje
      ? `${DIA_NOME[currentDay]}, ${fmtDataCurta(new Date())}`
      : DIA_NOME[currentDay];
    let html = headerHtml(`Grade ${semestreAtual()}`, subtitulo);

    html += `<div class="days">`;
    DIA_ORDEM.forEach(d=>{
      const cls = ['day-pill'];
      if(d === currentDay) cls.push('active');
      if(d === hoje) cls.push('today');
      const qtd = todasPessoasComAula(d, datas[d].iso).size;
      if(qtd>0) cls.push('has');
      html += `<div class="${cls.join(' ')}" data-day="${d}">
        <span class="d">${DIA_ABREV[d]}</span>
        <span class="num">${datas[d].numero}</span>
        <span class="dot"></span>
      </div>`;
    });
    html += `</div>`;

    const eventos = proximosEventos();
    if(eventos.length){
      html += `<div class="section-title" style="margin-top:0">Próximas provas e trabalhos</div>`;
      eventos.forEach(ev=>{
        html += `<div class="list-item">
          <div class="swatch" style="background:${TIPO_COR[ev.tipo]}">${ev.tipo==='prova'?'P':'T'}</div>
          <div class="grow">
            <div class="t1">${esc(ev.nome)}${ev.sigla?` · ${esc(ev.sigla)}`:''}${tipoBadgeHtml(ev.tipo)}</div>
            <div class="t2">${fmtDataLonga(ev.data)} · ${fmtRange(ev.inicio.slice(0,5),ev.fim.slice(0,5))} · ${[ev.predio,ev.sala].filter(Boolean).map(esc).join(' · ')||'sem local'}</div>
          </div>
        </div>`;
      });
    }

    const gruposPorPeriodo = { manha:[], tarde:[], noite:[] };
    grupos.forEach(g=> g.itens.forEach(it=> gruposPorPeriodo[periodoDe(it.inicioMin)].push(it.nome.split(' ')[0])));
    html += `<div class="summary">`;
    [['manha','Manhã'],['tarde','Tarde'],['noite','Noite']].forEach(([k,label])=>{
      const nomes = [...new Set(gruposPorPeriodo[k])];
      html += `<div class="chip"><div class="lbl">${label}</div><div class="val">${nomes.length? nomes.join(', ') : '—'}</div></div>`;
    });
    html += `</div>`;

    if(grupos.length === 0 && friends.length===0){
      html += `<div class="empty">${ICONS.link.replace('class="icon"','class="icon" style="width:36px;height:36px"')}Você ainda não tem conexões.<br>Abra <b>Conexões</b> e adicione a chave de alguém.</div>`;
    } else if(grupos.length === 0){
      html += `<div class="empty">${ICONS.calendar.replace('class="icon"','class="icon" style="width:36px;height:36px"')}Ninguém tem aula ${currentDay===hoje?'hoje':'nesse dia'}.</div>`;
    } else {
      const agoraMin = nowMinutes();
      grupos.forEach(g=>{
        const ativo = currentDay===hoje && agoraMin >= g.inicioMin && agoraMin < g.fimMax;
        const blocoLabel = g.itens.find(it=>it.sigla)?.sigla || '';
        html += `<div class="turno-card ${ativo?'now':''}">
          <div class="turno-head">
            <div class="turno-head-left">
              <span class="label">${minToHHMM(g.inicioMin)} – ${minToHHMM(g.fimMax)}</span>
              ${blocoLabel? `<span class="bloco-tag">${esc(blocoLabel)}</span>` : ''}
            </div>
            ${ativo?`<span class="now-tag">Agora</span>`:''}
          </div>`;
        g.itens.forEach(it=>{
          html += `<div class="aula-row ${it.naoVai?'naovai':''}">
            <div class="avatar" style="background:${esc(it.cor)}">${avatarHtml(it)}</div>
            <div class="aula-info">
              <div class="nome">${esc(it.nome)}${tipoBadgeHtml(it.tipo)}</div>
              <div class="local">${fmtRange(it.inicio,it.fim)} · ${[it.predio, it.sala].filter(Boolean).map(esc).join(' · ') || 'sem local'}</div>
            </div>
            ${presencaHtml(it, currentDay===hoje)}
          </div>`;
        });
        html += `</div>`;
      });
    }

    app.innerHTML = html + bottomNavHtml();
    bindCommon();
    document.querySelectorAll('.day-pill').forEach(el=>{
      el.onclick = ()=>{ currentDay = Number(el.dataset.day); render(); };
    });
    document.querySelectorAll('.presenca-switch').forEach(sw=>{
      const aulaId = sw.dataset.presencaAula;
      sw.querySelectorAll('button').forEach(btn=>{
        btn.onclick = ()=>{
          togglePresenca(aulaId, datas[currentDay].iso, btn.dataset.setVai === '0');
        };
      });
    });
  }

  // ---------- Minha área ----------
  function renderMinhaArea(){
    const editando = editingAulaId ? myAulas.find(a=>a.id===editingAulaId) : null;
    let html = headerHtml('Minha área', 'Sua grade pessoal');

    html += `<div class="list-item" style="margin-bottom:24px">
      <div class="grow">
        <div class="t2" style="text-transform:uppercase;letter-spacing:.08em;font-size:10px;font-weight:700">Sua chave de acesso</div>
        <div class="t1" style="letter-spacing:.1em;margin-top:3px">${profile.chave}</div>
      </div>
      <button class="icon-btn" id="btn-copiar-mini" title="Copiar chave">${ICONS.copy}</button>
    </div>`;

    const editandoEhAula = editando ? (editando.tipo==='aula' || !editando.tipo) : (tipoSelecionado==='aula');

    html += `<form class="card" id="form-aula">
      ${editando? `<div class="section-title" style="margin-top:0">Editando</div>` : ''}
      <div class="field"><label>Tipo</label>${tipoChipsHtml('aula', editando?editando.tipo:tipoSelecionado)}</div>
      ${editando? `
      <div class="field" id="campo-dias" style="${editandoEhAula?'':'display:none'}"><label>Dia</label><select id="aula-dia">
        ${DIA_ORDEM.map(d=>`<option value="${d}" ${editando.dia===d?'selected':''}>${DIA_NOME[d]}</option>`).join('')}
      </select></div>
      <div class="field" id="campo-data" style="${editandoEhAula?'display:none':''}"><label>Data</label><input type="date" id="aula-data" value="${editando.data||''}"></div>
      ` : `
      <div class="field" id="campo-dias" style="${editandoEhAula?'':'display:none'}"><label>Dias</label><div class="days-multi" id="dias-multi">
        ${DIA_ORDEM.map(d=>`<button type="button" data-day="${d}" class="${diasSelecionados.includes(d)?'sel':''}">${DIA_ABREV[d]}</button>`).join('')}
      </div></div>
      <div class="field" id="campo-data" style="${editandoEhAula?'display:none':''}"><label>Data</label><input type="date" id="aula-data"></div>
      `}
      <div class="field"><label>Sigla (opcional)</label><input type="text" id="aula-sigla" placeholder="Ex: AB" maxlength="10" value="${editando?esc(editando.sigla||''):''}"></div>
      ${blocoChipsHtml('aula')}
      <div class="row2" style="margin-top:14px">
        <div class="field"><label>Início</label><input type="time" id="aula-inicio" required value="${editando?editando.inicio.slice(0,5):''}"></div>
        <div class="field"><label>Fim</label><input type="time" id="aula-fim" required value="${editando?editando.fim.slice(0,5):''}"></div>
      </div>
      <div class="row2">
        <div class="field"><label>Prédio</label><input type="text" id="aula-predio" placeholder="Ex: Bloco B" value="${editando?esc(editando.predio||''):''}"></div>
        <div class="field"><label>Sala</label><input type="text" id="aula-sala" placeholder="Ex: 204" value="${editando?esc(editando.sala||''):''}"></div>
      </div>
      <button class="primary" type="submit">${editando? 'Salvar alterações' : 'Adicionar'}</button>
      ${editando? `<button class="secondary" type="button" id="btn-cancel-edit">Cancelar edição</button>` : ''}
    </form>`;

    const minhasAulas = myAulas.filter(a=> a.tipo==='aula' || !a.tipo);
    const meusEventos = myAulas.filter(a=> a.tipo && a.tipo!=='aula').sort((a,b)=> (a.data||'').localeCompare(b.data||''));

    html += `<div class="section-title" style="margin-top:0">Suas aulas — toque pra editar</div>`;
    if(minhasAulas.length===0) html += `<div class="empty">Nenhuma aula cadastrada ainda.</div>`;
    const ordenadas = [...minhasAulas].sort((a,b)=>{
      const da = DIA_ORDEM.indexOf(a.dia), db = DIA_ORDEM.indexOf(b.dia);
      if(da!==db) return da-db;
      return toMin(a.inicio) - toMin(b.inicio);
    });
    ordenadas.forEach(a=>{
      html += `<div class="list-item" data-edit="${a.id}" style="cursor:pointer">
        <div class="swatch" style="background:${esc(profile.cor)}">${avatarHtml(profile)}</div>
        <div class="grow">
          <div class="t1">${DIA_ABREV[a.dia]} ${a.sigla?('· '+esc(a.sigla)):''} · ${a.inicio.slice(0,5)}–${a.fim.slice(0,5)}</div>
          <div class="t2">${[a.predio,a.sala].filter(Boolean).map(esc).join(' · ') || 'sem local'}</div>
        </div>
        <button class="del" data-del-aula="${a.id}">${ICONS.x}</button>
      </div>`;
    });

    html += `<div class="section-title">Suas provas e trabalhos — toque pra editar</div>`;
    if(meusEventos.length===0) html += `<div class="empty">Nenhuma prova ou trabalho agendado.</div>`;
    meusEventos.forEach(a=>{
      html += `<div class="list-item" data-edit="${a.id}" style="cursor:pointer">
        <div class="swatch" style="background:${TIPO_COR[a.tipo]}">${a.tipo==='prova'?'P':'T'}</div>
        <div class="grow">
          <div class="t1">${a.data?fmtDataLonga(a.data):'sem data'} ${a.sigla?('· '+esc(a.sigla)):''} · ${a.inicio.slice(0,5)}–${a.fim.slice(0,5)}${tipoBadgeHtml(a.tipo)}</div>
          <div class="t2">${[a.predio,a.sala].filter(Boolean).map(esc).join(' · ') || 'sem local'}</div>
        </div>
        <button class="del" data-del-aula="${a.id}">${ICONS.x}</button>
      </div>`;
    });

    app.innerHTML = html + bottomNavHtml();
    bindCommon();
    bindBlocoChips('aula');

    document.getElementById('btn-copiar-mini').onclick = async ()=>{
      try{ await navigator.clipboard.writeText(profile.chave); showStatus('Chave copiada'); }
      catch(e){ showStatus('Não deu pra copiar'); }
    };

    const diasMultiEl = document.getElementById('dias-multi');
    if(diasMultiEl){
      diasMultiEl.querySelectorAll('button').forEach(btn=>{
        btn.onclick = ()=>{
          const d = Number(btn.dataset.day);
          diasSelecionados = diasSelecionados.includes(d) ? diasSelecionados.filter(x=>x!==d) : [...diasSelecionados, d];
          btn.classList.toggle('sel');
        };
      });
    }
    document.querySelectorAll('#aula-tipo button').forEach(btn=>{
      btn.onclick = ()=>{
        tipoSelecionado = btn.dataset.tipo;
        document.querySelectorAll('#aula-tipo button').forEach(b=>b.classList.toggle('sel', b===btn));
        const ehAula = tipoSelecionado === 'aula';
        const diasEl = document.getElementById('campo-dias');
        const dataEl = document.getElementById('campo-data');
        if(diasEl) diasEl.style.display = ehAula ? '' : 'none';
        if(dataEl) dataEl.style.display = ehAula ? 'none' : '';
      };
    });

    document.getElementById('form-aula').onsubmit = (e)=>{
      e.preventDefault();
      const tipo = document.querySelector('#aula-tipo button.sel')?.dataset.tipo || 'aula';
      const sigla = document.getElementById('aula-sigla').value.trim().toUpperCase();
      const inicio = document.getElementById('aula-inicio').value;
      const fim = document.getElementById('aula-fim').value;
      const predio = document.getElementById('aula-predio').value.trim();
      const sala = document.getElementById('aula-sala').value.trim();
      if(!inicio || !fim) return;
      const ehAula = tipo === 'aula';
      if(editando){
        if(ehAula){
          const dia = Number(document.getElementById('aula-dia').value);
          if(existeConflito(dia, null, inicio, fim, editingAulaId)){ showStatus('Já existe uma atividade nesse horário nesse dia'); return; }
          upsertAula({ dia, sigla, inicio, fim, predio, sala, tipo, data: null });
        } else {
          const data = document.getElementById('aula-data').value;
          if(!data){ showStatus('Escolha a data'); return; }
          const dia = new Date(data+'T00:00:00').getDay();
          if(existeConflito(dia, data, inicio, fim, editingAulaId)){ showStatus('Já existe uma atividade nesse horário nessa data'); return; }
          upsertAula({ dia, sigla, inicio, fim, predio, sala, tipo, data });
        }
      } else {
        if(ehAula){
          if(diasSelecionados.length===0){ showStatus('Escolha pelo menos um dia'); return; }
          const diasConflito = diasSelecionados.filter(dia=> existeConflito(dia, null, inicio, fim, null));
          if(diasConflito.length>0){
            const nomes = diasConflito.map(d=>DIA_ABREV[d]).join(', ');
            showStatus(`Já existe uma atividade nesse horário: ${nomes}`);
            return;
          }
          addAulaVariosDias({ sigla, inicio, fim, predio, sala, tipo, data: null }, diasSelecionados);
          diasSelecionados = [];
        } else {
          const data = document.getElementById('aula-data').value;
          if(!data){ showStatus('Escolha a data'); return; }
          const dia = new Date(data+'T00:00:00').getDay();
          if(existeConflito(dia, data, inicio, fim, null)){ showStatus('Já existe uma atividade nesse horário nessa data'); return; }
          addAulaVariosDias({ sigla, inicio, fim, predio, sala, tipo, data }, [dia]);
        }
        tipoSelecionado = 'aula';
      }
    };
    const cancelBtn = document.getElementById('btn-cancel-edit');
    if(cancelBtn) cancelBtn.onclick = ()=>{ editingAulaId = null; render(); };

    document.querySelectorAll('[data-del-aula]').forEach(btn=>{
      btn.onclick = (e)=>{ e.stopPropagation(); delAula(btn.dataset.delAula); };
    });
    document.querySelectorAll('.list-item[data-edit]').forEach(el=>{
      el.onclick = (e)=>{
        if(e.target.closest('.del')) return;
        editingAulaId = el.dataset.edit;
        render();
        window.scrollTo({top:0, behavior:'smooth'});
      };
    });
  }

  // ---------- Conexões ----------
  function renderConexoes(){
    let html = headerHtml('Conexões', 'Compartilhe sua chave e conecte pessoas');

    html += `<div class="chave-box">
      <div class="lbl">Sua chave</div>
      <div class="valor">${profile.chave}</div>
      <button class="secondary" id="btn-copiar">Copiar chave</button>
    </div>`;

    html += `<form class="card" id="form-add-amiga">
      <div class="field"><label>Chave de acesso</label><input type="text" id="in-chave" placeholder="Ex: 7K2P9X" maxlength="10" style="text-transform:uppercase"></div>
      <div id="add-msg" class="err"></div>
      <button class="primary" type="submit">Adicionar</button>
    </form>`;

    if(incoming.length){
      html += `<div class="section-title">Pedidos recebidos</div>`;
      incoming.forEach(r=>{
        html += `<div class="req-item">
          <div class="avatar" style="background:${corDe(r.otherId)}">${iniciais(r.otherNome)}</div>
          <div class="grow"><div class="t1">${r.otherNome}</div></div>
          <div class="req-actions">
            <button class="btn-sm ok" data-aceitar="${r.amizadeId}">Aceitar</button>
            <button class="btn-sm no" data-recusar="${r.amizadeId}">Recusar</button>
          </div>
        </div>`;
      });
    }

    if(outgoing.length){
      html += `<div class="section-title">Pedidos enviados</div>`;
      outgoing.forEach(r=>{
        html += `<div class="req-item">
          <div class="avatar" style="background:${corDe(r.otherId)}">${iniciais(r.otherNome)}</div>
          <div class="grow"><div class="t1">${r.otherNome}</div><div class="t2">Aguardando aceite</div></div>
        </div>`;
      });
    }

    html += `<div class="section-title">Conexões</div>`;
    if(friends.length===0) html += `<div class="empty">Ninguém adicionado ainda.</div>`;
    friends.forEach(f=>{
      const p = perfilDe(f.otherId);
      const nomeReal = p.nome || f.otherNome;
      const exibido = nomeExibido(f.otherId, nomeReal);
      html += `<div class="list-item">
        <div class="avatar" style="background:${esc(p.cor)}">${avatarHtml(p)}</div>
        <div class="grow">
          <div class="t1">${esc(exibido)}</div>
          ${exibido!==nomeReal? `<div class="t2">nome real: ${esc(nomeReal)}</div>` : ''}
        </div>
        <button class="icon-btn" data-apelido="${f.otherId}" data-nome="${esc(exibido)}" title="Apelido" style="width:32px;height:32px">${ICONS.pencil}</button>
        <button class="del" data-remover="${f.amizadeId}">${ICONS.x}</button>
      </div>`;
    });

    app.innerHTML = html + bottomNavHtml();
    bindCommon();

    document.getElementById('btn-copiar').onclick = async ()=>{
      try{ await navigator.clipboard.writeText(profile.chave); showStatus('Chave copiada'); }
      catch(e){ showStatus('Não deu pra copiar'); }
    };
    document.getElementById('form-add-amiga').onsubmit = async (e)=>{
      e.preventDefault();
      const input = document.getElementById('in-chave');
      const msg = document.getElementById('add-msg');
      msg.textContent = '';
      const res = await adicionarAmiga(input.value);
      if(res.error){ msg.textContent = res.error; }
      else { input.value=''; showStatus(res.ok); render(); }
    };
    document.querySelectorAll('[data-aceitar]').forEach(b=> b.onclick = ()=>aceitarPedido(b.dataset.aceitar));
    document.querySelectorAll('[data-recusar]').forEach(b=> b.onclick = ()=>recusarPedido(b.dataset.recusar));
    document.querySelectorAll('[data-remover]').forEach(b=> b.onclick = ()=>removerAmiga(b.dataset.remover));
    document.querySelectorAll('[data-apelido]').forEach(b=> b.onclick = ()=>definirApelido(b.dataset.apelido, b.dataset.nome));
  }

  // ---------- Grupos / chat ----------
  function mensagemHtml(m){
    const propria = m.user_id === session.user.id;
    const autor = propria ? null : perfilDe(m.user_id);
    return `<div class="msg-row ${propria?'own':''}">
      ${!propria? `<div class="avatar" style="background:${esc(autor.cor)}">${avatarHtml(autor)}</div>` : ''}
      <div class="msg-bubble">
        ${!propria? `<div class="msg-autor">${esc(nomeExibido(m.user_id, autor.nome||'?'))}</div>` : ''}
        <div class="msg-texto">${esc(m.texto)}</div>
        <div class="msg-hora">${horaCurta(m.created_at)}</div>
      </div>
    </div>`;
  }
  function enqueteHtml(m){
    const propria = m.user_id === session.user.id;
    const autor = propria ? null : perfilDe(m.user_id);
    const e = enquetes[m.id] || { opcoes:[], votos:[] };
    const totalVotos = e.votos.length;
    const meuVoto = e.votos.find(v=>v.user_id===session.user.id);
    return `<div class="msg-row ${propria?'own':''}">
      ${!propria? `<div class="avatar" style="background:${esc(autor.cor)}">${avatarHtml(autor)}</div>` : ''}
      <div class="msg-bubble poll-card">
        ${!propria? `<div class="msg-autor">${esc(nomeExibido(m.user_id, autor.nome||'?'))}</div>` : ''}
        <div class="poll-pergunta">${ICONS.poll}<span>${esc(m.texto)}</span></div>
        ${e.opcoes.map(o=>{
          const votosOpcao = e.votos.filter(v=>v.opcao_id===o.id).length;
          const pct = totalVotos? Math.round(votosOpcao/totalVotos*100) : 0;
          const marcada = meuVoto && meuVoto.opcao_id===o.id;
          return `<button type="button" class="poll-opcao ${marcada?'sel':''}" data-votar-msg="${m.id}" data-votar-opcao="${o.id}">
            <span class="poll-opcao-barra" style="width:${pct}%"></span>
            <span class="poll-opcao-texto">${esc(o.texto)}</span>
            <span class="poll-opcao-pct">${pct}%</span>
          </button>`;
        }).join('')}
        <div class="msg-hora">${totalVotos} voto${totalVotos!==1?'s':''} · ${horaCurta(m.created_at)}</div>
      </div>
    </div>`;
  }

  function renderGrupos(){
    if(conversaAbertaId) return renderConversaAberta();
    if(novaConversaTipo) return renderNovaConversa();

    let html = headerHtml('Grupos', 'Converse com suas conexões');
    html += `<button class="primary" id="btn-nova-conversa" style="margin-bottom:20px;display:flex;align-items:center;justify-content:center;gap:8px">${ICONS.plus}Nova conversa</button>`;

    if(conversas.length===0){
      html += friends.length===0
        ? `<div class="empty">${ICONS.link.replace('class="icon"','class="icon" style="width:36px;height:36px"')}Você ainda não tem conexões.<br>Adicione alguém em <b>Conexões</b> pra poder conversar.</div>`
        : `<div class="empty">${ICONS.chat.replace('class="icon"','class="icon" style="width:36px;height:36px"')}Nenhuma conversa ainda.<br>Toque em "Nova conversa" pra começar.</div>`;
    } else {
      conversas.forEach(c=>{
        const outroId = c.tipo==='privado' ? c.membros.find(id=>id!==session.user.id) : null;
        const p = outroId ? perfilDe(outroId) : null;
        html += `<div class="list-item" style="cursor:pointer" data-abrir-conversa="${c.id}">
          <div class="swatch" style="background:${c.tipo==='grupo'?'var(--accent)':esc(p.cor)}">${c.tipo==='grupo'?ICONS.chat:avatarHtml(p)}</div>
          <div class="grow">
            <div class="t1">${esc(nomeConversa(c))}</div>
            <div class="t2">${c.ultimaMsg? esc(c.ultimaMsg.slice(0,44)) : 'Sem mensagens ainda'}</div>
          </div>
        </div>`;
      });
    }

    app.innerHTML = html + bottomNavHtml();
    bindCommon();
    document.getElementById('btn-nova-conversa').onclick = ()=>{ novaConversaTipo='escolher'; render(); };
    document.querySelectorAll('[data-abrir-conversa]').forEach(el=> el.onclick = ()=>abrirConversa(el.dataset.abrirConversa));
  }

  function renderNovaConversa(){
    let html = `<div class="top-edit-bar">
      <button class="icon-btn" id="btn-voltar-nova">${ICONS.chevronLeft}</button>
      <div class="title">${novaConversaTipo==='grupo'?'Novo grupo':novaConversaTipo==='privado'?'Nova conversa':'Nova conversa'}</div>
      <div style="width:38px"></div>
    </div>`;

    if(novaConversaTipo==='escolher'){
      html += `<div class="yn-row">
        <button data-tipo-conversa="grupo">Grupo</button>
        <button data-tipo-conversa="privado">Conversa privada</button>
      </div>`;
      app.innerHTML = html;
      document.getElementById('btn-voltar-nova').onclick = ()=>{ novaConversaTipo=null; render(); };
      document.querySelectorAll('[data-tipo-conversa]').forEach(b=> b.onclick = ()=>{ novaConversaTipo = b.dataset.tipoConversa; novaConversaSelecionados=[]; render(); });
      return;
    }

    if(novaConversaTipo==='grupo'){
      html += `<div class="field"><label>Nome do grupo</label><input type="text" id="grupo-nome" placeholder="Ex: Turma de Cálculo"></div>`;
    }
    html += `<div class="section-title" style="margin-top:${novaConversaTipo==='grupo'?'20px':'0'}">Escolha ${novaConversaTipo==='grupo'?'quem participa':'quem você quer chamar'}</div>`;
    if(friends.length===0){
      html += `<div class="empty">Você ainda não tem conexões.</div>`;
    } else {
      friends.forEach(f=>{
        const p = perfilDe(f.otherId);
        const nome = nomeExibido(f.otherId, p.nome||f.otherNome);
        const sel = novaConversaSelecionados.includes(f.otherId);
        html += `<div class="list-item" style="cursor:pointer" data-toggle-membro="${f.otherId}">
          <div class="swatch" style="background:${esc(p.cor)}">${avatarHtml(p)}</div>
          <div class="grow"><div class="t1">${esc(nome)}</div></div>
          <div class="check-circle ${sel?'sel':''}"></div>
        </div>`;
      });
      if(novaConversaTipo==='grupo'){
        html += `<button class="primary" id="btn-confirmar-nova" style="margin-top:16px" ${novaConversaSelecionados.length===0?'disabled':''}>Criar grupo</button>`;
      }
    }

    app.innerHTML = html;
    document.getElementById('btn-voltar-nova').onclick = ()=>{ novaConversaTipo='escolher'; novaConversaSelecionados=[]; render(); };
    document.querySelectorAll('[data-toggle-membro]').forEach(el=>{
      el.onclick = ()=>{
        const id = el.dataset.toggleMembro;
        if(novaConversaTipo==='privado'){
          criarConversa('privado', [id], null);
          return;
        }
        const i = novaConversaSelecionados.indexOf(id);
        if(i>=0) novaConversaSelecionados.splice(i,1); else novaConversaSelecionados.push(id);
        render();
      };
    });
    const btnConfirmar = document.getElementById('btn-confirmar-nova');
    if(btnConfirmar) btnConfirmar.onclick = ()=>{
      const nome = document.getElementById('grupo-nome').value.trim() || 'Grupo sem nome';
      criarConversa('grupo', novaConversaSelecionados, nome);
    };
  }

  function renderConversaAberta(){
    const c = conversas.find(x=>x.id===conversaAbertaId);
    if(!c){ conversaAbertaId=null; return renderGrupos(); }

    let html = `<div class="chat-header">
      <button class="icon-btn" id="btn-fechar-conversa">${ICONS.chevronLeft}</button>
      <div class="grow">
        <div class="t1">${esc(nomeConversa(c))}</div>
        ${c.tipo==='grupo'? `<div class="t2">${c.membros.length} participantes</div>` : ''}
      </div>
      ${c.tipo==='grupo'? `<button class="icon-btn" id="btn-sair-grupo" title="Sair do grupo">${ICONS.x}</button>` : ''}
    </div>`;

    html += `<div class="chat-messages" id="chat-messages">`;
    if(mensagens.length===0){
      html += `<div class="empty" style="padding-top:40px">Nenhuma mensagem ainda. Diga oi!</div>`;
    } else {
      mensagens.forEach(m=> html += m.tipo==='enquete' ? enqueteHtml(m) : mensagemHtml(m));
    }
    html += `</div>`;

    if(criandoEnquete){
      html += `<div class="poll-form">
        <div class="field"><label>Pergunta</label><input type="text" id="enquete-pergunta" placeholder="Ex: Almoço às 11:30 ou 13:00?"></div>
        ${Array.from({length:enqueteOpcoesCount}).map((_,i)=>`<div class="field"><label>Opção ${i+1}</label><input type="text" class="enquete-opcao-input" placeholder="Ex: 11:30"></div>`).join('')}
        ${enqueteOpcoesCount<5? `<button type="button" class="secondary" id="btn-add-opcao" style="margin-top:0">+ Adicionar opção</button>` : ''}
        <div class="row2" style="margin-top:14px">
          <button type="button" class="secondary" style="margin-top:0" id="btn-cancelar-enquete">Cancelar</button>
          <button type="button" class="primary" id="btn-criar-enquete">Criar enquete</button>
        </div>
      </div>`;
    } else {
      html += `<form class="chat-input-bar" id="f-mensagem">
        <button type="button" class="icon-btn" id="btn-nova-enquete" title="Nova enquete">${ICONS.poll}</button>
        <input type="text" id="msg-texto" placeholder="Escreva uma mensagem..." autocomplete="off">
        <button type="submit" class="icon-btn send" title="Enviar">${ICONS.send}</button>
      </form>`;
    }

    app.style.paddingBottom = criandoEnquete ? '20px' : '86px';
    app.innerHTML = html;
    window.scrollTo(0, document.body.scrollHeight);

    document.getElementById('btn-fechar-conversa').onclick = async ()=>{ sairDaConversa(); await fetchConversas(); render(); };
    const btnSair = document.getElementById('btn-sair-grupo');
    if(btnSair) btnSair.onclick = ()=> sairDoGrupo(c.id);

    document.querySelectorAll('[data-votar-msg]').forEach(b=>{
      b.onclick = ()=> votarEnquete(b.dataset.votarMsg, b.dataset.votarOpcao);
    });

    const fMsg = document.getElementById('f-mensagem');
    if(fMsg) fMsg.onsubmit = async (e)=>{
      e.preventDefault();
      const input = document.getElementById('msg-texto');
      const texto = input.value;
      if(!texto.trim()) return;
      input.value = '';
      await enviarMensagem(texto);
    };
    const btnNovaEnquete = document.getElementById('btn-nova-enquete');
    if(btnNovaEnquete) btnNovaEnquete.onclick = ()=>{ criandoEnquete=true; enqueteOpcoesCount=2; render(); };
    const btnAddOpcao = document.getElementById('btn-add-opcao');
    if(btnAddOpcao) btnAddOpcao.onclick = ()=>{ enqueteOpcoesCount++; render(); };
    const btnCancelarEnquete = document.getElementById('btn-cancelar-enquete');
    if(btnCancelarEnquete) btnCancelarEnquete.onclick = ()=>{ criandoEnquete=false; render(); };
    const btnCriarEnquete = document.getElementById('btn-criar-enquete');
    if(btnCriarEnquete) btnCriarEnquete.onclick = async ()=>{
      const pergunta = document.getElementById('enquete-pergunta').value.trim();
      const opcoes = Array.from(document.querySelectorAll('.enquete-opcao-input')).map(i=>i.value.trim()).filter(Boolean);
      if(!pergunta || opcoes.length<2){ showStatus('Preencha a pergunta e pelo menos 2 opções'); return; }
      criandoEnquete = false;
      await criarEnquete(pergunta, opcoes);
    };
  }

  // ---------- Perfil ----------
  function renderPerfil(){
    let html = headerHtml('Perfil', 'Como você aparece pras suas conexões');

    html += `<div class="profile-preview">
      <div class="av" style="background:${esc(profile.cor)}">${avatarHtml(profile)}</div>
      <div><div class="nm">${esc(profile.nome)}</div></div>
    </div>`;

    html += `<div class="section-title">Foto</div>
    <div class="card">
      <input type="file" id="avatar-input" accept="image/*" style="display:none">
      <button class="secondary" type="button" id="btn-avatar" style="margin-top:0;display:flex;align-items:center;justify-content:center;gap:8px">${ICONS.camera}Escolher foto</button>
      ${profile.avatar_url? `<button class="secondary" type="button" id="btn-avatar-remove">Remover foto</button>` : ''}
    </div>`;

    html += `<div class="section-title">Nome</div>
    <form class="card" id="f-nome">
      <div class="field"><input type="text" id="pf-nome2" value="${esc(profile.nome)}" required></div>
      <button class="primary" type="submit">Salvar</button>
    </form>`;

    html += `<div class="section-title">Cor</div>
    <div class="card"><div class="palette" id="cor-palette">
      ${CORES.map(c=>`<div class="sw ${c===profile.cor?'sel':''}" style="background:${c}" data-cor="${c}"></div>`).join('')}
      <label class="sw cor-custom-sw" title="Escolher outra cor (conta-gotas)">
        <input type="color" id="cor-custom" value="${esc(profile.cor)}">
      </label>
    </div></div>`;

    html += `<div class="section-title">Emoji ${profile.avatar_url? '· usado se remover a foto':''}</div>
    <div class="card">
      <div class="emoji-grid" id="emoji-grid">
        ${EMOJIS.map(e=>`<div class="em ${e===profile.emoji?'sel':''}" data-emoji="${e}">${e}</div>`).join('')}
      </div>
      <div class="field" style="margin-top:14px">
        <label>Outro emoji (digite ou cole)</label>
        <input type="text" id="emoji-custom" maxlength="8" placeholder="😀" value="${!EMOJIS.includes(profile.emoji)?esc(profile.emoji):''}">
      </div>
    </div>`;

    app.innerHTML = html + bottomNavHtml();
    bindCommon();

    document.getElementById('btn-avatar').onclick = ()=> document.getElementById('avatar-input').click();
    document.getElementById('avatar-input').onchange = async (e)=>{
      const file = e.target.files[0];
      if(!file) return;
      if(file.size > 3*1024*1024){ showStatus('Imagem muito grande (máx 3MB)'); return; }
      const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g,'') || 'jpg';
      const path = `${session.user.id}/avatar.${ext}`;
      showStatus('Enviando foto...');
      const { error } = await sb.storage.from(BUCKET_AVATARS).upload(path, file, { upsert:true, cacheControl:'3600' });
      if(error){ showStatus('Erro ao enviar foto'); console.error(error); return; }
      const { data } = sb.storage.from(BUCKET_AVATARS).getPublicUrl(path);
      await updateProfile({ avatar_url: data.publicUrl + '?t=' + Date.now() });
    };
    const rmBtn = document.getElementById('btn-avatar-remove');
    if(rmBtn) rmBtn.onclick = ()=> updateProfile({ avatar_url: null });

    document.getElementById('f-nome').onsubmit = (e)=>{
      e.preventDefault();
      const nome = document.getElementById('pf-nome2').value.trim();
      if(!nome) return;
      updateProfile({ nome });
    };
    document.querySelectorAll('#cor-palette .sw[data-cor]').forEach(el=>{
      el.onclick = ()=> updateProfile({ cor: el.dataset.cor });
    });
    document.getElementById('cor-custom').onchange = (e)=> updateProfile({ cor: e.target.value });
    document.querySelectorAll('#emoji-grid .em').forEach(el=>{
      el.onclick = ()=> updateProfile({ emoji: el.dataset.emoji });
    });
    document.getElementById('emoji-custom').onchange = (e)=>{
      const v = e.target.value.trim();
      if(v) updateProfile({ emoji: v });
    };
  }

  // ---------- Ajustes ----------
  function renderAjustes(){
    const tema = getTema();
    let html = `<div class="top-edit-bar">
      <button class="icon-btn" id="btn-fechar-ajustes">${ICONS.chevronLeft}</button>
      <div class="title">Ajustes</div>
      <div style="width:38px"></div>
    </div>`;

    html += `<div class="section-title" style="margin-top:0">Aparência</div>
    <div class="segmented" id="tema-seg">
      <button data-tema="system" class="${tema==='system'?'active':''}">Sistema</button>
      <button data-tema="light" class="${tema==='light'?'active':''}">Claro</button>
      <button data-tema="dark" class="${tema==='dark'?'active':''}">Escuro</button>
    </div>`;

    html += `<div class="section-title">Conta</div>
    <button class="secondary" id="btn-logout" style="display:flex;align-items:center;justify-content:center;gap:8px;color:var(--danger);border-color:var(--danger)">${ICONS.logout}Sair da conta</button>`;

    app.innerHTML = html;

    document.getElementById('btn-fechar-ajustes').onclick = ()=>{ mostrarAjustes = false; render(); };
    document.querySelectorAll('#tema-seg button').forEach(el=>{
      el.onclick = ()=> setTema(el.dataset.tema);
    });
    document.getElementById('btn-logout').onclick = async ()=>{
      sairDaConversa();
      await sb.auth.signOut();
      session = null; profile = null; friends=[]; incoming=[]; outgoing=[]; myAulas=[]; friendAulasMap={}; perfilMap={}; apelidos={}; presencaIndex={}; conversas=[]; novaConversaTipo=null; novaConversaSelecionados=[];
      authScreen = 'login'; tab = 'grade'; mostrarAjustes = false;
      render();
    };
  }

  function bottomNavHtml(){
    const badge = incoming.length ? `<span class="badge">${incoming.length}</span>` : '';
    const item = (id,label,icon,extra)=>`<button data-tab="${id}" class="${tab===id?'active':''}">${icon}<span>${label}</span>${extra||''}</button>`;
    return `<div class="bottomnav"><div class="inner">
      ${item('grade','Grade',ICONS.calendar)}
      ${item('conexoes','Conexões',ICONS.link,badge)}
      ${item('grupos','Grupos',ICONS.chat)}
      ${item('minhaarea','Minha área',ICONS.user)}
      ${item('perfil','Perfil',ICONS.userCircle)}
    </div></div>`;
  }

  function bindCommon(){
    const ajustesBtn = document.getElementById('btn-ajustes');
    if(ajustesBtn) ajustesBtn.onclick = ()=>{ mostrarAjustes = true; render(); };
    document.querySelectorAll('.bottomnav [data-tab]').forEach(b=>{
      b.onclick = ()=>{
        sairDaConversa(); novaConversaTipo = null; novaConversaSelecionados = [];
        tab = b.dataset.tab; editingAulaId = null; diasSelecionados = []; tipoSelecionado = 'aula'; render();
      };
    });
  }

  // ---------- init ----------
  async function init(){
    aplicarTema();
    if(window.matchMedia){
      window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', ()=>{
        if(getTema()==='system'){ aplicarTema(); }
      });
    }
    if(!sb){
      app.innerHTML = `<div class="empty" style="padding-top:90px">App ainda não conectado ao banco de dados.<br>Isso é configurado pelo desenvolvedor.</div>`;
      return;
    }
    if('serviceWorker' in navigator){
      navigator.serviceWorker.register('sw.js').catch(()=>{});
    }
    const { data } = await sb.auth.getSession();
    session = data.session;
    if(session){
      await fetchProfile();
      if(profile) await refreshAll();
    }
    render();
    setInterval(()=>{ if(session && tab==='grade' && !mostrarAjustes) render(); }, 60000);
  }
  init();
})();
