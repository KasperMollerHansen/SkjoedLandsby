// Load and render content from content.json
document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("content.json");
    const content = await response.json();

    // Hero section
    document.querySelector(".hero-section h1").textContent = content.hero.title;
    document.querySelector(".hero-section .btn").textContent =
      content.hero.buttonText;

    // Calendar section
    document.querySelector(".calendar-section .section-title").textContent =
      content.calendar.title;

    // About section
    document.querySelector(".about-section .section-title").textContent =
      content.about.title;

    const aboutColumn = document.querySelector(".about-section .column");
    let aboutHTML = "";

    // Add paragraphs
    content.about.paragraphs.forEach((text, index) => {
      const tag = index === 1 ? "strong" : "";
      aboutHTML += tag ? `<p><strong>${text}</strong></p>` : `<p>${text}</p>`;
    });

    // Add facilities
    aboutHTML += `<p><strong>${content.about.facilities.title}</strong></p><ul>`;
    content.about.facilities.items.forEach((item) => {
      aboutHTML += `<li>${item}</li>`;
    });
    aboutHTML += "</ul>";

    // Add capacity
    aboutHTML += `<h2>${content.about.capacity.title}</h2>`;
    aboutHTML += `<p><strong>${content.about.capacity.text}</strong></p>`;

    aboutColumn.innerHTML = aboutHTML;

    // Prices section
    document.querySelector(".info-section .section-title").textContent =
      content.prices.title;

    const pricesColumn = document.querySelectorAll(".info-section .column")[0];
    let pricesHTML = `<h2>${content.prices.pricesSection.title}</h2>`;
    pricesHTML += `<p><em>${content.prices.pricesSection.note}</em></p><ul>`;
    content.prices.pricesSection.items.forEach((item) => {
      pricesHTML += `<li>${item}</li>`;
    });
    pricesHTML += `</ul>`;
    pricesHTML += `<p><em>${content.prices.pricesSection.priceNote}</em></p>`;
    pricesHTML += `<p><strong>Bemærk:</strong> <em>${content.prices.pricesSection.disclaimer}</em></p>`;
    pricesColumn.innerHTML = pricesHTML;

    const rightColumn = document.querySelectorAll(".info-section .column")[1];
    let rightHTML = `<h2>${content.prices.payment.title}</h2>`;
    content.prices.payment.text.forEach((text) => {
      rightHTML += `<p>${text}</p>`;
    });
    rightHTML += `<h2>${content.prices.cancellation.title}</h2>`;
    rightHTML += `<p>${content.prices.cancellation.intro}</p><ul>`;
    content.prices.cancellation.items.forEach((item) => {
      rightHTML += `<li>${item}</li>`;
    });
    rightHTML += `</ul>`;
    rightHTML += `<h2>${content.prices.youth.title}</h2>`;
    rightHTML += `<p>${content.prices.youth.text}</p>`;
    rightColumn.innerHTML = rightHTML;

    // Contact section
    document.querySelector(".contact-section .section-title").textContent =
      content.contact.title;
    document.querySelector('label[for="name"]').innerHTML =
      content.contact.form.name + " " + content.contact.form.required;
    document.querySelector('label[for="email"]').innerHTML =
      content.contact.form.email + " " + content.contact.form.required;
    document.querySelector('label[for="phone"]').textContent =
      content.contact.form.phone;
    document.querySelector('label[for="date"]').textContent =
      content.contact.form.date;
    document.querySelector('label[for="guests"]').textContent =
      content.contact.form.guests;
    document.querySelector('label[for="message"]').innerHTML =
      content.contact.form.message + " " + content.contact.form.required;
    document.querySelector("#date").placeholder =
      content.contact.form.datePlaceholder;
    document.querySelector('button[type="submit"]').textContent =
      content.contact.form.submitButton;
  } catch (error) {
    console.error("Error loading content:", error);
  }
});
