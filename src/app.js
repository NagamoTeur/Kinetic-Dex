/**
 * Kinetic Dex - Main Application Router & Entry Point
 */
import { store } from './store/state.js';
import { renderTopNavBar } from './components/TopNavBar.js';
import { renderSideNavBar } from './components/SideNavBar.js';
import { renderAuthModal } from './components/AuthModal.js';

import { renderDashboardView } from './views/DashboardView.js';
import { renderGlobalIndexView } from './views/GlobalIndexView.js';
import { renderRegionalTrackerView } from './views/RegionalTrackerView.js';
import { renderTeamPlannerView } from './views/TeamPlannerView.js';
import { renderMarathonRoutingView } from './views/MarathonRoutingView.js';
import { renderRouteGuideView } from './views/RouteGuideView.js';
import { renderProfileView } from './views/ProfileView.js';

const routes = {
  'dashboard': renderDashboardView,
  'global-index': renderGlobalIndexView,
  'regional-tracker': renderRegionalTrackerView,
  'team-planner': renderTeamPlannerView,
  'marathon-routing': renderMarathonRoutingView,
  'route-guide': renderRouteGuideView,
  'profile': renderProfileView
};

function getActiveTabFromHash() {
  const hash = window.location.hash.replace('#', '');
  return routes[hash] ? hash : 'dashboard';
}

function handleRoute() {
  const tab = getActiveTabFromHash();
  store.setActiveTab(tab);

  const container = document.getElementById('app-content');
  if (container) {
    container.innerHTML = '';
    const renderFn = routes[tab] || renderDashboardView;
    renderFn(container);
  }

  // Re-render navbars & modal to reflect active state & language
  renderTopNavBar();
  renderSideNavBar();
  renderAuthModal();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Global App Initialization
export function initApp() {
  store.subscribe(() => {
    renderTopNavBar();
    renderSideNavBar();
    renderAuthModal();
  });

  window.addEventListener('hashchange', handleRoute);

  handleRoute();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
