# 🎲 Rolador de Tesouros

Defina o nível médio do grupo e clique em **Rolar**. O rolador percorre todas as sub-tabelas automaticamente.

<div id="treasure-roller-ui">

<div class="roller-controls">
  <label for="nd-input">Nível médio do grupo (ND):</label>
  <input type="number" id="nd-input" min="1" max="10" value="1">
  <button onclick="rolarTesouro()" class="roll-btn">🎲 Rolar Tesouro</button>
  <button onclick="limparTesouro()" class="roll-btn roll-btn-sec">✕ Limpar</button>
</div>
<div class="roller-controls" style="margin-top:0.5rem;">
  <span style="font-size:0.82rem;color:var(--md-default-fg-color--light);margin-right:4px;">Rolar categoria:</span>
  <button onclick="rolarTesouro({forceCategoria:'ouro'})" class="roll-btn roll-btn-cat">💰 Ouro</button>
  <button onclick="rolarTesouro({forceCategoria:'pocao'})" class="roll-btn roll-btn-cat">🧪 Poção</button>
  <button onclick="rolarTesouro({forceCategoria:'equip'})" class="roll-btn roll-btn-cat">⚔️ Equipamento</button>
  <button onclick="rolarTesouro({forceCategoria:'joia'})" class="roll-btn roll-btn-cat">💍 Joia/Especial</button>
</div>
<div class="roller-controls dev-only" style="margin-top:0.25rem;">
  <button onclick="rolarTesouro({forceSet:true})" class="roll-btn roll-btn-test">🧪 Testar Set</button>
  <button onclick="rolarTesouro({forceCaprichoso:true})" class="roll-btn roll-btn-test">🧪 Testar Caprichoso</button>
</div>

<div id="resultado-tesouro"></div>

</div>

