// Fade-in animation for each section
const sections = document.querySelectorAll(".section");
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){ entry.target.classList.add("visible"); }
  });
},{ threshold: 0.2 });
sections.forEach(sec=>observer.observe(sec));

// Back-to-top button
const backToTopBtn = document.getElementById("backToTop");
window.addEventListener("scroll",()=>{
  backToTopBtn.style.display = (window.scrollY > 300) ? "block" : "none";
});
backToTopBtn.addEventListener("click",()=>{
  window.scrollTo({ top:0, behavior:"smooth" });
});
