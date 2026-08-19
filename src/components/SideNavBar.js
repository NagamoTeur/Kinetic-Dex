/**
 * Kinetic Dex - Side Navigation Bar Component (i18n translated)
 */
import { store } from '../store/state.js';
import { t } from '../i18n/translations.js';

export function renderSideNavBar() {
  const container = document.getElementById('side-navbar');
  if (!container) return;

  const currentTab = store.state.activeTab || 'dashboard';
  const lang = store.state.lang;

  const navItems = [
    { id: 'dashboard', label: t('dashboard', lang), icon: 'grid_view', tag: 'OVERVIEW' },
    { id: 'global-index', label: t('globalIndex', lang), icon: 'dataset', tag: '9 GENS' },
    { id: 'regional-tracker', label: t('regionalTracker', lang), icon: 'location_on', tag: 'KANTO' },
    { id: 'team-planner', label: t('teamPlanner', lang), icon: 'diversity_3', tag: 'SYNERGY' },
    { id: 'marathon-routing', label: t('marathonRouting', lang), icon: 'alt_route', tag: 'STATE' },
    { id: 'route-guide', label: t('routeGuide', lang), icon: 'map', tag: 'GEN 1-8' },
    { id: 'profile', label: t('profile', lang), icon: 'badge', tag: 'STATS' }
  ];

  container.innerHTML = `
    <aside class="w-64 bg-[#0e0e0e] border-r border-white/10 flex flex-col justify-between h-[calc(100vh-57px)] select-none">
      
      <!-- Top Section: Menu Links -->
      <div class="py-4 px-3 space-y-1">
        <div class="px-3 pb-2 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">
          ${t('navCommands', lang)}
        </div>

        ${navItems.map(item => {
          const isActive = currentTab === item.id;
          const activeClasses = isActive 
            ? 'bg-gradient-to-r from-red-950/60 to-[#1c1b1b] text-white border-l-4 border-[#ff1c1c] font-bold glow-red'
            : 'text-gray-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent';

          const iconColor = isActive ? 'text-[#ff5545]' : 'text-gray-500 group-hover:text-gray-300';
          const tagColor = isActive ? 'bg-[#ff5545]/20 text-[#ff5545] border-[#ff5545]/40' : 'bg-white/5 text-gray-400 border-white/5';

          return `
            <a href="#${item.id}" 
               class="group flex items-center justify-between px-3 py-2.5 rounded-r-lg text-sm transition-all duration-150 ${activeClasses}">
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined ${iconColor} text-xl transition-colors">
                  ${item.icon}
                </span>
                <span class="font-sora tracking-wide">${item.label}</span>
              </div>
              <span class="text-[9px] font-mono px-1.5 py-0.5 rounded border uppercase tracking-wider ${tagColor}">
                ${item.tag}
              </span>
            </a>
          `;
        }).join('')}
      </div>

      <!-- Bottom Section: System Status & Timer Widget -->
      <div class="p-4 m-3 bg-[#1c1b1b] rounded-xl border border-white/10 space-y-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span class="text-xs font-mono font-bold text-white">${t('pokeapiStatus', lang)}</span>
          </div>
          <span class="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">ONLINE</span>
        </div>

        <div class="text-[11px] font-mono text-gray-400 leading-relaxed">
          Active Sync: LocalStorage & IndexedDB Caching enabled.
        </div>

        <div class="pt-2 border-t border-white/10 flex items-center justify-between">
          <span class="text-[10px] font-mono text-gray-500">POKÉ-MODERNE OS</span>
          <span class="text-[10px] font-mono text-cyan-400">ANTIGRAVITY</span>
        </div>
      </div>

    </aside>
  `;
}
