// Dados das 18 classes — Diablo RPG

const CLASSES = [
  {
    id: "amazona",
    nome: "Amazona",
    dv: 8,
    armaduras: ["Leve", "Média"],
    armas: ["Leve", "Média", "Pesada"],
    atribPrimario: ["DES", "FOR"],
    habilidades: [
      "Mestra de Armas das Ilhas: +1 em ataques e dano com armas de haste e arcos.",
      "Polivalente: Pode usar DES no lugar de FOR (e vice-versa) em ataques e dano."
    ],
    talentos: [
      { roll: "1-2",  text: "+2 de Força ou +2 de Destreza." },
      { roll: "3-4",  text: "+1 para ataques à distância ou corpo a corpo." },
      { roll: "5",    text: "Esquiva (Passiva): Enquanto não usar armadura pesada, ganhe +1 CA. Se você se mover antes de atacar no mesmo turno, ganhe +1 CA adicional até o início do seu próximo turno." },
      { roll: "6",    text: "Visão Interior (Passiva): +2 em testes de Percepção. Você nunca é surpreendida — mesmo em emboscadas, age normalmente no primeiro turno." },
      { roll: "7",    text: "Golpe Crítico (Passiva): Seus ataques críticos agora acontecem com 19-20 natural." },
      { roll: "8",    text: "Penetração (⟁ + 1 Mana): Seu próximo ataque reduz a CA do alvo em 3. Ignora também bônus de escudos e coberturas." },
      { roll: "9",    text: "Evasão (⟁ + 2 Mana): Você ignora completamente o dano de uma armadilha ou habilidade de área (explosões, rajadas, magias de cone ou círculo)." },
      { roll: "10",   text: "Flecha de Fogo (◈ + 1 Mana): Adicione +1d6 de dano de Fogo a um ataque de arco. Gaste +1 Mana para cada dado extra." },
      { roll: "11",   text: "Flecha de Gelo (◈ + 2 Mana): Adicione +1d6 de dano de Gelo a um ataque de arco. O alvo fica Congelado por 1 rodada. Gaste +2 Mana para cada dado extra." },
      { roll: "12",   text: "Flecha Guia (⟁ + 2 Mana): Transforme um erro em um acerto automático (causa dano normal da arma)." },
      { roll: "13",   text: "Flechas Múltiplas (◈ + 1 Mana por alvo): Ataque múltiplos alvos Próximo entre si com uma única rolagem de ataque." },
      { roll: "14",   text: "Jab (◈ + 2 Mana): Se usar uma arma de haste, faça 3 golpes rápidos em um único alvo. Cada golpe causa 1d6 de dano Físico (sem modificador de atributo)." },
      { roll: "15",   text: "Azagaia de Veneno (◈ + 1 Mana): Sua azagaia arremessada deixa uma nuvem. Alvos na área sofrem 1d4 de dano de Veneno por 3 rodadas. Gaste +1 Mana para cada dado extra." },
      { roll: "16",   text: "Fúria dos Raios (◈ + 2 Mana): Sua lança arremessada explode em raios, causando 2d6 de dano de Relâmpago em área. Gaste +2 Mana para cada dado extra." },
      { roll: "17",   text: "Isca (◈◈ + 1 Mana): Cria uma cópia ilusória sua. Inimigos devem passar em Salvaguarda de SAB (DC 10 + Mod. Primário) para atacar você em vez da cópia. Dura até ser atingida ou fim da cena." },
      { roll: "18",   text: "Esquiva Ativa (⟁ + 2 Mana): Reduza o dano de um ataque recebido em 1d10 + Nível. Gaste +2 Mana para cada dado extra." },
      { roll: "19",   text: "Valkíria (◈◈◈ + 6 Mana): Uma vez por cena, invoca uma guerreira etérea por 1d4 rodadas. Como ação livre ◇, ela ataca um alvo Próximo. Se atacar o mesmo alvo que você, ambas têm Vantagem. CA = sua · HP = Nível × 3 · Dano: 1d8 + Mod. Primário Físico" },
      { roll: "20",   text: "Escolha qualquer talento desta lista que você ainda não possua." }
    ]
  },
  {
    id: "arcanista",
    nome: "Arcanista",
    dv: 4,
    armaduras: ["Leve"],
    armas: ["Leve"],
    atribPrimario: ["INT"],
    habilidades: [
      "Dínamo Arcano (Passiva): Sempre que passar num teste de conjuração, ganhe 1 Carga Arcana (máx: Mod. INT). Gaste cargas como ◇ para aumentar o dano de feitiços (+2 por carga).",
      "Mente Protegida (Passiva): Pode usar INT em vez de DES para calcular CA enquanto não usar armadura.",
      "Feitiço Básico: Role 1d6 para definir seu feitiço inicial."
    ],
    talentos: [
      { roll: "1-2",  text: "+2 de Inteligência ou +2 de Destreza." },
      { roll: "3-4",  text: "+1 em testes de conjuração ou +1 na CA." },
      { roll: "5",    text: "Explosão de Energia (⟁ + 1 Mana): Quando sofrer dano, cause 1d6 de dano Arcano e empurre o inimigo para Próximo. Gaste +1 Mana para cada dado extra." },
      { roll: "6",    text: "Teleporte (◈ + 1 Mana ou ◈ + 2 Mana por aliado): Como movimento, teleporte-se para um lugar Próximo. Alternativamente, teleporte a você e um aliado Próximo." },
      { roll: "7",    text: "Lente Arcana (Passiva): Suas magias têm o dobro de alcance." },
      { roll: "8",    text: "Torrente Arcana (Passiva): Seus projéteis mágicos causam +1d4 de dano Arcano extra se você não se moveu neste turno." },
      { roll: "9",    text: "Distorção Temporal (Feitiço)(◈◈ + 4 Mana): Crie uma zona de lentidão Próximo por 1 rodada. Dentro dela: projéteis param no ar, todas as criaturas têm metade do movimento e só podem fazer 1 ◈ por turno. Gaste +4 Mana para cada rodada extra." },
      { roll: "10",   text: "Mísseis Arcanos (Feitiço)(◈ + 1 Mana): Três dardos que acertam um ou mais alvos causando 1d4 de dano Arcano. Gaste +1 Mana para cada dardo extra." },
      { roll: "11",   text: "Escudo de Diamante (⟁ + 3 Mana): Anule completamente o dano de um único ataque recebido." },
      { roll: "12",   text: "Desintegrar (Feitiço)(◈ + 1 Mana por rodada): Canalize um raio que causa 1d10 de dano Arcano. A cada rodada de concentração (◈ + 1 Mana), o dano aumenta em +1d10. Criaturas mortas por esse feitiço viram pó." },
      { roll: "13",   text: "Ilusionismo (⟁ + 2 Mana): Quando sofrer dano, cria 2 duplicatas (inimigos têm 50% de chance de errar). As duplicatas duram 1d4 rodadas." },
      { roll: "14",   text: "Buraco Negro (Feitiço)(◈◈ + 2 Mana): Puxe todas as criaturas Próximo de um ponto para o centro e cause 2d8 de dano Arcano. Gaste +2 Mana para cada dado extra." },
      { roll: "15",   text: "Anomalia Instável (⟁ + 2 Mana): Se cair para 0 HP, explode em energia (2d6 dano Arcano adjacente) e fica com 1 HP. Gaste +2 Mana para cada dado extra." },
      { roll: "16",   text: "Espada Espectral (Feitiço)(◈◈ + 2 Mana): Uma lâmina espectral varre um arco à frente. Todos os inimigos adjacentes a um ponto Próximo sofrem 2d6 de dano Arcano, Fogo, Gelo ou Relâmpago (escolha ao usar). Gaste +2 Mana para cada dado extra." },
      { roll: "17",   text: "Arconte (◈◈ + 5 Mana): Transforme-se em energia pura (Vantagem em todos os testes de feitiços e +5 de dano em todos os feitiços) por 1d4 rodadas." },
      { roll: "18",   text: "Fluxo Temporal (◈◈ + 5 Mana): Você e aliados Próximo podem usar uma ◈ extra por turno durante 1d4 rodadas." },
      { roll: "19",   text: "Meteoro (Feitiço)(◈◈◈ + 3 Mana): Marque um local visível. No início do seu próximo turno, um meteoro cai e causa 4d10 de dano Arcano a todas as criaturas Próximo do ponto marcado. Gaste +5 Mana para chamar um segundo meteoro (máx. 2)." },
      { roll: "20",   text: "Escolha qualquer talento desta lista que você ainda não possua." }
    ]
  },
  {
    id: "assassina",
    nome: "Assassina",
    dv: 8,
    armaduras: ["Leve", "Média"],
    armas: ["Leve", "Média"],
    atribPrimario: ["DES"],
    habilidades: [
      "Garras Gêmeas: Se empunhando duas garras ou adagas, role o dano duas vezes e escolha o melhor resultado.",
      "Cargas de Combo: Ao acertar um ataque, acumule 1 Carga (máx. 3). Cada Carga reduz em 1 o custo de Mana do próximo Finalizador usado."
    ],
    talentos: [
      { roll: "1-2",  text: "+2 de Destreza ou +2 de Força." },
      { roll: "3-4",  text: "+1 para ataques com Garras ou +1 na CA." },
      { roll: "5",    text: "Punhos de Fogo (◇ Finalizador + 2 Mana): Seu próximo ataque causa +2d6 de dano de Fogo." },
      { roll: "6",    text: "Garras de Gelo (◇ Finalizador + 2 Mana): Seu próximo ataque congela o alvo por 1 rodada." },
      { roll: "7",    text: "Golpe do Tigre (◇ Finalizador + 3 Mana): Seu próximo ataque causa dano máximo automático." },
      { roll: "8",    text: "Chute do Dragão (Finalizador)(◈◈ + 1 Mana por chute): Faça até 3 chutes, cada um arremessando um inimigo Adjacente para Distante." },
      { roll: "9",    text: "Voo do Dragão (Finalizador)(◈◈ + 4 Mana): Teleporte para um inimigo Próximo e faça um chute com Vantagem que causa 3d6 de dano Físico." },
      { roll: "10",   text: "Surto de Adrenalina (◈): Uma vez por cena, você recupera todo seu Mana." },
      { roll: "11",   text: "Manto de Sombras (◈ + 2 Mana): Escuridão mágica te envolve. Inimigos Próximo têm Desvantagem para atacar até o início do seu próximo turno." },
      { roll: "12",   text: "Sentinela de Fogo (Armadilha)(◈ + 1 Mana): Coloque um marcador na mesa. Ele cospe fogo dano 1d6 de Fogo em quem passar Próximo. Gaste +1 Mana para cada dado extra." },
      { roll: "13",   text: "Sentinela de Raios (Armadilha)(◈ + 1 Mana): Coloque um marcador. Uma vez por turno, atira um raio no inimigo mais Próximo (1d6 de Relâmpago). Gaste +1 Mana para cada dado extra." },
      { roll: "14",   text: "Sentinela da Morte (Armadilha)(◈ + 1 Mana): Coloque um marcador. Quando alguém morre Próximo dela, ela explode o cadáver (1d8 dano Necrótico). Gaste +1 Mana para cada dado extra." },
      { roll: "15",   text: "Mestra das Armadilhas (Passiva): Você pode ter duas armadilhas ativas ao mesmo tempo na mesa." },
      { roll: "16",   text: "Guerreiro das Sombras (◈◈ + 2 Mana): Invoca uma sombra que repete seu último ataque no turno (dura 1d4 rodadas)." },
      { roll: "17",   text: "Veneno (◇ + 1 Mana): Suas garras causam 1d4 de dano de Veneno extra por rodada (durante 3 rodadas) após o acerto." },
      { roll: "18",   text: "Explosão Mental (◈◈ + 3 Mana): Você empurra inimigos Próximo apenas com a mente e causa 2d6 de dano Psíquico. Gaste +3 Mana para cada dado extra." },
      { roll: "19",   text: "Golpe de Fênix (◈◈◈ + 6 Mana): Libera toda a energia das Cargas de Combo. 1 carga = explosão de 3d8 Fogo em área Próximo; 2 cargas = também congela todos os alvos por 1 rodada; 3 cargas = também dispara raios encadeados causando 1d10 Relâmpago em até 3 alvos." },
      { roll: "20",   text: "Escolha qualquer talento desta lista que você ainda não possua." }
    ]
  },
  {
    id: "barbaro",
    nome: "Bárbaro",
    dv: 12,
    armaduras: ["Leve", "Média", "Pesada"],
    armas: ["Leve", "Média", "Pesada"],
    atribPrimario: ["FOR", "CON"],
    habilidades: [
      "Nervos de Aço: Enquanto usar apenas armaduras Leves ou nenhuma armadura, soma o modificador de CON na CA.",
      "Fúria Sanguínária (◇): Sempre que sofrer dano ou acertar um golpe, pode entrar em Fúria. Vantagem em ataques e testes físicos, +Nível de dano extra, mas todos os ataques contra você têm Vantagem. Dura até o fim do combate."
    ],
    talentos: [
      { roll: "1-2",  text: "+2 de Força ou +2 de Constituição." },
      { roll: "3-4",  text: "+1 em ataques corpo a corpo ou +2 de HP." },
      { roll: "5",    text: "Salto (◈ + 1 Mana): Como movimento, salte para qualquer lugar Próximo, ignorando obstáculos, e faça um ataque." },
      { roll: "6",    text: "Pancada (◇ + 2 Mana): Se acertar um ataque, empurre o inimigo para Próximo. Salvaguarda de CON ou FOR (DC 10 + Mod. FOR) ou o custo de cada zona de movimento é ◈◈ até o início do seu próximo turno." },
      { roll: "7",    text: "Turbilhão (◈ + 3 Mana): Ataque todos os inimigos Adjacentes com uma única rolagem." },
      { roll: "8",    text: "Grito de Guerra (◇ + 2 Mana): O Bárbaro grita e recebe (ou concede a aliados Próximo) +1d6 de HP Temporário." },
      { roll: "9",    text: "Resistência Natural (Passiva): Você ganha RD 2 contra Veneno, Fogo, Gelo e Relâmpago." },
      { roll: "10",   text: "Berserk (◈ + 2 Mana): Faça um ataque que adiciona +1d10 de dano Físico. Gaste +2 Mana para cada dado extra. Impede recuperação de Vida e Mana até o início do próximo turno." },
      { roll: "11",   text: "Mestre das Armas Grandes (Passiva): Ao usar armas de duas mãos, você rola o dano duas vezes e escolhe o maior." },
      { roll: "12",   text: "Sede de Sangue (◇ + 1 Mana): Toda vez que reduz um inimigo a 0 HP enquanto em Fúria, recupera 1d6 de HP temporário." },
      { roll: "13",   text: "Frenesi (◇ + 1 Mana por acerto): Sempre que acertar um ataque, ganha +1 no próximo ataque (acumulativo até o fim da cena, máx. +Mod. FOR)." },
      { roll: "14",   text: "Implacável (Passiva): Enquanto com menos da metade do HP máximo, ganha RD 2 contra todo tipo de dano." },
      { roll: "15",   text: "Arremesso de Arma (Passiva): Pode arremessar qualquer arma corpo a corpo como arma de arremesso (alcance Próximo). Com armas de arremesso, causa +1d4 de dano Físico extra." },
      { roll: "16",   text: "Ordens de Batalha (◈ + 2 Mana): Você grita ordens e até 2 aliados em audição podem se mover imediatamente como reação, sem provocar ataques de oportunidade." },
      { roll: "17",   text: "Desprezo à Dor (⟁ + 2 Mana): Como reação, se cair para 0 HP, você ignora o dano e continua com 1 HP." },
      { roll: "18",   text: "Dupla Empunhadura (◈ + 1 Mana): Se usar duas armas, pode realizar um ataque extra com a arma secundária." },
      { roll: "19",   text: "Chamado dos Antigos (◈◈◈ + 4 Mana por Ancestral): Invoca até 3 espíritos ancestrais até o fim da cena. Como ação livre ◇, cada Ancestral ataca um alvo Próximo usando seu mesmo bônus de ataque. Dano: 2d6 Físico · Alcance: Próximo. Resolva todos os ataques com uma única rolagem." },
      { roll: "20",   text: "Escolha qualquer talento desta lista que você ainda não possua." }
    ]
  },
  {
    id: "cacador-demonios",
    nome: "Caçador de Demônios",
    dv: 8,
    armaduras: ["Leve", "Média"],
    armas: ["Leve", "Média", "Pesadas a Distância"],
    atribPrimario: ["DES"],
    habilidades: [
      "Habilidades de Ódio: Ao reduzir um inimigo a 0 HP com uma habilidade de Ódio, recupere 1d4 de Mana.",
      "Habilidades de Disciplina: Após usar uma habilidade de Disciplina, habilidades de Ódio custam -1 Mana (mín. 1).",
      "Flecha Faminta (Ódio)(◈◈ + 2 Mana): Dispara uma flecha que atravessa todos os inimigos em linha até Próximo.",
      "Inimigo Jurado: Vantagem em ataques contra Demônios e Mortos-vivos."
    ],
    talentos: [
      { roll: "1-2",  text: "+2 de Destreza ou +2 de Constituição." },
      { roll: "3-4",  text: "+1 em ataques à distância ou +1 na CA." },
      { roll: "5",    text: "Salto Mortal (Disciplina)(◈ + 1 Mana): Move-se para área Próximo, ignora ataques de oportunidade." },
      { roll: "6",    text: "Boleadeiras (Disciplina)(◈ + 1 Mana): Faça um ataque. Se acertar, o alvo fica preso por 1d4 rodadas." },
      { roll: "7",    text: "Granada (Ódio)(◈◈ + 2 Mana): Arremessa uma granada em um ponto Próximo que explode e causa 2d6 de dano de Fogo em inimigos Adjacentes. Gaste +2 Mana para cada dado extra." },
      { roll: "8",    text: "Cortina de Fumaça (Disciplina)(◈ + 1 Mana): Invisível por 1 rodada ou até atacar." },
      { roll: "9",    text: "Sentinela (Ódio)(◈ + 1 Mana): Coloque um sentinela. Quando um inimigo entrar em Próximo dela, ela dispara automaticamente causando 1d6 de dano Físico (uso único). Gaste +1 Mana para cada dado extra." },
      { roll: "10",   text: "Flecha de Fragmentação (Ódio)(◈◈ + 2 Mana): O projétil causa dano da arma + 1d8 de dano de Fogo em área Próximo. Gaste +2 Mana para cada dado extra." },
      { roll: "11",   text: "Companheiro Animal (Ódio)(◈ + 3 Mana): Invoca um companheiro animal. CA 13 · HP = Nível×2 (mín. 5) · Dano: 1d6 Físico · ATK: mesmo bônus do Caçador. Age no seu turno com ◈. Dura até zerar o HP." },
      { roll: "12",   text: "Poder das Sombras (Disciplina)(◈◈ + 2 Mana): Por 3 rodadas, recupera 1 HP sempre que causar dano." },
      { roll: "13",   text: "Armadilha de Estacas (Disciplina)(◈◈ + 3 Mana): Cria uma armadilha embaixo do alvo. Salvaguarda de DES (DC 10 + Mod. DES). Se falhar, sofre 2d6 de dano Físico e fica imobilizado. Gaste +3 Mana para cada dado extra." },
      { roll: "14",   text: "Tiro Rápido (Ódio)(◈ + 2 Mana): Mova-se e faça dois ataques à distância." },
      { roll: "15",   text: "Fã de Facas (Ódio)(◈◈ + 2 Mana): Causa 2d6 Físico em área Próximo. Inimigos atingidos fazem Salvaguarda de DES ou têm o movimento reduzido à metade. Gaste +2 Mana para cada dado extra." },
      { roll: "16",   text: "Atirador de Elite (Ódio)(◇ + 1 Mana): Se você não se moveu neste turno, seu ataque tem Vantagem e causa dano máximo." },
      { roll: "17",   text: "Bestas de Mão (Ódio)(◇ + 1 Mana): Se usar duas bestas, ao gastar ◈ para atacar, faça um ataque extra com a arma secundária usando ◇." },
      { roll: "18",   text: "Vingança (Ódio)(◈◈ + 5 Mana): Transforme-se na personificação do Ódio por 1d4 rodadas. Move-se o dobro, ataques têm Vantagem e causam 1d6 de dano Físico extra." },
      { roll: "19",   text: "Chuva de Vingança (◈◈◈ + 5 Mana): Dezenas de flechas caem do céu em uma área Próximo. Todos os inimigos na área sofrem 3d6 de dano Físico por rodada durante 1d4 rodadas. Gaste +5 Mana para cada dado extra." },
      { roll: "20",   text: "Escolha qualquer talento desta lista que você ainda não possua." }
    ]
  },
  {
    id: "cavaleiro-sangue",
    nome: "Cavaleiro de Sangue",
    dv: 10,
    armaduras: ["Leve", "Média", "Pesada"],
    armas: ["Leve", "Média", "Pesada"],
    atribPrimario: ["FOR", "CON"],
    habilidades: [
      "Mestre da Lança: +1 para atacar com armas de haste. Pode gastar ◈ para fazer um ataque extra com a ponta inversa (1d4 Físico).",
      "Sifão de Sangue (◇): Sempre que acertar um inimigo vivo com ataque corpo a corpo, recupera 1 HP. Se o inimigo estiver com menos da metade do HP, recupera 1d4 HP."
    ],
    talentos: [
      { roll: "1-2",  text: "+2 de Força ou +2 de Constituição." },
      { roll: "3-4",  text: "+1 em ataques corpo a corpo ou +1 em testes de conjuração." },
      { roll: "5",    text: "Gume Sombrio (Feitiço)(◈ + 1 Mana): Lança uma adaga de sangue em um inimigo Próximo, causando 1d6 de dano Necrótico. Gaste +1 Mana para cada adaga extra." },
      { roll: "6",    text: "Nuvem de Mefítica (Feitiço)(◈ + 5 Mana): Libera uma nuvem tóxica ao seu redor que causa Desvantagem aos inimigos Próximo por 1d4 rodadas." },
      { roll: "7",    text: "Lança Empaladora (◈ + 3 Mana): Se acertar um ataque, prende o inimigo no chão. Teste de FOR (DC 10 + Mod. Primário) para escapar." },
      { roll: "8",    text: "Sanguinar (◈◈ + 2 Mana): Avance em linha reta até Próximo e cause 1d6 Necrótico automático a todos no caminho. Gaste +2 Mana para cada dado extra. Não gera ataques de oportunidade." },
      { roll: "9",    text: "Sentidos Sobrenaturais (Passiva): Você pode enxergar perfeitamente no escuro total em alcance Curto." },
      { roll: "10",   text: "Drenar Sangue (Feitiço)(◈ + 1 Mana): Drene 1d4 de HP de um inimigo Próximo e recupere a mesma quantidade." },
      { roll: "11",   text: "Esmagar o Fraco (◇ + 1 Mana): Você causa +1d4 necrótico contra inimigos que não estejam com o HP cheio." },
      { roll: "12",   text: "Sudário da Noite (Feitiço)(◈ + 5 Mana): Envolva a si mesmo e aliados Próximo em trevas até o início do seu próximo turno. Aparições sombrias desferem um Ataque Extra como ◇." },
      { roll: "13",   text: "Golpe Crítico (Passiva): Seus ataques críticos agora acontecem com 19-20 natural." },
      { roll: "14",   text: "Transfusão (◈): Toque um aliado e transfira seu próprio HP para ele (ponto por ponto) ou suga o sangue de um aliado e transfere HP para si." },
      { roll: "15",   text: "Espinhos de Sangue (⟁ + 1 Mana): Quando sofrer dano, espirre sangue de volta e cause 1d4 Necrótico a uma criatura Adjacente." },
      { roll: "16",   text: "Tentáculos de Sangue (Feitiço)(◈ + 2 Mana por inimigo): Dispara tentáculos em inimigos Próximo e os move (Teste de FOR DC 10 + Mod. Primário para resistir)." },
      { roll: "17",   text: "Vigor Maléfico (◈ + 2 Mana): Ganhe 1d8 HP Temporário até o próximo descanso longo. Gaste +2 Mana para cada dado extra." },
      { roll: "18",   text: "Onda de Sangue (Feitiço)(◈◈ + 2 Mana): Explosão circular. Todos os inimigos Adjacentes sofrem 2d6 Necrótico e são empurrados para Próximo. Gaste +2 Mana para cada dado extra." },
      { roll: "19",   text: "Abominação (Transformação)(◈◈◈ + 10 Mana): Torne-se um monstro por 3 rodadas. Com ◈ ataque 2x com garras (2d10 necrótico + Mod. Primário). Com ◇ ganha +5 HP temporários no início de cada rodada. Sem custo de Mana, mas teste de SAB DC 20 - Nível ou sucumbe à maldição para sempre." },
      { roll: "20",   text: "Escolha qualquer talento desta lista que você ainda não possua." }
    ]
  },
  {
    id: "cruzado",
    nome: "Cruzado",
    dv: 10,
    armaduras: ["Leve", "Média", "Pesada"],
    armas: ["Leve", "Média", "Pesada"],
    atribPrimario: ["FOR", "SAB"],
    habilidades: [
      "Mestre do Escudo: Enquanto usar um escudo, +1 extra na CA e pode usá-lo para atacar (1d4 Físico + empurrão).",
      "Inabalável: Vantagem em testes de Força para resistir a ser empurrado, derrubado ou movido.",
      "Magia Divina: Usa SAB para conjurar feitiços."
    ],
    talentos: [
      { roll: "1-2",  text: "+2 de Força ou +2 de Sabedoria." },
      { roll: "3-4",  text: "+1 em ataques corpo a corpo ou +1 em testes de conjuração." },
      { roll: "5",    text: "Pele de Ferro (Feitiço)(◈ + 2 Mana): Reduza todo o dano recebido à metade por 1 rodada." },
      { roll: "6",    text: "Escudo Reluzente (Feitiço)(◈◈ + 3 Mana): Inimigos Próximo ficam cegos por 1 rodada (Desvantagem nos ataques)." },
      { roll: "7",    text: "Punição (⟁ + 2 Mana): Quando um inimigo errar um ataque contra você, realize um ataque imediato com Vantagem que causa +1d6 de dano Radiante." },
      { roll: "8",    text: "Martelo Abençoado (Feitiço)(◈◈ + 2 Mana): Invoque um martelo de luz que gira ao seu redor, causando 1d6 de dano Radiante a quem se aproximar (dura 1d4 rodadas). Gaste +2 Mana para cada dado extra." },
      { roll: "9",    text: "Investida de Corcel (◈ + 3 Mana): Você pode se mover o triplo da distância e ignorar ataques de oportunidade." },
      { roll: "10",   text: "Esmagar com Escudo (◈ + 1 Mana): Faça ataque de escudo; se acertar, o alvo é derrubado automaticamente." },
      { roll: "11",   text: "Julgamento (Feitiço)(◈◈ + 2 Mana por inimigo): Imobilize um inimigo Distante com correntes sagradas por 1d4 rodadas (DC 10 + Mod. Primário para soltar)." },
      { roll: "12",   text: "Leis da Esperança (◈ + 2 Mana por rodada): Você e aliados Próximo recuperam 1d4 de HP no início de cada rodada." },
      { roll: "13",   text: "Leis da Justiça (Passiva): Você e aliados Próximo ganham +1 na CA enquanto você estiver consciente." },
      { roll: "14",   text: "Espada Cadente (◈◈ + 2 Mana): Salte para Distante e caia causando 2d8 de dano Radiante em área. Gaste +2 Mana para cada dado extra." },
      { roll: "15",   text: "Provocar (Feitiço)(◈◈◈ + 2 Mana por inimigo): Force inimigos Próximo a atacarem apenas você no próximo turno (Teste de SAB ou CAR, DC 10 + Mod. Primário, para resistir)." },
      { roll: "16",   text: "Fúria Sagrada (◈ + 3 Mana por rodada): Seus ataques agora causam +2d6 de dano Radiante por 1 rodada." },
      { roll: "17",   text: "Consagração (Feitiço)(◈ + 4 Mana): Santifique o chão Próximo por 1d4 rodadas. Aliados na área têm Vantagem em testes e ataques." },
      { roll: "18",   text: "Fervor (Passiva): Você pode usar uma arma de duas mãos em uma mão se estiver usando um escudo na outra." },
      { roll: "19",   text: "Campeão de Akarat (◈◈◈ + 10 Mana): Cresça em tamanho e poder. Bônus igual ao Mod. Primário em todos os ataques e danos. Regenera 1d10 HP no início do turno por 1d4 rodadas." },
      { roll: "20",   text: "Escolha qualquer talento desta lista que você ainda não possua." }
    ]
  },
  {
    id: "druida",
    nome: "Druida",
    dv: 8,
    armaduras: ["Leve", "Média"],
    armas: ["Leve", "Média", "Pesada"],
    atribPrimario: ["SAB"],
    habilidades: [
      "Espírito Animal: Você tem um Lobo ou Corvo Espiritual. Use ◈ para agir com ele. CA 13 · HP = Nível×2 · Dano: 1d6 Físico. Se morrer, gaste ◈ + 1 Mana para trazê-lo de volta.",
      "Transmutar (◈ + 2 Mana): Role SAB (DC 15 − Nível). Se passar, mude para Lobo (+mov e +1d6 dano) ou Urso (+2 CA e +5 HP temp). Dura até fim da cena.",
      "Licantropia (Passiva): A partir do nível 5, pode usar Transmutar sem rolar dados.",
      "Feitiço Básico: Role 1d8 para definir seu feitiço inicial."
    ],
    talentos: [
      { roll: "1-2",  text: "+2 de Sabedoria ou +2 de Constituição." },
      { roll: "3-4",  text: "+1 em testes de conjuração/transmutação ou +2 de HP." },
      { roll: "5",    text: "Garras de Fogo (Passiva): Enquanto transformado, seus ataques causam +1d4 de Fogo." },
      { roll: "6",    text: "Impacto (Passiva): Na forma de Urso, se acertar, o alvo deve fazer Salvaguarda de CON (DC 10 + Mod. SAB) ou fica atordoado por 1 rodada." },
      { roll: "7",    text: "Raiva (Passiva): Na forma de Lobo, sua mordida causa veneno (1d4 dano/turno) que se espalha para inimigos Próximo no início do turno deles. O Veneno dura 1d4 rodadas." },
      { roll: "8",    text: "Ciclone de Armadura (Feitiço)(◈ + 1 Mana por rodada): Você cria uma armadura de vento. Uma vez por rodada, ignore o dano de um ataque à distância." },
      { roll: "9",    text: "Corvos Espirituais (Feitiço)(◈ + 2 Mana): Invoque corvos que cegam um inimigo (Desvantagem no ataque) por 1d4 rodadas." },
      { roll: "10",   text: "Sábio de Carvalho (Feitiço)(◈◈ + 2 Mana): Invoque um espírito que dá +1d4 de HP temporário para todos os aliados Próximo. Gaste +2 Mana para cada dado extra." },
      { roll: "11",   text: "Lobos Atrozes (Passiva): Você pode ter um lobo espiritual extra, aumentando o número de lobos ativos ao mesmo tempo." },
      { roll: "12",   text: "Coração de Wolverine (Passiva): Seu espírito animal garante +1 em ataques e dano para aliados Próximo." },
      { roll: "13",   text: "Rocha Rolante (Feitiço)(◈◈ + 2 Mana): Lança uma pedra em linha reta que causa 2d8 de dano Físico e derruba inimigos Próximo. Gaste +2 Mana para cada dado extra." },
      { roll: "14",   text: "Fissura (Feitiço)(◈ + 2 Mana): Abre uma fenda no chão Próximo. Inimigos na área sofrem 1d6 de Fogo por turno. Gaste +2 Mana para cada dado extra. A fenda dura 1d4 rodadas." },
      { roll: "15",   text: "Furacão (Feitiço)(◈ + 2 Mana): Crie um Furacão em até um ponto Distante. Inimigos que começarem o turno Próximo do Furacão sofrem 2d6 de dano Físico. Gaste +2 Mana para cada dado extra." },
      { roll: "16",   text: "Vinha Venenosa (Feitiço)(◈◈ + 2 Mana por inimigo): Uma planta surge do chão e imobiliza um inimigo por 1d4 rodadas." },
      { roll: "17",   text: "Chamado do Urso Pardo (◈◈ + 3 Mana): Invoca um Urso Espiritual. CA 15 · HP = Nível×3 (mín. 10) · Dano: 1d10 Físico · ATK: mesmo bônus do Druida. Dura até zerar o HP." },
      { roll: "18",   text: "Erupção (Feitiço)(◈◈ + 3 Mana): O chão explode em lava. Dano 3d10 em toda área Próximo de um ponto escolhido. Gaste +3 Mana para cada dado extra." },
      { roll: "19",   text: "Armagedão (◈◈◈ + 8 Mana): Por 1d4 rodadas, meteoros de fogo caem sobre todos os inimigos em área Próximo, causando 2d10 de dano Fogo por rodada. Inimigos devem fazer Salvaguarda de CON (DC 10 + SAB) ou ficam atordoados." },
      { roll: "20",   text: "Escolha qualquer talento desta lista que você ainda não possua." }
    ]
  },
  {
    id: "natispirito",
    nome: "Natispirito",
    dv: 8,
    armaduras: ["Leve", "Média"],
    armas: ["Leve", "Média"],
    atribPrimario: ["DES", "SAB"],
    habilidades: [
      "Vigor do Espírito (Passiva): +1 para atacar com armas de haste.",
      "Comunhão com Guardiões (◇): No início de cada combate, escolha um Guardião: Jaguar (+1 ataques), Gorila (+1 CA), Águia (dobro de movimento), Centopeia (+1 HP ao matar inimigos)."
    ],
    talentos: [
      { roll: "1-2",  text: "+2 de Destreza ou +2 de Sabedoria." },
      { roll: "3-4",  text: "+1 em ataques corpo a corpo ou +1 na CA." },
      { roll: "5",    text: "Garras do Jaguar (◈ + 2 Mana): Se acertar um ataque, pode fazer um segundo ataque." },
      { roll: "6",    text: "Pancada do Gorila (◈ + 1 Mana): Faça um ataque e empurre um inimigo Próximo para Distante." },
      { roll: "7",    text: "Mergulho da Águia (◈ + 3 Mana): Salte para um inimigo Distante e ataque com Vantagem." },
      { roll: "8",    text: "Toque da Centopeia (◈ + 1 Mana por rodada): Seu ataque causa 1d4 de dano Veneno por 1 rodada." },
      { roll: "9",    text: "Pele de Gorila (⟁ + 3 Mana): Ignore o dano de um ataque físico." },
      { roll: "10",   text: "Olho da Águia (◈ + 1 Mana): Faça ataques à distância (lanças/glaives) que ignoram cobertura." },
      { roll: "11",   text: "Frenesi de Fogo (Jaguar)(◈ + 1 Mana): Ganhe uma ação extra ◈ por rodada durante 1d4 rodadas." },
      { roll: "12",   text: "Nuvem de Esporos (Centopeia)(◈◈ + 4 Mana): Inimigos Próximo devem fazer Salvaguarda de CON (DC 10 + Mod. SAB) ou ficam atordoados por 1 rodada." },
      { roll: "13",   text: "Retaliação do Espírito (⟁ + 1 Mana): Se um inimigo errar um ataque contra você, pode contra-atacar imediatamente." },
      { roll: "14",   text: "Pisotear (Gorila)(◈◈ + 3 Mana): Avance em linha reta. Inimigos no caminho sofrem 2d6 de dano Físico e são derrubados. Gaste +3 Mana para cada dado extra." },
      { roll: "15",   text: "Torvelinho de Penas (Águia)(◈ + 1 Mana): Dispare um projétil de vento que causa 1d6 de dano Físico em área Próximo ao acertar. Gaste +1 Mana para cada projétil extra." },
      { roll: "16",   text: "Devorar (Centopeia)(◇ + 1 Mana): Se matar um inimigo envenenado, recupere 1d8 de HP." },
      { roll: "17",   text: "Dança do Jaguar (Passiva): Você não provoca ataques de oportunidade ao se mover." },
      { roll: "18",   text: "Encarnação do Guardião (Passiva): Escolha um segundo Guardião para ter o benefício passivo simultaneamente." },
      { roll: "19",   text: "Voo da Águia (◈◈◈ + 6 Mana): Você se torna a Águia e varre o campo de batalha. Mova-se por toda área Distante num único arco, causando 3d8 de dano Físico a cada inimigo que tocar. Inimigos atingidos não podem fazer ataques de oportunidade contra você neste turno." },
      { roll: "20",   text: "Escolha qualquer talento desta lista que você ainda não possua." }
    ]
  },
  {
    id: "feiticeiro",
    nome: "Feiticeiro",
    dv: 6,
    armaduras: ["Leve"],
    armas: ["Leve", "Média"],
    atribPrimario: ["CAR", "INT"],
    habilidades: [
      "Mestre das Pragas: Seus ataques de veneno duram 1 rodada a mais.",
      "Cães Zumbis: Você começa com dois Cães Zumbis. CA 12 · HP = Nível (mín. 1) · Dano: 1d4 Físico · ATK: mesmo bônus do Feiticeiro. Se morrerem, gaste ◈ + 1 Mana por Cão para trazê-los de volta.",
      "Feitiço Básico: Role 1d12 para definir seu feitiço inicial."
    ],
    talentos: [
      { roll: "1-2",  text: "+2 de Carisma ou +2 de Inteligência." },
      { roll: "3-4",  text: "+1 em testes de conjuração ou +2 de HP." },
      { roll: "5",    text: "Garras dos Mortos (Feitiço)(◈◈ + 2 Mana): Mãos saem do chão. Inimigos Próximo sofrem 1d4 de dano Necrótico e ficam presos por 1d4 rodadas. Gaste +2 Mana para cada dado extra." },
      { roll: "6",    text: "Nuvem de Gafanhotos (Feitiço)(◈ + 2 Mana): Uma nuvem de pragas que saltam de inimigo em inimigo, causando 1d6 de dano Físico automático em todos os inimigos Próximo. Gaste +2 Mana para cada dado extra. Dura 1d4 rodadas." },
      { roll: "7",    text: "Bomba de Fogo (Feitiço)(◈ + 1 Mana): Lança um jarro de explosivos. Todas as criaturas Adjacentes ao ponto escolhido sofrem 2d6 de dano de Fogo. Gaste +1 Mana para cada dado extra." },
      { roll: "8",    text: "Caminhada do Espírito (Feitiço)(◈ + 3 Mana): Fique invisível e etéreo por 1d4 rodadas. Você não sofre dano físico nessa forma." },
      { roll: "9",    text: "Invasão de Sapos (Feitiço)(◈ + 1 Mana): Uma horda de sapos explosivos cobre o chão causando 1d6 de dano Veneno. Gaste +1 Mana para cada dado extra. A área é terreno difícil e dura 1d4 rodadas." },
      { roll: "10",   text: "Sacrifício (◈ + 1 Mana por cão): Você explode seus Cães Zumbis. Cada cão causa 1d8 de dano Necrótico a criaturas Adjacentes." },
      { roll: "11",   text: "Gargântua (◈ + 5 Mana): No lugar de um dos Cães, invoca 1 Gargântua. CA 15 · HP = Nível×3 (mín. 10) · Dano: 2d8 Físico · ATK: mesmo bônus do Feiticeiro. Dura até zerar o HP." },
      { roll: "12",   text: "Aterrorizar (Feitiço)(◈ + 1 Mana por inimigo): Você usa sua máscara para gritar. Inimigos Próximo fogem por 1d4 rodadas." },
      { roll: "13",   text: "Zumbis Suicidas (Feitiço)(◈ + 1 Mana): Uma fila de zumbis corre e explode no primeiro alvo. Dano 2d6 Necrótico. Gaste +1 Mana para cada dado extra." },
      { roll: "14",   text: "Piranhas (Feitiço)(◈◈ + 2 Mana): Cria uma poça de água que causa 2d8 de dano Veneno durante 1d4 rodadas. Quem estiver na área sofre +1d4 de todas as fontes. Gaste +2 Mana para cada dado extra." },
      { roll: "15",   text: "Exército de Fetiche (◈◈◈ + 1 Mana): Invoca um pigmeu com adaga. Gaste +1 Mana para cada pigmeu extra. Duram 1 cena. CA 13 · HP = Nível (mín. 1) · Dano: 1d4 Físico · ATK: mesmo bônus do Feiticeiro." },
      { roll: "16",   text: "Vudu Maluco (Feitiço)(◈◈ + 1 Mana por rodada): Uma estátua que dá Vantagem em ataques para todos os aliados Próximo dela. Dura 1 rodada." },
      { roll: "17",   text: "Parede de Zumbis (Feitiço)(◈◈ + 2 Mana): Cria uma barreira física de corpos por 1d4 rodadas. Inimigos Próximo da parede sofrem 1d8 de dano Físico. Pode gastar +1 Mana para mudar o tipo de dano para Fogo, Gelo ou Veneno. Gaste +2 Mana para cada dado extra." },
      { roll: "18",   text: "Colheita de Almas (Feitiço)(◈ + 2 Mana por inimigo): Drene a inteligência de até 5 inimigos Próximo. Ganhe +2 para conjurar, por inimigo, durante 3 rodadas." },
      { roll: "19",   text: "Assombração (Feitiço)(◈◈◈ + 5 Mana): Um espírito persegue um alvo, causando 2d8 de dano Necrótico no início de cada turno do alvo. Se o alvo morrer, o espírito salta para o inimigo mais Próximo. O espírito dura 1d4+1 rodadas. Gaste +5 Mana para cada dado extra." },
      { roll: "20",   text: "Escolha qualquer talento desta lista que você ainda não possua." }
    ]
  },
  {
    id: "guerreiro",
    nome: "Guerreiro",
    dv: 10,
    armaduras: ["Leve", "Média", "Pesada"],
    armas: ["Leve", "Média", "Pesada"],
    atribPrimario: ["FOR", "CON"],
    habilidades: [
      "Mestria em Armas: Escolha um tipo de arma (Espadas, Machados, Maças). Vantagem em ataques com essa arma. Quando usar Vantagem e acertar com a arma de Mestria, cause +1d4 de dano extra.",
      "Reparar Equipamento: Durante descansos, repara armaduras e armas. Concede +1 CA ou +1 Ataque com Armas por 1d4 cenas."
    ],
    talentos: [
      { roll: "1-2",  text: "+2 de Força ou +2 de Constituição." },
      { roll: "3-4",  text: "+1 em ataques corpo a corpo ou +2 de HP." },
      { roll: "5",    text: "Golpe de Escudo (◈ + 1 Mana): Se estiver usando escudo, pode tentar derrubar um alvo usando a ação de atacar." },
      { roll: "6",    text: "Carnificina (◈ + 1 Mana por ataque): Se matar um inimigo, ganha um ataque imediato contra outro Próximo." },
      { roll: "7",    text: "Postura Defensiva (◈◈ + 1 Mana por rodada): Adicione seu Modificador de Força na CA por 1 rodada." },
      { roll: "8",    text: "Desarmar (◈ + 1 ou 5 Mana): Se acertar, faz a arma do inimigo voar. Por +5 Mana, pode arrancar armas naturais ou partes de monstros." },
      { roll: "9",    text: "Golpe de Sangue (◇): Gaste 2 HP para causar +1d8 de dano Físico em um ataque." },
      { roll: "10",   text: "Duro de Matar (⟁ + 3 Mana): Reduza o dano físico de um ataque recebido em 1d10 + Nível." },
      { roll: "11",   text: "Mestre de Armadura (Passiva): Enquanto usar armadura pesada, RD 2 para dano Físico e o peso das armaduras não reduz seu movimento." },
      { roll: "12",   text: "Ataque Brutal (Passiva): Seus ataques críticos agora acontecem com 19-20 natural." },
      { roll: "13",   text: "Segunda Chance (◇ + 2 Mana): Role novamente um teste de ataque que errou." },
      { roll: "14",   text: "Provocação (◈ + 3 Mana por inimigo): Bata no escudo. Inimigos Próximo devem te atacar no próximo turno (Teste de SAB ou CAR, DC 10 + Mod. Primário, para resistir)." },
      { roll: "15",   text: "Mestre de Todas as Armas (Passiva): Você pode trocar sua arma de Mestria após um descanso curto ou longo." },
      { roll: "16",   text: "Fôlego Renovado (◈ + 1 Mana): Recupere 1d10 + Nível de HP como uma ação. Gaste +1 Mana para cada dado extra." },
      { roll: "17",   text: "Quebra-Armadura (◈◈◈ + 3 Mana): Faça um ataque; se acertar, reduz a CA do inimigo em 2 pelo resto da cena." },
      { roll: "18",   text: "Carga Heróica (◈◈ + 4 Mana): Avance para Distante e ataque com Vantagem. Se acertar, causa dano máximo." },
      { roll: "19",   text: "Veterano de Ferro (◈◈◈ + 8 Mana): Por 1d4 rodadas, ataques com a arma de Mestria causam dano máximo automático. Uma vez por rodada, se matar um inimigo, pode fazer um ataque imediato contra outro Próximo como ◇." },
      { roll: "20",   text: "Escolha qualquer talento desta lista que você ainda não possua." }
    ]
  },
  {
    id: "mago",
    nome: "Mago",
    dv: 4,
    armaduras: ["Leve"],
    armas: ["Leve"],
    atribPrimario: ["INT"],
    habilidades: [
      "Afinidade Elemental: No nível 1, escolha um elemento (Fogo, Gelo ou Relâmpago). Vantagem para conjurar feitiços desse elemento.",
      "Sobrecarga Sanguínea: Se falhar num teste de conjuração, pode sofrer 1d4 de dano por ponto necessário para alcançar o DC e passar automaticamente.",
      "Mestria Elemental (Passiva): Dados de dano mágico 'explodem'. Para cada dado que tirar o valor máximo, role um dado extra e some ao dano.",
      "Feitiço Básico: Role 1d10 para definir seu feitiço inicial."
    ],
    talentos: [
      { roll: "1-2",  text: "+2 de Inteligência ou +2 de Destreza." },
      { roll: "3-4",  text: "+1 em testes de conjuração ou +1 na CA." },
      { roll: "5",    text: "Calor (◈◈): Uma vez por descanso longo, você recupera metade do seu Mana sem precisar de descanso." },
      { roll: "6",    text: "Teleporte (◈ + 1 Mana): Pisque para um lugar Próximo que você possa ver." },
      { roll: "7",    text: "Casca de Gelo (Feitiço)(◈ + 1 Mana por rodada): Conjura uma armadura de gelo por 1 rodada. Inimigos que te acertarem corpo a corpo sofrem 1d8 de dano Gelo e ficam congelados por 1d4 rodadas." },
      { roll: "8",    text: "Saque de Mana (Passiva): Se matar um inimigo com magia, ganha +2 no próximo teste de conjuração." },
      { roll: "9",    text: "Nova de Gelo (Feitiço)(◈ + 2 Mana): Uma explosão circular que causa 1d10 de dano Gelo a todos Próximo por 1d4 rodadas. Gaste +2 Mana para cada dado extra. Criaturas com 0 HP ficam congeladas indefinidamente." },
      { roll: "10",   text: "Bola de Fogo (Feitiço)(◈ + 2 Mana): Uma explosão que causa 1d8 de Fogo em área Próximo. Gaste +2 Mana para cada dado extra. Deixa os alvos queimando (1d4 Fogo/turno por 1d4 rodadas)." },
      { roll: "11",   text: "Seta Elétrica (Feitiço)(◈ + 2 Mana): Dispare 3 faíscas que causam 1d4+1 de dano Relâmpago cada em alvos diferentes. Gaste +2 Mana por seta extra." },
      { roll: "12",   text: "Encantar Arma (Feitiço)(◈ + 2 Mana): Uma arma sua ou de um aliado causa +1d4 de dano elemental (Fogo, Gelo ou Relâmpago) por 1d4 rodadas. Gaste +2 Mana para cada dado extra." },
      { roll: "13",   text: "Nevasca (Feitiço)(◈ + 2 Mana): Cria uma zona Próximo onde inimigos sofrem 1d6 de dano Gelo e movem metade por 1d4 rodadas. Gaste +2 Mana para cada dado extra." },
      { roll: "14",   text: "Cadeia de Raios (Feitiço)(◈ + 2 Mana): Um raio que pula em até 3 inimigos Próximo, causando 1d10 de dano Relâmpago em cada. Gaste +2 Mana para cada dado extra." },
      { roll: "15",   text: "Hidra (Feitiço)(◈ + 2 Mana): Invoca 1d4 cabeças de fogo que disparam bolas de fogo em inimigos Próximo. Uma vez por turno, cada cabeça causa 1d6 de Fogo. Duram 1d4 rodadas. Gaste +2 Mana para cada dado extra. Só um conjunto ativo por vez." },
      { roll: "16",   text: "Escudo de Energia (⟁ + 1 Mana): Se você sofrer dano, cria uma barreira mágica para reduzir o dano em 5. Gaste +1 Mana para cada 5 de redução extra." },
      { roll: "17",   text: "Parede de Fogo (Feitiço)(◈◈ + 4 Mana): Cria uma parede de fogo de tamanho Próximo. Dura 1d4 rodadas. Qualquer criatura que a atravessar sofre 3d6 de dano Fogo. Gaste +4 Mana para cada dado extra." },
      { roll: "18",   text: "Orbe Congelada (Feitiço)(◈ + 3 Mana): Lance uma esfera que viaja em linha reta até Próximo, disparando 1d6 de Gelo em criaturas Adjacentes no caminho. A esfera explode ao final causando 3d6 de Gelo. Gaste +3 Mana para cada dado extra na explosão." },
      { roll: "19",   text: "Bola de Raios (◈◈◈ + 6 Mana): Uma esfera de raios gigante percorre o campo em linha reta até Distante, causando 2d8 de Relâmpago em cada inimigo que tocar. Permanece ativa por 1d4 rodadas — inimigos Adjacentes a ela sofrem 1d6 de Relâmpago automático no início de cada turno." },
      { roll: "20",   text: "Escolha qualquer talento desta lista que você ainda não possua." }
    ]
  },
  {
    id: "monge",
    nome: "Monge",
    dv: 8,
    armaduras: ["Leve"],
    armas: ["Leve", "Média"],
    atribPrimario: ["DES", "SAB"],
    habilidades: [
      "Punhos de Ferro: Seus ataques desarmados causam 1d6 de dano Físico e são considerados armas mágicas.",
      "Defesa Iluminada: Enquanto não usar armaduras médias, pesadas ou escudo, CA = 10 + Mod. Primário × 2.",
      "Espírito em Fluxo: Ganha 1 Mana sempre que acertar um ataque corpo a corpo ou físico (limite por turno = Mod. SAB, mín. 1).",
      "Alcance Mortal (◈ + 1 Mana): Lance um projétil de força em um inimigo Próximo. Se lançar 3 projéteis no mesmo alvo, ele é arremessado para Próximo."
    ],
    talentos: [
      { roll: "1-2",  text: "+2 de Destreza ou +2 de Sabedoria." },
      { roll: "3-4",  text: "+1 em ataques corpo a corpo ou +1 na CA." },
      { roll: "5",    text: "Ímpeto (◈◈ + 1 Mana): Mova-se para Próximo instantaneamente e ataque com Vantagem." },
      { roll: "6",    text: "Palma Explosiva (◇ + 1 Mana): Se o seu ataque matar o alvo, ele explode causando 1d8 de dano Físico em área Próximo." },
      { roll: "7",    text: "Mantra da Cura (◈ + 1 Mana): Cura 1d6 de HP a si mesmo e a um aliado Próximo. Gaste +1 Mana para cada dado extra." },
      { roll: "8",    text: "Mantra de Evasão (Passiva): Você e aliados Próximo ganham +1 na CA enquanto você estiver consciente." },
      { roll: "9",    text: "Mantra de Retribuição (⟁ + 1 Mana): Inimigos que te acertarem sofrem 1d4 de dano Radiante de volta." },
      { roll: "10",   text: "Onda de Luz (◈◈ + 2 Mana): Esmague inimigos numa área Próximo com um sino de luz, causando 2d6 de dano Radiante. Gaste +2 Mana para cada dado extra." },
      { roll: "11",   text: "Serenidade (◈): Gaste 3 Mana, torna-se invulnerável a todo dano até o início da sua próxima rodada." },
      { roll: "12",   text: "Ciclone (◈ + 1 Mana por inimigo): Faça um ataque desarmado que gera um ciclone de vento e puxa inimigos Próximo para Adjacentes a você." },
      { roll: "13",   text: "Sete Lados (◈◈◈ + 5 Mana): Realize 7 ataques distribuídos entre inimigos Próximo a sua escolha. Você não gera ataques de oportunidade." },
      { roll: "14",   text: "Golpe de Chicotada (◈ + 1 Mana por inimigo): Faça um ataque em chute circular que empurra inimigos Adjacentes para Próximo." },
      { roll: "15",   text: "Pés Ligeiros (◈ + 1 Mana): Seu movimento dobra e você pode andar sobre a água ou paredes nesta rodada." },
      { roll: "16",   text: "Santuário Interior (◈ + 4 Mana): Cria um círculo na mesa por 1d4 rodadas. Inimigos não podem entrar e aliados dentro ganham Vantagem em todos os testes." },
      { roll: "17",   text: "Epifania (◈◈ + 5 Mana): Você recupera 1d4 Mana no início de cada turno e não precisa gastar ◈ para se mover durante seu turno." },
      { roll: "18",   text: "Experiência de Quase Morte (⟁ + 5 Mana): Ao ficar com HP 0, o Monge não morre, mas é curado em metade do HP máximo e tem Mana restaurado para metade." },
      { roll: "19",   text: "Aliado Místico (◈◈◈ + 5 Mana): Invoca uma cópia espiritual que luta ao seu lado por 1d4 rodadas. CA = sua · HP = seu HP máximo. Como ◇, ela repete o último ataque que você usou." },
      { roll: "20",   text: "Escolha qualquer talento desta lista que você ainda não possua." }
    ]
  },
  {
    id: "necromante",
    nome: "Necromante",
    dv: 4,
    armaduras: ["Leve", "Média"],
    armas: ["Leve", "Média"],
    atribPrimario: ["INT", "SAB"],
    habilidades: [
      "O Comandante da Horda: Controla até Mod. Primário + Nível esqueletos. CA 12 · HP = Nível · Dano: 1d4 Físico · ATK: mesmo bônus do Necromante. Duram até zerar o HP.",
      "Levantar Mortos (Feitiço)(◈ + 1 Mana): Role o Atributo Primário (DC 15 − Nível) para erguer 1d4 esqueletos de cadáveres Próximo.",
      "Feitiço Básico: Role 1d8 para definir seu feitiço inicial."
    ],
    talentos: [
      { roll: "1-2",  text: "+2 de Inteligência, +2 de Sabedoria ou +2 de Constituição." },
      { roll: "3-4",  text: "+1 em testes de conjuração ou +2 no limite de esqueletos." },
      { roll: "5",    text: "Explosão de Cadáver (Feitiço)(◈ + 2 Mana): Exploda um cadáver ou esqueleto. Dano 2d6 Necrótico em área (Próximo). Gaste +2 Mana para cada dado extra." },
      { roll: "6",    text: "Lança de Osso (Feitiço)(◈ + 2 Mana): Um projétil que atravessa inimigos em linha reta até Próximo. Dano 2d8 Físico. Gaste +2 Mana para cada dado extra." },
      { roll: "7",    text: "Ossificação (Passiva): Ganhe +3 na CA enquanto tiver pelo menos 3 esqueletos ativos." },
      { roll: "8",    text: "Maldizer (Passiva): Inimigos Próximo sofrem +2 de dano de todos os ataques." },
      { roll: "9",    text: "Drenar Vida (Feitiço)(◈ + 2 Mana): Causa 1d6 de dano Necrótico a um alvo e você recupera a mesma quantia em HP. Gaste +2 Mana para cada dado extra." },
      { roll: "10",   text: "Golem de Argila (◈ + 3 Mana): Em vez de 3 esqueletos, invoca 1 Golem. CA 15 · HP = Nível×3 (mín. 10) · Dano: 1d8 Físico · ATK: mesmo bônus do Necromante. Dura até zerar o HP." },
      { roll: "11",   text: "Dama de Ferro (⟁ + 1 Mana): Inimigos que baterem nos seus esqueletos sofrem 1d4 de dano Físico de volta." },
      { roll: "12",   text: "Sifão de Sangue (⟁ + 1 Mana): Quando um inimigo morre Próximo, você recupera 1d4 de HP." },
      { roll: "13",   text: "Espírito de Ossos (Feitiço)(◈ + 3 Mana): Dispara um espírito que atravessa um alvo. Dano 2d10 Necrótico. Gaste +3 Mana para cada dado extra." },
      { roll: "14",   text: "Parede de Ossos (Feitiço)(◈ + 2 Mana): Cria uma barreira de ossos por 1d4 rodadas. CA 16 e 10 HP. Gaste +1 Mana para cada 10 HP extras." },
      { roll: "15",   text: "Terror (Feitiço)(◈ + 1 Mana por inimigo): Inimigos Próximo devem fugir de você por 1d4 rodadas." },
      { roll: "16",   text: "Maestria de Esqueletos (Passiva): Todos os seus lacaios agora têm +5 HP e +2 de CA. O dano deles aumenta em +1 por faixa de 3 níveis: +1 (Nv 4) · +2 (Nv 7) · +3 (Nv 10)." },
      { roll: "17",   text: "Escudo de Almas (Feitiço)(⟁ + 2 Mana): Se você ficar com HP 0, conjura um feitiço para um esqueleto morrer no seu lugar e você ficar com 1 HP." },
      { roll: "18",   text: "Mago Esqueleto (◈ + 2 Mana): Em vez de 2 Esqueletos, invoca 1 Esqueleto Mago. CA 12 · HP = Nível · Dano: 1d8 Fogo/Gelo/Relâmpago/Necrótico · Alcance: Próximo · ATK: mesmo bônus do Necromante. Dura até zerar o HP." },
      { roll: "19",   text: "Reviver (Feitiço)(◈◈◈ + 3 Mana): Ressuscita um monstro morto para lutar ao seu lado por 3 rodadas. Usa os atributos do Mestre. Não pode ser usado em Bosses." },
      { roll: "20",   text: "Escolha qualquer talento desta lista que você ainda não possua." }
    ]
  },
  {
    id: "paladino",
    nome: "Paladino",
    dv: 8,
    armaduras: ["Leve", "Média", "Pesada"],
    armas: ["Leve", "Média", "Pesada"],
    atribPrimario: ["FOR", "CAR"],
    habilidades: [
      "Auras de Zakarum: No seu turno, escolha uma Aura ativa com ◈. Afeta você e aliados Próximo. Fanatismo: +1 em ataques corpo a corpo. Resistência: +1 na CA.",
      "Golpe Sagrado (Smite)(◇ + 1 Mana): Ao acertar um ataque, adicione seu Nível como dano Radiante extra.",
      "Magia Divina: Usa CAR para conjurar feitiços."
    ],
    talentos: [
      { roll: "1-2",  text: "+2 de Força ou +2 de Carisma." },
      { roll: "3-4",  text: "+1 em ataques corpo a corpo ou +1 em testes de conjuração." },
      { roll: "5",    text: "Vigor (Aura)(◈): Você e aliados Próximo podem se mover o dobro da distância." },
      { roll: "6",    text: "Sacrifício (◈ + 2 Mana): Gaste 1d4 HP para ganhar Vantagem e dano máximo no seu próximo ataque." },
      { roll: "7",    text: "Zelo (◈◈ + 3 Mana): Faça 3 ataques rápidos no mesmo alvo." },
      { roll: "8",    text: "Carga (◈◈ + 1 Mana): Avance em linha reta para Distante e ataque. Se acertar, o alvo cai." },
      { roll: "9",    text: "Setas Sagradas (Feitiço)(◈◈ + 2 Mana): Dispare um raio de luz. Cura 1d6 em aliado ou causa 1d8 de dano Radiante em morto-vivo/demônio. Gaste +2 Mana para cada dado extra." },
      { roll: "10",   text: "Escudo Sagrado (Feitiço)(◈ + 3 Mana): Seu escudo brilha, dando +3 na CA por uma cena." },
      { roll: "11",   text: "Meditação (Aura)(◈): Aliados na aura têm Vantagem para recuperar feitiços durante descansos curtos." },
      { roll: "12",   text: "Punho dos Céus (Feitiço)(◈◈ + 4 Mana): Um raio cai do céu. Dano 2d10 Radiante em um alvo e solta Setas Sagradas (1d10 Radiante) em inimigos Próximo. Gaste +4 Mana para cada dado extra." },
      { roll: "13",   text: "Arremesso Abençoado (◈ + 3 Mana): Arremessa um martelo espiral até Distante. O Martelo causa o dano da arma a cada inimigo que tocar e volta para sua mão." },
      { roll: "14",   text: "Salvação (Aura)(◈): Você e aliados na aura ganham RD 2 a um tipo de dano Elemental (Fogo/Gelo/Relâmpago)." },
      { roll: "15",   text: "Redenção (Aura)(◈): Quando um inimigo morre na aura, você e aliados recuperam 1 de HP." },
      { roll: "16",   text: "Limpeza (Aura)(◈): Reduz pela metade a duração de venenos ou maldições em aliados na aura." },
      { roll: "17",   text: "Mãos de Luz (Feitiço)(◈◈ + 5 Mana): Toque um aliado para curar todo o HP dele." },
      { roll: "18",   text: "Convicção (Aura)(◈): Inimigos na aura perdem 2 de CA (sua fé quebra a proteção deles)." },
      { roll: "19",   text: "Avatar da Justiça (◈◈◈ + 8 Mana): Você canaliza a luz divina pura. Imune a efeitos de controle. Todos os inimigos que começarem o turno Próximo de você sofrem 2d10 de dano Radiante automático. Dura 1d4 rodadas." },
      { roll: "20",   text: "Escolha qualquer talento desta lista que você ainda não possua." }
    ]
  },
  {
    id: "renegada",
    nome: "Renegada",
    dv: 6,
    armaduras: ["Leve"],
    armas: ["Leve", "Média"],
    atribPrimario: ["DES"],
    habilidades: [
      "Ataque Furtivo (⟁): Uma vez por rodada, cause dano extra se tiver Vantagem ou se o inimigo estiver adjacente a um aliado. +1d6 (Nv 1-3) · +2d6 (Nv 4-6) · +3d6 (Nv 7-10).",
      "Imbuimento Rápido (◈ + 1 Mana): Imbui sua arma com 1d4 de dano de Veneno ou Necrótico. O efeito dura até o próximo ataque bem-sucedido."
    ],
    talentos: [
      { roll: "1-2",  text: "+2 de Destreza ou +2 de Constituição." },
      { roll: "3-4",  text: "+1 em ataques (corpo a corpo ou distância) ou +1 na CA." },
      { roll: "5",    text: "Passo de Sombra (◈ + 3 Mana): Teleporte-se para trás de um inimigo Próximo e faça um ataque com Vantagem." },
      { roll: "6",    text: "Disparo Penetrante (◈ + 3 Mana): Sua flecha atravessa todos os inimigos Próximo em linha reta. Causa o dano da arma em cada um deles." },
      { roll: "7",    text: "Lâminas Retorcidas (◈ + 3 Mana): Arremesse 2 armas leves. Após atingir os alvos, as lâminas voltam para você, causando 1d4 de dano Físico às criaturas no caminho." },
      { roll: "8",    text: "Abrojos (Armadilha)(◈ + 1 Mana): Jogue pregos no chão. Inimigos que passarem ficam lentos e sofrem 1d4 de dano Físico." },
      { roll: "9",    text: "Bomba de Fumaça (Armadilha)(◈ + 1 Mana): Inimigos Próximo não podem te ver ou te atacar por 1 rodada." },
      { roll: "10",   text: "Imbuimento de Gelo (Armadilha)(◇ + 3 Mana): Ao acertar uma criatura com um ataque, o alvo fica congelado por 1d4 rodadas. (Salvaguarda de FOR DC 10 + Mod. DES para se libertar)" },
      { roll: "11",   text: "Saraivada (◈ + 3 Mana): Dispare 5 flechas em um arco, atingindo vários inimigos Próximo. Cada flecha causa 1d4 de dano Físico." },
      { roll: "12",   text: "Ocultamento (◈ + 1 Mana): Você pode fazer um teste para se esconder mesmo sem cobertura se ficar imóvel." },
      { roll: "13",   text: "Mestra de Armadilhas (Passiva): Suas armadilhas causam +1d6 de dano extra além dos efeitos normais." },
      { roll: "14",   text: "Clone das Sombras (◈◈ + 3 Mana): Invoque uma sombra que copia seus ataques por 3 rodadas." },
      { roll: "15",   text: "Exploração de Fraqueza (Passiva): Seus ataques críticos agora acontecem com 18-20 natural." },
      { roll: "16",   text: "Chuva de Flechas (◈ + 3 Mana): Cubra uma área Distante com flechas mágicas causando 3d6 de dano Físico. Gaste +3 Mana para cada dado extra." },
      { roll: "17",   text: "Visão Interior (◈ + 3 Mana): Marque um inimigo. Todos os ataques contra ele têm Vantagem por 1d4 rodadas." },
      { roll: "18",   text: "Ímpeto (◈ + 1 Mana): Mova-se o dobro da distância normal e atravesse inimigos sem sofrer ataques de oportunidade." },
      { roll: "19",   text: "Armadilha da Morte (◈◈◈ + 8 Mana): Coloque uma armadilha de energia sombria. Quando ativada, causa 4d8 de dano Necrótico em área Próximo e deixa o terreno maldito por 1d4 rodadas — inimigos que iniciarem o turno na área sofrem 1d6 Necrótico automaticamente." },
      { roll: "20",   text: "Escolha qualquer talento desta lista que você ainda não possua." }
    ]
  },
  {
    id: "sacerdote",
    nome: "Sacerdote",
    dv: 6,
    armaduras: ["Leve", "Média"],
    armas: ["Leve", "Média"],
    atribPrimario: ["SAB"],
    habilidades: [
      "Oração (◈◈): Como duas ações, recupera 1d4 de Mana no seu turno. Pode ser usada uma vez por rodada.",
      "Oração Purificadora (◈): Gaste 1 Mana para curar 1d6 de HP de um aliado Próximo ou causar 1d6 de dano Radiante em inimigos.",
      "Voto de Castidade (Passiva): Se não usar armas de metal ou armaduras, ganha Vantagem em todos os testes de conjuração de magias sagradas.",
      "Feitiço Básico: Role 1d8 para definir seu feitiço inicial."
    ],
    talentos: [
      { roll: "1-2",  text: "+2 de Sabedoria ou +2 de Constituição." },
      { roll: "3-4",  text: "+1 em testes de conjuração ou +2 Mana máximo." },
      { roll: "5",    text: "Halo de Luz (Passiva): Você emite uma luz constante (alcance Curto). Inimigos têm -1 nos ataques contra você." },
      { roll: "6",    text: "Palavra de Poder (◈ + 1 Mana): Gaste 1 Mana para dar +3 de CA a um aliado por 1d4 rodadas." },
      { roll: "7",    text: "Exorcismo (Feitiço)(◈ + 2 Mana): Inimigos Mortos-vivos ou demônios Próximo sofrem 3d6 Radiante e fogem." },
      { roll: "8",    text: "Bênção (Feitiço)(◈ + 1 Mana por aliado): Aliados Próximo ganham +1 em todos os testes por 1d4 rodadas." },
      { roll: "9",    text: "Penitência (◈): Você pode perder 1d4 de HP para recuperar 4 Mana imediatamente." },
      { roll: "10",   text: "Prece de Recomposição (Feitiço)(◈ + 2 Mana por aliado): Um aliado Próximo recupera 1d4 de HP toda vez que sofrer dano (dura 3 rodadas)." },
      { roll: "11",   text: "Chamas Sagradas (Passiva): Sua arma causa +1d6 de dano Radiante extra." },
      { roll: "12",   text: "Purificação (Feitiço)(◈ + 2 Mana por efeito): Remova instantaneamente um efeito de Veneno, Maldição ou Paralisia de um aliado. Se gastar +6 Mana também cura 3d6 ao aliado." },
      { roll: "13",   text: "Salmo de Proteção (Feitiço)(◈ + 2 Mana por aliado): Você e aliados Próximo ganham RD 5 a dano Mágico por 1d4 rodadas." },
      { roll: "14",   text: "Salto de Fé (Feitiço)(◈ + 2 Mana por aliado): Puxe um aliado de Distante para o seu lado instantaneamente." },
      { roll: "15",   text: "Intervenção Divina (⟁): Gaste 5 Mana. Se um aliado ficar com HP 0, ele fica com 1 HP em vez disso." },
      { roll: "16",   text: "Anjo da Guarda (Feitiço)(◈ + 2 Mana por aliado): Invoca um espírito de luz que concede Vantagem em testes para aliados Próximo por 1d4 rodadas." },
      { roll: "17",   text: "Confissão (◈◈◈): Gaste 3 Mana por inimigo para que perca o próximo turno 'contando seus pecados'." },
      { roll: "18",   text: "Nova Sagrada (Feitiço)(◈◈ + 2 Mana): Uma explosão de luz. Cura aliados Próximo em 1d8 e causa 1d8 de dano em inimigos. Gaste +2 Mana para cada dado extra." },
      { roll: "19",   text: "Arcanjo Guardião (◈◈◈ + 8 Mana): Invoca um Arcanjo por 1d4 rodadas. Como ◇, ele cura 1d8 HP de um aliado OU causa 2d8 Radiante a um inimigo Próximo. CA 16 · HP = seu HP máximo." },
      { roll: "20",   text: "Escolha qualquer talento desta lista que você ainda não possua." }
    ]
  },
  {
    id: "warlock",
    nome: "Warlock",
    dv: 6,
    armaduras: ["Leve", "Média"],
    armas: ["Leve"],
    atribPrimario: ["INT", "CAR"],
    habilidades: [
      "Ligação Demoníaca: Pode conjurar demônios para lutar ao seu lado. Sumonar Homem Cabra (◈ + 1 Mana): CA 13 · HP = Nível×2 (mín. 5) · Dano: 1d6 Físico · ATK: mesmo bônus do Warlock.",
      "Pacto de Sangue (◈): Sacrifique 1d6 HP para recuperar 1d4 de Mana.",
      "Mestre das Maldições (Passiva): Inimigos sob efeito de suas maldições concedem Vantagem para aliados que os atacam corpo a corpo.",
      "Mestre da Levitação (Passiva): Pode levitar sua arma com a mente. Usa INT ou CAR nos ataques com a arma flutuante. Equipa outras 2 armas nos slots restantes.",
      "Feitiço Básico: Role 1d10 para definir seu feitiço inicial."
    ],
    talentos: [
      { roll: "1-2",  text: "+2 de Inteligência ou +2 de Carisma." },
      { roll: "3-4",  text: "+1 em testes de conjuração ou +2 no limite de lacaios." },
      { roll: "5",    text: "Maestria Demoníaca (Passiva): Seus demônios ganham HP dobrado, +1 zona de movimento e +1d6 de dano." },
      { roll: "6",    text: "Marca da Morte (Feitiço)(◈ + 1 Mana por demônio): Teleporta seus demônios para um inimigo Próximo e os permite fazer um ataque." },
      { roll: "7",    text: "Sumonar Corrompido (Feitiço)(◈ + 3 Mana): Conjura um demônio reptiliano. CA 15 · HP = Nível×3 (mín. 10) · Dano: 2d6 Fogo · ATK: mesmo bônus do Warlock · RD 5 Fogo. Dura até zerar o HP." },
      { roll: "8",    text: "Sumonar Profanador (Feitiço)(◈ + 3 Mana por inimigo): Conjura um demônio de carne flutuante. Enquanto vivo, vincula o HP dos inimigos alvo — todos sofrem o mesmo dano que qualquer um deles receber." },
      { roll: "9",    text: "Ferver Sangue (Feitiço)(◈ + 1 Mana por 5 HP): Você consome 5 HP de um dos seus demônios para causar 1d8 de dano de Fogo a inimigos adjacentes." },
      { roll: "10",   text: "Engordar (Feitiço)(◈ + 1 Mana): Seu Demônio consome um cadáver e cura 1d4 HP." },
      { roll: "11",   text: "Consumir (Feitiço)(◈ + 1 Mana): Sacrifique um de seus demônios para se curar. Você recupera HP igual ao total do demônio ao conjurar essa habilidade." },
      { roll: "12",   text: "Aprisionar Demônio (Feitiço)(◈ + 1 Mana por 5 HP): Force um demônio com menos de 5 HP a fazer sua vontade. Não é possível aprisionar Bosses." },
      { roll: "13",   text: "Anel de Fogo (Feitiço)(◈ + 2 Mana): Dispara um anel de Fogo de si, causando 2d6 de Fogo e empurrando inimigos. Gaste +2 Mana para cada dado extra." },
      { roll: "14",   text: "Apocalipse (Feitiço)(◈◈ + 2 Mana): Cria um pentagrama Próximo que engolfa inimigos com 2d6 de Fogo e remove resistência a Fogo. Gaste +2 Mana para cada dado extra." },
      { roll: "15",   text: "Maestria em Levitação (Passiva): Você dobra o bônus do Atributo Primário nos ataques e dano de sua arma flutuante." },
      { roll: "16",   text: "Proteção Psíquica (⟁ + 2 Mana por 5 HP): Crie um escudo mental que reduz 5 HP quando sofre dano." },
      { roll: "17",   text: "Maldição de Expurgo (Feitiço)(◈ + 2 Mana): Amaldiçoe sua arma para que no próximo ataque que acertar, ela cause 3d6 de dano de Fogo a inimigos adjacentes ao alvo. Gaste +2 Mana para cada dado extra." },
      { roll: "18",   text: "Lâminas Espelhadas (◈ + 3 Mana por duplicata): Com apenas uma ação, você ataca com duplicatas da sua arma flutuante." },
      { roll: "19",   text: "Forma Demoníaca (◈◈◈ + 8 Mana): Você se transforma em um demônio por 1d4 rodadas. Ganha +5 de Força e 20 HP temporários. Com ◈ faz 2 ataques de garra (2d6 Fogo + Mod. Primário) ou 1 ataque laser (3d6 Fogo, alcance Longo)." },
      { roll: "20",   text: "Escolha qualquer talento desta lista que você ainda não possua." }
    ]
  }
];

