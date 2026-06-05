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
