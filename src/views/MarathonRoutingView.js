/**
 * Kinetic Dex - Marathon Routing View (with i18n)
 */
import { store } from '../store/state.js';
import { t } from '../i18n/translations.js';

const KANTO_CHECKPOINTS = [
  { id: 'kanto_chk_1', badge: 'Boulder Badge', leader: 'Brock (Pewter City)', levelCap: 14, icon: 'shield', keyItems: ['HM05 Flash'], splitTime: '00:25:00' },
  { id: 'kanto_chk_2', badge: 'Cascade Badge', leader: 'Misty (Cerulean City)', levelCap: 21, icon: 'water_drop', keyItems: ['S.S. Ticket', 'Bicycle'], splitTime: '00:55:00' },
  { id: 'kanto_chk_3', badge: 'Thunder Badge', leader: 'Lt. Surge (Vermilion City)', levelCap: 24, icon: 'bolt', keyItems: ['HM01 Cut'], splitTime: '01:20:00' },
  { id: 'kanto_chk_4', badge: 'Rainbow Badge', leader: 'Erika (Celadon City)', levelCap: 29, icon: 'eco', keyItems: ['Silph Scope', 'HM02 Fly'], splitTime: '01:50:00' },
  { id: 'kanto_chk_5', badge: 'Soul Badge', leader: 'Koga (Fuchsia City)', levelCap: 43, icon: 'skull', keyItems: ['HM03 Surf', 'HM04 Strength'], splitTime: '02:30:00' },
  { id: 'kanto_chk_6', badge: 'Marsh Badge', leader: 'Sabrina (Saffron City)', levelCap: 43, icon: 'psychology', keyItems: ['Master Ball'], splitTime: '03:00:00' },
  { id: 'kanto_chk_7', badge: 'Volcano Badge', leader: 'Blaine (Cinnabar Island)', levelCap: 47, icon: 'local_fire_department', keyItems: ['Secret Key'], splitTime: '03:30:00' },
  { id: 'kanto_chk_8', badge: 'Earth Badge', leader: 'Giovanni (Viridian Gym)', levelCap: 50, icon: 'landscape', keyItems: ['TM26 Earthquake'], splitTime: '04:00:00' },
  { id: 'kanto_chk_e4', badge: 'Indigo Plateau', leader: 'Elite Four & Champion', levelCap: 65, icon: 'trophy', keyItems: ['Hall of Fame'], splitTime: '04:45:00' }
];

