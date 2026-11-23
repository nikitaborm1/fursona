  /* FurNest — script.js
   Мобильное меню-бургер + лайки в галерее (localStorage) */

// ---------- Мобильное меню ----------
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

function setMenu(open) {
  if (!navToggle || !navMenu) return;
  navMenu.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    setMenu(!navMenu.classList.contains('open'));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) setMenu(false);
  });
}

// ---------- Лайки в галерее ----------
const LIKES_KEY = 'furnest-likes';
let likedIds = [];

try {
  likedIds = JSON.parse(localStorage.getItem(LIKES_KEY)) || [];
} catch (e) {
  likedIds = [];
}

function saveLikes() {
  localStorage.setItem(LIKES_KEY, JSON.stringify(likedIds));
}

function updateLikeBtn(btn) {
  const id = btn.getAttribute('data-id');
  const liked = likedIds.indexOf(id) > -1;
  btn.classList.toggle('liked', liked);
  btn.setAttribute('aria-pressed', liked ? 'true' : 'false');
  btn.textContent = liked ? '❤️' : '🤍';
}

document.querySelectorAll('.like-btn').forEach((btn) => {
  updateLikeBtn(btn);
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const id = btn.getAttribute('data-id');
    const idx = likedIds.indexOf(id);
    if (idx > -1) {
      likedIds.splice(idx, 1);
    } else {
      likedIds.push(id);
    }
    saveLikes();
    updateLikeBtn(btn);
  });
});

// ---------- Форма контактов (визуальная, без отправки) ----------
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => e.preventDefault());
}

// ---------- Текущий год в подвале ----------
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
