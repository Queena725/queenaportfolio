const dots = document.querySelectorAll(".dot");
const orbit = document.querySelector(".orbit");

const hoverImage = document.querySelector(".hover-image");
const hoverImg = document.getElementById("hoverImg");
const hoverVideo = document.getElementById("hoverVideo");

dots.forEach((dot) => {
  dot.addEventListener("mouseenter", () => {
    orbit.classList.add("dim");
    dot.classList.add("active");

    // ✅ data-src 우선, 없으면 data-image fallback
    const src = dot.dataset.src || dot.dataset.image;
    const type = dot.dataset.type || "image";

    if (!src) return;

    hoverImage.style.opacity = "1";

    if (type === "video") {
      hoverImg.style.display = "none";

      hoverVideo.src = src;
      hoverVideo.style.display = "block";
      hoverVideo.play();
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
  });
});