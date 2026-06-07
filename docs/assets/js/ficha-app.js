// Gerador de Fichas — Diablo RPG
// Carrega apenas na página /ficha/

(function() {
  'use strict';

  // ───── Constantes ─────
  const CONDITIONS = [
    { id: 'caido',      label: '⬇ Caído' },
    { id: 'atordoado',  label: '💫 Atordoado' },
    { id: 'envenenado', label: '☣️ Envenenado' },
    { id: 'cego',       label: '👁️ Cego' },
    { id: 'assustado',  label: '😱 Assustado' }
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
      equipamento: { elmo:'', peito:'', luvas:'', perneiras:'', botas:'',
                     especial:'', amuleto:'', anel1:'', anel2:'',
                     arma1:'', arma2:'', cinto:'' },
      equipadoSlots: {},
      resistencias: { Fisico:0, Fogo:0, Gelo:0, Relampago:0, Veneno:0,
                      Necrotico:0, Radiante:0, Psiquico:0, Arcano:0 },
      condicoes: [], talentos: [], notas: '',
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
    });
    on('btn-rolar-atributos', 'click', rolarAtributos);

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

    // Escudo
    setValue('form-escudo', p.escudo);
    const escFrm = document.getElementById('form-escudo');
    if (escFrm) escFrm.onchange = () => atualizarCaPreviewForm();

    // Peças de armadura
    const armorSlotsFrm = ['elmo','peito','luvas','perneiras','botas'];
    armorSlotsFrm.forEach(slot => {
      const sel = document.getElementById('form-eq-' + slot);
      if (!sel) return;
      if (!sel.children.length) {
        sel.innerHTML = ARMADURA_OPTS.map(o => `<option value="${o.v}">${o.l}</option>`).join('');
      }
      sel.value = p.equipamento[slot] || '';
      sel.onchange = () => atualizarCaPreviewForm();
    });

    // Atalho de set completo
    const setCompEl = document.getElementById('form-set-completo');
    if (setCompEl) {
      setCompEl.value = '';
      setCompEl.onchange = () => {
        const tipo = setCompEl.value;
        if (!tipo) return;
        armorSlotsFrm.forEach(s => { setValue('form-eq-' + s, tipo); });
        setCompEl.value = '';
        atualizarCaPreviewForm();
      };
    }

    // Datalist de armas (preencher uma vez)
    const dl = document.getElementById('datalist-armas');
    if (dl && !dl.children.length) {
      dl.innerHTML = ARMAS_LISTA.map(a => `<option value="${a}">`).join('');
    }

    // Especial de Classe auto-fill
    const especialEl = document.getElementById('form-eq-especial');
    if (especialEl) {
      const classItem = ITENS_CLASSE[p.classe] || '';
      if (!especialEl.value || Object.values(ITENS_CLASSE).includes(especialEl.value)) {
        especialEl.value = classItem;
      }
    }

    // Demais slots de equipamento
    Object.keys(p.equipamento).filter(s => !armorSlotsFrm.includes(s)).forEach(slot => {
      setValue('form-eq-' + slot, p.equipamento[slot] || '');
    });
    Object.keys(p.resistencias).forEach(tipo => setValue('form-res-' + tipo, p.resistencias[tipo]));

    // Preview inicial de CA
    atualizarCaPreviewForm();

    const titulo = document.getElementById('form-titulo-pagina');
    if (titulo) titulo.textContent = modoEdicao ? 'Editar Personagem' : 'Novo Personagem';
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
    p.nivel = parseInt(getValue('form-nivel')) || 1;
    p.xp = parseInt(getValue('form-xp')) || 0;
    p.titulo = getValue('form-titulo') || '';
    p.antecedente = getValue('form-antecedente') || '';
    // Garante migração de texto livre antigo para id
    if (p.titulo && !TITULOS.find(t => t.id === p.titulo)) p.titulo = '';
    if (p.antecedente && !ANTECEDENTES.find(a => a.id === p.antecedente)) p.antecedente = '';
    p.notas = getValue('form-notas') || '';
    p.escudo = getValue('form-escudo') || '';
    ['FOR','DES','CON','INT','SAB','CAR'].forEach(a => {
      p.attrs[a] = parseInt(getValue('form-' + a)) || 10;
    });

    const cls = getClasse(p.classe);
    const primAttrVal = p.attrs[p.atribPrimario] || p.attrs['FOR'];
    p.manaMax = calcManaMax(p.nivel, primAttrVal);
    if (p.manaAtual === 0 || p.manaAtual > p.manaMax) p.manaAtual = p.manaMax;
    p.pvMax = calcPVMax(p.nivel, cls ? cls.dv : 8, p.attrs.CON);
    if (p.pvAtual === 0 || p.pvAtual > p.pvMax) p.pvAtual = p.pvMax;

    // Salvar todos os slots de equipamento
    Object.keys(p.equipamento).forEach(slot => {
      p.equipamento[slot] = getValue('form-eq-' + slot) || '';
    });

    p.ca = calcCAFromEquip(cls || { id: p.classe }, p.attrs, p.equipamento, p.escudo);
    p.atk = mod(primAttrVal);
    Object.keys(p.resistencias).forEach(tipo => {
      p.resistencias[tipo] = parseInt(getValue('form-res-' + tipo)) || 0;
    });
    p.atualizadoEm = new Date().toISOString();

    if (!modoEdicao) {
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

    const notasEl = document.getElementById('ficha-notas-input');
    if (notasEl) p.notas = notasEl.value;

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

    p.pvMax = calcPVMax(p.nivel, cls ? cls.dv : 8, p.attrs.CON);
    p.manaMax = calcManaMax(p.nivel, primAttrVal);
    p.ca = calcCAFromEquip(cls || { id: p.classe }, p.attrs, p.equipamento, p.escudo, p.equipadoSlots);
    p.atk = mod(primAttrVal);

    // Bônus de itens equipados
    const itemBonus = (typeof calcBonusFromItems === 'function') ? calcBonusFromItems(p.equipadoSlots) : { ca:0, atk:0, rdTodos:0, manaMax:0 };
    p.ca += itemBonus.ca;
    p.atk += itemBonus.atk;
    p.manaMax += itemBonus.manaMax;

    if (p.pvAtual > p.pvMax) p.pvAtual = p.pvMax;
    if (p.manaAtual > p.manaMax) p.manaAtual = p.manaMax;

    const rdFisicoCalc = calcRDFisico(p.equipamento);
    setText('ficha-pv-display', `${p.pvAtual} / ${p.pvMax}`);
    setText('ficha-mana-display', `${p.manaAtual} / ${p.manaMax}`);
    setText('ficha-ca-display', p.ca);
    const rdTotal = rdFisicoCalc + (itemBonus.rdTodos || 0);
    setText('ficha-rd-display', rdTotal > 0 ? rdTotal : '—');
    setText('ficha-atk-display', `${p.atk >= 0 ? '+' : ''}${p.atk} + bônus de arma`);

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

    Object.keys(p.resistencias).forEach(tipo => {
      const attrBase = getAtribResistencia(tipo);
      const modAttr = attrBase ? mod(p.attrs[attrBase] || 10) : null;
      const modEl = document.getElementById('res-mod-' + tipo);
      if (modEl) modEl.textContent = modAttr !== null ? modAttr : '—';
      const totalEl = document.getElementById('res-total-' + tipo);
      if (totalEl) {
        const bonus = parseInt(document.getElementById('inline-res-' + tipo)?.value) || 0;
        totalEl.textContent = modAttr !== null ? modAttr + bonus : bonus;
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

    // Recursos
    setText('ficha-pv-display', `${p.pvAtual} / ${p.pvMax}`);
    setText('ficha-mana-display', `${p.manaAtual} / ${p.manaMax}`);
    setText('ficha-ca-display', p.ca);
    const rdInit = calcRDFisico(p.equipamento);
    setText('ficha-rd-display', rdInit > 0 ? rdInit : '—');
    setText('ficha-atk-display', `${p.atk >= 0 ? '+' : ''}${p.atk} + bônus de arma`);

    // PV / Mana com botões ±
    setHTML('ficha-recursos-atuais', `
      <div class="recursos-atuais-row">
        <div class="recurso-inline">
          <label>PV atual:</label>
          <button class="btn-pm" data-target="inline-pv-atual" data-delta="-5" type="button">-5</button>
          <button class="btn-pm" data-target="inline-pv-atual" data-delta="-1" type="button">-1</button>
          <input type="number" id="inline-pv-atual" class="ficha-input-small" min="0" max="${p.pvMax}" value="${p.pvAtual}">
          <button class="btn-pm" data-target="inline-pv-atual" data-delta="1" type="button">+1</button>
          <button class="btn-pm" data-target="inline-pv-atual" data-delta="5" type="button">+5</button>
        </div>
        <div class="recurso-inline">
          <label>Mana atual:</label>
          <button class="btn-pm" data-target="inline-mana-atual" data-delta="-5" type="button">-5</button>
          <button class="btn-pm" data-target="inline-mana-atual" data-delta="-1" type="button">-1</button>
          <input type="number" id="inline-mana-atual" class="ficha-input-small" min="0" max="${p.manaMax}" value="${p.manaAtual}">
          <button class="btn-pm" data-target="inline-mana-atual" data-delta="1" type="button">+1</button>
          <button class="btn-pm" data-target="inline-mana-atual" data-delta="5" type="button">+5</button>
        </div>
      </div>`);
    document.querySelectorAll('.btn-pm').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault(); e.stopPropagation();
        const targetEl = document.getElementById(btn.dataset.target);
        if (!targetEl) return;
        const max = parseInt(targetEl.max) || 999;
        const newVal = Math.max(0, Math.min(max, (parseInt(targetEl.value) || 0) + parseInt(btn.dataset.delta)));
        targetEl.value = newVal;
        if (btn.dataset.target === 'inline-pv-atual') {
          p.pvAtual = newVal;
          setText('ficha-pv-display', `${p.pvAtual} / ${p.pvMax}`);
        } else {
          p.manaAtual = newVal;
          setText('ficha-mana-display', `${p.manaAtual} / ${p.manaMax}`);
        }
        const idx = personagens.findIndex(x => x.id === p.id);
        if (idx >= 0) personagens[idx] = p;
        salvarPersonagens();
        mostrarToast('✓ Salvo');
      };
    });

    // Armadura / Escudo inline
    const rdFisicoInit = calcRDFisico(p.equipamento);
    const peitoInit = p.equipamento.peito || '';
    const infoInit = ARMADURA_INFO[peitoInit];
    const tipoInitStr = infoInit ? `${infoInit.tipo}${infoInit.ruido ? ' · Ruído' : ''}${infoInit.reqFOR ? ` · FOR ${infoInit.reqFOR}` : ''}` : 'Sem armadura';
    setHTML('ficha-armadura-inline', `
      <div style="display:flex;gap:1rem;flex-wrap:wrap;align-items:center;font-size:.85rem">
        <span style="color:#aaa">Armadura: <strong id="ficha-armadura-summary" style="color:#ccc">${tipoInitStr}</strong></span>
        <div class="recurso-inline">
          <label>Escudo:</label>
          <select id="inline-escudo" class="ficha-input-inline" style="max-width:200px">
            ${ESCUDOS_OPT.map(e => `<option value="${esc(e.v)}" ${p.escudo===e.v?'selected':''}>${esc(e.l)}</option>`).join('')}
          </select>
        </div>
      </div>`);
    const escSel = document.getElementById('inline-escudo');
    if (escSel) escSel.onchange = () => { p.escudo = escSel.value; recalcularStats(); };

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
    const talentosBody = document.getElementById('ficha-talentos-body');
    if (talentosBody) {
      if (p.talentos.length === 0) {
        talentosBody.innerHTML = '<li class="ficha-empty-small">Nenhum talento ainda. Suba de nível para ganhar talentos.</li>';
      } else {
        talentosBody.innerHTML = p.talentos.map((t, i) =>
          `<li class="ficha-talento" data-idx="${i}">
            <span class="ficha-talento-nivel">Nv ${t.nivel || '?'}</span>
            <span class="ficha-talento-texto">${esc(t.texto)}</span>
            <button class="ficha-btn-icon btn-del-talento" data-idx="${i}" title="Remover talento">✕</button>
          </li>`
        ).join('');
        talentosBody.querySelectorAll('.btn-del-talento').forEach(btn => {
          btn.addEventListener('click', () => removerTalento(parseInt(btn.dataset.idx)));
        });
      }
    }

    // Equipamento
    const eqNomes = {
      arma1:'Arma 1', arma2:'Arma 2', especial:'Especial de Classe',
      elmo:'Elmo', peito:'Peitoral', luvas:'Luvas', perneiras:'Perneiras', botas:'Botas',
      amuleto:'Amuleto', anel1:'Anel 1', anel2:'Anel 2', cinto:'Cinto'
    };
    const armorSlotsView = ['elmo','peito','luvas','perneiras','botas'];
    const weaponSlotsView = ['arma1','arma2'];
    const eqBody = document.getElementById('ficha-equipamento-body');
    if (eqBody) {
      eqBody.innerHTML = Object.entries(eqNomes).map(([slot, nome]) => {
        const invItemId = p.equipadoSlots && p.equipadoSlots[slot];
        const invItem = invItemId && typeof getInventarioItem === 'function' ? getInventarioItem(invItemId) : null;

        if (invItem) {
          const qualStyle = MOCHILA_QUAL_STYLE[invItem.qualidade] || 'color:#aaa';
          const afixosSummary = (invItem.afixos || []).map(af =>
            `<div style="font-size:.72rem;color:#777;line-height:1.35">${esc(af.efeito)}</div>`
          ).join('');
          return `<tr>
            <td class="ficha-slot-nome">${nome}</td>
            <td><div class="slot-item-card">
              <div style="${qualStyle};font-weight:700;font-size:.85rem">${esc(invItem.nome)}</div>
              ${invItem.infoBase ? `<div style="font-size:.71rem;color:#555;margin-bottom:.1rem">${esc(invItem.infoBase)}</div>` : ''}
              ${afixosSummary}
              <button class="ficha-btn ficha-btn-secondary" style="font-size:.7rem;padding:.1rem .4rem;margin-top:.3rem"
                onclick="window._fichaDesequipar('${invItem.id}')">Desequipar</button>
            </div></td>
          </tr>`;
        }

        let input;
        if (armorSlotsView.includes(slot)) {
          const opts = ARMADURA_OPTS.map(o =>
            `<option value="${esc(o.v)}" ${(p.equipamento[slot]||'')=== o.v ? 'selected':''}>${esc(o.l)}</option>`
          ).join('');
          input = `<select class="ficha-input-inline" id="inline-eq-${slot}" style="width:100%">${opts}</select>`;
        } else if (weaponSlotsView.includes(slot)) {
          input = `<input type="text" class="ficha-input-inline" id="inline-eq-${slot}" value="${esc(p.equipamento[slot]||'')}" placeholder="—" list="datalist-armas" autocomplete="off">`;
        } else {
          input = `<input type="text" class="ficha-input-inline" id="inline-eq-${slot}" value="${esc(p.equipamento[slot]||'')}" placeholder="—">`;
        }
        return `<tr><td class="ficha-slot-nome">${nome}</td><td>${input}</td></tr>`;
      }).join('');

      armorSlotsView.forEach(slot => {
        const sel = document.getElementById('inline-eq-' + slot);
        if (sel) sel.onchange = () => { p.equipamento[slot] = sel.value; recalcularStats(); };
      });
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
        return `<tr>
          <td>${nome}</td>
          <td class="ficha-val" id="res-mod-${tipo}">${modAttr !== null ? modAttr : '—'}</td>
          <td><input type="number" class="ficha-input-inline ficha-input-small" id="inline-res-${tipo}" value="${val}" min="-20" max="50"></td>
          <td class="ficha-val ficha-total-rd" id="res-total-${tipo}">${total}</td>
        </tr>`;
      }).join('');
      Object.keys(p.resistencias).forEach(tipo => {
        const bonusEl = document.getElementById('inline-res-' + tipo);
        if (bonusEl) bonusEl.oninput = () => {
          const attrBase = getAtribResistencia(tipo);
          const modAttr = attrBase ? mod(p.attrs[attrBase] || 10) : null;
          const bonus = parseInt(bonusEl.value) || 0;
          const totalEl = document.getElementById('res-total-' + tipo);
          if (totalEl) totalEl.textContent = modAttr !== null ? modAttr + bonus : bonus;
        };
      });
    }

    // Condições
    const condBody = document.getElementById('ficha-condicoes-body');
    if (condBody) {
      condBody.innerHTML = CONDITIONS.map(c =>
        `<button class="condicao-badge ${(p.condicoes||[]).includes(c.id) ? 'ativo' : ''}" id="cond-${c.id}" data-cond="${c.id}" type="button">${c.label}</button>`
      ).join('');
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
        };
      });
    }

    // Notas
    const notasEl = document.getElementById('ficha-notas-input');
    if (notasEl) notasEl.value = p.notas || '';

    const btnLvl = document.getElementById('btn-levelup');
    if (btnLvl) btnLvl.disabled = p.nivel >= 10;
    verificarAlertaXP();

    renderizarMochila();

    _isRendering = false;
  }

  // ───── Inventário / Mochila ─────
  const MOCHILA_SLOT_NOMES = {
    arma:'Arma', peito:'Peitoral', elmo:'Elmo', luvas:'Luvas',
    perneiras:'Perneiras', botas:'Botas', anel:'Anel', amuleto:'Amuleto',
    cinto:'Cinto', especial:'Especial de Classe'
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
    if (!panel) return;
    if (!p || typeof getInventario !== 'function') { panel.innerHTML = ''; return; }

    const inv = getInventario();
    const mochila = inv.filter(i => !i.equipadoPor);

    if (mochila.length === 0) {
      panel.innerHTML = '<p class="ficha-empty-small">Mochila vazia. Role itens no <a href="../mestre/rolador-tesouros/">Rolador de Tesouros</a> e salve-os aqui. Itens equipados aparecem no painel de Equipamento acima.</p>';
      return;
    }

    panel.innerHTML = mochila.map(item => {
      const equipado = item.equipadoPor === p.id;
      const equipSlotEntry = equipado
        ? Object.entries(p.equipadoSlots || {}).find(([,v]) => v === item.id)
        : null;
      const equipSlotNome = equipSlotEntry
        ? (MOCHILA_SLOT_NOMES[equipSlotEntry[0].replace(/\d$/, '')] || equipSlotEntry[0])
        : null;

      const qualStyle = MOCHILA_QUAL_STYLE[item.qualidade] || 'color:#aaa';
      const afixosList = (item.afixos || []).map(af =>
        `<div style="font-size:.76rem;color:#888;margin-top:.1rem">` +
        `<span style="color:#555;font-size:.7rem;text-transform:uppercase;margin-right:.3rem">${esc(af.tipo)}</span>` +
        `<b>${esc(af.nome)}</b> — ${esc(af.efeito)}</div>`
      ).join('');

      const slotTipo = item.slotTipo || 'arma';
      const multiSlots = slotTipo === 'arma' ? ['arma1','arma2'] : slotTipo === 'anel' ? ['anel1','anel2'] : null;
      let equipBtns;
      if (equipado) {
        equipBtns = `<span style="font-size:.78rem;color:#27ae60;margin-right:.4rem">✓ ${esc(equipSlotNome || 'equipado')}</span>` +
          `<button class="ficha-btn ficha-btn-secondary" style="font-size:.75rem;padding:.15rem .5rem" ` +
          `onclick="window._fichaDesequipar('${item.id}')">Desequipar</button>`;
      } else if (multiSlots) {
        equipBtns = multiSlots.map(s =>
          `<button class="ficha-btn ficha-btn-primary" style="font-size:.75rem;padding:.15rem .5rem" ` +
          `onclick="window._fichaEquipar('${s}','${item.id}')">` +
          `Equipar em ${MOCHILA_SLOT_NOMES[slotTipo]} ${s.slice(-1)}</button>`
        ).join(' ');
      } else {
        equipBtns = `<button class="ficha-btn ficha-btn-primary" style="font-size:.75rem;padding:.15rem .5rem" ` +
          `onclick="window._fichaEquipar('${slotTipo}','${item.id}')">Equipar</button>`;
      }

      return `<div class="mochila-item${equipado ? ' mochila-equipado' : ''}">` +
        `<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:.5rem;flex-wrap:wrap">` +
        `<div style="flex:1;min-width:0">` +
        `<div style="${qualStyle};font-weight:700;font-size:.9rem">${esc(item.nome)}</div>` +
        `<div style="font-size:.73rem;color:#666;margin-bottom:.15rem">` +
        `${esc(item.qualidade)} · ${esc(MOCHILA_SLOT_NOMES[slotTipo] || slotTipo)}` +
        `${item.infoBase ? ' · ' + esc(item.infoBase) : ''}</div>` +
        `${afixosList}</div>` +
        `<div style="display:flex;gap:.3rem;align-items:center;flex-wrap:wrap;flex-shrink:0">` +
        `${equipBtns}` +
        `<button class="ficha-btn ficha-btn-danger" style="font-size:.75rem;padding:.15rem .4rem" ` +
        `onclick="window._fichaDeleteItem('${item.id}')" title="Remover do inventário">✕</button>` +
        `</div></div></div>`;
    }).join('');
  }

  function equiparItemFicha(slotKey, itemId) {
    const p = personagemAtual;
    if (!p) return;
    if (!p.equipadoSlots) p.equipadoSlots = {};
    // Desequipar item anterior no slot
    const oldId = p.equipadoSlots[slotKey];
    if (oldId && typeof atualizarItemInventario === 'function') atualizarItemInventario(oldId, { equipadoPor: null });
    // Equipar
    p.equipadoSlots[slotKey] = itemId;
    if (typeof atualizarItemInventario === 'function') atualizarItemInventario(itemId, { equipadoPor: p.id });
    // Se armadura: atualizar equipamento[slot] para CA calc
    const armorSlots = ['elmo','peito','luvas','perneiras','botas'];
    if (armorSlots.includes(slotKey) && typeof getInventarioItem === 'function') {
      const item = getInventarioItem(itemId);
      if (item && item.tipoArmadura) p.equipamento[slotKey] = item.tipoArmadura;
    }
    const idx = personagens.findIndex(x => x.id === p.id);
    if (idx >= 0) personagens[idx] = p;
    salvarPersonagens();
    recalcularStats();
    renderizarMochila();
    mostrarToast('Item equipado!');
  }

  function desequiparItemFicha(itemId) {
    const p = personagemAtual;
    if (!p) return;
    const slotEntry = Object.entries(p.equipadoSlots || {}).find(([,v]) => v === itemId);
    if (slotEntry) p.equipadoSlots[slotEntry[0]] = null;
    if (typeof atualizarItemInventario === 'function') atualizarItemInventario(itemId, { equipadoPor: null });
    const idx = personagens.findIndex(x => x.id === p.id);
    if (idx >= 0) personagens[idx] = p;
    salvarPersonagens();
    recalcularStats();
    renderizarMochila();
    mostrarToast('Item desequipado.');
  }

  function deletarItemInventario(itemId) {
    const p = personagemAtual;
    if (p) {
      const slotEntry = Object.entries(p.equipadoSlots || {}).find(([,v]) => v === itemId);
      if (slotEntry) { p.equipadoSlots[slotEntry[0]] = null; }
      const idx = personagens.findIndex(x => x.id === p.id);
      if (idx >= 0) { personagens[idx] = p; salvarPersonagens(); }
    }
    if (typeof removerDoInventario === 'function') removerDoInventario(itemId);
    recalcularStats();
    renderizarMochila();
    mostrarToast('Item removido do inventário.');
  }

  window._fichaEquipar = equiparItemFicha;
  window._fichaDesequipar = desequiparItemFicha;
  window._fichaDeleteItem = deletarItemInventario;

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

    const roll = Math.ceil(Math.random() * 20);
    const talento = encontrarTalento(cls.talentos, roll);

    setText('levelup-nivel-atual', `Nível ${p.nivel} → ${p.nivel + 1}`);
    setText('levelup-roll', roll);
    setText('levelup-talento-texto', talento?.text || '—');

    const selectEl = document.getElementById('levelup-select-talento');
    if (selectEl) {
      selectEl.innerHTML = cls.talentos.map(t =>
        `<option value="${t.roll}" ${t.roll === talento?.roll ? 'selected' : ''}>[${t.roll}] ${t.text.substring(0, 80)}${t.text.length > 80 ? '…' : ''}</option>`
      ).join('');
      selectEl.onchange = () => {
        const chosen = cls.talentos.find(t => t.roll === selectEl.value);
        if (chosen) setText('levelup-talento-texto', chosen.text);
      };
    }
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

    const talento = cls.talentos.find(t => t.roll === selectEl.value);
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
    p.ca = calcCAFromEquip(cls, p.attrs, p.equipamento, p.escudo);
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
