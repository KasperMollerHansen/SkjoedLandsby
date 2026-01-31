// Loader for Skjød Tidende front page intro
fetch("content.json")
  .then((r) => r.json())
  .then((data) => {
    const main = document.querySelector("main");
    if (!main || !data.intro) return;
    main.innerHTML = `
      <h1>Skjød Tidende</h1>
      <div style="display: flex; align-items: flex-start; gap: 32px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 220px; white-space: pre-line; font-size: 1.1em;">${data.intro.text}</div>
        <img src="${data.intro.image}" alt="${data.intro.imageAlt || ""}" style="max-width: 210px; width: 100%; height: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
      </div>
    `;
  });
