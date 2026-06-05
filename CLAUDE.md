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
├── diablo-rpg-livro-do-jogador.md ← Livro do Jogador (Cap. 1, 2, 4, 5, 6, 7 + Apêndices)
├── diablo-rpg-livro-do-mestre.md  ← Livro do Mestre (encontros, tesouros, forte, handouts…)
├── 01-classes.md            ← Cap. 3: Classes (18 classes)
├── apendice-a-criaturas.md  ← Apêndice A: Criaturas
├── apendice-b-glossario.md  ← Apêndice B: Glossário
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
1. `diablo-rpg-livro-do-jogador.md` (Cap. 1–2, 4–7, Apêndices) — distribuir aos jogadores
2. `01-classes.md` (Cap. 3)
3. `diablo-rpg-livro-do-mestre.md` — **não distribuir aos jogadores**

Os cenários e fichas são documentos separados, não fazem parte do livro principal.

## Status do Livro

| Capítulo | Status |
|---|---|
| Capa | ✅ Pronto |
| Introdução | ✅ Pronto |
| Cap. 1: Jogando o Jogo | ⚠️ Em revisão (ver Goal 2) |
| Cap. 2: Criando um Personagem | ⚠️ Em revisão (ver Goal 2) |
| Cap. 3: Classes (18 classes) | ✅ Pronto |
| Cap. 4: Origens | ⚠️ Em revisão (ver Goal 2) |
| Cap. 5: Talentos | ⚠️ Em revisão (ver Goal 2) |
| Cap. 6: Arsenal | ⚠️ Em revisão (ver Goal 2) |
| Cap. 7: Magia | ⚠️ Em revisão (ver Goal 2) |
| **Apêndice A: Criaturas** | ✅ Pronto |
| **Apêndice B: Glossário** | ✅ Pronto |

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
- Propriedades das armas — definir no Arsenal (Finesse, Versátil, Haste, etc. usadas mas não explicadas)
- Formatação do Cap. 7 Magia — headings virou texto, frase cortada, parágrafo dentro de `##`

🟡 Média
- Duplicações em Talentos Gerais: "Força da Desesperança" em duas tabelas com efeitos diferentes; "Pele Grossa" e "Pele de Pedra" com efeito idêntico
- Cap. 4 Origens — consolidar: conteúdo duplicado entre Cap. 2 (Títulos) e Cap. 4
- Seções vazias: `# Pontos de Ação` (sem conteúdo) e `# Fichas 2.0` (sem conteúdo)
- `## ---` aparece 3× como subheadings no Cap. 1 — devem ser `---` simples

🟢 Baixa
- Imagem quebrada `![][image1]` na seção de Mana
- Ordenação dos capítulos no arquivo (Cap. 1 vem depois de Cap. 2, 4, 5)

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