// ─── Equipamentos ───
const ARMADURA_INFO = {
  'Couro':           { tipo: 'Leve',   rdFisico: 0, reqFOR: 0,  ruido: false },
  'Couro Reforçado': { tipo: 'Leve',   rdFisico: 1, reqFOR: 0,  ruido: false },
  'Brunea':          { tipo: 'Média',  rdFisico: 1, reqFOR: 11, ruido: false },
  'Cota de Malha':   { tipo: 'Média',  rdFisico: 2, reqFOR: 11, ruido: false },
  'Meia-Placa':      { tipo: 'Pesada', rdFisico: 2, reqFOR: 13, ruido: true  },
  'Placa Completa':  { tipo: 'Pesada', rdFisico: 3, reqFOR: 13, ruido: true  },
};

// Bônus de CA por slot e tipo de armadura
const ARMADURA_PECAS = {
  '':                { elmo: 0, peito: 0, luvas: 0, perneiras: 0, botas: 0 },
  'Couro':           { elmo: 0, peito: 2, luvas: 0, perneiras: 1, botas: 0 },
  'Couro Reforçado': { elmo: 1, peito: 2, luvas: 0, perneiras: 1, botas: 0 },
  'Brunea':          { elmo: 1, peito: 2, luvas: 0, perneiras: 2, botas: 0 },
  'Cota de Malha':   { elmo: 1, peito: 2, luvas: 1, perneiras: 2, botas: 0 },
  'Meia-Placa':      { elmo: 1, peito: 3, luvas: 1, perneiras: 2, botas: 0 },
  'Placa Completa':  { elmo: 1, peito: 3, luvas: 1, perneiras: 2, botas: 1 },
};

