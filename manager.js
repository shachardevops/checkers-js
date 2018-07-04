let Board = createMyBoard(8, 8);
let gameOver = false;
let whiteTurn = false;
let lastClicked;
let pickedElement;
let chainEat = false;
createVisualBoard(8, 8);

function game(firstCoords, secoundCoords) {
    let correctPlayerPlay = false;
    firstCoords = firstCoords.id.split(",");
    secoundCoords = secoundCoords.id.split(",");
    let row = firstCoords[0];
    let column = firstCoords[1];
    let targetRow = secoundCoords[0];
    let targetColumn = secoundCoords[1];
    let myCell = Board[row][column];
    let targetCell = Board[targetRow][targetColumn];
    if (whiteTurn && myCell.color == "white")
        correctPlayerPlay = true;
    if (!whiteTurn && myCell.color == "black")
        correctPlayerPlay = true;
    if (correctPlayerPlay) {

        if (chainEat) {
            arrayOfmoves = myCell.isPossibleEat();
            for (index of arrayOfmoves) {
                if (targetRow == index.row &&
                    targetColumn == index.column) {
                    move(myCell, targetCell, true);
                    chainEat = false;
                    myCell.isKing = true;
                    whiteTurn = !whiteTurn;
                }
            }
        } else {
            if (myCell.isEatMove(targetCell)) {
                move(myCell, targetCell, true);
                let arrayOfmoves = myCell.isPossibleEat();
                if (arrayOfmoves.length > 0) {
                    chainEat = true;
                    createVisualBoard(8, 8);
                }
                if (piecePromotion(whiteTurn, myCell, targetRow))
                    myCell.isKing = true;
                if (!chainEat) {
                    whiteTurn = !whiteTurn;
                }

            } else if (myCell.isBasicMove(targetCell)) {
                move(myCell, targetCell, false);
                if (piecePromotion(whiteTurn, myCell, targetRow))
                    myCell.isKing = true;
                whiteTurn = !whiteTurn;
            } else
                alert("wrong move");
        }
    } else
        alert("wrong player");
    let stringOfBlacksAndWhites = PiecesCounter();
    pieces = stringOfBlacksAndWhites.split(",");
    console.log(pieces);
    if (Number(pieces[0]) == 0) {
        console.log("white won");
        gameOver = true;
    } else if (Number(pieces[1]) == 0) {
        console.log("black won");
        gamOver = true;
    }
    return Board;
}

function piecePromotion(turn, piece, targetRow) {
    if (turn && piece.color == "white" && targetRow == 0)
        return true;
    if (!turn && piece.color == "black" && targetRow == 7)
        return true;
    return false;
}

function ValidInput(position) {
    if (position < 0)
        position = 0;
    if (position > 7)
        position = 7;
    return position;
}

function getObject(row, column) {

    return Board[row][column];
}

function PiecesCounter() {
    let countBlacks = 0;
    let counterWhites = 0;
    let stringOfBlacksAndWhites = "";
    for (row of Board) {
        for (column of row) {
            if (column != null) {

                if (column.color == "black") {
                    countBlacks++;
                }
                if (column.color == "white") {
                    counterWhites++;
                }
            }
        }
    }
    stringOfBlacksAndWhites += countBlacks;
    stringOfBlacksAndWhites += ",";
    stringOfBlacksAndWhites += counterWhites;
    return stringOfBlacksAndWhites;
}

function move(myCell, targetCell, isEatMove) {
    const row = Number(myCell.row);
    const column = Number(myCell.column);
    const targetRow = Number(targetCell.row);
    const targetColumn = Number(targetCell.column);
    Board[targetRow][targetColumn] = myCell;
    Board[targetRow][targetColumn].column = targetColumn;
    Board[targetRow][targetColumn].row = targetRow;
    Board[row][column] = new Cell(row, column, "empty", false);
    if (isEatMove) {
        if (row > targetRow) {
            if (column > targetColumn) {
                Board[row - 1][column - 1] = new Cell(row - 1, column - 1, "empty", false);
            } else {
                Board[row - 1][column + 1] = new Cell(row - 1, column + 1, "empty", false);
            }
        } else {
            if (column > targetColumn) {
                Board[row + 1][column - 1] = new Cell(row + 1, column - 1, "empty", false);
            } else {
                Board[row + 1][column + 1] = new Cell(row + 1, column + 1, "empty", false);
            }
        }
    }
}