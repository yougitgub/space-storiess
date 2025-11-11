// Lightweight interactions and canvas starfield for the static clone
document.addEventListener('DOMContentLoaded', function(){
  // Add a tiny hover effect for cards
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => card.classList.add('hover'));
    card.addEventListener('mouseleave', () => card.classList.remove('hover'));
  });

  // Simple animated planets (rotate the mini-orbit planet)
  const planets = document.querySelectorAll('.mini-orbit .planet');
  let rot = 0;
  function tick(){
    rot += 0.6;
    planets.forEach((p, i) => {
      p.style.transform = `translateX(${Math.sin((rot+i*10)/20)*6}px)`;
    });
    requestAnimationFrame(tick);
  }
  tick();

  // Canvas starfield (lightweight)
  (function initStarfield(){
    let canvas = document.getElementById('spaceCanvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'spaceCanvas';
      canvas.className = 'space-canvas';
      document.body.insertBefore(canvas, document.body.firstChild);
    }
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const stars = [];
    const STAR_COUNT = Math.floor((w*h)/6000); // adapt count to screen
    for (let i=0;i<STAR_COUNT;i++){
      stars.push({
        x: Math.random()*w,
        y: Math.random()*h,
        z: Math.random()*1,
        r: Math.random()*1.2 + 0.3,
        vx: (Math.random()-0.5)*0.1,
      });
    }

    function resize(){
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);

    function draw(){
      ctx.clearRect(0,0,w,h);
      // subtle gradient background overlay (keeps underlying CSS gradient)
      // draw stars
      for (let s of stars){
        s.x += s.vx;
        s.y += (s.z*0.2);
        if (s.x < -10) s.x = w+10;
        if (s.x > w+10) s.x = -10;
        if (s.y > h+10) s.y = -10;

        const alpha = 0.6 + 0.4 * s.z;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
        ctx.fill();
      }

      requestAnimationFrame(draw);
    }

    draw();
  })();
});
