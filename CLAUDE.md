# CLAUDE.md

This file provides guidance to Claude Code when working with this project.

## Sobre o Projeto

RPG de mesa homebrew inspirado na franquia **Diablo**. Criado por Paulo Souza (GitHub: Felipe1072-git).

- **Nome do sistema:** Diablo RPG
- **Versão atual:** 1.0 (Playtest)
- **Repositório:** https://github.com/Felipe1072-git/diablo-shadowdark-rpg
- **Para os jogadores:** link direto do GitHub acima

## Fluxo de Trabalho

Todo o conteúdo vive no repositório git local:
**`C:\Users\Paulo Souza\Documents\Claude\Diablo RPG\repo\`**

- Paulo e Claude editam os arquivos `.md` diretamente no repo
- Claude commita e faz push após cada alteração aprovada
- Nunca rodar git na pasta do Drive (`G:\Meu Drive\...`) — o Google Drive cria `desktop.ini` que corrompe o `.git`

**Para gerar o PDF do livro:** instalar o Pandoc e rodar o script `build-pdf.ps1` (a criar).

## Sistema de Distâncias ✅

Três vocabulários distintos para evitar ambiguidade:

| Conceito | Termos | Medidas |
|---|---|---|
| **Zonas** (posição) | Adjacente · Próximo · Distante | 2,5cm / 15cm / 30cm na mesa |
| **Velocidade** (por ◈) | Vel. Normal · Vel. Rápida · Voo Normal · Voo Rápido | 1 zona / 2 zonas |
| **Alcance** (habilidades) | Toque · Curto · Longo | Adjacente / Próximo / Distante |

1 quadrado = 2,5cm · 5ft · ~1,5m. Réguas de mesa: 15cm (Próximo) e 30cm (Distante).

Substituições aplicadas em todos os arquivos (commit f53cfef).

---

## Estrutura de Arquivos

```
repo/
├── livro-do-jogador.md      ← Livro do Jogador (Cap. 1, 2, 4, 5, 6, 7 + Apêndices)
├── livro-do-mestre.md       ← Livro do Mestre (Cap. 1 Encontros, Cap. 2 Tesouros, Cap. 3 Registro, Apêndice Template)
├── cap3-classes.md          ← Cap. 3: Classes (18 classes)
├── apendice-criaturas.md    ← Apêndice A: Criaturas
├── apendice-glossario.md    ← Apêndice B: Glossário
├── referencia-mestre-progressao.md ← Tabelas de PV/progressão por nível (calibração de criaturas)
├── cenarios/                ← 8 módulos de aventura
│   ├── senhor-da-mentira.md      ← inclui Handout Caverna B no final
│   ├── baluarte-dos-lobos-de-ferro.md ← NPCs do Forte (Rayna, Sorit, Jarek, Valla, Harek, Elara, Silas)
│   ├── a-torre-esquecida.md
│   ├── o-abatedouro-profano.md
│   ├── o-monarca-louco.md
│   ├── o-carcereiro-das-cinzas.md
│   ├── sarcofago-escarlate.md
│   └── o-resgate.md
├── notas/                   ← rascunhos e ideias de campanha (não entra no livro)
│   └── notas-campanha.md    ← Sinister 7, ganchos de missão, referências
└── fichas/
    ├── fichas-referencia.md ← documentação da estrutura das fichas
    └── Fichas 2.0.pdf       ← fichas imprimíveis (não entra no git)
