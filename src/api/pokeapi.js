/**
 * Kinetic Dex - PokéAPI Integration & Fallback Catalog Provider (with French Names)
 */
import { POKEMON_NAMES_FR } from '../i18n/pokemonNames.js';

const POKEAPI_BASE = 'https://pokeapi.co/api/v2';
const cache = new Map();

// Local pre-populated Fallback Catalog with French and English names
export const KANTO_POKEMON_DATA = [
  { id: 1, name: 'Bulbasaur', nameFr: 'Bulbizarre', types: ['grass', 'poison'], stats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 }, gen: 1 },
  { id: 2, name: 'Ivysaur', nameFr: 'Herbizarre', types: ['grass', 'poison'], stats: { hp: 60, atk: 62, def: 63, spa: 80, spd: 80, spe: 60 }, gen: 1 },
  { id: 3, name: 'Venusaur', nameFr: 'Florizarre', types: ['grass', 'poison'], stats: { hp: 80, atk: 82, def: 83, spa: 100, spd: 100, spe: 80 }, gen: 1 },
  { id: 4, name: 'Charmander', nameFr: 'Salamèche', types: ['fire'], stats: { hp: 39, atk: 52, def: 43, spa: 60, spd: 50, spe: 65 }, gen: 1 },
  { id: 5, name: 'Charmeleon', nameFr: 'Reptincel', types: ['fire'], stats: { hp: 58, atk: 64, def: 58, spa: 80, spd: 65, spe: 80 }, gen: 1 },
  { id: 6, name: 'Charizard', nameFr: 'Dracaufeu', types: ['fire', 'flying'], stats: { hp: 78, atk: 84, def: 78, spa: 109, spd: 85, spe: 100 }, gen: 1 },
  { id: 7, name: 'Squirtle', nameFr: 'Carapuce', types: ['water'], stats: { hp: 44, atk: 48, def: 65, spa: 50, spd: 64, spe: 43 }, gen: 1 },
  { id: 8, name: 'Wartortle', nameFr: 'Carabaffe', types: ['water'], stats: { hp: 59, atk: 63, def: 80, spa: 65, spd: 80, spe: 58 }, gen: 1 },
  { id: 9, name: 'Blastoise', nameFr: 'Tortank', types: ['water'], stats: { hp: 79, atk: 83, def: 100, spa: 85, spd: 105, spe: 78 }, gen: 1 },
  { id: 10, name: 'Caterpie', nameFr: 'Chenipan', types: ['bug'], stats: { hp: 45, atk: 30, def: 35, spa: 20, spd: 20, spe: 45 }, gen: 1 },
  { id: 11, name: 'Metapod', nameFr: 'Chrysacier', types: ['bug'], stats: { hp: 50, atk: 20, def: 55, spa: 25, spd: 25, spe: 30 }, gen: 1 },
  { id: 12, name: 'Butterfree', nameFr: 'Papilusion', types: ['bug', 'flying'], stats: { hp: 60, atk: 45, def: 50, spa: 90, spd: 80, spe: 70 }, gen: 1 },
  { id: 13, name: 'Weedle', nameFr: 'Aspicot', types: ['bug', 'poison'], stats: { hp: 40, atk: 35, def: 30, spa: 20, spd: 20, spe: 50 }, gen: 1 },
  { id: 14, name: 'Kakuna', nameFr: 'Coconfort', types: ['bug', 'poison'], stats: { hp: 45, atk: 25, def: 50, spa: 25, spd: 25, spe: 35 }, gen: 1 },
  { id: 15, name: 'Beedrill', nameFr: 'Dardargnan', types: ['bug', 'poison'], stats: { hp: 65, atk: 90, def: 40, spa: 45, spd: 80, spe: 75 }, gen: 1 },
  { id: 16, name: 'Pidgey', nameFr: 'Roucool', types: ['normal', 'flying'], stats: { hp: 40, atk: 45, def: 40, spa: 35, spd: 35, spe: 56 }, gen: 1 },
  { id: 17, name: 'Pidgeotto', nameFr: 'Roucoups', types: ['normal', 'flying'], stats: { hp: 63, atk: 60, def: 55, spa: 50, spd: 50, spe: 71 }, gen: 1 },
  { id: 18, name: 'Pidgeot', nameFr: 'Roucarnage', types: ['normal', 'flying'], stats: { hp: 83, atk: 80, def: 75, spa: 70, spd: 70, spe: 101 }, gen: 1 },
  { id: 19, name: 'Rattata', nameFr: 'Rattata', types: ['normal'], stats: { hp: 30, atk: 56, def: 35, spa: 25, spd: 35, spe: 72 }, gen: 1 },
  { id: 20, name: 'Raticate', nameFr: 'Rattatac', types: ['normal'], stats: { hp: 55, atk: 81, def: 60, spa: 50, spd: 70, spe: 97 }, gen: 1 },
  { id: 25, name: 'Pikachu', nameFr: 'Pikachu', types: ['electric'], stats: { hp: 35, atk: 55, def: 40, spa: 50, spd: 50, spe: 90 }, gen: 1 },
  { id: 26, name: 'Raichu', nameFr: 'Raichu', types: ['electric'], stats: { hp: 60, atk: 90, def: 55, spa: 90, spd: 80, spe: 110 }, gen: 1 },
  { id: 35, name: 'Clefairy', nameFr: 'Mélofée', types: ['fairy'], stats: { hp: 70, atk: 45, def: 48, spa: 60, spd: 65, spe: 35 }, gen: 1 },
  { id: 39, name: 'Jigglypuff', nameFr: 'Rondoudou', types: ['normal', 'fairy'], stats: { hp: 115, atk: 45, def: 20, spa: 45, spd: 25, spe: 20 }, gen: 1 },
  { id: 52, name: 'Meowth', nameFr: 'Miaouss', types: ['normal'], stats: { hp: 40, atk: 45, def: 35, spa: 40, spd: 40, spe: 90 }, gen: 1 },
  { id: 54, name: 'Psyduck', nameFr: 'Psykokwak', types: ['water'], stats: { hp: 50, atk: 52, def: 48, spa: 65, spd: 50, spe: 55 }, gen: 1 },
  { id: 58, name: 'Growlithe', nameFr: 'Caninos', types: ['fire'], stats: { hp: 55, atk: 70, def: 45, spa: 70, spd: 50, spe: 60 }, gen: 1 },
  { id: 63, name: 'Abra', nameFr: 'Abra', types: ['psychic'], stats: { hp: 25, atk: 20, def: 15, spa: 105, spd: 55, spe: 90 }, gen: 1 },
  { id: 64, name: 'Kadabra', nameFr: 'Kadabra', types: ['psychic'], stats: { hp: 40, atk: 35, def: 30, spa: 120, spd: 70, spe: 105 }, gen: 1 },
  { id: 65, name: 'Alakazam', nameFr: 'Alakazam', types: ['psychic'], stats: { hp: 55, atk: 50, def: 45, spa: 135, spd: 95, spe: 120 }, gen: 1 },
  { id: 66, name: 'Machop', nameFr: 'Machoc', types: ['fighting'], stats: { hp: 70, atk: 80, def: 50, spa: 35, spd: 35, spe: 35 }, gen: 1 },
  { id: 74, name: 'Geodude', nameFr: 'Racaillou', types: ['rock', 'ground'], stats: { hp: 40, atk: 80, def: 100, spa: 30, spd: 30, spe: 20 }, gen: 1 },
  { id: 92, name: 'Gastly', nameFr: 'Fantominus', types: ['ghost', 'poison'], stats: { hp: 30, atk: 35, def: 30, spa: 100, spd: 35, spe: 80 }, gen: 1 },
  { id: 94, name: 'Gengar', nameFr: 'Ectoplasma', types: ['ghost', 'poison'], stats: { hp: 60, atk: 65, def: 60, spa: 130, spd: 75, spe: 110 }, gen: 1 },
  { id: 95, name: 'Onix', nameFr: 'Onix', types: ['rock', 'ground'], stats: { hp: 35, atk: 45, def: 160, spa: 30, spd: 45, spe: 70 }, gen: 1 },
  { id: 129, name: 'Magikarp', nameFr: 'Magicarpe', types: ['water'], stats: { hp: 20, atk: 10, def: 55, spa: 15, spd: 20, spe: 80 }, gen: 1 },
  { id: 130, name: 'Gyarados', nameFr: 'Léviator', types: ['water', 'flying'], stats: { hp: 95, atk: 125, def: 79, spa: 60, spd: 100, spe: 81 }, gen: 1 },
  { id: 131, name: 'Lapras', nameFr: 'Lokhlass', types: ['water', 'ice'], stats: { hp: 130, atk: 85, def: 80, spa: 85, spd: 95, spe: 60 }, gen: 1 },
  { id: 133, name: 'Eevee', nameFr: 'Évoli', types: ['normal'], stats: { hp: 55, atk: 55, def: 50, spa: 45, spd: 65, spe: 55 }, gen: 1 },
  { id: 143, name: 'Snorlax', nameFr: 'Ronflex', types: ['normal'], stats: { hp: 160, atk: 110, def: 65, spa: 65, spd: 110, spe: 30 }, gen: 1 },
  { id: 144, name: 'Articuno', nameFr: 'Artikodin', types: ['ice', 'flying'], stats: { hp: 90, atk: 85, def: 100, spa: 95, spd: 125, spe: 85 }, gen: 1 },
  { id: 145, name: 'Zapdos', nameFr: 'Électhor', types: ['electric', 'flying'], stats: { hp: 90, atk: 90, def: 85, spa: 125, spd: 90, spe: 100 }, gen: 1 },
  { id: 146, name: 'Moltres', nameFr: 'Sulfura', types: ['fire', 'flying'], stats: { hp: 90, atk: 100, def: 90, spa: 125, spd: 85, spe: 90 }, gen: 1 },
  { id: 147, name: 'Dratini', nameFr: 'Minidraco', types: ['dragon'], stats: { hp: 41, atk: 64, def: 45, spa: 50, spd: 50, spe: 50 }, gen: 1 },
  { id: 149, name: 'Dragonite', nameFr: 'Dracolosse', types: ['dragon', 'flying'], stats: { hp: 91, atk: 134, def: 95, spa: 100, spd: 100, spe: 80 }, gen: 1 },
  { id: 150, name: 'Mewtwo', nameFr: 'Mewtwo', types: ['psychic'], stats: { hp: 106, atk: 110, def: 90, spa: 154, spd: 90, spe: 130 }, gen: 1 }
];

