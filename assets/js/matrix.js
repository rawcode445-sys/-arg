
(function(){
  function assetsBase(){
    try {
      const script = document.currentScript || Array.from(document.scripts).slice(-1)[0];
      const src = new URL(script.src, location.href);
      return src.pathname.replace(/assets\/js\/[^/]+$/, 'assets/');
    } catch(e){
      const path = location.pathname;
      if (path.includes('/infected/')) return path.split('/infected/')[0] + 'assets/';
      return (path.endsWith('/') ? path : path.replace(/\/[^/]*$/, '/')) + 'assets/';
    }
  }
  const ASSETS = assetsBase();

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, {position:'fixed', inset:0, width:'100vw', height:'100vh', zIndex:'0', pointerEvents:'none', background:'transparent'});
  document.documentElement.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  function resize(){
    canvas.width = innerWidth * devicePixelRatio;
    canvas.height = innerHeight * devicePixelRatio;
    ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
  }
  addEventListener('resize', resize, {passive:true});
  resize();

  const glyphs = 'アイウエオｱｲｳｴｵ01RAW//CODE#*$@+-';
  let columns = [];
  function initColumns(){
    const fontSize = 16;
    const cols = Math.ceil(innerWidth / fontSize);
    columns = new Array(cols).fill(0).map(()=> Math.floor(Math.random()*innerHeight));
  }
  initColumns();
  addEventListener('resize', initColumns, {passive:true});

  function draw(){
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = '#00ff88';
    ctx.font = '16px Consolas, monospace';
    const fontSize = 16;
    for (let i=0;i<columns.length;i++){
      const text = glyphs[Math.floor(Math.random()*glyphs.length)];
      const x = i * fontSize;
      const y = columns[i] * fontSize;
      ctx.fillText(text, x, y);
      if (y > innerHeight && Math.random() > 0.975) columns[i] = 0; else columns[i] += 1;
    }
    requestAnimationFrame(draw);
  }
  draw();

  // Ambient audio (unmute on first user gesture)
  const audio = new Audio(ASSETS + 'sfx/ambient.wav');
  audio.loop = true; audio.volume = 0.12; audio.muted = true;
  function tryPlay(){ audio.muted = false; audio.play().catch(()=>{}); }
  document.addEventListener('click', tryPlay, {once:true});
  document.addEventListener('keydown', tryPlay, {once:true});
  document.addEventListener('touchstart', tryPlay, {once:true});

  // Mute/Unmute button
  const btn = document.createElement('button');
  btn.textContent = '🔇';
  Object.assign(btn.style, {position:'fixed', right:'10px', bottom:'10px', zIndex:'99999', background:'rgba(0,0,0,0.6)', color:'#00ff88', border:'1px solid rgba(0,255,136,0.35)', borderRadius:'8px', padding:'6px 8px', cursor:'pointer', fontFamily:'Consolas, monospace'});
  btn.onclick = ()=>{ audio.muted = !audio.muted; if(!audio.muted && audio.paused){ audio.play().catch(()=>{});} btn.textContent = audio.muted ? '🔇' : '🔊'; };
  document.body.appendChild(btn);
})();