const ARMADURA_OPTS = [
  { v: '',                l: 'Sem peça' },
  { v: 'Couro',           l: 'Couro' },
  { v: 'Couro Reforçado', l: 'Couro Reforçado' },
  { v: 'Brunea',          l: 'Brunea' },
  { v: 'Cota de Malha',   l: 'Cota de Malha' },
  { v: 'Meia-Placa',      l: 'Meia-Placa' },
  { v: 'Placa Completa',  l: 'Placa Completa' },
];

const ITENS_CLASSE = {
  'amazona':          'Aljava de Batalha',
  'arcanista':        'Orbe Arcano',
  'assassina':        'Kit de Armadilhas',
  'barbaro':          'Totem Ancestral',
  'cacador-demonios': 'Aljava Sombria',
  'cavaleiro-sangue': 'Cálice de Sangue',
  'cruzado':          'Filogênio Sagrado',
  'druida':           'Totem Druídico',
  'feiticeiro':       'Mojo',
  'guerreiro':        'Pedra de Afiação',
  'mago':             'Tomo de Magias',
  'monge':            'Faixa Sagrada',
  'natispirito':      'Cristal de Espírito',
  'necromante':       'Filogênio',
  'paladino':         'Relíquia',
  'renegada':         'Carcaj de Sombra',
  'sacerdote':        'Símbolo Sagrado',
  'warlock':          'Grimório',
};

