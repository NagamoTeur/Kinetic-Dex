# Spécifications Techniques : Projet "Antigravity" - Kinetic Dex

## 1. Vision du Projet
Kinetic Dex est une plateforme de commandement pour les marathons Pokémon, offrant un tracking de précision, une planification d'équipe stratégique et des guides de routing dynamiques. L'esthétique est moderne, "Poké-Moderne", avec un contraste élevé (Dark Mode) et des accents néon.

## 2. Architecture des Données (Intégration PokéAPI)
Le système reposera sur la [PokéAPI](https://pokeapi.co/) pour alimenter les composants suivants :
- **Global Index** : Récupération exhaustive des 9 générations (Noms, Types, Sprites HD, Numéros).
- **Tracker Régional** : Filtrage par `location-area` pour obtenir les taux d'apparition (`encounter_rate`) et les méthodes d'obtention par version.
- **Team Planner** : Utilisation des tables de types et des `move-sets` pour calculer les couvertures offensives/défensives.

## 3. Fonctionnalités Clés à Implémenter
### A. Système de Tracking (Antigravity Core)
- **Local Storage / DB Sync** : Sauvegarde de l'état de capture (Booléen : `caught`) relié à l'ID utilisateur.
- **Calculateur de Complétion** : Script de calcul en temps réel du pourcentage de complétion par région et global.

### B. Strategic Team Planner
- **Moteur de Synergie** : Algorithme analysant les faiblesses communes.
  - *Exemple* : Si 3 Pokémon sont faibles à la Glace, déclencher un avertissement "Vulnerability Detected".
- **Analyse de Moveset** : Vérification de la répartition entre Attaque Physique et Spéciale.

### C. Marathon Routing
- **Gestionnaire d'États (State Machine)** : Permet de basculer entre les modes `Speedrun`, `Casual`, et `Hardcore`.
- **Checkpoint Tracking** : Validation des badges et des étapes clés du routing.

## 4. Stack Design & UI (Design System {{DATA:DESIGN_SYSTEM:DESIGN_SYSTEM_1}})
- **Palette** : Surface (`#131313`), Primary (`#ff1c1c`), Accent Cyan (`#00f2ff`).
- **Typographie** : `SORA` pour les titres, `Inter` ou Mono pour les données techniques.
- **Composants** :
  - `TopNavBar` : Affichage de la session active et progression (82%).
  - `SideNavBar` : Navigation entre Map, Guides, Tracker et Profil.

## 5. Roadmap d'Implémentation
1. **Phase 1** : Setup de l'environnement et connecteurs PokéAPI.
2. **Phase 2** : Développement du moteur de recherche Global Index.
3. **Phase 3** : Logique de persistance pour le Tracker (Checkboxes).
4. **Phase 4** : Module d'analyse algorithmique pour le Team Planner.
5. **Phase 5** : Polissage UI et animations néon.