// Kanto Regional Location Area Encounter Catalog
export const KANTO_REGIONAL_LOCATIONS = [
  {
    location: 'Route 1',
    area: 'Grassland Path / Chemin de l\'Herbe',
    encounters: [
      { id: 16, name: 'Pidgey', nameFr: 'Roucool', rate: 55, method: 'Tall Grass', versions: ['Red', 'Blue', 'Yellow'] },
      { id: 19, name: 'Rattata', nameFr: 'Rattata', rate: 45, method: 'Tall Grass', versions: ['Red', 'Blue', 'Yellow'] }
    ]
  },
  {
    location: 'Route 2',
    area: 'North & South Sections',
    encounters: [
      { id: 10, name: 'Caterpie', nameFr: 'Chenipan', rate: 35, method: 'Tall Grass', versions: ['Red', 'Yellow'] },
      { id: 13, name: 'Weedle', nameFr: 'Aspicot', rate: 35, method: 'Tall Grass', versions: ['Blue'] },
      { id: 16, name: 'Pidgey', nameFr: 'Roucool', rate: 40, method: 'Tall Grass', versions: ['Red', 'Blue', 'Yellow'] },
      { id: 19, name: 'Rattata', nameFr: 'Rattata', rate: 25, method: 'Tall Grass', versions: ['Red', 'Blue'] }
    ]
  },
  {
    location: 'Viridian Forest / Forêt de Jade',
    area: 'Dense Canopy',
    encounters: [
      { id: 10, name: 'Caterpie', nameFr: 'Chenipan', rate: 50, method: 'Tall Grass', versions: ['Red', 'Yellow'] },
      { id: 11, name: 'Metapod', nameFr: 'Chrysacier', rate: 35, method: 'Tall Grass', versions: ['Red', 'Yellow'] },
      { id: 13, name: 'Weedle', nameFr: 'Aspicot', rate: 50, method: 'Tall Grass', versions: ['Blue'] },
      { id: 14, name: 'Kakuna', nameFr: 'Coconfort', rate: 35, method: 'Tall Grass', versions: ['Blue'] },
      { id: 25, name: 'Pikachu', nameFr: 'Pikachu', rate: 5, method: 'Tall Grass (Rare)', versions: ['Red', 'Blue'] }
    ]
  },
  {
    location: 'Route 3',
    area: 'Rocky Foothills',
    encounters: [
      { id: 16, name: 'Pidgey', nameFr: 'Roucool', rate: 35, method: 'Tall Grass', versions: ['Red', 'Blue', 'Yellow'] },
      { id: 19, name: 'Rattata', nameFr: 'Rattata', rate: 30, method: 'Tall Grass', versions: ['Red', 'Blue'] },
      { id: 21, name: 'Spearow', nameFr: 'Piafabec', rate: 35, method: 'Tall Grass', versions: ['Red', 'Blue', 'Yellow'] },
      { id: 39, name: 'Jigglypuff', nameFr: 'Rondoudou', rate: 10, method: 'Tall Grass', versions: ['Red', 'Blue'] }
    ]
  },
  {
    location: 'Mt. Moon / Mont Sélénite',
    area: 'Cavern 1F & B2F',
    encounters: [
      { id: 41, name: 'Zubat', nameFr: 'Nosferapti', rate: 75, method: 'Cave Walking', versions: ['Red', 'Blue', 'Yellow'] },
      { id: 74, name: 'Geodude', nameFr: 'Racaillou', rate: 20, method: 'Cave Walking', versions: ['Red', 'Blue', 'Yellow'] },
      { id: 35, name: 'Clefairy', nameFr: 'Mélofée', rate: 5, method: 'Cave Walking (Rare)', versions: ['Red', 'Blue', 'Yellow'] }
    ]
  },
  {
    location: 'Route 24 & 25 (Pont Pépite)',
    area: 'Cerulean Cape',
    encounters: [
      { id: 43, name: 'Oddish', nameFr: 'Mystherbe', rate: 25, method: 'Tall Grass', versions: ['Red'] },
      { id: 69, name: 'Bellsprout', nameFr: 'Chétiflor', rate: 25, method: 'Tall Grass', versions: ['Blue'] },
      { id: 63, name: 'Abra', nameFr: 'Abra', rate: 15, method: 'Tall Grass (Teleport)', versions: ['Red', 'Blue', 'Yellow'] },
      { id: 16, name: 'Pidgey', nameFr: 'Roucool', rate: 35, method: 'Tall Grass', versions: ['Red', 'Blue'] }
    ]
  },
  {
    location: 'Rock Tunnel / Grotte Sombre',
    area: 'Deep Caverns',
    encounters: [
      { id: 41, name: 'Zubat', nameFr: 'Nosferapti', rate: 55, method: 'Cave Walking', versions: ['Red', 'Blue'] },
      { id: 74, name: 'Geodude', nameFr: 'Racaillou', rate: 30, method: 'Cave Walking', versions: ['Red', 'Blue'] },
      { id: 66, name: 'Machop', nameFr: 'Machoc', rate: 15, method: 'Cave Walking', versions: ['Red', 'Blue'] }
    ]
  },
  {
    location: 'Seafoam Islands / Îles Écume',
    area: 'Glacial Waters B4F',
    encounters: [
      { id: 54, name: 'Psyduck', nameFr: 'Psykokwak', rate: 30, method: 'Surfing', versions: ['Red', 'Blue'] },
      { id: 131, name: 'Lapras', nameFr: 'Lokhlass', rate: 5, method: 'Gift Event / Water', versions: ['Red', 'Blue', 'Yellow'] },
      { id: 144, name: 'Articuno', nameFr: 'Artikodin', rate: 100, method: 'Static Boss Encounter', versions: ['Red', 'Blue', 'Yellow'] }
    ]
  },
  {
    location: 'Power Plant / Centrale Électrique',
    area: 'Abandoned Reactor',
    encounters: [
      { id: 25, name: 'Pikachu', nameFr: 'Pikachu', rate: 25, method: 'Floor Walking', versions: ['Red', 'Blue'] },
      { id: 100, name: 'Voltorb', nameFr: 'Voltorbe', rate: 40, method: 'Floor Walking', versions: ['Red', 'Blue'] },
      { id: 125, name: 'Electabuzz', nameFr: 'Électhor', rate: 5, method: 'Floor Walking', versions: ['Red'] },
      { id: 145, name: 'Zapdos', nameFr: 'Électhor', rate: 100, method: 'Static Boss Encounter', versions: ['Red', 'Blue', 'Yellow'] }
    ]
  },
  {
    location: 'Cerulean Cave / Caverne Azurée',
    area: 'Post-Game Dungeon B1F',
    encounters: [
      { id: 65, name: 'Alakazam', nameFr: 'Alakazam', rate: 5, method: 'Floor Walking', versions: ['Yellow'] },
      { id: 130, name: 'Gyarados', nameFr: 'Léviator', rate: 15, method: 'Surfing', versions: ['Red', 'Blue'] },
      { id: 150, name: 'Mewtwo', nameFr: 'Mewtwo', rate: 100, method: 'Static Boss Encounter', versions: ['Red', 'Blue', 'Yellow'] }
    ]
  }
];

