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
├── livro-do-mestre.md       ← Livro do Mestre (encontros, tesouros, forte, handouts…)
├── cap3-classes.md          ← Cap. 3: Classes (18 classes)
├── apendice-criaturas.md    ← Apêndice A: Criaturas
├── apendice-glossario.md    ← Apêndice B: Glossário
├── referencia-mestre-progressao.md ← Tabelas de PV/progressão por nível (calibração de criaturas)
├── cenarios/                ← 7 módulos de aventura
│   ├── senhor-da-mentira.md
│   ├── a-torre-esquecida.md
│   ├── o-abatedouro-profano.md
│   ├── o-monarca-louco.md
│   ├── o-carcereiro-das-cinzas.md
│   ├── sarcofago-escarlate.md
│   └── o-resgate.md
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

**Tipo define CA** — nomes de armadura são estéticos dentro do mesmo tipo:
- **Leve:** CA 14 (+Mod DES). Variantes: Couro (—) · Couro Reforçado (RD 1 físico)
- **Média:** CA 16. Variantes: Brunea (—) · Cota de Malha (RD 2 físico)
- **Pesada:** CA 18. Variantes: Meia-Placa (RD 2 físico) · Placa Completa (RD 3 físico)

Propriedades de armadura (por tipo): Leve: +Mod DES à CA | Pesada: Ruído, Mov. Lento, Requer FOR 13.

### Sistema de Escudos ✅

**Acesso ao escudo acompanha o tipo de armadura da classe** — não está mais listado individualmente nas classes:
- **Leve** → Broquel (+1 CA)
- **Média** → Broquel e Escudo (+2 CA, Quebrável)
- **Pesada** → todos os três + Escudo de Torre (+3 CA, Quebrável, -DES, Mov. -1)

### Propriedade Trespassar ✅

Ação ativa: gaste **◈◈** para realizar um golpe devastador. Uma rolagem de ataque contra **todos os inimigos adjacentes**. Cada acerto causa dano completo da arma.

### Terminologia de Magia ✅

A DC que sobe a cada conjuração bem-sucedida se chama **DC de Conjuração** (era "DC de Fadiga" / "DC de exaustão" em versões anteriores).

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

### Goal 4 — Estrutura e Capítulos do Livro do Mestre ⬅️ PRÓXIMA SESSÃO

O `livro-do-mestre.md` foi revisado no conteúdo (Goal 3), mas ainda não tem estrutura de capítulos consistente com o Livro do Jogador. Estrutura atual do LdM:

```
# Template de Cenário        ← sem numeração de capítulo
# Encontros                  ← duplicado? (ver "# Encontros com Monstros" logo abaixo)
# Encontros com Monstros     ← deveria ser subseção do cap. de Encontros
# Tesouros                   ← cap. solto
# Tabela de Itens Base       ← deveria ser subseção de Tesouros
# Tabela de Prefixos         ← cap. solto
# Tabela de Sufixos          ← cap. solto
# Registro de Campanha       ← cap. solto (inclui tabelas de Tempo e Viagem no final)
# Forte                      ← NPCs e handout misturados
# Handout - Caverna B        ← deveria ser material de cenário, não do LdM
# Tempo — Tabelas do Mestre  ← subseção sem capítulo pai
# Viagem — Tabelas do Mestre ← subseção sem capítulo pai
```

Problemas a resolver com o Paulo:
1. Definir a estrutura de capítulos (numerados ou temáticos)
2. `# Encontros` e `# Encontros com Monstros` parecem duplicar — fundir
3. Tabelas de Itens Base, Prefixos e Sufixos são subseções de Tesouros — reorganizar
4. `# Forte` mistura NPCs de uma campanha específica com regras gerais — separar
5. `# Handout - Caverna B` não deveria estar no LdM principal — mover para cenários
6. Tempo e Viagem estão no final do Registro de Campanha sem hierarquia clara

### Goal 3 — Revisão do Livro do Mestre ✅ (commit dbb0938 + f3e8a64 + 9419ada)

- Template de Cenário reescrito para linguagem de RPG (era wargame de miniaturas)
- Tabelas de Sufixos: coluna "Prefixo" corrigida para "Sufixo" em todas as seções
- Tabela de Runas: runa e sufixo separados em colunas distintas
- Texto fantasma de edição removido
- Tabela de armaduras convertida para sistema Leve/Média/Pesada consistente com LdJ
- Sistema de escudos por tier implementado (Broquel/Escudo/Torre)
- "Escudos" removido das classes — agora é regra implícita pelo tipo de armadura

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
