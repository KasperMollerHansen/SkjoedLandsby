// Loader for Jagtforening Arrangementer page
fetch("content.json")
  .then((r) => r.json())
  .then((data) => {
    const main = document.querySelector("main");
    if (!main || !data.intro) return;

    let html = `<h1>${data.intro.title}</h1>`;
    html += `<p style="font-size: 1.1em; margin-bottom: 16px;">${data.intro.text}</p>`;

    if (Array.isArray(data.intro.items)) {
      html += '<ul style="font-size: 1.1em; line-height: 1.8;">';
      data.intro.items.forEach((item) => {
        html += `<li>${item}</li>`;
      });
      html += "</ul>";
    }

    main.innerHTML = html;
  });
