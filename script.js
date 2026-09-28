const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section");
const counter = document.getElementById("counter");
const toast = document.getElementById("toast");
const themeToggle = document.getElementById("themeToggle");

let visits = Number(localStorage.getItem("nithinVisits") || 42) + 1;
localStorage.setItem("nithinVisits", visits);
counter.textContent = String(visits).padStart(6, "0");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2500);
}

window.addEventListener("load", () => {
  setTimeout(() => showToast("WELCOME TO NITHIN.EXE!"), 500);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === "#" + entry.target.id
      );
    });
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach(section => observer.observe(section));

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("crt");
  showToast(document.body.classList.contains("crt")
    ? "CRT SCANLINES ENABLED"
    : "CRT SCANLINES DISABLED");
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", () => {
    showToast("LOADING " + link.textContent.trim() + "...");
  });
});
