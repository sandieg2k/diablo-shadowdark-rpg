document.addEventListener("DOMContentLoaded", function () {
  // Tabelas de set (h4 com .set-title)
  document.querySelectorAll("h4.set-title, h4 .set-title").forEach(function (el) {
    var h4 = el.closest("h4") || el;
    findNextTable(h4, ["H2", "H3", "H4"]).forEach(function (t) {
      t.classList.add("set-table");
    });
  });

  // Tabela de únicos (h2 com .unique-title)
  document.querySelectorAll("h2.unique-title, h2 .unique-title").forEach(function (el) {
    var h2 = el.closest("h2") || el;
    findNextTable(h2, ["H2"]).forEach(function (t) {
      t.classList.add("unique-table");
    });
  });

  function findNextTable(heading, stopTags) {
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
