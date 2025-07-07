






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

const stationSelect = document.getElementById('station-select');



const itemSelect = document.getElementById('item-select');
const select = document.getElementById('item-select');
const img = document.querySelector('#item-image img');
const info = document.getElementById('item-info');

const nameInput = document.getElementById('name-input');


let filteredItems = {}; // filtered based on station
let items = {};
let enableStationFilter = false;

// Check if we should enable station filtering
function detectStationSupport() {
  return Object.values(items).some(item => 'crafting_station' in item);
}

function populateStations() 
{
  const stationSet = new Set();

  Object.values(items).forEach(item => {
    if (item.crafting_station) {
      stationSet.add(item.crafting_station);
    }
  });

  // Add options to station select
  stationSet.forEach(station => {
    const option = document.createElement('option');
    option.value = station;
    option.textContent = station;
    stationSelect.appendChild(option);
  });
}






// Populate item dropdown based on current filter
function populateItems() {
  itemSelect.innerHTML = '';

  Object.entries(nameFilteredItems).forEach(([key, item]) => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = item.name || key;
    itemSelect.appendChild(option);
  });
  // If any items remain, show the first one
  if (itemSelect.value) {
    updateItemDisplay(itemSelect.value);
  } else {
    info.innerHTML = '<p>No items found for this station.</p>';
    img.src = '';
    img.alt = '';
  }
}

function populateStationsFromItems(sourceItems) {
  const currentSelection = stationSelect.value;
  const stationSet = new Set();

  Object.values(sourceItems).forEach(item => {
    if (item.crafting_station) stationSet.add(item.crafting_station);
  });

  stationSelect.innerHTML = '<option value="all">All Stations</option>';

  stationSet.forEach(station => {
    const option = document.createElement('option');
    option.value = station;
    option.textContent = station;
    stationSelect.appendChild(option);
  });

  // Try to preserve previous selection if still valid
  if (stationSet.has(currentSelection)) {
    stationSelect.value = currentSelection;
  } else {
    stationSelect.value = 'all';
  }
}



function filterItemsByName(nameSubstring) {
  const lower = nameSubstring.toLowerCase();
  
  
  // Step 1: Name filtering (from original full list, not filteredItems)
  const nameMatchedItems = Object.fromEntries(
    Object.entries(items).filter(([_, item]) =>
      item.name?.toLowerCase().includes(lower)
    )
  );

  // Step 2: Update stations dropdown based on name-matched items
  if (enableStationFilter) {
    populateStationsFromItems(nameMatchedItems);
  }

  // Step 3: Now apply station filtering (based on current selection)
  const selectedStation = stationSelect.value;
  filteredItems = (selectedStation === 'all')
    ? nameMatchedItems
    : Object.fromEntries(
        Object.entries(nameMatchedItems).filter(([_, item]) =>
          item.crafting_station === selectedStation
        )
      );

  nameFilteredItems = filteredItems; // final filtered list


  // Step 4: repopulate the items dropdown
  populateItems();
}


function filterItemsByStation(station) {
  if (station === 'all') {
    filteredItems = items;
  } else {
    filteredItems = Object.fromEntries(
      Object.entries(items).filter(
        ([_, item]) => item.crafting_station === station
      )
    );
  }

  filterItemsByName(nameInput.value); // always call this
}

stationSelect.addEventListener('change', e => {
  filterItemsByStation(e.target.value);
});

// Existing item select handler
itemSelect.addEventListener('change', e => {
  updateItemDisplay(e.target.value);
});


//stationSelect.addEventListener('change', e => {
//  nameInput.value = '';
//  filterItemsByStation(e.target.value);
//});

nameInput.addEventListener('input', e => {
  filterItemsByName(e.target.value);
});

nameInput.addEventListener('input', e => {
//  stationSelect.value = 'all'; // reset station filter
  filterItemsByName(e.target.value);
});



function updateItemDisplay(key) 
{
const item = items[key];
  if (!item) return;
img.src = item.image || '';
img.alt = item.name ? `${item.name} image` : 'Item image';
let html = '<h3> ';
html += item.Finished ? '✅' : '❌';
html += '&nbsp'
html += item.name ? `${item.name}` : '';
html += '&nbsp 🛒(un): '

if (item.price !== undefined)
  html += `${item.price}`;
else
  html += `❌`;

html += ' / 💲: ';

if (item.sell !== undefined)
  html += `${item.sell}`;
else
  html += `❌`;

html += ' / 🧾: ';
if (item.blueprint_price !== undefined)
  html += `${item.blueprint_price}`;
else
  html += `❌`;


html+= '</h3>';


if(item.blueprint_how)
  html += `<p><strong>How to get blueprint:</strong> ${item.blueprint_how}</p>`;



if (item.crafting_station !== undefined && item.crafting_station !== null && item.crafting_station !== '') {
  html += `<p><strong>Crafting Station:</strong> ${item.crafting_station}</p>`;
}

if (item.quantity_crafted !== undefined && item.quantity_crafted !== null && item.quantity_crafted !== '') {
  html += `<p><strong>Quantity:</strong> ${item.quantity_crafted}</p>`;
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

if (item.description2 !== undefined && item.description2 !== null && item.description2 !== '') {
  html += `<p><strong>My Notes:</strong> ${item.description2}</p>`;
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
  .then(data => 
  {
    items = data;
    filteredItems = items;
    nameFilteredItems = items;

    enableStationFilter = detectStationSupport();
    

    if (enableStationFilter) 
    {
      populateStationsFromItems(items); // use new version
      stationSelect.addEventListener('change', e => 
      {
        filterItemsByStation(e.target.value);
      });
    } else 
    {
      document.getElementById('station-label').style.display = 'none';
      document.getElementById('station-select').style.display = 'none'; // hide the dropdown if unused
    }

    populateItems();
  
  })
  .catch(error => {
    console.error('Error loading items:', error);
  });

    // Setup
    /*
    populateSelect();
    updateItemDisplay(select.value);

    select.addEventListener('change', e => {
      updateItemDisplay(e.target.value);
    });
    */
