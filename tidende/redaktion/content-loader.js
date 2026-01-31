// Loader for Skjød Tidende Redaktion page
fetch("content.json")
  .then((r) => r.json())
  .then((data) => {
    const main = document.querySelector("main");
    if (!main || !data.text) return;
    main.innerHTML = `
      <h1>${data.title || "Redaktion"}</h1>
      <div style="white-space: pre-line; font-size: 1.1em;">${data.text}</div>
    `;
  });
