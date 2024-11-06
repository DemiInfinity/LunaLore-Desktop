const { ipcRenderer } = require('electron');

describe("Sidebar and Navigation Integration", () => {
  let toggleButton, sidebar, loginButton, mainContent;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="loginPage">
        <button id="loginButton">Login</button>
      </div>
      <div id="sidebar" class="sidebar collapsed">
        <button id="toggleButton" class="toggle-button">☰</button>
        <nav class="nav-links">
          <a href="#welcome" id="homeLink">Home</a>
        </nav>
      </div>
      <div id="mainContent" class="main-content"></div>
    `;

    toggleButton = document.getElementById("toggleButton");
    sidebar = document.getElementById("sidebar");
    loginButton = document.getElementById("loginButton");
    mainContent = document.getElementById("mainContent");

    // Mock functions that would normally handle navigation and sidebar
    loginButton.addEventListener("click", () => {
      // Simulate logging in
      localStorage.setItem("isLoggedIn", "true");
      document.getElementById("loginPage").style.display = "none";
      sidebar.classList.remove("collapsed");
    });

    toggleButton.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed");
    });

    const homeLink = document.getElementById("homeLink");
    homeLink.addEventListener("click", (event) => {
      event.preventDefault();
      loadPage(event.target.getAttribute("href").replace("#", ""));
    });

    async function loadPage(page) {
      mainContent.innerHTML = `<h1>${page} Page Loaded</h1>`;
    }
  });

  test("Login button should reveal the sidebar", () => {
    expect(sidebar.classList.contains("collapsed")).toBe(true);
    
    // Simulate login button click
    loginButton.click();

    // Sidebar should now be revealed
    expect(sidebar.classList.contains("collapsed")).toBe(false);
  });

  test("Sidebar toggle button should collapse and expand the sidebar", () => {
    // Initially collapsed
    expect(sidebar.classList.contains("collapsed")).toBe(true);

    // Click the toggle button
    toggleButton.click();
    expect(sidebar.classList.contains("collapsed")).toBe(false);

    // Click again to collapse
    toggleButton.click();
    expect(sidebar.classList.contains("collapsed")).toBe(true);
  });

  test("Home link in sidebar should load 'welcome' page", () => {
    loginButton.click(); // Simulate successful login to reveal sidebar

    const homeLink = document.getElementById("homeLink");
    
    // Click the "Home" link
    homeLink.click();

    // Main content should display the 'welcome' page text
    expect(mainContent.innerHTML).toContain("welcome Page Loaded");
  });
});
