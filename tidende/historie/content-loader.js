// Loader for Skjød Tidende Historie page
fetch("content.json")
  .then((r) => r.json())
  .then((data) => {
    const main = document.querySelector("main");
    if (!main) return;
    let html = `<h1>${data.title || "Historie"}</h1>`;
    if (Array.isArray(data.text1)) {
      data.text1.forEach((paragraph) => {
        html += `<p>${paragraph.replace(/\n/g, "<br>")}</p>`;
      });
    }
    if (Array.isArray(data.project_points)) {
      html +=
        '<div style="margin: 24px 0 24px 0; border: 2px solid #b3c6e6; background: #f6f8fc; border-radius: 12px; padding: 18px 28px; box-shadow: 0 2px 12px rgba(102,126,234,0.07);">';
      html +=
        '<ul style="margin: 0 0 0 18px; font-weight: 500; font-size: 1.08em;">';
      data.project_points.forEach((point) => {
        html += `<li style=\"margin-bottom: 8px;\">${point}</li>`;
      });
      html += "</ul></div>";
    }
    if (Array.isArray(data.text2)) {
      data.text2.forEach((paragraph) => {
        html += `<p>${paragraph.replace(/\n/g, "<br>")}</p>`;
      });
    }
    main.innerHTML = `<div style="margin-right: 32px;">${html}</div>`;
  });
