/**
 * Kinetic Dex - Top Navigation Bar Component (with Page Reload on Language Change)
 */
import { store } from '../store/state.js';
import { t } from '../i18n/translations.js';
import { openAuthModal } from './AuthModal.js';
import { escapeHTML } from '../utils/sanitize.js';

export function renderTopNavBar() {
  const container = document.getElementById('top-navbar');
  if (!container) return;

  const state = store.state;
  const lang = state.lang;
  const stats = store.getCompletionStats('global');
  const profile = state.profile;
  const currentUser = state.currentUser;

  const modeBadges = {
    speedrun: { label: 'SPEEDRUN MODE', color: 'bg-primary-container text-white border-red-500 glow-red' },
    casual: { label: 'CASUAL GUIDE', color: 'bg-emerald-950 text-emerald-300 border-emerald-500' },
    hardcore: { label: 'HARDCORE NUZLOCKE', color: 'bg-purple-950 text-purple-300 border-purple-500' }
  };

  const activeBadge = modeBadges[state.activeMode] || modeBadges.speedrun;
  const safeSessionName = profile ? escapeHTML(profile.sessionName) : (lang === 'fr' ? 'Invite Déconnecté' : 'Guest Offline');
  const safeName = profile ? escapeHTML(profile.name) : '';
  const safeTitle = profile ? escapeHTML(profile.title) : '';

  container.innerHTML = `
    <div class="flex items-center justify-between px-6 py-3 bg-[#131313] border-b border-white/10 text-white select-none">
      
      <!-- Left: Brand & Runner Session -->
      <div class="flex items-center gap-4">
        <a href="#dashboard" class="flex items-center gap-3 group cursor-pointer">
          <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-[#ff1c1c] to-[#00f2ff] p-0.5 flex items-center justify-center glow-red group-hover:scale-105 transition-transform">
            <div class="w-full h-full bg-[#131313] rounded-[7px] flex items-center justify-center">
              <span class="material-symbols-outlined text-[#ff1c1c] text-xl font-bold">bolt</span>
            </div>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="font-sora font-extrabold text-lg tracking-wider text-white">${t('brandTitle', lang)}<span class="text-[#ff5545]">${t('brandSubtitle', lang)}</span></h1>
              <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-cyan-400 border border-cyan-500/30">v4.0</span>
            </div>
            <p class="text-xs text-gray-400 font-mono">${t('sessionLabel', lang)} <span class="text-white">${safeSessionName}</span></p>
          </div>
        </a>

        <div class="h-8 w-px bg-white/10 hidden md:block"></div>

        <!-- Mode Badge -->
        <div class="hidden md:flex items-center gap-2">
          <span class="text-[11px] font-mono text-gray-400 uppercase tracking-widest">STATE:</span>
          <span class="text-xs font-mono font-bold px-2.5 py-1 rounded border ${activeBadge.color}">
            ${activeBadge.label}
          </span>
        </div>
      </div>

      <!-- Center: Search Trigger -->
      <div class="hidden lg:flex items-center flex-1 max-w-md mx-8">
        <div id="quick-search-trigger" class="w-full bg-[#1c1b1b] hover:bg-[#2a2a2a] border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-3 cursor-pointer text-gray-400 transition-colors">
          <span class="material-symbols-outlined text-gray-400 text-sm">search</span>
          <span class="text-xs font-mono">${t('quickSearchPlaceholder', lang)}</span>
          <kbd class="ml-auto text-[10px] font-mono bg-white/10 px-1.5 py-0.5 rounded text-gray-300">Ctrl + K</kbd>
        </div>
      </div>

      <!-- Right: Global Completion Meter, Language Switcher & User Auth -->
      <div class="flex items-center gap-4">
        
        <!-- Language Switcher Button (FR / EN) with Page Reload -->
        <button id="lang-toggle-btn" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2a2a2a] hover:bg-white/10 border border-white/15 text-xs font-mono font-bold text-white transition-all glow-cyan cursor-pointer" title="Switch Language & Reload">
          <span class="text-sm">${lang === 'fr' ? '🇫🇷' : '🇬🇧'}</span>
          <span class="uppercase">${lang === 'fr' ? 'FR' : 'EN'}</span>
        </button>

        <div class="h-8 w-px bg-white/10 hidden sm:block"></div>

        <!-- Global Progress Bar -->
        <div class="flex items-center gap-3">
          <div class="text-right">
            <div class="text-[10px] font-mono text-gray-400 uppercase tracking-wider">${t('marathonProgress', lang)}</div>
            <div class="text-sm font-mono font-extrabold text-[#00f2ff] flex items-center justify-end gap-1">
              <span>${stats.percentage}%</span>
              <span class="text-xs text-gray-400">(${stats.caught}/${stats.total})</span>
            </div>
          </div>
          
          <div class="w-20 h-2.5 bg-gray-800 rounded-full overflow-hidden border border-white/10 p-0.5">
            <div class="h-full bg-gradient-to-r from-[#ff1c1c] via-[#e9c400] to-[#00f2ff] rounded-full transition-all duration-500" style="width: ${stats.percentage}%"></div>
          </div>
        </div>

        <div class="h-8 w-px bg-white/10 hidden sm:block"></div>

        <!-- Auth / Runner Profile Button -->
        ${currentUser ? `
          <div class="flex items-center gap-3">
            <a href="#profile" class="flex items-center gap-2.5 hover:opacity-85 transition-opacity cursor-pointer">
              <div class="relative">
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-cyan-500 p-0.5">
                  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/1.png" alt="Runner" class="w-full h-full object-cover rounded-full bg-gray-900" />
                </div>
                <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#131313]"></span>
              </div>
              <div class="hidden xl:block text-left">
                <div class="text-xs font-sora font-bold text-white leading-none">${safeName}</div>
                <div class="text-[10px] font-mono text-cyan-400 leading-tight">${safeTitle}</div>
              </div>
            </a>

            <button id="logout-btn" class="p-1.5 text-gray-400 hover:text-red-400 transition-colors" title="${lang === 'fr' ? 'Déconnexion' : 'Log out'}">
              <span class="material-symbols-outlined text-lg">logout</span>
            </button>
          </div>
        ` : `
          <div class="flex items-center gap-2">
            <button id="nav-login-btn" class="px-3 py-1.5 rounded-lg bg-[#2a2a2a] hover:bg-white/10 border border-white/10 text-xs font-mono font-bold text-white transition-colors">
              ${lang === 'fr' ? 'CONNEXION' : 'LOG IN'}
            </button>
            <button id="nav-register-btn" class="px-3 py-1.5 rounded-lg bg-[#ff1c1c] hover:bg-[#ff5545] text-xs font-mono font-bold text-white glow-red transition-colors">
              ${lang === 'fr' ? 'S\'INSCRIRE' : 'REGISTER'}
            </button>
          </div>
        `}

      </div>

    </div>
  `;

  // Language toggle with automatic window reload
  container.querySelector('#lang-toggle-btn')?.addEventListener('click', () => {
    store.toggleLang();
    window.location.reload();
  });

  container.querySelector('#logout-btn')?.addEventListener('click', () => {
    store.logout();
    window.location.reload();
  });

  container.querySelector('#nav-login-btn')?.addEventListener('click', () => {
    openAuthModal('login');
  });

  container.querySelector('#nav-register-btn')?.addEventListener('click', () => {
    openAuthModal('register');
  });

  container.querySelector('#quick-search-trigger')?.addEventListener('click', () => {
    store.setActiveTab('global-index');
    window.location.hash = '#global-index';
    setTimeout(() => {
      const searchInput = document.getElementById('global-search-input');
      if (searchInput) searchInput.focus();
    }, 100);
  });
}
