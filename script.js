// =======================
// Typing Effect (Optimized)
// =======================
const words = [
  "Short-form Edits",
  "Long-form Videos",
  "Gaming Montages",
  "Ads & Commercials",
  "Anime Edits"
];
let i = 0, j = 0, isDeleting = false;
const typingSpan = document.getElementById("typing");

function typeEffect() {
  const currentWord = words[i];
  typingSpan.textContent = isDeleting
    ? currentWord.substring(0, j--)
    : currentWord.substring(0, j++);

  if (!isDeleting && j === currentWord.length + 1) {
    isDeleting = true;
    setTimeout(typeEffect, 1000); // wait before deleting
  } else if (isDeleting && j < 0) {
    isDeleting = false;
    i = (i + 1) % words.length;
    setTimeout(typeEffect, 200);
  } else {
    setTimeout(typeEffect, isDeleting ? 40 : 90);
  }
}
typeEffect();

// =======================
// Portfolio Filter (Faster)
// =======================
const filterButtons = document.querySelectorAll(".filter-buttons button");
const items = document.querySelectorAll(".portfolio .item");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".filter-buttons .active").classList.remove("active");
    button.classList.add("active");

    const filter = button.dataset.filter;
    items.forEach(item => {
      const show = filter === "all" || item.classList.contains(filter);
      item.style.display = show ? "block" : "none";
    });
  });
});

// =======================
// Lightbox (Smooth)
// =======================
const lightbox = document.getElementById("lightbox");
const lightboxVideo = document.getElementById("lightboxVideo");
const closeBtn = document.getElementById("close");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let currentIndex = 0;
const videos = [...items].map(item => item.querySelector("video").src);

function showVideo(index) {
  currentIndex = index;
  lightboxVideo.src = videos[currentIndex];
  lightbox.style.display = "flex";
  lightboxVideo.play();
}

items.forEach((item, index) => {
  item.addEventListener("click", () => showVideo(index));
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
  lightboxVideo.pause();
  lightboxVideo.src = "";
});

nextBtn.addEventListener("click", () => showVideo((currentIndex + 1) % videos.length));
prevBtn.addEventListener("click", () => showVideo((currentIndex - 1 + videos.length) % videos.length));

document.addEventListener("keydown", e => {
  if (lightbox.style.display === "flex") {
    if (e.key === "Escape") closeBtn.click();
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
  }
});

// =======================
// Hamburger Menu (Fast Toggle)
// =======================
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});
