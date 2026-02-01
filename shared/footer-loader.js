// Load shared footer content across all pages
(async function loadSharedFooter() {
  try {
    const response = await fetch("/assets/shared/content.json");
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
    console.error("Error loading footer:", error);
  }
})();
