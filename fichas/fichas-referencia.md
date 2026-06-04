# Fichas 2.0 — Referência de Estrutura

Documentação da estrutura das fichas do Diablo RPG (versão 2.0), criadas no Miro.  
O PDF imprimível está em `fichas/Fichas 2.0.pdf`.

---

## Ficha 1 — Principal

**Cabeçalho**
- NOME
- CLASSE / ATRIBUTO (atributo primário da classe)
- NÍVEL — barra visual de 1 a 10 com três faixas:
  - Normal (1–3): nenhuma penalidade
  - Pesadelo (4–7): −5 em todas as Resistências
  - Tormento (8+): −10 em todas as Resistências
- XP — campo com formato "X Nível / 10 XP"
- TÍTULO — campo com nota "Apenas um Título Ativo por vez"

**Recursos**

| Seção | Campos |
|---|---|
| VIDA | Total / Atual |
| DEFESA | 10 + Des + Armadura OU 10 + Armadura |
| MANA | Total / Atual |
| ATK | Atributo + Bônus de Ataque |
| RECURSO | Campo livre (varia por classe) |

**Atributos**

| Atributo | Colunas |
|---|---|
| FOR | ATR / MOD |
| DES | ATR / MOD |
| CON | ATR / MOD |
| INT | ATR / MOD |
| SAB | ATR / MOD |
| CAR | ATR / MOD |

**Regras Rápidas de Ações** (resumo impresso na ficha)
- ◈ Uma Ação — esforço básico: atacar, mover-se ou usar um item simples
- ◈◈ Duas Ações — esforço concentrado: magias complexas ou manobras pesadas
- ◈◈◈ Três Ações — esforço total: habilidades Ultimate que consomem todo o turno
- ◇ Ação Livre — instantânea, não consome fôlego (limite de 1 por turno)
- △ Reação — fora do turno, em resposta a um gatilho

**Talentos** (6 slots na ficha principal, dispostos em 2 colunas × 3 linhas)

Cada slot contém:
- TALENTO (nome)
- AÇÃO / CUSTO / TIPO
- EFEITO (campo de texto)

**Invocações / Companheiros** (2 slots no lado direito, cada um com imagem)

Regras simplificadas impressas na ficha:
1. **Ataque Único:** usam os atributos primários do mestre (Força ou Inteligência)
2. **Proteção:** não usam equipamentos — Defesa via Talentos do herói (Necromante ou Druida)
3. **Ação de Comando:** gasta ◈ para dar ordens a todas as invocações de uma vez

---

## Ficha 2 — Inventário

**Cabeçalho de totais**
- DEFESA TOTAL
- BÔNUS DE ATAQUE
- BÔNUS DE DANO

**Tabela de Equipamentos** (3 colunas: Item / Tipo+Valor / Dados)

Slots listados:
- Elmo, Peito, Luvas, Perneiras, Botas, Especial, Amuleto, Anel 1, Anel 2, Arma 1, Arma 2

**Resistências**

| Tipo | Valor |
|---|---|
| Físico | |
| Fogo | |
| Gelo | |
| Raio | |
| Veneno | |
| Arcano | |
| Sagrado | |

**Slots Visuais com Ícones** (linha superior)
- Especial / Elmo / Amuleto / Arma 1 / Arma 2 / Anel 2

**Slots Visuais com Ícones** (linha inferior)
- Luva / Peito / Perneira / Bota / Cinto / Anel 1

**Regra do Cinto** (impressa na ficha)
- Slot especial para Consumíveis — cabe 3 itens consumíveis
- Consumíveis no Cinto: usar gasta ◈ Uma Ação
- Consumíveis no Grid de Inventário: usar gasta ◈◈ Duas Ações para procurar e usar

---

## Ficha 3 — Talentos (Expansão)

Ficha suplementar para personagens com muitos talentos.

- 12 slots de talento (3 colunas × 4 linhas)
- Cada slot com os mesmos campos da ficha principal: TALENTO / AÇÃO / CUSTO / TIPO / EFEITO

---

