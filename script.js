// Mobile menu
function initMobileMenu(burger, x, menu) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('hidden');
    x.classList.toggle('hidden');
    menu.classList.toggle('hidden');
  });

  x.addEventListener('click', () => {
    burger.classList.toggle('hidden');
    x.classList.toggle('hidden');
    menu.classList.toggle('hidden');
  });
}

// getting mobile UI components
const hamburger = document.querySelector('[data-mobile="hamburger"]');
const closeX = document.querySelector('[data-mobile="close"]');
const mobileMenu = document.querySelector('[data-mobile="menu"]');

// initialize mobile menu
initMobileMenu(hamburger, closeX, mobileMenu);

const colorPicker = document.querySelector('[data-UI="colorPicker"]');
const grid = document.querySelector('[data-UI="grid"]');

for (let i = 0; i < 64 * 64; i++){
  const cell = document.createElement('span');
  cell.addEventListener('mouseover', () => {
    cell.style.backgroundColor = colorPicker.value;
  });
  grid.appendChild(cell);
}







