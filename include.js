// include.js
document.addEventListener("DOMContentLoaded", function () {
  const includes = document.querySelectorAll("[data-include]");

  includes.forEach(el => {
    const file = el.getAttribute("data-include");
    fetch(file)
      .then(response => {
        if (!response.ok) throw new Error("Gagal memuat " + file);
        return response.text();
      })
      .then(data => {
        el.innerHTML = data;

        if (file.includes("navbar")) {
          const currentPath = window.location.pathname;
          const navLinks = el.querySelectorAll(".nav-link");

          navLinks.forEach(link => {
            if (link.getAttribute("href") === currentPath) {
              link.classList.add("active");
            }
          });
        }
      })
      .catch(error => console.error(error));
  });
});