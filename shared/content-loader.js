// Universal content loader for all Skjød Landsby pages
// Automatically detects page type and loads appropriate content

(function () {
  "use strict";

  // Load menubar
  fetch("/shared/menubar.html")
    .then((r) => r.text())
    .then((html) => {
      const menubarDiv = document.getElementById("menubar");
      if (menubarDiv) {
        menubarDiv.innerHTML = html;
      }
    })
    .catch((err) => console.error("Failed to load menubar:", err));

  // Load page-specific content
  document.addEventListener("DOMContentLoaded", function () {
    loadPageContent();
  });

  async function loadPageContent() {
    try {
      // Get current directory to determine which content.json to load
      const currentPath = window.location.pathname;
      const pathParts = currentPath.split("/").filter((p) => p);

      // Construct path to content.json
      let contentPath = "./content.json";

      const response = await fetch(contentPath);
      if (!response.ok) {
        console.warn("No content.json found for this page");
        return;
      }

      const content = await response.json();
      const main = document.querySelector("main");

      if (!main) return;

      // Render content based on page type
      if (content.intro) {
        // Tidende-style intro page
        renderIntroPage(main, content);
      } else if (content.hero) {
        // Forsamlingshus-style page
        renderForsamlingshusPage(content);
      } else if (content.title && content.sections) {
        // Generic section-based page
        renderGenericPage(main, content);
      }
    } catch (error) {
      console.error("Error loading content:", error);
    }
  }

  function renderIntroPage(main, data) {
    const imageHtml = data.intro.image
      ? `<img src="${data.intro.image}" alt="${data.intro.imageAlt || ""}" style="max-width: 210px; width: 100%; height: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">`
      : "";

    main.innerHTML = `
      <h1>${data.intro.title || "Skjød Tidende"}</h1>
      <div style="display: flex; align-items: flex-start; gap: 32px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 220px; white-space: pre-line; font-size: 1.1em;">${data.intro.text}</div>
        ${imageHtml}
      </div>
    `;
  }

  function renderForsamlingshusPage(content) {
    // Hero section
    if (content.hero) {
      const heroTitle = document.querySelector(".hero-section h1");
      const heroBtn = document.querySelector(".hero-section .btn");
      if (heroTitle) heroTitle.textContent = content.hero.title;
      if (heroBtn) heroBtn.textContent = content.hero.buttonText;
    }

    // Calendar section
    if (content.calendar) {
      const calendarTitle = document.querySelector(
        ".calendar-section .section-title",
      );
      if (calendarTitle) calendarTitle.textContent = content.calendar.title;
    }

    // About section
    if (content.about) {
      renderAboutSection(content.about);
    }

    // Prices section
    if (content.prices) {
      renderPricesSection(content.prices);
    }

    // Contact section
    if (content.contact) {
      renderContactSection(content.contact);
    }
  }

  function renderAboutSection(about) {
    const aboutTitle = document.querySelector(".about-section .section-title");
    const aboutColumn = document.querySelector(".about-section .column");

    if (aboutTitle) aboutTitle.textContent = about.title;
    if (!aboutColumn) return;

    let html = "";

    // Paragraphs
    about.paragraphs.forEach((text, index) => {
      const tag = index === 1 ? "strong" : "";
      html += tag ? `<p><strong>${text}</strong></p>` : `<p>${text}</p>`;
    });

    // Facilities
    if (about.facilities) {
      html += `<p><strong>${about.facilities.title}</strong></p><ul>`;
      about.facilities.items.forEach((item) => {
        html += `<li>${item}</li>`;
      });
      html += "</ul>";
    }

    // Capacity
    if (about.capacity) {
      html += `<h2>${about.capacity.title}</h2>`;
      html += `<p><strong>${about.capacity.text}</strong></p>`;
    }

    aboutColumn.innerHTML = html;
  }

  function renderPricesSection(prices) {
    const pricesTitle = document.querySelector(".info-section .section-title");
    if (pricesTitle) pricesTitle.textContent = prices.title;

    const columns = document.querySelectorAll(".info-section .column");

    // Prices column
    if (columns[0] && prices.pricesSection) {
      let html = `<h2>${prices.pricesSection.title}</h2>`;
      html += `<p><em>${prices.pricesSection.note}</em></p><ul>`;
      prices.pricesSection.items.forEach((item) => {
        html += `<li>${item}</li>`;
      });
      html += "</ul>";
      columns[0].innerHTML = html;
    }

    // Rules column
    if (columns[1] && prices.rulesSection) {
      let html = `<h2>${prices.rulesSection.title}</h2><ul>`;
      prices.rulesSection.items.forEach((item) => {
        html += `<li>${item}</li>`;
      });
      html += "</ul>";
      columns[1].innerHTML = html;
    }
  }

  function renderContactSection(contact) {
    const contactTitle = document.querySelector(
      ".contact-section .section-title",
    );
    if (contactTitle) contactTitle.textContent = contact.title;

    const formColumn = document.querySelector(
      ".contact-section .column:first-child",
    );
    if (formColumn && contact.formIntro) {
      const intro = formColumn.querySelector("p");
      if (intro) intro.textContent = contact.formIntro;
    }

    const infoColumn = document.querySelector(
      ".contact-section .column:last-child",
    );
    if (infoColumn && contact.contactInfo) {
      let html = `<h2>${contact.contactInfo.title}</h2>`;
      contact.contactInfo.items.forEach((item) => {
        html += `<p><strong>${item.label}:</strong><br>${item.value}</p>`;
      });
      infoColumn.innerHTML = html;
    }
  }

  function renderGenericPage(main, content) {
    let html = `<h1>${content.title}</h1>`;

    if (content.intro) {
      html += `<p class="intro">${content.intro}</p>`;
    }

    if (content.sections) {
      content.sections.forEach((section) => {
        html += `<section>`;
        if (section.title) {
          html += `<h2>${section.title}</h2>`;
        }
        if (section.content) {
          html += `<p>${section.content}</p>`;
        }
        if (section.items) {
          html += "<ul>";
          section.items.forEach((item) => {
            html += `<li>${item}</li>`;
          });
          html += "</ul>";
        }
        html += `</section>`;
      });
    }

    main.innerHTML = html;
  }
})();
