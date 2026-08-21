/**
 * Kinetic Dex - Security Utilities: HTML Sanitization & Web Crypto Hashing
 */

/**
 * Escapes unsafe HTML characters to prevent Cross-Site Scripting (XSS)
 * @param {string|any} str 
 * @returns {string}
 */
export function escapeHTML(str) {
  if (str === null || str === undefined) return '';
  const s = String(str);
  return s.replace(/[&<>"']/g, (match) => {
    switch (match) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#39;';
      default: return match;
    }
  });
}

/**
 * Computes a SHA-256 hash with a salt using the Web Crypto API
 * @param {string} password 
 * @param {string} salt 
 * @returns {Promise<string>} Hexadecimal hash representation
 */
export async function hashPassword(password, salt = 'kinetic_dex_salt_v4') {
  if (!password) return '';
  const encoder = new TextEncoder();
  const data = encoder.encode(`${salt}:${password}`);
  
  if (window.crypto && window.crypto.subtle) {
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  
  // Fallback simple hash calculation for legacy environments
  let hash = 0;
  const str = `${salt}:${password}`;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return `sha256_fallback_${Math.abs(hash).toString(16)}`;
}

/**
 * Creates a debounced version of a function that delays execution until after `wait` milliseconds
 * @param {Function} func 
 * @param {number} wait 
 * @returns {Function}
 */
export function debounce(func, wait = 150) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Recursively sanitizes string properties in an object to prevent XSS from imported backup payloads
 * @param {any} input 
 * @returns {any}
 */
export function sanitizeObjectStrings(input) {
  if (typeof input === 'string') {
    return escapeHTML(input.trim());
  }
  if (Array.isArray(input)) {
    return input.map(item => sanitizeObjectStrings(item));
  }
  if (input !== null && typeof input === 'object') {
    const cleaned = {};
    for (const [key, value] of Object.entries(input)) {
      cleaned[key] = sanitizeObjectStrings(value);
    }
    return cleaned;
  }
  return input;
}

/**
 * Inspects browser location for intrusion payloads (XSS, path traversal, injection parameters)
 * and normalizes the address bar to a clean URL state.
 * @param {Array<string>} validRoutes List of valid registered route keys
 * @returns {string} Clean route identifier
 */
export function sanitizeAndCleanURL(validRoutes = []) {
  try {
    const hashRaw = window.location.hash.replace('#', '').trim();
    const rawPath = window.location.pathname.replace(/^\/|\/$/g, '').trim();
    const search = window.location.search;
    const fullHref = window.location.href;

    // Detect suspicious patterns (XSS script tags, JavaScript schemes, directory traversal, SQL/command injections)
    const suspiciousPattern = /<script|javascript:|data:|vbscript:|\.\.\/|%3Cscript|%27|%22|eval\(|onload=|onerror=|SELECT%20|UNION%20/i;

    let decodedHash = '';
    let decodedPath = '';
    try {
      decodedHash = decodeURIComponent(hashRaw);
      decodedPath = decodeURIComponent(rawPath);
    } catch (e) {
      // Malformed URI encoding indicates potential tampering
      decodedHash = hashRaw;
      decodedPath = rawPath;
    }

    const isSuspicious = suspiciousPattern.test(decodedHash) || 
                         suspiciousPattern.test(decodedPath) || 
                         suspiciousPattern.test(search) || 
                         suspiciousPattern.test(fullHref);

    let activeRoute = 'dashboard';

    if (hashRaw !== '') {
      const cleanHashKey = decodedHash.split('?')[0].split('&')[0].trim();
      activeRoute = validRoutes.includes(cleanHashKey) ? cleanHashKey : '404';
    } else if (rawPath === '' || rawPath === 'index.html') {
      activeRoute = 'dashboard';
    } else if (validRoutes.includes(rawPath)) {
      activeRoute = rawPath;
    } else {
      activeRoute = '404';
    }

    // Rewrite browser URL to clean state if suspicious payload detected or invalid 404 route or unexpected query params
    if (isSuspicious || activeRoute === '404' || search !== '') {
      const targetHash = activeRoute === 'dashboard' ? '' : `#${activeRoute}`;
      const targetURL = window.location.origin + window.location.pathname + targetHash;
      
      if (window.location.href !== targetURL) {
        window.history.replaceState(null, '', targetURL);
      }
    }

    return activeRoute;
  } catch (err) {
    console.warn('URL sanitization fallback activated', err);
    window.history.replaceState(null, '', window.location.origin + '/#404');
    return '404';
  }
}


