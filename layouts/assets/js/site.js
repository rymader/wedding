// Simple slideshow logic (works with the HTML structure below)
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.slideshow').forEach(slideShowEl => {
    const slidesEl = slideShowEl.querySelector('.slides');
    const slideEls = Array.from(slidesEl.children);
    const prev = slideShowEl.querySelector('.btn.prev');
    const next = slideShowEl.querySelector('.btn.next');
    const dotsEl = slideShowEl.querySelector('.dots');
    let i = 0, autoplayMs = 4500, timer = null, hovering = false;

    slideEls.forEach((_, idx) => {
      const b = document.createElement('button');
      b.className = 'dot'; b.type = 'button';
      b.setAttribute('aria-label', `Go to slide ${idx+1}`);
      b.addEventListener('click', () => go(idx, true));
      dotsEl.appendChild(b);
    });

    function update(){
      slidesEl.style.transform = `translateX(-${i*100}%)`;
      Array.from(dotsEl.children).forEach((d, idx)=>d.setAttribute('aria-current', idx===i ? 'true':'false'));
    }
    function go(n, user){ const m = slideEls.length; i = (n+m)%m; update(); if(user) restart(); }
    function nextSlide(){ go(i+1); }
    function prevSlide(){ go(i-1, true); }
    function start(){ if (autoplayMs>0) timer=setInterval(()=>{ if(!hovering) nextSlide(); }, autoplayMs); }
    function stop(){ if (timer) clearInterval(timer); timer=null; }
    function restart(){ stop(); start(); }

    next?.addEventListener('click', nextSlide);
    prev?.addEventListener('click', prevSlide);
    slidesEl.addEventListener('mouseenter', ()=>hovering=true);
    slidesEl.addEventListener('mouseleave', ()=>hovering=false);

    let sx=null;
    slidesEl.addEventListener('touchstart', e=>{ sx=e.touches[0].clientX; }, {passive:true});
    slidesEl.addEventListener('touchend', e=>{
      if(sx==null) return;
      const dx=e.changedTouches[0].clientX - sx;
      if(Math.abs(dx)>40) (dx<0 ? nextSlide : prevSlide)();
      sx=null;
    });

    update(); start();
  });
});

// Mobile nav toggle + header shadow
(function () {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('nav-menu');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Close on link click (mobile)
    nav.addEventListener('click', (e) => {
      if (e.target.closest('a') && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Add subtle shadow when scrolling
  const onScroll = () => {
    if (window.scrollY > 6) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