export function getPokemonArtworkUrl(id) {
  const numericId = Number(id);
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${numericId}.png`;
}

export function getPokemonSpriteUrl(id) {
  const numericId = Number(id);
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numericId}.png`;
}

export async function fetchPokemonDetails(idOrName) {
  const cacheKey = `pkmn_${idOrName}`.toLowerCase();
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  const localCached = localStorage.getItem(cacheKey);
  if (localCached) {
    const parsed = JSON.parse(localCached);
    cache.set(cacheKey, parsed);
    return parsed;
  }

  try {
    const res = await fetch(`${POKEAPI_BASE}/pokemon/${idOrName.toString().toLowerCase()}`);
    if (!res.ok) throw new Error(`PokéAPI request failed with status ${res.status}`);
    const data = await res.json();

    const numericId = data.id;
    const frenchName = POKEMON_NAMES_FR[numericId] || (data.name.charAt(0).toUpperCase() + data.name.slice(1));

    const formatted = {
      id: numericId,
      name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
      nameFr: frenchName,
      types: data.types.map(t => t.type.name),
      artwork: data.sprites.other['official-artwork']?.front_default || getPokemonArtworkUrl(numericId),
      sprite: data.sprites.front_default || getPokemonSpriteUrl(numericId),
      height: data.height / 10,
      weight: data.weight / 10,
      abilities: data.abilities.map(a => a.ability.name.replace('-', ' ')),
      stats: {
        hp: data.stats.find(s => s.stat.name === 'hp')?.base_stat || 50,
        atk: data.stats.find(s => s.stat.name === 'attack')?.base_stat || 50,
        def: data.stats.find(s => s.stat.name === 'defense')?.base_stat || 50,
        spa: data.stats.find(s => s.stat.name === 'special-attack')?.base_stat || 50,
        spd: data.stats.find(s => s.stat.name === 'special-defense')?.base_stat || 50,
        spe: data.stats.find(s => s.stat.name === 'speed')?.base_stat || 50
      }
    };

    cache.set(cacheKey, formatted);
    try {
      localStorage.setItem(cacheKey, JSON.stringify(formatted));
    } catch (e) {}
    return formatted;
  } catch (err) {
    const numericId = Number(idOrName);
    const found = KANTO_POKEMON_DATA.find(p => p.id === numericId || p.name.toLowerCase() === idOrName.toString().toLowerCase());
    if (found) {
      const fallbackObj = {
        id: found.id,
        name: found.name,
        nameFr: found.nameFr || POKEMON_NAMES_FR[found.id] || found.name,
        types: found.types,
        artwork: getPokemonArtworkUrl(found.id),
        sprite: getPokemonSpriteUrl(found.id),
        height: 1.2,
        weight: 35.0,
        abilities: ['Overgrow', 'Blaze', 'Torrent'],
        stats: found.stats
      };
      return fallbackObj;
    }

    return {
      id: numericId || 1,
      name: `Pokémon #${idOrName}`,
      nameFr: POKEMON_NAMES_FR[numericId] || `Pokémon #${idOrName}`,
      types: ['normal'],
      artwork: getPokemonArtworkUrl(idOrName || 1),
      sprite: getPokemonSpriteUrl(idOrName || 1),
      height: 1.0,
      weight: 20.0,
      abilities: ['Adaptive'],
      stats: { hp: 60, atk: 60, def: 60, spa: 60, spd: 60, spe: 60 }
    };
  }
}

