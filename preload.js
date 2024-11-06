window.addEventListener("DOMContentLoaded", () => {
  // Defer non-essential work until the browser is idle
  requestIdleCallback(() => {
    const versions = ["chrome", "node", "electron"];
    versions.forEach((type) => {
      const element = document.getElementById(`${type}-version`);
      if (element) element.innerText = process.versions[type];
    });
  });
});
