//  NAV TOGGLE
const toggle = document.querySelector('.nav__toggle');
const menu  = document.querySelector('.nav__menu');
toggle?.addEventListener('click', () => {
  const vis = menu.dataset.visible === 'true';
  menu.dataset.visible = !vis;
  toggle.setAttribute('aria-expanded', !vis);
});

//  REMOVE LOADER
window.addEventListener('load', () => document.body.classList.add('loaded'));

//  ANIMATE BARS WHEN IN VIEW
const bars = document.querySelectorAll('.bar span');
const obs = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting){
      const w = en.target.closest('.bar').dataset.width;
      en.target.style.width = w + '%';
    }
  });
}, {threshold:.5});
bars.forEach(b => obs.observe(b));

//  LIVE STATS (price + holders) – tiny fetch
async function getStats(){
  try{
    const res = await fetch('https://api.stellar.expert/api/explorer/public/asset/LMD-GDREZ3OFPF54PI43EO5OPHBT6XWDKQO33OLHS6SV5LS4AGVI5L73L6SP');
    const data = await res.json();
    const price  = data.priceUsd  ? `$${Number(data.priceUsd).toFixed(6)}` : 'n/a';
    const holders= data.holders   ? data.holders : 'n/a';
    document.querySelector('.live h2').insertAdjacentHTML('afterend',
     `<div class="mini-stats">Price: <b>${price}</b> | Holders: <b>${holders}</b></div>`);
  }catch(e){console.log('stats fetch failed')}
}
getStats();

//  COPY ADDRESS TOAST
const CONTRACT = 'GDREZ3OFPF54PI43EO5OPHBT6XWDKQO33OLHS6SV5LS4AGVI5L73L6SP';
document.addEventListener('click', e => {
  if(e.target.dataset.copy !== undefined){
    navigator.clipboard.writeText(CONTRACT);
    toast('Contract copied!');
  }
});
function toast(msg){
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = 'position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:var(--purple);color:#fff;padding:.5rem 1.2rem;border-radius:30px;font-size:.9rem;z-index:2000';
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2200);
}

// LOATING BUBBLES
document.addEventListener("DOMContentLoaded", () => {
  const bubbles = document.querySelector(".bubbles");
  for (let i = 0; i < 20; i++) {
    const span = document.createElement("span");
    const size = Math.random() * 50 + 10;
    span.style.width = `${size}px`;
    span.style.height = `${size}px`;
    span.style.left = `${Math.random() * 100}%`;
    span.style.animationDuration = `${8 + Math.random() * 10}s`;
    bubbles.appendChild(span);
  }
});
