const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

var width = 21;
var height = 21;
var squareSize = 40;
var boardArray = generateArray2d(width, height);
var adjTiles;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawBoard(boardArray, width, height, squareSize);
}

function quickRandom(max) {
    return Math.floor(Math.random() * max);
}

function generateArray2d(width, height) {
    const arr = [];
    for(let row = 0; row < height; row++) {
        arr[row] = [];
        for (let col = 0; col < width; col++) {
            arr[row][col] = -5;
        }
    }
    for(let row = 1; row < height - 1; row++) {
        for (let col = 1; col < width - 1; col++) {
            arr[row][col] = 0;
        }
    }
    return arr;
}

function getNeighbor(currentPosition, arr) {
    let getAdjTiles = [];
    if (arr[currentPosition[0] + 1][currentPosition[1]] == 0) {
        getAdjTiles.push([currentPosition[0] + 1, currentPosition[1]]);
    }
    if (arr[currentPosition[0]][currentPosition[1] - 1] == 0) {
        getAdjTiles.push([currentPosition[0], currentPosition[1] - 1]);
    }
    if (arr[currentPosition[0] - 1][currentPosition[1]] == 0) {
        getAdjTiles.push([currentPosition[0] - 1, currentPosition[1]]);
    }
    if (arr[currentPosition[0]][currentPosition[1] + 1] == 0) {
        getAdjTiles.push([currentPosition[0],currentPosition[1] + 1]);
    }
    return getAdjTiles;
}

function generateMaze2d(arr, width, height) {
    stack = [[1, 1]];
    visited = 1;
    while (visited <= 20) {
        if (adjTiles != []) {
            currentPosition = stack[stack.length - 1];
            adjTiles = getNeighbor(currentPosition, arr);
            option = quickRandom(adjTiles.length);
            stack.push([adjTiles[option][0],adjTiles[option][1]]);
            arr[adjTiles[option][0]][adjTiles[option][1]] = 1;
            visited++;
        } else {
            stack.pop();
        }
    }
    return arr;
}

function drawBoard(arr, width, height, squareSize) {
    xCounter = 0;
    yCounter = 0;
    ctx.beginPath();
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            switch (boardArray[row][col]) {
                case -5:
                    ctx.fillStyle = "black";
                    break;
                case 0:
                    ctx.fillStyle = "white";
                    break;
                case 1:
                    ctx.fillStyle = "black";
                    break;
            }
            ctx.fillRect(xCounter, yCounter, squareSize, squareSize);
            xCounter += squareSize;
        }
        xCounter = 0;
        yCounter += squareSize;
    }
    ctx.stroke();
}

resizeCanvas();

boardArray = generateArray2d(width, height);

//for (let i = 0; i < test.length; i++) {
//    boardArray[test[i][0]][test[i][1]] = 1;
//}
boardArray = generateMaze2d(boardArray, width, height);
//boardArray = generateMaze2d(boardArray, width, height);

drawBoard(boardArray, width, height, squareSize);


window.addEventListener('resize', resizeCanvas);
