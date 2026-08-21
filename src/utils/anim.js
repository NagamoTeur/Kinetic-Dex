/**
 * Kinetic Dex - Anime.js Animation Helper Suite
 */

// Check if anime is available globally
function getAnime() {
  return window.anime || null;
}

/**
 * Animates the entrance of a newly rendered view container
 * @param {HTMLElement} container 
 */
export function animatePageEntrance(container) {
  const anime = getAnime();
  if (!anime || !container) return;

  // Staggered entrance for root sections and cards
  anime.timeline({ easing: 'easeOutQuart' })
    .add({
      targets: container.querySelectorAll('h2, .anime-title, header'),
      opacity: [0, 1],
      translateY: [-15, 0],
      duration: 450,
      delay: anime.stagger(60)
    })
    .add({
      targets: container.querySelectorAll('.anime-card, .poke-card, .glass-panel'),
      opacity: [0, 1],
      translateY: [20, 0],
      scale: [0.97, 1],
      duration: 500,
      delay: anime.stagger(40)
    }, '-=250');
}

/**
 * Animates numerical values counting up smoothly
 * @param {HTMLElement|string} target 
 * @param {number} endVal 
 * @param {string} suffix 
 * @param {number} duration 
 */
export function animateNumberCounter(target, endVal, suffix = '%', duration = 1000) {
  const anime = getAnime();
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el || !anime) return;

  const obj = { value: 0 };
  anime({
    targets: obj,
    value: endVal,
    round: 1,
    easing: 'easeOutExpo',
    duration,
    update: function () {
      el.textContent = `${obj.value}${suffix}`;
    }
  });
}

/**
 * Anime.js MissingNo 404 glitch & floating animation loop
 * @param {HTMLElement} container 
 */
export function animate404Glitch(container) {
  const anime = getAnime();
  if (!anime || !container) return;

  // Float animation for MissingNo box / pokeball
  anime({
    targets: container.querySelectorAll('.glitch-box, .glitch-pokeball'),
    translateY: [-10, 10],
    rotate: [-3, 3],
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine',
    duration: 2200
  });

  // Glitch jitter effect on text
  anime({
    targets: container.querySelectorAll('.glitch-text'),
    skewX: [0, -12, 10, -5, 0],
    translateX: [0, -4, 4, -2, 0],
    opacity: [1, 0.7, 1, 0.85, 1],
    easing: 'easeInOutQuad',
    duration: 1800,
    loop: true,
    delay: function () { return Math.random() * 2000; }
  });

  // Pulse ring around 404 badge
  anime({
    targets: container.querySelectorAll('.pulse-ring'),
    scale: [1, 1.35],
    opacity: [0.8, 0],
    loop: true,
    easing: 'easeOutExpo',
    duration: 1500
  });
}

/**
 * Quick interactive Pokeball capture animation
 * @param {HTMLElement} buttonElement 
 */
export function animatePokeballClick(buttonElement) {
  const anime = getAnime();
  if (!anime || !buttonElement) return;

  anime({
    targets: buttonElement,
    rotate: [0, -25, 25, -15, 15, 0],
    scale: [1, 1.25, 1],
    duration: 600,
    easing: 'easeInOutBack'
  });
}

/**
 * Animate progress bar fill smoothly
 * @param {HTMLElement} barElement 
 * @param {number} percentage 
 */
export function animateProgressBar(barElement, percentage) {
  const anime = getAnime();
  if (!barElement) return;
  
  if (anime) {
    anime({
      targets: barElement,
      width: `${percentage}%`,
      duration: 800,
      easing: 'easeOutCubic'
    });
  } else {
    barElement.style.width = `${percentage}%`;
  }
}
