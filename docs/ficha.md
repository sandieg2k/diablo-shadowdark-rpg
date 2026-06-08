# 🧙 Gerador de Fichas

<style>
@media (max-width: 767px) {
  .ficha-form-row { grid-template-columns: 1fr !important; }
  .ficha-form-row > * { grid-column: span 1 !important; }
}
</style>

<div id="ficha-app">

<!-- ════════════════════════════════ LISTA ════════════════════════════════ -->
<div id="view-lista">
  <div class="lista-hero">
    <div class="lista-hero-texto">
      <div class="lista-hero-titulo">Meus Personagens</div>
      <div class="lista-hero-sub">Selecione um herói ou crie um novo</div>
    </div>
    <div class="lista-hero-acoes">
      <button id="btn-novo" class="ficha-btn ficha-btn-primary lista-btn-principal">+ Novo Personagem</button>
      <button id="btn-importar-trigger" class="ficha-btn ficha-btn-secondary">⬆ Importar JSON</button>
      <input type="file" id="input-importar" accept=".json" style="display:none">
    </div>
  </div>
  <div id="lista-personagens" class="ficha-grid"></div>
</div>

<!-- ════════════════════════════════ CRIAÇÃO ════════════════════════════════ -->
<div id="view-criacao" style="display:none">
  <h2 id="form-titulo-pagina" style="margin-bottom:1.2rem">Novo Personagem</h2>
  <div class="ficha-form">

    <!-- Identidade -->
    <div class="ficha-form-section">
      <h3>Identidade</h3>
      <div class="ficha-form-row">
        <div class="ficha-form-group" style="grid-column:span 2">
          <label>Nome</label>
          <input type="text" id="form-nome" placeholder="Nome do personagem">
        </div>
        <div class="ficha-form-group">
          <label>Classe</label>
          <select id="form-classe"></select>
        </div>
        <div class="ficha-form-group">
          <label>Atributo Primário</label>
          <select id="form-atrib-primario"></select>
        </div>
        <div class="ficha-form-group">
          <label>Atrib. de Ataque</label>
          <select id="form-atrib-atk"></select>
        </div>
        <div class="ficha-form-group">
          <label>Atrib. de Conjuração</label>
          <select id="form-atrib-conj"></select>
        </div>
        <div class="ficha-form-group">
          <label>Nível</label>
          <input type="number" id="form-nivel" min="1" max="10" value="1">
        </div>
        <div class="ficha-form-group">
          <label>XP</label>
          <input type="number" id="form-xp" min="0" value="0">
        </div>
        <div class="ficha-form-group">
          <label>Título Ativo</label>
          <select id="form-titulo"></select>
          <p id="form-titulo-preview" class="form-efeito-preview"></p>
        </div>
        <div class="ficha-form-group">
          <label>Antecedente</label>
          <select id="form-antecedente"></select>
          <p id="form-antecedente-preview" class="form-efeito-preview"></p>
        </div>
      </div>
    </div>

    <!-- Atributos -->
    <div class="ficha-form-section">
      <h3>Atributos <small style="font-weight:400;color:#888">(3d6 cada)</small></h3>
      <button id="btn-rolar-atributos" class="ficha-btn ficha-btn-secondary" style="margin-bottom:.9rem" type="button">🎲 Rolar Todos (3d6)</button>
      <div class="attr-grid">
        <div class="attr-item">
          <label>FOR</label>
          <input type="number" id="form-FOR" min="3" max="18" value="10">
          <div class="attr-mod" id="form-mod-FOR">+0</div>
        </div>
        <div class="attr-item">
          <label>DES</label>
          <input type="number" id="form-DES" min="3" max="18" value="10">
          <div class="attr-mod" id="form-mod-DES">+0</div>
        </div>
        <div class="attr-item">
          <label>CON</label>
          <input type="number" id="form-CON" min="3" max="18" value="10">
          <div class="attr-mod" id="form-mod-CON">+0</div>
        </div>
        <div class="attr-item">
          <label>INT</label>
          <input type="number" id="form-INT" min="3" max="18" value="10">
          <div class="attr-mod" id="form-mod-INT">+0</div>
        </div>
        <div class="attr-item">
          <label>SAB</label>
          <input type="number" id="form-SAB" min="3" max="18" value="10">
          <div class="attr-mod" id="form-mod-SAB">+0</div>
        </div>
        <div class="attr-item">
          <label>CAR</label>
          <input type="number" id="form-CAR" min="3" max="18" value="10">
          <div class="attr-mod" id="form-mod-CAR">+0</div>
        </div>
      </div>
    </div>


    <!-- Resistências iniciais (colapsável) -->
    <details class="ficha-form-section">
      <summary>Bônus de Resistência Inicial <small style="font-weight:400;color:#888">(itens/talentos — normalmente 0 na criação)</small></summary>
      <div class="ficha-form-row">
        <div class="ficha-form-group"><label>Físico</label><input type="number" id="form-res-Fisico" value="0" min="0"></div>
        <div class="ficha-form-group"><label>🔥 Fogo</label><input type="number" id="form-res-Fogo" value="0" min="0"></div>
        <div class="ficha-form-group"><label>❄️ Gelo</label><input type="number" id="form-res-Gelo" value="0" min="0"></div>
        <div class="ficha-form-group"><label>⚡ Relâmpago</label><input type="number" id="form-res-Relampago" value="0" min="0"></div>
        <div class="ficha-form-group"><label>☣️ Veneno</label><input type="number" id="form-res-Veneno" value="0" min="0"></div>
        <div class="ficha-form-group"><label>💀 Necrótico</label><input type="number" id="form-res-Necrotico" value="0" min="0"></div>
        <div class="ficha-form-group"><label>✨ Radiante</label><input type="number" id="form-res-Radiante" value="0" min="0"></div>
        <div class="ficha-form-group"><label>🧠 Psíquico</label><input type="number" id="form-res-Psiquico" value="0" min="0"></div>
        <div class="ficha-form-group"><label>🔮 Arcano</label><input type="number" id="form-res-Arcano" value="0" min="0"></div>
      </div>
    </details>

    <!-- Talento Inicial -->
    <div class="ficha-form-section" id="form-talento-section">
      <!-- preenchido por JS apenas na criação -->
    </div>

    <!-- Notas -->
    <div class="ficha-form-section">
      <h3>Notas</h3>
      <div class="ficha-form-group">
        <textarea id="form-notas" rows="3" placeholder="Objetivos, NPCs, missões…"></textarea>
      </div>
    </div>

    <div class="ficha-form-actions">
      <button id="btn-cancelar-criacao" class="ficha-btn ficha-btn-secondary" type="button">Cancelar</button>
      <button id="btn-salvar-criacao" class="ficha-btn ficha-btn-primary" type="button">✔ Salvar Personagem</button>
    </div>

  </div>
