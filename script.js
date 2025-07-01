


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


  
  

    const select = document.getElementById('item-select');
    const img = document.querySelector('#item-image img');
    const info = document.getElementById('item-info');

    let items = {};

    function populateSelect() {
      select.innerHTML = '';
      for (const key in items) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = items[key].name;
        select.appendChild(option);
      }
    }

    function updateItemDisplay(key) {
      const item = items[key];
      if (!item) return;

      img.src = item.image;
      img.alt = item.name + " image";

      info.innerHTML = `
        <h2>${item.name}</h2>
        <p><strong>Description:</strong> ${item.description}</p>
        <p><strong>Required Materials:</strong> ${item.materials}</p>
        <p><strong>Crafting Station:</strong> ${item.crafting_station}</p>
        <p><strong>Attack Power:</strong> ${item.attack}</p>
        <p><strong>Durability:</strong> ${item.durability}</p>
      `;
    }
    
fetch('items.json')
  .then(response => response.json())
  .then(data => {
    items = data;
    populateSelect();
    updateItemDisplay(select.value);

    select.addEventListener('change', e => {
      updateItemDisplay(e.target.value);
    });
  })
  .catch(error => {
    console.error('Error loading items:', error);
  });


    // Setup
    populateSelect();
    updateItemDisplay(select.value);

    select.addEventListener('change', e => {
      updateItemDisplay(e.target.value);
    });

