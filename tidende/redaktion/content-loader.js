// Loader for Skjød Tidende Redaktion page
fetch("content.json")
  .then((r) => r.json())
  .then((data) => {
    const main = document.querySelector("main");
    if (!main || !data.text) return;
    let html = `<h1>${data.title || "Redaktion"}</h1>`;
    if (Array.isArray(data.text)) {
      data.text.forEach((section) => {
        html += `<p>${section}</p>`;
      });
    }
    if (data.mail) {
      html += `<p style=\"background:#f6f8fc;padding:10px 16px;border-radius:8px;margin:18px 0 10px 0;\"><b>Mail til redaktionen:</b> <a href=\"mailto:${data.mail}\">${data.mail}</a></p>`;
    }
    if (data.deadline) {
      html += `<p><b>Deadline til Skjød Tidende:</b> ${data.deadline}`;
      if (data.deadline_note) {
        html += `<br><small>(${data.deadline_note})</small>`;
      }
      html += `</p>`;
    }
    // Render members if present
    if (Array.isArray(data.members) && data.members.length) {
      html += `<h2>Redaktionen</h2><ul style=\"columns:2;max-width:400px;gap:24px;list-style:square inside;\">`;
      data.members.forEach((name) => {
        html += `<li>${name}</li>`;
      });
      html += `</ul>`;
    }
    if (data.footer) {
      html += `<p style=\"margin-top:24px;\">${data.footer}</p>`;
    }
    main.innerHTML = html;
  });
