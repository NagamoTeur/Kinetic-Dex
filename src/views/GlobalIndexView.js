/**
 * Kinetic Dex - Global Pokedex Index View (Generations 1 to 9 + Alternate Forms)
 */
import { store } from '../store/state.js';
import { KANTO_POKEMON_DATA, getPokemonArtworkUrl, fetchPokemonDetails, fetchAllPokemonCatalog } from '../api/pokeapi.js';
import { t } from '../i18n/translations.js';
import { getPokemonName } from '../i18n/pokemonNames.js';
import { openAuthModal } from '../components/AuthModal.js';
import { renderPokeballSvg } from '../components/PokeballIcon.js';
import { animatePokeballClick } from '../utils/anim.js';

let searchQuery = '';
let selectedGen = 'all';
let selectedType = 'all';
let fullCatalogCache = null;

export async function renderGlobalIndexView(container) {
  const state = store.state;
  const lang = state.lang;

  if (!fullCatalogCache) {
    fullCatalogCache = await fetchAllPokemonCatalog();
  }

  let items = fullCatalogCache && fullCatalogCache.length > 0 ? fullCatalogCache : [...KANTO_POKEMON_DATA];

  if (selectedGen === 'forms') {
    items = items.filter(p => p.isForm || p.id >= 10000 || (p.rawName && p.rawName.includes('-')));
  } else if (selectedGen !== 'all') {
    items = items.filter(p => p.gen === Number(selectedGen));
  }

  if (selectedType !== 'all') {
    items = items.filter(p => p.types && p.types.includes(selectedType.toLowerCase()));
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    items = items.filter(p => {
      const name = (p.nameFr || getPokemonName(p, lang)).toLowerCase();
      const engName = (p.name || '').toLowerCase();
      const rawName = (p.rawName || '').toLowerCase();
      return name.includes(q) || engName.includes(q) || rawName.includes(q) || p.id.toString() === q;
    });
  }

  const allTypes = [
    'all', 'normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 
    'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 
    'dark', 'steel', 'fairy'
  ];

  const genTabs = [
    { id: 'all', label: t('allGens', lang) },
    { id: 'forms', label: '✨ ' + (lang === 'fr' ? 'FORMES ALTERNATIVES' : 'ALTERNATE FORMS') },
    { id: '1', label: 'GEN 1 (KANTO)' },
    { id: '2', label: 'GEN 2 (JOHTO)' },
    { id: '3', label: 'GEN 3 (HOENN)' },
    { id: '4', label: 'GEN 4 (SINNOH)' },
    { id: '5', label: 'GEN 5 (UNOVA)' },
    { id: '6', label: 'GEN 6 (KALOS)' },
    { id: '7', label: 'GEN 7 (ALOLA)' },
    { id: '8', label: 'GEN 8 (GALAR)' },
    { id: '9', label: 'GEN 9 (PALDEA)' }
  ];

  container.innerHTML = `
    <div class="p-8 space-y-6 animate-fadeIn select-none">
      
      <!-- Top Header & Search Bar -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#1c1b1b] p-6 rounded-2xl border border-white/10">
        <div>
          <h2 class="text-2xl font-sora font-extrabold text-white tracking-tight">${t('globalPokedexTitle', lang)}</h2>
          <p class="text-xs font-mono text-gray-400">${t('globalPokedexDesc', lang)}</p>
        </div>

        <!-- Search Input -->
        <div class="relative min-w-[320px]">
          <span class="material-symbols-outlined absolute left-3.5 top-3 text-gray-400">search</span>
          <input type="text" id="global-search-input" value="${searchQuery}" placeholder="${t('searchPlaceholder', lang)}"
                 class="w-full bg-[#131313] border border-white/10 focus:border-[#00f2ff] rounded-xl pl-10 pr-4 py-2.5 text-sm font-mono text-white placeholder-gray-500 outline-none transition-colors" />
        </div>
      </div>

      <!-- Generation Filter Tabs -->
      <div class="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10">
        ${genTabs.map(g => `
          <button class="gen-tab-btn px-4 py-2 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-colors ${selectedGen === g.id ? 'bg-[#ff1c1c] text-white glow-red' : 'bg-[#1c1b1b] text-gray-400 hover:bg-white/10 hover:text-white'}" data-gen="${g.id}">
            ${g.label}
          </button>
        `).join('')}
      </div>

      <!-- Type Filter Pills -->
      <div class="flex items-center gap-2 overflow-x-auto pb-2">
        <span class="text-xs font-mono text-gray-500 uppercase tracking-wider mr-2">${t('typeLabel', lang)}</span>
        ${allTypes.map(t => `
          <button class="type-filter-btn text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full transition-all ${selectedType === t ? 'bg-[#00f2ff] text-black font-extrabold shadow-cyan' : 'bg-[#2a2a2a] text-gray-300 hover:bg-white/20'}" data-type="${t}">
            ${t}
          </button>
        `).join('')}
      </div>

      <!-- Pokedex Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
        ${items.slice(0, 150).map(p => {
          const isCaught = store.isCaught(p.id);
          const displayName = p.nameFr || getPokemonName(p, lang);
          const isForm = p.id >= 10000 || p.isForm;
          return `
            <div class="poke-card group bg-[#1c1b1b] p-4 rounded-xl border ${isCaught ? 'border-emerald-500/60 bg-emerald-950/20' : 'border-white/10 hover:border-[#ff5545]/50'} transition-all cursor-pointer flex flex-col justify-between" data-id="${p.id}" data-name="${p.rawName || p.name}">
              
              <!-- Top Row: ID & Caught Pokéball Button -->
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-1.5">
                  <span class="text-xs font-mono text-gray-400 font-bold">#${p.id.toString().padStart(3, '0')}</span>
                  ${isForm ? '<span class="text-[8px] font-mono px-1 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">FORM</span>' : ''}
                </div>
                <button class="caught-toggle-btn p-1 rounded-full flex items-center justify-center transition-all cursor-pointer ${isCaught ? 'bg-red-950/40 border border-red-500/50' : 'hover:bg-white/5'}" data-id="${p.id}" title="${isCaught ? (lang === 'fr' ? 'Capturé !' : 'Caught!') : (lang === 'fr' ? 'Marquer comme capturé' : 'Mark as caught')}">
                  ${renderPokeballSvg(isCaught, 22)}
                </button>
              </div>

              <!-- Center Artwork -->
              <div class="py-4 flex justify-center">
                <img src="${p.artwork || getPokemonArtworkUrl(p.id)}" alt="${displayName}" loading="lazy" class="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-200" />
              </div>

              <!-- Bottom Info -->
              <div class="space-y-2 text-center">
                <h3 class="font-sora font-bold text-sm text-white group-hover:text-[#00f2ff] transition-colors">${displayName}</h3>
                <div class="flex justify-center gap-1">
                  ${(p.types || ['normal']).map(t => `
                    <span class="text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase type-${t}">${t}</span>
                  `).join('')}
                </div>
              </div>

            </div>
          `;
        }).join('')}
      </div>

    </div>

    <!-- Details Modal Container -->
    <div id="poke-detail-modal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md hidden items-center justify-center p-4">
      <div id="modal-card" class="bg-[#1c1b1b] border border-white/20 rounded-2xl max-w-lg w-full p-6 space-y-6 relative glow-red">
        <button id="close-modal-btn" class="absolute top-4 right-4 text-gray-400 hover:text-white">
          <span class="material-symbols-outlined text-2xl">close</span>
        </button>
        <div id="modal-content" class="space-y-4 text-center">
          <!-- Dynamically populated -->
        </div>
      </div>
    </div>
  `;

  // Attach Listeners
  const searchInput = container.querySelector('#global-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderGlobalIndexView(container);
    });
  }

  container.querySelectorAll('.gen-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedGen = btn.getAttribute('data-gen');
      renderGlobalIndexView(container);
    });
  });

  container.querySelectorAll('.type-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedType = btn.getAttribute('data-type');
      renderGlobalIndexView(container);
    });
  });

  container.querySelectorAll('.caught-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      animatePokeballClick(btn);
      const id = btn.getAttribute('data-id');
      const success = store.toggleCaught(id);
      if (!success) {
        openAuthModal('login');
      }
    });
  });

  container.querySelectorAll('.poke-card').forEach(card => {
    card.addEventListener('click', async (e) => {
      if (e.target.closest('.caught-toggle-btn')) return;
      const rawName = card.getAttribute('data-name');
      const id = card.getAttribute('data-id');
      await openPokemonModal(rawName || id, lang);
    });
  });
}

