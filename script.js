const dots = document.querySelectorAll(".dot");
const orbit = document.querySelector(".orbit");
const hoverImage = document.querySelector(".hover-image");
const hoverImg = document.getElementById("hoverImg");

dots.forEach((dot) => {
  dot.addEventListener("mouseenter", () => {
    orbit.classList.add("dim");
    dot.classList.add("active");

    hoverImg.src = dot.dataset.image;
    hoverImage.style.opacity = "1";
  });

  dot.addEventListener("mouseleave", () => {
    orbit.classList.remove("dim");
    dot.classList.remove("active");

    hoverImage.style.opacity = "0";
  });
});