/**
 * Kinetic Dex - Regional Pokedex Tracker View (with French Pokemon Names & i18n)
 */
import { store } from '../store/state.js';
import { KANTO_REGIONAL_LOCATIONS, getPokemonArtworkUrl } from '../api/pokeapi.js';
import { t } from '../i18n/translations.js';
import { getPokemonName } from '../i18n/pokemonNames.js';
import { openAuthModal } from '../components/AuthModal.js';

let activeLocationFilter = 'all';

export function renderRegionalTrackerView(container) {
  const lang = store.state.lang;
  const kantoStats = store.getCompletionStats('kanto');

  let locations = KANTO_REGIONAL_LOCATIONS;
  if (activeLocationFilter !== 'all') {
    locations = locations.filter(l => l.location === activeLocationFilter);
  }

  container.innerHTML = `
    <div class="p-8 space-y-6 animate-fadeIn select-none">
      
      <!-- Top Banner: Regional Completion Header -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-[#1c1b1b] p-6 rounded-2xl border border-white/10 glow-cyan">
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00f2ff]/20 text-[#00f2ff] border border-[#00f2ff]/30">
              LOCATION-AREA TRACKER
            </span>
            <span class="text-xs font-mono text-gray-400">REGION: KANTO (GEN 1)</span>
          </div>
          <h2 class="text-2xl font-sora font-extrabold text-white tracking-tight">${t('regionalTrackerTitle', lang)}</h2>
          <p class="text-xs font-mono text-gray-400">${t('regionalTrackerDesc', lang)}</p>
        </div>

        <!-- Regional Progress Gauge -->
        <div class="bg-[#131313] p-4 rounded-xl border border-white/10 min-w-[240px] space-y-2">
          <div class="flex justify-between items-baseline">
            <span class="text-xs font-mono text-gray-400">${t('kantoCompletion', lang)}</span>
            <span class="text-xl font-sora font-bold text-[#00f2ff]">${kantoStats.percentage}%</span>
          </div>
          <div class="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden">
            <div class="bg-gradient-to-r from-[#ff1c1c] to-[#00f2ff] h-full rounded-full transition-all duration-300" style="width: ${kantoStats.percentage}%"></div>
          </div>
          <div class="text-[11px] font-mono text-gray-400 text-right">
            ${kantoStats.caught} / 151 ${t('pokemonCaught', lang)}
          </div>
        </div>
      </div>

      <!-- Location Filter Tabs -->
      <div class="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10">
        <button class="location-tab-btn px-4 py-2 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-colors ${activeLocationFilter === 'all' ? 'bg-[#00f2ff] text-black font-extrabold' : 'bg-[#1c1b1b] text-gray-400 hover:bg-white/10'}" data-loc="all">
          ${t('allKantoRoutes', lang)}
        </button>
        ${KANTO_REGIONAL_LOCATIONS.map(loc => `
          <button class="location-tab-btn px-4 py-2 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-colors ${activeLocationFilter === loc.location ? 'bg-[#00f2ff] text-black font-extrabold' : 'bg-[#1c1b1b] text-gray-400 hover:bg-white/10'}" data-loc="${loc.location}">
            ${loc.location}
          </button>
        `).join('')}
      </div>

      <!-- Location Cards Accordion / List -->
      <div class="space-y-6">
        ${locations.map(loc => `
          <div class="bg-[#1c1b1b] rounded-2xl border border-white/10 overflow-hidden">
            
            <!-- Location Header -->
            <div class="bg-[#2a2a2a] px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-[#ff5545]">pin_drop</span>
                <div>
                  <h3 class="font-sora font-bold text-base text-white">${loc.location}</h3>
                  <span class="text-xs font-mono text-gray-400">${loc.area}</span>
                </div>
              </div>
              <span class="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-500/30">
                ${loc.encounters.length} ${t('speciesEncountered', lang)}
              </span>
            </div>

            <!-- Encounters Table -->
            <div class="p-6 overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="border-b border-white/10 text-[11px] font-mono text-gray-400 uppercase">
                    <th class="pb-3">${t('caughtCol', lang)}</th>
                    <th class="pb-3">${t('speciesCol', lang)}</th>
                    <th class="pb-3">${t('rateCol', lang)}</th>
                    <th class="pb-3">${t('methodCol', lang)}</th>
                    <th class="pb-3">${t('versionsCol', lang)}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-white/5">
                  ${loc.encounters.map(enc => {
                    const isCaught = store.isCaught(enc.id);
                    const displayName = getPokemonName(enc, lang);
                    return `
                      <tr class="hover:bg-white/5 transition-colors ${isCaught ? 'bg-emerald-950/10' : ''}">
                        
                        <!-- Caught Checkbox -->
                        <td class="py-3 pr-4">
                          <button class="reg-caught-toggle w-6 h-6 rounded flex items-center justify-center border transition-all ${isCaught ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-gray-600 text-transparent hover:border-gray-400'}" data-id="${enc.id}">
                            <span class="material-symbols-outlined text-sm font-bold">check</span>
                          </button>
                        </td>

                        <!-- Pokemon Name & Artwork -->
                        <td class="py-3 pr-4">
                          <div class="flex items-center gap-3">
                            <img src="${getPokemonArtworkUrl(enc.id)}" alt="${displayName}" class="w-10 h-10 object-contain" />
                            <div>
                              <div class="font-sora font-bold text-sm text-white">${displayName}</div>
                              <div class="text-[10px] font-mono text-gray-400">#${enc.id.toString().padStart(3, '0')}</div>
                            </div>
                          </div>
                        </td>

                        <!-- Encounter Rate -->
                        <td class="py-3 pr-4">
                          <div class="flex items-center gap-2">
                            <span class="font-mono font-extrabold text-sm ${enc.rate >= 40 ? 'text-emerald-400' : enc.rate >= 15 ? 'text-amber-400' : 'text-red-400'}">
                              ${enc.rate}%
                            </span>
                            <div class="w-16 bg-gray-800 rounded-full h-1.5 overflow-hidden hidden sm:block">
                              <div class="h-full ${enc.rate >= 40 ? 'bg-emerald-400' : enc.rate >= 15 ? 'bg-amber-400' : 'bg-red-400'}" style="width: ${enc.rate}%"></div>
                            </div>
                          </div>
                        </td>

                        <!-- Method -->
                        <td class="py-3 pr-4">
                          <span class="text-xs font-mono px-2 py-1 rounded bg-[#2a2a2a] text-gray-300 border border-white/10">
                            ${enc.method}
                          </span>
                        </td>

                        <!-- Version Exclusives -->
                        <td class="py-3">
                          <div class="flex gap-1">
                            ${enc.versions.map(v => {
                              const colorMap = {
                                Red: 'bg-red-950 text-red-300 border-red-500/40',
                                Blue: 'bg-blue-950 text-blue-300 border-blue-500/40',
                                Yellow: 'bg-yellow-950 text-yellow-300 border-yellow-500/40'
                              };
                              return `
                                <span class="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${colorMap[v] || 'bg-gray-800 text-white'}">
                                  ${v}
                                </span>
                              `;
                            }).join('')}
                          </div>
                        </td>

                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>

          </div>
        `).join('')}
      </div>

    </div>
  `;

  // Attach tab events
  container.querySelectorAll('.location-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeLocationFilter = btn.getAttribute('data-loc');
      renderRegionalTrackerView(container);
    });
  });

  // Attach caught toggles
  container.querySelectorAll('.reg-caught-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const success = store.toggleCaught(id);
      if (!success) {
        openAuthModal('login');
      } else {
        renderRegionalTrackerView(container);
      }
    });
  });
}
