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

// Render the Lucide icons
if (window.lucide) lucide.createIcons();