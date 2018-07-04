function Cell(row, column, color, isKing) {
    this.row = row;
    this.column = column;
    this.color = color;
    this.isKing = isKing;
}
Cell.prototype.isBasicMove = function (OtherCell) {
    //diffrences
    let differenceOnRows = this.row - OtherCell.row;
    let differenceOnColumns = this.column - OtherCell.column;
    // target-> left side from cell
    let isLeft = (differenceOnColumns == 1);
    // target-> right side from cell
    let isRight = (differenceOnColumns == -1);
    //  target-> above the cell
    let isUp = (differenceOnRows == 1);
    //  target-> below the cell
    let isDown = (differenceOnRows == -1);
    let myColor = this.color;
    // if target == null
    if (OtherCell.color == "empty") {
        if (isRight || isLeft) {
            if (this.isKing) {
                if (isUp || isDown)
                    return true;
            }
            if (myColor == 'white') {
                if (isUp)
                    return true;
            } else {
                if (isDown)
                    return true;
            }
        }
    }
    return false;
}
Cell.prototype.isEatMove = function (OtherCell) {
    let differenceOnRows = this.row - OtherCell.row;
    let differenceOnColumns = this.column - OtherCell.column;
    //eat conditions
    //target -> 2 steps left from obj
    let isLeftTwoSteps = (differenceOnColumns == 2);
    //target -> 2 steps right from obj
    let isRightTwoSteps = (differenceOnColumns == -2);
    //target -> 2 steps above obj
    let isUpTwoSteps = (differenceOnRows == 2);
    //target -> 2 steps below obj
    let isDownTwoSteps = (differenceOnRows == -2);
    let myColor = this.color;
    if (OtherCell.color == "empty") {
        if (this.isKing) {

            if (isUpTwoSteps) {
                if (isRightTwoSteps && getObject(this.row - 1, this.column + 1).color != this.color &&
                    getObject(this.row - 1, this.column + 1).color != "empty")
                    return true;

                if (isLeftTwoSteps && getObject(this.row - 1, this.column - 1).color != this.color &&
                    getObject(this.row - 1, this.column - 1).color != "empty")
                    return true;
            }
            if (isDownTwoSteps) {
                if (isRightTwoSteps && getObject(this.row + 1, this.column + 1).color != "empty" &&
                    getObject(this.row + 1, this.column + 1).color != this.color)
                    return true;
                if (isLeftTwoSteps && getObject(this.row + 1, this.column - 1).color != "empty" &&
                    getObject(this.row + 1, this.column - 1).color != this.color)
                    return true;

            }
        }
        if (myColor == 'white' && isUpTwoSteps) {
            if (isRightTwoSteps && getObject(this.row - 1, this.column + 1).color == "black")
                return true;
            if (isLeftTwoSteps && getObject(this.row - 1, this.column - 1).color == "black")
                return true;
        }
        if (myColor == "black" && isDownTwoSteps) {
            if (isRightTwoSteps && getObject(this.row + 1, this.column + 1).color == "white")
                return true;
            if (isLeftTwoSteps && getObject(this.row + 1, this.column - 1).color == "white")
                return true;
        }

        return false;
    }
}

Cell.prototype.isPossibleEat = function () {
    //row - =>up
    //row + =>down
    //column - => left
    //column + => right

    let possibleMoves = [];
    
    if (getObject(ValidInput(this.row - 1), ValidInput(this.column + 1)) != null &&
        getObject(ValidInput(this.row - 2), ValidInput(this.column + 2)) != null &&
        getObject(ValidInput(this.row - 1), ValidInput(this.column + 1)).color != this.color &&
        getObject(ValidInput(this.row - 1), ValidInput(this.column + 1)).color != "empty" &&
        getObject(ValidInput(this.row - 2), ValidInput(this.column + 2)).color == "empty")
        possibleMoves.push(new Cell(this.row - 2, this.column + 2));

    if (getObject(ValidInput(this.row - 1), ValidInput(this.column - 1)) != null &&
        getObject(ValidInput(this.row - 2), ValidInput(this.column - 2)) != null &&
        getObject(ValidInput(this.row - 1), ValidInput(this.column - 1)).color != this.color &&
        getObject(ValidInput(this.row - 1), ValidInput(this.column - 1)).color != "empty" &&
        getObject(ValidInput(this.row - 2), ValidInput(this.column - 2)).color == "empty")
        possibleMoves.push(new Cell(this.row - 2, this.column - 2));

    if (getObject(ValidInput(this.row + 1), ValidInput(this.column + 1)) != null &&
        getObject(ValidInput(this.row + 2), ValidInput(this.column + 2)) != null &&
        getObject(ValidInput(this.row + 1), ValidInput(this.column + 1)).color != this.color &&
        getObject(ValidInput(this.row + 1), ValidInput(this.column + 1)).color != "empty" &&
        getObject(ValidInput(this.row + 2), ValidInput(this.column + 2)).color == "empty")
        possibleMoves.push(new Cell(this.row + 2, this.column + 2));

    if (getObject(ValidInput(this.row + 1), ValidInput(this.column - 1)) != null &&
        getObject(ValidInput(this.row + 2), ValidInput(this.column - 2)) != null &&
        getObject(ValidInput(this.row + 1), ValidInput(this.column - 1)).color != this.color &&
        getObject(ValidInput(this.row + 1), ValidInput(this.column - 1)).color != "empty" &&
        getObject(ValidInput(this.row + 2), ValidInput(this.column - 2)).color == "empty")
        possibleMoves.push(new Cell(this.row + 2, this.column - 2));
    return possibleMoves;
}