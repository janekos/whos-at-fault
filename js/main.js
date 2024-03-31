'use strict';
// form
const nameInputEl = document.querySelector('input[name="name"]');
const colorInputEl = document.getElementById('color');;

// header
const headerWords = document.querySelectorAll('.header-word');

const colors = [
  'rgb(253,45,133)',
  'rgb(34,193,195)',
  'rgb(253,187,45)',
  'rgb(34,195,64)',
  'rgb(195,34,34)',
  'rgb(34,94,195)',
  'rgb(253,133,45)',
  'rgb(24, 138, 43)',
];

// function loadColorsSelect() {
//   let isFirst = true;

//   colors.forEach(color => {
//     if(isFirst) {
//       colorInputEl.value = color;
//       colorInputEl.style.backgroundColor = color;
//       isFirst = false;
//     }

//     const optionEl = document.createElement('option');
//     optionEl.value = color;
//     optionEl.style.backgroundColor = color;
//     colorInputEl.appendChild(optionEl);
//   });
// }

// function handleSelectChange(event) {
//   colorInputEl.value = event.target.value;
//   colorInputEl.style.backgroundColor = event.target.value;
// }

const maxNameLength = 12;
let name = '';
function handleNameChange(event) {
  event.preventDefault();
  if (event.target.value.length > maxNameLength) {
    event.target.value = event.target.value.slice(0, maxNameLength);
    return;
  }

  name = event.target.value;
}

let lastAddedColorIndex = 0;
function handleSectorAdd(event, isInit = false) {
  if (wheel.getIsSpinning())
    return;

  const color = colors[lastAddedColorIndex] // colorInputEl.value;
  lastAddedColorIndex = (lastAddedColorIndex + 1) % colors.length;

  if(!name) {
    alert('Name is required');
    return;
  }

  if (name.length > maxNameLength)
    name = name.slice(0, maxNameLength);
  
  wheel.addSector({ color, label: name });
  floaters.addFloater(name);
  
  if (!isInit) {
    storage.set(
      storage.keys.WHEEL_SECTORS,
      [...(storage.get(storage.keys.WHEEL_SECTORS) || []), name]);
      
    modal.toggle(event, null, false);
  }

  // colorInputEl.value = colors[0];
  // colorInputEl.style.backgroundColor = colors[0];
  nameInputEl.value = '';
  name = '';
}

function handleSectorRemove(event) {
  if (wheel.getIsSpinning())
    return;

  event.preventDefault();
  wheel.removeSector();

  const sectors = storage.get(storage.keys.WHEEL_SECTORS) || [];
  sectors.pop();
  storage.set(storage.keys.WHEEL_SECTORS, sectors);

  floaters.removeFloater();
}

function handleReset(event) {
  if (wheel.getIsSpinning())
    return;

  event.preventDefault();
  lastAddedColorIndex = 0;
  const sectors = storage.get(storage.keys.WHEEL_SECTORS) || [];
  for (let i = 0; i < sectors.length; i++)
    handleSectorRemove(event); 
}

function handleLocaleClick(event) {
  event.preventDefault();

  if (!event.target.dataset.value)
    return;

  i18n.setLang(event.target.dataset.value);
}

function initSectors(sectors) {
  for(let i = 0; i < sectors.length; i++) {
    if (!sectors[i]) continue;

    name = sectors[i];
    handleSectorAdd(null, true);
  }
}

window.onload = function() {
  const sectors = storage.get(storage.keys.WHEEL_SECTORS) || [];

  // loadColorsSelect();
  i18n.init();
  floaters.init();
  modal.init();
  wheel.init();

  initSectors(sectors);
};