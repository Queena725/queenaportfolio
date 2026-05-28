// =====================
// Elements
// =====================
const dots = document.querySelectorAll(".dot");
const orbit = document.querySelector(".orbit");

const hoverImage = document.querySelector(".hover-image");
const hoverImg = document.getElementById("hoverImg");
const hoverVideo = document.getElementById("hoverVideo");

const centerMessage = document.getElementById("centerMessage");
const bottomInfo = document.querySelector(".bottom-info");
const textCollisionTargets = [centerMessage, bottomInfo].filter(Boolean);

const filterButtons = document.querySelectorAll(".filter-btn");

let activeFilter = null;
let activePreviewUrl = "";
const touchQuery = window.matchMedia("(hover: none), (pointer: coarse)");

function isTouchMode() {
  return touchQuery.matches;
}

// =====================
// Helpers
// =====================
function showCenterMessage(text = "Click to view") {
  if (!centerMessage) return;
  centerMessage.textContent = "Hover the dots. Click to view.";
  centerMessage.classList.remove("blink");
}

function hideCenterMessage() {
  if (!centerMessage) return;
  centerMessage.classList.remove("blink");
}


function getDotSrc(dot) {
  // support both data-src and data-image
  const raw = dot.dataset.src || dot.dataset.image;
  return raw ? raw.trim() : "";
}

function getDotType(dot) {
  return (dot.dataset.type || "image").trim();
}

function setIntroTextHidden(isHidden) {
  if (centerMessage) centerMessage.classList.toggle("is-hidden", isHidden);
  if (bottomInfo) bottomInfo.classList.toggle("is-hidden", isHidden);
}

function rectsOverlap(firstRect, secondRect) {
  return !(
    firstRect.right < secondRect.left ||
    firstRect.left > secondRect.right ||
    firstRect.bottom < secondRect.top ||
    firstRect.top > secondRect.bottom
  );
}

function updateDotTextContrast() {
  if (!textCollisionTargets.length) return;

  const targetRects = textCollisionTargets.map((target) => target.getBoundingClientRect());

  dots.forEach((dot) => {
    const dotRect = dot.getBoundingClientRect();
    const isOverText = targetRects.some((targetRect) => rectsOverlap(dotRect, targetRect));

    dot.classList.toggle("is-over-text", isOverText);
  });

  window.requestAnimationFrame(updateDotTextContrast);
}

function showDotPreview(dot) {
  if (orbit) orbit.classList.add("dim");
  dot.classList.add("active");

  const src = getDotSrc(dot);
  const type = getDotType(dot);

  if (!src) {
    if (hoverImage) {
      hoverImage.style.opacity = "0";
      hoverImage.classList.remove("is-touch-active");
    }
    activePreviewUrl = "";
    setIntroTextHidden(false);
    hideCenterMessage();
    return;
  }

  activePreviewUrl = dot.getAttribute("href") || "";

  if (hoverImage) {
    hoverImage.style.opacity = "1";
    hoverImage.classList.toggle("is-touch-active", isTouchMode());
  }

  showCenterMessage();
  setIntroTextHidden(true);

  if (type === "video") {
    if (hoverImg) hoverImg.style.display = "none";

    if (hoverVideo) {
      hoverVideo.src = src;
      hoverVideo.style.display = "block";
      hoverVideo.style.width = "75vw";
      hoverVideo.style.maxWidth = "1000px";

      if (dot.getAttribute("href") === "pigma.html") {
        hoverVideo.style.width = "50vw";
        hoverVideo.style.maxWidth = "650px";
      }

      const p = hoverVideo.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    }
  } else {
    if (hoverVideo) {
      hoverVideo.pause();
      hoverVideo.style.display = "none";
    }

    if (hoverImg) {
      hoverImg.src = src;
      hoverImg.style.display = "block";
    }
  }
}

function resetDotPreview(dot) {
  if (orbit) orbit.classList.remove("dim");
  dot.classList.remove("active");

  if (hoverImage) {
    hoverImage.style.opacity = "0";
    hoverImage.classList.remove("is-touch-active");
  }
  hideCenterMessage();
  setIntroTextHidden(false);

  if (hoverVideo) {
    hoverVideo.pause();
    hoverVideo.style.display = "none";
    hoverVideo.style.width = "75vw";
    hoverVideo.style.maxWidth = "1000px";
  }
}

// =====================
// HOVER (Image/Video preview + message)
// =====================
dots.forEach((dot) => {
  dot.addEventListener("mouseenter", () => {
    if (isTouchMode()) return;
    showDotPreview(dot);
  });

  dot.addEventListener("mouseleave", () => {
    if (isTouchMode()) return;
    resetDotPreview(dot);
  });

  // Optional: block click for coming soon dots
  dot.addEventListener("click", (e) => {
    if (dot.dataset.coming === "true") {
      e.preventDefault();
      return;
    }

    if (isTouchMode()) {
      e.preventDefault();
      showDotPreview(dot);
    }
  });
});

if (hoverImage) {
  hoverImage.addEventListener("click", () => {
    if (!isTouchMode() || !activePreviewUrl) return;
    window.location.href = activePreviewUrl;
  });
}

window.requestAnimationFrame(updateDotTextContrast);

// =====================
// FILTER
// =====================
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    // button active style
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // toggle off if same button clicked
    if (activeFilter === filter) {
      dots.forEach((dot) => dot.classList.remove("dimmed"));
      filterButtons.forEach((b) => b.classList.remove("active"));
      activeFilter = null;
      return;
    }

    dots.forEach((dot) => {
      if (dot.dataset.category === filter) {
        dot.classList.remove("dimmed");
      } else {
        dot.classList.add("dimmed");
      }
    });

    activeFilter = filter;
  });
});

// =====================
// Custom cursor dot (10px -> 28px on hover)
// =====================
const cursorDot = document.getElementById("cursorDot");

if (cursorDot) {
  window.addEventListener("mousemove", (e) => {
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;
  });

  // expand on any interactive element
  const interactiveSelector =
    "a, button, input, textarea, select, label, [role='button'], .dot, .filter-btn, .link";

  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(interactiveSelector)) {
      cursorDot.classList.add("is-hover");
    }
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(interactiveSelector)) {
      cursorDot.classList.remove("is-hover");
    }
  });
}
