const mainDiv = document.querySelector('.main-div');
const h1 = document.querySelector('h1');
const chooseSquaresBtn = document.querySelector('button');

h1.textContent = 'Etch-A-Sketch';

paintThePage(true, 16);

function paintThePage(firstTimePainting, squares) {
    if (!firstTimePainting) {
        while (mainDiv.firstChild) {
            mainDiv.removeChild(mainDiv.lastChild);
        }
    }
    
    // get width of main div and subtract its borders and the borders of the children and the width of the scrollbar
    let mainDivWidth = mainDiv.getBoundingClientRect().width - (squares*2) - 2 - 15;

    // loop through all divs with width and height equal to main div width/squares
    for (let i = 1; i <= (squares*squares); i++) {
        let squareDiv = document.createElement('div');
        squareDiv.style.width = `${mainDivWidth/squares}px`;
        squareDiv.style.height = `${mainDivWidth/squares}px`;
        squareDiv.style.border = '1px solid black';
        mainDiv.appendChild(squareDiv);


        squareDiv.addEventListener("mouseenter", (e) => {
            squareDiv.style.backgroundColor = 'pink';
        });
    }
}

// add listener to window resizing and repaint the page
window.addEventListener("resize", (e) => {
    paintThePage(false, 16);
});

chooseSquaresBtn.addEventListener('click', (e) => {
    let squares;
    do {
        squares = Number(parseInt(prompt('How many squares would you like?','')));
        if (squares > 100) alert('100 is the maximum number of squares you can enter');
    } while (squares > 100);
    paintThePage(false, squares);
});