const ARMAS_LISTA = [
  'Porrete (1d4 · Leve)',
  'Adaga (1d4 · Leve, Finesse, Arremesso)',
  'Foice / Sickle (1d4 · Leve, Finesse)',
  'Katar / Garra (1d4 · Leve, Finesse, Sangramento)',
  'Martelo Leve (1d4 · Leve, Arremesso)',
  'Varinha (1d4 · Foco Mágico)',
  'Machado de Mão (1d6 · Leve, Arremesso)',
  'Cimitarra (1d6 · Leve, Finesse)',
  'Espada Curta (1d6 · Leve, Finesse)',
  'Maça (1d6 · Arremesso)',
  'Tridente (1d6 · Versátil 1d8, Arremesso)',
  'Cestus / Punho (1d6 · Leve, Inapreensível)',
  'Espada Longa (1d8 · Versátil 1d10)',
  'Machado de Guerra (1d8 · Versátil 1d10)',
  'Maça Grande (1d8)',
  'Mangual (1d8 · Imparável)',
  'Estrela da Manhã (1d8 · Penetrante)',
  'Martelo de Guerra (1d8 · Versátil 1d10)',
  'Rapieira (1d8 · Finesse)',
  'Picareta de Guerra (1d8 · Penetrante)',
  'Cajado (1d6 · 2H, Foco Mágico, Haste)',
  'Lança (1d8 · 2H, Haste, Arremesso)',
  'Alabarda (1d10 · 2H, Haste)',
  'Glaive (1d10 · 2H, Haste, Trespassar)',
  'Pica (1d10 · 2H, Haste)',
  'Foice de Guerra (1d10 · 2H, Finesse, Trespassar)',
  'Machado Grande (2d8 · 2H, Trespassar)',
  'Maul / Marreta (2d8 · 2H)',
  'Lança de Montaria (1d12 · 2H, Haste, Pesada)',
  'Espada Montante (2d10 · 2H, Brutal, Pesada)',
  'Funda (1d4 · Alcance Curto)',
  'Dardos (1d4 · Arremesso Curto)',
  'Azagaia (1d6 · Arremesso Próximo)',
  'Faca de Arremesso (1d4 · Leve, Arremesso Próximo)',
  'Arco Curto (1d6 · Distante, 2H)',
  'Arco Longo (1d8 · Distante, 2H)',
  'Besta Leve (1d8 · Distante, Carga)',
  'Besta Pesada (1d10 · Distante, Carga, 2H)',
];

