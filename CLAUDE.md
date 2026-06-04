# CLAUDE.md

This file provides guidance to Claude Code when working with this project.

## Sobre o Projeto

RPG de mesa homebrew inspirado na franquia **Diablo**. Criado por Paulo Souza (GitHub: Felipe1072-git).

- **Nome do sistema:** Diablo RPG
- **Documento principal:** `Diablo Homebrew RPG.md`
- **Versão atual:** 1.0 (Playtest)
- **Repositório:** https://github.com/Felipe1072-git/diablo-shadowdark-rpg

## Estrutura do Livro (aprovada)

Livro principal: `Diablo Homebrew RPG.md` — inspirado no D&D 5e (2024).
Sem conceito de raças: todos os personagens são humanos/nephalem. O Cap. 4 explica isso e oferece antecedentes temáticos do universo Diablo.

### Mapeamento: o que existe vs. o que falta

| Capítulo | Status | Localização no .md |
|---|---|---|
| Capa | ✅ Pronto | linha 1 |
| Introdução | ✅ Pronto | linha 7 |
| **Cap. 1: Jogando o Jogo** | ✅ Pronto | Regras base adicionadas (dados, atributos, testes, salvaguardas, PV). Combate/PA, Mana, Tempo, Viagem, Encontros, Matriz de Resistência já existiam |
| **Cap. 2: Criando um Personagem** | ✅ Pronto | Passo a passo, kits iniciais das 18 classes, avanço de nível 1–10 (marcos ou XP) |
| **Cap. 3: Classes** | ✅ Pronto | `01-classes.md` |
| **Cap. 4: Origens** | ✅ Pronto | Introdução nephalem/humanos, Título de Origem (referência ao sistema existente), 12 Antecedentes com habilidades permanentes |
| **Cap. 5: Talentos** | ✅ Pronto | 6 tabelas d20 (Combate, Magia, Sobrevivência, Social, Exploração, Fortuna) — alternativa às tabelas de classe ao subir de nível |
| **Cap. 6: Arsenal** | ✅ Pronto | Arsenal l.382, Tesouros+Tabelas l.761–1101 |
| **Cap. 7: Magia** | ✅ Pronto | linha 322 |
| **Apêndice A: Criaturas** | ⚠️ Parcial | Tabelas de encontros l.668 — sem statblocks completos |
| **Apêndice B: Glossário** | ❌ Faltando | — |

### Arquivos separados (fora do livro principal)

| Conteúdo | Status | Situação |
|---|---|---|
| Cenários (7 módulos) | ✅ Escritos | Estão no .md principal (l.1102–1641) — precisam ser movidos para `cenarios/` |
| Fichas 2.0 | ❌ Vazia | Só o título existe (l.485) |
| Registro de Campanha | ✅ Escrito | l.1644 — mover para arquivo separado |
| Forte (NPCs e base) | ✅ Escrito | l.1750 — pode virar módulo separado |
| Handout - Caverna B | ✅ Escrito | l.1825 — material do cenário O Resgate |
| Template de Cenário | ✅ Escrito | l.21 — guia para criar aventuras, pode virar apêndice do mestre |

### Conteúdo interno (não entra no livro publicado)
- `Ideias` l.1714 — rascunhos internos

### Prioridade de trabalho
1. ~~Regras básicas do Cap. 1~~ ✅
2. ~~Passo a passo de criação e avanço de nível (Cap. 2)~~ ✅
3. ~~Cap. 4: Origens~~ ✅
4. ~~Cap. 5: Talentos~~ ✅
5. Mover cenários para arquivos individuais em `cenarios/`
6. Fichas 2.0
7. Apêndice de Criaturas e Glossário

## Fluxo de Trabalho

O documento é editado no **Google Docs** e versionado no **GitHub** como Markdown.

