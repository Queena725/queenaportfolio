const editorialHero = document.getElementById("editorialHero");
const hoverProfileImg = document.getElementById("hoverProfileImg");
const specializationsLabel = document.querySelector(".specializations-label");

const hoverImages = [

  "images/yebin.JPG",
  "images/mee.jpg"
];

let hoverInterval = null;
let hoverIndex = 0;

if (editorialHero && hoverProfileImg) {
  editorialHero.addEventListener("mouseenter", () => {
    hoverIndex = 0;
    hoverProfileImg.src = hoverImages[hoverIndex];

    hoverInterval = setInterval(() => {
      hoverIndex = (hoverIndex + 1) % hoverImages.length;
      hoverProfileImg.src = hoverImages[hoverIndex];
    }, 1000);
  });

  editorialHero.addEventListener("mouseleave", () => {
    clearInterval(hoverInterval);
    hoverInterval = null;
  });
}

if (specializationsLabel) {
  specializationsLabel.addEventListener("mouseenter", () => {
    document.body.classList.add("specializations-hover");
  });

  specializationsLabel.addEventListener("mouseleave", () => {
    document.body.classList.remove("specializations-hover");
  });
}