const TITULOS = [
  // Origem
  { id: 'khanduras',       nome: 'O Sobrevivente de Khanduras',      grupo: 'Origem',       efeito: 'Nascido nas Sombras: Vantagem em testes para resistir a Medo ou Loucura. Caso falhe, pode rolar novamente.' },
  { id: 'kehjistan',       nome: 'O Erudito de Kehjistan',           grupo: 'Origem',       efeito: 'Afinidade Elemental: Ao final de cada descanso longo, escolha um elemento. Você ganha RD 3 a esse elemento até o próximo descanso.' },
  { id: 'arreat',          nome: 'O Filho de Arreat',                grupo: 'Origem',       efeito: 'Sangue da Montanha: Ignora penalidades de Terreno Difícil Natural e ganha +1d6 em testes de CON.' },
  { id: 'scosglen',        nome: 'O Andarilho de Scosglen',          grupo: 'Origem',       efeito: 'Conhecimento de Ervas: Ao beber uma Poção ou ser curado por magia, recupera +2 HP adicionais.' },
  { id: 'entsteig',        nome: 'O Espião de Entsteig',             grupo: 'Origem',       efeito: 'Primeiro a Atirar: Na primeira rodada de combate, deslocamento dobrado e +1 CA.' },
  { id: 'westmarch',       nome: 'O Duelista de Westmarch',          grupo: 'Origem',       efeito: 'Falange: Enquanto adjacente a um aliado, +2 CA.' },
  { id: 'terras-pavorosas',nome: 'O Renegado das Terras Pavorosas',  grupo: 'Origem',       efeito: 'Instinto de Presa: Nunca surpreendido durante descanso; +2 em testes na primeira rodada.' },
  { id: 'torajan',         nome: 'O Herdeiro de Torajan',            grupo: 'Origem',       efeito: 'Imunidade Tropical: RD 3 a Veneno e Vantagem em testes contra doenças.' },
  { id: 'ivgorod',         nome: 'O Peregrino de Ivgorod',           grupo: 'Origem',       efeito: 'Equilíbrio Interior: Gaste ◈ para meditar; até o fim do próximo turno, +1 em todos os testes.' },
  { id: 'skovos',          nome: 'O Oráculo de Skovos',              grupo: 'Origem',       efeito: 'Olho da Tempestade: Ignora penalidades de distância em ataques à distância; enxerga o dobro em luz fraca.' },
  { id: 'xiansai',         nome: 'O Mercador de Xiansai',            grupo: 'Origem',       efeito: 'Sorte dos Sete: Uma vez por sessão, transforme uma Falha em Sucesso.' },
  { id: 'hawezar',         nome: 'O Penitente de Hawezar',           grupo: 'Origem',       efeito: 'Estômago de Ferro: Imune à Exaustão por viagens; Vantagem em testes com penalidades de fome.' },
  // Conquista — Brutalidade
  { id: 'arauto-da-dor',   nome: 'Arauto da Dor',                    grupo: 'Brutalidade',  efeito: 'Seus Acertos Críticos causam 3 dados de Dano em vez de 2.' },
  { id: 'ceifador',        nome: 'O Ceifador',                       grupo: 'Brutalidade',  efeito: 'Impulso de Morte: Ao reduzir inimigo a 0 PV, ganha uma Ação de Movimento grátis.' },
  { id: 'matador-demonios',nome: 'Matador de Demônios',              grupo: 'Brutalidade',  efeito: 'Começa combates contra Demônios com 10 PV extra.' },
  { id: 'punho-ferro',     nome: 'Punho de Ferro',                   grupo: 'Brutalidade',  efeito: 'Precisão: Ignora penalidades de Cobertura Leve e Escudos em ataques.' },
  // Conquista — Sobrevivência
  { id: 'imortal',         nome: 'O Imortal',                        grupo: 'Sobrevivência',efeito: 'Uma vez por dia, se cair a 0 PV, fica com 1 PV ao invés.' },
  { id: 'muralha-viva',    nome: 'Muralha Viva',                     grupo: 'Sobrevivência',efeito: 'Defesa Base aumenta permanentemente em +1.' },
  { id: 'sangue-ferro',    nome: 'Sangue de Ferro',                  grupo: 'Sobrevivência',efeito: 'Vantagem em testes para resistir a efeitos de status.' },
  // Conquista — Fortuna
  { id: 'mao-destino',     nome: 'Mão do Destino',                   grupo: 'Fortuna',      efeito: 'Uma vez por sessão, pode transformar qualquer dado em um 20.' },
  { id: 'barao-ouro',      nome: 'Barão de Ouro',                    grupo: 'Fortuna',      efeito: 'Compra itens Raros em lojas comuns; 20% de desconto.' },
  { id: 'senhor-azar',     nome: 'Senhor do Azar',                   grupo: 'Fortuna',      efeito: 'Karma: Quando rolar Falha Crítica (1), pode transformar em 20.' },
  // Conquista — Exploração
  { id: 'mestre-chaves',   nome: 'Mestre das Chaves',                grupo: 'Exploração',   efeito: 'Destrancar fechaduras torna-se Ação Livre (uma vez por turno).' },
  { id: 'horadrim',        nome: 'O Horadrim',                       grupo: 'Exploração',   efeito: 'Saber Ancestral: Identifica itens ao tocar; +1d20 em testes de Misticismo.' },
];

