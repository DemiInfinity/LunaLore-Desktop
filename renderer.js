const { ipcRenderer } = require('electron');

function openAboutPopup() {
  const popup = window.open("", "About LunaLore", "width=400,height=300");
  const content = `
    <html>
      <head><title>About LunaLore</title></head>
      <body>
        <h1>About LunaLore</h1>
        <p>LunaLore is a platform designed for VTubers to create and manage their character lore, interact with audiences, and build immersive storytelling experiences.</p>
        <p>Version: 0.0.1</p>
      </body>
    </html>
  `;
  popup.document.write(content);
}

// Lazy-load IPC events to avoid impacting initial load time
function lazyLoadIpcEvents() {
  if (!ipcRenderer.listenerCount('update_available')) {
    ipcRenderer.on('update_available', () => {
      alert('A new update is available. It is now downloading...');
    });

    ipcRenderer.on('update_downloaded', () => {
      alert('Update downloaded. The application will install the update on restart.');
    });
  }
}

// Optimized function to initialize event listeners
function initializeEventListeners() {
  // Lazy-load IPC events after DOMContentLoaded for improved performance
  lazyLoadIpcEvents();

  const toggleButton = document.getElementById("toggleButton");
  const sidebar = document.getElementById("sidebar");
  const logoImage = document.getElementById("logoImage");
  const versionLink = document.getElementById("versionLink");
  const navElements = Array.from(document.querySelectorAll("#nav1, #nav2, #nav3, #nav4, #nav5, #nav6, #nav7"));

  if (!toggleButton || !sidebar) {
    console.error(toggleButton ? "Sidebar not found!" : "Toggle button not found!");
    return;
  }

  // Deferred loading of logo images for faster initial rendering
  const smallLogo = "assets/img/LunaLoreWithoutText.png";
  const largeLogo = "assets/img/LunaLorelogo.png";

  // Handle version link click to open About popup
  versionLink?.addEventListener("click", (event) => {
    event.preventDefault();
    openAboutPopup();
  });

  // Sidebar toggle functionality
  toggleButton.addEventListener("click", () => {
    const isCollapsed = sidebar.classList.toggle("collapsed");
    toggleButton.innerHTML = isCollapsed ? '<i class="fas fa-bars"></i>' : '<i class="fas fa-chevron-left"></i>';
    toggleButton.style.textAlign = isCollapsed ? "center" : "right";
    logoImage.src = isCollapsed ? smallLogo : largeLogo;
    versionLink.textContent = isCollapsed ? "V0.0.1" : "Version 0.0.1";
    navElements.forEach(nav => (nav.hidden = isCollapsed));
  });
}

// Automatically initialize event listeners when DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeEventListeners();

  // Preload essential assets asynchronously after initial load
  const preloadImage = new Image();
  preloadImage.src = "assets/img/LunaLorelogo.png";  // Preload large logo for expanded state
});

// Export functions for testing
module.exports = {
  openAboutPopup,
  initializeEventListeners
};
