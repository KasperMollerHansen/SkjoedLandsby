// Minimal loader: Only loads and displays the Google Drive link from content.json
document.addEventListener("DOMContentLoaded", function () {
  fetch("content.json")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("arkiv-link-container");
      if (container && data && data.googleDriveUrl) {
        const headline = data.headline || "Arkiv";
        const description = data.description || "";
        container.innerHTML = `
          <div style="margin: 24px 0 32px 0; padding: 18px 24px; background: #f6f8fc; border: 2px solid #b3c6e6; border-radius: 12px; max-width: 600px;">
            <b>${headline}</b><br>
            <a href="${data.googleDriveUrl}" target="_blank" rel="noopener" class="arkiv-drive-link" style="color:#3366cc;font-size:1.15em;font-weight:600;word-break:break-all;">Åbn Skjød Tidende Arkiv på Google Drev</a>
            <br><span style="font-size:0.98em;color:#444;">${description}</span>
          </div>
        `;
      }
    });
});
