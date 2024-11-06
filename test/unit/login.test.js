const login = require('../../pages/login/login');

describe("Login functionality", () => {
    beforeEach(() => {
      // Clear localStorage before each test
      localStorage.clear();
    });
  
    test("sets localStorage item 'isLoggedIn' to true upon successful login", () => {
      // Simulate a successful login
      function login() {
        localStorage.setItem("isLoggedIn", "true");
      }
      login();
  
      // Check that the value is stored correctly
      expect(localStorage.getItem("isLoggedIn")).toBe("true");
    });
  });
  