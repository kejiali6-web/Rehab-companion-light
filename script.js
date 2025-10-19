// Smooth scroll for anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

// Fade-in sections on view
const fadeEls = document.querySelectorAll('.fade-in');
const io = new IntersectionObserver((entries) => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.style.opacity = 1;
      en.target.style.transform = 'translateY(0)';
      io.unobserve(en.target);
    }
  });
}, {threshold: 0.12});
fadeEls.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(16px)';
  io.observe(el);
});

// Trigger SVG stroke draw when visible
const svg = document.querySelector('.hand-svg');
if (svg) {
  const sIO = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        svg.querySelectorAll('.hand-path, .device-path').forEach(p => {
          p.style.animationPlayState = 'running';
        });
        sIO.disconnect();
      }
    });
  }, {threshold: 0.35});
  sIO.observe(svg);
}