</div>

<!-- ════════════════════════════════ FICHA ════════════════════════════════ -->
<div id="view-ficha" style="display:none">

  <div class="ficha-view-header">
    <button id="btn-voltar-lista" class="ficha-btn ficha-btn-secondary">← Lista</button>
    <div class="ficha-view-actions">
      <button id="btn-levelup" class="ficha-btn ficha-btn-success">⬆ Level Up</button>
      <button id="btn-descansar" class="ficha-btn ficha-btn-secondary">💤 Descansar</button>
      <button id="btn-salvar-ficha" class="ficha-btn ficha-btn-primary">💾 Salvar</button>
      <button id="btn-editar-ficha" class="ficha-btn ficha-btn-secondary">✏ Editar</button>
      <button id="btn-exportar" class="ficha-btn ficha-btn-secondary">⬇ Exportar</button>
      <button id="btn-imprimir" class="ficha-btn ficha-btn-secondary">🖨 Imprimir</button>
      <button class="ficha-btn ficha-btn-secondary" onclick="window._fichaAddLacaio()" type="button">🐺 Lacaio</button>
      <button id="btn-excluir-ficha" class="ficha-btn ficha-btn-danger">✕ Excluir</button>
    </div>
  </div>

  <!-- Cabeçalho da ficha -->
  <div class="ficha-panel ficha-cabecalho-panel">
    <div id="ficha-nome-display"></div>
    <div id="ficha-classe-display" class="cab-classe"></div>
    <div class="cab-nivel-row">
      <div id="ficha-nivel-display"></div>
      <div class="cab-xp">XP: <span id="ficha-xp-wrapper"></span></div>
    </div>
    <hr class="cab-divider">
    <div class="cab-badge-row">
      <div class="cab-bloco">
        <div class="cab-badge">
          <span class="cab-badge-label">Título</span>
          <strong id="ficha-titulo-display" class="cab-badge-nome"></strong>
        </div>
        <div id="ficha-titulo-efeito" class="cab-efeito"></div>
      </div>
      <div class="cab-bloco">
        <div class="cab-badge">
          <span class="cab-badge-label">Antecedente</span>
          <strong id="ficha-antecedente-display" class="cab-badge-nome cab-badge-nome-ant"></strong>
        </div>
        <div id="ficha-antecedente-efeito" class="cab-efeito"></div>
      </div>
    </div>
  </div>

  <!-- Recursos principais -->
  <div class="ficha-panel">
    <h3>Recursos</h3>
    <div class="recursos-grid">
      <div class="recurso-item recurso-item-editavel">
        <div class="recurso-label">Vida (PV)</div>
        <div class="recurso-valor pv" id="ficha-pv-display">—</div>
        <div class="recurso-btns">
          <button onclick="window._fichaPVDelta(-1)" type="button" class="btn-pm btn-pm-inline">-1</button>
          <button onclick="window._fichaPVDelta(1)" type="button" class="btn-pm btn-pm-inline">+1</button>
        </div>
      </div>
      <div class="recurso-item recurso-item-editavel">
        <div class="recurso-label">Mana</div>
        <div class="recurso-valor mana" id="ficha-mana-display">—</div>
        <div class="recurso-btns">
          <button onclick="window._fichaManaDelta(-1)" type="button" class="btn-pm btn-pm-inline">-1</button>
          <button onclick="window._fichaManaDelta(1)" type="button" class="btn-pm btn-pm-inline">+1</button>
        </div>
      </div>
      <div class="recurso-item"><div class="recurso-label">CA</div><div class="recurso-valor ca" id="ficha-ca-display">—</div></div>
      <div class="recurso-item"><div class="recurso-label">RD Física</div><div class="recurso-valor" id="ficha-rd-display" style="color:#3498db">—</div></div>
      <div class="recurso-item"><div class="recurso-label" id="lbl-atk-bonus">ATK Bônus</div><div class="recurso-valor atk" id="ficha-atk-display">—</div></div>
      <div class="recurso-item"><div class="recurso-label" id="lbl-conj-bonus">Conj. (FOR)</div><div class="recurso-valor" id="ficha-conj-display" style="color:#9b59b6;font-size:1rem">—</div></div>
      <div class="recurso-item"><div class="recurso-label">Bônus de Dano</div><div class="recurso-valor" id="ficha-dano-display" style="color:#e67e22;font-size:1rem">—</div></div>
    </div>
    <!-- Bônus manuais (ATK extra, Conjuração) -->
    <div id="ficha-bonus-row" class="recursos-grid" style="margin-top:.6rem;border-top:1px solid #222;padding-top:.6rem"></div>
    <!-- Armadura / Escudo editáveis inline -->
    <div id="ficha-armadura-inline" style="margin-top:.4rem"></div>
  </div>

  <!-- Condições -->
  <div class="ficha-panel">
    <h3>Condições</h3>
    <div id="ficha-condicoes-body" style="min-height:2rem"></div>
  </div>

  <!-- Atributos + Habilidades -->
  <div class="ficha-two-col">
    <div class="ficha-panel">
      <h3>Atributos</h3>
      <table class="ficha-table">
        <thead><tr><th>Atributo</th><th>Valor</th><th>Mod.</th></tr></thead>
        <tbody id="ficha-atributos-body"></tbody>
      </table>
    </div>
    <div class="ficha-panel">
      <h3>Habilidades de Classe</h3>
      <ul class="ficha-habilidades-list" id="ficha-habilidades-body"></ul>
    </div>
  </div>

  <!-- Talentos -->
  <div class="ficha-panel">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem">
      <h3 style="margin:0">Talentos</h3>
      <button id="btn-add-talento" class="ficha-btn ficha-btn-secondary" style="font-size:.8rem;padding:.2rem .7rem" type="button">+ Talento</button>
    </div>
    <div id="ficha-talentos-body"></div>
  </div>

  <!-- Equipamento + Resistências -->
  <div class="ficha-two-col">
    <div class="ficha-panel">
      <h3>Equipamento</h3>
      <table class="ficha-table">
        <tbody id="ficha-equipamento-body"></tbody>
      </table>
    </div>
    <div class="ficha-panel">
      <h3>Matriz de Resistência</h3>
      <table class="ficha-table" id="res-table">
        <thead><tr><th>Tipo</th><th title="Modificador do atributo base" style="color:#e67e22">⚄ Atrib.</th><th title="Bônus manual">± Base</th><th title="RD de itens equipados" style="color:#4a9edd">🛡 Itens</th><th>= Total</th></tr></thead>
        <tbody id="ficha-resistencias-body"></tbody>
      </table>
    </div>
  </div>

  <!-- Notas Estruturadas -->
  <div class="ficha-panel">
    <h3>Notas de Campanha</h3>
    <div id="ficha-notas-body"></div>
  </div>

  <!-- Lacaios & Pets -->
  <div class="ficha-panel" id="ficha-lacaios-panel" style="display:none">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem">
      <h3 style="margin:0">Lacaios &amp; Pets</h3>
      <button class="ficha-btn ficha-btn-danger" style="font-size:.8rem;padding:.2rem .7rem" onclick="window._fichaAddLacaio()" type="button">+ Adicionar</button>
    </div>
    <div id="ficha-lacaios-body" style="display:flex;flex-wrap:wrap;gap:.6rem"></div>
  </div>

  <!-- Mochila & Inventário -->
  <div class="ficha-panel" id="ficha-mochila-panel">
    <h3>🎒 Mochila &amp; Inventário</h3>
    <p style="font-size:.8rem;color:#666;margin:0 0 .6rem">Itens do personagem. Adicione manualmente ou via <a href="../mestre/rolador-tesouros/">Rolador de Tesouros</a>. Ao equipar, os bônus são aplicados automaticamente.</p>
    <div id="ficha-mochila-body"></div>
  </div>