## Ficha 4 — Grid de Inventário

**Grade de 12 slots** (2 linhas × 6 colunas): Slot 1 ao Slot 12

**Regras impressas na ficha**
- Itens Médios ocupam **1 Slot**; Itens Grandes ocupam **2 Slots**
- Limite de slots livres = Modificador de FOR + Nível

**Sobrecarga**
- Se carregar mais itens do que a FOR permite (ficando sem quadrados livres), gasta o **dobro de ações ◈**

---

## Ficha 5 — Objetivos e Notas

**Objetivos** (4 entradas, coluna esquerda)

Cada entrada contém:
- CONCLUÍDO (checkbox)
- OBJETIVO (campo de texto)
- RECOMPENSA (campo de texto)

**Notas Gerais** (área central/direita)

| Seção | Conteúdo |
|---|---|
| NPCs | Campo livre para anotar personagens encontrados |
| MISSÃO PRINCIPAL | Campo de texto |
| FACÇÕES | 3 entradas, cada uma com: Nome, Reputação, Relação Atual, Positiva/Negativa (marcadores coloridos), Contatos |
| MISSÕES SECUNDÁRIAS | Campo de texto |
| RUMORES | Campo de texto |
| BESTIÁRIO | Lista com campos: NOME / FRAQUEZA / SITUAÇÃO (para registrar criaturas já encontradas) |

---

## Cards de Itens (Frente/Verso)

Cards imprimíveis para representar itens físicos na mesa. Cada tipo tem frente e verso.

### Card: Armas

**Frente**
- NOME
- REQUISITO / TIPO / SLOTS / ATAQUE / DANO / DEFESA / ALCANCE
- ENGASTES (campo para runas/gemas)
- RARIDADE: Comum / Mágico / Raro / Lendário (com código de cores)
- DURABILIDADE (caixinhas de marcação)

**Verso**
- PROPRIEDADES
- Nº AFIXOS
- Imagem da arma

---

### Card: Escudos / Armaduras

**Frente** — mesmos campos das Armas

**Verso**
- PROPRIEDADES / Nº AFIXOS
- RESISTÊNCIAS: Físico / Fogo / Gelo / Raio / Veneno / Arcano / Sagrado
- Imagem da armadura

---

### Card: Consumíveis

**Frente**
- NOME
- DURAÇÃO: Instante / Cena / Descanso / Especial (checkboxes)
- SLOTS: 1
- TIPO: Vida / Mana / Recurso / Scroll (marcadores coloridos)
- Imagens de exemplo (poção, pergaminho)
- *Descarte após o uso*

**Verso**
- PROPRIEDADES
- *Descarte após o uso*

---

### Card: Acessórios

**Frente** — mesmos campos das Armas

**Verso**
- PROPRIEDADES / Nº AFIXOS
- RESISTÊNCIAS (mesmo padrão das Armaduras)
- Imagem do acessório

---

### Card: Invocações / Companheiros

**Frente**
- NOME
- CUSTO / DURAÇÃO
- ATAQUE / DANO
- DEFESA
- VIDA (rastreador com caixinhas individuais)
- AÇÕES: ◈ / ◈◈ / ◈◈◈ / △ (checkboxes)
- Imagem da invocação

**Verso**
- HABILIDADES (campo de texto)

---

### Card: Especiais de Classe

**Frente**
- NOME
- REQUISITO / TIPO / SLOTS: 1 / ATAQUE / DANO / DEFESA / ALCANCE
- ENGASTES
- RARIDADE: Comum / Mágico / Raro / Lendário
- DURABILIDADE

**Verso**
- PROPRIEDADES / Nº AFIXOS
- Imagem (runa/símbolo)

---

## Notas de Design

- O logo nas fichas ainda referencia "ShadowDark RPG" — atualizar para "Diablo RPG" na próxima versão
- A ficha de Talentos expansão (12 slots) deve ser usada junto com a ficha principal para classes com muitos talentos
- O Bestiário na Ficha 5 é preenchido pelo jogador durante o jogo — registro de criaturas encontradas com fraquezas descobertas
