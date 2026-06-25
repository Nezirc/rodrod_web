// Sticky nav background once you scroll past the top
const hdr = document.getElementById('hdr');
addEventListener('scroll', () => hdr.classList.toggle('scrolled', scrollY > 40));

// Fade + slide elements in as they enter the viewport
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (i % 2 * 80) + 'ms';
  io.observe(el);
});

/* ===== Centered fullscreen player =====
   Clicking a card (or its expand button) opens a black overlay
   that goes fullscreen with the 9:16 clip centered inside. */
const lightbox = document.getElementById('lightbox');
const lbVideo  = document.getElementById('lbVideo');
const lbClose  = document.getElementById('lbClose');

function openPlayer(src) {
  lbVideo.src = src;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  if (lightbox.requestFullscreen) lightbox.requestFullscreen().catch(() => {});
  lbVideo.play().catch(() => {});
}

function closePlayer() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  lbVideo.pause();
  lbVideo.removeAttribute('src');
  lbVideo.load();
  if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
}

document.querySelectorAll('.shot').forEach((shot) => {
  const video = shot.querySelector('video');
  const btn   = shot.querySelector('.expand');
  const src   = video ? video.getAttribute('src') : null;
  if (!src) return;
  const open = (e) => { e.preventDefault(); openPlayer(src); };
  if (btn) btn.addEventListener('click', open);
  if (video) video.addEventListener('click', open);
});

lbClose.addEventListener('click', (e) => { e.stopPropagation(); closePlayer(); });
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closePlayer(); });
addEventListener('keydown', (e) => { if (e.key === 'Escape') closePlayer(); });
document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement && lightbox.classList.contains('open')) closePlayer();
});

// Render the Lucide icons
if (window.lucide) lucide.createIcons();