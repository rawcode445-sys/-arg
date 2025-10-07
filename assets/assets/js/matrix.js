
// Matrix rain: background-only (no global darkening), canvas behind content.
(function(){
  function assetsBase(){
    try{const s=document.currentScript||Array.from(document.scripts).slice(-1)[0];const u=new URL(s.src,location.href);return u.pathname.replace(/assets\/js\/[^/]+$/,'assets/');}
    catch(e){const p=location.pathname;return p.includes('/infected/')?p.split('/infected/')[0]+'assets/':(p.endsWith('/')?p:p.replace(/\/[^/]*$/,'/'))+'assets/';}
  }
  const ASSETS=assetsBase();

  // Create canvas BEHIND everything
  const c=document.createElement('canvas');
  Object.assign(c.style,{
    position:'fixed', inset:0, width:'100vw', height:'100vh',
    zIndex:'-1', pointerEvents:'none', background:'black' // black base, stays behind
  });
  // Insert as first child of body to ensure it's underneath
  document.addEventListener('DOMContentLoaded', ()=> {
    document.body.prepend(c);
  });
  const ctx=c.getContext('2d');

  function resize(){ c.width=innerWidth*devicePixelRatio; c.height=innerHeight*devicePixelRatio; ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0); }
  addEventListener('resize', resize, {passive:true}); resize();

  const glyphs='アイウエオｱｲｳｴｵ01RAW//CODE#*$@+-';
  let cols=[];
  const FS=18;
  function init(){ const n=Math.ceil(innerWidth/FS); cols=new Array(n).fill(0).map(()=>Math.floor(Math.random()*innerHeight)); }
  init(); addEventListener('resize', init, {passive:true});

  const TRAIL_FADE = true;     // true = smooth fade, false = no trail
  const FADE_ALPHA = 0.15;     // how fast old glyphs fade when TRAIL_FADE=true

  function draw(){
    // Clear whole canvas each frame so it never darkens the page
    ctx.clearRect(0,0,c.width,c.height);

    if (TRAIL_FADE){
      // Draw an alpha-black layer to fade previous glyphs *without* accumulating darkness
      ctx.fillStyle = `rgba(0,0,0,${FADE_ALPHA})`;
      ctx.fillRect(0,0,c.width,c.height);
    }

    ctx.shadowColor='#00ff88'; ctx.shadowBlur=6;
    ctx.fillStyle='#00ff88'; ctx.font=FS+'px Consolas, monospace';

    for(let i=0;i<cols.length;i++){
      const ch=glyphs[Math.floor(Math.random()*glyphs.length)];
      const x=i*FS, y=cols[i]*FS;
      ctx.fillText(ch,x,y);
      if(y>innerHeight && Math.random()>0.975){ cols[i]=0; } else { cols[i]+=1; }
    }
    ctx.shadowBlur=0;

    requestAnimationFrame(draw);
  }
  draw();

  // Ambient audio (unchanged)
  const a=new Audio(ASSETS+'sfx/ambient.wav'); a.loop=true; a.volume=0.12; a.muted=true;
  const play=()=>{a.muted=false; a.play().catch(()=>{});};
  document.addEventListener('click',play,{once:true});
  document.addEventListener('keydown',play,{once:true});
  document.addEventListener('touchstart',play,{once:true});
  const btn=document.createElement('button'); btn.textContent='🔇';
  Object.assign(btn.style,{position:'fixed',right:'10px',bottom:'10px',zIndex:'99999',background:'rgba(0,0,0,0.6)',color:'#00ff88',border:'1px solid rgba(0,255,136,0.35)',borderRadius:'8px',padding:'6px 8px',cursor:'pointer',fontFamily:'Consolas, monospace'});
  btn.onclick=()=>{a.muted=!a.muted; if(!a.muted && a.paused){a.play().catch(()=>{});} btn.textContent=a.muted?'🔇':'🔊';};
  document.body.appendChild(btn);
})();
