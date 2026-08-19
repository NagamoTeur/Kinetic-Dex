/**
 * Kinetic Dex - Central Reactive State Store with Auth Management
 */

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

// Default initial state
const defaultState = {
  // Active Language: 'fr' | 'en'
  lang: localStorage.getItem(STORAGE_KEYS.LANG) || 'fr',

  // Registered Users DB & Session
  users: JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '{}'),
  currentUser: localStorage.getItem(STORAGE_KEYS.CURRENT_USER) || 'RED_RUNNER_01',

  // Map of Pokemon ID -> boolean caught status
  caughtMap: JSON.parse(localStorage.getItem(STORAGE_KEYS.CAUGHT) || '{}'),
  
  // Map of Checkpoint ID -> boolean
  checkpointsMap: JSON.parse(localStorage.getItem(STORAGE_KEYS.CHECKPOINTS) || '{}'),
  
  // Active Team (up to 6 slots)
  team: JSON.parse(localStorage.getItem(STORAGE_KEYS.TEAM) || '[]'),
  
  // Active Marathon Mode: 'speedrun' | 'casual' | 'hardcore'
  activeMode: localStorage.getItem(STORAGE_KEYS.MODE) || 'speedrun',
  
  // Active Region Filter
  activeRegion: localStorage.getItem(STORAGE_KEYS.REGION) || 'kanto',

  // Active view tab
  activeTab: 'dashboard',

  // Runner profile
  profile: JSON.parse(localStorage.getItem(STORAGE_KEYS.PROFILE) || JSON.stringify({
    name: 'RED_RUNNER_01',
    email: 'runner@kineticdex.com',
    title: 'Elite Speedrunner S-Class',
    rank: 'S-Class',
    sessionName: 'Kanto 100% Marathon Run',
    favoriteIds: [6, 9, 94, 130, 143, 150]
  }))
};

class Store {
  constructor() {
    this.state = { ...defaultState };
    this.listeners = new Set();
    
    // Default fallback team if empty
    if (!this.state.team || this.state.team.length === 0) {
      this.state.team = [
        { id: 6, name: 'Charizard', nameFr: 'Dracaufeu', types: ['fire', 'flying'], stats: { hp: 78, atk: 84, def: 78, spa: 109, spd: 85, spe: 100 } },
        { id: 9, name: 'Blastoise', nameFr: 'Tortank', types: ['water'], stats: { hp: 79, atk: 83, def: 100, spa: 85, spd: 105, spe: 78 } },
        { id: 94, name: 'Gengar', nameFr: 'Ectoplasma', types: ['ghost', 'poison'], stats: { hp: 60, atk: 65, def: 60, spa: 130, spd: 75, spe: 110 } },
        { id: 130, name: 'Gyarados', nameFr: 'Léviator', types: ['water', 'flying'], stats: { hp: 95, atk: 125, def: 79, spa: 60, spd: 100, spe: 81 } },
        { id: 143, name: 'Snorlax', nameFr: 'Ronflex', types: ['normal'], stats: { hp: 160, atk: 110, def: 65, spa: 65, spd: 110, spe: 30 } },
        { id: 150, name: 'Mewtwo', nameFr: 'Mewtwo', types: ['psychic'], stats: { hp: 106, atk: 110, def: 90, spa: 154, spd: 90, spe: 130 } }
      ];
      this.saveTeam();
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn(this.state));
  }

  // --- Auth Operations ---
  register(username, email, password, title = 'Marathon Challenger') {
    if (this.state.users[username]) {
      return { success: false, messageFR: 'Ce nom de runner existe déjà !', messageEN: 'Runner username already exists!' };
    }

    const newUser = {
      username,
      email,
      password,
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
      team: [...this.state.team]
    };

    this.state.users[username] = newUser;
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(this.state.users));

    this.login(username, password);
    return { success: true };
  }

  login(username, password) {
    const user = this.state.users[username];
    if (username === 'RED_RUNNER_01' || (user && user.password === password)) {
      this.state.currentUser = username;
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, username);

      if (user) {
        this.state.profile = user.profile;
        this.state.caughtMap = user.caughtMap || {};
        this.state.checkpointsMap = user.checkpointsMap || {};
        if (user.team && user.team.length > 0) this.state.team = user.team;

        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(this.state.profile));
        localStorage.setItem(STORAGE_KEYS.CAUGHT, JSON.stringify(this.state.caughtMap));
        localStorage.setItem(STORAGE_KEYS.CHECKPOINTS, JSON.stringify(this.state.checkpointsMap));
        localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(this.state.team));
      }

      this.notify();
      return { success: true };
    }

    return { success: false, messageFR: 'Identifiants incorrects', messageEN: 'Invalid username or password' };
  }

  logout() {
    this.state.currentUser = null;
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    this.notify();
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
    
    // Sync with active user
    if (this.state.currentUser && this.state.users[this.state.currentUser]) {
      this.state.users[this.state.currentUser].caughtMap = this.state.caughtMap;
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(this.state.users));
    }

    this.notify();
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
    this.notify();
  }

  isCheckpointDone(checkpointId) {
    return !!this.state.checkpointsMap[checkpointId];
  }

  // --- Team Operations ---
  setTeam(team) {
    this.state.team = team.slice(0, 6);
    this.saveTeam();
    this.notify();
  }

  addTeamMember(pokemon) {
    if (this.state.team.length >= 6) return false;
    this.state.team.push(pokemon);
    this.saveTeam();
    this.notify();
    return true;
  }

  removeTeamMember(index) {
    this.state.team.splice(index, 1);
    this.saveTeam();
    this.notify();
  }

  saveTeam() {
    localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(this.state.team));
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
