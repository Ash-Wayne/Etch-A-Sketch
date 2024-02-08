const mainDiv = document.querySelector('.main-div');
const h1 = document.querySelector('h1');
const chooseSquaresBtn = document.querySelector('button');

h1.textContent = 'Etch-A-Sketch';


// paint the page with 16x16 on load
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

        // paint the square progressively darker upon each entry
        squareDiv.addEventListener("mouseenter", (e) => {
            darkenTheSquare(squareDiv);
        });
    }
}


function darkenTheSquare(squareDiv) {
    let colorR;
    let colorG;
    let colorB;
    let opacity;

    // if square hasn't been painted at all, give it a random color
    // if it has, reassign the same color
    if (!squareDiv.style.backgroundColor) {
        colorR = Math.floor(Math.random()*256);
        colorG = Math.floor(Math.random()*256);
        colorB = Math.floor(Math.random()*256);
        opacity = 0;
    } else {
        const rgbValues = squareDiv.style.getPropertyValue('background-color').split(',');
        colorR = parseInt(rgbValues[0].slice(5));
        colorG = parseInt(rgbValues[1]);
        colorB = parseInt(rgbValues[2]);
        opacity = parseFloat(rgbValues[3]);
    }

    // darken the square by a little bit
    if (opacity < 1) opacity = opacity + 0.1;

    squareDiv.style.backgroundColor = `rgba(${colorR},${colorG},${colorB},${opacity})`;
}


// add listener to window resizing and repaint the page
window.addEventListener("resize", (e) => {
    paintThePage(false, 16);
});


// allow changing number of squares
chooseSquaresBtn.addEventListener('click', (e) => {
    let squares;
    do {
        squares = parseInt(prompt('How many squares would you like?',''));
        if (squares > 100) alert('100 is the maximum number of squares you can enter');
    } while (squares > 100);
    paintThePage(false, squares);
});
