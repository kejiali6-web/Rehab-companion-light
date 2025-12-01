// ===========================
// Fade-in animation for sections
// ===========================
const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

sections.forEach((sec) => observer.observe(sec));

// ===========================
// Back-to-top button
// ===========================
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (!backToTopBtn) return;
  backToTopBtn.style.opacity = window.scrollY > 300 ? "1" : "0";
});

// Smooth scroll for back to top button
if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// =====================================
// ScrollSpy — highlight current nav link
// =====================================
const navLinks = document.querySelectorAll(".top-nav a");
const pageSections = [...sections]; // convert NodeList → array

function activateCurrentSection() {
  let currentId = "";

  pageSections.forEach((sec) => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= 150 && rect.bottom >= 150) {
      currentId = sec.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
  });
}

window.addEventListener("scroll", activateCurrentSection);
activateCurrentSection();

// =====================================
// Smooth scroll for navbar links (override browser jump)
// =====================================
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetEl = document.getElementById(targetId);

    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  });
});
