


document.addEventListener("DOMContentLoaded", () => {
  // Load navbar
  fetch("navbar.html")
    .then(res => res.text())
    .then(data => {
      const nav = document.getElementById("navbar-container");
      if (nav) nav.innerHTML = data;
    });


  // Load footer
  fetch("footer.html")
    .then(res => res.text())
    .then(data => {
      const footer = document.getElementById("footer-container");
      if (footer) footer.innerHTML = data;
    });
});
