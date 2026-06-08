// Gerador de Fichas — Diablo RPG
// Carrega apenas na página /ficha/

(function() {
  'use strict';

  // ───── Constantes ─────
  const CONDITIONS = [
    { id: 'agarrado',     label: '🔗 Agarrado',     effect: 'Não pode se mover. Gasta ◈ e faz teste de Força (DC variável) para se soltar.' },
    { id: 'amedrontado',  label: '😨 Amedrontado',  effect: 'Desvantagem em ataques contra a fonte do medo. Deve usar o movimento para se afastar dela quando possível.' },
    { id: 'aprisionado',  label: '⛓ Aprisionado',  effect: 'Não pode se mover. Desvantagem em ataques. Escapa com teste de Força (DC variável) como ação ◈◈.' },
    { id: 'atordoado',    label: '💫 Atordoado',    effect: 'Perde ◈ no próximo turno (ou conforme a habilidade que causou o efeito).' },
    { id: 'caido',        label: '⬇ Caído',         effect: 'Inconsciente e morrendo. Um aliado pode gastar ◈ para estabilizar; ao ser estabilizado, acorda com 1 PV.' },
    { id: 'cego',         label: '👁️ Cego',          effect: 'Não pode ver. Desvantagem em todos os ataques. Inimigos atacando têm Vantagem contra ele.' },
    { id: 'derrubado',    label: '🪃 Derrubado',    effect: 'Está no chão. Desvantagem em ataques. Gasta ◈ para se levantar.' },
    { id: 'encantado',    label: '✨ Encantado',    effect: 'Não pode atacar a criatura que o encantou. Pode ter efeitos adicionais conforme a habilidade.' },
    { id: 'enjoado',      label: '🤢 Enjoado',      effect: '−1 em ataques enquanto a condição persistir.' },
    { id: 'envenenado',   label: '☣️ Envenenado',   effect: 'Sofre dano de Veneno por turno durante a duração indicada.' },
    { id: 'furioso',      label: '🔴 Furioso',      effect: 'Deve atacar o aliado mais próximo em vez do inimigo no próximo turno.' },
    { id: 'incapacitado', label: '🚫 Incapacitado', effect: 'Não pode agir nem reagir.' },
    { id: 'odiado',       label: '💔 Odiado',       effect: 'Toda cura recebida é convertida em dano equivalente pelo tempo indicado.' },
    { id: 'paralisado',   label: '❄️ Paralisado',   effect: 'Não pode se mover nem agir. Ataques contra um alvo Paralisado têm Vantagem.' }
  ];

  const ARMADURAS_OPT = [
    { v: '',                l: 'Sem armadura' },
    { v: 'Couro',           l: 'Couro (CA 13, Leve)' },
    { v: 'Couro Reforçado', l: 'Couro Reforçado (CA 14, Leve)' },
    { v: 'Brunea',          l: 'Brunea (CA 15, Média)' },
    { v: 'Cota de Malha',   l: 'Cota de Malha (CA 16, Média)' },
    { v: 'Meia-Placa',      l: 'Meia-Placa (CA 17, Pesada)' },
    { v: 'Placa Completa',  l: 'Placa Completa (CA 18, Pesada)' }
  ];

  const ESCUDOS_OPT = [
    { v: '',                l: 'Sem escudo' },
    { v: 'Broquel',         l: 'Broquel (+1 CA)' },
    { v: 'Escudo',          l: 'Escudo (+2 CA)' },
    { v: 'Escudo de Torre', l: 'Escudo de Torre (+3 CA)' }
  ];

  // ───── Estado ─────
  let personagens = [];
  let personagemAtual = null;
  let modoEdicao = false;
  let _isRendering = false;
  let _itemFormAberto = false;
  let _itemEditandoId = null;
  let _talentoFormAberto = false;

  // ───── Init ─────
  document.addEventListener('DOMContentLoaded', function() {
    const root = document.getElementById('ficha-app');
    if (!root) return;
    carregarPersonagens();
    renderizarLista();
    bindEventos();
  });

  // ───── Persistência ─────
  function carregarPersonagens() {
    try {
      const raw = localStorage.getItem('diablo-rpg-fichas');
      personagens = raw ? JSON.parse(raw) : [];
      personagens.forEach(p => {
        if (!p.condicoes) p.condicoes = [];
        if (!p.equipadoSlots) p.equipadoSlots = {};
        if (!p.items) p.items = [];
        if (!p.lacaios) p.lacaios = [];
        if (p.bonusAtkExtra === undefined) p.bonusAtkExtra = 0;
        if (p.bonusConjuracao === undefined) p.bonusConjuracao = 0;
        if (!p.atribAtk) p.atribAtk = '';
        if (!p.atribConj) p.atribConj = '';
        if (!p.notasEstruturadas) p.notasEstruturadas = { objetivos:[], npcs:'', missaoPrincipal:'', facoes:[], missoesSecundarias:'', rumores:'', bestiario:[] };
        if (p._arma2BloqueadaPor === undefined) p._arma2BloqueadaPor = null;
        // Migrar save antigo (armadura única → peças individuais)
        if (p.armadura && !p.equipamento.peito) {
          ['elmo','peito','luvas','perneiras','botas'].forEach(s => {
            if (!p.equipamento[s]) p.equipamento[s] = p.armadura;
          });
        }
      });
    } catch(e) { personagens = []; }
  }

  function salvarPersonagens() {
    localStorage.setItem('diablo-rpg-fichas', JSON.stringify(personagens));
  }

  function criarPersonagemVazio() {
    return {
      id: Date.now().toString(),
      nome: '', classe: 'amazona', atribPrimario: '',
      nivel: 1, xp: 0, titulo: '', antecedente: '',
      attrs: { FOR: 10, DES: 10, CON: 10, INT: 10, SAB: 10, CAR: 10 },
      pvMax: 0, pvAtual: 0, manaMax: 0, manaAtual: 0,
      ca: 10, atk: 0, armadura: '', escudo: '',
      bonusAtkExtra: 0, bonusConjuracao: 0, atribAtk: '', atribConj: '',
      equipamento: { elmo:'', peito:'', luvas:'', perneiras:'', botas:'',
                     especial:'', amuleto:'', anel1:'', anel2:'',
                     arma1:'', arma2:'', cinto:'' },
      equipadoSlots: {},
      items: [],
      lacaios: [],
      resistencias: { Fisico:0, Fogo:0, Gelo:0, Relampago:0, Veneno:0,
                      Necrotico:0, Radiante:0, Psiquico:0, Arcano:0 },
      condicoes: [], talentos: [], notas: '',
      notasEstruturadas: {
        objetivos: [], npcs: '', missaoPrincipal: '',
        facoes: [], missoesSecundarias: '', rumores: '', bestiario: []
      },
      criadoEm: new Date().toISOString(),
      atualizadoEm: new Date().toISOString()
    };
  }

  // ───── Utilitários ─────
  function debounce(fn, delay) {
    let timer;
    return function() { clearTimeout(timer); timer = setTimeout(fn, delay); };
  }

  // ───── Navegação ─────
  function mostrar(viewId) {
    ['view-lista','view-criacao','view-ficha','view-levelup'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = id === viewId ? '' : 'none';
    });
    window.scrollTo(0, 0);
  }

  // ───── Eventos globais ─────
  function bindEventos() {
    on('btn-novo', 'click', () => {
      personagemAtual = criarPersonagemVazio();
      modoEdicao = false;
      renderizarFormulario();
      mostrar('view-criacao');
    });
    on('btn-cancelar-criacao', 'click', () => mostrar('view-lista'));
    on('btn-salvar-criacao', 'click', salvarPersonagemDoForm);
    on('btn-voltar-lista', 'click', () => { renderizarLista(); mostrar('view-lista'); });
    on('btn-editar-ficha', 'click', () => {
      modoEdicao = true;
      renderizarFormulario();
      mostrar('view-criacao');
    });
    on('btn-excluir-ficha', 'click', excluirPersonagem);
    on('btn-exportar', 'click', exportarJSON);
    on('btn-importar-trigger', 'click', () => document.getElementById('input-importar')?.click());
    on('input-importar', 'change', importarJSON);
    on('btn-imprimir', 'click', () => window.print());
    on('btn-levelup', 'click', iniciarLevelUp);
    on('btn-confirmar-levelup', 'click', confirmarLevelUp);
    on('btn-cancelar-levelup', 'click', () => mostrar('view-ficha'));
    on('btn-salvar-ficha', 'click', () => {
      coletarCamposInline();
      salvarPersonagens();
      mostrarToast('Ficha salva!');
    });
    on('btn-descansar', 'click', () => {
      if (!personagemAtual) return;
      personagemAtual.pvAtual = personagemAtual.pvMax;
      personagemAtual.manaAtual = personagemAtual.manaMax;
      const idx = personagens.findIndex(x => x.id === personagemAtual.id);
      if (idx >= 0) personagens[idx] = personagemAtual;
      salvarPersonagens();
      renderizarFicha();
      mostrarToast('💤 Descansado! PV e Mana restaurados.');
    });
    on('form-classe', 'change', () => {
      atualizarAtribPrimarioSelect();
      const clsId = getValue('form-classe');
      const classItem = ITENS_CLASSE[clsId] || '';
      const especialEl = document.getElementById('form-eq-especial');
      if (especialEl && (!especialEl.value || Object.values(ITENS_CLASSE).includes(especialEl.value))) {
        especialEl.value = classItem;
      }
      atualizarCaPreviewForm();
      renderizarTalentoInicialForm();
    });
    on('btn-rolar-atributos', 'click', rolarAtributos);
    on('btn-add-talento', 'click', abrirTalentoForm);

    // Handlers globais para botões ± de PV e Mana
    window._fichaPVDelta = function(delta) {
      const p = personagemAtual;
      if (!p) return;
      const el = document.getElementById('inline-pv-atual');
      if (!el) return;
      const newVal = Math.max(0, Math.min(p.pvMax, (parseInt(el.value) || 0) + delta));
      el.value = newVal;
      p.pvAtual = newVal;
      setText('ficha-pv-display', `${p.pvAtual} / ${p.pvMax}`);
      const idx = personagens.findIndex(x => x.id === p.id);
      if (idx >= 0) personagens[idx] = p;
      salvarPersonagens();
      mostrarToast('✓ Salvo');
    };
    window._fichaManaDelta = function(delta) {
      const p = personagemAtual;
      if (!p) return;
      const el = document.getElementById('inline-mana-atual');
      if (!el) return;
      const newVal = Math.max(0, Math.min(p.manaMax, (parseInt(el.value) || 0) + delta));
      el.value = newVal;
      p.manaAtual = newVal;
      setText('ficha-mana-display', `${p.manaAtual} / ${p.manaMax}`);
      const idx = personagens.findIndex(x => x.id === p.id);
      if (idx >= 0) personagens[idx] = p;
      salvarPersonagens();
      mostrarToast('✓ Salvo');
    };

    // Auto-save com debounce na view da ficha
    const viewFicha = document.getElementById('view-ficha');
    if (viewFicha) {
      const autoSave = debounce(() => {
        if (!personagemAtual || _isRendering) return;
        coletarCamposInline();
        salvarPersonagens();
        mostrarToast('✓ Salvo');
      }, 800);
      viewFicha.addEventListener('input', autoSave);
      viewFicha.addEventListener('change', autoSave);
    }
  }

  function on(id, evt, fn) {
    const el = document.getElementById(id);
    if (el) el.addEventListener(evt, fn);
  }

  // ───── View: Lista ─────
  function renderizarLista() {
    const container = document.getElementById('lista-personagens');
    if (!container) return;
    if (personagens.length === 0) {
      container.innerHTML = '<p class="ficha-empty">Nenhum personagem criado ainda. Clique em <strong>Novo Personagem</strong> para começar.</p>';
      return;
    }
    container.innerHTML = personagens.map(p => {
      const cls = getClasse(p.classe);
      return `
        <div class="ficha-card" data-id="${p.id}">
          <div class="ficha-card-header">
            <span class="ficha-card-nome">${esc(p.nome || 'Sem nome')}</span>
            <span class="ficha-card-classe">${cls ? cls.nome : p.classe} · Nv ${p.nivel}</span>
          </div>
          <div class="ficha-card-info">
            <span>PV ${p.pvAtual}/${p.pvMax}</span>
            <span>Mana ${p.manaAtual}/${p.manaMax}</span>
            <span>CA ${p.ca}</span>
          </div>
          <div class="ficha-card-acoes">
            <button class="ficha-btn ficha-btn-primary btn-abrir" data-id="${p.id}">Abrir Ficha</button>
            <button class="ficha-btn ficha-btn-danger btn-del" data-id="${p.id}">✕</button>
          </div>
        </div>`;
    }).join('');
    container.querySelectorAll('.btn-abrir').forEach(btn => {
      btn.addEventListener('click', () => abrirPersonagem(btn.dataset.id));
    });
    container.querySelectorAll('.btn-del').forEach(btn => {
      btn.addEventListener('click', () => confirmarExclusao(btn.dataset.id));
    });
  }

  function abrirPersonagem(id) {
    personagemAtual = personagens.find(p => p.id === id);
    if (!personagemAtual) return;
    renderizarFicha();
    mostrar('view-ficha');
  }

  // ───── View: Criação/Edição ─────
  // ─── Preview CA no formulário ───
  function atualizarCaPreviewForm() {
    const cls = getClasse(getValue('form-classe')) || { id: '' };
    const attrs = {};
    ['FOR','DES','CON','INT','SAB','CAR'].forEach(a => { attrs[a] = parseInt(getValue('form-' + a)) || 10; });
    const equip = {};
    ['elmo','peito','luvas','perneiras','botas'].forEach(s => { equip[s] = getValue('form-eq-' + s) || ''; });
    const escudo = getValue('form-escudo') || '';
    const ca = calcCAFromEquip(cls, attrs, equip, escudo);
    const rd = calcRDFisico(equip);
    const info = ARMADURA_INFO[equip.peito] || null;
    const tipoStr = info ? info.tipo : 'Sem armadura';
    const ruido = info && info.ruido ? ' · <span style="color:#e67e22">Ruído</span>' : '';
    const reqFor = info && info.reqFOR ? ` · FOR mín. ${info.reqFOR}` : '';
    const prev = document.getElementById('form-ca-preview');
    if (prev) prev.innerHTML =
      `<span style="color:#27ae60">CA calculada: <strong>${ca}</strong></span>` +
      ` &nbsp; <span style="color:#aaa">${tipoStr}${reqFor}</span>${ruido}` +
      (rd > 0 ? ` &nbsp; <span style="color:#3498db">RD ${rd} Física</span>` : '');
  }

  function atualizarPreviewEfeito(selectId, previewId, lista) {
    const sel = document.getElementById(selectId);
    const prev = document.getElementById(previewId);
    if (!sel || !prev) return;
    const obj = lista.find(x => x.id === sel.value);
    prev.textContent = obj ? obj.efeito : '';
  }

  function renderizarFormulario() {
    const p = personagemAtual;
    setValue('form-nome', p.nome);
    setValue('form-nivel', p.nivel);
    setValue('form-xp', p.xp);
    // Título Ativo — select agrupado
    const selTitulo = document.getElementById('form-titulo');
    if (selTitulo) {
      const grupos = [...new Set(TITULOS.map(t => t.grupo))];
      selTitulo.innerHTML = '<option value="">— Selecionar Título —</option>' +
        grupos.map(g =>
          `<optgroup label="${g}">${TITULOS.filter(t => t.grupo === g).map(t =>
            `<option value="${t.id}" ${t.id === p.titulo ? 'selected' : ''}>${t.nome}</option>`
          ).join('')}</optgroup>`
        ).join('');
      atualizarPreviewEfeito('form-titulo', 'form-titulo-preview', TITULOS);
      selTitulo.onchange = () => atualizarPreviewEfeito('form-titulo', 'form-titulo-preview', TITULOS);
    }

    // Antecedente — select simples
    const selAnte = document.getElementById('form-antecedente');
    if (selAnte) {
      selAnte.innerHTML = '<option value="">— Selecionar Antecedente —</option>' +
        ANTECEDENTES.map(a =>
          `<option value="${a.id}" ${a.id === p.antecedente ? 'selected' : ''}>${a.nome}</option>`
        ).join('');
      atualizarPreviewEfeito('form-antecedente', 'form-antecedente-preview', ANTECEDENTES);
      selAnte.onchange = () => atualizarPreviewEfeito('form-antecedente', 'form-antecedente-preview', ANTECEDENTES);
    }
    setValue('form-notas', p.notas);

    const selClasse = document.getElementById('form-classe');
    if (selClasse) {
      selClasse.innerHTML = CLASSES.map(c =>
        `<option value="${c.id}" ${c.id === p.classe ? 'selected' : ''}>${c.nome}</option>`
      ).join('');
    }
    atualizarAtribPrimarioSelect();

    ['FOR','DES','CON','INT','SAB','CAR'].forEach(a => {
      setValue('form-' + a, p.attrs[a]);
      atualizarMod(a);
      const el = document.getElementById('form-' + a);
      if (el) el.oninput = () => { atualizarMod(a); atualizarCaPreviewForm(); };
    });

    Object.keys(p.resistencias).forEach(tipo => setValue('form-res-' + tipo, p.resistencias[tipo]));

    const titulo = document.getElementById('form-titulo-pagina');
    if (titulo) titulo.textContent = modoEdicao ? 'Editar Personagem' : 'Novo Personagem';

    renderizarTalentoInicialForm();
  }

  function atualizarAtribPrimarioSelect() {
    const selClasse = document.getElementById('form-classe');
    const selPrimario = document.getElementById('form-atrib-primario');
    if (!selClasse || !selPrimario) return;
    const cls = getClasse(selClasse.value);
    if (!cls) return;
    selPrimario.innerHTML = cls.atribPrimario.map(a =>
      `<option value="${a}" ${a === (personagemAtual?.atribPrimario || cls.atribPrimario[0]) ? 'selected' : ''}>${a}</option>`
    ).join('');
    // Populate atrib selects for ATK and Conjuração
    const ATTRS = ['FOR','DES','CON','INT','SAB','CAR'];
    const selAtk  = document.getElementById('form-atrib-atk');
    const selConj = document.getElementById('form-atrib-conj');
    const defaultAtk  = personagemAtual?.atribAtk  || (cls?.atribPrimario?.[0] || 'FOR');
    const defaultConj = personagemAtual?.atribConj || (cls?.atribPrimario?.[0] || 'FOR');
    if (selAtk)  selAtk.innerHTML  = ATTRS.map(a => `<option value="${a}" ${a === defaultAtk  ? 'selected' : ''}>${a}</option>`).join('');
    if (selConj) selConj.innerHTML = ATTRS.map(a => `<option value="${a}" ${a === defaultConj ? 'selected' : ''}>${a}</option>`).join('');
  }

  function atualizarMod(attr) {
    const el = document.getElementById('form-' + attr);
    const modEl = document.getElementById('form-mod-' + attr);
    if (el && modEl) {
      const m = mod(parseInt(el.value) || 10);
      modEl.textContent = (m >= 0 ? '+' : '') + m;
    }
  }

  function rolarAtributos() {
    ['FOR','DES','CON','INT','SAB','CAR'].forEach(a => {
      setValue('form-' + a, [1,2,3].reduce(acc => acc + Math.ceil(Math.random() * 6), 0));
      atualizarMod(a);
    });
  }

  function salvarPersonagemDoForm() {
    const p = personagemAtual;
    p.nome = getValue('form-nome') || 'Sem nome';
    p.classe = getValue('form-classe') || 'amazona';
    p.atribPrimario = getValue('form-atrib-primario') || '';
    p.atribAtk  = getValue('form-atrib-atk')  || '';
    p.atribConj = getValue('form-atrib-conj') || '';
    p.nivel = parseInt(getValue('form-nivel')) || 1;
    p.xp = parseInt(getValue('form-xp')) || 0;
    p.titulo = getValue('form-titulo') || '';
    p.antecedente = getValue('form-antecedente') || '';
    // Garante migração de texto livre antigo para id
    if (p.titulo && !TITULOS.find(t => t.id === p.titulo)) p.titulo = '';
    if (p.antecedente && !ANTECEDENTES.find(a => a.id === p.antecedente)) p.antecedente = '';
    p.notas = getValue('form-notas') || '';
    ['FOR','DES','CON','INT','SAB','CAR'].forEach(a => {
      p.attrs[a] = parseInt(getValue('form-' + a)) || 10;
    });

    const cls = getClasse(p.classe);
    const primAttrVal = p.attrs[p.atribPrimario] || p.attrs['FOR'];
    p.manaMax = calcManaMax(p.nivel, primAttrVal);
    if (p.manaAtual === 0 || p.manaAtual > p.manaMax) p.manaAtual = p.manaMax;
    p.pvMax = calcPVMax(p.nivel, cls ? cls.dv : 8, p.attrs.CON);
    if (p.pvAtual === 0 || p.pvAtual > p.pvMax) p.pvAtual = p.pvMax;

    // Slots de equipamento são gerenciados pela Mochila; formulário não os toca

    p.ca = calcCAFromEquip(cls || { id: p.classe }, p.attrs, p.equipamento, p.escudo, p.items || []);
    p.atk = mod(primAttrVal);
    Object.keys(p.resistencias).forEach(tipo => {
      p.resistencias[tipo] = parseInt(getValue('form-res-' + tipo)) || 0;
    });
    p.atualizadoEm = new Date().toISOString();

    if (!modoEdicao) {
      // Coletar talento inicial do form
      const talRoll = getValue('form-tal-select');
      if (talRoll) {
        const tipoTabela = getValue('form-tal-tipo');
        let talento = null;
        if (tipoTabela === 'geral') {
          const geralId = getValue('form-tal-geral-id');
          const tabela = TALENTOS_GERAIS.find(t => t.id === geralId);
          if (tabela) talento = tabela.talentos.find(t => t.roll === talRoll);
        } else {
          if (cls) talento = cls.talentos.find(t => t.roll === talRoll);
        }
        if (talento) {
          const aplicacao = aplicarTalentoSimples(p, talento.text);
          if (aplicacao) {
            if (aplicacao.tipo === 'attr') p.attrs[aplicacao.attr] += aplicacao.valor;
            if (aplicacao.tipo === 'pv') p.pvMax += aplicacao.valor;
            if (aplicacao.tipo === 'mana') p.manaMax += aplicacao.valor;
          }
          p.talentos.push({ roll: talRoll, texto: talento.text, nivel: 1 });
        }
      }
      personagens.push(p);
    } else {
      const idx = personagens.findIndex(x => x.id === p.id);
      if (idx >= 0) personagens[idx] = p;
    }
    salvarPersonagens();
    renderizarFicha();
    mostrar('view-ficha');
  }

  // ───── Coletar campos inline (auto-save) ─────
  function coletarCamposInline() {
    const p = personagemAtual;
    if (!p) return;

    ['FOR','DES','CON','INT','SAB','CAR'].forEach(a => {
      const el = document.getElementById('inline-attr-' + a);
      if (el) p.attrs[a] = parseInt(el.value) || 10;
    });

    const xpEl = document.getElementById('inline-xp');
    if (xpEl) p.xp = parseInt(xpEl.value) || 0;

    const escEl = document.getElementById('inline-escudo');
    if (escEl) p.escudo = escEl.value;

    const pvEl = document.getElementById('inline-pv-atual');
    const manaEl = document.getElementById('inline-mana-atual');
    if (pvEl) p.pvAtual = parseInt(pvEl.value) || 0;
    if (manaEl) p.manaAtual = parseInt(manaEl.value) || 0;

    Object.keys(p.equipamento).forEach(slot => {
      const el = document.getElementById('inline-eq-' + slot);
      if (el) p.equipamento[slot] = el.value;
    });
    Object.keys(p.resistencias).forEach(tipo => {
      const el = document.getElementById('inline-res-' + tipo);
      if (el) p.resistencias[tipo] = parseInt(el.value) || 0;
    });

    p.condicoes = CONDITIONS.filter(c =>
      document.getElementById('cond-' + c.id)?.classList.contains('ativo')
    ).map(c => c.id);

    recalcularStats();

    p.atualizadoEm = new Date().toISOString();
    const idx = personagens.findIndex(x => x.id === p.id);
    if (idx >= 0) personagens[idx] = p;
  }

  // ───── Recalcular stats ao vivo ─────
  function recalcularStats() {
    const p = personagemAtual;
    if (!p) return;
    const cls = getClasse(p.classe);
    const primAttrVal = p.attrs[p.atribPrimario] || p.attrs['FOR'] || 10;

    const atkAttrVal  = p.atribAtk  ? (p.attrs[p.atribAtk]  || 10) : primAttrVal;
    const conjAttrVal = p.atribConj ? (p.attrs[p.atribConj] || 10) : primAttrVal;
    p.pvMax = calcPVMax(p.nivel, cls ? cls.dv : 8, p.attrs.CON);
    p.manaMax = calcManaMax(p.nivel, primAttrVal);
    p.ca = calcCAFromEquip(cls || { id: p.classe }, p.attrs, p.equipamento, p.escudo, p.items || []);
    p.atk = mod(atkAttrVal);
    p.conjBase = mod(conjAttrVal);

    // Bônus de itens equipados
    const itemBonus = calcBonusFromItems(p.items || []);
    p.ca += itemBonus.ca;
    p.atk += itemBonus.atk;
    p.manaMax += itemBonus.manaMax;

    if (p.pvAtual > p.pvMax) p.pvAtual = p.pvMax;
    if (p.manaAtual > p.manaMax) p.manaAtual = p.manaMax;

    const rdFisicoCalc = calcRDFisico(p.equipamento, p.items);
    setText('ficha-pv-display', `${p.pvAtual} / ${p.pvMax}`);
    setText('ficha-mana-display', `${p.manaAtual} / ${p.manaMax}`);
    setText('ficha-ca-display', p.ca);
    const rdTotal = rdFisicoCalc + (itemBonus.rdFisico || 0) + (itemBonus.rdTodos || 0);
    setText('ficha-rd-display', rdTotal > 0 ? rdTotal : '—');
    const danoTotal = itemBonus.dano || 0;
    const danoEl = document.getElementById('ficha-dano-display');
    if (danoEl) danoEl.textContent = danoTotal > 0 ? `+${danoTotal}` : danoTotal < 0 ? `${danoTotal}` : '—';
    const atkTotal  = p.atk + (p.bonusAtkExtra || 0);
    const conjTotal = (p.conjBase || 0) + (p.bonusConjuracao || 0);
    setText('ficha-atk-display', `${atkTotal >= 0 ? '+' : ''}${atkTotal}`);
    const conjEl = document.getElementById('ficha-conj-display');
    if (conjEl) conjEl.textContent = `${conjTotal >= 0 ? '+' : ''}${conjTotal}`;
    // Labels dinâmicos com o atributo escolhido
    const atkLbl = document.getElementById('lbl-atk-bonus');
    if (atkLbl) atkLbl.textContent = `ATK (${p.atribAtk || p.atribPrimario || 'FOR'})`;
    const conjLbl = document.getElementById('lbl-conj-bonus');
    if (conjLbl) conjLbl.textContent = `Conjuração (${p.atribConj || p.atribPrimario || 'FOR'})`;

    // Atualizar resumo de armadura no painel
    const peito = p.equipamento.peito || '';
    const infoArm = ARMADURA_INFO[peito];
    const armSumEl = document.getElementById('ficha-armadura-summary');
    if (armSumEl) {
      armSumEl.textContent = infoArm ? `${infoArm.tipo}${infoArm.ruido ? ' · Ruído' : ''}${infoArm.reqFOR ? ` · FOR mín. ${infoArm.reqFOR}` : ''}` : 'Sem armadura';
    }

    ['FOR','DES','CON','INT','SAB','CAR'].forEach(a => {
      const modEl = document.getElementById('attr-mod-display-' + a);
      if (modEl) {
        const m = mod(p.attrs[a]);
        modEl.textContent = (m >= 0 ? '+' : '') + m;
        modEl.className = 'ficha-mod' + (m < 0 ? ' neg' : '');
      }
    });

    function resColorClass(v) { return v > 0 ? 'res-pos' : v < 0 ? 'res-neg' : 'res-zero'; }
    Object.keys(p.resistencias).forEach(tipo => {
      const attrBase = getAtribResistencia(tipo);
      const modAttr = attrBase ? mod(p.attrs[attrBase] || 10) : null;
      const modEl = document.getElementById('res-mod-' + tipo);
      if (modEl) modEl.textContent = modAttr !== null ? modAttr : '—';
      const totalEl = document.getElementById('res-total-' + tipo);
      if (totalEl) {
        const bonus = parseInt(document.getElementById('inline-res-' + tipo)?.value) || 0;
        const total = modAttr !== null ? modAttr + bonus : bonus;
        totalEl.textContent = total;
        totalEl.className = 'ficha-val ficha-total-rd ' + resColorClass(total);
      }
    });

    verificarAlertaXP();
  }

  function verificarAlertaXP() {
    const p = personagemAtual;
    if (!p) return;
    const btnLvl = document.getElementById('btn-levelup');
    if (!btnLvl) return;
    const pronto = p.xp >= p.nivel * 10 && p.nivel < 10;
    btnLvl.classList.toggle('levelup-ready', pronto);
    btnLvl.title = pronto ? `${p.xp}/${p.nivel * 10} XP — Pronto para subir de nível!` : '';
  }

  // ───── View: Ficha ─────
  function renderizarFicha() {
    const p = personagemAtual;
    if (!p) return;
    _isRendering = true;
    const cls = getClasse(p.classe);
    const nomeCls = cls ? cls.nome : p.classe;

    setHTML('ficha-nome-display', `<span class="ficha-nome-grande">${esc(p.nome)}</span>`);
    setHTML('ficha-classe-display', `${nomeCls} <span class="ficha-sub">· Atrib. Primário: ${p.atribPrimario}</span>`);
    setHTML('ficha-nivel-display', renderBarraNivel(p.nivel));

    // XP inline editável
    const xpWrapper = document.getElementById('ficha-xp-wrapper');
    if (xpWrapper) {
      xpWrapper.innerHTML = `<input type="number" id="inline-xp" min="0" value="${p.xp}" style="width:56px;text-align:center;padding:.15rem .3rem;background:#111;border:1px solid #333;border-radius:3px;color:#eee;font-size:.85rem"> / <span id="ficha-xp-max">${p.nivel * 10}</span>`;
    }
    const tituloObj = TITULOS.find(t => t.id === p.titulo);
    const anteObj   = ANTECEDENTES.find(a => a.id === p.antecedente);
    setText('ficha-titulo-display', tituloObj ? tituloObj.nome : (p.titulo || '—'));
    setText('ficha-titulo-efeito', tituloObj ? tituloObj.efeito : '');
    setText('ficha-antecedente-display', anteObj ? anteObj.nome : (p.antecedente || '—'));
    setText('ficha-antecedente-efeito', anteObj ? anteObj.efeito : '');

    // Recalcular stats ao carregar para garantir consistência
    const primAttrValLoad = p.attrs[p.atribPrimario] || p.attrs['FOR'] || 10;
    const atkAttrValLoad  = p.atribAtk  ? (p.attrs[p.atribAtk]  || 10) : primAttrValLoad;
    const conjAttrValLoad = p.atribConj ? (p.attrs[p.atribConj] || 10) : primAttrValLoad;
    const itemBonusLoad = calcBonusFromItems(p.items || []);
    p.ca       = calcCAFromEquip(cls || { id: p.classe }, p.attrs, p.equipamento, p.escudo, p.items || []) + itemBonusLoad.ca;
    p.atk      = mod(atkAttrValLoad) + itemBonusLoad.atk;
    p.conjBase = mod(conjAttrValLoad);
    salvarPersonagens();

    // Recursos
    setText('ficha-pv-display', `${p.pvAtual} / ${p.pvMax}`);
    setText('ficha-mana-display', `${p.manaAtual} / ${p.manaMax}`);
    setText('ficha-ca-display', p.ca);
    const rdInit = calcRDFisico(p.equipamento, p.items);
    setText('ficha-rd-display', rdInit > 0 ? rdInit : '—');
    const danoInit = itemBonusLoad.dano || 0;
    const danoElI = document.getElementById('ficha-dano-display');
    if (danoElI) danoElI.textContent = danoInit > 0 ? `+${danoInit}` : danoInit < 0 ? `${danoInit}` : '—';
    const atkTotalInit  = p.atk + (p.bonusAtkExtra || 0);
    const conjTotalInit = p.conjBase + (p.bonusConjuracao || 0);
    setText('ficha-atk-display', `${atkTotalInit >= 0 ? '+' : ''}${atkTotalInit}`);
    setText('ficha-conj-display', `${conjTotalInit >= 0 ? '+' : ''}${conjTotalInit}`);
    const atkLblI = document.getElementById('lbl-atk-bonus');
    if (atkLblI) atkLblI.textContent = `ATK (${p.atribAtk || p.atribPrimario || 'FOR'})`;
    const conjLblI = document.getElementById('lbl-conj-bonus');
    if (conjLblI) conjLblI.textContent = `Conjuração (${p.atribConj || p.atribPrimario || 'FOR'})`;

    // PV / Mana com botões ±
    setHTML('ficha-recursos-atuais', `
      <div class="recursos-atuais-row">
        <div class="recurso-inline">
          <label>PV atual:</label>
          <button onclick="window._fichaPVDelta(-5)" type="button" class="btn-pm">-5</button>
          <button onclick="window._fichaPVDelta(-1)" type="button" class="btn-pm">-1</button>
          <input type="number" id="inline-pv-atual" class="ficha-input-small" min="0" max="${p.pvMax}" value="${p.pvAtual}">
          <button onclick="window._fichaPVDelta(1)" type="button" class="btn-pm">+1</button>
          <button onclick="window._fichaPVDelta(5)" type="button" class="btn-pm">+5</button>
        </div>
        <div class="recurso-inline">
          <label>Mana atual:</label>
          <button onclick="window._fichaManaDelta(-5)" type="button" class="btn-pm">-5</button>
          <button onclick="window._fichaManaDelta(-1)" type="button" class="btn-pm">-1</button>
          <input type="number" id="inline-mana-atual" class="ficha-input-small" min="0" max="${p.manaMax}" value="${p.manaAtual}">
          <button onclick="window._fichaManaDelta(1)" type="button" class="btn-pm">+1</button>
          <button onclick="window._fichaManaDelta(5)" type="button" class="btn-pm">+5</button>
        </div>
      </div>`);


    // Atributos editáveis
    const attrNomes = { FOR:'Força', DES:'Destreza', CON:'Constituição', INT:'Inteligência', SAB:'Sabedoria', CAR:'Carisma' };
    const tblBody = document.getElementById('ficha-atributos-body');
    if (tblBody) {
      tblBody.innerHTML = Object.entries(p.attrs).map(([a, v]) => {
        const m = mod(v);
        return `<tr>
          <td>${attrNomes[a]}</td>
          <td class="ficha-val"><input type="number" class="ficha-input-inline ficha-input-small" id="inline-attr-${a}" value="${v}" min="3" max="20"></td>
          <td class="ficha-mod ${m<0?'neg':''}" id="attr-mod-display-${a}">${m>=0?'+':''}${m}</td>
        </tr>`;
      }).join('');
      Object.keys(p.attrs).forEach(a => {
        const el = document.getElementById('inline-attr-' + a);
        if (el) el.oninput = () => { p.attrs[a] = parseInt(el.value) || 10; recalcularStats(); };
      });
    }

    // Habilidades de Classe
    if (cls) {
      const habBody = document.getElementById('ficha-habilidades-body');
      if (habBody) {
        habBody.innerHTML = cls.habilidades.map(h => `<li class="ficha-habilidade">${esc(h)}</li>`).join('');
      }
    }

    // Talentos
    _talentoFormAberto = false;
    renderizarTalentosPanel();

    // Datalist de armas (popular na abertura da ficha, não depende do form de criação)
    const dl = document.getElementById('datalist-armas');
    if (dl && !dl.children.length) {
      dl.innerHTML = ARMAS_LISTA.map(a => `<option value="${a}">`).join('');
    }

    // Equipamento
    const eqNomes = {
      arma1:'Arma 1', arma2:'Arma 2', especial:'Especial de Classe',
      elmo:'Elmo', peito:'Peitoral', luvas:'Luvas', perneiras:'Perneiras', botas:'Botas',
      escudo:'Escudo', amuleto:'Amuleto', anel1:'Anel 1', anel2:'Anel 2', cinto:'Cinto'
    };
    const armorSlotsView = ['elmo','peito','luvas','perneiras','botas'];
    const weaponSlotsView = ['arma1','arma2'];
    const eqBody = document.getElementById('ficha-equipamento-body');
    if (eqBody) {
      eqBody.innerHTML = Object.entries(eqNomes).map(([slot, nome]) => {
        // Arma2 bloqueada por arma 2H equipada na arma1
        if (slot === 'arma2' && p._arma2BloqueadaPor) {
          const arma2H = (p.items || []).find(i => i.id === p._arma2BloqueadaPor);
          if (arma2H) return `<tr><td class="ficha-slot-nome">${nome}</td><td><span style="color:#666;font-size:.82rem">2H — ${esc(arma2H.nome)}</span></td></tr>`;
        }

        const eqItem = (p.items || []).find(i => i.equipadoEm === slot);

        if (eqItem) {
          const qualStyle = MOCHILA_QUAL_STYLE[eqItem.qualidade] || 'color:#aaa';
          const bonusTexts = [];
          if (eqItem.bonusCA)       bonusTexts.push(`CA ${eqItem.bonusCA > 0 ? '+' : ''}${eqItem.bonusCA}`);
          if (eqItem.bonusATK)      bonusTexts.push(`ATK ${eqItem.bonusATK > 0 ? '+' : ''}${eqItem.bonusATK}`);
          if (eqItem.bonusDano)     bonusTexts.push(`Dano ${eqItem.bonusDano > 0 ? '+' : ''}${eqItem.bonusDano}`);
          if (eqItem.bonusRDFisico) bonusTexts.push(`RD Fís. +${eqItem.bonusRDFisico}`);
          if (eqItem.bonusRDTodos)  bonusTexts.push(`RD Todos +${eqItem.bonusRDTodos}`);
          if (eqItem.bonusManaMax)  bonusTexts.push(`Mana ${eqItem.bonusManaMax > 0 ? '+' : ''}${eqItem.bonusManaMax}`);
          return `<tr>
            <td class="ficha-slot-nome">${nome}</td>
            <td><div class="slot-item-card">
              <div style="${qualStyle};font-weight:700;font-size:.85rem">${esc(eqItem.nome)}${eqItem.nomeAfixo ? ` <span style="color:#888;font-weight:400;font-size:.85em">${esc(eqItem.nomeAfixo)}</span>` : ''}</div>
              ${(eqItem.infoBase || eqItem.atributo) ? `<div style="font-size:.78rem;color:#bbb;margin-bottom:.1rem">${eqItem.infoBase ? esc(eqItem.infoBase) : ''}${eqItem.atributo ? ` <span style="color:#e67e22">${esc(eqItem.atributo)}</span>` : ''}</div>` : ''}
              ${bonusTexts.length ? `<div style="font-size:.72rem;color:#4a9edd;margin-top:.1rem">${bonusTexts.join(' · ')}</div>` : ''}
              <button class="ficha-btn ficha-btn-secondary" style="font-size:.7rem;padding:.1rem .4rem;margin-top:.3rem"
                onclick="window._fichaDesequipar('${eqItem.id}')">Desequipar</button>
            </div></td>
          </tr>`;
        }

        return `<tr><td class="ficha-slot-nome">${nome}</td><td><span style="color:#3a3a3a;font-size:.85rem">—</span></td></tr>`;
      }).join('');

    }

    // Resistências com total ao vivo
    const resNomes = {
      Fisico:'🛡️ Físico', Fogo:'🔥 Fogo', Gelo:'❄️ Gelo', Relampago:'⚡ Relâmpago',
      Veneno:'☣️ Veneno', Necrotico:'💀 Necrótico', Radiante:'✨ Radiante',
      Psiquico:'🧠 Psíquico', Arcano:'🔮 Arcano'
    };
    const resBody = document.getElementById('ficha-resistencias-body');
    if (resBody) {
      resBody.innerHTML = Object.entries(resNomes).map(([tipo, nome]) => {
        const val = p.resistencias[tipo] || 0;
        const attrBase = getAtribResistencia(tipo);
        const modAttr = attrBase ? mod(p.attrs[attrBase] || 10) : null;
        const total = modAttr !== null ? modAttr + val : val;
        const tc = total > 0 ? 'res-pos' : total < 0 ? 'res-neg' : 'res-zero';
        return `<tr>
          <td>${nome}</td>
          <td class="ficha-val" id="res-mod-${tipo}">${modAttr !== null ? modAttr : '—'}</td>
          <td><input type="number" class="ficha-input-inline ficha-input-small" id="inline-res-${tipo}" value="${val}" min="-20" max="50"></td>
          <td class="ficha-val ficha-total-rd ${tc}" id="res-total-${tipo}">${total}</td>
        </tr>`;
      }).join('');
      Object.keys(p.resistencias).forEach(tipo => {
        const bonusEl = document.getElementById('inline-res-' + tipo);
        if (bonusEl) bonusEl.oninput = () => {
          const attrBase = getAtribResistencia(tipo);
          const modAttr = attrBase ? mod(p.attrs[attrBase] || 10) : null;
          const bonus = parseInt(bonusEl.value) || 0;
          const total = modAttr !== null ? modAttr + bonus : bonus;
          const totalEl = document.getElementById('res-total-' + tipo);
          if (totalEl) {
            totalEl.textContent = total;
            totalEl.className = 'ficha-val ficha-total-rd ' + (total > 0 ? 'res-pos' : total < 0 ? 'res-neg' : 'res-zero');
          }
        };
      });
    }

    // Condições
    const condBody = document.getElementById('ficha-condicoes-body');
    if (condBody) {
      condBody.innerHTML =
        '<div class="cond-badges">' +
        CONDITIONS.map(c =>
          `<button class="condicao-badge ${(p.condicoes||[]).includes(c.id) ? 'ativo' : ''}" id="cond-${c.id}" data-cond="${c.id}" title="${c.effect}" type="button">${c.label}</button>`
        ).join('') +
        '</div>' +
        '<div class="cond-descricao" id="cond-descricao"></div>';

      const atualizarDescricao = () => {
        const desc = document.getElementById('cond-descricao');
        if (!desc) return;
        const ativas = CONDITIONS.filter(c => document.getElementById('cond-' + c.id)?.classList.contains('ativo'));
        desc.innerHTML = ativas.length
          ? ativas.map(c => `<div class="cond-desc-item"><strong>${c.label}</strong> — ${c.effect}</div>`).join('')
          : '';
      };

      condBody.querySelectorAll('.condicao-badge').forEach(btn => {
        btn.onclick = (e) => {
          e.stopPropagation();
          btn.classList.toggle('ativo');
          const condId = btn.dataset.cond;
          if (!p.condicoes) p.condicoes = [];
          if (btn.classList.contains('ativo')) {
            if (!p.condicoes.includes(condId)) p.condicoes.push(condId);
          } else {
            p.condicoes = p.condicoes.filter(c => c !== condId);
          }
          const idx = personagens.findIndex(x => x.id === p.id);
          if (idx >= 0) personagens[idx] = p;
          salvarPersonagens();
          atualizarDescricao();
        };
      });

      atualizarDescricao();
    }

    renderizarNotas();

    const btnLvl = document.getElementById('btn-levelup');
    if (btnLvl) btnLvl.disabled = p.nivel >= 10;
    verificarAlertaXP();

    // Bônus extras (ATK e Conjuração) — inline editáveis
    const bonusRow = document.getElementById('ficha-bonus-row');
    if (bonusRow) {
      bonusRow.innerHTML = `
        <div class="bonus-extra-item">
          <span class="recurso-label">Extra ATK</span>
          <div style="margin-top:.3rem;text-align:center">
            <input type="number" id="inline-bonus-atk" class="ficha-input-small" value="${p.bonusAtkExtra||0}" style="width:56px;text-align:center;background:#111;border:1px solid #333;border-radius:3px;color:#eee;padding:.2rem .3rem">
          </div>
        </div>
        <div class="bonus-extra-item">
          <span class="recurso-label">Extra Conj.</span>
          <div style="margin-top:.3rem;text-align:center">
            <input type="number" id="inline-bonus-conj" class="ficha-input-small" value="${p.bonusConjuracao||0}" style="width:56px;text-align:center;background:#111;border:1px solid #333;border-radius:3px;color:#eee;padding:.2rem .3rem">
          </div>
        </div>`;
      const atkEl = document.getElementById('inline-bonus-atk');
      if (atkEl) atkEl.oninput = () => { p.bonusAtkExtra = parseInt(atkEl.value) || 0; recalcularStats(); salvarPersonagens(); };
      const conjEl2 = document.getElementById('inline-bonus-conj');
      if (conjEl2) conjEl2.oninput = () => { p.bonusConjuracao = parseInt(conjEl2.value) || 0; recalcularStats(); salvarPersonagens(); };
    }

    renderizarMochila();
    renderizarLacaios();

    _isRendering = false;
  }

  // ───── Talento Inicial (formulário de criação) ─────
  function renderizarTalentoInicialForm() {
    const sec = document.getElementById('form-talento-section');
    if (!sec) return;
    if (modoEdicao) { sec.innerHTML = ''; return; }

    const clsId = getValue('form-classe') || 'amazona';
    const cls = getClasse(clsId);
    const tabelaGeralOpts = TALENTOS_GERAIS.map(t =>
      `<option value="${t.id}">${t.nome}</option>`
    ).join('');

    sec.innerHTML = `
      <h3>Talento Inicial (Nível 1)</h3>
      <p style="font-size:.82rem;color:#888;margin:.0 0 .8rem">Personagens começam com 1 talento. Role ou escolha abaixo.</p>
      <div class="ficha-form-row" style="margin-bottom:.6rem">
        <div class="ficha-form-group">
          <label>Tabela</label>
          <select id="form-tal-tipo">
            <option value="classe">Tabela da Classe</option>
            <option value="geral">Tabela Geral</option>
          </select>
        </div>
        <div class="ficha-form-group" id="form-tal-geral-group" style="display:none">
          <label>Tabela Geral</label>
          <select id="form-tal-geral-id">${tabelaGeralOpts}</select>
        </div>
        <div class="ficha-form-group" style="display:flex;align-items:flex-end">
          <button class="ficha-btn ficha-btn-secondary" id="btn-rolar-talento-inicial" type="button">🎲 Rolar d20</button>
        </div>
        <div class="ficha-form-group">
          <label>Resultado</label>
          <div id="form-tal-roll-display" style="font-size:1.4rem;font-weight:700;color:#e74c3c;text-align:center;padding:.25rem 0">—</div>
        </div>
      </div>
      <div class="ficha-form-row">
        <div class="ficha-form-group" style="grid-column:span 2">
          <label>Talento</label>
          <select id="form-tal-select"></select>
        </div>
      </div>
      <div id="form-tal-texto" style="font-size:.82rem;color:#bbb;margin-top:.5rem;padding:.5rem .6rem;background:#0d1a0d;border-left:3px solid #2d5a2d;border-radius:3px;display:none"></div>`;

    const tipoSel = document.getElementById('form-tal-tipo');
    const geralGroup = document.getElementById('form-tal-geral-group');
    const rolarBtn = document.getElementById('btn-rolar-talento-inicial');

    function getTabela() {
      if (tipoSel.value === 'geral') {
        const geralId = getValue('form-tal-geral-id');
        return TALENTOS_GERAIS.find(t => t.id === geralId)?.talentos || [];
      }
      return cls ? cls.talentos : [];
    }

    function popularSelect(talentos, selecionado) {
      const sel = document.getElementById('form-tal-select');
      if (!sel) return;
      sel.innerHTML = '<option value="">— Nenhum talento inicial —</option>' +
        talentos.map(t => `<option value="${t.roll}" ${t.roll === selecionado ? 'selected' : ''}>[${t.roll}] ${t.text.substring(0, 90)}${t.text.length > 90 ? '…' : ''}</option>`).join('');
      atualizarTextoTalento();
    }

    function atualizarTextoTalento() {
      const sel = document.getElementById('form-tal-select');
      const txt = document.getElementById('form-tal-texto');
      if (!sel || !txt) return;
      const tabela = getTabela();
      const found = tabela.find(t => t.roll === sel.value);
      if (found) { txt.textContent = found.text; txt.style.display = ''; }
      else { txt.style.display = 'none'; }
    }

    tipoSel.onchange = () => {
      geralGroup.style.display = tipoSel.value === 'geral' ? '' : 'none';
      popularSelect(getTabela(), null);
    };

    const geralSel = document.getElementById('form-tal-geral-id');
    if (geralSel) geralSel.onchange = () => popularSelect(getTabela(), null);

    rolarBtn.onclick = () => {
      const roll = Math.ceil(Math.random() * 20);
      document.getElementById('form-tal-roll-display').textContent = roll;
      const tabela = getTabela();
      const talento = tabela.find(t => {
        if (t.roll.includes('-')) {
          const [min, max] = t.roll.split('-').map(Number);
          return roll >= min && roll <= max;
        }
        return parseInt(t.roll) === roll;
      });
      popularSelect(tabela, talento?.roll);
    };

    const sel = document.getElementById('form-tal-select');
    if (sel) sel.onchange = atualizarTextoTalento;

    popularSelect(getTabela(), null);
  }

  // ───── Talento livre na ficha ─────
  function abrirTalentoForm() {
    _talentoFormAberto = true;
    renderizarTalentosPanel();
  }

  function renderizarTalentosPanel() {
    const p = personagemAtual;
    const body = document.getElementById('ficha-talentos-body');
    if (!body || !p) return;

    if (_talentoFormAberto) {
      const cls = getClasse(p.classe);
      const tabelaGeralOpts = TALENTOS_GERAIS.map(t =>
        `<option value="${t.id}">${t.nome}</option>`
      ).join('');
      body.innerHTML = `
        <div class="ficha-item-form">
          <h4 style="margin:0 0 .8rem;color:#e74c3c">Adicionar Talento</h4>
          <div class="ficha-form-row" style="margin-bottom:.6rem">
            <div class="ficha-form-group">
              <label>Tabela</label>
              <select id="tal-form-tipo">
                <option value="classe">Tabela da Classe</option>
                <option value="geral">Tabela Geral</option>
              </select>
            </div>
            <div class="ficha-form-group" id="tal-form-geral-group" style="display:none">
              <label>Tabela Geral</label>
              <select id="tal-form-geral-id">${tabelaGeralOpts}</select>
            </div>
          </div>
          <div class="ficha-form-row">
            <div class="ficha-form-group" style="grid-column:span 2">
              <label>Talento</label>
              <select id="tal-form-select"><option value="">— Escolha o talento —</option></select>
            </div>
          </div>
          <div id="tal-form-texto" style="font-size:.82rem;color:#bbb;margin-top:.5rem;padding:.5rem .6rem;background:#0d1a0d;border-left:3px solid #2d5a2d;border-radius:3px;display:none"></div>
          <div style="display:flex;gap:.6rem;margin-top:.8rem;justify-content:flex-end">
            <button class="ficha-btn ficha-btn-secondary" onclick="window._fichaCancelarTalento()" type="button">Cancelar</button>
            <button class="ficha-btn ficha-btn-primary" onclick="window._fichaSalvarTalento()" type="button">✔ Adicionar</button>
          </div>
        </div>`;

      function getTabelaFicha() {
        const tipo = getValue('tal-form-tipo');
        if (tipo === 'geral') {
          const geralId = getValue('tal-form-geral-id');
          return TALENTOS_GERAIS.find(t => t.id === geralId)?.talentos || [];
        }
        return cls ? cls.talentos : [];
      }

      function popularSelectFicha() {
        const sel = document.getElementById('tal-form-select');
        if (!sel) return;
        const tabela = getTabelaFicha();
        sel.innerHTML = '<option value="">— Escolha o talento —</option>' +
          tabela.map(t => `<option value="${t.roll}">[${t.roll}] ${t.text.substring(0, 90)}${t.text.length > 90 ? '…' : ''}</option>`).join('');
        atualizarTextoTalentoFicha();
      }

      function atualizarTextoTalentoFicha() {
        const sel = document.getElementById('tal-form-select');
        const txt = document.getElementById('tal-form-texto');
        if (!sel || !txt) return;
        const tabela = getTabelaFicha();
        const found = tabela.find(t => t.roll === sel.value);
        if (found) { txt.textContent = found.text; txt.style.display = ''; }
        else { txt.style.display = 'none'; }
      }

      const tipoSel = document.getElementById('tal-form-tipo');
      const geralGroup = document.getElementById('tal-form-geral-group');
      if (tipoSel) tipoSel.onchange = () => {
        if (geralGroup) geralGroup.style.display = tipoSel.value === 'geral' ? '' : 'none';
        popularSelectFicha();
      };
      const geralSel = document.getElementById('tal-form-geral-id');
      if (geralSel) geralSel.onchange = popularSelectFicha;
      const talSel = document.getElementById('tal-form-select');
      if (talSel) talSel.onchange = atualizarTextoTalentoFicha;

      popularSelectFicha();
      return;
    }

    // Lista normal de talentos
    if (p.talentos.length === 0) {
      body.innerHTML = '<li class="ficha-empty-small" style="list-style:none;padding:.4rem 0;color:#666">Nenhum talento ainda. Suba de nível para ganhar talentos.</li>';
    } else {
      body.innerHTML = '<ul class="ficha-talentos-list">' + p.talentos.map((t, i) =>
        `<li class="ficha-talento" data-idx="${i}">
          <span class="ficha-talento-nivel">Nv ${t.nivel || '?'}</span>
          <span class="ficha-talento-texto">${esc(t.texto)}</span>
          <button class="ficha-btn-icon btn-del-talento" data-idx="${i}" title="Remover talento">✕</button>
        </li>`
      ).join('') + '</ul>';
      body.querySelectorAll('.btn-del-talento').forEach(btn => {
        btn.addEventListener('click', () => removerTalento(parseInt(btn.dataset.idx)));
      });
    }
  }

  function cancelarTalentoForm() {
    _talentoFormAberto = false;
    renderizarTalentosPanel();
  }

  function salvarTalentoDoForm() {
    const p = personagemAtual;
    if (!p) return;
    const tipo = getValue('tal-form-tipo');
    const rollVal = getValue('tal-form-select');
    if (!rollVal) { mostrarToast('Escolha um talento primeiro!'); return; }

    let talento = null;
    if (tipo === 'geral') {
      const geralId = getValue('tal-form-geral-id');
      const tabela = TALENTOS_GERAIS.find(t => t.id === geralId);
      if (tabela) talento = tabela.talentos.find(t => t.roll === rollVal);
    } else {
      const cls = getClasse(p.classe);
      if (cls) talento = cls.talentos.find(t => t.roll === rollVal);
    }
    if (!talento) { mostrarToast('Talento não encontrado!'); return; }

    const aplicacao = aplicarTalentoSimples(p, talento.text);
    if (aplicacao) {
      if (aplicacao.tipo === 'attr') p.attrs[aplicacao.attr] += aplicacao.valor;
      if (aplicacao.tipo === 'pv') p.pvMax += aplicacao.valor;
      if (aplicacao.tipo === 'mana') p.manaMax += aplicacao.valor;
    }
    p.talentos.push({ roll: rollVal, texto: talento.text, nivel: p.nivel });
    const idx = personagens.findIndex(x => x.id === p.id);
    if (idx >= 0) personagens[idx] = p;
    salvarPersonagens();
    _talentoFormAberto = false;
    renderizarFicha();
    mostrarToast('Talento adicionado!');
  }

  window._fichaCancelarTalento = cancelarTalentoForm;
  window._fichaSalvarTalento = salvarTalentoDoForm;

  // ───── Inventário / Mochila ─────
  const MOCHILA_SLOT_NOMES = {
    arma:'Arma', peito:'Peitoral', elmo:'Elmo', luvas:'Luvas',
    perneiras:'Perneiras', botas:'Botas', escudo:'Escudo',
    anel:'Anel', amuleto:'Amuleto', cinto:'Cinto', especial:'Especial de Classe'
  };
  const MOCHILA_QUAL_STYLE = {
    'Normal':'color:#aaa', 'Mágico':'color:#4a9edd', 'Mágica':'color:#4a9edd',
    'Raro':'color:#f0c040', 'Rara':'color:#f0c040',
    'Lendário':'color:#ff8c00', 'Lendária':'color:#ff8c00',
    'Único':'color:#a040c0', 'Set':'color:#27ae60'
  };

  function renderizarMochila() {
    const p = personagemAtual;
    const panel = document.getElementById('ficha-mochila-body');
    if (!panel || !p) return;

    if (_itemFormAberto) {
      panel.innerHTML = renderFormItem();
      const slotSel = document.getElementById('item-form-slot-tipo');
      if (slotSel) slotSel.onchange = () => {
        const armorSlots = ['peito','elmo','luvas','perneiras','botas'];
        const grp = document.getElementById('item-form-tipo-armadura-group');
        if (grp) grp.style.display = armorSlots.includes(slotSel.value) ? '' : 'none';
        const atribGrp = document.getElementById('item-form-atributo-group');
        if (atribGrp) atribGrp.style.display = slotSel.value === 'arma' ? '' : 'none';
        const dMaosGrp = document.getElementById('item-form-duasmaos-group');
        if (dMaosGrp) dMaosGrp.style.display = slotSel.value === 'arma' ? '' : 'none';
      };
      return;
    }

    const mochila = (p.items || []).filter(i => !i.equipadoEm);
    const limiteSlots = mod(p.attrs.FOR || 10) + (p.nivel || 1);
    const slotsUsados = mochila.reduce((acc, i) => acc + (i.duasMaos ? 2 : 1), 0);
    const sobrecarga = slotsUsados > limiteSlots;
    const capStyle = sobrecarga ? 'color:#e74c3c;font-weight:700' : slotsUsados >= limiteSlots ? 'color:#e67e22;font-weight:600' : 'color:#888';
    const capHTML = `<div style="font-size:.82rem;margin-bottom:.5rem;${capStyle}">
      Slots: ${slotsUsados} / ${limiteSlots} (Mod FOR ${mod(p.attrs.FOR || 10) >= 0 ? '+' : ''}${mod(p.attrs.FOR || 10)} + Nível ${p.nivel || 1})
      ${sobrecarga ? ' ⚠ Sobrecarregado — dobro de ações para mover' : ''}
    </div>`;
    const addBtn = `<div style="margin-bottom:.8rem">${capHTML}<button class="ficha-btn ficha-btn-primary" onclick="window._fichaNovoItem()" type="button">+ Novo Item</button></div>`;

    if (mochila.length === 0) {
      panel.innerHTML = addBtn + '<p class="ficha-empty-small">Mochila vazia. Use o botão acima para adicionar itens ao personagem.</p>';
      return;
    }

    panel.innerHTML = addBtn + mochila.map(item => {
      const qualStyle = MOCHILA_QUAL_STYLE[item.qualidade] || 'color:#aaa';
      const slotNome = MOCHILA_SLOT_NOMES[item.slotTipo] || item.slotTipo || '';
      const bonusTexts = [];
      if (item.bonusCA)       bonusTexts.push(`CA ${item.bonusCA > 0 ? '+' : ''}${item.bonusCA}`);
      if (item.bonusATK)      bonusTexts.push(`ATK ${item.bonusATK > 0 ? '+' : ''}${item.bonusATK}`);
      if (item.bonusDano)     bonusTexts.push(`Dano ${item.bonusDano > 0 ? '+' : ''}${item.bonusDano}`);
      if (item.bonusRDFisico) bonusTexts.push(`RD Fís. +${item.bonusRDFisico}`);
      if (item.bonusRDTodos)  bonusTexts.push(`RD Todos +${item.bonusRDTodos}`);
      if (item.bonusManaMax)  bonusTexts.push(`Mana ${item.bonusManaMax > 0 ? '+' : ''}${item.bonusManaMax}`);

      const multiSlots = item.slotTipo === 'arma' ? (item.duasMaos ? ['arma1'] : ['arma1','arma2']) : item.slotTipo === 'anel' ? ['anel1','anel2'] : null;
      let equipBtns;
      if (multiSlots) {
        const labels = item.slotTipo === 'arma' ? (item.duasMaos ? ['Arma 1 (2H)'] : ['Arma 1','Arma 2']) : ['Anel 1','Anel 2'];
        equipBtns = multiSlots.map((s, i) =>
          `<button class="ficha-btn ficha-btn-primary" style="font-size:.75rem;padding:.15rem .5rem"
            onclick="window._fichaEquipar('${s}','${item.id}')">Equipar (${labels[i]})</button>`
        ).join(' ');
      } else {
        equipBtns = `<button class="ficha-btn ficha-btn-primary" style="font-size:.75rem;padding:.15rem .5rem"
          onclick="window._fichaEquipar('${item.slotTipo}','${item.id}')">Equipar</button>`;
      }

      return `<div class="mochila-item">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:.5rem;flex-wrap:wrap">
          <div style="flex:1;min-width:0">
            <div style="${qualStyle};font-weight:700;font-size:.9rem">${esc(item.nome)}${item.nomeAfixo ? ` <span style="color:#888;font-weight:400">${esc(item.nomeAfixo)}</span>` : ''}</div>
            <div style="font-size:.73rem;color:#666;margin-bottom:.15rem">${esc(item.qualidade)} · ${esc(slotNome)}${item.infoBase ? ' · ' + esc(item.infoBase) : ''}${item.atributo ? ` · <span style="color:#e67e22">${esc(item.atributo)}</span>` : ''}</div>
            ${bonusTexts.length ? `<div style="font-size:.75rem;color:#4a9edd">${bonusTexts.join(' &nbsp;·&nbsp; ')}</div>` : ''}
          </div>
          <div style="display:flex;gap:.3rem;align-items:center;flex-wrap:wrap;flex-shrink:0">
            ${equipBtns}
            <button class="ficha-btn ficha-btn-secondary" style="font-size:.75rem;padding:.15rem .4rem"
              onclick="window._fichaEditarItem('${item.id}')" title="Editar">✏</button>
            <button class="ficha-btn ficha-btn-danger" style="font-size:.75rem;padding:.15rem .4rem"
              onclick="window._fichaDeleteItem('${item.id}')" title="Remover">✕</button>
          </div>
        </div>
      </div>`;
    }).join('');
  }

  function renderFormItem() {
    const item = _itemEditandoId ? (personagemAtual?.items || []).find(i => i.id === _itemEditandoId) : null;
    const v = (field, def = '') => item != null && item[field] != null ? item[field] : def;
    const armorSlots = ['peito','elmo','luvas','perneiras','botas'];
    const isArma = v('slotTipo','arma') === 'arma';
    const atribOpts = ['','FOR','DES','CON','INT','SAB','CAR'].map(a =>
      `<option value="${a}" ${v('atributo','')===a?'selected':''}>${a || '— (padrão da classe)'}</option>`
    ).join('');
    const slotOpts = [
      ['arma','Arma'],['peito','Peitoral'],['elmo','Elmo'],['luvas','Luvas'],
      ['perneiras','Perneiras'],['botas','Botas'],['escudo','Escudo'],['anel','Anel'],
      ['amuleto','Amuleto'],['cinto','Cinto'],['especial','Especial de Classe']
    ].map(([val, lbl]) => `<option value="${val}" ${v('slotTipo','arma')===val?'selected':''}>${lbl}</option>`).join('');
    const qualOpts = ['Normal','Mágico','Raro','Lendário','Único','Set'].map(q =>
      `<option value="${q}" ${v('qualidade','Normal')===q?'selected':''}>${q}</option>`
    ).join('');
    const armorTypeOpts = `<option value="">— (sem base de armadura) —</option>` +
      ['Couro','Couro Reforçado','Brunea','Cota de Malha','Meia-Placa','Placa Completa'].map(a =>
        `<option value="${a}" ${v('tipoArmadura','')===a?'selected':''}>${a}</option>`
      ).join('');
    const showArmor = armorSlots.includes(v('slotTipo','arma'));

    return `<div class="ficha-item-form">
      <h4 style="margin:0 0 .8rem;color:#e74c3c">${_itemEditandoId ? 'Editar Item' : 'Novo Item'}</h4>
      <div class="ficha-form-row">
        <div class="ficha-form-group" style="grid-column:span 2">
          <label>Nome</label>
          <input type="text" id="item-form-nome" value="${esc(v('nome'))}" placeholder="Ex: Espada Longa">
        </div>
        <div class="ficha-form-group">
          <label>Qualidade</label>
          <select id="item-form-qualidade">${qualOpts}</select>
        </div>
        <div class="ficha-form-group">
          <label>Slot</label>
          <select id="item-form-slot-tipo">${slotOpts}</select>
        </div>
      </div>
      <div class="ficha-form-row">
        <div class="ficha-form-group" id="item-form-tipo-armadura-group" style="${showArmor ? '' : 'display:none'}">
          <label>Tipo de Armadura Base</label>
          <select id="item-form-tipo-armadura">${armorTypeOpts}</select>
        </div>
        <div class="ficha-form-group" id="item-form-atributo-group" style="${isArma ? '' : 'display:none'}">
          <label>Atributo de Ataque</label>
          <select id="item-form-atributo">${atribOpts}</select>
        </div>
        <div class="ficha-form-group" id="item-form-duasmaos-group" style="${isArma ? '' : 'display:none'}">
          <label>Duas Mãos</label>
          <div style="padding:.4rem 0"><label style="display:flex;align-items:center;gap:.4rem;cursor:pointer"><input type="checkbox" id="item-form-duas-maos" ${v('duasMaos') ? 'checked' : ''}> Arma de 2 mãos (ocupa 2 slots)</label></div>
        </div>
        <div class="ficha-form-group">
          <label>Info Base <small style="color:#666">(ex: 1d8)</small></label>
          <input type="text" id="item-form-info-base" value="${esc(v('infoBase'))}" placeholder="—">
        </div>
        <div class="ficha-form-group">
          <label>Sufixo decorativo</label>
          <input type="text" id="item-form-nome-afixo" value="${esc(v('nomeAfixo'))}" placeholder="ex: do Assassino">
        </div>
      </div>
      <div class="ficha-form-row">
        <div class="ficha-form-group"><label>Bônus CA</label><input type="number" id="item-form-bonus-ca" value="${v('bonusCA',0)}" min="-20" max="20"></div>
        <div class="ficha-form-group"><label>Bônus ATK</label><input type="number" id="item-form-bonus-atk" value="${v('bonusATK',0)}" min="-20" max="20"></div>
        <div class="ficha-form-group"><label>Bônus Dano</label><input type="number" id="item-form-bonus-dano" value="${v('bonusDano',0)}" min="-20" max="20"></div>
        <div class="ficha-form-group"><label>RD Físico</label><input type="number" id="item-form-bonus-rd-fisico" value="${v('bonusRDFisico',0)}" min="0" max="20"></div>
        <div class="ficha-form-group"><label>RD Todos</label><input type="number" id="item-form-bonus-rd-todos" value="${v('bonusRDTodos',0)}" min="0" max="20"></div>
        <div class="ficha-form-group"><label>Mana Máx</label><input type="number" id="item-form-bonus-mana-max" value="${v('bonusManaMax',0)}" min="-20" max="50"></div>
      </div>
      <div style="display:flex;gap:.6rem;margin-top:.8rem;justify-content:flex-end">
        <button class="ficha-btn ficha-btn-secondary" onclick="window._fichaCancelarItem()" type="button">Cancelar</button>
        <button class="ficha-btn ficha-btn-primary" onclick="window._fichaSalvarItem()" type="button">✔ Salvar Item</button>
      </div>
    </div>`;
  }

  function equiparItemFicha(slotKey, itemId) {
    const p = personagemAtual;
    if (!p || !p.items) return;
    const armorSlots = ['elmo','peito','luvas','perneiras','botas'];
    // Liberar slot atual ocupado por outro item
    p.items.forEach(i => { if (i.equipadoEm === slotKey) i.equipadoEm = null; });
    const item = p.items.find(i => i.id === itemId);
    if (item) {
      item.equipadoEm = slotKey;
      if (armorSlots.includes(slotKey) && item.tipoArmadura) p.equipamento[slotKey] = item.tipoArmadura;
      // Arma 2H: libera arma2 e bloqueia com referência
      if (item.duasMaos && slotKey === 'arma1') {
        p.items.forEach(i => { if (i.equipadoEm === 'arma2') i.equipadoEm = null; });
        p._arma2BloqueadaPor = itemId;
      } else if (slotKey === 'arma1' || slotKey === 'arma2') {
        p._arma2BloqueadaPor = null;
      }
    }
    const idx = personagens.findIndex(x => x.id === p.id);
    if (idx >= 0) personagens[idx] = p;
    salvarPersonagens();
    recalcularStats();
    renderizarFicha();
    mostrarToast('Item equipado!');
  }

  function desequiparItemFicha(itemId) {
    const p = personagemAtual;
    if (!p || !p.items) return;
    const armorSlots = ['elmo','peito','luvas','perneiras','botas'];
    const item = p.items.find(i => i.id === itemId);
    if (item) {
      if (armorSlots.includes(item.equipadoEm) && item.tipoArmadura) p.equipamento[item.equipadoEm] = '';
      if (item.duasMaos && p._arma2BloqueadaPor === itemId) p._arma2BloqueadaPor = null;
      item.equipadoEm = null;
    }
    const idx = personagens.findIndex(x => x.id === p.id);
    if (idx >= 0) personagens[idx] = p;
    salvarPersonagens();
    recalcularStats();
    renderizarFicha();
    mostrarToast('Item desequipado.');
  }

  function deletarItemInventario(itemId) {
    const p = personagemAtual;
    if (!p || !p.items) return;
    const armorSlots = ['elmo','peito','luvas','perneiras','botas'];
    const item = p.items.find(i => i.id === itemId);
    if (item && item.equipadoEm && armorSlots.includes(item.equipadoEm) && item.tipoArmadura) {
      p.equipamento[item.equipadoEm] = '';
    }
    p.items = p.items.filter(i => i.id !== itemId);
    const idx = personagens.findIndex(x => x.id === p.id);
    if (idx >= 0) personagens[idx] = p;
    salvarPersonagens();
    recalcularStats();
    renderizarFicha();
    mostrarToast('Item removido.');
  }

  function novoItem() {
    _itemFormAberto = true;
    _itemEditandoId = null;
    renderizarMochila();
  }

  function editarItem(itemId) {
    _itemFormAberto = true;
    _itemEditandoId = itemId;
    renderizarMochila();
  }

  function cancelarItem() {
    _itemFormAberto = false;
    _itemEditandoId = null;
    renderizarMochila();
  }

  function salvarItemDoForm() {
    const p = personagemAtual;
    if (!p) return;
    const nome = getValue('item-form-nome').trim();
    if (!nome) { mostrarToast('Nome é obrigatório!'); return; }
    if (!p.items) p.items = [];
    const editandoId = _itemEditandoId;
    const slotTipo = getValue('item-form-slot-tipo') || 'arma';
    const armorSlots = ['peito','elmo','luvas','perneiras','botas'];
    const tipoArmadura = armorSlots.includes(slotTipo) ? (getValue('item-form-tipo-armadura') || null) : null;
    const existente = editandoId ? p.items.find(i => i.id === editandoId) : null;
    const item = {
      id: editandoId || (Date.now().toString(36) + Math.random().toString(36).slice(2, 5)),
      nome, qualidade: getValue('item-form-qualidade') || 'Normal',
      slotTipo, tipoArmadura,
      atributo: slotTipo === 'arma' ? (getValue('item-form-atributo') || '') : '',
      duasMaos: slotTipo === 'arma' ? !!(document.getElementById('item-form-duas-maos')?.checked) : false,
      equipadoEm: existente ? existente.equipadoEm : null,
      infoBase: getValue('item-form-info-base').trim(),
      nomeAfixo: getValue('item-form-nome-afixo').trim(),
      bonusCA: parseInt(getValue('item-form-bonus-ca')) || 0,
      bonusATK: parseInt(getValue('item-form-bonus-atk')) || 0,
      bonusDano: parseInt(getValue('item-form-bonus-dano')) || 0,
      bonusRDFisico: parseInt(getValue('item-form-bonus-rd-fisico')) || 0,
      bonusRDTodos: parseInt(getValue('item-form-bonus-rd-todos')) || 0,
      bonusManaMax: parseInt(getValue('item-form-bonus-mana-max')) || 0
    };
    if (editandoId) {
      const idx = p.items.findIndex(i => i.id === editandoId);
      if (idx >= 0) p.items[idx] = item;
    } else {
      p.items.push(item);
    }
    const idx = personagens.findIndex(x => x.id === p.id);
    if (idx >= 0) personagens[idx] = p;
    salvarPersonagens();
    recalcularStats();
    _itemFormAberto = false;
    _itemEditandoId = null;
    renderizarFicha();
    mostrarToast(editandoId ? 'Item atualizado!' : 'Item adicionado!');
  }

  window._fichaEquipar = equiparItemFicha;
  window._fichaDesequipar = desequiparItemFicha;
  window._fichaDeleteItem = deletarItemInventario;
  window._fichaNovoItem = novoItem;
  window._fichaEditarItem = editarItem;
  window._fichaCancelarItem = cancelarItem;
  window._fichaSalvarItem = salvarItemDoForm;

  // ───── Lacaios & Pets ─────
  function renderizarLacaios() {
    const p = personagemAtual;
    const panel = document.getElementById('ficha-lacaios-panel');
    if (!panel) return;
    if (!p || !p.lacaios || p.lacaios.length === 0) {
      panel.style.display = 'none';
      return;
    }
    panel.style.display = '';
    const body = document.getElementById('ficha-lacaios-body');
    if (!body) return;
    body.innerHTML = p.lacaios.map(lac => `
      <div class="lacaio-card" id="lacaio-${lac.id}">
        <div class="lacaio-nome">${esc(lac.nome)}</div>
        <div class="lacaio-stats">
          <span title="CA">🛡 ${lac.ca || '—'}</span>
          <span title="ATK">⚔ ${lac.atk || '—'}</span>
          <span title="Dano">💥 ${esc(lac.dano) || '—'}</span>
        </div>
        <div class="lacaio-hp-row">
          <span style="color:#888;font-size:.8rem">PV</span>
          <button class="btn-pm" onclick="window._fichaLacaioHP('${lac.id}',-1)" type="button">-1</button>
          <span id="lac-pv-${lac.id}" style="color:#e74c3c;font-weight:700;min-width:32px;text-align:center">${lac.pvAtual}/${lac.pvMax}</span>
          <button class="btn-pm" onclick="window._fichaLacaioHP('${lac.id}',1)" type="button">+1</button>
          <button class="ficha-btn ficha-btn-danger" style="font-size:.7rem;padding:.1rem .35rem;margin-left:.4rem"
            onclick="window._fichaLacaioDel('${lac.id}')" title="Remover lacaio">✕</button>
        </div>
      </div>`).join('');
  }

  function adicionarLacaio() {
    const p = personagemAtual;
    if (!p) return;
    const nome = prompt('Nome do lacaio / pet:');
    if (!nome) return;
    const pvMax = parseInt(prompt('PV máximo:', '10')) || 10;
    const ca    = parseInt(prompt('CA:', '10')) || 10;
    const atk   = prompt('Bônus de ataque (ex: +3):', '+0') || '+0';
    const dano  = prompt('Dano (ex: 1d6 Físico):', '1d6 Físico') || '1d6 Físico';
    if (!p.lacaios) p.lacaios = [];
    p.lacaios.push({ id: Date.now().toString(36), nome, pvMax, pvAtual: pvMax, ca, atk, dano });
    const idx = personagens.findIndex(x => x.id === p.id);
    if (idx >= 0) personagens[idx] = p;
    salvarPersonagens();
    const panel = document.getElementById('ficha-lacaios-panel');
    if (panel) panel.style.display = '';
    renderizarLacaios();
    mostrarToast('Lacaio adicionado!');
  }

  function lacaioHP(id, delta) {
    const p = personagemAtual;
    if (!p || !p.lacaios) return;
    const lac = p.lacaios.find(l => l.id === id);
    if (!lac) return;
    lac.pvAtual = Math.max(0, Math.min(lac.pvMax, (lac.pvAtual || 0) + delta));
    const el = document.getElementById('lac-pv-' + id);
    if (el) el.textContent = `${lac.pvAtual}/${lac.pvMax}`;
    const idx = personagens.findIndex(x => x.id === p.id);
    if (idx >= 0) personagens[idx] = p;
    salvarPersonagens();
  }

  function deletarLacaio(id) {
    const p = personagemAtual;
    if (!p || !p.lacaios) return;
    p.lacaios = p.lacaios.filter(l => l.id !== id);
    const idx = personagens.findIndex(x => x.id === p.id);
    if (idx >= 0) personagens[idx] = p;
    salvarPersonagens();
    renderizarLacaios();
    mostrarToast('Lacaio removido.');
  }

  window._fichaAddLacaio = adicionarLacaio;
  window._fichaLacaioHP  = lacaioHP;
  window._fichaLacaioDel = deletarLacaio;

  // ───── Notas Estruturadas ─────
  function salvarNotas() {
    const p = personagemAtual;
    if (!p) return;
    const idx = personagens.findIndex(x => x.id === p.id);
    if (idx >= 0) personagens[idx] = p;
    salvarPersonagens();
  }

  function renderizarNotas() {
    const p = personagemAtual;
    const el = document.getElementById('ficha-notas-body');
    if (!el || !p) return;
    const ns = p.notasEstruturadas || {};
    const objs = ns.objetivos || [];
    const facs = ns.facoes || [];
    const best = ns.bestiario || [];

    const objRows = objs.map((o, i) => `
      <div class="notas-objetivo-row">
        <input type="checkbox" ${o.concluido ? 'checked' : ''} onchange="window._notasToggleObj(${i})" title="Concluído">
        <input type="text" class="notas-input" placeholder="Objetivo…" value="${(o.texto||'').replace(/"/g,'&quot;')}" oninput="window._notasSaveObj(${i},'texto',this.value)" ${o.concluido ? 'style="text-decoration:line-through;color:#666"' : ''}>
        <input type="text" class="notas-input notas-recompensa" placeholder="Recompensa…" value="${(o.recompensa||'').replace(/"/g,'&quot;')}" oninput="window._notasSaveObj(${i},'recompensa',this.value)">
        <button class="notas-del-btn" onclick="window._notasDelObj(${i})" title="Remover">✕</button>
      </div>`).join('');

    const facRows = facs.map((f, i) => `
      <div class="notas-facao-card">
        <div class="notas-facao-row">
          <input type="text" class="notas-input" placeholder="Nome da Facção…" value="${(f.nome||'').replace(/"/g,'&quot;')}" oninput="window._notasSaveFac(${i},'nome',this.value)">
          <button class="notas-del-btn" onclick="window._notasDelFac(${i})" title="Remover">✕</button>
        </div>
        <div class="notas-facao-row">
          <input type="text" class="notas-input" placeholder="Reputação…" value="${(f.reputacao||'').replace(/"/g,'&quot;')}" oninput="window._notasSaveFac(${i},'reputacao',this.value)" style="flex:1">
          <input type="text" class="notas-input" placeholder="Relação atual…" value="${(f.relacao||'').replace(/"/g,'&quot;')}" oninput="window._notasSaveFac(${i},'relacao',this.value)" style="flex:1">
        </div>
        <input type="text" class="notas-input" placeholder="Contatos…" value="${(f.contatos||'').replace(/"/g,'&quot;')}" oninput="window._notasSaveFac(${i},'contatos',this.value)">
      </div>`).join('');

    const bestRows = best.map((b, i) => `
      <div class="notas-bestiario-row">
        <input type="text" class="notas-input" placeholder="Criatura…" value="${(b.nome||'').replace(/"/g,'&quot;')}" oninput="window._notasSaveBest(${i},'nome',this.value)">
        <input type="text" class="notas-input" placeholder="Fraqueza…" value="${(b.fraqueza||'').replace(/"/g,'&quot;')}" oninput="window._notasSaveBest(${i},'fraqueza',this.value)">
        <input type="text" class="notas-input" placeholder="Situação…" value="${(b.situacao||'').replace(/"/g,'&quot;')}" oninput="window._notasSaveBest(${i},'situacao',this.value)">
        <button class="notas-del-btn" onclick="window._notasDelBest(${i})" title="Remover">✕</button>
      </div>`).join('');

    el.innerHTML = `
      <div class="notas-two-col">
        <div class="notas-col">
          <details class="notas-section" open>
            <summary>Objetivos</summary>
            <div id="notas-objetivos-list">${objRows}</div>
            <button class="ficha-btn ficha-btn-secondary notas-add-btn" onclick="window._notasAddObj()" type="button">+ Objetivo</button>
          </details>
          <details class="notas-section" open>
            <summary>Missão Principal</summary>
            <textarea class="notas-textarea" rows="3" placeholder="Missão principal em andamento…" oninput="window._notasSaveField('missaoPrincipal',this.value)">${ns.missaoPrincipal||''}</textarea>
          </details>
          <details class="notas-section">
            <summary>Missões Secundárias</summary>
            <textarea class="notas-textarea" rows="4" placeholder="Lista de missões secundárias…" oninput="window._notasSaveField('missoesSecundarias',this.value)">${ns.missoesSecundarias||''}</textarea>
          </details>
          <details class="notas-section">
            <summary>Rumores</summary>
            <textarea class="notas-textarea" rows="3" placeholder="Rumores ouvidos…" oninput="window._notasSaveField('rumores',this.value)">${ns.rumores||''}</textarea>
          </details>
        </div>
        <div class="notas-col">
          <details class="notas-section" open>
            <summary>NPCs</summary>
            <textarea class="notas-textarea" rows="5" placeholder="Personagens encontrados…" oninput="window._notasSaveField('npcs',this.value)">${ns.npcs||''}</textarea>
          </details>
          <details class="notas-section">
            <summary>Facções</summary>
            <div id="notas-facoes-list">${facRows}</div>
            <button class="ficha-btn ficha-btn-secondary notas-add-btn" onclick="window._notasAddFac()" type="button">+ Facção</button>
          </details>
          <details class="notas-section">
            <summary>Bestiário</summary>
            <div class="notas-bestiario-header" style="display:grid;grid-template-columns:1fr 1fr 1fr auto;gap:.3rem;font-size:.75rem;color:#666;padding:.2rem .3rem">
              <span>Criatura</span><span>Fraqueza</span><span>Situação</span><span></span>
            </div>
            <div id="notas-bestiario-list">${bestRows}</div>
            <button class="ficha-btn ficha-btn-secondary notas-add-btn" onclick="window._notasAddBest()" type="button">+ Criatura</button>
          </details>
        </div>
      </div>`;
  }

  window._notasSaveField = function(field, val) {
    const p = personagemAtual; if (!p) return;
    if (!p.notasEstruturadas) p.notasEstruturadas = {};
    p.notasEstruturadas[field] = val;
    salvarNotas();
  };
  window._notasAddObj = function() {
    const p = personagemAtual; if (!p) return;
    if (!p.notasEstruturadas) p.notasEstruturadas = {};
    if (!p.notasEstruturadas.objetivos) p.notasEstruturadas.objetivos = [];
    p.notasEstruturadas.objetivos.push({ texto:'', recompensa:'', concluido:false });
    salvarNotas(); renderizarNotas();
  };
  window._notasDelObj = function(i) {
    const p = personagemAtual; if (!p) return;
    p.notasEstruturadas.objetivos.splice(i, 1);
    salvarNotas(); renderizarNotas();
  };
  window._notasToggleObj = function(i) {
    const p = personagemAtual; if (!p) return;
    p.notasEstruturadas.objetivos[i].concluido = !p.notasEstruturadas.objetivos[i].concluido;
    salvarNotas(); renderizarNotas();
  };
  window._notasSaveObj = function(i, field, val) {
    const p = personagemAtual; if (!p) return;
    p.notasEstruturadas.objetivos[i][field] = val;
    salvarNotas();
  };
  window._notasAddFac = function() {
    const p = personagemAtual; if (!p) return;
    if (!p.notasEstruturadas.facoes) p.notasEstruturadas.facoes = [];
    p.notasEstruturadas.facoes.push({ nome:'', reputacao:'', relacao:'', contatos:'' });
    salvarNotas(); renderizarNotas();
  };
  window._notasDelFac = function(i) {
    const p = personagemAtual; if (!p) return;
    p.notasEstruturadas.facoes.splice(i, 1);
    salvarNotas(); renderizarNotas();
  };
  window._notasSaveFac = function(i, field, val) {
    const p = personagemAtual; if (!p) return;
    p.notasEstruturadas.facoes[i][field] = val;
    salvarNotas();
  };
  window._notasAddBest = function() {
    const p = personagemAtual; if (!p) return;
    if (!p.notasEstruturadas.bestiario) p.notasEstruturadas.bestiario = [];
    p.notasEstruturadas.bestiario.push({ nome:'', fraqueza:'', situacao:'' });
    salvarNotas(); renderizarNotas();
  };
  window._notasDelBest = function(i) {
    const p = personagemAtual; if (!p) return;
    p.notasEstruturadas.bestiario.splice(i, 1);
    salvarNotas(); renderizarNotas();
  };
  window._notasSaveBest = function(i, field, val) {
    const p = personagemAtual; if (!p) return;
    p.notasEstruturadas.bestiario[i][field] = val;
    salvarNotas();
  };

  function getAtribResistencia(tipo) {
    return {
      Fisico: null,
      Fogo: 'INT', Gelo: 'INT', Relampago: 'INT',
      Veneno: 'CON',
      Necrotico: 'SAB', Psiquico: 'SAB',
      Radiante: 'CAR', Arcano: 'CAR'
    }[tipo] || null;
  }

  function renderBarraNivel(nivel) {
    const faixas = [
      { min:1, max:4,  label:'Normal' },
      { min:5, max:7,  label:'Pesadelo' },
      { min:8, max:10, label:'Inferno' }
    ];
    const pips = Array.from({length:10}, (_, i) => {
      const n = i + 1;
      const faixa = faixas.find(f => n >= f.min && n <= f.max);
      return `<span class="nivel-pip ${n <= nivel ? 'ativo' : ''} faixa-${faixa?.label?.toLowerCase()}" title="Nível ${n}">${n}</span>`;
    }).join('');
    return `<div class="nivel-barra">${pips}</div><span class="nivel-faixa">${faixas.find(f => nivel >= f.min && nivel <= f.max)?.label || ''}</span>`;
  }

  function removerTalento(idx) {
    if (!personagemAtual) return;
    personagemAtual.talentos.splice(idx, 1);
    salvarPersonagens();
    renderizarFicha();
  }

  // ───── Level Up ─────
  function iniciarLevelUp() {
    const p = personagemAtual;
    if (!p || p.nivel >= 10) return;
    const cls = getClasse(p.classe);
    if (!cls) return;

    setText('levelup-nivel-atual', `Nível ${p.nivel} → ${p.nivel + 1}`);

    // Preencher select de tabela geral (uma vez)
    const geralSel = document.getElementById('levelup-tabela-geral-id');
    if (geralSel) {
      geralSel.innerHTML = TALENTOS_GERAIS.map(t =>
        `<option value="${t.id}">${t.nome}</option>`
      ).join('');
    }

    // Resetar seletor para classe ao abrir
    const tipoSel = document.getElementById('levelup-tabela-tipo');
    if (tipoSel) tipoSel.value = 'classe';
    const geralGroup = document.getElementById('levelup-geral-group');
    if (geralGroup) geralGroup.style.display = 'none';

    function getTabelaLevelUp() {
      const tipo = getValue('levelup-tabela-tipo');
      if (tipo === 'geral') {
        const geralId = getValue('levelup-tabela-geral-id');
        return TALENTOS_GERAIS.find(t => t.id === geralId)?.talentos || [];
      }
      return cls.talentos;
    }

    function rolarEPopular() {
      const tabela = getTabelaLevelUp();
      const roll = Math.ceil(Math.random() * 20);
      const talento = encontrarTalento(tabela, roll);
      setText('levelup-roll', roll);
      setText('levelup-talento-texto', talento?.text || '—');
      const selectEl = document.getElementById('levelup-select-talento');
      if (selectEl) {
        selectEl.innerHTML = tabela.map(t =>
          `<option value="${t.roll}" ${t.roll === talento?.roll ? 'selected' : ''}>[${t.roll}] ${t.text.substring(0, 80)}${t.text.length > 80 ? '…' : ''}</option>`
        ).join('');
        selectEl.onchange = () => {
          const chosen = tabela.find(t => t.roll === selectEl.value);
          if (chosen) setText('levelup-talento-texto', chosen.text);
        };
      }
    }

    if (tipoSel) tipoSel.onchange = () => {
      if (geralGroup) geralGroup.style.display = tipoSel.value === 'geral' ? '' : 'none';
      rolarEPopular();
    };
    if (geralSel) geralSel.onchange = rolarEPopular;

    const btnRolar = document.getElementById('btn-rolar-levelup-novo');
    if (btnRolar) btnRolar.onclick = rolarEPopular;

    rolarEPopular();
    mostrar('view-levelup');
  }

  function encontrarTalento(talentos, roll) {
    return talentos.find(t => {
      if (t.roll.includes('-')) {
        const [min, max] = t.roll.split('-').map(Number);
        return roll >= min && roll <= max;
      }
      return parseInt(t.roll) === roll;
    });
  }

  function confirmarLevelUp() {
    const p = personagemAtual;
    if (!p) return;
    const selectEl = document.getElementById('levelup-select-talento');
    const cls = getClasse(p.classe);
    if (!cls || !selectEl) return;

    const tipo = getValue('levelup-tabela-tipo');
    let talento;
    if (tipo === 'geral') {
      const geralId = getValue('levelup-tabela-geral-id');
      const tabela = TALENTOS_GERAIS.find(t => t.id === geralId);
      talento = tabela?.talentos.find(t => t.roll === selectEl.value);
    } else {
      talento = cls.talentos.find(t => t.roll === selectEl.value);
    }
    if (!talento) return;

    p.nivel += 1;
    const aplicacao = aplicarTalentoSimples(p, talento.text);
    if (aplicacao) {
      if (aplicacao.tipo === 'attr') p.attrs[aplicacao.attr] += aplicacao.valor;
      if (aplicacao.tipo === 'pv') p.pvMax += aplicacao.valor;
      if (aplicacao.tipo === 'mana') p.manaMax += aplicacao.valor;
    }
    p.talentos.push({ roll: selectEl.value, texto: talento.text, nivel: p.nivel });

    const primAttrVal = p.attrs[p.atribPrimario] || p.attrs['FOR'] || 10;
    const novoPVMax = calcPVMax(p.nivel, cls.dv, p.attrs.CON);
    const hpGanho = novoPVMax - p.pvMax;
    p.pvMax = novoPVMax;
    p.pvAtual = Math.min(p.pvAtual + hpGanho, p.pvMax);
    p.manaMax = calcManaMax(p.nivel, primAttrVal);
    if (p.manaAtual > p.manaMax) p.manaAtual = p.manaMax;
    p.ca = calcCAFromEquip(cls, p.attrs, p.equipamento, p.escudo, p.items || []);
    p.atk = mod(primAttrVal);
    p.atualizadoEm = new Date().toISOString();

    const idx = personagens.findIndex(x => x.id === p.id);
    if (idx >= 0) personagens[idx] = p;
    salvarPersonagens();
    mostrarToast(`Nível ${p.nivel} alcançado! +${hpGanho} HP`);
    renderizarFicha();
    mostrar('view-ficha');
  }

  // ───── Excluir ─────
  function excluirPersonagem() {
    if (!personagemAtual) return;
    confirmarExclusao(personagemAtual.id);
  }

  function confirmarExclusao(id) {
    const p = personagens.find(x => x.id === id);
    if (!p) return;
    if (!confirm(`Excluir "${p.nome}"? Esta ação não pode ser desfeita.`)) return;
    personagens = personagens.filter(x => x.id !== id);
    salvarPersonagens();
    personagemAtual = null;
    renderizarLista();
    mostrar('view-lista');
  }

  // ───── Export / Import ─────
  function exportarJSON() {
    if (!personagemAtual) return;
    const blob = new Blob([JSON.stringify(personagemAtual, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${personagemAtual.nome || 'personagem'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function importarJSON(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(ev) {
      try {
        const p = JSON.parse(ev.target.result);
        if (!p.id || !p.classe) throw new Error('Arquivo inválido');
        if (!p.condicoes) p.condicoes = [];
        const existe = personagens.find(x => x.id === p.id);
        if (existe) {
          if (!confirm('Já existe um personagem com este ID. Substituir?')) return;
          personagens = personagens.filter(x => x.id !== p.id);
        }
        personagens.push(p);
        salvarPersonagens();
        personagemAtual = p;
        renderizarFicha();
        renderizarLista();
        mostrar('view-ficha');
        mostrarToast('Personagem importado com sucesso!');
      } catch(err) {
        alert('Erro ao importar: ' + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  // ───── Toast ─────
  function mostrarToast(msg) {
    let toast = document.getElementById('ficha-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'ficha-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('visible');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('visible'), 2000);
  }

  // ───── Helpers DOM ─────
  function getValue(id) { return document.getElementById(id)?.value || ''; }
  function setValue(id, val) { const el = document.getElementById(id); if (el) el.value = val ?? ''; }
  function setText(id, val) { const el = document.getElementById(id); if (el) el.textContent = val ?? ''; }
  function setHTML(id, val) { const el = document.getElementById(id); if (el) el.innerHTML = val ?? ''; }
  function esc(str) { return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

})();
