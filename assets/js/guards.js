
async function sha256(txt){
  const enc = new TextEncoder().encode(txt);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return [...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,'0')).join('');
}

const GATE1_HASH = "1a79a4d60de6718e8e5b326e338ae533f9a4f40fa0c0f4eb927f0b02c6f7e97e";

async function checkGate(input, expectedHash){
  const h = await sha256(input.trim().toLowerCase());
  return h === expectedHash;
}

function getParam(key){
  const url = new URL(window.location.href); return url.searchParams.get(key);
}