```

**Ordem de compilação para o PDF:**
1. `livro-do-jogador.md` (Cap. 1–2, 4–7, Apêndices) — distribuir aos jogadores
2. `cap3-classes.md` (Cap. 3)
3. `livro-do-mestre.md` — **não distribuir aos jogadores**

Os cenários e fichas são documentos separados, não fazem parte do livro principal.

## Status do Livro

| Capítulo | Status |
|---|---|
| Capa | ✅ Pronto |
| Introdução | ✅ Pronto |
| Cap. 1: Jogando o Jogo | ✅ Pronto |
| Cap. 2: Criando um Personagem | ✅ Pronto |
| Cap. 3: Classes (18 classes) | ✅ Pronto |
| Cap. 4: Origens | ✅ Pronto |
| Cap. 5: Talentos | ✅ Pronto |
| Cap. 6: Arsenal | ✅ Pronto |
| Cap. 7: Magia | ✅ Pronto |
| **Apêndice A: Criaturas** | ✅ Pronto |
| **Apêndice B: Glossário** | ✅ Pronto |
| **Livro do Mestre** | ✅ Revisado |

## Decisões de Design Consolidadas

### Sistema de Armaduras ✅

**Cada armadura tem CA própria (13–18)** — progressão de 1 ponto por nível de armadura:
- **Couro** (Leve): CA 13, +Mod DES. · **Couro Reforçado** (Leve): CA 14, +Mod DES, RD 1 físico
- **Brunea** (Média): CA 15, Requer FOR 11. · **Cota de Malha** (Média): CA 16, Requer FOR 11, RD 2 físico
- **Meia-Placa** (Pesada): CA 17, Ruído, Requer FOR 13, RD 2 físico. · **Placa Completa** (Pesada): CA 18, Ruído, Requer FOR 13, RD 3 físico

(Movimento Lento removido — considerado punitivo demais.)

### Sistema de Escudos ✅

**Acesso ao escudo acompanha o tipo de armadura da classe** — não está mais listado individualmente nas classes:
- **Leve** → Broquel (+1 CA)
- **Média** → Broquel e Escudo (+2 CA, Quebrável)
- **Pesada** → todos os três + Escudo de Torre (+3 CA, Quebrável, -DES, Mov. -1)

### Propriedade Trespassar ✅

Ação ativa: gaste **◈◈** para realizar um golpe devastador. Uma rolagem de ataque contra **todos os inimigos adjacentes**. Cada acerto causa dano completo da arma.

### Terminologia de Magia ✅

A DC que sobe a cada conjuração bem-sucedida se chama **DC de Conjuração** (era "DC de Fadiga" / "DC de exaustão" em versões anteriores).

### Categorias de Itens ✅

Hierarquia de raridade alinhada com a franquia Diablo:
**Normal → Mágico → Raro → Lendário → Único / Set**

- **Normal** (era "Comum"): item base sem afixos
- **Mágico**: 1 Prefixo ou 1 Sufixo
- **Raro**: 1 Prefixo + 1 Sufixo
- **Lendário**: 2 Prefixos + 1 Sufixo (ou efeito especial do Mestre)
- **Único**: efeito fixo exclusivo, sem sistema de prefixo/sufixo
- **Set**: template em aberto, bônus a definir futuramente

### Arsenal — Armas ✅

Lista expandida e alinhada com a franquia Diablo (commits 87e6705):
- **Foice** (1d10, 2H) renomeada para **Foice de Guerra**
- Adicionadas: Porrete, Foice (Sickle 1d4), Martelo Leve, Cimitarra, Tridente, Maça Grande, Martelo de Guerra, Estrela da Manhã, Rapieira, Pica, Glaive, Lança de Montaria
- **Glaive** diferencia da Alabarda com propriedade Trespassar
- LdM: Malho corrigido para 2d8, Machado Grande corrigido para 2d8, Bordão unificado como Cajado, Machadinha removida

### Arsenal — Catalisadores ✅

Seção removida do LdJ. Os 5 itens com efeitos fixos (Crânio Preservado, Orbe de Essência, Escudo de Zakarum, Pedra de Espírito, Pena de Rapina) são candidatos a **itens Únicos** futuramente.

### Arsenal — Cinto ✅

- **Cinto**: 3 slots de consumível — 5 po
- **Cinto de Couro Reforçado**: 4 slots de consumível — 20 po

### Slot Especial — Itens de Classe ✅

Cada classe tem um item exclusivo que já funciona em versão Normal, amplificando diretamente a habilidade core da classe. Preços: 50–200 po.

| Classe | Item | Efeito Base |
|---|---|---|
| Arcanista | Orbe Arcano | Cargas Arcanas +3 dano/carga |
| Mago | Tomo de Magias | 1×/combate feitiço de Afinidade sem teste |
| Necromante | Filogênio | +2 limite de lacaios |
| Feiticeiro | Mojo | Veneno +2 rodadas (Mestre das Pragas) |
| Renegada | Carcaj de Sombra | Ataque Furtivo +1d6 (total +2d6) |
| Sacerdote | Símbolo Sagrado | Oração Purificadora 1d8 |
| Warlock | Grimório | Pacto de Sangue 1d6 Mana |
| Amazona | Aljava de Batalha | Crítico com arcos 19–20 |
| Assassina | Kit de Armadilhas | Sentinelas +1d4 dano |
| Caçador de Demônios | Aljava Sombria | Habilidades de Ódio –1 Mana (mín. 1) |
| Druida | Totem Druídico | Espírito Animal +2 HP/+1 dano |
| Natispirito | Cristal de Espírito | +1 dano haste (total +2) |
| Monge | Faixa Sagrada | Espírito em Fluxo: Mod. SAB +1/turno |
| Paladino | Relíquia | Golpe Sagrado Nível+2 Radiante |
| Cavaleiro de Sangue | Cálice de Sangue | Sifão de Sangue 2 HP |
| Cruzado | Filogênio Sagrado | Ataque de escudo 1d6 |
| Guerreiro | Pedra de Afiação | +1 dano com arma de Mestria |
| Bárbaro | Totem Ancestral | Fúria: +1 HP/turno |

### Tipos de Dano Válidos ✅

O sistema tem **9 tipos** (auditoria completa feita em todos os arquivos, commits desta sessão):

| Categoria | Tipos |
|---|---|
| Físico | Físico *(sub-tipos: cortante, perfurante, contundente — não precisam de resistência separada)* |
| Elemental | Fogo · Gelo · Relâmpago · Veneno |
| Sobrenatural | Necrótico · Radiante · Psíquico · Arcano |

- **"Sombrio" não existe** — é Necrótico. Todas as ocorrências foram corrigidas.
- **"Sagrado" não é tipo válido** — usar Radiante.
- **"Elétrico" não é canônico** — usar Relâmpago.
- Armas causam **Físico por padrão**, salvo propriedade especial, encantamento ou habilidade de classe.
- A proteção de atributo: INT → Fogo/Gelo/Relâmpago · CON → Veneno · SAB → Necrótico/Psíquico · CAR → Radiante/Arcano · Físico → só armadura e itens.

### Corrosão de Mundo — Faixas de Dificuldade ✅

- **Nível 1–4 (Normal):** sem penalidade
- **Nível 5–7 (Pesadelo):** –5 em todas as Resistências
- **Nível 8–10 (Inferno):** –10 em todas as Resistências

### Tabela de Tesouros d100 — LdM ✅

Distribuição atual (Cap. 2 Tesouros):
- **01–39** Armaduras (sub-tabela própria com peça/set e qualidade)
- **40–75** Armas Corpo a Corpo
- **76–88** Armas à Distância e Focos
- **89–91** Anel · **92–94** Amuleto · **95–96** Cinto
- **97–00** Especial de Classe — Mestre escolhe para qual PJ do grupo

---

## Prioridade de Trabalho

### Goal 1 — Estrutura e Conteúdo Base
1. ~~Regras básicas (Cap. 1)~~ ✅
2. ~~Criação e avanço de personagem (Cap. 2)~~ ✅
3. ~~Cap. 4: Origens~~ ✅
4. ~~Cap. 5: Talentos~~ ✅
5. ~~Mover cenários para `cenarios/`~~ ✅
6. ~~Revisar DCs fixas nas classes~~ ✅
7. ~~Revisar referências a "proficiência"~~ ✅
8. ~~Fichas 2.0 documentadas~~ ✅
9. ~~Apêndice A: Criaturas~~ ✅
10. ~~Apêndice B: Glossário~~ ✅
11. ~~Revisão de distâncias~~ ✅
12. Script de geração de PDF (`build-pdf.ps1`) ← pendente

### Goal 2 — Revisão de Conteúdo (clareza, elegância, princípios)

**Princípios do sistema** (extraídos da Introdução):
1. Simular a sensação de jogar Diablo
2. Turnos rápidos — sem demora na tomada de decisão
3. Desafiador — emular o modo Hardcore

**Fila de ajustes por prioridade:**

🔴 Alta
- ~~Títulos de Origem — reformatar como tabela legível~~ ✅ (commit d09968c)
- ~~Propriedades das armas — definir no Arsenal~~ ✅ (commit e276132)
- ~~Formatação do Cap. 7 Magia — headings virou texto, frase cortada, parágrafo dentro de `##`~~ ✅ (commit e276132)

