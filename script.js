// 🌟 Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// 🌙 Fade-in animation for sections
const fadeSections = document.querySelectorAll(".fade-in");
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeSections.forEach(section => {
  section.style.opacity = 0;
  section.style.transform = "translateY(25px)";
  fadeObserver.observe(section);
});

// 💫 Subtle header glow pulse (optional aesthetic)
const hero = document.querySelector('.hero');
if (hero) {
  setInterval(() => {
    hero.style.background = `radial-gradient(circle at center, rgba(56,189,248,${0.15 + Math.random() * 0.15}) 0%, transparent 70%)`;
  }, 2500);
}

// 🩵 Console signature (for fun)
console.log("%cBuilt with empathy and engineering by Kejia Liu", "color:#42a5f5;font-weight:bold;");
