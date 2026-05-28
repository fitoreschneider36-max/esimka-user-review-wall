const canvas = document.getElementById("reviewCanvas");
const ctx = canvas.getContext("2d");
let points = [];

function resize() {
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  points = Array.from({ length: Math.min(78, Math.floor(innerWidth / 17)) }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    vx: (Math.random() - 0.5) * 0.32,
    vy: (Math.random() - 0.5) * 0.32
  }));
}

function draw() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  points.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > innerWidth) p.vx *= -1;
    if (p.y < 0 || p.y > innerHeight) p.vy *= -1;
    for (let j = i + 1; j < points.length; j++) {
      const q = points[j];
      const d = Math.hypot(p.x - q.x, p.y - q.y);
      if (d < 130) {
        ctx.strokeStyle = `rgba(34,211,238,${(1 - d / 130) * 0.2})`;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
    }
    ctx.fillStyle = "rgba(52,211,153,.72)";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(draw);
}

resize();
draw();
addEventListener("resize", resize);

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".review-card").forEach((card) => {
      card.classList.toggle("hidden", filter !== "all" && !card.dataset.tags.includes(filter));
    });
  });
});

document.querySelectorAll("[data-scroll]").forEach((button) => {
  button.addEventListener("click", () => document.querySelector(button.dataset.scroll).scrollIntoView({ behavior: "smooth" }));
});
