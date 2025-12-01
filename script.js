// ===========================
// Fade-in animation for sections
// ===========================
const sections = document.querySelectorAll(".section");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15 }
  );

  sections.forEach((sec) => observer.observe(sec));
} else {
  // 兼容极老旧浏览器：直接全部设为可见
  sections.forEach((sec) => sec.classList.add("visible"));
}

// ===========================
// Back-to-top button
// ===========================
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (!backToTopBtn) return;
  backToTopBtn.style.opacity = window.scrollY > 300 ? "1" : "0";
});

if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// =====================================
// ScrollSpy — highlight current nav link
// =====================================
const navLinks = document.querySelectorAll(".top-nav a");
const pageSections = Array.from(sections);

function activateCurrentSection() {
  let currentId = "";

  pageSections.forEach((sec) => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= 150 && rect.bottom >= 150) {
      currentId = sec.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${currentId}`
    );
  });
}

window.addEventListener("scroll", activateCurrentSection);
activateCurrentSection();

// =====================================
// Smooth scroll for navbar links
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

// =====================================
// Lightbox for images
// =====================================
const lightbox = document.createElement("div");
lightbox.id = "lightbox";
lightbox.innerHTML = `
  <div class="lightbox-inner">
    <img alt="Expanded view" />
    <button class="lightbox-close" aria-label="Close image">×</button>
  </div>
`;
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector("img");
const lightboxClose = lightbox.querySelector(".lightbox-close");
const clickableImages = document.querySelectorAll(".media-card img");

clickableImages.forEach((img) => {
  img.style.cursor = "zoom-in";
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightbox.classList.add("open");
  });
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox || e.target === lightboxClose) {
    lightbox.classList.remove("open");
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    lightbox.classList.remove("open");
  }
});
