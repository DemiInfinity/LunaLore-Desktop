document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logoutButton");

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      window.location.href = "pages/login/login.html";
    });
  }
});
