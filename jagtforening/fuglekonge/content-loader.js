// Loader for Jagtforening Fuglekonge page
fetch("content.json")
  .then((r) => r.json())
  .then((data) => {
    const main = document.querySelector("main");
    if (!main) return;

    let html = `<h1>${data.title}</h1>`;

    // Create flex container with text on left and image on right
    html += `<div style="display: flex; gap: 32px; align-items: flex-start; margin-bottom: 32px; flex-wrap: wrap;">`;
    html += `<p style="flex: 1; min-width: 300px; font-size: 1.1em; line-height: 1.6;">${data.intro}</p>`;

    if (data.image) {
      html += `<img src="${data.image}" alt="${data.imageAlt || ""}" style="max-width: 300px; width: 100%; height: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">`;
    }

    html += `</div>`;

    if (data.fuglekonger && data.fuglekonger.length) {
      html += `<h2>Fuglekonger gennem tiderne:</h2>`;
      html += `<div style="columns: 3; gap: 32px; margin-top: 16px;">`;
      data.fuglekonger.forEach((item) => {
        html += `<div style="margin-bottom: 8px; break-inside: avoid;"><strong>${item.year}</strong> ${item.name}</div>`;
      });
      html += `</div>`;
    }

    main.innerHTML = html;
  });
