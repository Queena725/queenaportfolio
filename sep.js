

document.addEventListener("DOMContentLoaded", () => {
  const mainImg = document.getElementById("mainImg");
  const sideList = document.getElementById("sideList");

  if (!mainImg || !sideList) return;

  sideList.addEventListener("click", (e) => {
    const btn = e.target.closest(".sideBtn");
    if (!btn) return;

    const src = btn.dataset.src;
    const title = btn.dataset.title || "Preview";
    if (!src) return;

    // swap image
    mainImg.src = src;
    mainImg.alt = `Sephora redesign — ${title}`;

    // active state
    sideList.querySelectorAll(".sideBtn").forEach((b) => {
      b.classList.remove("is-active");
      b.removeAttribute("aria-current");
    });
    btn.classList.add("is-active");
    btn.setAttribute("aria-current", "true");
  });
});