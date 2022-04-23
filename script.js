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

function getColor(colorElem) {
  console.log(colorElem.value);
  return colorElem.value
}

function getRandomColor() {
  let color ='#';
  for (let i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 15).toString(16);
  }
  return color;
}

function paintCell(cellElem, mode, color){
  switch (mode) {
    case 'color':
      color = getColor(colorPicker);
      break;

    case 'rainbow':
      color = getRandomColor();
      console.log('rainbow');
      break;

    case 'eraser':
      color = 'transparent';
      break;

    default:
      break;
  }
  cellElem.style.backgroundColor = color;
}

function initCell(x, y, mouseDown) {
  const cell = document.createElement('span');
  cell.setAttribute('data-x', x);
  cell.setAttribute('data-y', y);

  cell.addEventListener('mouseover', () => {
    if (mouseDown === false) {
      console.log('mouseDown', mouseDown);
    }
    else paintCell(cell, currMode, currColor);
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

function clearGrid(gridElem, size) {
  gridElem.remove();
  
  return generateGrid(size);
}

function initGridSizeSelector(decrease, increase, progress, display,gridContainer, grid) {
  const MIN = 16;
  const MAX = 128;
  decrease.addEventListener('click', () => {
    if (progress.value === MIN) return;
    progress.value -= 16;
    gridSize = progress.value;
    display.textContent = `${gridSize}x${gridSize}`;
    
    grid = clearGrid(grid, gridSize);
    gridContainer.appendChild(grid);

  });
  increase.addEventListener('click', () => {
    if (progress.value === MAX) return;
    progress.value += 16;
    gridSize = progress.value;
    display.textContent = `${gridSize}x${gridSize}`;

    grid = clearGrid(grid, gridSize);
    gridContainer.appendChild(grid);
  });
}

function initColorPicker(colorPickerElem) {
  colorPickerElem.addEventListener('click', () => {
    currMode = 'color';
    colorMode.classList.add('btn-selected');
    rainbowMode.classList.remove('btn-selected');
    eraserMode.classList.remove('btn-selected');
  });
}

function initPaintMode(modeColor, modeRainbow, modeEraser, modeClear) {
  modeColor.addEventListener('click', () => {
    if (currMode === 'color') return;
    currMode = 'color';
    modeColor.classList.add('btn-selected');
    modeRainbow.classList.remove('btn-selected');
    modeEraser.classList.remove('btn-selected');
  });

  modeRainbow.addEventListener('click', () => {
    if (currMode === 'rainbow') return;
    currMode = 'rainbow';
    modeRainbow.classList.add('btn-selected');
    modeColor.classList.remove('btn-selected');
    modeEraser.classList.remove('btn-selected');
  });

  modeEraser.addEventListener('click', () => {
    if (currMode === 'eraser') return;
    currMode = 'eraser';
    modeEraser.classList.add('btn-selected');
    modeRainbow.classList.remove('btn-selected');
    modeColor.classList.remove('btn-selected');
  });

  modeClear.addEventListener('click', () => {
    grid = clearGrid(grid, gridSize);
    gridContainer.appendChild(grid);

    mode = 'color';
    modeColor.classList.add('btn-selected');
    modeRainbow.classList.remove('btn-selected');
    modeEraser.classList.remove('btn-selected');
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
const colorPicker = document.querySelector('[data-UI="colorPicker"]');
const gridSizeDecrease = document.querySelector('[data-arrow="left"]');
const gridSizeIncrease = document.querySelector('[data-arrow="right"]');
const gridSizeProgress = document.querySelector('[data-UI="progress"]');
const gridSizeDisplay = document.querySelector('[data-UI="gridSizeDisplay"]');
let gridSize = '16';
initGridSizeSelector(gridSizeDecrease, gridSizeIncrease, gridSizeProgress, gridSizeDisplay, gridContainer, grid);

const colorMode = document.querySelector('[data-mode="color"]');
const rainbowMode = document.querySelector('[data-mode="rainbow"]');
const eraserMode = document.querySelector('[data-mode="eraser"]');
const clearMode = document.querySelector('[data-mode="clear"]');
let currColor = '#000000';
let currMode = 'color';
initPaintMode(colorMode, rainbowMode, eraserMode, clearMode);
initColorPicker(colorPicker);



// settings elements and utility values
let mouseIsDown = false;




initMobileMenu(menu, open, close);