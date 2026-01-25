// Load and render front page content from content.json
document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("forside/content.json");
    const content = await response.json();

    // Hero section
    document.querySelector(".hero-content h1").textContent = content.hero.title;
    document.querySelector(".hero-content p").textContent =
      content.hero.subtitle;

    // Cards section
    const cardsContainer = document.querySelector(".cards");
    cardsContainer.innerHTML = "";

    content.cards.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.className = "card";

      const onclick = card.comingSoon
        ? "onclick=\"alert('Kommer snart!'); return false;\""
        : "";

      cardElement.innerHTML = `
        <div class="card-icon">${card.icon}</div>
        <h2>${card.title}</h2>
        <p>${card.description}</p>
        <a href="${card.link}" class="card-link" ${onclick}>${card.linkText}</a>
      `;

      cardsContainer.appendChild(cardElement);
    });

    // About section
    document.querySelector(".about-section h2").textContent =
      content.about.title;
    const aboutSection = document.querySelector(".about-section");
    const existingH2 = aboutSection.querySelector("h2");

    // Remove existing paragraphs
    const existingParagraphs = aboutSection.querySelectorAll("p");
    existingParagraphs.forEach((p) => p.remove());

    // Add new paragraphs
    content.about.paragraphs.forEach((text) => {
      const p = document.createElement("p");
      p.textContent = text;
      aboutSection.appendChild(p);
    });
  } catch (error) {
    console.error("Error loading front page content:", error);
  }
});
