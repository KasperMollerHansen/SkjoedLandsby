// Contact Form Handler and Flatpickr Initialization
document.addEventListener("DOMContentLoaded", function () {
  // Initialize Flatpickr date picker
  flatpickr("#date", {
    locale: "da",
    dateFormat: "d-m-Y",
    minDate: "today",
    firstDayOfWeek: 1, // Monday
    disableMobile: true,
    allowInput: true,
  });

  // Contact form handling
  const form = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      date: document.getElementById("date").value,
      guests: document.getElementById("guests").value,
      message: document.getElementById("message").value,
    };

    // Create email content
    const subject = "Booking forespørgsel fra " + formData.name;
    let body = "Navn: " + formData.name + "\n";
    body += "Email: " + formData.email + "\n";
    if (formData.phone) body += "Telefon: " + formData.phone + "\n";
    if (formData.date) body += "Ønsket dato: " + formData.date + "\n";
    if (formData.guests) body += "Antal gæster: " + formData.guests + "\n";
    body += "\nBesked:\n" + formData.message;

    // Copy to clipboard
    const clipboardMessage = body;

    navigator.clipboard
      .writeText(clipboardMessage)
      .then(function () {
        // Create mailto link
        const mailtoLink =
          "mailto:skjoedforsamlingshus@gmail.com?subject=" +
          encodeURIComponent(subject) +
          "&body=" +
          encodeURIComponent(body);

        // Open email client
        window.location.href = mailtoLink;

        // Show success message
        formMessage.style.display = "block";
        formMessage.style.backgroundColor = "#d4edda";
        formMessage.style.color = "#155724";
        formMessage.style.border = "1px solid #c3e6cb";
        formMessage.innerHTML =
          "✓ Beskeden er kopieret til clipboard!<br>Din email-klient åbner nu. Hvis felterne ikke er udfyldt, kan du indsætte (Ctrl+V / Cmd+V) den kopierede besked.";

        // Reset form after a delay
        setTimeout(function () {
          form.reset();
          formMessage.style.display = "none";
        }, 8000);
      })
      .catch(function (err) {
        // Fallback if clipboard fails
        const mailtoLink =
          "mailto:skjoedforsamlingshus@gmail.com?subject=" +
          encodeURIComponent(subject) +
          "&body=" +
          encodeURIComponent(body);

        window.location.href = mailtoLink;

        formMessage.style.display = "block";
        formMessage.style.backgroundColor = "#fff3cd";
        formMessage.style.color = "#856404";
        formMessage.style.border = "1px solid #ffeaa7";
        formMessage.textContent =
          "Din email-klient åbner nu. Kontroller venligst at alle felter er udfyldt.";

        setTimeout(function () {
          form.reset();
          formMessage.style.display = "none";
        }, 8000);
      });
  });
});
