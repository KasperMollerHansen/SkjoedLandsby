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
        // Auto-inject section header and menu links
        injectSectionHeader();
        injectMenuLinks();
      }
    })
    .catch((err) => console.error("Failed to load menubar:", err));

  function injectSectionHeader() {
    const currentPath = window.location.pathname;
    const menubar = document.querySelector(".main-menubar");
    if (!menubar) return;

    let sectionTitle = "";
    let sectionLink = "";

    if (currentPath.includes("/tidende/")) {
      sectionTitle = "Skjød Tidende";
      sectionLink = "/tidende/index.html";
    } else if (currentPath.includes("/jagtforening/")) {
      sectionTitle = "Skjød Jagtforening";
      sectionLink = "/jagtforening/index.html";
    } else if (currentPath.includes("/sbif/")) {
      sectionTitle = "Skjød Borger og Idræts Forening";
      sectionLink = "/sbif/index.html";
    } else if (currentPath.includes("/forsamlingshus/")) {
      sectionTitle = "Forsamlingshus";
      sectionLink = "/forsamlingshus/index.html";
    }

    if (sectionTitle) {
      const header = document.createElement("div");
      header.className = "section-header";
      header.innerHTML = `<a href="${sectionLink}">${sectionTitle}</a>`;
      menubar.parentNode.insertBefore(header, menubar);
    }
  }

  function injectMenuLinks() {
    const currentPath = window.location.pathname;
    const ul = document.querySelector(".menubar-links");
    if (!ul) return;

    // Default menu (just home link)
    let menuHTML = '<li><a href="/index.html">Forside</a></li>';

    // Tidende section menu
    if (currentPath.includes("/tidende/")) {
      menuHTML = `
        <li><a href="/index.html">Forside</a></li>
        <li><a href="/tidende/historie/index.html">Historie</a></li>
        <li><a href="/tidende/redaktion/index.html">Redaktion</a></li>
        <li><a href="/tidende/arkiv/index.html">Arkiv</a></li>
      `;
    }

    // Jagtforening section menu
    if (currentPath.includes("/jagtforening/")) {
      menuHTML = `
        <li><a href="/index.html">Forside</a></li>
        <li><a href="/jagtforening/historie/index.html">Historie</a></li>
        <li><a href="/jagtforening/arrangementer/index.html">Arrangementer</a></li>
        <li><a href="/jagtforening/fuglekonge/index.html">Årets Fuglekonge</a></li>
      `;
    }

    // SBIF section menu
    if (currentPath.includes("/sbif/")) {
      menuHTML = `
        <li><a href="/index.html">Forside</a></li>
        <li><a href="/sbif/historie/index.html">Historie</a></li>
        <li><a href="/sbif/bestyrelse/index.html">Bestyrelse</a></li>
        <li><a href="/sbif/vedtaegter/index.html">Vedtægter</a></li>
        <li><a href="/sbif/arrangementer/index.html">Arrangementer</a></li>
      `;
    }

    ul.innerHTML = menuHTML;
  }

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
      if (content.fuglekonger) {
        // Fuglekonge page - skip, let local loader handle it
        return;
      } else if (content.intro) {
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

    let contentHtml = "";
    let itemsHtml = "";

    // Handle members array (bestyrelse style)
    if (Array.isArray(data.intro.members)) {
      const defaultImage = "/sbif/bestyrelse/images/default.jpg";
      const memberCount = data.intro.members.length;
      const hasOddMember = memberCount % 2 !== 0;

      contentHtml =
        '<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-top: 24px;">';

      data.intro.members.forEach((member, index) => {
        const memberImage = member.image || defaultImage;
        const isLastOdd = hasOddMember && index === memberCount - 1;
        const gridColumnStyle = isLastOdd
          ? "grid-column: 1 / -1; max-width: 600px; margin: 0 auto; width: 100%;"
          : "";

        contentHtml += `
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; display: flex; gap: 20px; align-items: center; flex-wrap: wrap; ${gridColumnStyle}">
            <img src="${memberImage}" alt="${member.name}" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <div style="flex: 1; min-width: 200px;">
              <h3 style="margin: 0 0 8px 0; color: #667eea; font-size: 1.1em;">${member.role}</h3>
              <p style="margin: 4px 0; font-weight: 500; font-size: 1.05em;">${member.name}</p>
              ${member.phone ? `<p style="margin: 4px 0;">Tlf: ${member.phone}</p>` : ""}
              ${member.email ? `<p style="margin: 4px 0;">Mail: <a href="mailto:${member.email}" style="color: #667eea;">${member.email}</a></p>` : ""}
            </div>
          </div>
        `;
      });
      contentHtml += "</div>";

      main.innerHTML = `<h1>${data.intro.title || ""}</h1>${contentHtml}`;
      return;
    }

    // Handle paragraphs array (jagtforening style)
    if (Array.isArray(data.intro.paragraphs)) {
      data.intro.paragraphs.forEach((paragraph) => {
        contentHtml += `<p style="white-space: pre-line; font-size: 1.1em; line-height: 1.6; margin-bottom: 16px;">${paragraph}</p>`;
      });
    }
    // Handle text string (tidende style)
    else if (data.intro.text) {
      contentHtml = `<div style="flex: 1; min-width: 220px; white-space: pre-line; font-size: 1.1em;">${data.intro.text}</div>`;
    }

    // Handle items list (arrangementer style) - separate from flex container
    if (Array.isArray(data.intro.items)) {
      itemsHtml =
        '<ul style="font-size: 1.1em; line-height: 1.8; margin-top: 16px;">';
      data.intro.items.forEach((item) => {
        itemsHtml += `<li>${item}</li>`;
      });
      itemsHtml += "</ul>";
    }

    // Handle PDF link (vedtægter style)
    let pdfHtml = "";
    if (data.intro.pdf) {
      pdfHtml = `
        <div style="margin-top: 24px;">
          <a href="${data.intro.pdf}" target="_blank" style="display: inline-block; background: #667eea; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500; box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3); transition: all 0.2s;">
            📄 Åbn Vedtægter (PDF)
          </a>
        </div>
      `;
    }

    main.innerHTML = `
      <h1>${data.intro.title || "Skjød Tidende"}</h1>
      <div style="display: flex; align-items: flex-start; gap: 32px; flex-wrap: wrap;">
        ${contentHtml}
        ${imageHtml}
      </div>
      ${itemsHtml}
      ${pdfHtml}
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
