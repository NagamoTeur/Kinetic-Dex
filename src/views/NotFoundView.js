/**
 * Kinetic Dex - Custom Glitched 404 Not Found View Component
 */
import { store } from '../store/state.js';
import { t } from '../i18n/translations.js';
import { animate404Glitch, animatePageEntrance } from '../utils/anim.js';

export function renderNotFoundView(container) {
  const state = store.state;
  const lang = state.lang;
  const currentUri = (window.location.pathname + window.location.hash) || '/404';

  container.innerHTML = `
    <div class="min-h-[calc(100vh-120px)] flex flex-col items-center justify-center p-6 text-center select-none space-y-8 relative overflow-hidden">
      
      <!-- Ambient Background Glows -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#ff1c1c]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute top-1/3 left-1/3 w-64 h-64 bg-[#00f2ff]/10 rounded-full blur-3xl pointer-events-none"></div>

      <!-- MissingNo / Glitch Central Graphic -->
      <div class="relative flex items-center justify-center">
        <!-- Pulse Ring -->
        <div class="pulse-ring absolute w-48 h-48 rounded-full border border-[#ff1c1c]/40 pointer-events-none"></div>
        <div class="pulse-ring absolute w-64 h-64 rounded-full border border-cyan-500/20 pointer-events-none"></div>

        <!-- MissingNo Block / Pokeball Graphic -->
        <div class="glitch-box relative w-36 h-36 rounded-2xl bg-gradient-to-br from-[#1c1b1b] via-[#2a2a2a] to-[#0e0e0e] border-2 border-red-500/60 p-4 flex flex-col items-center justify-center shadow-2xl glow-red">
          
          <!-- Pixel Grid Pattern for MissingNo -->
          <div class="grid grid-cols-5 gap-1 w-full h-full opacity-80">
            <div class="bg-red-500 rounded-sm"></div>
            <div class="bg-cyan-400 rounded-sm"></div>
            <div class="bg-amber-400 rounded-sm"></div>
            <div class="bg-purple-500 rounded-sm"></div>
            <div class="bg-emerald-400 rounded-sm"></div>
            
            <div class="bg-gray-800 rounded-sm"></div>
            <div class="bg-[#ff1c1c] rounded-sm col-span-3"></div>
            <div class="bg-gray-800 rounded-sm"></div>
            
            <div class="bg-cyan-500 rounded-sm"></div>
            <div class="bg-white rounded-sm"></div>
            <div class="bg-black rounded-sm"></div>
            <div class="bg-white rounded-sm"></div>
            <div class="bg-red-500 rounded-sm"></div>

            <div class="bg-gray-800 rounded-sm"></div>
            <div class="bg-amber-400 rounded-sm col-span-3"></div>
            <div class="bg-gray-800 rounded-sm"></div>

            <div class="bg-emerald-500 rounded-sm"></div>
            <div class="bg-purple-500 rounded-sm"></div>
            <div class="bg-cyan-400 rounded-sm"></div>
            <div class="bg-red-500 rounded-sm"></div>
            <div class="bg-white rounded-sm"></div>
          </div>

          <!-- Overlay Icon -->
          <div class="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] rounded-2xl">
            <span class="material-symbols-outlined text-4xl text-[#ff5545] glitch-text font-bold">question_mark</span>
          </div>

          <!-- Corner Badges -->
          <span class="absolute -top-3 -right-3 px-2 py-0.5 rounded bg-red-600 text-white font-mono text-[9px] font-bold border border-red-400 glow-red">
            MISSINGNO #000
          </span>
        </div>
      </div>

      <!-- Error Text Header & Description -->
      <div class="max-w-xl space-y-3 relative z-10">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 font-mono text-xs font-bold">
          <span class="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
          <span>${t('notFoundTitle', lang)}</span>
        </div>

        <h1 class="text-4xl md:text-5xl font-sora font-black text-white tracking-tight glitch-text">
          ${t('notFoundSubtitle', lang)}
        </h1>

        <p class="text-gray-400 font-mono text-xs md:text-sm leading-relaxed">
          ${t('notFoundDesc', lang)}
        </p>

        <!-- Technical Terminal Snippet -->
        <div class="mx-auto max-w-md bg-[#0e0e0e] p-3 rounded-lg border border-white/10 text-left font-mono text-[11px] space-y-1 text-gray-400 select-text">
          <div class="flex items-center justify-between text-gray-500 text-[10px] pb-1 border-b border-white/5">
            <span>TERMINAL_DIAGNOSTIC</span>
            <span class="text-red-400">ERR_URI_404</span>
          </div>
          <div><span class="text-cyan-400">URI:</span> <span class="text-white">${currentUri}</span></div>
          <div><span class="text-cyan-400">STATUS:</span> <span class="text-red-400">UNRESOLVED_ROUTE</span></div>
          <div><span class="text-cyan-400">SUGGESTION:</span> <span class="text-emerald-400">Redirecting to valid checkpoint...</span></div>
        </div>
      </div>

      <!-- Quick Action Search Bar -->
      <div class="w-full max-w-md relative z-10 space-y-2">
        <div class="relative">
          <span class="material-symbols-outlined absolute left-3.5 top-3 text-gray-400">search</span>
          <input type="text" id="notfound-search-input" placeholder="${t('notFoundSearchPrompt', lang)}"
                 class="w-full bg-[#1c1b1b] border border-white/15 focus:border-[#00f2ff] rounded-xl pl-10 pr-12 py-2.5 text-xs font-mono text-white placeholder-gray-500 outline-none transition-all shadow-lg" />
          <button id="notfound-search-btn" class="absolute right-2 top-2 p-1 bg-[#00f2ff] hover:bg-cyan-300 text-black rounded-lg transition-colors" title="Rechercher">
            <span class="material-symbols-outlined text-sm font-bold">arrow_forward</span>
          </button>
        </div>
      </div>

      <!-- Navigation Jump Buttons -->
      <div class="flex flex-wrap items-center justify-center gap-3 relative z-10 pt-2">
        <a href="#dashboard" class="px-5 py-2.5 bg-[#ff1c1c] hover:bg-[#ff5545] text-white font-sora font-bold text-xs rounded-xl flex items-center gap-2 glow-red transition-all">
          <span class="material-symbols-outlined text-base">grid_view</span>
          ${t('notFoundBackHome', lang)}
        </a>

        <a href="#global-index" class="px-5 py-2.5 bg-[#2a2a2a] hover:bg-white/10 text-white font-sora font-semibold text-xs rounded-xl border border-white/15 flex items-center gap-2 transition-all">
          <span class="material-symbols-outlined text-base text-[#00f2ff]">dataset</span>
          ${t('notFoundExploreDex', lang)}
        </a>

        <a href="#team-planner" class="px-5 py-2.5 bg-[#2a2a2a] hover:bg-white/10 text-white font-sora font-semibold text-xs rounded-xl border border-white/15 flex items-center gap-2 transition-all">
          <span class="material-symbols-outlined text-base text-amber-400">diversity_3</span>
          ${t('notFoundTeamPlanner', lang)}
        </a>
      </div>

    </div>
  `;

  // Attach search bar listener
  const searchInput = container.querySelector('#notfound-search-input');
  const searchBtn = container.querySelector('#notfound-search-btn');

  const executeSearch = () => {
    const query = searchInput?.value.trim();
    window.location.hash = '#global-index';
    if (query) {
      setTimeout(() => {
        const globalSearchInput = document.getElementById('global-search-input');
        if (globalSearchInput) {
          globalSearchInput.value = query;
          globalSearchInput.dispatchEvent(new Event('input', { bubbles: true }));
          globalSearchInput.focus();
        }
      }, 150);
    }
  };

  searchInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') executeSearch();
  });
  searchBtn?.addEventListener('click', executeSearch);

  // Trigger Anime.js effects
  animate404Glitch(container);
  animatePageEntrance(container);
}
