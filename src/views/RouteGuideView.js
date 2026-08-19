/**
 * Kinetic Dex - Revamped Multi-Mode Route Guide View (Casual, Speedrun & Hardcore Nuzlocke)
 */
import { store } from '../store/state.js';
import { t } from '../i18n/translations.js';
import { MARATHON_MODE_ROUTES } from '../data/marathonModeRoutes.js';
import { SPEEDRUN_ROUTES } from '../data/speedrunRoutes.js';

let activeGuideMode = 'casual'; // 'casual' | 'speedrun' | 'hardcore'
let selectedGameKey = 'gen1';

export function renderRouteGuideView(container) {
  const state = store.state;
  const lang = state.lang;

  const modeData = MARATHON_MODE_ROUTES[selectedGameKey] || MARATHON_MODE_ROUTES.gen1;

  const gameTabs = [
    { key: 'gen1', label: 'Gen 1: Red / Blue / Yellow' },
    { key: 'gen2', label: 'Gen 2: Gold / Silver / Crystal' },
    { key: 'gen3', label: 'Gen 3: Ruby / Sapphire / Emerald' },
    { key: 'gen4', label: 'Gen 4: Diamond / Pearl / Platinum' },
    { key: 'gen5', label: 'Gen 5: Black / White' },
    { key: 'gen6', label: 'Gen 6: X / Y' },
    { key: 'gen7', label: 'Gen 7: Sun / Moon / USUM' },
    { key: 'gen8', label: 'Gen 8: Sword / Shield' }
  ];

  container.innerHTML = `
    <div class="p-8 space-y-8 animate-fadeIn select-none">
      
      <!-- Top Banner Header -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-[#1c1b1b] p-6 rounded-2xl border border-white/10 glow-cyan">
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-500/30">
              MULTIMODE ROUTING ENGINE (GEN 1 - 8)
            </span>
            <span class="text-xs font-mono text-gray-400">STATE: ${activeGuideMode.toUpperCase()}</span>
          </div>
          <h2 class="text-2xl font-sora font-extrabold text-white tracking-tight">
            ${lang === 'fr' ? 'GUIDES ET CONSEILS DE ROUTING DYNAMIQUES' : 'DYNAMIC ROUTING GUIDES & ADVICE'}
          </h2>
          <p class="text-xs font-mono text-gray-400">
            ${lang === 'fr' ? 'Basculez entre les modes Casual (Conseils & Captures), Speedrun (Splits & Skips) et Hardcore (Nuzlocke & Pièges)' : 'Switch between Casual (Advice & Catches), Speedrun (Splits & Skips), and Hardcore (Nuzlocke & Traps)'}
          </p>
        </div>

        <!-- Mode Selector Switcher (Casual / Speedrun / Hardcore) -->
        <div class="flex items-center gap-2 bg-[#131313] p-1.5 rounded-xl border border-white/10">
          <button class="guide-mode-btn px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${activeGuideMode === 'casual' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}" data-mode="casual">
            🌿 ${lang === 'fr' ? 'CASUAL (CONSEILS)' : 'CASUAL (ADVICE)'}
          </button>
          <button class="guide-mode-btn px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${activeGuideMode === 'speedrun' ? 'bg-[#ff1c1c] text-white glow-red' : 'text-gray-400 hover:text-white'}" data-mode="speedrun">
            ⚡ SPEEDRUN
          </button>
          <button class="guide-mode-btn px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${activeGuideMode === 'hardcore' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}" data-mode="hardcore">
            💀 HARDCORE (NUZLOCKE)
          </button>
        </div>
      </div>

      <!-- Game Selection Tabs -->
      <div class="space-y-2">
        <span class="text-xs font-mono text-gray-400 font-bold uppercase tracking-wider block">${t('selectGame', lang)}</span>
        <div class="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10">
          ${gameTabs.map(tab => `
            <button class="game-route-btn px-4 py-2.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all ${selectedGameKey === tab.key ? 'bg-[#ff1c1c] text-white glow-red border border-red-400' : 'bg-[#1c1b1b] text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'}" data-key="${tab.key}">
              🎮 ${tab.label}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- DYNAMIC CONTENT AREA BASED ON MODE -->

      ${activeGuideMode === 'casual' ? renderCasualContent(modeData.casual, lang) : ''}
      ${activeGuideMode === 'speedrun' ? renderSpeedrunContent(selectedGameKey, lang) : ''}
      ${activeGuideMode === 'hardcore' ? renderHardcoreContent(modeData.hardcore, lang) : ''}

    </div>
  `;

  // Attach guide mode switcher listeners
  container.querySelectorAll('.guide-mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeGuideMode = btn.getAttribute('data-mode');
      store.setMode(activeGuideMode);
      renderRouteGuideView(container);
    });
  });

  // Attach game tab button listeners
  container.querySelectorAll('.game-route-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedGameKey = btn.getAttribute('data-key');
      renderRouteGuideView(container);
    });
  });
}

function renderCasualContent(casualData, lang) {
  if (!casualData) return `<div class="p-6 text-gray-400 font-mono text-xs bg-[#1c1b1b] rounded-2xl">Guide Casual disponible pour Gen 1-8.</div>`;

  return `
    <div class="space-y-6">
      
      <!-- Overview Banner -->
      <div class="bg-emerald-950/40 border border-emerald-500/40 p-6 rounded-2xl space-y-2">
        <h3 class="font-sora font-extrabold text-lg text-emerald-300">
          🌿 ${lang === 'fr' ? casualData.titleFR : casualData.titleEN}
        </h3>
        <p class="text-xs font-mono text-emerald-200/80 leading-relaxed">
          ${lang === 'fr' ? casualData.descFR : casualData.descEN}
        </p>
      </div>

      <!-- Casual Walkthrough Steps with Advice -->
      <div class="space-y-6">
        ${casualData.steps.map((step, idx) => `
          <div class="bg-[#1c1b1b] p-6 rounded-2xl border border-white/10 hover:border-emerald-500/40 transition-colors space-y-4">
            
            <div class="flex items-center gap-3 border-b border-white/10 pb-3">
              <span class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold text-sm flex items-center justify-center border border-emerald-500/40">
                0${idx + 1}
              </span>
              <h4 class="font-sora font-extrabold text-base text-white">
                ${lang === 'fr' ? step.titleFR : step.titleEN}
              </h4>
            </div>

            <!-- Beginner Advice Box -->
            <div class="bg-amber-950/40 border border-amber-500/40 p-4 rounded-xl text-xs font-mono text-amber-200 leading-relaxed">
              ${lang === 'fr' ? step.adviceFR : step.adviceEN}
            </div>

            <!-- Recommended Catches & Items Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              
              <!-- Catches -->
              <div class="bg-[#131313] p-4 rounded-xl border border-white/5 space-y-2">
                <h5 class="text-xs font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-sm">catch_control</span>
                  ${lang === 'fr' ? 'POKÉMON CONSEILLÉS À CAPTURER' : 'RECOMMENDED CATCHES'}
                </h5>
                <ul class="space-y-1">
                  ${(lang === 'fr' ? step.catchesFR : step.catchesEN).map(c => `
                    <li class="text-xs font-mono text-gray-300 flex items-center gap-2">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      ${c}
                    </li>
                  `).join('')}
                </ul>
              </div>

              <!-- Items -->
              <div class="bg-[#131313] p-4 rounded-xl border border-white/5 space-y-2">
                <h5 class="text-xs font-mono font-bold text-cyan-400 uppercase flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-sm">inventory_2</span>
                  ${lang === 'fr' ? 'OBJETS ET CS IMPORTANTS' : 'IMPORTANT ITEMS & HMS'}
                </h5>
                <div class="flex flex-wrap gap-1.5">
                  ${(lang === 'fr' ? step.itemsFR : step.itemsEN).map(i => `
                    <span class="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-[#2a2a2a] text-cyan-300 border border-cyan-500/30">
                      🔑 ${i}
                    </span>
                  `).join('')}
                </div>
              </div>

            </div>

          </div>
        `).join('')}
      </div>

    </div>
  `;
}

function renderSpeedrunContent(gameKey, lang) {
  const speedrunData = SPEEDRUN_ROUTES[gameKey] || SPEEDRUN_ROUTES.gen1;

  return `
    <div class="space-y-6">
      
      <!-- Speedrun Overview Card -->
      <div class="bg-[#1c1b1b] p-6 rounded-2xl border border-white/10 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span class="text-xs font-mono text-cyan-400 font-bold">GEN ${speedrunData.gen} ANY% SPEEDRUN ROUTE</span>
            <h3 class="font-sora font-extrabold text-xl text-white">${speedrunData.game}</h3>
          </div>

          <div class="flex gap-4">
            <div class="bg-[#131313] px-4 py-2 rounded-xl border border-white/10 text-center">
              <span class="text-[10px] font-mono text-gray-400 block">${t('estimatedTime', lang)}</span>
              <span class="font-sora font-bold text-sm text-[#00f2ff]">${speedrunData.estTime}</span>
            </div>
            <div class="bg-[#131313] px-4 py-2 rounded-xl border border-white/10 text-center">
              <span class="text-[10px] font-mono text-gray-400 block">${t('mainAttacker', lang)}</span>
              <span class="font-sora font-bold text-xs text-amber-400">${speedrunData.pokemon}</span>
            </div>
          </div>
        </div>

        <div class="space-y-1">
          <h4 class="text-xs font-mono font-bold text-gray-400 uppercase">${t('keyStrategy', lang)}</h4>
          <p class="text-xs font-mono text-gray-200 leading-relaxed bg-[#131313] p-4 rounded-xl border border-white/5">
            ${lang === 'fr' ? speedrunData.strategyFR : speedrunData.strategyEN}
          </p>
        </div>
      </div>

      <!-- Step-by-Step Route Walkthrough -->
      <div class="space-y-4">
        <h3 class="font-sora font-bold text-base text-white uppercase tracking-wider">${t('stepByStepWalkthrough', lang)}</h3>

        <div class="space-y-4">
          ${speedrunData.steps.map((step, idx) => `
            <div class="bg-[#1c1b1b] p-6 rounded-2xl border border-white/10 hover:border-[#ff5545]/40 transition-colors space-y-3">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div class="flex items-center gap-3">
                  <span class="w-8 h-8 rounded-lg bg-[#ff1c1c]/20 text-[#ff1c1c] font-mono font-bold text-sm flex items-center justify-center border border-[#ff1c1c]/40">
                    0${idx + 1}
                  </span>
                  <h4 class="font-sora font-extrabold text-base text-white">
                    ${lang === 'fr' ? step.titleFR : step.titleEN}
                  </h4>
                </div>
                <span class="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded border border-cyan-500/30 w-fit">
                  ⏱️ SPLIT: ${step.time}
                </span>
              </div>

              <p class="text-xs font-mono text-gray-300 leading-relaxed bg-[#131313] p-4 rounded-xl border border-white/5">
                ${lang === 'fr' ? step.detailsFR : step.detailsEN}
              </p>
            </div>
          `).join('')}
        </div>
      </div>

    </div>
  `;
}

function renderHardcoreContent(hardcoreData, lang) {
  if (!hardcoreData) return `<div class="p-6 text-gray-400 font-mono text-xs bg-[#1c1b1b] rounded-2xl">Guide Hardcore Nuzlocke disponible pour Gen 1-8.</div>`;

  return `
    <div class="space-y-6">
      
      <!-- Hardcore Overview Banner -->
      <div class="bg-purple-950/40 border border-purple-500/50 p-6 rounded-2xl space-y-2 glow-red">
        <h3 class="font-sora font-extrabold text-lg text-purple-300">
          💀 ${lang === 'fr' ? hardcoreData.titleFR : hardcoreData.titleEN}
        </h3>
        <p class="text-xs font-mono text-purple-200/80 leading-relaxed">
          ${lang === 'fr' ? hardcoreData.descFR : hardcoreData.descEN}
        </p>
      </div>

      <!-- Hardcore Dangers & Trap Warnings -->
      <div class="space-y-4">
        ${hardcoreData.steps.map((step, idx) => `
          <div class="bg-[#1c1b1b] p-6 rounded-2xl border border-red-500/50 space-y-4">
            
            <div class="flex items-center gap-3 border-b border-white/10 pb-3">
              <span class="w-8 h-8 rounded-lg bg-red-950 text-red-400 font-mono font-bold text-sm flex items-center justify-center border border-red-500/50">
                0${idx + 1}
              </span>
              <h4 class="font-sora font-extrabold text-base text-white">
                ${lang === 'fr' ? step.titleFR : step.titleEN}
              </h4>
            </div>

            <!-- Danger Warning Box -->
            <div class="bg-red-950/80 border-2 border-red-500 p-4 rounded-xl text-xs font-mono text-red-100 leading-relaxed animate-pulse-slow">
              ${lang === 'fr' ? step.dangerFR : step.dangerEN}
            </div>

            <!-- Nuzlocke Rule Restriction -->
            <div class="bg-[#131313] p-4 rounded-xl border border-white/5 text-xs font-mono text-purple-300 flex items-center gap-2">
              <span class="material-symbols-outlined text-purple-400 text-sm">gavel</span>
              <span>${lang === 'fr' ? step.ruleFR : step.ruleEN}</span>
            </div>

          </div>
        `).join('')}
      </div>

    </div>
  `;
}
