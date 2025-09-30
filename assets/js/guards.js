// assets/js/guards.js  — version propre

async function sha256(txt) {
  const enc = new TextEncoder().encode(String(txt));
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
}

// Mot de passe autorisé : "rebelion"
const GATE1_HASH = "ba08a8d652ed67932625e8eadbbb9c4e0413105011bb689ab2f1f6de91571cd4";

async function checkGate(input, expectedHash = GATE1_HASH) {
  const h = await sha256(String(input).trim().toLowerCase());
  return h === expectedHash;
}

function getParam(key) {
  const url = new URL(window.location.href);
  return url.searchParams.get(key);
}

// Expose pour debug
window.checkGate = checkGate;
window.getParam  = getParam;
