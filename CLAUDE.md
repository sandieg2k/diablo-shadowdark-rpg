# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Sobre o Projeto

RPG de mesa homebrew inspirado na franquia **Diablo**, construído sobre o sistema **Shadowdark**. Criado por Paulo Souza (GitHub: Felipe1072-git).

- **Documento principal:** `Diablo Homebrew RPG.docx` — contém todas as regras, cenários e fichas
- **Versão atual:** 1.0 (Playtest)
- **Repositório:** https://github.com/Felipe1072-git/diablo-shadowdark-rpg

## Fluxo de Trabalho

Este projeto usa **Google Drive** para edição e **GitHub** para controle de versão:

1. O arquivo `.docx` é editado no **Google Docs** (via Google Drive em `G:\Meu Drive\Cool Side of RPG\Diablo RPG\`)
2. Após edições, exportar como `.docx` (**Arquivo → Fazer download → Microsoft Word**) e salvar na mesma pasta
3. Commitar a nova versão no git com mensagem descritiva

## Comandos Git

```bash
# Ver o que mudou
git status
git diff

# Salvar uma nova versão
git add "Diablo Homebrew RPG.docx"
git commit -m "descrição do que mudou"
git push

# Criar um PR para uma mudança
git checkout -b nome-do-branch
git add <arquivo>
git commit -m "descrição"
git push -u origin nome-do-branch
gh pr create --base main --head nome-do-branch --title "título" --body "descrição"
```

## Convenções de Commit

Usar prefixos descritivos:
- `feat:` nova regra, classe, cenário ou mecânica
- `fix:` correção de erro ou inconsistência nas regras
- `docs:` atualização de README ou documentação
- `refactor:` reorganização do documento sem mudança de conteúdo

## Arquivo .gdoc

O arquivo `Diablo Homebrew RPG.gdoc` na pasta é apenas um **atalho** para o Google Docs — não contém conteúdo real. O arquivo de trabalho é sempre o `.docx`.
