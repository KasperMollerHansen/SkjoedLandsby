// Dynamically list all PDF files in year subfolders, newest year first
(async function () {
  const main = document.querySelector("main");
  if (!main) return;

  // Helper to fetch directory listing (assumes a static file server with directory listing disabled, so we need to know the structure)
  // We'll hardcode the years for now, but this can be generated server-side or by a build step for full automation
  const yearFolders = [];
  try {
    const res = await fetch("/tidende/arkiv/years.json");
    if (res.ok) {
      const years = await res.json();
      yearFolders.push(...years);
    }
  } catch {}
  if (!yearFolders.length) {
    // fallback: just 2013 for now
    yearFolders.push("2013");
  }

  let html = "<h2>Årgang</h2>";
  for (const year of yearFolders.sort((a, b) => b.localeCompare(a))) {
    html += `<h3>${year}</h3><ul id="pdf-list-${year}"></ul>`;
  }
  main.insertAdjacentHTML("beforeend", html);

  // For each year, fetch the list of PDFs
  for (const year of yearFolders) {
    try {
      const res = await fetch(`/tidende/arkiv/${year}/files.json`);
      if (res.ok) {
        const files = await res.json();
        const ul = document.getElementById(`pdf-list-${year}`);
        if (ul && files.length) {
          files.forEach((f) => {
            ul.innerHTML += `<li><a href="/tidende/arkiv/${year}/${f}" target="_blank">${f.replace(/[-_]/g, " ")}</a></li>`;
          });
        }
      }
    } catch {}
  }
})();
