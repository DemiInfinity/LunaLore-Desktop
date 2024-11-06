document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form from submitting the default way

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Basic validation (for demonstration purposes)
    if (username === "demo" && password === "password") {
      // Set a cookie to keep user logged in
      localStorage.setItem("isLoggedIn", "true");

      // Simulate successful login by redirecting to the main dashboard
      window.location.href = "../../index.html";
    } else {
      alert("Invalid username or password. Please try again.");
    }
  });
});
