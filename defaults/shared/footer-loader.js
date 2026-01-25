// Load shared footer content across all pages
(async function loadSharedFooter() {
  try {
    // Determine the correct path based on current location
    const currentPath = window.location.pathname;
    const pathPrefix = currentPath.includes("/forsamlingshus/") ? "../" : "";

    const response = await fetch(pathPrefix + "defaults/shared/content.json");
    const content = await response.json();

    // Footer widgets
    const footerWidgets = document.querySelectorAll(".footer-widget");
    if (footerWidgets.length >= 2) {
      footerWidgets[0].querySelector("h4").textContent =
        content.footer.widgets[0].title;
      footerWidgets[0].querySelector("p").innerHTML =
        content.footer.widgets[0].content;

      footerWidgets[1].querySelector("h4").textContent =
        content.footer.widgets[1].title;
      footerWidgets[1].querySelector("p").innerHTML =
        content.footer.widgets[1].content;
    }

    // Copyright
    const footerBottom = document.querySelector(".footer-bottom p");
    if (footerBottom) {
      footerBottom.textContent = content.footer.copyright;
    }
  } catch (error) {
    console.error("Error loading shared footer content:", error);
  }
})();