// 18-Type Matchup Chart
export const TYPE_CHART = {
  normal:   { rock: 0.5, ghost: 0, steel: 0.5 },
  fire:     { fire: 0.5, water: 0.5, grass: 2, ice: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 2 },
  water:    { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 },
  grass:    { fire: 0.5, water: 2, grass: 0.5, poison: 0.5, ground: 2, flying: 0.5, bug: 0.5, rock: 2, dragon: 0.5, steel: 0.5 },
  electric: { water: 2, grass: 0.5, electric: 0.5, ground: 0, flying: 2, dragon: 0.5 },
  ice:      { fire: 0.5, water: 0.5, grass: 2, ice: 0.5, ground: 2, flying: 2, dragon: 2, steel: 0.5 },
  fighting: { normal: 2, ice: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 2, ghost: 0, dark: 2, steel: 2, fairy: 0.5 },
  poison:   { grass: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, fairy: 2 },
  ground:   { fire: 2, grass: 0.5, electric: 2, poison: 2, flying: 0, bug: 0.5, rock: 2, steel: 2 },
  flying:   { grass: 2, electric: 0.5, fighting: 2, bug: 2, rock: 0.5, steel: 0.5 },
  psychic:  { fighting: 2, poison: 2, psychic: 0.5, dark: 0, steel: 0.5 },
  bug:      { fire: 0.5, grass: 2, fighting: 0.5, poison: 0.5, flying: 0.5, psychic: 2, ghost: 0.5, dark: 2, steel: 0.5, fairy: 0.5 },
  rock:     { fire: 2, ice: 2, fighting: 0.5, ground: 0.5, flying: 2, bug: 2, steel: 0.5 },
  ghost:    { normal: 0, psychic: 2, ghost: 2, dark: 0.5 },
  dragon:   { dragon: 2, steel: 0.5, fairy: 0 },
  dark:     { fighting: 0.5, psychic: 2, ghost: 2, dark: 0.5, fairy: 0.5 },
  steel:    { fire: 0.5, water: 0.5, electric: 0.5, ice: 2, rock: 2, steel: 0.5, fairy: 2 },
  fairy:    { fire: 0.5, fighting: 2, poison: 0.5, dragon: 2, dark: 2, steel: 0.5 }
};

export function calculateTeamWeaknesses(team) {
  const allTypes = Object.keys(TYPE_CHART);
  const weaknessSummary = {};

  allTypes.forEach(atkType => {
    weaknessSummary[atkType] = {
      weakCount: 0,
      resistCount: 0,
      immuneCount: 0,
      weakMembers: []
    };
  });

  team.forEach(member => {
    if (!member || !member.types) return;
    
    allTypes.forEach(atkType => {
      let multiplier = 1.0;
      member.types.forEach(defType => {
        const factor = TYPE_CHART[atkType]?.[defType] ?? 1.0;
        multiplier *= factor;
      });

      if (multiplier > 1.0) {
        weaknessSummary[atkType].weakCount++;
        weaknessSummary[atkType].weakMembers.push(member.nameFr || member.name);
      } else if (multiplier === 0) {
        weaknessSummary[atkType].immuneCount++;
      } else if (multiplier < 1.0) {
        weaknessSummary[atkType].resistCount++;
      }
    });
  });

  return weaknessSummary;
}
