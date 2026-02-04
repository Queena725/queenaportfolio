document.addEventListener("DOMContentLoaded", () => {
  const images = [
    "images/fnf/spread1.jpg",
    "images/fnf/spread2.jpg",
    "images/fnf/spread3.jpg",
    "images/fnf/spread4.jpg",
    "images/fnf/fnf_background.jpg"

  ];

  let currentIndex = 0; 

  const viewer = document.getElementById("bookViewer");
  const img = document.getElementById("bookImage");

  if (!viewer || !img) {
    console.error("viewer or img not found");
    return;
  }

  function updateImage() {
    img.src = images[currentIndex];
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

  /* 데스크탑 클릭 */
  viewer.addEventListener("click", (e) => {
    const rect = viewer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    x > rect.width / 2 ? goNext() : goPrev();
  });

  /* 모바일 스와이프 */
  let startX = 0;

  viewer.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  viewer.addEventListener("touchend", (e) => {
    const diff = e.changedTouches[0].clientX - startX;
    if (diff < -40) goNext();
    if (diff > 40) goPrev();
  });
});