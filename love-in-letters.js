const images = [
  "images/love letters book/spreads.jpg", // ✅ cover
  "images/love letters book/spreads2.jpg",
  "images/love letters book/spreads3.jpg",
  "images/love letters book/spreads4.jpg",
  "images/love letters book/spreads5.jpg",
  "images/love letters book/spreads6.jpg",
  "images/love letters book/spreads7.jpg",
  "images/love letters book/spreads8.jpg",
  "images/love letters book/spreads9.jpg",
  "images/love letters book/spreads10.jpg",
  "images/love letters book/spreads11.jpg",
  "images/love letters book/spreads12.jpg",
  "images/love letters book/spreads13.jpg",
  "images/love letters book/spreads14.jpg",
  "images/love letters book/spreads15.jpg",
  "images/love letters book/spreads16.jpg",
  "images/love letters book/spreads17.jpg",
  "images/love letters book/spreads18.jpg",
  "images/love letters book/spreads19.jpg",
  "images/love letters book/spreads20.jpg",
  "images/love letters book/spreads21.jpg",
  "images/love letters book/spreads22.jpg",
  "images/love letters book/spreads23.jpg",
  "images/love letters book/spreads24.jpg",
  "images/love letters book/spreads25.jpg",
  "images/love letters book/spreads26.jpg",
  "images/love letters book/spreads27.jpg",
  "images/love letters book/spreads28.jpg",
  "images/love letters book/spreads29.jpg",
  "images/love letters book/spreads30.jpg",
  "images/love letters book/spreads31.jpg",
  "images/love letters book/spreads32.jpg",
  "images/love letters book/spreads33.jpg",
  "images/love letters book/spreads34.jpg",
  "images/love letters book/spreads35.jpg",
  "images/love letters book/spreads36.jpg",
  "images/love letters book/spreads37.jpg",
  "images/love letters book/spreads38.jpg",
  "images/love letters book/spreads39.jpg",
  "images/love letters book/spreads40.jpg",
  "images/love letters book/spreads41.jpg",
  "images/love letters book/spreads42.jpg",
  "images/love letters book/spreads43.jpg",
  "images/love letters book/spreads44.jpg",
  "images/love letters book/spreads45.jpg",
  "images/love letters book/spreads46.jpg",
  "images/love letters book/spreads47.jpg",
  "images/love letters book/spreads48.jpg",
];

let currentIndex = 1;

const viewer = document.getElementById("bookViewer");
const img = document.getElementById("bookImage");

/* 핵심: 이미지 + cover/spread 상태를 항상 여기서만 처리 */
function updateImage() {
  img.src = images[currentIndex];

  if (currentIndex === 0) {
    img.classList.add("is-cover"); // ✅ cover
  } else {
    img.classList.remove("is-cover"); //  spread
  }
}


updateImage();

function goNext() {
  if (currentIndex < images.length - 1) {
    currentIndex++;
    updateImage();
  }
}

function goPrev() {
  if (currentIndex > 0) {
    currentIndex--;
    updateImage();
  }
}

/* ✅ 데스크탑 클릭 */
viewer.addEventListener("click", (e) => {
  const rect = viewer.getBoundingClientRect();
  const x = e.clientX - rect.left;

  if (x > rect.width / 2) {
    goNext();
  } else {
    goPrev();
  }
});

/* ✅ 모바일 스와이프 */
let startX = 0;

viewer.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

viewer.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;

  if (diff < -40) goNext();
  if (diff > 40) goPrev();
});