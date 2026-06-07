// --- Modo Desenvolvedor ---
(function () {
  var DEV_KEY = "diablo-rpg-dev-mode";

  function applyDevMode(active) {
    document.body.classList.toggle("dev-mode", active);
  }

  function injectDevButton() {
    // Evita injetar duas vezes (SPA navigation)
    if (document.getElementById("dev-mode-toggle")) return;

    var header = document.querySelector(".md-header__inner");
    if (!header) return;

    var btn = document.createElement("button");
    btn.id = "dev-mode-toggle";
    btn.title = "Modo Desenvolvedor";
    btn.textContent = "DEV";
    btn.style.cssText = [
      "background: transparent",
      "border: 1px solid rgba(255,255,255,0.25)",
      "color: rgba(255,255,255,0.45)",
      "border-radius: 3px",
      "padding: 2px 7px",
      "font-size: 0.68rem",
      "font-family: monospace",
      "cursor: pointer",
      "letter-spacing: 0.06em",
      "margin-left: 8px",
      "transition: all 0.2s",
      "vertical-align: middle"
    ].join(";");

    var isActive = localStorage.getItem(DEV_KEY) === "1";
    applyDevMode(isActive);
    if (isActive) btn.style.color = "#ff8c00";
    if (isActive) btn.style.borderColor = "#ff8c00";

    btn.addEventListener("click", function () {
      isActive = !isActive;
      localStorage.setItem(DEV_KEY, isActive ? "1" : "0");
      applyDevMode(isActive);
      btn.style.color = isActive ? "#ff8c00" : "rgba(255,255,255,0.45)";
      btn.style.borderColor = isActive ? "#ff8c00" : "rgba(255,255,255,0.25)";
    });

    // Insere antes do botão de tema (último filho)
    var title = header.querySelector(".md-header__title");
    if (title && title.nextSibling) {
      header.insertBefore(btn, title.nextSibling);
    } else {
      header.appendChild(btn);
    }
  }

  // MkDocs Material usa SPA — reinjecta no navigate
  document.addEventListener("DOMContentLoaded", function () {
    injectDevButton();
    applyDevMode(localStorage.getItem(DEV_KEY) === "1");
  });
  document.addEventListener("DOMContentSwitch", function () {
    injectDevButton();
    applyDevMode(localStorage.getItem(DEV_KEY) === "1");
  });
})();

document.addEventListener("DOMContentLoaded", function () {

  // --- Tabelas de set (h4 com .set-title) ---
  document.querySelectorAll("h4.set-title, h4 .set-title").forEach(function (el) {
    var h4 = el.closest("h4") || el;
    findNextTables(h4, ["H2", "H3", "H4"]).forEach(function (t) {
      t.classList.add("set-table");
    });
  });

  // --- Tabela de únicos (h2 com .unique-title) ---
  document.querySelectorAll("h2.unique-title, h2 .unique-title").forEach(function (el) {
    var h2 = el.closest("h2") || el;
    findNextTables(h2, ["H2"]).forEach(function (t) {
      t.classList.add("unique-table");
    });
  });

  // --- Tabelas de classe ---
  document.querySelectorAll("h3").forEach(function (h3) {
    var text = h3.textContent || "";
    var tables = findNextTables(h3, ["H2", "H3"]);
    if (tables.length === 0) return;

    if (text.includes("Talentos")) {
      tables[0].classList.add("talent-table");
      // Destaca a linha 19 (ultimate)
      var rows = tables[0].querySelectorAll("tbody tr");
      rows.forEach(function (row) {
        var cell = row.querySelector("td");
        if (cell && cell.textContent.trim().startsWith("19")) {
          row.classList.add("ultimate-row");
        }
      });
    } else if (text.includes("Objetivos")) {
      tables[0].classList.add("objective-table");
    }
  });

  // Utilitário: percorre irmãos e retorna tabelas encontradas
  function findNextTables(heading, stopTags) {
    var tables = [];
    var el = heading.nextElementSibling;
    while (el) {
      if (stopTags.includes(el.tagName)) break;
      var table = el.tagName === "TABLE" ? el : el.querySelector("table");
      if (table) tables.push(table);
      el = el.nextElementSibling;
    }
    return tables;
  }
});