const ANTECEDENTES = [
  { id: 'soldado',    nome: 'Soldado',    efeito: 'Disciplina de Combate: Uma vez por cena, gaste ◇ para ganhar +2 CA até o início do próximo turno.' },
  { id: 'sobrevivente', nome: 'Sobrevivente', efeito: 'Instinto de Sobrevivência: Quando PV cai à metade, ganha Vantagem em DES e movimento até o fim do combate.' },
  { id: 'alquimista', nome: 'Alquimista', efeito: 'Mestre de Poções: Ao usar uma poção, recupere +1d4 adicional de PV ou Mana.' },
  { id: 'ferreiro',   nome: 'Ferreiro',   efeito: 'Trabalho em Metal: Identifica armas e armaduras ao tocá-las. Itens usados demoram o dobro para desgastar.' },
  { id: 'eremita',    nome: 'Eremita',    efeito: 'Autossuficiência: Nunca precisa rolar para encontrar alimento na natureza. Vantagem para perceber perigos.' },
  { id: 'mercador',   nome: 'Mercador',   efeito: 'Olho de Negociante: Sabe o valor real de qualquer item. Uma vez por sessão, compra ou vende por 20% fora do preço.' },
  { id: 'devoto',     nome: 'Devoto',     efeito: 'Fé Inabalável: Uma vez por descanso longo, toque um aliado (◈) para restaurar 1d8 PV. A 0 PV, restaura 2d8.' },
  { id: 'criminoso',  nome: 'Criminoso',  efeito: 'Mãos Ágeis: Vantagem para esconder objetos, abrir fechaduras ou agir furtivamente. Nunca surpreendido em ambientes urbanos.' },
  { id: 'estudioso',  nome: 'Estudioso',  efeito: 'Conhecimento Proibido: Vantagem em INT para identificar demônios e artefatos. Mestre revela info extra uma vez por sessão.' },
  { id: 'cacador',    nome: 'Caçador',    efeito: 'Rastejador: Vantagem em rastreamento e DES para mover silenciosamente. Nunca surpreendido em ambientes naturais.' },
  { id: 'guarda',     nome: 'Guarda',     efeito: 'Postura de Guarda: Quando aliado adjacente sofre ataque, use ⟁ para reduzir o dano por 1d6.' },
  { id: 'renegado',   nome: 'Renegado',   efeito: 'Conhecimento do Inimigo: Uma vez por cena, revele a fraqueza de um demônio como ◇ — aliados ganham Vantagem em um ataque.' },
];

