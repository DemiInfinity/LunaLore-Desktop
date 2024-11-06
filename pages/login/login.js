document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form from submitting the default way

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Check if we're in development mode (e.g., local testing)
    const isDevMode = process.env.NODE_ENV === 'development';

    // TODO: Remove this hard-coded validation once backend API is implemented
    if (isDevMode && username === "dev" && password === "password") {
      localStorage.setItem("isLoggedIn", "true");

      // Simulate successful login by redirecting to the main dashboard
      window.location.href = "../../index.html";
      return;
    }

    try {
      // Send login data to backend
      const response = await fetch("https://your-backend-url.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.success) {
        // Assume the backend returns a token or success flag
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("authToken", data.token); // Store token if required

        // Redirect to the main dashboard
        window.location.href = "../../index.html";
      } else {
        alert(data.message || "Invalid username or password. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("There was an issue logging in. Please try again later.");
    }
  });
});
