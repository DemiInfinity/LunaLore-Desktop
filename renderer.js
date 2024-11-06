function openAboutPopup() {
  const popup = window.open("", "About LunaLore", "width=400,height=300");
  popup.document.write(
    "<html><head><title>About LunaLore</title></head><body>"
  );
  popup.document.write("<h1>About LunaLore</h1>");
  popup.document.write(
    "<p>LunaLore is a platform designed for VTubers to create and manage their character lore, interact with audiences, and build immersive storytelling experiences.</p>"
  );
  popup.document.write("<p>Version: 0.0.1</p>");
  popup.document.write("</body></html>");
}

document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggleButton");
  const sidebar = document.getElementById("sidebar");
  const logoImage = document.getElementById("logoImage");
  const versionLink = document.getElementById("versionLink");
  const nav1 = document.getElementById("nav1");
  const nav2 = document.getElementById("nav2");
  const nav3 = document.getElementById("nav3");
  const nav4 = document.getElementById("nav4");
  const nav5 = document.getElementById("nav5");
  const nav6 = document.getElementById("nav6");
  const nav7 = document.getElementById("nav7");

  if (!toggleButton) {
    console.error("Toggle button not found!");
  }

  if (!sidebar) {
    console.error("Sidebar not found!");
  }

  if (versionLink) {
    versionLink.addEventListener("click", (event) => {
      event.preventDefault();
      openAboutPopup();
    });
  }

  toggleButton.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");

    // Update the logo size for visual effect
    if (sidebar.classList.contains("collapsed")) {
      toggleButton.innerHTML = '<i class="fas fa-bars"></i>'; // Hamburger icon when collapsed
      toggleButton.style.textAlign = "center";
      logoImage.src = "icons/LunaLoreWithoutText.png"; // Change to smaller logo if needed
      versionLink.textContent = "V0.0.1";

      nav1.hidden = true;
      nav2.hidden = true;
      nav3.hidden = true;
      nav4.hidden = true;
      nav5.hidden = true;
      nav6.hidden = true;
      nav7.hidden = true;
    } else {
      toggleButton.innerHTML = '<i class="fas fa-chevron-left"></i>'; // Arrow icon when expanded
      toggleButton.style.textAlign = "right";
      logoImage.src = "icons/LunaLorelogo.png"; // Change back to larger logo if needed
      versionLink.textContent = "Version 0.0.1";
      
      nav1.hidden = false;
      nav2.hidden = false;
      nav3.hidden = false;
      nav4.hidden = false;
      nav5.hidden = false;
      nav6.hidden = false;
      nav7.hidden = false;
    }
  });
});
