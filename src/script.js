const GRID_SIZE = 9;
let currentSelectedIds = [];
let mouseButtonPressed = false;

const InteractionMode = {
    NoneSelected: 0,
    SettingNewPuzzle: 1,
    FullValueMode: 2,
    PencilMode: 3
}

let currentInteractionMode = InteractionMode.NoneSelected;

const initHTML = () => {
    let grid = document.getElementById('grid');

    grid.onmouseup = () => mouseButtonPressed = false;

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
            gridSquare.onclick = () => handleMouseDragged(gridSquare.id, true);
            gridSquare.onmouseenter = () => handleMouseDragged(gridSquare.id);
            gridSquare.onmousedown = () => {
                 clearPreviousSelections(); 
                 mouseButtonPressed = true;
                 handleMouseDragged(gridSquare.id);
            }


            let valueTextTag = document.createElement('h2');
            gridSquare.appendChild(valueTextTag);

            grid.appendChild(gridSquare);
        }
    }
}

const clearPreviousSelections = () => {
    if (currentSelectedIds.length != 0) {
        for (const oldId of currentSelectedIds) {
            let prevSelected = document.getElementById(oldId);
            prevSelected.classList.remove('selected');
        }
    }
    currentSelectedIds = [];
}

window.onload = initHTML;

const handleKeyPress = (e) => {
    if (currentSelectedIds.length != 0 && !isNaN(e.key)) { 
        for (const id of currentSelectedIds) {
            let element = document.getElementById(id);
            element.firstChild.textContent = e.key;
        }
    }
};

const handleMouseDragged = (id, isClickEvent = false) => {
    if (currentInteractionMode == InteractionMode.NoneSelected) return;

    if (mouseButtonPressed || isClickEvent) {
        let newSelection = document.getElementById(id);
        newSelection.classList.add('selected');
        currentSelectedIds.push(id);
    }
}

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