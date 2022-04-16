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
// generate grid
function generateGrid(elem, gridSize) {
    elem.style.display = 'grid';
    elem.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    elem.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
}

// fill grid
function fillGrid(elem, gridSize) {
    
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const cell = document.createElement('span');
      cell.setAttribute('data-x',`${j}`);
      cell.setAttribute('data-y', `${i}`);
      console.log(cell, `, x = ${j}, y = ${i}`);
      elem.appendChild(cell, GRID_SIZE);
    }
  } 
}



// getting mobile UI components
const hamburger = document.querySelector('[data-mobile="hamburger"]');
const closeX = document.querySelector('[data-mobile="close"]');
const mobileMenu = document.querySelector('[data-mobile="menu"]');

// initialize mobile menu
initMobileMenu(hamburger, closeX, mobileMenu);

// UI functionality 
const progress = document.querySelector('[data-UI="progress"]');
const gridSizeDisplay = document.querySelector('[data-UI="gridSizeDisplay"]');
const leftArrow = document.querySelector('[data-arrow="left"]');
const rightArrow = document.querySelector('[data-arrow="right"]');

leftArrow.addEventListener('click', () => {
  if (progress.value == 16) return;
  progress.value -= 16;
  gridSizeDisplay.textContent = `${progress.value} x ${progress.value}`;
});

rightArrow.addEventListener('click', () => {
  if (progress.value == 128) return;
  progress.value += 16;
  gridSizeDisplay.textContent = `${progress.value} x ${progress.value}`;
});


const GRID_SIZE = progress.value;
const grid = document.querySelector('[data-UI="grid"]');
generateGrid(grid, GRID_SIZE);


fillGrid(grid, GRID_SIZE);







