// Content loader for main landing page
(function () {
  "use strict";

  fetch("/content.json")
    .then((r) => r.json())
    .then((data) => {
      // Hero section
      const heroTitle = document.querySelector(".hero-content h1");
      const heroSubtitle = document.querySelector(".hero-content p");
      if (heroTitle && data.hero) heroTitle.textContent = data.hero.title;
      if (heroSubtitle && data.hero)
        heroSubtitle.textContent = data.hero.subtitle;

      // Cards section
      const cardsContainer = document.querySelector(".cards");
      if (cardsContainer && data.cards) {
        cardsContainer.innerHTML = data.cards
          .map(
            (card) => `
          <div class="card">
            <div class="card-icon">${card.icon}</div>
            <h3>${card.title}</h3>
            <p>${card.description}</p>
            <a href="${card.link}" class="card-link">${card.linkText}</a>
          </div>
        `,
          )
          .join("");
      }

      // About section
      const aboutTitle = document.querySelector(".about-section h2");
      const aboutSection = document.querySelector(".about-section");
      if (aboutTitle && data.about) {
        aboutTitle.textContent = data.about.title;
        data.about.paragraphs.forEach((text) => {
          const p = document.createElement("p");
          p.textContent = text;
          aboutSection.appendChild(p);
        });
      }
    })
    .catch((err) => console.error("Error loading content:", err));
})();
