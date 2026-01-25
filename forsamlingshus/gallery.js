// Dynamic Gallery Loader for Forsamlingshus
document.addEventListener("DOMContentLoaded", function () {
  const galleryContainer = document.getElementById("dynamic-gallery");
  const galleryPath = "../images/gallery/";
  let currentIndex = 0;
  let autoSlideInterval = null;
  let images = [];

  // Function to load gallery images
  async function loadGalleryImages() {
    try {
      // Try to load from PHP endpoint first
      const response = await fetch("../get_gallery_images.php");
      if (response.ok) {
        const imagesList = await response.json();
        images = imagesList;
        displayImages(images);
        initializeSlider();
      } else {
        // Fallback: load predefined images
        loadFallbackImages();
      }
    } catch (error) {
      console.log("Using fallback image loading");
      loadFallbackImages();
    }
  }

  // Fallback function that uses predefined images
  function loadFallbackImages() {
    const imageFiles = [
      "forsamlingshus.jpg",
      "forsamlingshus1.jpg",
      "forsamlingshuset-1200x1200.png",
    ];

    images = imageFiles.map((file) => galleryPath + file);
    displayImages(images);
    initializeSlider();
  }

  // Display images in the gallery
  function displayImages(imagesList) {
    if (!galleryContainer || imagesList.length === 0) {
      loadFallbackImages();
      return;
    }

    galleryContainer.innerHTML = "";

    imagesList.forEach((imagePath, index) => {
      const galleryItem = document.createElement("div");
      galleryItem.className = "gallery-item";
      galleryItem.style.display = index === 0 ? "block" : "none";

      const img = document.createElement("img");
      img.src = imagePath;
      img.alt = "Skjød Forsamlingshus";
      img.loading = index === 0 ? "eager" : "lazy";

      galleryItem.appendChild(img);
      galleryContainer.appendChild(galleryItem);
    });
  }

  // Initialize automatic slider
  function initializeSlider() {
    if (images.length <= 1) return;

    // Auto-advance every 7 seconds
    autoSlideInterval = setInterval(() => {
      showNextSlide();
    }, 7000);
  }

  // Show next slide with fade transition
  function showNextSlide() {
    const allItems = galleryContainer.querySelectorAll(".gallery-item");
    if (allItems.length === 0) return;

    // Fade out current
    allItems[currentIndex].style.opacity = "0";

    setTimeout(() => {
      allItems[currentIndex].style.display = "none";

      // Move to next slide
      currentIndex = (currentIndex + 1) % allItems.length;

      // Fade in next
      allItems[currentIndex].style.display = "block";
      allItems[currentIndex].style.opacity = "0";

      setTimeout(() => {
        allItems[currentIndex].style.opacity = "1";
      }, 50);
    }, 300);
  }

  // Load images
  loadGalleryImages();
});
