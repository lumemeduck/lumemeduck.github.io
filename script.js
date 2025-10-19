// footer year
document.getElementById("year").textContent = new Date().getFullYear();

// reveal sections on scroll
const sections = document.querySelectorAll("main section, header.hero");
const reveal = () => {
  sections.forEach(s => {
    const r = s.getBoundingClientRect();
    if (r.top < window.innerHeight - 100) s.classList.add("visible");
  });
};
window.addEventListener("load", reveal);
window.addEventListener("scroll", reveal);

// floating duck sparkles
const duck = document.querySelector(".floating-duck");
if (duck) {
  setInterval(() => {
    const rect = duck.getBoundingClientRect();
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    // place near duck center with small random offset
    sparkle.style.left = (rect.left + rect.width * 0.5 + (Math.random() * 40 - 20)) + "px";
    sparkle.style.top = (rect.top + rect.height * 0.5 + (Math.random() * 40 - 20)) + "px";
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 2200);
  }, 1200);
}

// CTA links
const ctas = document.querySelectorAll(".btn");
ctas.forEach(c => {
  c.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") c.click();
  });
});