🟡 Média
- ~~**Duplicações em Talentos Gerais:** "Força da Desesperança" / "Pele Grossa" vs "Pele de Pedra"~~ ✅ (commit 4c8c412)
- ~~**Cap. 4 Origens — consolidar:** Sistema de Títulos fundido ao Cap. 4~~ ✅ (commit 4c8c412)
- ~~Seções vazias: `# Pontos de Ação` e `# Fichas 2.0`~~ ✅ (commit e276132)
- ~~`## ---` aparece 3× como subheadings no Cap. 1~~ ✅ (commit e276132)
- ~~**Cap. 6 Arsenal:** propriedades duplicadas, Trespassar conflitante, texto fantasma~~ ✅ (commit c0fd66a)
- ~~**Cap. 7 Magia:** heading inconsistente, terminologia "DC" com três nomes~~ ✅ (commit 9d2c8bb)

🟢 Baixa
- ~~Imagem quebrada `![][image1]` na seção de Mana~~ ✅ (commit e276132)
- ~~**Ordenação dos capítulos no arquivo:** Cap. 1 vinha depois de Cap. 2, 4, 5~~ ✅ (commit 1e8e186)

### Goal 4 — Estrutura e Capítulos do Livro do Mestre ✅ (commit 44dc6af)

- Cap. 1 Encontros / Cap. 2 Tesouros e Itens / Cap. 3 Registro de Campanha / Apêndice Template
- Tabelas de Itens Base, Prefixos e Sufixos rebaixadas para `##` (subseções de Cap. 2)
- `## Tempo` e `## Viagem` movidas para dentro do Cap. 3
- NPCs dos Lobos de Ferro extraídos para `cenarios/baluarte-dos-lobos-de-ferro.md`
- Handout Caverna B movido para `cenarios/senhor-da-mentira.md`
- Rascunhos de campanha (Sinister 7, ganchos) movidos para `notas/notas-campanha.md`

