const GRID_SIZE = 9;
let currentSelectedId = -1;

const initHTML = () => {
    let grid = document.getElementById('grid');

    for(let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            let gridSquare = document.createElement('div');
            gridSquare.classList.add('gridSquare');
            if (x % Math.sqrt(GRID_SIZE) == 0 && x % GRID_SIZE != 0) {
                gridSquare.classList.add('thickLeftBorder');
            }
            if (y % Math.sqrt(GRID_SIZE) == 0 && y % GRID_SIZE != 0) {
                gridSquare.classList.add('thickTopBorder');
            }

            gridSquare.id = (y * GRID_SIZE) + x;
            gridSquare.onclick = () => handleSquareSelected(gridSquare.id);

            let valueTextTag = document.createElement('h2');
            gridSquare.appendChild(valueTextTag);

            grid.appendChild(gridSquare);
        }
    }
}

window.onload = initHTML;

const handleSquareSelected = (id) => {
    if (currentSelectedId == id) return;

    if (currentSelectedId != -1) {
        let prevSelected = document.getElementById(currentSelectedId);
        prevSelected.classList.remove('selected');
    }

    let newSelection = document.getElementById(id);
    newSelection.classList.add('selected');
    currentSelectedId = id;
}

const handleKeyPress = (e) => {
    if (currentSelectedId != -1 && !isNaN(e.key)) { 
        let currentElement = document.getElementById(currentSelectedId);
        currentElement.firstChild.textContent = e.key;
    }
};

document.onkeydown = (e) => handleKeyPress(e);