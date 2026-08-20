/**
 * Kinetic Dex - Registration & Login Auth Modal Component
 */
import { store } from '../store/state.js';
import { t } from '../i18n/translations.js';

let activeAuthMode = 'login'; // 'login' | 'register'
let customPromptMsg = null;

export function renderAuthModal() {
  let modalContainer = document.getElementById('auth-modal-wrapper');
  if (!modalContainer) {
    modalContainer = document.createElement('div');
    modalContainer.id = 'auth-modal-wrapper';
    document.body.appendChild(modalContainer);
  }

  const state = store.state;
  const lang = state.lang;

  modalContainer.innerHTML = `
    <div id="auth-modal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none hidden">
      <div id="auth-modal-card" class="bg-[#1c1b1b] border border-white/20 rounded-2xl max-w-md w-full p-8 space-y-6 relative glow-red animate-scaleIn">
        
        <button id="close-auth-modal" class="absolute top-4 right-4 text-gray-400 hover:text-white">
          <span class="material-symbols-outlined text-2xl">close</span>
        </button>

        <div class="text-center space-y-2">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff1c1c] to-[#00f2ff] p-0.5 mx-auto flex items-center justify-center glow-red">
            <div class="w-full h-full bg-[#131313] rounded-[10px] flex items-center justify-center">
              <span class="material-symbols-outlined text-[#ff1c1c] text-2xl">account_circle</span>
            </div>
          </div>
          <h3 class="font-sora font-extrabold text-2xl text-white">
            ${activeAuthMode === 'login' 
              ? (lang === 'fr' ? 'CONNEXION RUNNER' : 'RUNNER LOGIN') 
              : (lang === 'fr' ? 'CRÉER UN COMPTE' : 'CREATE RUNNER ACCOUNT')}
          </h3>
          <p class="text-xs font-mono text-gray-400">
            ${customPromptMsg ? customPromptMsg : (activeAuthMode === 'login'
              ? (lang === 'fr' ? 'Connectez-vous pour synchroniser votre marathon' : 'Sign in to access your marathon progress')
              : (lang === 'fr' ? 'Rejoignez la plateforme de commandement Kinetic Dex' : 'Join the Kinetic Dex command platform'))}
          </p>
        </div>

        <div id="auth-error-msg" class="hidden p-3 bg-red-950/80 border border-red-500 rounded-xl text-xs font-mono text-red-200 text-center"></div>

        <!-- Auth Form -->
        <form id="auth-form" class="space-y-4">
          
          <div class="space-y-1">
            <label class="text-xs font-mono font-bold text-gray-300 block uppercase">
              ${lang === 'fr' ? 'NOM DE RUNNER' : 'RUNNER USERNAME'}
            </label>
            <input type="text" id="auth-username" required placeholder="ex: RedMaster_99" autofocus
                   class="w-full bg-[#131313] border border-white/10 focus:border-[#00f2ff] rounded-xl px-4 py-2.5 text-sm font-mono text-white outline-none" />
          </div>

          ${activeAuthMode === 'register' ? `
            <div class="space-y-1">
              <label class="text-xs font-mono font-bold text-gray-300 block uppercase">EMAIL</label>
              <input type="email" id="auth-email" required placeholder="runner@kineticdex.com"
                     class="w-full bg-[#131313] border border-white/10 focus:border-[#00f2ff] rounded-xl px-4 py-2.5 text-sm font-mono text-white outline-none" />
            </div>

            <div class="space-y-1">
              <label class="text-xs font-mono font-bold text-gray-300 block uppercase">
                ${lang === 'fr' ? 'TITRE DE RUNNER' : 'RUNNER TITLE'}
              </label>
              <input type="text" id="auth-title" placeholder="ex: Kanto Speedrunner"
                     class="w-full bg-[#131313] border border-white/10 focus:border-[#00f2ff] rounded-xl px-4 py-2.5 text-sm font-mono text-white outline-none" />
            </div>
          ` : ''}

          <div class="space-y-1">
            <label class="text-xs font-mono font-bold text-gray-300 block uppercase">
              ${lang === 'fr' ? 'MOT DE PASSE' : 'PASSWORD'}
            </label>
            <input type="password" id="auth-password" required placeholder="••••••••"
                   class="w-full bg-[#131313] border border-white/10 focus:border-[#00f2ff] rounded-xl px-4 py-2.5 text-sm font-mono text-white outline-none" />
          </div>

          <button type="submit" class="w-full py-3 bg-[#ff1c1c] hover:bg-[#ff5545] text-white font-sora font-bold text-xs rounded-xl glow-red uppercase tracking-wider transition-colors mt-2">
            ${activeAuthMode === 'login'
              ? (lang === 'fr' ? 'SE CONNECTER' : 'LOG IN')
              : (lang === 'fr' ? 'S\'INSCRIRE ET DÉMARRER' : 'REGISTER & START')}
          </button>
        </form>

        <!-- Toggle Auth Mode -->
        <div class="text-center pt-2 border-t border-white/10 text-xs font-mono text-gray-400">
          ${activeAuthMode === 'login' ? `
            <span>${lang === 'fr' ? 'Pas encore de compte ?' : 'Don\'t have an account?'}</span>
            <button id="toggle-auth-mode-btn" class="text-[#00f2ff] hover:underline font-bold ml-1">
              ${lang === 'fr' ? 'Créer un profil' : 'Create profile'}
            </button>
          ` : `
            <span>${lang === 'fr' ? 'Déjà un compte ?' : 'Already registered?'}</span>
            <button id="toggle-auth-mode-btn" class="text-[#00f2ff] hover:underline font-bold ml-1">
              ${lang === 'fr' ? 'Se connecter' : 'Sign in'}
            </button>
          `}
        </div>

      </div>
    </div>
  `;

  // Attach event handlers
  const modal = document.getElementById('auth-modal');
  const modalBox = document.getElementById('auth-modal-card');
  const closeBtn = document.getElementById('close-auth-modal');
  const toggleBtn = document.getElementById('toggle-auth-mode-btn');
  const authForm = document.getElementById('auth-form');

  closeBtn?.addEventListener('click', () => {
    modal?.classList.add('hidden');
    customPromptMsg = null;
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      customPromptMsg = null;
    }
  });

  toggleBtn?.addEventListener('click', () => {
    activeAuthMode = activeAuthMode === 'login' ? 'register' : 'login';
    renderAuthModal();
    openAuthModal(activeAuthMode);
  });

  authForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('auth-username').value;
    const password = document.getElementById('auth-password').value;
    const errorMsg = document.getElementById('auth-error-msg');

    if (activeAuthMode === 'login') {
      const res = store.login(username, password);
      if (res.success) {
        modal?.classList.add('hidden');
        customPromptMsg = null;
      } else {
        errorMsg.textContent = lang === 'fr' ? res.messageFR : res.messageEN;
        errorMsg.classList.remove('hidden');
      }
    } else {
      const email = document.getElementById('auth-email').value;
      const title = document.getElementById('auth-title').value || 'Marathon Runner';
      const res = store.register(username, email, password, title);
      if (res.success) {
        modal?.classList.add('hidden');
        customPromptMsg = null;
      } else {
        errorMsg.textContent = lang === 'fr' ? res.messageFR : res.messageEN;
        errorMsg.classList.remove('hidden');
      }
    }
  });
}

export function openAuthModal(mode = 'login', promptMessage = null) {
  activeAuthMode = mode;
  customPromptMsg = promptMessage;
  renderAuthModal();
  const modal = document.getElementById('auth-modal');
  modal?.classList.remove('hidden');
  setTimeout(() => {
    document.getElementById('auth-username')?.focus();
  }, 50);
}
