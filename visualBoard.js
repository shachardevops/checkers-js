function createVisualBoard(rows, column) {
    let visualBoard = document.getElementById("visualBoard");
    for (let r = 0; r < rows; r++) {
        let row = document.createElement("div");
        visualBoard.appendChild(row);
        for (let c = 0; c < column; c++) {
            let cell = row.appendChild(document.createElement("div"));
            cell.className = 'cell';
            cell.id = r + "," + c;
            let currentCell = Board[r][c];
            if (currentCell == null) {
                cell.classList.add("whiteCell");
            } else {
                cell.classList.add("blackCell");
                if (currentCell.color != "empty") {
                    if (currentCell.color == "black") {
                        cell.classList.add("blackPiece");
                        if (!currentCell.isKing) 
                            cell.innerText = "♟";
                        
                        else
                            cell.innerText ="♛";
                    }
                    if (currentCell.color == "white") {
                        cell.classList.add("whitePiece");
                        if (!currentCell.isKing) 
                            cell.innerText = "♟";
                        else
                            cell.innerText ="♛";
                    }
                }
                cell.addEventListener('click', (event) => {
                    let start =  pickedElement;
                    pickedElement = event.target;
                    pickedElement.classList.add("clicked");
                    let end = pickedElement;
                    if (start != undefined && end != undefined) {
                        Board = game(start, end);
                        start = undefined;
                        end = undefined;
                        visualBoard.innerHTML='';
                        pickedElement = undefined;
                        createVisualBoard(8,8);
                    }
                });
            }
        }
    }
}