// Loader for Jagtforening Historie page
fetch("content.json")
  .then((r) => r.json())
  .then((data) => {
    const main = document.querySelector("main");
    if (!main || !data.intro) return;

    let html = `<h1>${data.intro.title}</h1>`;

    if (Array.isArray(data.intro.paragraphs)) {
      data.intro.paragraphs.forEach((paragraph) => {
        html += `<p style="white-space: pre-line; font-size: 1.1em; line-height: 1.6; margin-bottom: 16px;">${paragraph}</p>`;
      });
    }

    main.innerHTML = html;
  });
