/**
 * Kinetic Dex - Dashboard View Component (with French Pokemon Names & i18n)
 */
import { store } from '../store/state.js';
import { getPokemonArtworkUrl } from '../api/pokeapi.js';
import { t } from '../i18n/translations.js';
import { getPokemonName } from '../i18n/pokemonNames.js';
import { animateNumberCounter } from '../utils/anim.js';
import { escapeHTML } from '../utils/sanitize.js';

export function renderDashboardView(container) {
  const state = store.state;
  const lang = state.lang;
  const globalStats = store.getCompletionStats('global');
  const kantoStats = store.getCompletionStats('kanto');
  const johtoStats = store.getCompletionStats('johto');
  const hoennStats = store.getCompletionStats('hoenn');

  const activeModeLabels = {
    speedrun: { title: 'SPEEDRUN MODE', desc: 'Target splits & skip route optimizations enabled', badge: 'bg-[#ff1c1c] text-white' },
    casual: { title: 'CASUAL TRACKER', desc: 'Full catch order & completionist checklists', badge: 'bg-emerald-600 text-white' },
    hardcore: { title: 'HARDCORE NUZLOCKE', desc: 'Permadeath rules, level caps & item restrictions active', badge: 'bg-purple-600 text-white' }
  };

  const modeInfo = activeModeLabels[state.activeMode] || activeModeLabels.speedrun;

  container.innerHTML = `
    <div class="p-8 space-y-8 animate-fadeIn select-none">
      
      <!-- Top Banner: Marathon Command Center -->
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1c1b1b] via-[#2a2a2a] to-[#131313] p-8 border border-white/10 glow-red">
        <div class="absolute -right-12 -bottom-12 w-64 h-64 bg-[#ff1c1c]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute right-32 top-0 w-64 h-64 bg-[#00f2ff]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div class="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div class="space-y-3 max-w-2xl">
            <div class="flex items-center gap-3">
              <span class="px-2.5 py-0.5 rounded text-xs font-mono font-bold ${modeInfo.badge}">
                ${modeInfo.title}
              </span>
              <span class="text-xs font-mono text-gray-400">SESSION ID: #KD-MARATHON-2026</span>
            </div>
            <h2 class="text-3xl font-sora font-extrabold text-white tracking-tight">
              ${t('commandCenterTitle', lang)}
            </h2>
            <p class="text-sm text-gray-300 font-mono leading-relaxed">
              ${t('commandCenterDesc', lang)}
            </p>

            <div class="flex items-center gap-4 pt-2">
              <a href="#marathon-routing" class="px-4 py-2 bg-[#ff1c1c] hover:bg-[#ff5545] text-white font-sora font-bold text-xs rounded-lg flex items-center gap-2 glow-red transition-all">
                <span class="material-symbols-outlined text-sm">alt_route</span>
                ${t('manageRouteState', lang)}
              </a>
              <a href="#regional-tracker" class="px-4 py-2 bg-[#2a2a2a] hover:bg-white/10 text-white font-sora font-semibold text-xs rounded-lg border border-white/10 flex items-center gap-2 transition-all">
                <span class="material-symbols-outlined text-sm text-[#00f2ff]">location_on</span>
                ${t('regionalTracker', lang)}
              </a>
            </div>
          </div>

          <!-- Overall Completion Radial / Gauge Box -->
          <div class="bg-[#131313]/80 p-6 rounded-xl border border-white/15 min-w-[240px] text-center space-y-3 backdrop-blur-md">
            <div class="text-xs font-mono text-gray-400 uppercase tracking-widest">${t('globalCompletion', lang)}</div>
            <div id="dash-global-stat" class="text-4xl font-sora font-black text-[#00f2ff] tracking-tight glow-cyan">
              0%
            </div>
            <div class="w-full bg-gray-800 rounded-full h-3 overflow-hidden border border-white/10 p-0.5">
              <div class="bg-gradient-to-r from-[#ff1c1c] via-[#e9c400] to-[#00f2ff] h-full rounded-full transition-all duration-500" style="width: ${globalStats.percentage}%"></div>
            </div>
            <div class="text-xs font-mono text-gray-400">
              <span class="text-white font-bold">${globalStats.caught}</span> / ${globalStats.total} ${t('pokemonCaught', lang)}
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Metrics Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <!-- Metric 1: Kanto Completion -->
        <div class="bg-[#1c1b1b] p-6 rounded-xl border border-white/10 space-y-3 hover:border-[#ff5545]/50 transition-colors">
          <div class="flex items-center justify-between text-gray-400">
            <span class="text-xs font-mono uppercase tracking-wider">${t('kantoRegion', lang)}</span>
            <span class="material-symbols-outlined text-[#ff1c1c]">map</span>
          </div>
          <div class="flex items-baseline justify-between">
            <span class="text-2xl font-sora font-extrabold text-white">${kantoStats.percentage}%</span>
            <span class="text-xs font-mono text-gray-400">${kantoStats.caught} / 151</span>
          </div>
          <div class="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <div class="bg-[#ff1c1c] h-full rounded-full" style="width: ${kantoStats.percentage}%"></div>
          </div>
        </div>

        <!-- Metric 2: Team Synergy Status -->
        <div class="bg-[#1c1b1b] p-6 rounded-xl border border-white/10 space-y-3 hover:border-cyan-500/50 transition-colors">
          <div class="flex items-center justify-between text-gray-400">
            <span class="text-xs font-mono uppercase tracking-wider">${t('teamSynergy', lang)}</span>
            <span class="material-symbols-outlined text-[#00f2ff]">diversity_3</span>
          </div>
          <div class="flex items-baseline justify-between">
            <span class="text-2xl font-sora font-extrabold text-white">${state.team.length} / 6</span>
            <span class="text-xs font-mono text-emerald-400 font-bold">READY</span>
          </div>
          <div class="text-xs font-mono text-gray-400 truncate">
            Active Roster: ${state.team.map(t => escapeHTML(getPokemonName(t, lang))).join(', ') || 'None'}
          </div>
        </div>

        <!-- Metric 3: Active Marathon State -->
        <div class="bg-[#1c1b1b] p-6 rounded-xl border border-white/10 space-y-3 hover:border-amber-500/50 transition-colors">
          <div class="flex items-center justify-between text-gray-400">
            <span class="text-xs font-mono uppercase tracking-wider">${t('routingState', lang)}</span>
            <span class="material-symbols-outlined text-[#e9c400]">speed</span>
          </div>
          <div class="flex items-baseline justify-between">
            <span class="text-xl font-sora font-bold text-white uppercase">${escapeHTML(state.activeMode)}</span>
            <span class="text-xs font-mono text-amber-400">ACTIVE</span>
          </div>
          <div class="text-xs font-mono text-gray-400">
            Next: Brock Gym (Pewter City)
          </div>
        </div>

        <!-- Metric 4: PokéAPI Connector -->
        <div class="bg-[#1c1b1b] p-6 rounded-xl border border-white/10 space-y-3 hover:border-emerald-500/50 transition-colors">
          <div class="flex items-center justify-between text-gray-400">
            <span class="text-xs font-mono uppercase tracking-wider">${t('apiLatency', lang)}</span>
            <span class="material-symbols-outlined text-emerald-400">api</span>
          </div>
          <div class="flex items-baseline justify-between">
            <span class="text-2xl font-sora font-extrabold text-emerald-400">12 ms</span>
            <span class="text-xs font-mono text-gray-400">CACHED</span>
          </div>
          <div class="text-xs font-mono text-gray-400">
            Local DB Sync: 100% Operational
          </div>
        </div>

      </div>

      <!-- Main Section Grid: Active Team & Regional Breakdown -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Left 2 Cols: Active Team Snapshot -->
        <div class="lg:col-span-2 bg-[#1c1b1b] p-6 rounded-2xl border border-white/10 space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-sora font-bold text-white">${t('strategicTeamRoster', lang)}</h3>
              <p class="text-xs font-mono text-gray-400">${t('teamRosterDesc', lang)}</p>
            </div>
            <a href="#team-planner" class="text-xs font-mono text-[#00f2ff] hover:underline flex items-center gap-1">
              ${t('openPlanner', lang)}
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>

          <!-- Team 6 Card Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
            ${state.team && state.team.length > 0 ? state.team.map((member, i) => {
              const displayName = escapeHTML(getPokemonName(member, lang));
              return `
                <div class="bg-[#2a2a2a] p-4 rounded-xl border border-white/10 hover:border-[#00f2ff]/50 transition-all flex flex-col items-center text-center space-y-2 group relative">
                  <span class="absolute top-2 left-2 text-[10px] font-mono text-gray-500">SLOT ${i + 1}</span>
                  <img src="${getPokemonArtworkUrl(member.id)}" alt="${displayName}" class="w-20 h-20 object-contain group-hover:scale-110 transition-transform" />
                  <div>
                    <div class="font-sora font-bold text-sm text-white">${displayName}</div>
                    <div class="flex gap-1 justify-center mt-1">
                      ${(member.types || ['normal']).map(t => `
                        <span class="text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase type-${t}">
                          ${t}
                        </span>
                      `).join('')}
                    </div>
                  </div>
                </div>
              `;
            }).join('') : `
              <div class="col-span-2 sm:col-span-3 bg-[#131313] p-8 rounded-xl border border-dashed border-white/10 text-center space-y-3">
                <span class="material-symbols-outlined text-gray-500 text-3xl">sports_esports</span>
                <p class="text-xs font-mono text-gray-400">
                  ${lang === 'fr' 
                    ? 'Aucun Pokémon dans l\'équipe active. Connectez-vous ou créez une équipe personnalisée.' 
                    : 'No active team members. Sign in or assemble your custom team.'}
                </p>
                <a href="#team-planner" class="inline-flex items-center gap-1.5 px-4 py-2 bg-[#ff1c1c] hover:bg-[#ff5545] text-white font-sora font-bold text-xs rounded-lg glow-red transition-all">
                  <span class="material-symbols-outlined text-sm">add_circle</span>
                  ${lang === 'fr' ? 'CONFIGURER L\'ÉQUIPE' : 'CONFIGURE TEAM'}
                </a>
              </div>
            `}
          </div>
        </div>

        <!-- Right Col: Regional Progress Summary -->
        <div class="bg-[#1c1b1b] p-6 rounded-2xl border border-white/10 space-y-6">
          <div>
            <h3 class="text-lg font-sora font-bold text-white">${t('regionalTrackerSummary', lang)}</h3>
            <p class="text-xs font-mono text-gray-400">Completion across all Pokémon generations</p>
          </div>

          <div class="space-y-4">
            
            <!-- Kanto -->
            <div class="space-y-1">
              <div class="flex justify-between text-xs font-mono">
                <span class="text-white font-bold">KANTO (GEN 1)</span>
                <span class="text-[#ff5545] font-bold">${kantoStats.percentage}% (${kantoStats.caught}/151)</span>
              </div>
              <div class="w-full bg-gray-800 rounded-full h-2">
                <div class="bg-[#ff1c1c] h-full rounded-full" style="width: ${kantoStats.percentage}%"></div>
              </div>
            </div>

            <!-- Johto -->
            <div class="space-y-1">
              <div class="flex justify-between text-xs font-mono">
                <span class="text-white font-bold">JOHTO (GEN 2)</span>
                <span class="text-amber-400 font-bold">${johtoStats.percentage}% (${johtoStats.caught}/100)</span>
              </div>
              <div class="w-full bg-gray-800 rounded-full h-2">
                <div class="bg-amber-400 h-full rounded-full" style="width: ${johtoStats.percentage}%"></div>
              </div>
            </div>

            <!-- Hoenn -->
            <div class="space-y-1">
              <div class="flex justify-between text-xs font-mono">
                <span class="text-white font-bold">HOENN (GEN 3)</span>
                <span class="text-cyan-400 font-bold">${hoennStats.percentage}% (${hoennStats.caught}/135)</span>
              </div>
              <div class="w-full bg-gray-800 rounded-full h-2">
                <div class="bg-cyan-400 h-full rounded-full" style="width: ${hoennStats.percentage}%"></div>
              </div>
            </div>

          </div>

          <a href="#regional-tracker" class="block w-full text-center py-2.5 bg-[#2a2a2a] hover:bg-[#353535] text-xs font-sora font-bold text-white rounded-lg border border-white/10 transition-colors">
            ${t('viewDetailedLog', lang)}
          </a>
        </div>

      </div>

    </div>
  `;

  setTimeout(() => {
    animateNumberCounter('#dash-global-stat', globalStats.percentage);
  }, 50);
}
