


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

    function updateItemDisplay(key) 
    {
      const item = items[key];
      if (!item) return;

    img.src = item.image || '';
    img.alt = item.name ? `${item.name} image` : 'Item image';

    let html = item.name ? `<h2>${item.name}</h2>` : '';

    
    if (item.crafting_station !== undefined && item.crafting_station !== null && item.crafting_station !== '') {
      html += `<p><strong>Crafting Station:</strong> ${item.crafting_station}</p>`;
    }
    
    if (item.quantity_crafted !== undefined && item.quantity_crafted !== null && item.quantity_crafted !== '') {
      html += `<p><strong>Crafted Quantity:</strong> ${item.quantity_crafted}</p>`;
    }
    

    if (item.crafting_materials && item.crafting_materials.length > 0) {
      html += `<p><strong>Required Materials:</strong></p><ul>`;
     
      item.crafting_materials.forEach(mat => {
      if (typeof mat === 'string') {
        html += `<li>${mat}</li>`;
      } else if (typeof mat === 'object' && mat.material && mat.amount !== undefined) {
        html += `<li>${mat.amount} ${mat.material}</li>`;
      }
      });

    html += `</ul>`;
    }

    if (item.price !== undefined && item.price !== null && item.price !== '') {
      html += `<p><strong>Price:</strong> ${item.price}</p>`;
    }   

    if (item.blueprint_price !== undefined && item.blueprint_price !== null && item.blueprint_price !== '') {
      html += `<p><strong>Blueprint Price:</strong> ${item.blueprint_price}</p>`;
    } 
    
    if (item.crafting_materials_blueprint && item.crafting_materials_blueprint.length > 0) {
      html += `<p><strong>Required Blueprint Materials:</strong></p><ul>`;
     
      item.crafting_materials_blueprint.forEach(mat => {
      if (typeof mat === 'string') {
        html += `<li>${mat}</li>`;
      } else if (typeof mat === 'object' && mat.material && mat.amount !== undefined) {
        html += `<li>${mat.amount} ${mat.material}</li>`;
      }
      });

    html += `</ul>`;
    }

    if (item.sell !== undefined && item.sell !== null && item.sell !== '') {
      html += `<p><strong>Sell Price:</strong> ${item.sell}</p>`;
    } 


    if (item.description !== undefined && item.description !== null && item.description !== '') {
      html += `<p><strong>Description:</strong> ${item.description}</p>`;
    } 
      
      info.innerHTML = html;
    }
    

function getDataFileFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('data') || 'items.json';  // default fallback
}

const jsonFile = getDataFileFromURL();





fetch(jsonFile)
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