export function renderMarathonRoutingView(container) {
  const state = store.state;
  const lang = state.lang;

  const modeDescriptions = {
    speedrun: {
      title: 'SPEEDRUN MODE',
      tagline: 'Target splits & fast path skips enabled',
      rules: ['Use X-Acc & Special setup moves', 'Skip unnecessary trainers', 'Target completion time: < 2h 30m'],
      color: 'border-red-500 bg-red-950/30'
    },
    casual: {
      title: 'CASUAL MODE',
      tagline: '100% completionist catch checklist',
      rules: ['Catch every route encounter', 'Complete all optional side-quests', 'No split time pressure'],
      color: 'border-emerald-500 bg-emerald-950/30'
    },
    hardcore: {
      title: 'HARDCORE NUZLOCKE',
      tagline: 'Permadeath & strict battle level caps',
      rules: ['Fainted Pokémon = Released/Boxed', 'First encounter per route only', 'No healing items during gym battles'],
      color: 'border-purple-500 bg-purple-950/30'
    }
  };

  const activeModeDetails = modeDescriptions[state.activeMode] || modeDescriptions.speedrun;

  const completedCount = KANTO_CHECKPOINTS.filter(c => store.isCheckpointDone(c.id)).length;
  const progressPercent = Math.round((completedCount / KANTO_CHECKPOINTS.length) * 100);

  container.innerHTML = `
    <div class="p-8 space-y-8 animate-fadeIn select-none">
      
      <!-- Top Banner: Marathon Routing State Machine -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-[#1c1b1b] p-6 rounded-2xl border border-white/10 glow-red">
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#ff1c1c]/20 text-[#ff1c1c] border border-[#ff1c1c]/30">
              STATE MACHINE CONTROLLER
            </span>
            <span class="text-xs font-mono text-gray-400">ACTIVE: ${activeModeDetails.title}</span>
          </div>
          <h2 class="text-2xl font-sora font-extrabold text-white tracking-tight">${t('stateMachineTitle', lang)}</h2>
          <p class="text-xs font-mono text-gray-400">${t('stateMachineDesc', lang)}</p>
        </div>

        <!-- Mode Toggle State Selector Buttons -->
        <div class="flex items-center gap-2 bg-[#131313] p-1.5 rounded-xl border border-white/10">
          <button class="mode-state-btn px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${state.activeMode === 'speedrun' ? 'bg-[#ff1c1c] text-white glow-red' : 'text-gray-400 hover:text-white'}" data-mode="speedrun">
            ⚡ SPEEDRUN
          </button>
          <button class="mode-state-btn px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${state.activeMode === 'casual' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}" data-mode="casual">
            🌿 CASUAL
          </button>
          <button class="mode-state-btn px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${state.activeMode === 'hardcore' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}" data-mode="hardcore">
            💀 HARDCORE
          </button>
        </div>
      </div>

      <!-- Mode Rules Banner -->
      <div class="p-6 rounded-2xl border ${activeModeDetails.color} flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div class="space-y-2">
          <h3 class="font-sora font-extrabold text-lg text-white">${activeModeDetails.title}</h3>
          <p class="text-xs font-mono text-gray-300">${activeModeDetails.tagline}</p>
          <ul class="flex flex-wrap gap-4 pt-1">
            ${activeModeDetails.rules.map(r => `
              <li class="text-xs font-mono text-gray-400 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-[#00f2ff]"></span>
                ${r}
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="bg-[#131313] p-4 rounded-xl border border-white/10 min-w-[200px] text-center space-y-1">
          <div class="text-[10px] font-mono text-gray-400">${t('checkpointProgress', lang)}</div>
          <div class="text-2xl font-sora font-extrabold text-[#00f2ff]">${progressPercent}%</div>
          <div class="text-xs font-mono text-gray-400">${completedCount} / ${KANTO_CHECKPOINTS.length} ${t('validated', lang)}</div>
        </div>
      </div>

      <!-- Gym Checkpoints & Badges List -->
      <div class="space-y-4">
        <h3 class="font-sora font-bold text-base text-white">${t('badgeTimeline', lang)}</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${KANTO_CHECKPOINTS.map((chk, i) => {
            const isDone = store.isCheckpointDone(chk.id);
            return `
              <div class="bg-[#1c1b1b] p-5 rounded-2xl border transition-all ${isDone ? 'border-emerald-500/60 bg-emerald-950/20' : 'border-white/10 hover:border-[#00f2ff]/50'} flex flex-col justify-between space-y-4">
                
                <div class="flex items-start justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-[#2a2a2a] flex items-center justify-center text-[#ff5545]">
                      <span class="material-symbols-outlined">${chk.icon}</span>
                    </div>
                    <div>
                      <span class="text-[10px] font-mono text-gray-400">CHECKPOINT 0${i + 1}</span>
                      <h4 class="font-sora font-extrabold text-sm text-white">${chk.badge}</h4>
                      <div class="text-xs font-mono text-gray-400">${chk.leader}</div>
                    </div>
                  </div>

                  <button class="chk-toggle-btn w-7 h-7 rounded-lg flex items-center justify-center border transition-all ${isDone ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-gray-600 text-transparent hover:border-gray-400'}" data-id="${chk.id}">
                    <span class="material-symbols-outlined text-base font-bold">check</span>
                  </button>
                </div>

                <div class="bg-[#131313] p-3 rounded-xl space-y-1 text-xs font-mono border border-white/5">
                  <div class="flex justify-between">
                    <span class="text-gray-500">${t('levelCap', lang)}</span>
                    <span class="text-amber-400 font-bold">Lv. ${chk.levelCap}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-500">${t('estSplit', lang)}</span>
                    <span class="text-cyan-400 font-bold">${chk.splitTime}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-500">${t('keyItems', lang)}</span>
                    <span class="text-white">${chk.keyItems.join(', ')}</span>
                  </div>
                </div>

              </div>
            `;
          }).join('')}
        </div>
      </div>

    </div>
  `;

  // Mode state toggle listener
  container.querySelectorAll('.mode-state-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-mode');
      store.setMode(mode);
    });
  });

  // Checkpoint validation toggle listener
  container.querySelectorAll('.chk-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      store.toggleCheckpoint(id);
    });
  });
}
