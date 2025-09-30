
async function sha256(txt){
  const enc = new TextEncoder().encode(txt);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return [...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,'0')).join('');
}

const GATE1_HASH = "d27c5f206433fbc1c292ddd88a5825f937cbf3b2e33403c711b816cbcd04f0b1";

async function checkGate(input, expectedHash){
  const h = await sha256(input.trim().toLowerCase());
  return h === expectedHash;
}

function getParam(key){
  const url = new URL(window.location.href); return url.searchParams.get(key);
}
