const GRID_SIZE = 9;
let currentSelectedId = -1;

const InteractionMode = {
    NoneSelected: 0,
    SettingNewPuzzle: 1,
    FullValueMode: 2,
    PencilMode: 3
}

let currentInteractionMode = InteractionMode.NoneSelected;

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
    if (currentInteractionMode == InteractionMode.NoneSelected || currentSelectedId == id) return;

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

const startNew = () => {
    let informationText = document.getElementById('informationText');
    let startButton = document.getElementById('startButton');
    let loadButton = document.getElementById('loadButton');

    if(currentInteractionMode == InteractionMode.NoneSelected) {
        currentInteractionMode = InteractionMode.SettingNewPuzzle;
        informationText.textContent = 'Click on squares to select and then input value - ' + 
                                        'once initial configuration loaded press above to start solving';
        startButton.textContent = 'Start Solving';
        loadButton.textContent = 'Cancel Creation';
    } else if (currentInteractionMode == InteractionMode.SettingNewPuzzle) {
        console.log('running code');
        currentInteractionMode = InteractionMode.FullValueMode;
        informationText.textContent = 'Press above to toggle pencil mode or delete the current selection';
        startButton.textContent = 'Pencil Mode';
        loadButton.textContent = 'Delete Selected Value';
    } else if (currentInteractionMode == InteractionMode.FullValueMode) {
        currentInteractionMode = InteractionMode.PencilMode
        startButton.textContent = 'Value Mode';
    } else if (currentInteractionMode == InteractionMode.PencilMode) {
        currentInteractionMode = InteractionMode.FullValueMode;
        startButton.textContent = 'Pencil Mode';
    }
}

const loadPrevious = () => {
    console.log('Loading Previous Puzzle... Functionality coming soon');
}