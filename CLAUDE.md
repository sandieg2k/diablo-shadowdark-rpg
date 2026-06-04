# CLAUDE.md

This file provides guidance to Claude Code when working with this project.

## Sobre o Projeto

RPG de mesa homebrew inspirado na franquia **Diablo**. Criado por Paulo Souza (GitHub: Felipe1072-git).

- **Nome do sistema:** Diablo RPG
- **Documento principal:** `Diablo Homebrew RPG.md`
- **Versão atual:** 1.0 (Playtest)
- **Repositório:** https://github.com/Felipe1072-git/diablo-shadowdark-rpg

## Fluxo de Trabalho

O documento é editado no **Google Docs** e versionado no **GitHub** como Markdown:

1. Paulo edita o documento no **Google Docs**
2. Quando quiser salvar: `Arquivo → Fazer download → Markdown (.md)` e salvar na pasta do Drive
3. O arquivo fica disponível em: `G:\Meu Drive\Cool Side of RPG\Diablo RPG\Diablo Homebrew RPG.md`
4. Claude lê direto dessa pasta, copia para o repo local e commita no GitHub

**Repo local clonado em:** `C:\Users\Paulo Souza\Documents\Claude\Diablo RPG\repo\`

## Convenções de Commit

Usar prefixos descritivos:
- `feat:` nova regra, classe, cenário ou mecânica
- `fix:` correção de erro ou inconsistência nas regras
- `docs:` atualização de texto, revisão ou reorganização
- `refactor:` reorganização do documento sem mudança de conteúdo

Sempre passar o link do commit para o usuário conferir as mudanças.

## Revisão de Texto

- Manter a voz e personalidade do autor (Paulo) — nunca formalizar o tom
- Corrigir apenas gramática e clareza
- Mostrar diff (vermelho/verde) antes de commitar alterações de texto
- Passar o link do commit após cada push para o usuário conferir
