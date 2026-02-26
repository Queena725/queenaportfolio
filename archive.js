const lightbox = document.getElementById("lightbox");
const lightboxContent = document.getElementById("lightboxContent");
const closeBtn = document.getElementById("lightboxClose");

const items = document.querySelectorAll(
  ".archive-item img:not(a img), .archive-item video"
);
items.forEach((item) => {
  item.addEventListener("click", () => {
    lightbox.classList.add("active");
    lightboxContent.innerHTML = "";

    if (item.tagName === "IMG") {
      const img = document.createElement("img");
      img.src = item.src;
      lightboxContent.appendChild(img);
    }


if (item.tagName === "VIDEO") {
  const video = document.createElement("video");
  video.src = item.querySelector("source").src;
  video.autoplay = true;
  video.loop = true;
  video.muted = true;
  video.playsInline = true;

  lightboxContent.appendChild(video);
}
  });
});

closeBtn.addEventListener("click", () => {
  lightbox.classList.remove("active");
  lightboxContent.innerHTML = "";
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("active");
    lightboxContent.innerHTML = "";
  }
});