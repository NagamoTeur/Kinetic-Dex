/**
 * Kinetic Dex - Main Application Router & Entry Point
 */
import { store } from './store/state.js';
import { renderTopNavBar } from './components/TopNavBar.js';
import { renderSideNavBar } from './components/SideNavBar.js';
import { renderAuthModal } from './components/AuthModal.js';
import { animatePageEntrance } from './utils/anim.js';

import { renderDashboardView } from './views/DashboardView.js';
import { renderGlobalIndexView } from './views/GlobalIndexView.js';
import { renderRegionalTrackerView } from './views/RegionalTrackerView.js';
import { renderTeamPlannerView } from './views/TeamPlannerView.js';
import { renderMarathonRoutingView } from './views/MarathonRoutingView.js';
import { renderRouteGuideView } from './views/RouteGuideView.js';
import { renderProfileView } from './views/ProfileView.js';
import { renderNotFoundView } from './views/NotFoundView.js';

const routes = {
  'dashboard': renderDashboardView,
  'global-index': renderGlobalIndexView,
  'regional-tracker': renderRegionalTrackerView,
  'team-planner': renderTeamPlannerView,
  'marathon-routing': renderMarathonRoutingView,
  'route-guide': renderRouteGuideView,
  'profile': renderProfileView,
  '404': renderNotFoundView
};

function getActiveRoute() {
  const hash = window.location.hash.replace('#', '').trim();
  const rawPath = window.location.pathname.replace(/^\/|\/$/g, '').trim();

  // 1. If explicit hash is present
  if (hash !== '') {
    return routes[hash] ? hash : '404';
  }

  // 2. Root path or index.html -> dashboard
  if (rawPath === '' || rawPath === 'index.html') {
    return 'dashboard';
  }

  // 3. Check if pathname matches a valid route (e.g. /global-index)
  if (routes[rawPath]) {
    return rawPath;
  }

  // 4. Any unrecognized URL path (e.g. /admin, /login-secret, /dashboard/test) -> 404!
  return '404';
}

function renderCurrentView() {
  const route = getActiveRoute();
  store.state.activeTab = route === '404' ? '404' : route;
  const container = document.getElementById('app-content');
  if (container) {
    const renderFn = routes[route] || renderNotFoundView;
    renderFn(container);
    animatePageEntrance(container);
  }
}

function handleRoute() {
  renderCurrentView();
  renderTopNavBar();
  renderSideNavBar();
  renderAuthModal();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Global Keyboard Shortcuts (Ctrl+K -> Search, Esc -> Close Modals)
function setupGlobalKeybindings() {
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      store.setActiveTab('global-index');
      window.location.hash = '#global-index';
      setTimeout(() => {
        const input = document.getElementById('global-search-input');
        if (input) input.focus();
      }, 120);
    } else if (e.key === 'Escape') {
      const modals = document.querySelectorAll('#poke-detail-modal, #auth-modal');
      modals.forEach(m => {
        m.classList.add('hidden');
        m.classList.remove('flex');
      });
    }
  });
}

// Global App Initialization
export function initApp() {
  store.subscribe(() => {
    renderTopNavBar();
    renderSideNavBar();
    renderAuthModal();
    renderCurrentView();
  });

  window.addEventListener('hashchange', handleRoute);
  window.addEventListener('popstate', handleRoute);
  setupGlobalKeybindings();

  handleRoute();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