// Helper: encontrar classe por id
function getClasse(id) {
  return CLASSES.find(c => c.id === id);
}

// Calcular modificador de atributo
function mod(valor) {
  return Math.floor((valor - 10) / 2);
}

// Calcular Mana máximo
function calcManaMax(nivel, atribPrimVal) {
  return 10 + mod(atribPrimVal) + nivel;
}

// Calcular PV máximo (média do DV + CON por nível)
function calcPVMax(nivel, dv, conVal) {
  // Nível 1: máximo do dado; demais: média (+1) + CON
  const modCON = mod(conVal);
  return dv + (nivel - 1) * (Math.floor(dv / 2) + 1 + modCON) + modCON;
}

// CA baseada em peças individuais de armadura
// items opcional: array de itens do personagem (p.items)
function calcCAFromEquip(cls, attrs, equip, escudo, items) {
  function getArmorTipo(slot) {
    if (Array.isArray(items)) {
      var it = items.find(function(i) { return i.equipadoEm === slot && i.tipoArmadura; });
      if (it) return it.tipoArmadura;
    }
    return (equip && equip[slot]) ? equip[slot] : '';
  }

  const peito = getArmorTipo('peito');
  const info = ARMADURA_INFO[peito];
  const tipo = info ? info.tipo : '';
  const desMod = mod(attrs.DES || 10);

  if (!peito) {
    // Sem armadura: regras especiais de classe
    let base = 10 + desMod;
    if (cls && cls.id === 'arcanista') base = 10 + mod(attrs.INT || 10);
    else if (cls && cls.id === 'monge') base = 10 + mod(attrs.DES || 10) + mod(attrs.SAB || 10);
    else if (cls && cls.id === 'barbaro') base = 10 + mod(attrs.DES || 10) + mod(attrs.CON || 10);
    return base + escudoBonus(escudo);
  }

  let ca = 10;
  ['elmo', 'peito', 'luvas', 'perneiras', 'botas'].forEach(slot => {
    // Armor is a single item (equipped to 'peito'). If a slot has no specific
    // item, fall back to the peito armor type so the full set CA is calculated.
    const pType = getArmorTipo(slot) || peito;
    ca += ((ARMADURA_PECAS[pType] || {})[slot]) || 0;
  });

  if (tipo === 'Leve') ca += desMod;
  else if (tipo === 'Média') ca += Math.min(desMod, 2);
  // Pesada: sem DES

  return ca + escudoBonus(escudo);
}

// Retorna a RD Física baseada no peitoral equipado
function calcRDFisico(equip) {
  const peito = (equip && equip.peito) ? equip.peito : '';
  return (ARMADURA_INFO[peito] && ARMADURA_INFO[peito].rdFisico) || 0;
}

// Mantido para compatibilidade com saves antigos
function calcCABase(classe, attrs, armaduraEquipada) {
  const fakeEquip = { peito: armaduraEquipada || '', elmo: '', luvas: '', perneiras: '', botas: '' };
  return calcCAFromEquip(classe, attrs, fakeEquip, '');
}

// Bônus de escudo na CA
function escudoBonus(escudo) {
  return { 'Broquel': 1, 'Escudo': 2, 'Escudo de Torre': 3 }[escudo] || 0;
}

// Soma bônus de todos os itens equipados (p.items array)
function calcBonusFromItems(items) {
  var bonus = { ca: 0, atk: 0, dano: 0, rdFisico: 0, rdTodos: 0, manaMax: 0 };
  if (!items) return bonus;
  items.forEach(function(item) {
    if (!item.equipadoEm) return;
    bonus.ca      += item.bonusCA       || 0;
    bonus.atk     += item.bonusATK      || 0;
    bonus.dano    += item.bonusDano     || 0;
    bonus.rdFisico+= item.bonusRDFisico || 0;
    bonus.rdTodos += item.bonusRDTodos  || 0;
    bonus.manaMax += item.bonusManaMax  || 0;
  });
  return bonus;
}