async function openPokemonModal(id, lang) {
  const modal = document.getElementById('poke-detail-modal');
  const modalContent = document.getElementById('modal-content');
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `<div class="p-8 text-gray-400 font-mono">Loading PokéAPI data...</div>`;
  modal.classList.remove('hidden');
  modal.classList.add('flex');

  const pokemon = await fetchPokemonDetails(id);
  const displayName = getPokemonName(pokemon, lang);

  modalContent.innerHTML = `
    <div class="flex items-center justify-between text-left">
      <div>
        <span class="text-xs font-mono text-gray-400 font-bold">#${pokemon.id.toString().padStart(3, '0')}</span>
        <h2 class="text-2xl font-sora font-extrabold text-white">${displayName}</h2>
      </div>
      <div class="flex gap-1">
        ${pokemon.types.map(t => `
          <span class="text-xs font-mono px-2 py-0.5 rounded font-bold uppercase type-${t}">${t}</span>
        `).join('')}
      </div>
    </div>

    <div class="py-4 flex justify-center bg-[#131313] rounded-xl border border-white/10">
      <img src="${pokemon.artwork}" alt="${displayName}" class="w-44 h-44 object-contain" />
    </div>

    <!-- Base Stats -->
    <div class="space-y-2 text-left">
      <h4 class="text-xs font-mono font-bold text-gray-400 uppercase">${t('baseStatsAnalysis', lang)}</h4>
      
      <div class="space-y-1 text-xs font-mono">
        <div class="flex items-center gap-2">
          <span class="w-12 text-gray-400">HP</span>
          <div class="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden">
            <div class="bg-red-500 h-full" style="width: ${Math.min(100, (pokemon.stats.hp / 150) * 100)}%"></div>
          </div>
          <span class="w-8 text-right text-white font-bold">${pokemon.stats.hp}</span>
        </div>

        <div class="flex items-center gap-2">
          <span class="w-12 text-gray-400">ATK</span>
          <div class="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden">
            <div class="bg-orange-500 h-full" style="width: ${Math.min(100, (pokemon.stats.atk / 150) * 100)}%"></div>
          </div>
          <span class="w-8 text-right text-white font-bold">${pokemon.stats.atk}</span>
        </div>

        <div class="flex items-center gap-2">
          <span class="w-12 text-gray-400">DEF</span>
          <div class="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden">
            <div class="bg-yellow-500 h-full" style="width: ${Math.min(100, (pokemon.stats.def / 150) * 100)}%"></div>
          </div>
          <span class="w-8 text-right text-white font-bold">${pokemon.stats.def}</span>
        </div>

        <div class="flex items-center gap-2">
          <span class="w-12 text-gray-400">SpA</span>
          <div class="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden">
            <div class="bg-cyan-400 h-full" style="width: ${Math.min(100, (pokemon.stats.spa / 150) * 100)}%"></div>
          </div>
          <span class="w-8 text-right text-white font-bold">${pokemon.stats.spa}</span>
        </div>

        <div class="flex items-center gap-2">
          <span class="w-12 text-gray-400">SpD</span>
          <div class="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden">
            <div class="bg-blue-500 h-full" style="width: ${Math.min(100, (pokemon.stats.spd / 150) * 100)}%"></div>
          </div>
          <span class="w-8 text-right text-white font-bold">${pokemon.stats.spd}</span>
        </div>

        <div class="flex items-center gap-2">
          <span class="w-12 text-gray-400">SPE</span>
          <div class="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden">
            <div class="bg-purple-500 h-full" style="width: ${Math.min(100, (pokemon.stats.spe / 150) * 100)}%"></div>
          </div>
          <span class="w-8 text-right text-white font-bold">${pokemon.stats.spe}</span>
        </div>
      </div>

    </div>

    <!-- Add to Team Button -->
    <button id="add-to-team-btn" class="w-full py-2.5 bg-[#ff1c1c] hover:bg-[#ff5545] text-white font-sora font-bold text-xs rounded-xl glow-red transition-colors">
      ${t('addToLineup', lang)}
    </button>
  `;

  document.getElementById('close-modal-btn')?.addEventListener('click', () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  });

  document.getElementById('add-to-team-btn')?.addEventListener('click', () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    const success = store.addTeamMember(pokemon);
    if (!success) {
      alert(lang === 'fr' ? 'Votre équipe est déjà complète (maximum 6 Pokémon) !' : 'Your team is already full (maximum 6 Pokémon)!');
    }
  });
}
