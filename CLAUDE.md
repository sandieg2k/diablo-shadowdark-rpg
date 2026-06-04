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

## Estrutura de Arquivos

```
repo/
├── Diablo Homebrew RPG.md   ← livro principal (Cap. 1, 2, 4, 5, 6, 7 + Apêndices)
├── 01-classes.md            ← Cap. 3: Classes (18 classes)
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
1. `Diablo Homebrew RPG.md` (Cap. 1–2, 4–7, Apêndices)
2. `01-classes.md` (Cap. 3)

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
| **Apêndice A: Criaturas** | ⚠️ Parcial — tabelas de encontros prontas, statblocks faltando |
| **Apêndice B: Glossário** | ❌ Faltando |

## Prioridade de Trabalho

1. ~~Regras básicas (Cap. 1)~~ ✅
2. ~~Criação e avanço de personagem (Cap. 2)~~ ✅
3. ~~Cap. 4: Origens~~ ✅
4. ~~Cap. 5: Talentos~~ ✅
5. ~~Mover cenários para `cenarios/`~~ ✅
6. ~~Revisar DCs fixas nas classes~~ ✅
7. ~~Revisar referências a "proficiência"~~ ✅
8. ~~Fichas 2.0 documentadas~~ ✅
9. **Apêndice A: Criaturas** ← PRÓXIMO
10. Apêndice B: Glossário
11. Script de geração de PDF (`build-pdf.ps1`)

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