// Talentos Gerais (Cap. 5) — 6 tabelas, qualquer classe pode rolar
const TALENTOS_GERAIS = [
  {
    id: 'combate', nome: 'Tabela 1: Combate',
    talentos: [
      { roll: '1',  text: 'Pele Grossa: +3 de HP máximos permanentes.' },
      { roll: '2',  text: 'Reflexo Instintivo: Quando toma dano de uma fonte que pode ver, use ⟁ para reduzir o dano em 1d6 (sem custo de Mana).' },
      { roll: '3',  text: 'Foco Mortal: Uma vez por turno, gaste 1 Mana para adicionar +1d6 de dano a um ataque bem-sucedido.' },
      { roll: '4',  text: 'Espírito de Batalha: Vantagem em Salvaguardas para resistir a condições (Medo, Paralisia, etc.) durante combate.' },
      { roll: '5',  text: 'Golpe Ensurdecedor: Após acertar corpo a corpo, gaste 2 Mana para impor Desvantagem no próximo ataque do alvo.' },
      { roll: '6',  text: 'Destruidor de Escudos: Seus ataques ignoram o bônus de CA de escudos.' },
      { roll: '7',  text: 'Instinto de Predador: Vantagem em ataques contra alvos que ainda não agiram no combate (primeiro turno do encontro).' },
      { roll: '8',  text: 'Guerreiro Veterano: Uma vez por cena, role novamente uma jogada de ataque e fique com o melhor resultado.' },
      { roll: '9',  text: 'Sangue Frio: Sem Desvantagem em ataques por estar adjacente a múltiplos inimigos.' },
      { roll: '10', text: 'Perseguidor: Quando um inimigo usa Desengajar, você pode se mover Próximo como ⟁ sem custo de PA.' },
      { roll: '11', text: 'Marca de Morte: Ao reduzir um inimigo a 0 PV, seu próximo ataque no mesmo turno tem Vantagem.' },
      { roll: '12', text: 'Agressor: Ao se mover em direção a um inimigo e atacar no mesmo turno, adicione +1d4 ao dano.' },
      { roll: '13', text: 'Ataque Giratório: Como ◈◈, ataque todos os inimigos adjacentes. Role um ataque para cada um.' },
      { roll: '14', text: 'Provocação: Como ◈, force um inimigo a mirar só você até o início do seu próximo turno — seus aliados têm Vantagem contra esse alvo enquanto ele te vê.' },
      { roll: '15', text: 'Recuperação em Combate: Uma vez por cena, recupere 1d6 PV como ◇ durante seu turno.' },
      { roll: '16', text: 'Resistência ao Dano: Você ganha RD 2 contra dano físico (cortante, perfurante, contundente).' },
      { roll: '17', text: 'Fortaleza de Aço: Usando armadura Pesada, ignore a primeira fonte de Desvantagem por turno.' },
      { roll: '18', text: 'Golpe Crítico Aprimorado: Seus Acertos Críticos causam 3 dados de dano em vez de 2.' },
      { roll: '19', text: 'Força da Desesperança: Enquanto com menos de 25% dos PV máximos, Vantagem em ataques.' },
      { roll: '20', text: 'Lenda do Combate: Escolha qualquer outro talento desta tabela. Você o ganha permanentemente.' }
    ]
  },
  {
    id: 'magia', nome: 'Tabela 2: Magia',
    talentos: [
      { roll: '1',  text: 'Reservatório Expandido: +5 de Mana máximo permanentes.' },
      { roll: '2',  text: 'Foco Arcano: Ao passar num teste de conjuração, recupere 1 Mana.' },
      { roll: '3',  text: 'Resistência Mágica: Vantagem em Salvaguardas contra magias e efeitos sobrenaturais.' },
      { roll: '4',  text: 'Amplificador Elemental: Escolha um elemento (Fogo, Gelo, Raio, Veneno). Seus feitiços desse elemento causam +1d6 adicional.' },
      { roll: '5',  text: 'Conjuração Silenciosa: Você conjura sem gestos visíveis ou sons. Inimigos não identificam de onde veio a magia.' },
      { roll: '6',  text: 'Recuperação de Mana: Durante um Descanso Curto, recupere Mana adicional igual ao seu Nível.' },
      { roll: '7',  text: 'Contrafeitiço: Como ⟁ + 4 Mana, interrompa um feitiço inimigo que você possa ver sendo conjurado.' },
      { roll: '8',  text: 'Infusão de Mana: Como ◈ + 2 Mana, conceda 3 Mana a um aliado adjacente.' },
      { roll: '9',  text: 'Alcance Estendido: Feitiços com alcance Curto passam a alcançar Distante.' },
      { roll: '10', text: 'Poder Bruto: Uma vez por cena, dobre o dado de dano de um feitiço (gaste 4 Mana extra).' },
      { roll: '11', text: 'Catalisador Natural: Você não precisa de um catalisador físico para conjurar — suas mãos servem como foco.' },
      { roll: '12', text: 'Mente de Ferro: Seu Mana máximo não pode ser reduzido por efeitos externos.' },
      { roll: '13', text: 'Explosão de Burnout: Ao entrar em Burnout (Mana 0), cause 2d6 de dano Arcano em todos os adjacentes como ⟁.' },
      { roll: '14', text: 'Absorção Mágica: Ao sofrer dano de magia, recupere 1 Mana para cada 5 pontos de dano recebido.' },
      { roll: '15', text: 'Conjurador Rápido: Uma vez por cena, conjure um feitiço de ◈◈ como ◈ (gaste 2 Mana extra).' },
      { roll: '16', text: 'Maestria na Falha: Ao rolar 1 Natural numa conjuração, gaste 5 Mana para ignorar a Malfunção Mágica.' },
      { roll: '17', text: 'Roubo de Mana: Seus ataques recuperam 1 Mana ao acertar um Golpe Fatal ou Crítico.' },
      { roll: '18', text: 'Dupla Conjuração: Uma vez por descanso longo, conjure dois feitiços no mesmo turno (◈◈◈ + Mana de ambos).' },
      { roll: '19', text: 'Escudo Arcano: Como ⟁, gaste 3 Mana para negar completamente um dano.' },
      { roll: '20', text: 'Maestria Arcana: Escolha qualquer outro talento desta tabela. Você o ganha permanentemente.' }
    ]
  },
  {
    id: 'sobrevivencia', nome: 'Tabela 3: Sobrevivência',
    talentos: [
      { roll: '1',  text: 'Pele de Pedra: RD 1 permanente contra todo dano físico.' },
      { roll: '2',  text: 'Segundo Fôlego: Uma vez por cena, como ◇, recupere 1d8+Nível PV.' },
      { roll: '3',  text: 'Resistência a Venenos: Vantagem em Salvaguardas contra veneno e doenças.' },
      { roll: '4',  text: 'Cicatrização Acelerada: No início de cada Descanso Curto, recupere 1d4 PV automaticamente.' },
      { roll: '5',  text: 'Corpo Forjado: Ignore o primeiro nível de Exaustão em qualquer teste.' },
      { roll: '6',  text: 'Resistência ao Frio: Imune a penalidades de clima frio. RD 3 contra dano de gelo.' },
      { roll: '7',  text: 'Resistência ao Calor: Imune a penalidades de clima quente. RD 3 contra dano de fogo.' },
      { roll: '8',  text: 'Caminhante das Sombras: Você enxerga normalmente em escuridão total até uma distância Próximo.' },
      { roll: '9',  text: 'Sono Leve: Você recupera os benefícios de Descanso Longo em 4 horas em vez de 8.' },
      { roll: '10', text: 'Reflexo de Queda: Sem dano em quedas de até 6 metros. Acima disso, o dano é reduzido à metade.' },
      { roll: '11', text: 'Vontade da Desesperança: Enquanto com menos de 25% dos PV máximos, Vantagem em Salvaguardas.' },
      { roll: '12', text: 'Adaptação: Após sofrer o mesmo tipo de dano três vezes no mesmo combate, você ganha RD 3 contra ele pelo resto do combate.' },
      { roll: '13', text: 'Vontade de Ferro: Vantagem em todas as Salvaguardas de SAB e CAR.' },
      { roll: '14', text: 'Recuperação Mística: Ao matar um inimigo, recupere 1d4 PV.' },
      { roll: '15', text: 'Pulmões de Aço: Segure a respiração por 10 minutos. Vantagem em testes de CON por exaustão física.' },
      { roll: '16', text: 'Estômago de Ferro: Imune a penalidades de fome e sede por até 3 dias.' },
      { roll: '17', text: 'Tenazes: Ao ser estabilizado após cair a 0 PV, você acorda com 1d4 PV em vez de 1.' },
      { roll: '18', text: 'Cicatriz de Batalha: Para cada cicatriz permanente que você carrega, +1 em Salvaguardas de CON.' },
      { roll: '19', text: 'Imortal em Treinamento: Ao falhar numa Salvaguarda de morte (0 PV), role 1d6. No 6, você fica com 1 PV.' },
      { roll: '20', text: 'Lendário Sobrevivente: Escolha qualquer outro talento desta tabela. Você o ganha permanentemente.' }
    ]
  },
  {
    id: 'social', nome: 'Tabela 4: Social',
    talentos: [
      { roll: '1',  text: 'Voz de Comando: Uma vez por cena, como ◇, dê uma ordem a um aliado — ele pode se mover Próximo como ⟁ sem custo de PA.' },
      { roll: '2',  text: 'Intimidação: Como ◈, force um inimigo a rolar Salvaguarda de SAB ou CAR (DC 10 + Nível) ou ficar com Desvantagem nos ataques até o fim do turno dele.' },
      { roll: '3',  text: 'Presença Imponente: Vantagem em testes de CAR para intimidar, persuadir ou impressionar NPCs.' },
      { roll: '4',  text: 'Grito de Guerra: Como ◇, todos os aliados que puderem te ouvir ganham +1 em ataques no próximo turno.' },
      { roll: '5',  text: 'Rede de Contatos: Em qualquer cidade ou assentamento, você sempre conhece alguém. Uma vez por sessão, o Mestre apresenta um contato local.' },
      { roll: '6',  text: 'Interrogação: Vantagem em testes para extrair informação de prisioneiros, suspeitos ou testemunhas.' },
      { roll: '7',  text: 'Liderança de Campo: Aliados adjacentes têm +1 em Salvaguardas enquanto você estiver de pé e consciente.' },
      { roll: '8',  text: 'Mentiroso Habilidoso: Vantagem em testes para enganar ou disfarçar intenções.' },
      { roll: '9',  text: 'Fama e Medo: Quando seu nome é mencionado em combate (como ◇), inimigos com inteligência média ou menor rolam Salvaguarda de SAB (DC 10 + Nível) ou recuam Próximo.' },
      { roll: '10', text: 'Diplomata: Você pode tentar encerrar um combate por negociação como ◈◈. Funciona apenas uma vez por cena.' },
      { roll: '11', text: 'Inspiração: Uma vez por descanso longo, como ◈, conceda a um aliado Vantagem em qualquer teste ou ataque à escolha dele.' },
      { roll: '12', text: 'Moral de Ferro: Aliados que puderem te ouvir são imunes ao efeito Medo enquanto você estiver consciente.' },
      { roll: '13', text: 'Provocador: Como ◈, insulte um inimigo inteligente. Ele tem Vantagem para atacar você, mas Desvantagem para atacar seus aliados até o fim do próximo turno dele.' },
      { roll: '14', text: 'Passagem Segura: Uma vez por sessão, você pode negociar passagem segura por território inimigo sem combate.' },
      { roll: '15', text: 'Leitura de Intenção: Vantagem em testes de SAB para perceber mentiras, armadilhas sociais ou emboscadas disfarçadas de negociação.' },
      { roll: '16', text: 'Reputação de Guerreiro: Inimigos que conhecem seu nome começam o combate com Desvantagem na primeira Salvaguarda que fizerem.' },
      { roll: '17', text: 'Aliado Improvável: Uma vez por sessão, convença um NPC neutro ou hostil a ajudar o grupo por uma cena.' },
      { roll: '18', text: 'Carisma Sobrenatural: Você pode usar CAR em vez de qualquer outro atributo em testes de interação social.' },
      { roll: '19', text: 'Discurso Inspirador: Durante um Descanso Curto, faça um discurso. Todos os aliados que ouvirem recuperam +1d4 PV extra além do normal.' },
      { roll: '20', text: 'Lenda Viva: Escolha qualquer outro talento desta tabela. Você o ganha permanentemente.' }
    ]
  },
  {
    id: 'exploracao', nome: 'Tabela 5: Exploração',
    talentos: [
      { roll: '1',  text: 'Sentidos Aguçados: Vantagem em testes de SAB para perceber perigos, armadilhas ou criaturas escondidas.' },
      { roll: '2',  text: 'Rastreador: Você segue rastros automaticamente em terreno natural. Em terreno urbano, Vantagem no teste.' },
      { roll: '3',  text: 'Escalador Nato: Você escala superfícies sem teste em condições normais. Em condições adversas, Vantagem.' },
      { roll: '4',  text: 'Faro de Tesouro: Vantagem em testes para encontrar itens escondidos, compartimentos secretos ou saídas ocultas.' },
      { roll: '5',  text: 'Memória de Mapa: Você nunca se perde em locais que já visitou. Em locais novos, o Mestre sempre te diz quantas saídas existem.' },
      { roll: '6',  text: 'Passagem Furtiva: Vantagem em testes de DES para se mover silenciosamente. Em armadura Pesada, a Desvantagem normal é ignorada.' },
      { roll: '7',  text: 'Leitura de Ruínas: Como ◈, você identifica a função original de qualquer estrutura ou sala ao examiná-la.' },
      { roll: '8',  text: 'Sentido de Armadilha: Nunca é surpreendido por armadilhas mecânicas. Você percebe a presença de armadilhas mágicas automaticamente.' },
      { roll: '9',  text: 'Natação de Combate: Sem penalidades em combate ou movimento subaquático. Você pode segurar a respiração o dobro do tempo normal.' },
      { roll: '10', text: 'Cartógrafo: Ao final de cada sessão de exploração, o Mestre revela um detalhe oculto do mapa que o grupo ainda não descobriu.' },
      { roll: '11', text: 'Visão Mística: Como ◈, detecte a presença de magia, demônios ou mortos-vivos num raio Próximo.' },
      { roll: '12', text: 'Caminhante Noturno: Sem penalidades em terreno escuro ou de luz fraca. Vantagem em testes de exploração durante a noite.' },
      { roll: '13', text: 'Quebrador de Portas: Portas, cadeados e barreiras físicas comuns cedem sem teste.' },
      { roll: '14', text: 'Conhecimento de Terreno: Escolha um tipo de terreno. Vantagem em todos os testes de exploração nesse ambiente.' },
      { roll: '15', text: 'Sobrevivente do Inferno: Você ignora penalidades de ambientes sobrenaturais (calor demoníaco, escuridão mágica, névoa corrompida).' },
      { roll: '16', text: 'Intuição de Perigo: No início de cada sessão, o Mestre avisa se o próximo encontro principal será de combate, social ou exploração.' },
      { roll: '17', text: 'Sentido de Morte: Você percebe automaticamente a presença de mortos-vivos ou demônios num raio Distante, mesmo através de paredes.' },
      { roll: '18', text: 'Rastejador de Masmorras: Ao entrar numa nova área, Vantagem na primeira ação que você tomar.' },
      { roll: '19', text: 'Escalar Paredes: Como ◈, suba superfícies verticais de até 6 metros sem equipamento.' },
      { roll: '20', text: 'Explorador Lendário: Escolha qualquer outro talento desta tabela. Você o ganha permanentemente.' }
    ]
  },
  {
    id: 'fortuna', nome: 'Tabela 6: Fortuna',
    talentos: [
      { roll: '1',  text: 'Sortudo: Uma vez por sessão, transforme uma Falha em um Sucesso em qualquer teste.' },
      { roll: '2',  text: 'Azarado com Sorte: Sempre que rolar um 1 Natural, ganhe 1 ponto de Fortuna. Acumule até 3 — gaste 3 para transformar qualquer resultado num 20.' },
      { roll: '3',  text: 'Pressentimento: Uma vez por sessão, antes de rolar um dado, declare que vai usar Pressentimento. Se o resultado for Falha, role novamente.' },
      { roll: '4',  text: 'Dado Quente: Após rolar dois 20 Naturais na mesma sessão, todos os seus dados de dano causam o valor máximo até o fim do combate atual.' },
      { roll: '5',  text: 'Instinto de Sobrevivente: Uma vez por cena, quando um ataque te reduziria a 0 PV, role 1d6. No 4+, você fica com 1 PV.' },
      { roll: '6',  text: 'Achado Inesperado: Uma vez por sessão, ao explorar uma sala, declare um Achado. O Mestre adiciona um item útil não planejado.' },
      { roll: '7',  text: 'Golpe do Destino: Uma vez por cena, após errar um ataque, o próximo ataque contra o mesmo alvo tem Vantagem.' },
      { roll: '8',  text: 'Mão Fria, Coração Quente: Vantagem em rolagens de tabelas aleatórias (tesouros, eventos de viagem, encontros).' },
      { roll: '9',  text: 'Desafio do Caos: Ao rolar um 1 Natural em qualquer teste fora de combate, algo inesperadamente bom acontece.' },
      { roll: '10', text: 'Karma: Sempre que um aliado cair a 0 PV, você ganha Vantagem em todos os ataques no próximo turno.' },
      { roll: '11', text: 'Olho do Furacão: Quando estiver cercado por 3 ou mais inimigos, role 1d6 no início do seu turno. No 5+, um deles tropeça ou hesita.' },
      { roll: '12', text: 'Tesouro Amaldiçoado: Uma vez por sessão, ao pegar um item mágico desconhecido, você pode ativá-lo imediatamente sem identificá-lo.' },
      { roll: '13', text: 'Ressurgir das Cinzas: Uma vez por descanso longo, ao ser estabilizado após cair a 0 PV, você levanta com 1d6 PV sem gastar uma ação.' },
      { roll: '14', text: 'Bênção Profana: Ao iniciar um combate em território demoníaco ou corrompido, role 1d6. No 4+, ganhe Vantagem no primeiro ataque.' },
      { roll: '15', text: 'Coincidência Conveniente: Uma vez por sessão, declare que algo conveniente acontece. O Mestre decide como acontece, mas acontece.' },
      { roll: '16', text: 'Dados Sangrentos: Sempre que rolar o valor máximo em qualquer dado de dano, role esse dado novamente e some (uma vez por ataque).' },
      { roll: '17', text: 'Fio do Destino: O Mestre não pode matar seu personagem por consequência de um 1 Natural fora de combate.' },
      { roll: '18', text: 'Maldição Refletida: Uma vez por cena, quando sofrer um efeito de status, role 1d6. No 5+, o efeito é refletido para o causador.' },
      { roll: '19', text: 'Herança de Nephalem: Uma vez por campanha, em um momento de morte certa, você sobrevive com 1 PV.' },
      { roll: '20', text: 'Filho da Fortuna: Escolha qualquer outro talento desta tabela. Você o ganha permanentemente.' }
    ]
  }
];

// Talento simples que aplica automaticamente (+2 FOR, etc.)
function aplicarTalentoSimples(char, texto) {
  const m2 = texto.match(/\+2 de (Força|Destreza|Constituição|Inteligência|Sabedoria|Carisma)/);
  const mHP = texto.match(/\+2 de HP/);
  const mMana = texto.match(/\+2 Mana máximo/);
  const attrMap = { "Força": "FOR", "Destreza": "DES", "Constituição": "CON", "Inteligência": "INT", "Sabedoria": "SAB", "Carisma": "CAR" };
  if (m2) return { tipo: "attr", attr: attrMap[m2[1]], valor: 2 };
  if (mHP) return { tipo: "pv", valor: 2 };
  if (mMana) return { tipo: "mana", valor: 2 };
  return null;
}
