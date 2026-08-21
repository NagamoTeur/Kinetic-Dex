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
