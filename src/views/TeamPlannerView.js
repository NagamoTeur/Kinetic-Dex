/**
 * Kinetic Dex - Strategic Team Planner View (with Game Selection & Mode Libre)
 */
import { store } from '../store/state.js';
import { calculateTeamWeaknesses, getPokemonArtworkUrl, KANTO_POKEMON_DATA, fetchPokemonDetails, fetchAllPokemonCatalog } from '../api/pokeapi.js';
import { t } from '../i18n/translations.js';
import { getPokemonName } from '../i18n/pokemonNames.js';
import { openAuthModal } from '../components/AuthModal.js';

let selectedGameFilter = 'free'; // 'free' | 'forms' | 'gen1' | 'gen2' | 'gen3' | 'gen4' | 'gen5' | 'gen6' | 'gen7' | 'gen8' | 'gen9'

export function renderTeamPlannerView(container) {
  const lang = store.state.lang;
  const team = store.state.team;
  const weaknessSummary = calculateTeamWeaknesses(team);

  const criticalVulnerabilities = Object.entries(weaknessSummary)
    .filter(([_, data]) => data.weakCount >= 3)
    .map(([type, data]) => ({ type, count: data.weakCount, members: data.weakMembers }));

  let totalPhysicalStat = 0;
  let totalSpecialStat = 0;
  team.forEach(member => {
    if (member && member.stats) {
      totalPhysicalStat += member.stats.atk || 50;
      totalSpecialStat += member.stats.spa || 50;
    }
  });

  const grandTotal = totalPhysicalStat + totalSpecialStat || 1;
  const physPercent = Math.round((totalPhysicalStat / grandTotal) * 100);
  const specPercent = 100 - physPercent;

  const gameOptions = [
    { id: 'free', labelFR: '🌐 Mode Libre (Tous les 1025 Pokémon + Formes)', labelEN: '🌐 Free Mode (All 1025 Pokémon + Forms)' },
    { id: 'forms', labelFR: '✨ Formes Alternatives (Méga, Alola, Galar, Hisui, Paldea, Gigamax...)', labelEN: '✨ Alternate Forms (Mega, Alola, Galar, Hisui, Paldea, Gmax...)' },
    { id: 'gen1', labelFR: '🎮 Gen 1: Rouge / Bleu / Jaune (Kanto 1-151)', labelEN: '🎮 Gen 1: Red / Blue / Yellow (Kanto 1-151)' },
    { id: 'gen2', labelFR: '🎮 Gen 2: Or / Argent / Cristal (Johto 152-251)', labelEN: '🎮 Gen 2: Gold / Silver / Crystal (Johto 152-251)' },
    { id: 'gen3', labelFR: '🎮 Gen 3: Rubis / Saphir / Émeraude (Hoenn 252-386)', labelEN: '🎮 Gen 3: Ruby / Sapphire / Emerald (Hoenn 252-386)' },
    { id: 'gen4', labelFR: '🎮 Gen 4: Diamant / Perle / Platine (Sinnoh 387-493)', labelEN: '🎮 Gen 4: Diamond / Pearl / Platinum (Sinnoh 387-493)' },
    { id: 'gen5', labelFR: '🎮 Gen 5: Noir / Blanc (Unys 494-649)', labelEN: '🎮 Gen 5: Black / White (Unova 494-649)' },
    { id: 'gen6', labelFR: '🎮 Gen 6: X / Y (Kalos 650-721)', labelEN: '🎮 Gen 6: X / Y (Kalos 650-721)' },
    { id: 'gen7', labelFR: '🎮 Gen 7: Soleil / Lune (Alola 722-809)', labelEN: '🎮 Gen 7: Sun / Moon (Alola 722-809)' },
    { id: 'gen8', labelFR: '🎮 Gen 8: Épée / Bouclier (Galar 810-905)', labelEN: '🎮 Gen 8: Sword / Shield (Galar 810-905)' },
    { id: 'gen9', labelFR: '🎮 Gen 9: Écarlate / Violet (Paldea 906-1025)', labelEN: '🎮 Gen 9: Scarlet / Violet (Paldea 906-1025)' }
  ];

  container.innerHTML = `
    <div class="p-8 space-y-8 animate-fadeIn select-none">
      
      <!-- Top Banner: Team Planner & Synergy Engine -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-[#1c1b1b] p-6 rounded-2xl border border-white/10 glow-gold">
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#e9c400]/20 text-[#e9c400] border border-[#e9c400]/30">
              ${t('strategicAnalysisTitle', lang)}
            </span>
            <span class="text-xs font-mono text-gray-400">${t('rosterSize', lang)} ${team.length} / 6</span>
          </div>
          <h2 class="text-2xl font-sora font-extrabold text-white tracking-tight">${t('teamSynergyMatrix', lang)}</h2>
          <p class="text-xs font-mono text-gray-400">${t('teamSynergyDesc', lang)}</p>
        </div>

        <button id="clear-team-btn" class="px-4 py-2 bg-red-950/80 hover:bg-red-900 text-red-300 text-xs font-mono font-bold rounded-lg border border-red-500/40 transition-colors">
          ${t('resetTeam', lang)}
        </button>
      </div>

      <!-- Game Selection & Free Mode Filter Bar -->
      <div class="bg-[#1c1b1b] p-4 rounded-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-[#00f2ff]">sports_esports</span>
          <span class="text-xs font-mono font-bold text-white uppercase">
            ${lang === 'fr' ? 'SÉLECTEUR DE JEU POUR TEAM BUILDING :' : 'GAME / DEX FILTER FOR TEAM BUILDING:'}
          </span>
        </div>

        <select id="game-dex-filter" class="bg-[#131313] border border-white/15 focus:border-[#00f2ff] rounded-xl px-4 py-2 text-xs font-mono font-bold text-cyan-400 outline-none cursor-pointer">
          ${gameOptions.map(opt => `
            <option value="${opt.id}" ${selectedGameFilter === opt.id ? 'selected' : ''}>
              ${lang === 'fr' ? opt.labelFR : opt.labelEN}
            </option>
          `).join('')}
        </select>
      </div>

      <!-- Critical Vulnerability Warning Banners (Synergy Engine) -->
      ${criticalVulnerabilities.length > 0 ? `
        <div class="space-y-3">
          ${criticalVulnerabilities.map(vuln => `
            <div class="bg-red-950/80 border-2 border-red-500 p-4 rounded-xl flex items-center justify-between glow-red animate-pulse-slow">
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-red-400 text-2xl">warning</span>
                <div>
                  <h4 class="font-sora font-bold text-sm text-white uppercase tracking-wider">
                    ${t('criticalVulnerability', lang)} <span class="text-red-400 font-extrabold">${vuln.type.toUpperCase()}</span> (${vuln.count}/6 ${t('membersWeak', lang)})
                  </h4>
                  <p class="text-xs font-mono text-red-200">
                    ${t('weakMembersList', lang)} ${vuln.members.join(', ')}.
                  </p>
                </div>
              </div>
              <span class="px-3 py-1 bg-red-500 text-black text-xs font-mono font-extrabold rounded-lg uppercase">
                HIGH RISK
              </span>
            </div>
          `).join('')}
        </div>
      ` : `
        <div class="bg-emerald-950/40 border border-emerald-500/50 p-4 rounded-xl flex items-center gap-3">
          <span class="material-symbols-outlined text-emerald-400 text-xl">verified</span>
          <div>
            <h4 class="font-sora font-bold text-sm text-emerald-300">${t('synergyOptimalTitle', lang)}</h4>
            <p class="text-xs font-mono text-emerald-400/80">${t('synergyOptimalDesc', lang)}</p>
          </div>
        </div>
      `}

      <!-- 6 Pokémon Slot Grid -->
      <div class="space-y-3">
        <h3 class="font-sora font-bold text-base text-white">${t('activeLineup', lang)}</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${[0, 1, 2, 3, 4, 5].map(index => {
            const member = team[index];
            if (member) {
              const displayName = getPokemonName(member, lang);
              return `
                <div class="bg-[#1c1b1b] p-5 rounded-2xl border border-white/10 relative group hover:border-[#00f2ff]/50 transition-all flex flex-col justify-between">
                  <button class="remove-slot-btn absolute top-3 right-3 text-gray-500 hover:text-red-400 transition-colors" data-index="${index}" title="Remove Member">
                    <span class="material-symbols-outlined text-lg">close</span>
                  </button>

                  <div class="flex items-center gap-4">
                    <img src="${getPokemonArtworkUrl(member.id)}" alt="${displayName}" class="w-20 h-20 object-contain group-hover:scale-105 transition-transform" />
                    <div>
                      <span class="text-[10px] font-mono text-gray-500">SLOT ${index + 1}</span>
                      <h4 class="font-sora font-extrabold text-base text-white">${displayName}</h4>
                      <div class="flex gap-1 mt-1">
                        ${(member.types || ['normal']).map(t => `
                          <span class="text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase type-${t}">${t}</span>
                        `).join('')}
                      </div>
                    </div>
                  </div>

                  <!-- Quick Stats Grid -->
                  <div class="mt-4 pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-xs font-mono">
                    <div class="bg-[#2a2a2a] p-1.5 rounded">
                      <div class="text-[9px] text-gray-400">ATK</div>
                      <div class="font-bold text-orange-400">${member.stats?.atk || 50}</div>
                    </div>
                    <div class="bg-[#2a2a2a] p-1.5 rounded">
                      <div class="text-[9px] text-gray-400">SpA</div>
                      <div class="font-bold text-cyan-400">${member.stats?.spa || 50}</div>
                    </div>
                    <div class="bg-[#2a2a2a] p-1.5 rounded">
                      <div class="text-[9px] text-gray-400">SPE</div>
                      <div class="font-bold text-purple-400">${member.stats?.spe || 50}</div>
                    </div>
                  </div>

                </div>
              `;
            } else {
              return `
                <div class="add-slot-btn bg-[#1c1b1b]/50 border-2 border-dashed border-white/10 hover:border-[#00f2ff]/60 p-8 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors text-gray-500 hover:text-white" data-index="${index}">
                  <span class="material-symbols-outlined text-3xl">add_circle</span>
                  <span class="font-sora font-bold text-xs">${t('addPokemonSlot', lang)} ${index + 1}</span>
                </div>
              `;
            }
          }).join('')}
        </div>
      </div>

      <!-- Main Analysis Grid: Weakness Matrix & Physical/Special Split -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Left 2 Cols: 18-Type Weakness Matrix Table -->
        <div class="lg:col-span-2 bg-[#1c1b1b] p-6 rounded-2xl border border-white/10 space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-sora font-bold text-base text-white">${t('defensiveMatrixTitle', lang)}</h3>
              <p class="text-xs font-mono text-gray-400">${t('defensiveMatrixDesc', lang)}</p>
            </div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            ${Object.entries(weaknessSummary).map(([atkType, data]) => {
              const isVuln = data.weakCount >= 3;
              return `
                <div class="p-3 rounded-xl border transition-all text-center space-y-1 ${isVuln ? 'bg-red-950/60 border-red-500 glow-red' : 'bg-[#2a2a2a] border-white/5'}">
                  <span class="text-[10px] font-mono font-bold uppercase block px-1 py-0.5 rounded type-${atkType}">
                    ${atkType}
                  </span>

                  <div class="text-xs font-mono space-y-0.5 pt-1">
                    <div class="text-red-400 font-bold">Weak: ${data.weakCount}</div>
                    <div class="text-emerald-400">Resist: ${data.resistCount}</div>
                    <div class="text-cyan-400">Immune: ${data.immuneCount}</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Right Col: Physical vs Special Breakdown -->
        <div class="bg-[#1c1b1b] p-6 rounded-2xl border border-white/10 space-y-6">
          <div>
            <h3 class="font-sora font-bold text-base text-white">${t('offensiveBalanceTitle', lang)}</h3>
            <p class="text-xs font-mono text-gray-400">${t('offensiveBalanceDesc', lang)}</p>
          </div>

          <div class="space-y-4">
            <div class="flex justify-between text-xs font-mono font-bold">
              <span class="text-orange-400">${t('physical', lang)}: ${physPercent}%</span>
              <span class="text-cyan-400">${t('special', lang)}: ${specPercent}%</span>
            </div>

            <div class="w-full bg-gray-800 rounded-full h-4 overflow-hidden flex border border-white/10">
              <div class="bg-orange-500 h-full transition-all duration-500" style="width: ${physPercent}%"></div>
              <div class="bg-cyan-400 h-full transition-all duration-500" style="width: ${specPercent}%"></div>
            </div>
          </div>
        </div>

      </div>

    </div>

    <!-- Member Picker Modal -->
    <div id="picker-modal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md hidden items-center justify-center p-4 select-none">
      <div class="bg-[#1c1b1b] border border-white/20 rounded-2xl max-w-md w-full p-6 space-y-4 glow-gold">
        <div class="flex justify-between items-center">
          <h3 class="font-sora font-bold text-lg text-white">${t('selectPokemonForTeam', lang)}</h3>
          <button id="close-picker-btn" class="text-gray-400 hover:text-white">
            <span class="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        <input type="text" id="picker-search-input" placeholder="Search..." 
               class="w-full bg-[#131313] border border-white/10 rounded-xl px-3 py-2 text-sm font-mono text-white outline-none focus:border-[#e9c400]" />

        <div id="picker-list" class="max-h-72 overflow-y-auto space-y-2 pr-1">
          <!-- Dynamically populated -->
        </div>
      </div>
    </div>
  `;

  // Attach game filter listener
  container.querySelector('#game-dex-filter')?.addEventListener('change', (e) => {
    selectedGameFilter = e.target.value;
  });

  // Attach clear team event
  container.querySelector('#clear-team-btn')?.addEventListener('click', () => {
    store.setTeam([]);
    renderTeamPlannerView(container);
  });

  // Attach remove slot events
  container.querySelectorAll('.remove-slot-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.getAttribute('data-index'));
      store.removeTeamMember(idx);
      renderTeamPlannerView(container);
    });
  });

  // Attach add slot modal picker events
  container.querySelectorAll('.add-slot-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!store.state.currentUser) {
        openAuthModal('login');
      } else {
        openPickerModal(lang);
      }
    });
  });
}

async function openPickerModal(lang) {
  const modal = document.getElementById('picker-modal');
  const pickerList = document.getElementById('picker-list');
  const searchInput = document.getElementById('picker-search-input');
  if (!modal || !pickerList || !searchInput) return;

  modal.classList.remove('hidden');
  modal.classList.add('flex');

  pickerList.innerHTML = `
    <div class="p-8 text-center text-gray-400 font-mono space-y-2">
      <div class="inline-block w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      <div>${lang === 'fr' ? 'Chargement du Pokédex Global (1025+ Formes)...' : 'Loading Global Pokédex (1025+ Forms)...'}</div>
    </div>
  `;

  const fullCatalog = await fetchAllPokemonCatalog();

  const genRanges = {
    free: [1, 99999],
    forms: [10001, 99999],
    gen1: [1, 151],
    gen2: [152, 251],
    gen3: [252, 386],
    gen4: [387, 493],
    gen5: [494, 649],
    gen6: [650, 721],
    gen7: [722, 809],
    gen8: [810, 905],
    gen9: [906, 1025]
  };

  const [minId, maxId] = genRanges[selectedGameFilter] || [1, 99999];

  function renderList(query = '') {
    let items = fullCatalog;
    
    if (selectedGameFilter === 'forms') {
      items = items.filter(p => p.isForm || p.id >= 10000 || (p.rawName && p.rawName.includes('-')));
    } else if (selectedGameFilter !== 'free') {
      items = items.filter(p => (p.id >= minId && p.id <= maxId) || (p.gen && p.gen.toString() === selectedGameFilter.replace('gen', '')));
    }

    if (query.trim()) {
      const q = query.toLowerCase().trim();
      items = items.filter(p => {
        const displayName = (p.nameFr || getPokemonName(p, lang)).toLowerCase();
        const engName = (p.name || '').toLowerCase();
        const rawName = (p.rawName || '').toLowerCase();
        return displayName.includes(q) || engName.includes(q) || rawName.includes(q) || p.id.toString() === q;
      });
    }

    if (items.length === 0) {
      pickerList.innerHTML = `
        <div class="p-6 text-center text-xs font-mono text-gray-500">
          ${lang === 'fr' ? 'Aucun Pokémon trouvé.' : 'No Pokémon found.'}
        </div>
      `;
      return;
    }

    pickerList.innerHTML = items.slice(0, 150).map(p => {
      const displayName = p.nameFr || getPokemonName(p, lang);
      const isForm = p.id >= 10000 || p.isForm;
      return `
        <div class="picker-item flex items-center justify-between p-2.5 bg-[#2a2a2a] hover:bg-white/10 rounded-xl cursor-pointer transition-colors" data-id="${p.id}" data-name="${p.rawName || p.name}">
          <div class="flex items-center gap-3">
            <img src="${p.artwork || getPokemonArtworkUrl(p.id)}" alt="${displayName}" loading="lazy" class="w-10 h-10 object-contain" />
            <div>
              <div class="font-sora font-bold text-sm text-white flex items-center gap-1.5">
                <span>${displayName}</span>
                ${isForm ? '<span class="text-[8px] font-mono px-1 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">FORM</span>' : ''}
              </div>
              <div class="text-[10px] font-mono text-gray-400">#${p.id.toString().padStart(3, '0')}</div>
            </div>
          </div>
          <span class="material-symbols-outlined text-[#ff1c1c] text-lg hover:scale-125 transition-transform">add_circle</span>
        </div>
      `;
    }).join('');

    pickerList.querySelectorAll('.picker-item').forEach(item => {
      item.addEventListener('click', async () => {
        const id = item.getAttribute('data-id');
        const rawName = item.getAttribute('data-name');
        const details = await fetchPokemonDetails(rawName || id);
        const success = store.addTeamMember(details);
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        if (!success) {
          openAuthModal('login');
        }
      });
    });
  }

  renderList();

  searchInput.oninput = (e) => {
    renderList(e.target.value);
  };

  document.getElementById('close-picker-btn').onclick = () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  };
}
