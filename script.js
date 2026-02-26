const dots = document.querySelectorAll(".dot");
const orbit = document.querySelector(".orbit");

const hoverImage = document.querySelector(".hover-image");
const hoverImg = document.getElementById("hoverImg");
const hoverVideo = document.getElementById("hoverVideo");

const filterButtons = document.querySelectorAll(".filter-btn");

let activeFilter = null;

/* ---------------- HOVER ---------------- */
dots.forEach((dot) => {
  dot.addEventListener("mouseenter", () => {
    orbit.classList.add("dim");
    dot.classList.add("active");

    const src = dot.dataset.src || dot.dataset.image;
    const type = dot.dataset.type || "image";

    if (!src) return;

    hoverImage.style.opacity = "1";

    if (type === "video") {
      hoverImg.style.display = "none";
      hoverVideo.src = src;
      hoverVideo.style.display = "block";
      hoverVideo.play();

      //  기본 영상 크기 (모든 영상 공통)
      hoverVideo.style.width = "75vw";
      hoverVideo.style.maxWidth = "1000px";

      // pigma만 작게
      if (dot.getAttribute("href") === "pigma.html") {
        hoverVideo.style.width = "50vw";
        hoverVideo.style.maxWidth = "650px";
      }

    } else {
      hoverVideo.pause();
      hoverVideo.style.display = "none";
      hoverImg.src = src;
      hoverImg.style.display = "block";
    }
  });

  dot.addEventListener("mouseleave", () => {
    orbit.classList.remove("dim");
    dot.classList.remove("active");
    hoverImage.style.opacity = "0";
    hoverVideo.pause();

    // 항상 기본값 복구
    hoverVideo.style.width = "75vw";
    hoverVideo.style.maxWidth = "1000px";
  });
});
/* ---------------- FILTER ---------------- */

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    // 버튼 active 스타일
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // 같은 버튼 다시 누르면 전체 복구
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


// coming soon 

const centerMessage = document.getElementById("centerMessage");
const comingDots = document.querySelectorAll(
  '.dot[data-coming="true"]'
);

comingDots.forEach((dot) => {
  dot.addEventListener("mouseenter", () => {
    centerMessage.style.opacity = "1";
  });

  dot.addEventListener("mouseleave", () => {
    centerMessage.style.opacity = "0";
  });
});