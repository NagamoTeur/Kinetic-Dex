import { hashPassword } from '../utils/sanitize.js';

const STORAGE_KEYS = {
  CAUGHT: 'kinetic_dex_caught',
  CHECKPOINTS: 'kinetic_dex_checkpoints',
  TEAM: 'kinetic_dex_team',
  MODE: 'kinetic_dex_mode',
  REGION: 'kinetic_dex_region',
  PROFILE: 'kinetic_dex_profile',
  LANG: 'kinetic_dex_lang',
  USERS: 'kinetic_dex_users',
  CURRENT_USER: 'kinetic_dex_current_user'
};

// Default initial state setup
const savedCurrentUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER) || null;
const usersDB = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '{}');
const activeUser = savedCurrentUser && usersDB[savedCurrentUser] ? usersDB[savedCurrentUser] : null;

const defaultState = {
  // Active Language: 'fr' | 'en'
  lang: localStorage.getItem(STORAGE_KEYS.LANG) || 'fr',

  // Registered Users DB & Session
  users: usersDB,
  currentUser: activeUser ? savedCurrentUser : null,

  // Map of Pokemon ID -> boolean caught status
  caughtMap: activeUser ? (activeUser.caughtMap || {}) : {},
  
  // Map of Checkpoint ID -> boolean
  checkpointsMap: activeUser ? (activeUser.checkpointsMap || {}) : {},
  
  // Active Team (up to 6 slots)
  team: activeUser ? (activeUser.team || []) : [],
  
  // Active Marathon Mode: 'speedrun' | 'casual' | 'hardcore'
  activeMode: localStorage.getItem(STORAGE_KEYS.MODE) || 'speedrun',
  
  // Active Region Filter
  activeRegion: localStorage.getItem(STORAGE_KEYS.REGION) || 'kanto',

  // Active view tab
  activeTab: 'dashboard',

  // Runner profile
  profile: activeUser ? activeUser.profile : null
};

