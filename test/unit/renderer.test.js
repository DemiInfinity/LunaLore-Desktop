const { openAboutPopup, initializeEventListeners } = require('../../renderer');
const { JSDOM } = require('jsdom');
const { ipcRenderer } = require('electron');

jest.mock('electron', () => ({
  ipcRenderer: {
    on: jest.fn(),
    emit: jest.fn(),
  },
}));

describe('renderer module', () => {
  let window;
  let document;

  beforeEach(() => {
    // Set up a mock DOM environment for testing
    window = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
          <button id="toggleButton"></button>
          <div id="sidebar"></div>
          <img id="logoImage" src="" />
          <button id="versionLink"></button>
          <nav id="nav1"></nav>
          <nav id="nav2"></nav>
          <nav id="nav3"></nav>
          <nav id="nav4"></nav>
          <nav id="nav5"></nav>
          <nav id="nav6"></nav>
          <nav id="nav7"></nav>
        </body>
      </html>
    `).window;
    document = window.document;
    global.window = window;
    global.document = document;

    // Mock `window.open` and `window.alert` to prevent errors in `jsdom`
    global.window.open = jest.fn(() => ({
      document: {
        write: jest.fn(),
      },
    }));
    global.window.alert = jest.fn();

    // Initialize event listeners
    initializeEventListeners();
  });

  afterEach(() => {
    delete global.window;
    delete global.document;
  });

  describe('openAboutPopup', () => {
    it('should open a new window and write the correct content', () => {
      openAboutPopup();

      const popup = global.window.open.mock.results[0].value;
      expect(global.window.open).toHaveBeenCalledWith("", "About LunaLore", "width=400,height=300");
      expect(popup.document.write).toHaveBeenCalledWith("<html><head><title>About LunaLore</title></head><body>");
      expect(popup.document.write).toHaveBeenCalledWith("<h1>About LunaLore</h1>");
      expect(popup.document.write).toHaveBeenCalledWith("<p>LunaLore is a platform designed for VTubers to create and manage their character lore, interact with audiences, and build immersive storytelling experiences.</p>");
      expect(popup.document.write).toHaveBeenCalledWith("<p>Version: 0.0.1</p>");
      expect(popup.document.write).toHaveBeenCalledWith("</body></html>");
    });
  });

  describe('ipcRenderer event listeners', () => {
    it('should alert when an update is available', () => {
      ipcRenderer.on.mock.calls.find(call => call[0] === 'update_available')[1]();
      expect(global.window.alert).toHaveBeenCalledWith('A new update is available. It is now downloading...');
    });

    it('should alert when an update is downloaded', () => {
      ipcRenderer.on.mock.calls.find(call => call[0] === 'update_downloaded')[1]();
      expect(global.window.alert).toHaveBeenCalledWith('Update downloaded. The application will install the update on restart.');
    });
  });

  describe('initializeEventListeners', () => {
    it('should toggle sidebar and update elements correctly when toggleButton is clicked', () => {
      const toggleButton = document.getElementById('toggleButton');
      const sidebar = document.getElementById('sidebar');
      const logoImage = document.getElementById('logoImage');
      const versionLink = document.getElementById('versionLink');
      const navElements = Array.from(document.querySelectorAll('nav'));

      // Initial state: ensure sidebar is expanded
      sidebar.classList.remove('collapsed');
      toggleButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
      logoImage.src = "assets/img/LunaLorelogo.png";
      versionLink.textContent = "Version 0.0.1";
      navElements.forEach(nav => (nav.hidden = false));

      // Simulate collapsing the sidebar
      toggleButton.dispatchEvent(new window.Event('click'));

      expect(sidebar.classList.contains('collapsed')).toBe(true);
      expect(toggleButton.innerHTML).toContain('fa-bars');
      expect(logoImage.src).toContain('assets/img/LunaLoreWithoutText.png');
      expect(versionLink.textContent).toBe('V0.0.1');
      navElements.forEach(nav => expect(nav.hidden).toBe(true));

      // Simulate expanding the sidebar
      toggleButton.dispatchEvent(new window.Event('click'));

      expect(sidebar.classList.contains('collapsed')).toBe(false);
      expect(toggleButton.innerHTML).toContain('fa-chevron-left');
      expect(logoImage.src).toContain('assets/img/LunaLorelogo.png');
      expect(versionLink.textContent).toBe('Version 0.0.1');
      navElements.forEach(nav => expect(nav.hidden).toBe(false));
    });

    it('should log an error if toggleButton or sidebar is missing', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      // Remove toggleButton to simulate missing element
      document.getElementById("toggleButton").remove();
      initializeEventListeners();
      expect(consoleErrorSpy).toHaveBeenCalledWith("Toggle button not found!");

      // Remove sidebar to simulate missing element
      document.getElementById("sidebar").remove();
      initializeEventListeners();
      expect(consoleErrorSpy).toHaveBeenCalledWith("Sidebar not found!");

      consoleErrorSpy.mockRestore();
    });
  });
});
