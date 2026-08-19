/**
 * Kinetic Dex - Comprehensive Multi-Mode Routing Engine Data for All Generations (Gen 1 to Gen 8)
 * Modes: Casual (Guides & Advice), Speedrun (Splits & Skips), Hardcore (Nuzlocke & Danger Traps)
 */

export const MARATHON_MODE_ROUTES = {
  gen1: {
    gameFR: "Pokémon Rouge / Bleu / Jaune (Gen 1)",
    gameEN: "Pokémon Red / Blue / Yellow (Gen 1)",
    casual: {
      titleFR: "Guide Casual & Conseils Kanto (Gen 1)",
      titleEN: "Casual Guide & Advice Kanto (Gen 1)",
      descFR: "Guide détaillé pas à pas pour Kanto. Conseils pour chaque arène, captures recommandées et objets clés.",
      descEN: "Detailed step-by-step walkthrough for Kanto. Gym counters, recommended catches, and key items.",
      steps: [
        {
          titleFR: "1. Pierre (Argenta) - Type Roche",
          titleEN: "1. Brock (Pewter Gym) - Rock Type",
          adviceFR: "💡 CONSEIL : Si vous avez Salamèche, capturez Férosinge ou Nidoran♂ (Route 22) pour Double Pied (4x super efficace). Avec Carapuce ou Bulbizarre, utilisez Bulle d'O / Tranch'Herbe.",
          adviceEN: "💡 ADVICE: If you chose Charmander, catch Mankey or Nidoran♂ (Route 22) for Double Kick. With Squirtle or Bulbasaur, use Bubble / Vine Whip.",
          catchesFR: ["Carapuce / Bulbizarre / Salamèche", "Nidoran♂ (Route 22)", "Férosinge (Route 22)", "Pikachu (Forêt de Jade)"],
          catchesEN: ["Squirtle / Bulbasaur / Charmander", "Nidoran♂ (Route 22)", "Mankey (Route 22)", "Pikachu (Viridian Forest)"],
          itemsFR: ["Carte de la Ville", "CT34 Patience"],
          itemsEN: ["Town Map", "TM34 Bide"]
        },
        {
          titleFR: "2. Ondine (Azuria) - Type Eau",
          titleEN: "2. Misty (Cerulean Gym) - Water Type",
          adviceFR: "💡 CONSEIL : Capturez Mystherbe ou Chétiflor sur la Route 24 (Pont Pépite). Faites évoluer Nidorino avec la Pierre Lune du Mont Sélénite.",
          adviceEN: "💡 ADVICE: Catch Oddish or Bellsprout on Route 24 (Nugget Bridge). Evolve Nidorino using Moon Stone from Mt. Moon.",
          catchesFR: ["Mélofée (Mont Sélénite)", "Abra (Route 24)", "Mystherbe / Chétiflor (Route 24)"],
          catchesEN: ["Clefairy (Mt. Moon)", "Abra (Route 24)", "Oddish / Bellsprout (Route 24)"],
          itemsFR: ["Fossile Dôme / Nautile", "Pierre Lune", "CT28 Tunnel"],
          itemsEN: ["Dome/Helix Fossil", "Moon Stone", "TM28 Dig"]
        },
        {
          titleFR: "3. Major Bob (Carmin sur Mer) - Type Électrik",
          titleEN: "3. Lt. Surge (Vermilion Gym) - Electric Type",
          adviceFR: "💡 CONSEIL : Visitez le L.A.S. Océane pour la CS01 Coupe. Capturez Triopikeur dans la Cave Taupiqueur (immunité Électrik et OS sur Raichu).",
          adviceEN: "💡 ADVICE: Visit S.S. Anne for HM01 Cut. Catch Dugtrio in Diglett's Cave (Electric immunity & Dig OHKO vs Raichu).",
          catchesFR: ["Triopikeur (Cave Taupiqueur)", "Soporifik (Route 11)", "Magicarpe (Canne à Pêche)"],
          catchesEN: ["Dugtrio (Diglett's Cave)", "Drowzee (Route 11)", "Magikarp (Old Rod)"],
          itemsFR: ["CS01 Coupe", "Bon Commande Vélo"],
          itemsEN: ["HM01 Cut", "Bike Voucher"]
        },
        {
          titleFR: "4. Erika, Koga, Morgane & Ligue Pokémon",
          titleEN: "4. Erika, Koga, Sabrina & Pokémon League",
          adviceFR: "💡 CONSEIL : Récupérez la Thé à Céladopole pour Safrania. Utilisez Ronflex ou Léviator contre Alakazam de Morgane. La Master Ball s'obtient à la Sylphe S.A. 7F.",
          adviceEN: "💡 ADVICE: Get Tea in Celadon for Saffron gates. Use Snorlax or Gyarados vs Sabrina's Alakazam. Master Ball is on Silph Co. 7F.",
          catchesFR: ["Évoli (Céladopole)", "Ronflex (Route 12/16)", "Lokhlass (Sylphe S.A.)", "Électhor (Centrale)"],
          catchesEN: ["Eevee (Celadon)", "Snorlax (Route 12/16)", "Lapras (Silph Co.)", "Zapdos (Power Plant)"],
          itemsFR: ["CS02 Vol", "Scope Sylphe", "Master Ball", "CS03 Surf"],
          itemsEN: ["HM02 Fly", "Silph Scope", "Master Ball", "HM03 Surf"]
        }
      ]
    },
    hardcore: {
      titleFR: "Nuzlocke Hardcore & Pièges Kanto",
      titleEN: "Hardcore Nuzlocke & Kanto Traps",
      descFR: "Règles Nuzlocke : Mort permanente, 1er Pokémon par route, Level Caps stricts, zéro objet en combat.",
      descEN: "Nuzlocke rules: Permadeath, 1st encounter per route, Level Caps, no battle items.",
      steps: [
        {
          titleFR: "⚠️ Piège 1 : Pierre (Argenta) - Level Cap Nv. 14",
          titleEN: "⚠️ Trap 1: Brock (Pewter Gym) - Level Cap Lv. 14",
          dangerFR: "⚠️ PIÈGE MORTEL : L'Onix de Pierre possède l'attaque Étreinte & Patience (Bide). Ne l'attaquez JAMAIS pendant qu'il charge Patience sous peine de subir le double des dégâts !",
          dangerEN: "⚠️ CRITICAL TRAP: Brock's Onix has Bind & Bide. NEVER attack while Bide is charging or risk taking double damage back!",
          ruleFR: "Limitation : Level Cap Nv. 14 max.",
          ruleEN: "Restriction: Strictly enforce Lv. 14 Level Cap."
        },
        {
          titleFR: "⚠️ Piège 2 : Ondine (Azuria) - Level Cap Nv. 21",
          titleEN: "⚠️ Trap 2: Misty (Cerulean Gym) - Level Cap Lv. 21",
          dangerFR: "⚠️ PIÈGE MORTEL : Son Staross Nv. 21 est rapide et possède Vibreua (dégâts STAB + confusion). Amenez un type Plante Nv. 20 minimum.",
          dangerEN: "⚠️ CRITICAL TRAP: Misty's Lv. 21 Starmie is super fast with Water Pulse STAB + confusion RNG. Bring Lv. 20+ Grass type.",
          ruleFR: "Limitation : Level Cap Nv. 21 max.",
          ruleEN: "Restriction: Strictly enforce Lv. 21 Level Cap."
        },
        {
          titleFR: "⚠️ Piège 3 : Sauvages 'Destruction' (Mont Sélénite / Tour)",
          titleEN: "⚠️ Trap 3: Self-Destruct Traps (Mt. Moon / Tower)",
          dangerFR: "⚠️ PIÈGE MORTEL : Racaillou et Smogo sauvages utilisent Destruction sous 50% PV (200+ dégâts physiques instantanés) !",
          dangerEN: "⚠️ CRITICAL TRAP: Wild Geodudes & Koffings use Self-Destruct below 50% HP (200+ instant physical damage)!",
          ruleFR: "Limitation : Garder un type Roche ou Spectre en tête d'équipe.",
          ruleEN: "Restriction: Keep a Rock or Ghost type in front."
        }
      ]
    }
  },

  gen2: {
    gameFR: "Pokémon Or / Argent / Cristal (Gen 2)",
    gameEN: "Pokémon Gold / Silver / Crystal (Gen 2)",
    casual: {
      titleFR: "Guide Casual & Conseils Johto (Gen 2)",
      titleEN: "Casual Guide & Advice Johto (Gen 2)",
      descFR: "Guide pas à pas pour Johto. Stratégies contre Blanche, Mortimer et Sandra.",
      descEN: "Step-by-step Johto guide. Counters for Whitney, Morty, and Clair.",
      steps: [
        {
          titleFR: "1. Albert (Violette) & Rachid (Écorcia)",
          titleEN: "1. Falkner (Violet) & Bugsy (Azalea)",
          adviceFR: "💡 CONSEIL : Avec Kaiminus ou Héricendre, Albert et Rachid sont faciles. Pour Rachid, attention à l'attaque Taillade de Insecateur (plus elle touche, plus elle fait mal).",
          adviceEN: "💡 ADVICE: With Totodile or Cyndaquil, Falkner & Bugsy are easy. Watch out for Scyther's Fury Cutter building damage.",
          catchesFR: ["Kaiminus / Héricendre / Germignon", "Wattouat (Route 32)", "Fantomass (Route 31)"],
          catchesEN: ["Totodile / Cyndaquil / Chikorita", "Mareep (Route 32)", "Gastly (Route 31)"],
          itemsFR: ["Œuf Togepi", "CT31 Coud'Boue"],
          itemsEN: ["Togepi Egg", "TM31 Mud-Slap"]
        },
        {
          titleFR: "2. Blanche (Doublonville) - Type Normal",
          titleEN: "2. Whitney (Goldenrod Gym) - Normal Type",
          adviceFR: "💡 CONSEIL : L'Écrémeuh de Blanche utilise Roulade & Attraction ! Échangez un Machoc au Centre Commercial ou achetez Poing-Glace au Centre Commercial de Doublonville.",
          adviceEN: "💡 ADVICE: Whitney's Miltank uses Rollout & Attract! Trade for Machop or buy Ice Punch TM in Goldenrod Dept Store.",
          catchesFR: ["Machoc (Échange Doublonville)", "Nidoran (Route 35)", "Racaillou (Grotte)"],
          catchesEN: ["Machop (Goldenrod Trade)", "Nidoran (Route 35)", "Geodude (Cave)"],
          itemsFR: ["CT33 Poing-Glace", "Carapuce à O", "Passe Radio"],
          itemsEN: ["TM33 Ice Punch", "SquirtBottle", "Radio Card"]
        },
        {
          titleFR: "3. Mortimer (Rosalia) à Sandra (Ébène)",
          titleEN: "3. Morty (Ecruteak) to Clair (Blackthorn)",
          adviceFR: "💡 CONSEIL : Pour Mortimer (Spectre), utilisez Morsure de Crocrodil ou Hypnomade. Pour Sandra (Dragon), achetez Poing-Glace ou apprenez Laser Glace à Aligatueur.",
          adviceEN: "💡 ADVICE: For Morty (Ghost), use Croconaw Bite. For Clair (Dragon), use Ice Punch on Feraligatr.",
          catchesFR: ["Léviator Rouge (Lac Colère)", "Lokhlass (Caves Jumelles le Vendredi)", "Wattouat / Pharamp"],
          catchesEN: ["Red Gyarados (Lake of Rage)", "Lapras (Union Cave Fridays)", "Mareep / Ampharos"],
          itemsFR: ["CS03 Surf", "CS02 Vol", "CS04 Force", "Master Ball"],
          itemsEN: ["HM03 Surf", "HM02 Fly", "HM04 Strength", "Master Ball"]
        }
      ]
    },
    hardcore: {
      titleFR: "Nuzlocke Hardcore & Pièges Johto",
      titleEN: "Hardcore Nuzlocke & Johto Traps",
      descFR: "Nuzlocke strict Johto. Level Caps et alertes pièges mortels.",
      descEN: "Strict Johto Nuzlocke. Level Caps and critical trap alerts.",
      steps: [
        {
          titleFR: "⚠️ Piège 1 : Écrémeuh de Blanche - Level Cap Nv. 20",
          titleEN: "⚠️ Trap 1: Whitney's Miltank - Level Cap Lv. 20",
          dangerFR: "⚠️ PIÈGE MORTEL : Roulade gagne en puissance à chaque tour et OS toute votre équipe si elle n'est pas arrêtée ! Utilisez Machoc (Échange) ou Racaillou pour résister au type Normal/Roche.",
          dangerEN: "⚠️ CRITICAL TRAP: Rollout builds massive damage every turn, sweeping your team! Use Machop or Geodude to tank Normal/Rock.",
          ruleFR: "Limitation : Level Cap Nv. 20 max.",
          ruleEN: "Restriction: Strictly enforce Lv. 20 Level Cap."
        },
        {
          titleFR: "⚠️ Piège 2 : Ectoplasma de Mortimer - Level Cap Nv. 25",
          titleEN: "⚠️ Trap 2: Morty's Gengar - Level Cap Lv. 25",
          dangerFR: "⚠️ PIÈGE MORTEL : Son Ectoplasma (Nv. 25) utilise Hypnose + Dévorêve + Malédiction. Utilisez Baie Marron pour réveiller votre Pokémon.",
          dangerEN: "⚠️ CRITICAL TRAP: Morty's Lv. 25 Gengar uses Hypnosis + Dream Eater + Curse. Equip Mint Berry to wake up.",
          ruleFR: "Limitation : Level Cap Nv. 25 max.",
          ruleEN: "Restriction: Strictly enforce Lv. 25 Level Cap."
        }
      ]
    }
  },

  gen3: {
    gameFR: "Pokémon Rubis / Saphir / Émeraude (Gen 3)",
    gameEN: "Pokémon Ruby / Sapphire / Emerald (Gen 3)",
    casual: {
      titleFR: "Guide Casual & Conseils Hoenn (Gen 3)",
      titleEN: "Casual Guide & Advice Hoenn (Gen 3)",
      descFR: "Guide pas à pas pour Hoenn. Évolutions de Gobou, conseils Norman et Rayquaza.",
      descEN: "Step-by-step Hoenn guide. Mudkip evolutions, Norman advice, and Rayquaza.",
      steps: [
        {
          titleFR: "1. Roxanne (Mérouville) & Voltère (Lavandia)",
          titleEN: "1. Roxanne (Rustboro) & Watson (Mauville)",
          adviceFR: "💡 CONSEIL : Gobou / Flobio (Eau/Sol) immunise contre l'Électricité de Voltère avec Tir de Boue ! Pour Bastien (Combat), capturez Tarsal ou Nirondelle.",
          adviceEN: "💡 ADVICE: Mudkip / Marshtomp (Water/Ground) is immune to Watson's Electric gym with Mud Shot! For Brawly, catch Ralts or Taillow.",
          catchesFR: ["Gobou / Poussifeu / Arcko", "Nirondelle (Route 104)", "Tarsal (Route 102)", "Aron (Grotte Granite)"],
          catchesEN: ["Mudkip / Torchic / Treecko", "Taillow (Route 104)", "Ralts (Route 102)", "Aron (Granite Cave)"],
          itemsFR: ["CS01 Coupe", "CS05 Flash", "CT39 Tomberoche"],
          itemsEN: ["HM01 Cut", "HM05 Flash", "TM39 Rock Tomb"]
        },
        {
          titleFR: "2. Norman (Clémenti-Ville) - Type Normal",
          titleEN: "2. Norman (Petalburg Gym) - Normal Type",
          adviceFR: "💡 CONSEIL : Monaflemit de Norman possède une Attaque monstrueuse mais le talent Absentéisme. Utilisez Abri ou Gonflette un tour sur deux !",
          adviceEN: "💡 ADVICE: Norman's Slaking has huge Attack but Truant ability. Use Protect or Bulk Up every second turn!",
          catchesFR: ["Machoc (Route 112)", "Chartor (Grotte Origine)", "Marill (Route 117)"],
          catchesEN: ["Machop (Route 112)", "Torkoal (Fiery Path)", "Marill (Route 117)"],
          itemsFR: ["CS04 Force", "CS03 Surf", "Lunet. Sable"],
          itemsEN: ["HM04 Strength", "HM03 Surf", "Go-Goggles"]
        },
        {
          titleFR: "3. Pilier Céleste & Rayquaza",
          titleEN: "3. Sky Pillar & Rayquaza",
          adviceFR: "💡 CONSEIL : Avant la Ligue, visitez le Pilier Céleste au nord de Pacifiville pour capturer Rayquaza Nv. 70 avec la Master Ball ! Il balaye le Conseil des 4 à lui tout seul.",
          adviceEN: "💡 ADVICE: Before the League, visit Sky Pillar to catch Lv. 70 Rayquaza with Master Ball! It sweeps the Elite Four solo.",
          catchesFR: ["Rayquaza (Pilier Céleste Nv. 70)", "Kaimorse (Grotte Tréfonds)", "Draby (Site Météore)"],
          catchesEN: ["Rayquaza (Sky Pillar Lv. 70)", "Walrein (Shoal Cave)", "Bagon (Meteor Falls)"],
          itemsFR: ["Master Ball", "CS07 Cascade", "CT13 Laser Glace"],
          itemsEN: ["Master Ball", "HM07 Waterfall", "TM13 Ice Beam"]
        }
      ]
    },
    hardcore: {
      titleFR: "Nuzlocke Hardcore & Pièges Hoenn",
      titleEN: "Hardcore Nuzlocke & Hoenn Traps",
      descFR: "Nuzlocke strict Hoenn. Pièges mortels de Norman et Levy & Tat.",
      descEN: "Strict Hoenn Nuzlocke. Critical traps for Norman and Tate & Liza.",
      steps: [
        {
          titleFR: "⚠️ Piège 1 : Monaflemit de Norman - Level Cap Nv. 31",
          titleEN: "⚠️ Trap 1: Norman's Slaking - Level Cap Lv. 31",
          dangerFR: "⚠️ PIÈGE MORTEL : Monaflemit possède Riposte (Counter) et Façade. S'il survit à une attaque physique, Riposte éliminera sur-le-champ votre Pokémon !",
          dangerEN: "⚠️ CRITICAL TRAP: Slaking has Counter & Facade. If it survives a physical attack, Counter instantly kills your Pokémon!",
          ruleFR: "Limitation : Level Cap Nv. 31 max. Utiliser Abri / attaques Spéciales.",
          ruleEN: "Restriction: Strictly enforce Lv. 31 Level Cap. Use Protect / Special moves."
        },
        {
          titleFR: "⚠️ Piège 2 : Levy & Tat (Santaruz) - Combat Duo",
          titleEN: "⚠️ Trap 2: Tate & Liza (Mossdeep Gym) - Double Battle",
          dangerFR: "⚠️ PIÈGE MORTEL : Combat Duo avec Seleroc & Solaroc qui utilisent Séisme + Éco-Sphère + Vague Psy en parfaite synergie !",
          dangerEN: "⚠️ CRITICAL TRAP: Double Battle with Solrock & Lunatone combining Earthquake + Psychic + Solar Beam synergy!",
          ruleFR: "Limitation : Level Cap Nv. 42 max. Amener Surf + Surf (Laggron / Kaimorse).",
          ruleEN: "Restriction: Enforce Lv. 42 Cap. Use double Surf (Swampert / Walrein)."
        }
      ]
    }
  },

  gen4: {
    gameFR: "Pokémon Diamant / Perle / Platine (Gen 4)",
    gameEN: "Pokémon Diamond / Pearl / Platinum (Gen 4)",
    casual: {
      titleFR: "Guide Casual & Conseils Sinnoh (Gen 4)",
      titleEN: "Casual Guide & Advice Sinnoh (Gen 4)",
      descFR: "Guide pas à pas Sinnoh. Ouisticram, Kiméra, Hélio et Cynthia.",
      descEN: "Step-by-step Sinnoh guide. Chimchar, Fantina, Cyrus, and Cynthia.",
      steps: [
        {
          titleFR: "1. Pierrick (Charbourg) & Flo (Vestigion)",
          titleEN: "1. Roark (Oreburgh) & Gardenia (Eterna)",
          adviceFR: "💡 CONSEIL : Faites évoluer Ouisticram en Chimpenfeu (Nv. 14) pour apprendre Mach Punch et balayer Charkos de Pierrick.",
          adviceEN: "💡 ADVICE: Evolve Chimchar to Monferno (Lv. 14) to learn Mach Punch and sweep Roark's Cranidos.",
          catchesFR: ["Ouisticram / Tiplouf / Tortipouss", "Étourmi (Route 201)", "Lixy (Route 202)", "Cradopaud (Grand Marais)"],
          catchesEN: ["Chimchar / Piplup / Turtwig", "Starly (Route 201)", "Shinx (Route 202)", "Croagunk (Great Marsh)"],
          itemsFR: ["CS06 Éclate-Roc", "CS01 Coupe"],
          itemsEN: ["HM06 Rock Smash", "HM01 Cut"]
        },
        {
          titleFR: "2. Cynthia & Ligue Pokémon",
          titleEN: "2. Cynthia & Pokémon League",
          adviceFR: "💡 CONSEIL : Carchacrok de Cynthia (Nv. 62/66) est rapide et possède Séisme + Dragon Rush. Équipez Laser Glace sur Lucario ou Milobellus !",
          adviceEN: "💡 ADVICE: Cynthia's Garchomp (Lv. 62/66) is fast with Earthquake + Dragon Rush. Equip Ice Beam on Lucario / Milotic!",
          catchesFR: ["Lucario (Œuf Écho)", "Carchacrok (Grotte Revêche)", "Blizzaroi (Mont Couronné)"],
          catchesEN: ["Lucario (Riley Egg)", "Garchomp (Wayward Cave)", "Abomasnow (Mt. Coronet)"],
          itemsFR: ["Master Ball", "CS03 Surf", "CS04 Force", "CT13 Laser Glace"],
          itemsEN: ["Master Ball", "HM03 Surf", "HM04 Strength", "TM13 Ice Beam"]
        }
      ]
    },
    hardcore: {
      titleFR: "Nuzlocke Hardcore & Pièges Sinnoh",
      titleEN: "Hardcore Nuzlocke & Sinnoh Traps",
      descFR: "Nuzlocke strict Sinnoh. Piège mortel du Carchacrok de Cynthia.",
      descEN: "Strict Sinnoh Nuzlocke. Critical trap for Cynthia's Garchomp.",
      steps: [
        {
          titleFR: "⚠️ Piège 1 : Carchacrok de Cynthia - Level Cap Nv. 62",
          titleEN: "⚠️ Trap 1: Cynthia's Garchomp - Level Cap Lv. 62",
          dangerFR: "⚠️ PIÈGE MORTEL : Carchacrok possède Baie Yache (réduit les dégâts Glace de 50%) et Danse Lames + Séisme. Il peut OS 6 Pokémon d'affilée !",
          dangerEN: "⚠️ CRITICAL TRAP: Garchomp holds Yache Berry (50% Ice dmg reduction) + Swords Dance + Earthquake. It can 1-shot your whole team!",
          ruleFR: "Limitation : Level Cap Nv. 62 max. Utiliser Intimidation + Éclats Glace (Mammochon).",
          ruleEN: "Restriction: Enforce Lv. 62 Cap. Use Intimidate + Ice Shard (Mamoswine)."
        }
      ]
    }
  },

  gen5: {
    gameFR: "Pokémon Noir / Blanc (Gen 5)",
    gameEN: "Pokémon Black / White (Gen 5)",
    casual: {
      titleFR: "Guide Casual & Conseils Unys (Gen 5)",
      titleEN: "Casual Guide & Advice Unova (Gen 5)",
      descFR: "Guide pas à pas Unys. Gruikui, Aloé, Inésia et combat N & Ghetsis.",
      descEN: "Step-by-step Unova guide. Tepig, Lenora, Elesa, and N & Ghetsis final battles.",
      steps: [
        {
          titleFR: "1. Aloé (Maillard) & Inésia (Méanville)",
          titleEN: "1. Lenora (Nacrene) & Elesa (Nimbasa)",
          adviceFR: "💡 CONSEIL : Grotichon (Feu/Combat) détruit Mastouffe d'Aloé avec Balayage. Pour Inésia (Électrik), utilisez Nitrocharge + Piétisol.",
          adviceEN: "💡 ADVICE: Pignite (Fire/Fighting) destroys Lenora's Watchog with Low Kick. For Elesa, use Flame Charge + Bulldoze.",
          catchesFR: ["Gruikui / Moustillon / Vipélierre", "Ponchien (Route 1)", "Rototaupe (Grotte Parsemée)"],
          catchesEN: ["Tepig / Oshawott / Snivy", "Herdier (Route 1)", "Drilbur (Wellspring Cave)"],
          itemsFR: ["CT86 Nœud Herbe", "CT43 Niitrocharge"],
          itemsEN: ["TM86 Grass Knot", "TM43 Flame Charge"]
        }
      ]
    },
    hardcore: {
      titleFR: "Nuzlocke Hardcore & Pièges Unys",
      titleEN: "Hardcore Nuzlocke & Unova Traps",
      descFR: "Nuzlocke strict Unys. Pièges Vengeance d'Aloé et Trioxhydre de Ghetsis.",
      descEN: "Strict Unova Nuzlocke. Lenora Retaliate & Ghetsis Hydreigon traps.",
      steps: [
        {
          titleFR: "⚠️ Piège 1 : Mastouffe d'Aloé - Vengeance (Retaliate)",
          titleEN: "⚠️ Trap 1: Lenora's Watchog - Retaliate Trap",
          dangerFR: "⚠️ PIÈGE MORTEL : Quand le premier Pokémon d'Aloé meurt, Mastouffe lance Vengeance (dégâts doublés à 140 de puissance STAB = OS instantané) !",
          dangerEN: "⚠️ CRITICAL TRAP: When Lenora's 1st Pokémon faints, Watchog uses Retaliate (doubled 140 Power STAB = instant 1-shot)!",
          ruleFR: "Limitation : Envoyer un type Roche (Gueuloroche) ou Combat avec Protect.",
          ruleEN: "Restriction: Switch to Rock or Fighting type with Protect."
        }
      ]
    }
  },

  gen6: {
    gameFR: "Pokémon X / Y (Gen 6)",
    gameEN: "Pokémon X / Y (Gen 6)",
    casual: {
      titleFR: "Guide Casual & Conseils Kalos (Gen 6)",
      titleEN: "Casual Guide & Advice Kalos (Gen 6)",
      descFR: "Guide pas à pas Kalos. Méga-Évolution, Lucario Cadeau et Dianthéa.",
      descEN: "Step-by-step Kalos guide. Mega Evolution, Gift Lucario, and Diantha.",
      steps: [
        {
          titleFR: "1. Cornélia (Yantarnt) & Méga-Lucario",
          titleEN: "1. Korrina (Shalour Gym) & Mega Lucario",
          adviceFR: "💡 CONSEIL : Cornélia vous offre un Lucario avec sa Lucarite. Sa Méga-Évolution avec Poing-Boost balaye le reste du jeu !",
          adviceEN: "💡 ADVICE: Korrina gives you a free Lucario with Lucarionite. Its Mega Evolution + Power-Up Punch sweeps the game!",
          catchesFR: ["Marisson / Feunnec / Grenousse", "Lucario Cadeau (Yantarnt)", "Passerouge (Route 2)"],
          catchesEN: ["Chespin / Fennekin / Froakie", "Gift Lucario (Shalour)", "Fletchling (Route 2)"],
          itemsFR: ["Lucarite", "Méga-Anneau", "CS02 Vol"],
          itemsEN: ["Lucarionite", "Mega Ring", "HM02 Fly"]
        }
      ]
    },
    hardcore: {
      titleFR: "Nuzlocke Hardcore & Pièges Kalos",
      titleEN: "Hardcore Nuzlocke & Kalos Traps",
      descFR: "Nuzlocke strict Kalos. Pièges de Méga-Léviator de Lysandre.",
      descEN: "Strict Kalos Nuzlocke. Lysandre's Mega Gyarados trap.",
      steps: [
        {
          titleFR: "⚠️ Piège 1 : Méga-Léviator de Lysandre",
          titleEN: "⚠️ Trap 1: Lysandre's Mega Gyarados",
          dangerFR: "⚠️ PIÈGE MORTEL : Méga-Léviator possède Danse Draco + Mâchouille. S'il place une Danse Draco, il balaye toute votre équipe !",
          dangerEN: "⚠️ CRITICAL TRAP: Mega Gyarados uses Dragon Dance + Crunch. A single Dragon Dance boost can 1-shot your whole team!",
          ruleFR: "Limitation : Utiliser Électricité (Voltali) ou Combat (Lucario) immédiat.",
          ruleEN: "Restriction: Use immediate Electric or Fighting STAB move."
        }
      ]
    }
  },

  gen7: {
    gameFR: "Pokémon Soleil / Lune / USUM (Gen 7)",
    gameEN: "Pokémon Sun / Moon / USUM (Gen 7)",
    casual: {
      titleFR: "Guide Casual & Conseils Alola (Gen 7)",
      titleEN: "Casual Guide & Advice Alola (Gen 7)",
      descFR: "Guide pas à pas Alola. Otaquin, Capicités Z et Ultra-Nécrozma.",
      descEN: "Step-by-step Alola guide. Popplio, Z-Moves, and Ultra Necrozma.",
      steps: [
        {
          titleFR: "1. Épreuves d'Alola & Pouvoir Z",
          titleEN: "1. Alola Trials & Z-Moves",
          adviceFR: "💡 CONSEIL : Otaquin / Oratoria possède le Pouvoir Z Aquavolt Z. Pour Ultra-Nécrozma (USUM Nv. 60), utilisez la strat Toxik + Ceinture Force !",
          adviceEN: "💡 ADVICE: Popplio / Primarina has Hydro Vortex Z-Move. For Ultra Necrozma (Lv. 60), use Toxic + Focus Sash cheese!",
          catchesFR: ["Otaquin / Flamiaou / Brindibou", "Mimiqui (Épreuve Spectre)", "Tiboudet (Route 4)"],
          catchesEN: ["Popplio / Litten / Rowlet", "Mimikyu (Ghost Trial)", "Mudbray (Route 4)"],
          itemsFR: ["Cristal Z Eau", "Ceinture Force", "Master Ball"],
          itemsEN: ["Waterium Z", "Focus Sash", "Master Ball"]
        }
      ]
    },
    hardcore: {
      titleFR: "Nuzlocke Hardcore & Pièges Alola",
      titleEN: "Hardcore Nuzlocke & Alola Traps",
      descFR: "Nuzlocke strict Alola. Pièges mortels d'Ultra-Nécrozma et Totem Mimiqui.",
      descEN: "Strict Alola Nuzlocke. Ultra Necrozma & Totem Mimikyu traps.",
      steps: [
        {
          titleFR: "⚠️ Piège 1 : Ultra-Nécrozma (USUM Nv. 60)",
          titleEN: "⚠️ Trap 1: Ultra Necrozma (USUM Lv. 60)",
          dangerFR: "⚠️ PIÈGE MORTEL : Ultra-Nécrozma gagne +1 dans TOUTES ses stats au départ et possède Photo-Geyser (1-shot garanti sur n'importe quel Pokémon sans Ceinture Force) !",
          dangerEN: "⚠️ CRITICAL TRAP: Ultra Necrozma starts with +1 in ALL stats and casts Photon Geyser (guaranteed 1-shot without Focus Sash)!",
          ruleFR: "Limitation : Stratégie obligatoire Toxik + Ceinture Force sur Mimiqui / Ténèbres.",
          ruleEN: "Restriction: Mandatory Toxic + Focus Sash strategy on Mimikyu."
        }
      ]
    }
  },

  gen8: {
    gameFR: "Pokémon Épée / Bouclier (Gen 8)",
    gameEN: "Pokémon Sword / Shield (Gen 8)",
    casual: {
      titleFR: "Guide Casual & Conseils Galar (Gen 8)",
      titleEN: "Casual Guide & Advice Galar (Gen 8)",
      descFR: "Guide pas à pas Galar. Larméléon, Terres Sauvages, Dynamax et Tarak.",
      descEN: "Step-by-step Galar guide. Sobble, Wild Area, Dynamax, and Leon.",
      steps: [
        {
          titleFR: "1. Terres Sauvages & Arènes Dynamax",
          titleEN: "1. Wild Area & Dynamax Gyms",
          adviceFR: "💡 CONSEIL : Larméléon (Lézargus) détruit Kabu avec Tir de Précision sous Hydro-Max (Pluie). Éternatos s'attrape à 100% avec n'importe quelle Pokéball !",
          adviceEN: "💡 ADVICE: Sobble (Inteleon) destroys Kabu with Snipe Shot under Max Geyser. Eternatus has 100% catch rate with any ball!",
          catchesFR: ["Larméléon / Ouistempo / Flambino", "Corvaillus (Route 1)", "Voltoutou (Route 2)"],
          catchesEN: ["Sobble / Grookey / Scorbunny", "Rookidee (Route 1)", "Yamper (Route 2)"],
          itemsFR: ["Poignet Dynamax", "Poké Ball Éternatos"],
          itemsEN: ["Dynamax Band", "Eternatus Poké Ball"]
        }
      ]
    },
    hardcore: {
      titleFR: "Nuzlocke Hardcore & Pièges Galar",
      titleEN: "Hardcore Nuzlocke & Galar Traps",
      descFR: "Nuzlocke strict Galar. Piège G-Max Fournaise du Dracaufeu de Tarak.",
      descEN: "Strict Galar Nuzlocke. Leon's G-Max Charizard trap.",
      steps: [
        {
          titleFR: "⚠️ Piège 1 : Dracaufeu Gigamax de Tarak",
          titleEN: "⚠️ Trap 1: Leon's G-Max Charizard",
          dangerFR: "⚠️ PIÈGE MORTEL : Son Dracaufeu Gigamax lance G-Max Fournaise qui inflige des dégâts résiduels continuels à toute l'équipe. Dynamaxez un type Eau / Roche immédiat !",
          dangerEN: "⚠️ CRITICAL TRAP: G-Max Charizard uses G-Max Wildfire dealing residual team damage. Dynamax a Water / Rock type immediately!",
          ruleFR: "Limitation : Level Cap Nv. 65 max.",
          ruleEN: "Restriction: Strictly enforce Lv. 65 Level Cap."
        }
      ]
    }
  }
};
