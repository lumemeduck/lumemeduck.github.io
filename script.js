//  NAV TOGGLE
const toggle = document.querySelector('.nav__toggle');
const closeBtn = document.querySelector('.nav__close');
const menu = document.querySelector('.nav__menu');
const menuItems = document.querySelectorAll('.nav__menu li a');

let overlay = document.querySelector('.nav__overlay');
if (!overlay) {
  overlay = document.createElement('div');
  overlay.className = 'nav__overlay';
  document.body.appendChild(overlay);
}

function openMenu() {
  menu.dataset.visible = 'true';
  menu.offsetHeight;
  toggle.setAttribute('aria-expanded', 'true');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  menu.dataset.visible = 'false';
  toggle.setAttribute('aria-expanded', 'false');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

toggle.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

menuItems.forEach(item => {
  item.addEventListener('click', closeMenu);
});

let touchStartX = 0;
menu.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX);
menu.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (diff >= 60) closeMenu();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) closeMenu();
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

  // STAR FIELD
  const starField = document.querySelector('.star-field');
  const starCount = 100;

  for (let i = 0; i < starCount; i++) {
  const star = document.createElement('span');
  star.classList.add('star');

  // Random position
  star.style.left = Math.random() * 100 + '%';
  star.style.top = Math.random() * 100 + '%';

  // Random size
  const size = 1 + Math.random() * 2;
  star.style.width = size + 'px';
  star.style.height = size + 'px';

  // Random duration
  const dur = 5 + Math.random() * 15;
  star.style.animationDuration = dur + 's';

  // Random delay
  star.style.animationDelay = Math.random() * 20 + 's';

  starField.appendChild(star);
}

const shootingField = document.querySelector('.shooting-star-field');

function createShootingStar() {
  const star = document.createElement('span');
  star.classList.add('shooting-star');

  // Random start position
  const startX = Math.random() * window.innerWidth * 0.8;
  const startY = Math.random() * window.innerHeight * 0.5;
  star.style.left = startX + 'px';
  star.style.top = startY + 'px';

  // Random duration
  const duration = 0.5 + Math.random() * 1; // 0.5s to 1.5s
  star.style.animationDuration = duration + 's';

  shootingField.appendChild(star);

  // Remove star after animation ends
  star.addEventListener('animationend', () => star.remove());
}

// Randomly create shooting stars every 1-3 seconds
setInterval(() => {
  if (Math.random() > 0.5) createShootingStar();
}, 1000);
