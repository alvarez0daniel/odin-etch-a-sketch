// initialize header menu
function initMobileMenu(menuElem, openElem, closeElem) {
  openElem.addEventListener('click', () => {
    menuElem.classList.toggle('hidden');
    openElem.classList.toggle('hidden');
    closeElem.classList.toggle('hidden');
  });

  closeElem.addEventListener('click', () => {
    menuElem.classList.toggle('hidden');
    closeElem.classList.toggle('hidden');
    openElem.classList.toggle('hidden');
  });
}

function initGrid(size) {
  const generatedGrid = document.createElement('div');
  generatedGrid.style.display = 'grid';
  generatedGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  generatedGrid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  return generatedGrid;
}

function initCell(x, y, mouseDown) {
  const cell = document.createElement('span');
  cell.setAttribute('data-x', x);
  cell.setAttribute('data-y', y);

  cell.addEventListener('mouseover', () => {
    if (mouseDown === false) {
      console.log('mouseDown', mouseDown);
    }
    else cell.style.backgroundColor = '#000000';
  });
  return cell;
}

function fillGrid(elem, size) {
  const filledGrid = elem;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const cell = initCell(j, i);
      filledGrid.appendChild(cell);
    }
  }
  return filledGrid;
}

function generateGrid(size) {
  let grid = initGrid(size);
  grid = fillGrid(grid, size);
  console.log('gen new grid');

  return grid;
}

function initGridSizeSelector(decrease, increase, progress, display,gridContainer, grid) {
  const MIN = 16;
  const MAX = 128;
  decrease.addEventListener('click', () => {
    if (progress.value === MIN) return;
    grid.remove();

    progress.value -= 16;
    gridSize = progress.value;
    display.textContent = `${gridSize}x${gridSize}`;
    
    grid = generateGrid(gridSize);
    gridContainer.appendChild(grid);

  });
  increase.addEventListener('click', () => {
    if (progress.value === MAX) return;
    grid.remove();

    progress.value += 16;
    gridSize = progress.value;
    display.textContent = `${gridSize}x${gridSize}`;

    grid = generateGrid(gridSize);
    gridContainer.appendChild(grid);
  });
}

// mobile menu elements
const open = document.querySelector('[data-mobile="open"]');
const close = document.querySelector('[data-mobile="close"]');
const menu = document.querySelector('[data-mobile="menu"]');

// grid elements
const gridContainer = document.querySelector('[data-UI="grid-container"]');
let grid = generateGrid(16);
gridContainer.appendChild(grid);

// setting elements
const gridSizeDecrease = document.querySelector('[data-arrow="left"]');
const gridSizeIncrease = document.querySelector('[data-arrow="right"]');
const gridSizeProgress = document.querySelector('[data-UI="progress"]');
const gridSizeDisplay = document.querySelector('[data-UI="gridSizeDisplay"]');
console.log(gridSizeProgress);
initGridSizeSelector(gridSizeDecrease, gridSizeIncrease, gridSizeProgress, gridSizeDisplay, gridContainer, grid);



// settings elements and utility values
let mouseIsDown = false;
let gridSize = '16';



initMobileMenu(menu, open, close);