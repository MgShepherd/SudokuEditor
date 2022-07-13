const GRID_SIZE = 9;
let currentSelectedIds = [];
let mouseButtonPressed = false;
let commandKeyPressed = false;
let keyAlreadyPressed = false;

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
                if (!commandKeyPressed) {
                    clearPreviousSelections();
                } 
                 mouseButtonPressed = true;
                 handleMouseDragged(gridSquare.id);
            }


            let valueTextTag = document.createElement('p');
            gridSquare.appendChild(valueTextTag);

            let pencilTextTag = document.createElement('p');
            pencilTextTag.classList.add('pencilText');
            gridSquare.appendChild(pencilTextTag);

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

const handleKeyPress = (e) => {
    if (!keyAlreadyPressed) {
        keyAlreadyPressed = true;
        if (currentSelectedIds.length != 0 && !isNaN(e.key)) { 
            for (const id of currentSelectedIds) {
                let element = document.getElementById(id);

                if (currentInteractionMode == InteractionMode.SettingNewPuzzle) {
                    element.firstChild.classList.add('givenNumber');
                    handleNewValueAddedToSquare(e.key, element);
                } else if (currentInteractionMode == InteractionMode.FullValueMode) {
                    element.firstChild.classList.add('solvingNumber');
                    handleNewValueAddedToSquare(e.key, element);
                } else if (currentInteractionMode == InteractionMode.PencilMode) {
                    let currentValues = element.childNodes[1].textContent;
                    if (!currentValues.includes(e.key)) {
                        element.childNodes[1].textContent += e.key;
                    } else {
                        element.childNodes[1].textContent.replace(e.key, "");
                    }
                }
            }
        } else if (e.key == 'Meta' || e.key == 'Control') {
            commandKeyPressed = true;
        } else if (e.key == 'p') {
            togglePencilMode();
        } else if (e.key == 'd') {
            deleteValues();
        }
    }
};

const handleNewValueAddedToSquare = (key, element) => {
    if (key == element.firstChild.textContent) {
        element.firstChild.textContent = "";
    } else {
        element.firstChild.textContent = key;
    }
    element.childNodes[1].textContent = "";
}

const handleKeyRelease = (e) => {
    if (e.key == 'Meta' || e.key == 'Control') {
        commandKeyPressed = false;
    }
    keyAlreadyPressed = false;
}

const handleMouseDragged = (id, isClickEvent = false) => {
    if (currentInteractionMode == InteractionMode.NoneSelected) return;

    if ((mouseButtonPressed || isClickEvent) && !currentSelectedIds.includes(id)) {
        let newSelection = document.getElementById(id);
        newSelection.classList.add('selected');
        currentSelectedIds.push(id);
    }
}

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
        currentInteractionMode = InteractionMode.FullValueMode;
        informationText.textContent = 'Press above to toggle pencil mode or delete the current selection';
        startButton.textContent = 'Pencil Mode';
        loadButton.textContent = 'Delete Selected Value';
    } else {
        togglePencilMode();
    }
}

const togglePencilMode = () => {
    if (currentInteractionMode == InteractionMode.FullValueMode) {
        currentInteractionMode = InteractionMode.PencilMode;
        startButton.textContent = 'Value Mode';
    } else {
        currentInteractionMode = InteractionMode.FullValueMode;
        startButton.textContent = 'Pencil Mode';
    }
}

const loadPrevious = () => {
    if (currentInteractionMode == InteractionMode.PencilMode || currentInteractionMode == InteractionMode.FullValueMode) {
        deleteValues();
    }
}

const deleteValues = () => {
    for (const id of currentSelectedIds) {
        let element = document.getElementById(id);
        element.firstChild.textContent = "";
        element.childNodes[1].textContent = "";
    }
}

window.onload = initHTML;
document.onkeydown = (e) => handleKeyPress(e);
document.onkeyup = (e) => handleKeyRelease(e);