<style>
.roller-controls {
  display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin: 1.5rem 0;
}
#nd-input {
  width: 60px; padding: 6px 10px; border-radius: 4px;
  border: 1px solid var(--md-default-fg-color--light);
  background: var(--md-default-bg-color); color: var(--md-default-fg-color);
  font-size: 1rem; text-align: center; font-family: inherit;
}
.roll-btn {
  padding: 8px 20px; background: #e64a19; color: white;
  border: none; border-radius: 4px; cursor: pointer;
  font-size: 1rem; font-family: inherit; font-weight: bold; transition: background 0.2s;
}
.roll-btn:hover { background: #ff5722; }
.roll-btn-sec { background: #555; }
.roll-btn-sec:hover { background: #777; }
.roll-btn-test { background: #2a6b2a; font-size: 0.85rem; padding: 6px 14px; }
.roll-btn-test:hover { background: #3a8f3a; }
.roll-btn-cat { background: #3a5a7a; font-size: 0.88rem; padding: 6px 14px; }
.roll-btn-cat:hover { background: #4a7aa0; }
.result-card {
  border: 1px solid var(--md-default-fg-color--lightest);
  border-radius: 8px; padding: 1rem 1.2rem; margin-top: 1rem;
  background: var(--md-code-bg-color);
}
.roll-step {
  font-size: 0.88rem; color: var(--md-default-fg-color--light);
  margin: 0.2rem 0; padding-left: 0.6rem;
  border-left: 2px solid var(--md-default-fg-color--lightest);
}
.dice { font-family: monospace; color: #ff8c00; font-weight: bold; }
.final-result {
  margin-top: 1rem; padding-top: 1rem;
  border-top: 1px solid var(--md-default-fg-color--lightest);
  font-size: 1.1rem;
}
.afixo { margin-top: 0.35rem; padding-left: 1rem; font-size: 0.95rem; }
.afixo-tipo {
  font-size: 0.72rem; text-transform: uppercase;
  letter-spacing: 0.05em; color: var(--md-default-fg-color--light);
  margin-right: 4px;
}
.q-normal  { color: #aaa; }
.q-magico  { color: #4a9edd; }
.q-raro    { color: #f0c040; }
.q-lendario{ color: #ff8c00; }
</style>

<script>
(function() {

const d = n => Math.floor(Math.random() * n) + 1;
const lookup = (t, v) => t.find(r => v >= r.min && v <= r.max) || t[t.length - 1];
window._itemAtual = null;

// ===================== TABELAS =====================

const ARMADURAS = [
  { min:1,  max:8,  nome:"Couro",          tipo:"Leve",   ca:"13",  rd:"—",        req:"—",      preco:10   },
  { min:9,  max:12, nome:"Couro Reforçado",tipo:"Leve",   ca:"14",  rd:"1 físico", req:"—",      preco:45   },
  { min:13, max:22, nome:"Brunea",          tipo:"Média",  ca:"15",  rd:"1 físico", req:"FOR 11", preco:50   },
  { min:23, max:27, nome:"Cota de Malha",   tipo:"Média",  ca:"16",  rd:"2 físico", req:"FOR 11", preco:400  },
  { min:28, max:31, nome:"Meia-Placa",      tipo:"Pesada", ca:"17",  rd:"2 físico", req:"FOR 13", preco:750  },
  { min:32, max:34, nome:"Placa Completa",  tipo:"Pesada", ca:"18",  rd:"3 físico", req:"FOR 13", preco:1500 },
  { min:35, max:36, nome:"Broquel",         tipo:"Escudo", ca:"+1",  rd:"—",        req:"—",      preco:10   },
  { min:37, max:38, nome:"Escudo",          tipo:"Escudo", ca:"+2",  rd:"—",        req:"—",      preco:15   },
  { min:39, max:39, nome:"Escudo de Torre", tipo:"Escudo", ca:"+3",  rd:"—",        req:"FOR 13", preco:60   },
];

const PECAS = ["Peitoral","Perneiras","Elmo","Luvas","Botas","Mestre escolhe"];

const QUAL_ARMADURA = [
  { min:1,  max:8,  q:"Normal",      css:"q-normal",   pref:0, suf:0, set:false },
  { min:9,  max:12, q:"Mágica",      css:"q-magico",   pref:1, suf:0, set:false, magOu:true },
  { min:13, max:16, q:"Rara",        css:"q-raro",     pref:1, suf:1, set:false },
  { min:17, max:20, q:"Lendária",    css:"q-lendario", pref:2, suf:1, set:false },
  { min:21, max:24, q:"Normal (Set)",css:"q-normal",   pref:0, suf:0, set:true  },
  { min:25, max:28, q:"Mágico (Set)",css:"q-magico",   pref:1, suf:0, set:true  },
  { min:29, max:999,q:"Raro (Set)",  css:"q-raro",     pref:1, suf:1, set:true  },
];

const QUAL_GERAL = [
  { min:1,  max:10, q:"Normal",   css:"q-normal",   pref:0, suf:0 },
  { min:11, max:14, q:"Mágico",   css:"q-magico",   pref:1, suf:0, magOu:true },
  { min:15, max:18, q:"Raro",     css:"q-raro",     pref:1, suf:1 },
  { min:19, max:999,q:"Lendário", css:"q-lendario", pref:2, suf:1 },
];

const ARMAS_CC = [
  { min:40, max:40, nome:"Porrete",          dano:"1d4"  },
  { min:41, max:41, nome:"Foice (Sickle)",   dano:"1d4"  },
  { min:42, max:42, nome:"Adaga",            dano:"1d4"  },
  { min:43, max:43, nome:"Martelo Leve",     dano:"1d4"  },
  { min:44, max:45, nome:"Lança",            dano:"1d8"  },
  { min:46, max:46, nome:"Cajado",           dano:"1d6"  },
  { min:47, max:47, nome:"Azagaia",          dano:"1d6"  },
  { min:48, max:48, nome:"Machado de Mão",   dano:"1d6"  },
  { min:49, max:49, nome:"Cimitarra",        dano:"1d6"  },
  { min:50, max:50, nome:"Maça",             dano:"1d6"  },
  { min:51, max:51, nome:"Tridente",         dano:"1d6"  },
  { min:52, max:52, nome:"Cestus / Punho",   dano:"1d6"  },
  { min:53, max:53, nome:"Picareta de Guerra",dano:"1d8" },
  { min:54, max:54, nome:"Espada Curta",     dano:"1d6"  },
  { min:55, max:56, nome:"Espada Longa",     dano:"1d8"  },
  { min:57, max:57, nome:"Maça Grande",      dano:"1d8"  },
  { min:58, max:58, nome:"Estrela da Manhã", dano:"1d8"  },
  { min:59, max:59, nome:"Mangual",          dano:"1d8"  },
  { min:60, max:60, nome:"Machado de Guerra",dano:"1d8"  },
  { min:61, max:61, nome:"Martelo de Guerra",dano:"1d8"  },
  { min:62, max:62, nome:"Rapieira",         dano:"1d8"  },
  { min:63, max:63, nome:"Pica",             dano:"1d10" },
  { min:64, max:64, nome:"Alabarda",         dano:"1d10" },
  { min:65, max:65, nome:"Glaive",           dano:"1d10" },
  { min:66, max:66, nome:"Lança de Montaria",dano:"1d12" },
  { min:67, max:67, nome:"Foice de Guerra",  dano:"1d10" },
  { min:68, max:69, nome:"Maul (Marreta)",   dano:"2d8"  },
  { min:70, max:71, nome:"Machado Grande",   dano:"2d8"  },
  { min:72, max:75, nome:"Espada Montante",  dano:"2d10" },
];

const ARMAS_DIST = [
  { min:76, max:76, nome:"Funda",               info:"Pedras"   },
  { min:77, max:77, nome:"Dardos (20)",          info:"Arremesso"},
  { min:78, max:79, nome:"Besta Leve",           info:"Viratons" },
  { min:80, max:81, nome:"Arco Curto",           info:"Flechas"  },
  { min:82, max:83, nome:"Arco Longo",           info:"Flechas"  },
  { min:84, max:84, nome:"Besta Pesada",         info:"Viratons" },
  { min:85, max:86, nome:"Foco Arcano",          info:"Varinha / Cajado / Cristal" },
  { min:87, max:87, nome:"Foco Sagrado",         info:"Relicário / Emblema / Símbolo" },
  { min:88, max:88, nome:"Foco Druídico/Musical",info:"Totem / Cajado / Instrumento" },
];

const JOIAS = [
  { min:89, max:91, nome:"Anel",              slot:"Anel 1 ou Anel 2" },
  { min:92, max:94, nome:"Amuleto",           slot:"Amuleto"          },
  { min:95, max:96, nome:"Cinto",             slot:"Cinto"            },
  { min:97, max:100,nome:"Especial de Classe",slot:"Slot Especial", especial:true },
];

const ESPECIAIS = [
  { classe:"Arcanista",         item:"Orbe Arcano",        efeito:"Cargas Arcanas +3 dano/carga" },
  { classe:"Mago",              item:"Tomo de Magias",     efeito:"1×/cena feitiço de Afinidade sem teste" },
  { classe:"Necromante",        item:"Filogênio",          efeito:"+2 limite de lacaios" },
  { classe:"Feiticeiro",        item:"Mojo",               efeito:"Veneno dura 2 rodadas a mais" },
  { classe:"Renegada",          item:"Carcaj de Sombra",   efeito:"Ataque Furtivo +1d6 (total +2d6)" },
  { classe:"Sacerdote",         item:"Símbolo Sagrado",    efeito:"Oração Purificadora 1d8" },
  { classe:"Warlock",           item:"Grimório",           efeito:"Pacto de Sangue recupera 1d6 Mana" },
  { classe:"Amazona",           item:"Aljava de Batalha",  efeito:"Crítico com arcos em 19–20" },
  { classe:"Assassina",         item:"Kit de Armadilhas",  efeito:"Sentinelas +1d4 dano" },
  { classe:"Caçador de Demônios",item:"Aljava Sombria",   efeito:"Habilidades de Ódio –1 Mana (mín. 1)" },
  { classe:"Druida",            item:"Totem Druídico",     efeito:"Espírito Animal +2 HP / +1 dano" },
  { classe:"Natispirito",       item:"Cristal de Espírito",efeito:"+1 dano com armas de haste (total +2)" },
  { classe:"Monge",             item:"Faixa Sagrada",      efeito:"Espírito em Fluxo: Mod. SAB +1 Mana/turno" },
  { classe:"Paladino",          item:"Relíquia",           efeito:"Golpe Sagrado Nível+2 Radiante" },
  { classe:"Cavaleiro de Sangue",item:"Cálice de Sangue", efeito:"Sifão de Sangue recupera 2 HP" },
  { classe:"Cruzado",           item:"Filogênio Sagrado",  efeito:"Ataque de escudo 1d6" },
  { classe:"Guerreiro",         item:"Pedra de Afiação",   efeito:"+1 dano com arma de Mestria" },
  { classe:"Bárbaro",           item:"Totem Ancestral",    efeito:"Fúria: +1 HP/turno" },
];

// ---- PREFIXOS ----
const PREF_ARMADURA = [
  { min:1,  max:6,  nome:"Robusto",   efeito:"+1 de CA" },
  { min:7,  max:12, nome:"Forte",     efeito:"+1 de CA (+2 contra projéteis)" },
  { min:13, max:18, nome:"Valente",   efeito:"+2 de CA" },
  { min:19, max:24, nome:"Glorioso",  efeito:"+2 de CA (+3 contra projéteis)" },
  { min:25, max:30, nome:"Santo",     efeito:"+3 de CA" },
  { min:31, max:999,nome:"Divino",    efeito:"+3 de CA (+4 contra projéteis)" },
];
const PREF_RESIST = [
  { min:1,  max:10, nome:"Gemas Básicas", efeito:"+1 RD (escolha o tipo de dano)" },
  { min:11, max:30, nome:"Gemas Raras",   efeito:"+2 RD (escolha o tipo de dano)" },
  { min:31, max:31, nome:"Topázio",       efeito:"+2 RD em TODOS os tipos" },
  { min:32, max:999,nome:"Prismático",    efeito:"+3 RD em TODOS os tipos" },
];
const PREF_INIMIGO = [
  { min:1,  max:8,  nome:"Subjugador", efeito:"Alvo Surpreso 1 rodada (SAB DC 11 nega)" },
  { min:9,  max:12, nome:"Exaustivo",  efeito:"Alvo Surpreso 1d4 rodadas (SAB DC 15 nega)" },
  { min:13, max:16, nome:"Esgotante",  efeito:"Iniciativa do alvo = 0 (SAB DC 17 nega)" },
  { min:17, max:19, nome:"Uivante",    efeito:"Alvo Amedrontado 1 rodada (SAB DC 17 nega)" },
  { min:20, max:20, nome:"Caótico",    efeito:"Alvo vira aliado por 1d4+1 rodadas (SAB DC 17 nega)" },
  { min:21, max:999,nome:"Esmagador",  efeito:"Alvo sob Lentidão por 2d4 rodadas (SAB DC 19 nega)" },
];
const PREF_MANA = [
  { min:1,  max:10, nome:"Do Lagarto",   efeito:"Mana máximo +5" },
  { min:11, max:20, nome:"Da Serpente",  efeito:"Mana máximo +10" },
  { min:21, max:27, nome:"Enganador",    efeito:"Ao gastar Mana, role 1d10 — em 10 a Mana não é consumida" },
  { min:28, max:29, nome:"Triunfante",   efeito:"Recupere 1 Mana ao desferir golpe fatal" },
  { min:30, max:999,nome:"Vulpino",      efeito:"Como ⟁, gaste 1 Mana para ganhar RD 3 a todo dano por 1 turno" },
];
const ATRIBUTOS = ["FOR","DES","CON","INT","SAB","CAR"];
const MALDIÇÕES = [
  "Enferrujado: −1 CA",
  "Vulnerável: −2 CA",
  "Vidro: −2 em todos os Testes",
  "Hiena: usuário não pode conjurar feitiços",
  "Umbral: tochas e lanternas apagam",
  "Cristal: item é destruído ao acertar ou sofrer dano",
  "Fraco: todo dano causado é reduzido à metade",
  "Inútil: este item não causa dano",
];
const VISIBILIDADES = [
  "Brilhante: item emite luz Próxima",
  "Oracular: usuário vê criaturas invisíveis",
  "Discreto: invisível para criaturas Distantes",
  "Escondido: invisível para criaturas Próximas e Distantes",
  "Sorrateiro: gaste ◈ para ficar invisível até a próxima ação",
  "Invisível: gaste ◈ + 1 Mana para ficar invisível por 1d4 rodadas",
];

// ---- SUFIXOS ----
const SUF_RD = [
  { min:1,  max:12, nome:"da Saúde",     efeito:"+1 RD em TODOS os tipos" },
  { min:13, max:18, nome:"da Proteção",  efeito:"+2 RD em TODOS os tipos" },
  { min:19, max:25, nome:"da Absorção",  efeito:"+3 RD em TODOS os tipos" },
  { min:26, max:29, nome:"da Vida",      efeito:"+4 RD em TODOS os tipos" },
  { min:30, max:999,nome:"da Deflexão",  efeito:"+5 RD em TODOS os tipos" },
];
const SUF_REACAO = [
  { min:1,  max:14, nome:"de Espinhos", efeito:"Ao ser atingido em C.a.C.: atacante sofre 1d4 Físico automaticamente" },
  { min:15, max:999,nome:"de Ferrão",   efeito:"Ao ser atingido em C.a.C.: atacante sofre 2d4 Físico automaticamente" },
];
const SUF_MOV = [
  { min:1,  max:14, nome:"do Passo",       efeito:"Corre o dobro com ◈ de movimento" },
  { min:15, max:19, nome:"da Velocidade",  efeito:"Corre o dobro com ◈ e não pode ser surpreendido" },
  { min:20, max:999,nome:"da Aceleração",  efeito:"Corre o triplo com ◈ e não pode ser surpreendido" },
];
const SUF_HP = [
  { min:1,  max:8,  nome:"do Chacal",  efeito:"+4 HP Temporários"  },
  { min:9,  max:13, nome:"da Raposa",  efeito:"+6 HP Temporários"  },
  { min:14, max:17, nome:"do Jaguar",  efeito:"+8 HP Temporários"  },
  { min:18, max:21, nome:"do Lobo",    efeito:"+10 HP Temporários" },
  { min:22, max:23, nome:"da Águia",   efeito:"+12 HP Temporários" },
  { min:24, max:25, nome:"do Tigre",   efeito:"+15 HP Temporários" },
  { min:26, max:27, nome:"do Leão",    efeito:"+18 HP Temporários" },
  { min:28, max:29, nome:"do Mamute",  efeito:"+20 HP Temporários" },
  { min:30, max:31, nome:"da Baleia",  efeito:"+25 HP Temporários" },
  { min:32, max:999,nome:"do Colosso", efeito:"+30 HP Temporários" },
];
const SUF_REC = [
  { min:1,  max:10, nome:"da Regeneração", efeito:"Cura 1 HP por turno (só consciente)" },
  { min:11, max:999,nome:"da Renovação",   efeito:"Recupera 1 ponto de atributo perdido por turno" },
];
const SUF_DIARIO = [
  { min:1,  max:10, nome:"da Poupança",     efeito:"1×/dia: use habilidade sem gastar Mana" },
  { min:11, max:25, nome:"da Negociação",   efeito:"2×/dia: use habilidade sem gastar Mana" },
  { min:25, max:35, nome:"da Osmose",       efeito:"1×/dia: use habilidade sem gastar ações ou Mana" },
  { min:36, max:999,nome:"da Transcendência",efeito:"2×/dia: use habilidade sem gastar ações ou Mana" },
];
const SUF_DANO = [
  { min:64, max:65, nome:"do Gelo",       efeito:"+1d6 dano de Gelo"      },
  { min:66, max:67, nome:"do Fogo",       efeito:"+1d6 dano de Fogo"      },
  { min:68, max:69, nome:"da Eletricidade",efeito:"+1d6 dano de Relâmpago"},
  { min:70, max:71, nome:"do Veneno",     efeito:"+1d6 dano de Veneno"    },
  { min:72, max:73, nome:"da Radiância",  efeito:"+1d6 dano Radiante"     },
  { min:74, max:75, nome:"da Necromancia",efeito:"+1d6 dano Necrótico"    },
  { min:76, max:77, nome:"da Psique",     efeito:"+1d6 dano Psíquico"     },
  { min:78, max:80, nome:"da Força",      efeito:"+1d6 dano de Força"     },
];
const SUF_RUNA = [
  { min:81, max:81,  nome:"Sede de Sangue (Amn)", efeito:"Cura 1d4 PV ao causar crítico ou matar inimigo" },
  { min:82, max:82,  nome:"Rapidez (Shael)",       efeito:"Reduz custo de ações/reações em 1 Mana" },
  { min:83, max:83,  nome:"Exorcismo (Pul)",        efeito:"+1 dado de dano contra Demônios e Mortos-Vivos" },
  { min:84, max:84,  nome:"Laceração (Um)",         efeito:"Alvo sangra: 1d4 PV/rodada até ser curado" },
  { min:85, max:85,  nome:"Veredito (Mal)",         efeito:"Impede cura mágica do alvo por 3 rodadas" },
  { min:86, max:86,  nome:"Fortuna (Ist)",          efeito:"+10% chance de itens raros em saques" },
  { min:87, max:87,  nome:"Precisão (Gul)",         efeito:"+1d4 em todas as jogadas de ataque" },
  { min:88, max:88,  nome:"Sifão de Éter (Vex)",    efeito:"Ao causar dano, 1d6 — em 5+ recupere 1 Mana" },
  { min:89, max:89,  nome:"Poder Bruto (Ohm)",      efeito:"+5 dano fixo em todos os ataques" },
  { min:90, max:90,  nome:"Golpe Mortal (Lo)",      efeito:"Em 19 natural: chance de dano dobrado" },
  { min:91, max:91,  nome:"Aflição (Sur)",          efeito:"Alvos atingidos: CON DC 12 ou Cegos por 1 rodada" },
  { min:92, max:92,  nome:"Esmagamento (Ber)",      efeito:"Reduz CA do alvo em 2 até o fim do combate" },
  { min:93, max:93,  nome:"Aniquilação (Jah)",      efeito:"Ignora bônus de escudo e armadura natural" },
  { min:94, max:94,  nome:"Gelo Eterno (Cham)",     efeito:"Alvo Imobilizado por 1 rodada; você imune a Lentidão" },
  { min:95, max:100, nome:"Eternidade (Zod)",       efeito:"Item indestrutível + Sucesso Crítico automático 1×/sessão" },
];

// CA por peça (bônus sobre a CA base do tipo)
const PECA_CA = {
  "Couro":          { Peitoral:2, Perneiras:1, Elmo:0, Luvas:0, Botas:0 },
  "Couro Reforçado":{ Peitoral:2, Perneiras:1, Elmo:1, Luvas:0, Botas:0 },
  "Brunea":         { Peitoral:2, Perneiras:2, Elmo:1, Luvas:0, Botas:0 },
  "Cota de Malha":  { Peitoral:2, Perneiras:2, Elmo:1, Luvas:1, Botas:0 },
  "Meia-Placa":     { Peitoral:3, Perneiras:2, Elmo:1, Luvas:1, Botas:0 },
  "Placa Completa": { Peitoral:3, Perneiras:2, Elmo:1, Luvas:1, Botas:1 },
};
function caBase(tipo) {
  if (tipo === "Leve")  return "10 + DES";
  if (tipo === "Média") return "10 + DES (máx +2)";
  return "10";
}

// ===================== FUNÇÕES =====================

function step(txt) {
  return `<div class="roll-step">${txt}</div>`;
}

// Mapas para nomes-título de prefixos que precisam de forma curta
const PERICIAS_TITULO = {
  FOR: "Poderoso", DES: "Veloz", CON: "Resiliente",
  INT: "Astuto",   SAB: "Perspicaz", CAR: "Eloquente"
};
const RESIST_TITULO = {
  "Gemas Básicas": "Engastado",
  "Gemas Raras":   "Cravejado",
  "Topázio":       "Topázio",
  "Prismático":    "Prismático",
};

function prefixo(nd, noCaprichoso = false) {
  const cat = d(100);
  let nome, titulo, efeito, catNome, subRoll;

  if (cat <= 20) {
    catNome = "Melhoria de Armadura";
    subRoll = d(20) + nd;
    const r = lookup(PREF_ARMADURA, subRoll);
    nome = r.nome; efeito = r.efeito;
  } else if (cat <= 35) {
    catNome = "Melhoria de Resistências";
    subRoll = d(20) + nd;
    const r = lookup(PREF_RESIST, subRoll);
    nome = r.nome; efeito = r.efeito;
    titulo = RESIST_TITULO[nome] || nome;
  } else if (cat <= 39) {
    catNome = "Efeitos no Inimigo";
    subRoll = d(20) + nd;
    const r = lookup(PREF_INIMIGO, subRoll);
    nome = r.nome; efeito = r.efeito;
  } else if (cat <= 54) {
    catNome = "Utilidades e Maldições";
    if (cat === 40) {
      nome = "Exaustão"; efeito = "Descanso curto em metade do tempo + Imunidade a Exaustão";
    } else if (cat <= 45) {
      const r = d(6);
      const atr = ATRIBUTOS[r-1];
      nome = `Perícia (${atr})`; efeito = `+2 em testes de ${atr}`;
      titulo = PERICIAS_TITULO[atr];
    } else if (cat <= 49) {
      const r = d(8) - 1;
      const maldição = MALDIÇÕES[r];
      nome = "Amaldiçoado"; efeito = maldição;
      titulo = maldição.split(":")[0]; // ex: "Enferrujado", "Vulnerável"
    } else if (cat === 50) {
      if (noCaprichoso) return prefixo(nd, true);
      nome = "Caprichoso"; efeito = "Role 2× na tabela de prefixos e aplique ambos";
    } else {
      const r = d(6) - 1;
      const vis = VISIBILIDADES[r];
      nome = "Visibilidade"; efeito = vis;
      titulo = vis.split(":")[0]; // ex: "Brilhante", "Oracular", "Sorrateiro"
    }
    subRoll = cat;
  } else if (cat <= 60) {
    catNome = "Fluxo de Mana";
    subRoll = d(20) + nd;
    const r = lookup(PREF_MANA, subRoll);
    nome = r.nome; efeito = r.efeito;
  } else {
    catNome = "Atributos e Combate";
    subRoll = cat;
    if (cat <= 70) { nome = "Titânico";  efeito = "+3 em um Atributo à sua escolha"; }
    else if (cat <= 77) { nome = "Preciso"; efeito = "+3 nos testes de Ataque"; }
    else if (cat <= 89) { nome = "Brutal";  efeito = "+3 no Dano; expande range de crítico em 1 (mín. 19-20)"; }
    else { nome = "Imparável"; efeito = "+3 Ataque, +3 Dano; expande range de crítico em 1 (mín. 19-20)"; }
  }

  if (!titulo) titulo = nome;
  return {
    log: step(`<span class="dice">🎲 Prefixo d100 = ${cat}</span> → <b>${catNome}</b>: <b>${nome}</b>`),
    nome, titulo, efeito
  };
}

function sufixo(nd) {
  const cat = d(100);
  let nome, titulo, efeito, catNome, subRoll;

  if (cat <= 20) {
    catNome = "Redução de Dano"; subRoll = d(20) + nd;
    const r = lookup(SUF_RD, subRoll); nome = r.nome; efeito = r.efeito;
  } else if (cat <= 27) {
    catNome = "Reação Quando Atacado"; subRoll = d(20) + nd;
    const r = lookup(SUF_REACAO, subRoll); nome = r.nome; efeito = r.efeito;
  } else if (cat <= 32) {
    catNome = "Efeitos de Movimento"; subRoll = d(20) + nd;
    const r = lookup(SUF_MOV, subRoll); nome = r.nome; efeito = r.efeito;
  } else if (cat <= 40) {
    catNome = "Aumento de HP"; subRoll = d(20) + nd;
    const r = lookup(SUF_HP, subRoll); nome = r.nome; efeito = r.efeito;
  } else if (cat <= 52) {
    catNome = "Recuperação"; subRoll = d(20);
    const r = lookup(SUF_REC, subRoll); nome = r.nome; efeito = r.efeito;
  } else if (cat <= 63) {
    catNome = "Preparação Diária"; subRoll = d(20) + nd;
    const r = lookup(SUF_DIARIO, subRoll); nome = r.nome; efeito = r.efeito;
  } else if (cat <= 80) {
    catNome = "Dano Extra"; subRoll = cat;
    const r = lookup(SUF_DANO, subRoll); nome = r.nome; efeito = r.efeito;
  } else {
    catNome = "Efeito de Runa"; subRoll = cat;
    const r = lookup(SUF_RUNA, subRoll); nome = r.nome; efeito = r.efeito;
    // Runas: usar "de [Palavra]" como título (ex: "de Amn", "de Zod")
    const rune = r.nome.match(/\((\w+)\)/)?.[1];
    titulo = rune ? `de ${rune}` : r.nome;
  }

  if (!titulo) titulo = nome;
  return {
    log: step(`<span class="dice">🎲 Sufixo d100 = ${cat}</span> → <b>${catNome}</b>: <b>${nome}</b>`),
    nome, titulo, efeito
  };
}

function afixos(qual, nd, logs) {
  let pref = qual.pref, suf = qual.suf;
  // Mágico: Prefixo OU Sufixo (50%)
  if (qual.magOu) { if (Math.random() < 0.5) { pref = 0; suf = 1; } else { pref = 1; suf = 0; } }

  const prefTitulos = [], sufTitulos = [];
  const htmlParts = [];
  const afixosData = [];

  for (let i = 0; i < pref; i++) {
    const p = (i === 0 && window._forceCaprichoso) ? { log: step(`<span class="dice">🎲 Prefixo d100 = 50</span> → <b>Utilidades e Maldições</b>: <b>Caprichoso</b>`), nome:"Caprichoso", titulo:"Caprichoso", efeito:"Role 2× na tabela de prefixos e aplique ambos" } : prefixo(nd);
    logs.push(p.log);
    htmlParts.push(`<div class="afixo"><span class="afixo-tipo">Prefixo</span> <b>${p.nome}</b> — ${p.efeito}</div>`);
    if (p.nome === "Caprichoso") {
      // Caprichoso não entra no nome do item — só os prefixos que ele gera
      logs.push(step(`<span style="color:#aaa;">↩ Caprichoso — rolando 2 prefixos bônus automaticamente:</span>`));
      for (let c = 0; c < 2; c++) {
        const extra = prefixo(nd, true);
        logs.push(extra.log);
        prefTitulos.push(extra.titulo);
        htmlParts.push(`<div class="afixo"><span class="afixo-tipo">Prefixo ✦</span> <b>${extra.nome}</b> — ${extra.efeito}</div>`);
        afixosData.push({ tipo: 'Prefixo', nome: extra.nome, efeito: extra.efeito });
      }
    } else {
      prefTitulos.push(p.titulo);
      afixosData.push({ tipo: 'Prefixo', nome: p.nome, efeito: p.efeito });
    }
  }
  for (let i = 0; i < suf; i++) {
    const s = sufixo(nd);
    logs.push(s.log);
    sufTitulos.push(s.titulo);
    htmlParts.push(`<div class="afixo"><span class="afixo-tipo">Sufixo</span> <b>${s.nome}</b> — ${s.efeito}</div>`);
    afixosData.push({ tipo: 'Sufixo', nome: s.nome, efeito: s.efeito });
  }

  return { html: htmlParts.join(""), prefTitulos, sufTitulos, afixosData };
}

window.rolarTesouro = function(opts = {}) {
  const nd = Math.max(1, Math.min(10, parseInt(document.getElementById('nd-input').value) || 1));
  const logs = [];
  let finalHtml = "";

  // Modo de teste: força cenários específicos
  if (opts.forceSet) {
    logs.push(step(`<span style="color:#3a8f3a;">🧪 MODO TESTE — forçando Set Completo</span>`));
  }
  if (opts.forceCaprichoso) {
    logs.push(step(`<span style="color:#3a8f3a;">🧪 MODO TESTE — forçando Caprichoso</span>`));
  }

  // forceCategoria: pula o d20 base e cai direto na categoria
  let base;
  if (opts.forceCategoria === 'ouro')  { base = 12; logs.push(step(`<span style="color:#f0c040;">💰 Categoria forçada: Ouro</span>`)); }
  else if (opts.forceCategoria === 'pocao') { base = 8; logs.push(step(`<span style="color:#4a9edd;">🧪 Categoria forçada: Poção</span>`)); }
  else if (opts.forceCategoria === 'equip') { base = 20; logs.push(step(`<span style="color:#ff8c00;">⚔️ Categoria forçada: Equipamento</span>`)); }
  else if (opts.forceCategoria === 'joia')  { base = 20; opts._forceJoia = true; logs.push(step(`<span style="color:#4ae54a;">💍 Categoria forçada: Joia/Especial</span>`)); }
  else { base = opts.forceSet || opts.forceCaprichoso ? 20 : d(20); }

  if (!opts.forceCategoria) logs.push(step(`<span class="dice">🎲 Tesouro Base d20 = ${base}</span>`));

  if (base <= 6) {
    finalHtml = `<div>💀 <b>Nada</b> — apenas poeira e ossos.</div>`;

  } else if (base <= 10) {
    const tipo = base <= 8 ? "Vida" : "Mana";
    const pr = d(20) + nd;
    logs.push(step(`<span class="dice">🎲 Poção d20+${nd} = ${pr}</span>`));
    let desc;
    if (pr <= 10)      desc = tipo === "Vida" ? "Normal — cura 1d4 PV" : "Normal — recupera 1d4 Mana";
    else if (pr <= 20) desc = tipo === "Vida" ? "Forte — cura 2d4 PV"  : "Forte — recupera 2d4 Mana";
    else if (pr <= 30) desc = tipo === "Vida" ? "Grande — cura 3d4 PV" : "Grande — recupera 3d4 Mana";
    else               desc = tipo === "Vida" ? "Superior — cura tudo" : "Superior — recupera 4d4 Mana + Vantagem";
    finalHtml = `<div>🧪 <b>Poção de ${tipo}</b> — ${desc}</div>`;

  } else if (base <= 16) {
    const dr = d(10);
    const total = nd * dr;
    logs.push(step(`<span class="dice">🎲 Ouro d10 = ${dr}</span> (Nível ${nd} × ${dr})`));
    finalHtml = `<div>💰 <b>${total} moedas de ouro</b></div>`;

  } else {
    const dr = opts.forceSet || opts.forceCaprichoso ? 20 : opts._forceJoia ? (89 + d(12) - 1) : d(100);
    logs.push(step(`<span class="dice">🎲 Equipamento d100 = ${dr}</span>`));

    let nomeBase = "", infoItem = "", qual, setHandled = false;

    if (dr <= 39) {
      const arm = lookup(ARMADURAS, dr);
      nomeBase = arm.nome;
      // forceSet: força qualidade de Set Raro (qr=29); forceCaprichoso: força Mágica normal
      const qr = opts.forceSet ? 29 : (d(20) + nd);
      logs.push(step(`<span class="dice">🎲 Qualidade Armadura d20+${nd} = ${qr}</span>`));
      qual = lookup(QUAL_ARMADURA, qr);

      if (arm.tipo === "Escudo") {
        infoItem = `Escudo · ${arm.ca} CA`;
      } else if (!qual.set) {
        const pr = d(6);
        const peca = PECAS[pr - 1];
        logs.push(step(`<span class="dice">🎲 Peça d6 = ${pr}</span> → ${peca}`));
        if (peca === "Mestre escolhe") {
          infoItem = `${arm.tipo} · CA base: ${caBase(arm.tipo)} · CA completa: ${arm.ca} — Mestre escolhe a peça`;
        } else if (peca === "Peitoral") {
          const bonus = PECA_CA[arm.nome]?.Peitoral ?? 0;
          infoItem = `${arm.tipo} · CA base: ${caBase(arm.tipo)} · CA completa: ${arm.ca} — Peitoral (+${bonus})`;
        } else {
          const bonus = PECA_CA[arm.nome]?.[peca] ?? 0;
          infoItem = `${arm.tipo} — ${peca} (${bonus > 0 ? `+${bonus}` : "sem bônus"})`;
        }
      } else {
        // Set completo — rola cada peça individualmente
        const pecasDoSet = ["Peitoral", "Perneiras", "Elmo", "Luvas", "Botas"];
        const qualIndiv = { q: qual.q.replace(' (Set)', ''), css: qual.css, pref: qual.pref, suf: qual.suf };
        let setHtml = `<div style="font-size:0.85rem;color:var(--md-default-fg-color--light);margin-bottom:0.5rem;">🎒 <b>Set completo de ${arm.nome}</b> — peças roladas individualmente</div>`;
        for (const peca of pecasDoSet) {
          const { html: afixoP, prefTitulos: ptP, sufTitulos: stP } = afixos(qualIndiv, nd, logs);
          const bonus = PECA_CA[arm.nome]?.[peca] ?? 0;
          const pecaInfo = peca === "Peitoral"
            ? `${arm.tipo} · CA base: ${caBase(arm.tipo)} · CA completa: ${arm.ca} — Peitoral (+${bonus})`
            : `${arm.tipo} — ${peca} (${bonus > 0 ? `+${bonus}` : "sem bônus"})`;
          const nomeP = [...ptP, arm.nome, ...stP].join(" ");
          setHtml += `<div style="margin-top:0.6rem;padding-top:0.6rem;border-top:1px solid var(--md-default-fg-color--lightest);">
            <div style="font-size:0.72rem;text-transform:uppercase;letter-spacing:0.05em;" class="${qualIndiv.css}">${qualIndiv.q}</div>
            <div style="font-size:1rem;font-weight:bold;" class="${qualIndiv.css}">${nomeP}</div>
            <div style="font-size:0.82rem;color:var(--md-default-fg-color--light);">${pecaInfo}</div>
            ${afixoP}</div>`;
        }
        finalHtml = `<div>🗡️ <span class="${qual.css}" style="font-size:0.8rem;text-transform:uppercase;letter-spacing:0.05em;">${qual.q}</span>${setHtml}</div>`;
        setHandled = true;
      }

    } else if (dr <= 75) {
      const arma = lookup(ARMAS_CC, dr);
      nomeBase = arma.nome;
      infoItem = arma.dano;
      const qr = d(20) + nd;
      logs.push(step(`<span class="dice">🎲 Qualidade d20+${nd} = ${qr}</span>`));
      qual = lookup(QUAL_GERAL, qr);

    } else if (dr <= 88) {
      const arma = lookup(ARMAS_DIST, dr);
      nomeBase = arma.nome;
      infoItem = arma.info;
      const qr = d(20) + nd;
      logs.push(step(`<span class="dice">🎲 Qualidade d20+${nd} = ${qr}</span>`));
      qual = lookup(QUAL_GERAL, qr);

    } else {
      const joia = lookup(JOIAS, dr);
      if (joia.especial) {
        const esp = ESPECIAIS[Math.floor(Math.random() * ESPECIAIS.length)];
        nomeBase = esp.item;
        infoItem = `<span class="afixo-tipo">⭐ slot especial</span> ${esp.classe}`
                 + `<div class="afixo"><span class="afixo-tipo">Efeito base</span> ${esp.efeito}</div>`;
        logs.push(step(`⭐ <b>Especial de Classe: ${esp.classe}</b>`));
      } else {
        nomeBase = joia.nome;
        infoItem = joia.slot;
      }
      const qr = d(20) + nd;
      logs.push(step(`<span class="dice">🎲 Qualidade d20+${nd} = ${qr}</span>`));
      qual = lookup(QUAL_GERAL, qr);
    }

    if (!setHandled) {
      // forceCaprichoso: injeta cat=50 na primeira rolagem de prefixo
      if (opts.forceCaprichoso && qual && qual.pref === 0) qual = { ...qual, pref: 1, suf: 0 };
      if (opts.forceCaprichoso) window._forceCaprichoso = true;
      const { html: afixoHtml, prefTitulos, sufTitulos, afixosData } = qual
        ? afixos(qual, nd, logs)
        : { html: "", prefTitulos: [], sufTitulos: [], afixosData: [] };
      window._forceCaprichoso = false;

      const css   = qual ? qual.css : "q-normal";
      const qNome = qual ? qual.q   : "Normal";

      const partes = [...prefTitulos, nomeBase, ...sufTitulos];
      const nomeCompleto = partes.join(" ");

      const infoHtml = infoItem
        ? `<div style="font-size:0.85rem;color:var(--md-default-fg-color--light);margin-top:0.15rem;">${infoItem}</div>`
        : "";

      // Detectar slot do item
      const pecaToSlot = { 'Peitoral':'peito', 'Elmo':'elmo', 'Luvas':'luvas', 'Perneiras':'perneiras', 'Botas':'botas' };
      let slotTipo = 'arma';
      if (dr <= 39) {
        const pecaMatch = infoItem.match && infoItem.match(/— (Peitoral|Elmo|Luvas|Perneiras|Botas)/);
        slotTipo = pecaToSlot[pecaMatch && pecaMatch[1]] || 'peito';
      } else if (dr <= 88) { slotTipo = 'arma'; }
      else if (dr <= 91) { slotTipo = 'anel'; }
      else if (dr <= 94) { slotTipo = 'amuleto'; }
      else if (dr <= 96) { slotTipo = 'cinto'; }
      else { slotTipo = 'especial'; }

      // Pré-computar bônus estruturados a partir dos afixos
      const bonusCalc = { bonusCA:0, bonusATK:0, bonusDano:0, bonusRDFisico:0, bonusRDTodos:0, bonusManaMax:0 };
      afixosData.forEach(function(a) {
        const e = a.efeito;
        let m;
        m = e.match(/\+(\d+) de CA/);              if (m) bonusCalc.bonusCA      += parseInt(m[1]);
        m = e.match(/\+3 Ataque[,;]? \+3 Dano/);  if (m) { bonusCalc.bonusATK += 3; bonusCalc.bonusDano += 3; }
        else {
          m = e.match(/\+3 nos testes de Ataque/); if (m) bonusCalc.bonusATK += 3;
          m = e.match(/\+(\d+) no Dano/);          if (m) bonusCalc.bonusDano  += parseInt(m[1]);
        }
        m = e.match(/\+(\d+) RD em TODOS/);        if (m) bonusCalc.bonusRDTodos += parseInt(m[1]);
        m = e.match(/Mana máximo \+(\d+)/);        if (m) bonusCalc.bonusManaMax += parseInt(m[1]);
      });

      const nomeAfixoStr = afixosData.map(a => a.titulo || a.nome).join(' / ');

      window._itemAtual = {
        nome: nomeCompleto,
        slotTipo: slotTipo,
        tipoArmadura: dr <= 39 ? nomeBase : null,
        qualidade: qNome,
        infoBase: typeof infoItem === 'string' ? infoItem.replace(/<[^>]+>/g,'').trim() : '',
        nomeAfixo: nomeAfixoStr,
        bonusCA:       bonusCalc.bonusCA,
        bonusATK:      bonusCalc.bonusATK,
        bonusDano:     bonusCalc.bonusDano,
        bonusRDFisico: bonusCalc.bonusRDFisico,
        bonusRDTodos:  bonusCalc.bonusRDTodos,
        bonusManaMax:  bonusCalc.bonusManaMax
      };

      finalHtml = `
        <div>
          🗡️ <span class="${css}" style="font-size:0.8rem;text-transform:uppercase;letter-spacing:0.05em;">${qNome}</span>
          <div style="font-size:1.15rem;font-weight:bold;margin-top:0.2rem;" class="${css}">${nomeCompleto}</div>
          ${infoHtml}
          ${afixoHtml}
        </div>`;
    } else {
      window._itemAtual = null;
    }
  }

  const salvarBtn = window._itemAtual
    ? `<div class="salvar-item-row" id="salvar-row">
        <button onclick="window.prepararSalvar()" class="roll-btn" style="font-size:0.85rem;padding:5px 14px;background:#27ae60;">💾 Salvar no Personagem</button>
      </div>`
    : '';

  document.getElementById('resultado-tesouro').innerHTML = `
    <div class="result-card">
      <div>${logs.join("")}</div>
      <div class="final-result">${finalHtml}</div>
      ${salvarBtn}
    </div>
  `;
};

window.limparTesouro = function() {
  document.getElementById("resultado-tesouro").innerHTML = "";
  window._itemAtual = null;
};

function salvarEmPersonagem(id) {
  if (!window._itemAtual) return;
  let personagens;
  try { personagens = JSON.parse(localStorage.getItem('diablo-rpg-fichas') || '[]'); }
  catch(e) { personagens = []; }
  const idx = personagens.findIndex(function(p) { return p.id === id; });
  if (idx < 0) { alert('Personagem não encontrado.'); return; }
  if (!personagens[idx].items) personagens[idx].items = [];

  const item = Object.assign({}, window._itemAtual);
  item.id = Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
  item.equipadoEm = null;
  personagens[idx].items.push(item);
  localStorage.setItem('diablo-rpg-fichas', JSON.stringify(personagens));

  window._itemAtual = null;
  const row = document.getElementById('salvar-row');
  if (row) row.innerHTML = `<span style="color:#27ae60;font-weight:bold">✓ Salvo em ${personagens[idx].nome || 'Sem nome'}!</span>`;
}

window.prepararSalvar = function() {
  if (!window._itemAtual) return;
  let personagens;
  try { personagens = JSON.parse(localStorage.getItem('diablo-rpg-fichas') || '[]'); }
  catch(e) { personagens = []; }

  if (personagens.length === 0) {
    alert('Nenhum personagem encontrado. Crie um personagem na página de Fichas primeiro.');
    return;
  }
  if (personagens.length === 1) {
    salvarEmPersonagem(personagens[0].id);
    return;
  }

  const opts = personagens.map(function(p) {
    return '<option value="' + p.id + '">' + (p.nome || 'Sem nome') + ' — ' + (p.classe || '') + ' Nv ' + (p.nivel || 1) + '</option>';
  }).join('');
  const row = document.getElementById('salvar-row');
  if (!row) return;
  row.innerHTML =
    '<span style="font-size:0.82rem;color:#888;margin-right:6px">Adicionar a qual personagem?</span>' +
    '<select id="sel-personagem-rolador" style="padding:5px 8px;background:#1a1a1a;border:1px solid #444;border-radius:4px;color:#eee;font-family:inherit">' + opts + '</select>' +
    ' <button onclick="window.confirmarSalvarRolador()" class="roll-btn" style="font-size:0.85rem;padding:5px 14px;background:#27ae60;">✔ Confirmar</button>' +
    ' <button onclick="window.cancelarSalvarRolador()" class="roll-btn roll-btn-sec" style="font-size:0.85rem;padding:5px 10px;">Cancelar</button>';
};

window.confirmarSalvarRolador = function() {
  const sel = document.getElementById('sel-personagem-rolador');
  if (sel) salvarEmPersonagem(sel.value);
};

window.cancelarSalvarRolador = function() {
  const row = document.getElementById('salvar-row');
  if (row) row.innerHTML = '<button onclick="window.prepararSalvar()" class="roll-btn" style="font-size:0.85rem;padding:5px 14px;background:#27ae60;">💾 Salvar no Personagem</button>';
};

})();
</script>