</div>

<!-- ════════════════════════════════ LEVEL UP ════════════════════════════════ -->
<div id="view-levelup" style="display:none">
  <div class="levelup-container">
    <h2>⬆ Subindo de Nível</h2>
    <p id="levelup-nivel-atual" style="color:#aaa"></p>

    <div class="ficha-panel">
      <div style="display:flex;gap:.8rem;flex-wrap:wrap;align-items:flex-end">
        <div class="ficha-form-group" style="flex:0 0 auto">
          <label>Tabela</label>
          <select id="levelup-tabela-tipo" style="padding:.35rem .5rem;background:#111;border:1px solid #444;border-radius:4px;color:#eee;font-family:inherit;font-size:.9rem">
            <option value="classe">Tabela da Classe</option>
            <option value="geral">Tabela Geral</option>
          </select>
        </div>
        <div id="levelup-geral-group" class="ficha-form-group" style="display:none;flex:0 0 auto">
          <label>Tabela Geral</label>
          <select id="levelup-tabela-geral-id" style="padding:.35rem .5rem;background:#111;border:1px solid #444;border-radius:4px;color:#eee;font-family:inherit;font-size:.9rem"></select>
        </div>
        <button id="btn-rolar-levelup-novo" class="ficha-btn ficha-btn-secondary" type="button">🎲 Rolar novamente</button>
      </div>
    </div>

    <div class="ficha-panel" style="text-align:center">
      <p style="margin:0;color:#888;font-size:.9rem">Resultado do d20:</p>
      <div class="levelup-roll-display" id="levelup-roll">—</div>
    </div>

    <div class="ficha-panel">
      <h3>Talento Rolado</h3>
      <div class="levelup-talento-box" id="levelup-talento-texto"></div>
    </div>

    <div class="ficha-panel">
      <label class="levelup-select-label" for="levelup-select-talento">
        Confirme o talento ou escolha outro (caso duplicata ou resultado 20):
      </label>
      <select id="levelup-select-talento" style="width:100%;padding:.4rem;background:#111;border:1px solid #444;color:#eee;border-radius:4px;font-size:.88rem"></select>
    </div>

    <div style="display:flex;gap:.8rem;margin-top:1rem;justify-content:flex-end">
      <button id="btn-cancelar-levelup" class="ficha-btn ficha-btn-secondary">Cancelar</button>
      <button id="btn-confirmar-levelup" class="ficha-btn ficha-btn-success">✔ Confirmar Level Up</button>
    </div>
  </div>
</div>

<datalist id="datalist-armas"></datalist>
</div>
