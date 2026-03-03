// script.js
(() => {
  const dlg = document.getElementById("dlg");
  const dlgImg = document.getElementById("dlgImg");
  const dlgTitle = document.getElementById("dlgTitle");
  const dlgClose = document.getElementById("dlgClose");

  function openZoom(src, title){
    dlgTitle.textContent = title || "Preview";
    dlgImg.src = src;
    dlg.showModal();
  }

  // Zoom buttons
  document.querySelectorAll("[data-zoom]").forEach(btn => {
    btn.addEventListener("click", () => {
      openZoom(btn.dataset.zoom, btn.dataset.title);
    });
  });

  // Clicking image inside scrollFrame also opens zoom
  document.querySelectorAll(".scrollFrame img").forEach(img => {
    img.addEventListener("click", () => {
      openZoom(img.currentSrc || img.src, img.alt || "Preview");
    });
  });

  // Close
  dlgClose?.addEventListener("click", () => dlg.close());

  // Click outside closes
  dlg.addEventListener("click", (e) => {
    const box = dlg.querySelector(".dlgBox");
    if(!box) return;
    const rect = box.getBoundingClientRect();
    const inside =
      e.clientX >= rect.left && e.clientX <= rect.right &&
      e.clientY >= rect.top && e.clientY <= rect.bottom;
    if(!inside) dlg.close();
  });

  // ESC closes naturally for <dialog>
})();