### Goal 5 — Tabelas de Referência do Mestre (`referencia-mestre-progressao.md`) ✅

Expandir o documento com todas as estatísticas relevantes para calibração de encontros e distribuição de recompensas. Ordem de execução:

1. ~~CA por tier com 3 colunas de escudo e min/max por nível~~ ✅ (commit e49ee58)
2. ~~Dano dos monstros por faixa de nível~~ ✅ (commit 904d30f)
3. ~~DC de Salvaguardas recomendadas (fácil / moderado / mortal por nível)~~ ✅ (commit c9d2cbb)
4. ~~RD disponível por tier~~ ✅ — expandido para Resistência completa por arquétipo (commit 517d0d4)
5. ~~Probabilidade de acerto — tabela cruzada ATK × CA com % de chance~~ ✅ (commit 5f4f2b9)
6. ~~Riqueza esperada por nível (ouro e itens para calibrar tesouros e lojas)~~ ✅ (commit 94fc15a)
7. ~~Tabela DPT expandida — todas as 18 classes, Nv 1/3/5/7/10, fonte principal por classe~~ ✅ (commit b1b6d08)
8. ~~Revisão da Matriz de Resistências no LdJ — Sombrio unificado com Necrótico, Corrosão de Mundo corrigida~~ ✅ (commit e3a9f46)

---

### Goal 3 — Revisão do Livro do Mestre ✅ (commit dbb0938 + f3e8a64 + 9419ada)

- Template de Cenário reescrito para linguagem de RPG (era wargame de miniaturas)
- Tabelas de Sufixos: coluna "Prefixo" corrigida para "Sufixo" em todas as seções
- Tabela de Runas: runa e sufixo separados em colunas distintas
- Texto fantasma de edição removido
- Tabela de armaduras convertida para sistema Leve/Média/Pesada consistente com LdJ
- Sistema de escudos por tier implementado (Broquel/Escudo/Torre)
- "Escudos" removido das classes — agora é regra implícita pelo tipo de armadura

### Goal 6 — Revisão de Balanceamento das Classes (`cap3-classes.md`) ← próximo

Revisar as 18 classes usando as tabelas de `referencia-mestre-progressao.md` como referência matemática. Objetivo: valores de dano consistentes com o DPT por tier, habilidades com custo de Mana coerente com a escala, identidade de cada classe preservada.

- Usar as tabelas de DPT, CA e dano de monstros como âncora numérica
- Seguir os princípios do sistema: turnos rápidos, decisões claras, sensação de Diablo
- Apresentar sugestões de ajuste por classe e aguardar aprovação antes de editar
- Trabalhar classe por classe ou em grupos temáticos (marciais / casters / summoners)

---

## Convenções de Commit

- `feat:` nova regra, classe, cenário ou mecânica
- `fix:` correção de erro ou inconsistência nas regras
- `docs:` atualização de texto, revisão ou reorganização
- `refactor:` reorganização sem mudança de conteúdo

Sempre passar o link do commit para o usuário conferir.

## Criação de Conteúdo

- É **estritamente proibido** inventar regras, mecânicas, nomes ou conteúdo de jogo sem consultar o usuário primeiro
- Sempre apresentar a ideia/sugestão e aguardar aprovação antes de escrever no documento
- Pode agir de forma criativa nas sugestões, mas a decisão final é sempre do usuário
- Nunca assumir que algo "faz sentido" mecanicamente sem confirmar com o usuário

## Revisão de Texto

- Manter a voz e personalidade do autor (Paulo) — nunca formalizar o tom
- Corrigir apenas gramática e clareza
- Mostrar diff antes de commitar alterações de texto

## Preferências de Interação

- Sempre usar pop-ups de escolha (AskUserQuestion) para perguntas de sim/não ou múltipla escolha
