function createMyBoard(rows, columns) {
    let boardArray = [];
    for (let row = 0; row < rows; row++) {
        boardArray[row] = [];
        for (let column = 0; column < columns; column++) {
            if (row % 2 != 0 && column % 2 == 0 || row % 2 == 0 && column % 2 != 0) {
                if (row < 3) {
                    boardArray[row][column] = new Cell(row, column, "black", false);
                } else if (row > 4) {
                    boardArray[row][column] = new Cell(row, column, "white", false);
                } else {

                    boardArray[row][column] = new Cell(row, column, "empty", false);
                }
            } else {
                boardArray[row][column] = null;
            }
        }
    }
    return boardArray;
}