class Store {
  constructor() {
    this.state = { ...defaultState };
    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn(this.state));
  }

  syncCurrentUserStorage() {
    if (this.state.currentUser && this.state.users[this.state.currentUser]) {
      this.state.users[this.state.currentUser].caughtMap = this.state.caughtMap;
      this.state.users[this.state.currentUser].checkpointsMap = this.state.checkpointsMap;
      this.state.users[this.state.currentUser].team = this.state.team;
      this.state.users[this.state.currentUser].profile = this.state.profile;
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(this.state.users));
    }
  }

  // --- Auth Operations ---
  async register(username, email, password, title = 'Marathon Challenger') {
    if (this.state.users[username]) {
      return { success: false, messageFR: 'Ce nom de runner existe déjà !', messageEN: 'Runner username already exists!' };
    }

    const hashedPassword = await hashPassword(password, username);

    const defaultTeam = [
      { id: 6, name: 'Charizard', nameFr: 'Dracaufeu', types: ['fire', 'flying'], stats: { hp: 78, atk: 84, def: 78, spa: 109, spd: 85, spe: 100 } },
      { id: 9, name: 'Blastoise', nameFr: 'Tortank', types: ['water'], stats: { hp: 79, atk: 83, def: 100, spa: 85, spd: 105, spe: 78 } },
      { id: 94, name: 'Gengar', nameFr: 'Ectoplasma', types: ['ghost', 'poison'], stats: { hp: 60, atk: 65, def: 60, spa: 130, spd: 75, spe: 110 } }
    ];

    const newUser = {
      username,
      email,
      password: hashedPassword,
      profile: {
        name: username,
        email,
        title,
        rank: 'A-Class',
        sessionName: `${username} Marathon Session`,
        favoriteIds: [6, 9, 94, 130, 143, 150]
      },
      caughtMap: {},
      checkpointsMap: {},
      team: defaultTeam
    };

    this.state.users[username] = newUser;
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(this.state.users));

    return this.login(username, password);
  }

  async login(username, password) {
    const user = this.state.users[username];
    if (!user) {
      return { success: false, messageFR: 'Identifiants incorrects', messageEN: 'Invalid username or password' };
    }

    const hashedPassword = await hashPassword(password, username);
    let isAuthenticated = false;

    // Check hashed password match
    if (user.password === hashedPassword) {
      isAuthenticated = true;
    } else if (user.password === password) {
      // Automatic migration from legacy plain-text password to hashed password
      user.password = hashedPassword;
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(this.state.users));
      isAuthenticated = true;
    }

    if (isAuthenticated) {
      this.state.currentUser = username;
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, username);

      this.state.profile = user.profile;
      this.state.caughtMap = user.caughtMap || {};
      this.state.checkpointsMap = user.checkpointsMap || {};
      this.state.team = user.team || [];

      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(this.state.profile));
      localStorage.setItem(STORAGE_KEYS.CAUGHT, JSON.stringify(this.state.caughtMap));
      localStorage.setItem(STORAGE_KEYS.CHECKPOINTS, JSON.stringify(this.state.checkpointsMap));
      localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(this.state.team));

      this.notify();
      return { success: true };
    }

    return { success: false, messageFR: 'Identifiants incorrects', messageEN: 'Invalid username or password' };
  }

  logout() {
    this.state.currentUser = null;
    this.state.profile = null;
    this.state.caughtMap = {};
    this.state.checkpointsMap = {};
    this.state.team = [];
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(STORAGE_KEYS.CAUGHT);
    localStorage.removeItem(STORAGE_KEYS.CHECKPOINTS);
    localStorage.removeItem(STORAGE_KEYS.TEAM);
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    this.notify();
  }

  updateProfile(updatedFields) {
    if (!this.state.currentUser || !this.state.profile) return false;
    this.state.profile = { ...this.state.profile, ...updatedFields };
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(this.state.profile));
    this.syncCurrentUserStorage();
    this.notify();
    return true;
  }

  async changePassword(oldPassword, newPassword) {
    if (!this.state.currentUser) return { success: false, messageFR: 'Non connecté', messageEN: 'Not logged in' };
    const user = this.state.users[this.state.currentUser];
    if (!user) return { success: false, messageFR: 'Utilisateur introuvable', messageEN: 'User not found' };

    const oldHash = await hashPassword(oldPassword, this.state.currentUser);
    if (user.password !== oldHash && user.password !== oldPassword) {
      return { success: false, messageFR: 'Ancien mot de passe incorrect', messageEN: 'Incorrect current password' };
    }

    user.password = await hashPassword(newPassword, this.state.currentUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(this.state.users));
    return { success: true, messageFR: 'Mot de passe mis à jour !', messageEN: 'Password updated successfully!' };
  }

  async deleteAccount(password) {
    if (!this.state.currentUser) return { success: false, messageFR: 'Non connecté', messageEN: 'Not logged in' };
    const user = this.state.users[this.state.currentUser];
    if (!user) return { success: false, messageFR: 'Utilisateur introuvable', messageEN: 'User not found' };

    const passHash = await hashPassword(password, this.state.currentUser);
    if (user.password !== passHash && user.password !== password) {
      return { success: false, messageFR: 'Mot de passe incorrect', messageEN: 'Incorrect password' };
    }

    delete this.state.users[this.state.currentUser];
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(this.state.users));
    this.logout();
    return { success: true };
  }

  // --- i18n Language Toggle ---
  setLang(lang) {
    this.state.lang = lang;
    localStorage.setItem(STORAGE_KEYS.LANG, lang);
    this.notify();
  }

  toggleLang() {
    const nextLang = this.state.lang === 'fr' ? 'en' : 'fr';
    this.setLang(nextLang);
  }

  // --- Caught Tracking ---
  toggleCaught(id) {
    const numericId = Number(id);
    this.state.caughtMap[numericId] = !this.state.caughtMap[numericId];
    if (!this.state.caughtMap[numericId]) {
      delete this.state.caughtMap[numericId];
    }
    localStorage.setItem(STORAGE_KEYS.CAUGHT, JSON.stringify(this.state.caughtMap));
    
    // Sync with active user if logged in
    this.syncCurrentUserStorage();

    this.notify();
    return true;
  }

  isCaught(id) {
    return !!this.state.caughtMap[Number(id)];
  }

  // --- Completion Calculators ---
  getCompletionStats(regionOrGen = 'global') {
    const regionRanges = {
      kanto: [1, 151],
      johto: [152, 251],
      hoenn: [252, 386],
      sinnoh: [387, 493],
      unova: [494, 649],
      kalos: [650, 721],
      alola: [722, 809],
      galar: [810, 905],
      paldea: [906, 1025],
      global: [1, 1025]
    };

    const [min, max] = regionRanges[regionOrGen] || regionRanges.global;
    let caughtCount = 0;
    for (let id = min; id <= max; id++) {
      if (this.state.caughtMap[id]) {
        caughtCount++;
      }
    }

    const total = (max - min + 1);
    const percentage = Math.round((caughtCount / total) * 100);

    return {
      caught: caughtCount,
      total,
      percentage
    };
  }

  // --- Checkpoints ---
  toggleCheckpoint(checkpointId) {
    this.state.checkpointsMap[checkpointId] = !this.state.checkpointsMap[checkpointId];
    localStorage.setItem(STORAGE_KEYS.CHECKPOINTS, JSON.stringify(this.state.checkpointsMap));
    this.syncCurrentUserStorage();
    this.notify();
    return true;
  }

  isCheckpointDone(checkpointId) {
    return !!this.state.checkpointsMap[checkpointId];
  }

  // --- Team Operations ---
  setTeam(team) {
    this.state.team = team.slice(0, 6);
    this.saveTeam();
    this.notify();
    return true;
  }

  addTeamMember(pokemon) {
    if (!pokemon) return false;
    if (this.state.team.length >= 6) return false;
    
    // Ensure clean format
    const formatted = {
      id: pokemon.id,
      name: pokemon.name,
      nameFr: pokemon.nameFr || pokemon.name,
      types: pokemon.types || ['normal'],
      stats: pokemon.stats || { hp: 50, atk: 50, def: 50, spa: 50, spd: 50, spe: 50 },
      artwork: pokemon.artwork || pokemon.sprites?.other?.['official-artwork']?.front_default
    };

    this.state.team.push(formatted);
    this.saveTeam();
    this.notify();
    return true;
  }

  removeTeamMember(index) {
    if (index < 0 || index >= this.state.team.length) return false;
    this.state.team.splice(index, 1);
    this.saveTeam();
    this.notify();
    return true;
  }

  saveTeam() {
    localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(this.state.team));
    this.syncCurrentUserStorage();
  }

  // --- Mode & Region ---
  setMode(mode) {
    this.state.activeMode = mode;
    localStorage.setItem(STORAGE_KEYS.MODE, mode);
    this.notify();
  }

  setRegion(region) {
    this.state.activeRegion = region;
    localStorage.setItem(STORAGE_KEYS.REGION, region);
    this.notify();
  }

  setActiveTab(tab) {
    this.state.activeTab = tab;
    this.notify();
  }
}

export const store = new Store();
