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
const pageSections = [...sections];

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

// 创建 lightbox 容器
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

// 给所有 media-card 里的图片加点击放大
const clickableImages = document.querySelectorAll(".media-card img");

clickableImages.forEach((img) => {
  img.style.cursor = "zoom-in";
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightbox.classList.add("open");
  });
});

// 关闭 lightbox：点击遮罩或 X
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox || e.target === lightboxClose) {
    lightbox.classList.remove("open");
  }
});

// 按 Esc 关闭
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    lightbox.classList.remove("open");
  }
});
