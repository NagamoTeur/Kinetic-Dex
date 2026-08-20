/**
 * Kinetic Dex - Interactive Pokéball Icon Component
 */

export function renderPokeballSvg(isCaught, size = 22) {
  if (isCaught) {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" class="pokeball-svg caught transition-all duration-300 drop-shadow-[0_0_8px_rgba(255,28,28,0.9)] hover:scale-125" style="transform-origin: center;">
        <defs>
          <radialGradient id="ballGlow_${size}" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ffffff" />
            <stop offset="60%" stop-color="#00f2ff" />
            <stop offset="100%" stop-color="#0099ff" />
          </radialGradient>
        </defs>
        <!-- Outer Shell -->
        <circle cx="12" cy="12" r="10" fill="#131313" />
        <!-- Top Half (Red) -->
        <path d="M12 2C6.48 2 2 6.48 2 12h7a3 3 0 0 1 6 0h7c0-5.52-4.48-10-10-10z" fill="#ff1c1c" />
        <!-- Bottom Half (White) -->
        <path d="M12 22c5.52 0 10-4.48 10-10h-7a3 3 0 0 1-6 0H2c0 5.52 4.48 10 10 10z" fill="#f5f5f5" />
        <!-- Dividing Black Line -->
        <path d="M2 12h7a3 3 0 0 0 6 0h7" stroke="#131313" stroke-width="1.8" fill="none" />
        <!-- Outer Center Ring -->
        <circle cx="12" cy="12" r="3.6" fill="#131313" />
        <!-- Center Button Glow -->
        <circle cx="12" cy="12" r="2.2" fill="url(#ballGlow_${size})" stroke="#ffffff" stroke-width="0.6" />
        <!-- Border -->
        <circle cx="12" cy="12" r="10" stroke="#ff1c1c" stroke-width="1.2" fill="none" opacity="0.6" />
      </svg>
    `;
  }

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" class="pokeball-svg uncheck transition-all duration-200 opacity-40 hover:opacity-100 hover:scale-125" style="transform-origin: center;">
      <!-- Outer Shell -->
      <circle cx="12" cy="12" r="10" fill="#131313" stroke="#6b7280" stroke-width="1.5" />
      <!-- Top Arc Outline -->
      <path d="M12 2C6.48 2 2 6.48 2 12h7a3 3 0 0 1 6 0h7c0-5.52-4.48-10-10-10z" fill="#2a2a2a" />
      <!-- Bottom Arc Outline -->
      <path d="M12 22c5.52 0 10-4.48 10-10h-7a3 3 0 0 1-6 0H2c0 5.52 4.48 10 10 10z" fill="#1a1a1a" />
      <!-- Dividing Line -->
      <path d="M2 12h7a3 3 0 0 0 6 0h7" stroke="#6b7280" stroke-width="1.5" fill="none" />
      <!-- Center Ring -->
      <circle cx="12" cy="12" r="3" fill="#131313" stroke="#6b7280" stroke-width="1.5" />
      <!-- Center Dot -->
      <circle cx="12" cy="12" r="1.2" fill="#6b7280" />
    </svg>
  `;
}