**Duas pastas distintas — nunca misturar:**
- `G:\Meu Drive\Cool Side of RPG\Diablo RPG\` → pasta do **Google Drive** (somente arquivos de conteúdo, **sem git**)
- `C:\Users\Paulo Souza\Documents\Claude\Diablo RPG\repo\` → **repositório git** local (todos os commits e pushes rodam daqui)

**Passo a passo para salvar uma versão:**
1. Paulo edita no **Google Docs**
2. `Arquivo → Fazer download → Markdown (.md)` → salvar em `G:\Meu Drive\Cool Side of RPG\Diablo RPG\`
3. Claude copia o `.md` do Drive para o repo: `C:\Users\Paulo Souza\Documents\Claude\Diablo RPG\repo\`
4. Claude commita e faz push a partir do repo (nunca da pasta do Drive)

**Para compartilhar com os jogadores:** link direto do GitHub → https://github.com/Felipe1072-git/diablo-shadowdark-rpg

**Atenção:** o Google Drive cria `desktop.ini` em todas as subpastas, inclusive dentro de `.git`, corrompendo o repositório. Por isso o git **nunca deve rodar na pasta do Drive**.

## Convenções de Commit

Usar prefixos descritivos:
- `feat:` nova regra, classe, cenário ou mecânica
- `fix:` correção de erro ou inconsistência nas regras
- `docs:` atualização de texto, revisão ou reorganização
- `refactor:` reorganização do documento sem mudança de conteúdo

Sempre passar o link do commit para o usuário conferir as mudanças.

Sempre usar os pop-ups de escolha (AskUserQuestion) para perguntas de sim/não ou múltipla escolha — nunca fazer essas perguntas só em texto.

## Criação de Conteúdo

- É **estritamente proibido** inventar regras, mecânicas, nomes ou conteúdo de jogo sem consultar o usuário primeiro
- Sempre apresentar a ideia/sugestão e aguardar aprovação antes de escrever no documento
- Pode agir de forma criativa nas sugestões, mas a decisão final é sempre do usuário
- Nunca assumir que algo "faz sentido" mecanicamente sem confirmar com o usuário

## Revisão de Texto

- Manter a voz e personalidade do autor (Paulo) — nunca formalizar o tom
- Corrigir apenas gramática e clareza
- Mostrar diff (vermelho/verde) antes de commitar alterações de texto
- Passar o link do commit após cada push para o usuário conferir

## Status da Revisão do Documento

### Concluído
- **Capa:** nome do sistema atualizado para "Diablo RPG"
- **Introdução:** correções gramaticais, frase incompleta completada
- **Template de Cenário:** referência ao "Pearson" removida, cabeçalhos vazios removidos, conteúdo duplicado removido
- **Classes (todas as 18):** revisão completa
  - Cabeçalhos duplicados removidos (Amazona, Renegado e todas as classes com `# ---`)
  - Heading `### Dicas` adicionado em todas as classes
  - Seção Dicas escrita para o Warlock (única que estava faltando)
  - Typos, erros de concordância e referências incorretas corrigidos
  - Todas as referências a "Shadowdark" substituídas por "Diablo RPG"
  - Estrutura padronizada: Habilidades → Talentos → Dicas → Objetivos
- **Infraestrutura do repositório:**
  - `.gitignore` criado (desktop.ini, .gdoc, .docx, .pdf)
  - Pasta do Drive separada do repositório git
  - CLAUDE.md atualizado com fluxo definitivo

### Pendente (próxima conversa)
- **Estrutura do livro:** definir seções de Origens (Antecedentes/Espécies) e Talentos com o usuário
- **Sistema de Títulos e Renome**
- **Pontos de Ação**
- **Mana**
- **Sistema de Magia**
- **Arsenal**
- **Fichas 2.0**
- **Tempo**
- **Viagem**
- **Encontros**
- **Tesouros**
- Cenários: Senhor da Mentira, A Torre Esquecida, O Abatedouro Profano, O Monarca Louco, O Carcereiro das Cinzas, Sarcófago Escarlate, O Resgate
- **Registro de Campanha**
- **Handout - Caverna B**
- **Ideias**
- **Forte**
- **Matriz de Resistência**
