$(function () {
  $(".glitch-img").mgGlitch({
    destroy: false,
    glitch: true,
    scale: true,
    blend: true,
    blendModeType: "hue",
    glitch1TimeMin: 400,
    glitch1TimeMax: 800,
    glitch2TimeMin: 30,
    glitch2TimeMax: 200,
  });
});

// Custom cursor
const cursor = document.getElementById("cursor");
const cursorRing = document.getElementById("cursorRing");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + "px";
  cursor.style.top = my + "px";
});

(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cursorRing.style.left = rx + "px";
  cursorRing.style.top = ry + "px";
  requestAnimationFrame(animRing);
})();

document
  .querySelectorAll("a, button, .project-card, .skill-card, .stat-card")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(2)";
      cursor.style.background = "var(--neon-magenta)";
      cursor.style.boxShadow =
        "0 0 10px var(--neon-magenta), 0 0 30px var(--neon-magenta)";
      cursorRing.style.width = "60px";
      cursorRing.style.height = "60px";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      cursor.style.background = "var(--neon-cyan)";
      cursor.style.boxShadow =
        "0 0 10px var(--neon-cyan), 0 0 30px var(--neon-cyan)";
      cursorRing.style.width = "36px";
      cursorRing.style.height = "36px";
    });
  });

// Scroll reveal
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Animate skill bars
        entry.target
          .querySelectorAll(".skill-bar-fill")
          .forEach((bar) => bar.classList.add("animate"));
      }
    });
  },
  { threshold: 0.15 },
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
/* MATRIX RAIN */
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 14;
const columns = canvas.width / fontSize;

const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(2,4,8,0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#39ff14";
  ctx.font = fontSize + "px monospace";

  drops.forEach((y, i) => {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, y * fontSize);

    if (y * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  });
}

setInterval(drawMatrix, 33);
const logs = [
  "[SYS] Boot sequence start...",
  "[SYS] Loading kernel modules...",
  "[NET] Establishing secure link...",
  "[SEC] Bypassing firewall...",
  "[AUTH] Injecting credentials...",
  "[OK] Access granted ✔",
  "[UI] Rendering interface...",
  "[DONE] Welcome, Jubayed....",
];

const logContainer = document.getElementById("bootLogs");
const progress = document.getElementById("progressFill");
const boot = document.getElementById("bootScreen");
const ipTrack = document.getElementById("ipTrack");

let i = 0;

/* FAKE IP TRACKING */
function fakeIP() {
  const ip = `${rand(10, 255)}.${rand(0, 255)}.${rand(0, 255)}.${rand(0, 255)}`;
  ipTrack.textContent = "Tracking IP: " + ip;
}
function rand(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

setInterval(fakeIP, 300);

/* TYPE LOGS */
function bootSequence() {
  if (i < logs.length) {
    const line = document.createElement("div");
    line.textContent = logs[i];
    logContainer.appendChild(line);

    logContainer.scrollTop = logContainer.scrollHeight;

    progress.style.width = ((i + 1) / logs.length) * 100 + "%";

    i++;
    setTimeout(bootSequence, 920);
  } else {
    setTimeout(() => {
      boot.style.transition = "all 1s ease";
      boot.style.opacity = "0";
      boot.style.transform = "scale(1.1)";

      setTimeout(() => {
        boot.style.display = "none";
        canvas.style.display = "none";
      }, 3900);
    }, 800);
  }
}

bootSequence();
