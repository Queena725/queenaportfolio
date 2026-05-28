const lightbox = document.getElementById("lightbox");
const lightboxContent = document.getElementById("lightboxContent");
const closeBtn = document.getElementById("lightboxClose");

const items = document.querySelectorAll(".archive-item img:not(a img), .archive-item video");
let clickTimer = null;

function openLightbox(item) {
  lightbox.classList.add("active");
  lightboxContent.innerHTML = "";

  if (item.tagName === "IMG") {
    const img = document.createElement("img");
    img.src = item.src;
    lightboxContent.appendChild(img);
    return;
  }

  if (item.tagName === "VIDEO") {
    const video = document.createElement("video");
    video.src = item.querySelector("source").src;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.controls = false;

    lightboxContent.appendChild(video);
  }
}

items.forEach((item) => {
  item.addEventListener("click", (event) => {
    const figure = item.closest(".archive-item");
    const href = figure?.dataset?.href;
    const shouldLink = figure?.dataset?.link === "true"; // ✅ 이거 체크
    const doubleHref = figure?.dataset?.doubleHref;

    // ✅ data-link="true" 인 것만 바로 이동
    if (shouldLink && href) {
      window.location.href = href;
      return;
    }

    if (doubleHref && event.detail > 1) {
      return;
    }

    window.clearTimeout(clickTimer);
    clickTimer = window.setTimeout(() => openLightbox(item), doubleHref ? 220 : 0);
  });

  item.addEventListener("dblclick", () => {
    const figure = item.closest(".archive-item");
    const doubleHref = figure?.dataset?.doubleHref;

    if (doubleHref) {
      window.clearTimeout(clickTimer);
      window.location.href = doubleHref;
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
