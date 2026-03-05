// =====================
// Elements
// =====================
const dots = document.querySelectorAll(".dot");
const orbit = document.querySelector(".orbit");

const hoverImage = document.querySelector(".hover-image");
const hoverImg = document.getElementById("hoverImg");
const hoverVideo = document.getElementById("hoverVideo");

const centerMessage = document.getElementById("centerMessage");

const filterButtons = document.querySelectorAll(".filter-btn");

let activeFilter = null;

// =====================
// Helpers
// =====================
function showCenterMessage(text = "Click to view") {
  if (!centerMessage) return;
  centerMessage.textContent = text;
  centerMessage.classList.add("blink");
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

// =====================
// HOVER (Image/Video preview + message)
// =====================
dots.forEach((dot) => {
  dot.addEventListener("mouseenter", () => {
    if (orbit) orbit.classList.add("dim");
    dot.classList.add("active");

    const src = getDotSrc(dot);
    const type = getDotType(dot);

    // If no preview source, don't show preview/message
    if (!src) {
      if (hoverImage) hoverImage.style.opacity = "0";
      hideCenterMessage();
      return;
    }

    // Show preview container
    if (hoverImage) hoverImage.style.opacity = "1";

    // Center message text
    const isComing = dot.dataset.coming === "true";
    showCenterMessage(isComing ? "Coming soon" : "Click to view");

    if (type === "video") {
      // Video mode
      if (hoverImg) hoverImg.style.display = "none";

      if (hoverVideo) {
        hoverVideo.src = src;
        hoverVideo.style.display = "block";

        // Default video size
        hoverVideo.style.width = "75vw";
        hoverVideo.style.maxWidth = "1000px";

        // pigma special case
        if (dot.getAttribute("href") === "pigma.html") {
          hoverVideo.style.width = "50vw";
          hoverVideo.style.maxWidth = "650px";
        }

        // play (ignore autoplay errors)
        const p = hoverVideo.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      }
    } else {
      // Image mode
      if (hoverVideo) {
        hoverVideo.pause();
        hoverVideo.style.display = "none";
      }
      if (hoverImg) {
        hoverImg.src = src;
        hoverImg.style.display = "block";
      }
    }
  });

  dot.addEventListener("mouseleave", () => {
    if (orbit) orbit.classList.remove("dim");
    dot.classList.remove("active");

    if (hoverImage) hoverImage.style.opacity = "0";
    hideCenterMessage();

    // Reset video safely
    if (hoverVideo) {
      hoverVideo.pause();
      hoverVideo.style.display = "none";

      // restore defaults
      hoverVideo.style.width = "75vw";
      hoverVideo.style.maxWidth = "1000px";
    }
  });

  // Optional: block click for coming soon dots
  dot.addEventListener("click", (e) => {
    if (dot.dataset.coming === "true") {
      e.preventDefault();
    }
  });
});

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

