/**
 * Kinetic Dex - Runner Profile View & Data Backup (with i18n)
 */
import { store } from '../store/state.js';
import { getPokemonArtworkUrl } from '../api/pokeapi.js';
import { t } from '../i18n/translations.js';
import { openAuthModal } from '../components/AuthModal.js';

export function renderProfileView(container) {
  const state = store.state;
  const lang = state.lang;
  const profile = state.profile;
  const currentUser = state.currentUser;
  const globalStats = store.getCompletionStats('global');

  if (!currentUser || !profile) {
    container.innerHTML = `
      <div class="p-8 max-w-2xl mx-auto space-y-8 animate-fadeIn select-none text-center">
        <div class="bg-[#1c1b1b] border border-white/10 rounded-2xl p-10 space-y-6 glow-red">
          <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff1c1c] to-[#00f2ff] p-0.5 mx-auto flex items-center justify-center glow-red">
            <div class="w-full h-full bg-[#131313] rounded-[14px] flex items-center justify-center">
              <span class="material-symbols-outlined text-[#ff1c1c] text-3xl">account_circle</span>
            </div>
          </div>
          <div class="space-y-2">
            <h2 class="font-sora font-extrabold text-2xl text-white uppercase">
              ${lang === 'fr' ? 'PROFIL DÉCONNECTÉ' : 'RUNNER OFFLINE'}
            </h2>
            <p class="text-sm font-mono text-gray-400 max-w-md mx-auto">
              ${lang === 'fr' 
                ? 'Connectez-vous ou créez un compte runner pour lier vos captures, votre équipe et votre progression marathon à votre profil.' 
                : 'Log in or create a runner account to save your catches, team lineup, and marathon progress.'}
            </p>
          </div>
          <div class="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <button id="profile-login-btn" class="px-6 py-3 bg-[#2a2a2a] hover:bg-white/10 text-white font-sora font-bold text-xs rounded-xl border border-white/10 uppercase tracking-wider transition-colors">
              ${lang === 'fr' ? 'SE CONNECTER' : 'LOG IN'}
            </button>
            <button id="profile-register-btn" class="px-6 py-3 bg-[#ff1c1c] hover:bg-[#ff5545] text-white font-sora font-bold text-xs rounded-xl glow-red uppercase tracking-wider transition-colors">
              ${lang === 'fr' ? 'CRÉER UN COMPTE' : 'REGISTER'}
            </button>
          </div>
        </div>
      </div>
    `;

    container.querySelector('#profile-login-btn')?.addEventListener('click', () => openAuthModal('login'));
    container.querySelector('#profile-register-btn')?.addEventListener('click', () => openAuthModal('register'));
    return;
  }

  container.innerHTML = `
    <div class="p-8 space-y-8 animate-fadeIn select-none">
      
      <!-- Top Banner: Runner Profile Header -->
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1c1b1b] via-[#2a2a2a] to-[#131313] p-8 border border-white/10 glow-red">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div class="flex items-center gap-6">
            <div class="relative">
              <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#ff1c1c] to-[#00f2ff] p-1 glow-red">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/1.png" alt="Profile" class="w-full h-full object-cover rounded-xl bg-gray-900" />
              </div>
              <span class="absolute -bottom-1 -right-1 px-2 py-0.5 rounded bg-emerald-500 text-black font-mono font-extrabold text-[10px]">ONLINE</span>
            </div>

            <div class="space-y-1">
              <div class="flex items-center gap-3">
                <h2 class="text-2xl font-sora font-extrabold text-white">${profile.name}</h2>
                <span class="px-2.5 py-0.5 rounded bg-[#ff1c1c]/20 text-[#ff1c1c] border border-[#ff1c1c]/40 font-mono font-bold text-xs">
                  ${profile.rank || 'A-Class'}
                </span>
              </div>
              <p class="text-xs font-mono text-cyan-400">${profile.title || 'Marathon Challenger'}</p>
              <p class="text-xs font-mono text-gray-400">${t('sessionLabel', lang)} ${profile.sessionName || 'Active Session'}</p>
            </div>
          </div>

          <!-- Stats Pill Box -->
          <div class="flex gap-4">
            <div class="bg-[#131313] p-4 rounded-xl border border-white/10 text-center min-w-[120px]">
              <div class="text-[10px] font-mono text-gray-400">${t('playtime', lang)}</div>
              <div class="text-lg font-sora font-bold text-white">13h 24m</div>
            </div>
            <div class="bg-[#131313] p-4 rounded-xl border border-white/10 text-center min-w-[120px]">
              <div class="text-[10px] font-mono text-gray-400">${t('caughtCol', lang)}</div>
              <div class="text-lg font-sora font-bold text-[#00f2ff]">${globalStats.caught}</div>
            </div>
          </div>

        </div>
      </div>

      <!-- Profile Edit Section -->
      <div class="bg-[#1c1b1b] p-6 rounded-2xl border border-white/10 space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-sora font-bold text-base text-white">${lang === 'fr' ? 'PERSONNALISATION DU RUNNER' : 'RUNNER PROFILE SETTINGS'}</h3>
            <p class="text-xs font-mono text-gray-400">${lang === 'fr' ? 'Modifiez votre titre et le nom de votre session marathon' : 'Update your title, session name and rank'}</p>
          </div>
        </div>

        <form id="profile-edit-form" class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div class="space-y-1">
            <label class="text-[11px] font-mono text-gray-400 block uppercase">${lang === 'fr' ? 'TITRE DE RUNNER' : 'RUNNER TITLE'}</label>
            <input type="text" id="edit-title" value="${profile.title || ''}" placeholder="ex: Kanto Speedrunner"
                   class="w-full bg-[#131313] border border-white/10 focus:border-[#00f2ff] rounded-xl px-3 py-2 text-xs font-mono text-white outline-none" />
          </div>

          <div class="space-y-1">
            <label class="text-[11px] font-mono text-gray-400 block uppercase">${lang === 'fr' ? 'NOM DE SESSION' : 'SESSION NAME'}</label>
            <input type="text" id="edit-session" value="${profile.sessionName || ''}" placeholder="ex: Kanto 100% Marathon"
                   class="w-full bg-[#131313] border border-white/10 focus:border-[#00f2ff] rounded-xl px-3 py-2 text-xs font-mono text-white outline-none" />
          </div>

          <div class="space-y-1">
            <label class="text-[11px] font-mono text-gray-400 block uppercase">${lang === 'fr' ? 'RANG' : 'RANK'}</label>
            <select id="edit-rank" class="w-full bg-[#131313] border border-white/10 focus:border-[#00f2ff] rounded-xl px-3 py-2 text-xs font-mono text-white outline-none">
              <option value="S-Class" ${profile.rank === 'S-Class' ? 'selected' : ''}>S-Class (Elite)</option>
              <option value="A-Class" ${profile.rank === 'A-Class' ? 'selected' : ''}>A-Class (Expert)</option>
              <option value="B-Class" ${profile.rank === 'B-Class' ? 'selected' : ''}>B-Class (Challenger)</option>
              <option value="C-Class" ${profile.rank === 'C-Class' ? 'selected' : ''}>C-Class (Rookie)</option>
            </select>
          </div>

          <div class="sm:col-span-3 flex justify-end">
            <button type="submit" class="px-5 py-2.5 bg-[#00f2ff] hover:bg-cyan-400 text-black font-sora font-bold text-xs rounded-xl glow-cyan transition-colors">
              ${lang === 'fr' ? 'ENREGISTRER LE PROFIL' : 'SAVE PROFILE'}
            </button>
          </div>
        </form>
      </div>

      <!-- Favorite Pokemon Hall of Fame -->
      <div class="bg-[#1c1b1b] p-6 rounded-2xl border border-white/10 space-y-4">
        <h3 class="font-sora font-bold text-base text-white">${t('hallOfFame', lang)}</h3>
        
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          ${(profile.favoriteIds || [6, 9, 94, 130, 143, 150]).map(id => `
            <div class="bg-[#2a2a2a] p-4 rounded-xl border border-white/5 flex flex-col items-center text-center space-y-2 group hover:border-[#00f2ff]/50 transition-all">
              <img src="${getPokemonArtworkUrl(id)}" alt="Favorite #${id}" class="w-16 h-16 object-contain group-hover:scale-110 transition-transform" />
              <span class="text-xs font-mono text-gray-400">#${id.toString().padStart(3, '0')}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Backup & Restore Tool -->
      <div class="bg-[#1c1b1b] p-6 rounded-2xl border border-white/10 space-y-4">
        <div>
          <h3 class="font-sora font-bold text-base text-white">${t('dataBackupTitle', lang)}</h3>
          <p class="text-xs font-mono text-gray-400">${t('dataBackupDesc', lang)}</p>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 pt-2">
          <button id="export-json-btn" class="px-5 py-2.5 bg-[#ff1c1c] hover:bg-[#ff5545] text-white font-sora font-bold text-xs rounded-xl flex items-center justify-center gap-2 glow-red transition-colors">
            <span class="material-symbols-outlined text-base">download</span>
            ${t('exportJson', lang)}
          </button>

          <label class="px-5 py-2.5 bg-[#2a2a2a] hover:bg-white/10 text-white font-sora font-bold text-xs rounded-xl flex items-center justify-center gap-2 border border-white/10 cursor-pointer transition-colors">
            <span class="material-symbols-outlined text-base">upload</span>
            ${t('importJson', lang)}
            <input type="file" id="import-json-input" accept=".json" class="hidden" />
          </label>
        </div>
      </div>

    </div>
  `;

  // Attach profile edit listener
  container.querySelector('#profile-edit-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('edit-title').value;
    const sessionName = document.getElementById('edit-session').value;
    const rank = document.getElementById('edit-rank').value;

    store.updateProfile({ title, sessionName, rank });
    alert(lang === 'fr' ? 'Profil mis à jour avec succès !' : 'Profile updated successfully!');
    renderProfileView(container);
  });

  // Attach export listener
  container.querySelector('#export-json-btn')?.addEventListener('click', () => {
    const backupData = {
      caughtMap: store.state.caughtMap,
      checkpointsMap: store.state.checkpointsMap,
      team: store.state.team,
      activeMode: store.state.activeMode,
      activeRegion: store.state.activeRegion,
      profile: store.state.profile,
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kinetic_dex_backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  // Attach import listener
  container.querySelector('#import-json-input')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (imported.caughtMap) store.state.caughtMap = imported.caughtMap;
        if (imported.checkpointsMap) store.state.checkpointsMap = imported.checkpointsMap;
        if (imported.team) store.state.team = imported.team;
        if (imported.activeMode) store.state.activeMode = imported.activeMode;
        if (imported.profile) store.state.profile = imported.profile;
        
        store.syncCurrentUserStorage();
        store.notify();
        alert(lang === 'fr' ? 'Données de sauvegarde restaurées !' : 'Backup data successfully restored!');
        renderProfileView(container);
      } catch (err) {
        alert(lang === 'fr' ? 'Erreur lors de la lecture du fichier JSON.' : 'Failed to parse backup JSON file.');
      }
    };
    reader.readAsText(file);
  });
}
