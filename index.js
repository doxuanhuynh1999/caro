"use strict";

const domContentLoaded = () => {
    //thay đổi kích thước của bàn cờ.
    const dimensionButton = document.getElementById("dimension-button");
    //hiển thị trạng thái hiện tại của trò chơi (ví dụ: người chiến thắng, lượt đi tiếp theo).
    const statusElement = document.getElementById("status");
    //khởi động lại trò chơi.
    const restartButton = document.getElementById("restart-btn");
    // phần tử chứa bàn cờ.
    const boardElement = document.getElementById("board");

    const xMark = "X";

    const oMark = "O";

    const xColor = "blue";

    const oColor = "red";

    const dimensions = [10, 20, 30, 40];

    let defaultDimension = dimensions[0];

    let theWinner = null;
    //khởi tạo với một mảng rỗng để lưu trữ các ô thắng nếu có.
    let winningLine = [];
    //lưu trữ chỉ số của kích thước hiện tại trong mảng dimensions.
    let dimensionIndex = 0;
    //default true (người chơi X đi trước)
    let xIsNext = true;

    let squares = Array(defaultDimension).fill(Array(defaultDimension).fill(null));

    dimensionButton.textContent = `${defaultDimension} x ${defaultDimension}`;

    dimensionButton.addEventListener("click", dimensionButtonClick);

    restartButton.addEventListener("click", restartGame);

    renderBoard();

    updateStatus();

    var newRow;
     
    var newCol;

    function handleClick(row, col) {

        newRow = row;
        newCol = col;

        if (theWinner || squares[row][col]) {
            return;
        }

        const newSquares = squares.map((row) => [...row]);
        // Sử dụng 'X' hoặc 'O' tùy thuộc vào người chơi hiện tại
        newSquares[row][col] = xIsNext ? xMark : oMark;

        squares = newSquares;
        // Chuyển lượt đi cho người chơi tiếp theo
        xIsNext = !xIsNext;

        const winner = calculateWinner(newSquares, row, col);

        if (winner) {
            theWinner = winner;
            winningLine = findWinningLine(newSquares, row, col, winner);
        }

        renderBoard();

        updateStatus();
    }

    function calculateWinner(currentSquares, row, col) {
        const currentPlayer = currentSquares[row][col];

        // Check horizontally
        let count = 1;
        let leftCol = col - 1;
        while (leftCol >= 0 && currentSquares[row][leftCol] === currentPlayer) {
            count++;
            leftCol--;
        }
        let rightCol = col + 1;
        while (rightCol < defaultDimension && currentSquares[row][rightCol] === currentPlayer) {
            count++;
            rightCol++;
        }
        if (count == 5) {

            let checkMark;
            
            if (currentPlayer == xMark){
                checkMark = oMark;
            } else {
                checkMark = xMark;
            }
            console.log(checkMark);

           if (currentSquares[row][leftCol] == checkMark && currentSquares[row][rightCol] == checkMark){

           } else {
            return currentPlayer;
           }
        }

        // Check vertically
        count = 1;
        let topRow = row - 1;
        while (topRow >= 0 && currentSquares[topRow][col] === currentPlayer) {
            count++;
            topRow--;
        }
        let bottomRow = row + 1;
        while (bottomRow < defaultDimension && currentSquares[bottomRow][col] === currentPlayer) {
            count++;
            bottomRow++;
        }
        if (count == 5) {
            let checkMark;
            
            if (currentPlayer == xMark){
                checkMark = oMark;
            } else {
                checkMark = xMark;
            }
            if (currentSquares[topRow][col] == checkMark && currentSquares[bottomRow][col] == checkMark){

            } else {
             return currentPlayer;
            }
        }

        // Check diagonally (top-left to bottom-right)
        count = 1;
        let topLeftRow = row - 1;
        let topLeftCol = col - 1;
        while (topLeftRow >= 0 && topLeftCol >= 0 && currentSquares[topLeftRow][topLeftCol] === currentPlayer) {
            count++;
            topLeftRow--;
            topLeftCol--;
        }
        let bottomRightRow = row + 1;
        let bottomRightCol = col + 1;
        while (bottomRightRow < defaultDimension && bottomRightCol < defaultDimension && currentSquares[bottomRightRow][bottomRightCol] === currentPlayer) {
            count++;
            bottomRightRow++;
            bottomRightCol++;
        }
        if (count == 5) {
            let checkMark;
            
            if (currentPlayer == xMark){
                checkMark = oMark;
            } else {
                checkMark = xMark;
            }
            if (currentSquares[topLeftRow][topLeftCol] == checkMark && currentSquares[bottomRightRow][bottomRightCol] == checkMark){

            } else {
             return currentPlayer;
            }
        }

        // Check diagonally (top-right to bottom-left)
        count = 1;
        let topRightRow = row - 1;
        let topRightCol = col + 1;
        while (topRightRow >= 0 && topRightCol < defaultDimension && currentSquares[topRightRow][topRightCol] === currentPlayer) {
            count++;
            topRightRow--;
            topRightCol++;
        }
        let bottomLeftRow = row + 1;
        let bottomLeftCol = col - 1;
        while (bottomLeftRow < defaultDimension && bottomLeftCol >= 0 && currentSquares[bottomLeftRow][bottomLeftCol] === currentPlayer) {
            count++;
            bottomLeftRow++;
            bottomLeftCol--;
        }
        if (count == 5) {
            let checkMark;
            
            if (currentPlayer == xMark){
                checkMark = oMark;
            } else {
                checkMark = xMark;
            }
            if (currentSquares[topRightRow][topRightCol] == checkMark && currentSquares[bottomLeftRow][bottomLeftCol] == checkMark){

            } else {
             return currentPlayer;
            }
        }

        return null;
    }

    function findWinningLine(currentSquares, row, col, winner) {
        const currentPlayer = currentSquares[row][col];
        const lines = [];

        // Check horizontally
        let leftCol = col - 1;
        while (leftCol >= 0 && currentSquares[row][leftCol] === currentPlayer) {
            lines.push([row, leftCol]);
            leftCol--;
        }
        lines.push([row, col]);
        let rightCol = col + 1;
        while (rightCol < defaultDimension && currentSquares[row][rightCol] === currentPlayer) {
            lines.push([row, rightCol]);
            rightCol++;
        }
        if (lines.length == 5) {
            return lines;
        }

        // Check vertically
        let topRow = row - 1;
        while (topRow >= 0 && currentSquares[topRow][col] === currentPlayer) {
            lines.push([topRow, col]);
            topRow--;
        }
        lines.push([row, col]);
        let bottomRow = row + 1;
        while (bottomRow < defaultDimension && currentSquares[bottomRow][col] === currentPlayer) {
            lines.push([bottomRow, col]);
            bottomRow++;
        }
        if (lines.length == 5) {
            return lines;
        }

        // Check diagonally (top-left to bottom-right)
        let topLeftRow = row - 1;
        let topLeftCol = col - 1;
        while (topLeftRow >= 0 && topLeftCol >= 0 && currentSquares[topLeftRow][topLeftCol] === currentPlayer) {
            lines.push([topLeftRow, topLeftCol]);
            topLeftRow--;
            topLeftCol--;
        }
        lines.push([row, col]);
        let bottomRightRow = row + 1;
        let bottomRightCol = col + 1;
        while (bottomRightRow < defaultDimension && bottomRightCol < defaultDimension && currentSquares[bottomRightRow][bottomRightCol] === currentPlayer) {
            lines.push([bottomRightRow, bottomRightCol]);
            bottomRightRow++;
            bottomRightCol++;
        }
        if (lines.length == 5) {
            return lines;
        }

        // Check diagonally (top-right to bottom-left)
        let topRightRow = row - 1;
        let topRightCol = col + 1;
        while (topRightRow >= 0 && topRightCol < defaultDimension && currentSquares[topRightRow][topRightCol] === currentPlayer) {
            lines.push([topRightRow, topRightCol]);
            topRightRow--;
            topRightCol++;
        }
        lines.push([row, col]);
        let bottomLeftRow = row + 1;
        let bottomLeftCol = col - 1;
        while (bottomLeftRow < defaultDimension && bottomLeftCol >= 0 && currentSquares[bottomLeftRow][bottomLeftCol] === currentPlayer) {
            lines.push([bottomLeftRow, bottomLeftCol]);
            bottomLeftRow++;
            bottomLeftCol--;
        }
        if (lines.length == 5) {
            return lines;
        }

        return [];
    }

    function renderBoard() {
        boardElement.innerHTML = "";
        for (let row = 0; row < defaultDimension; row++) {
            const rowElement = document.createElement("div");
            rowElement.className = "board-row";

            for (let col = 0; col < defaultDimension; col++) {
                const value = squares[row][col];
                const isWinningSquare = winningLine.some(([winRow, winCol]) => winRow === row && winCol === col);

                const squareButton = document.createElement("button");
                squareButton.className = "square";
                squareButton.style.color = value === xMark ? xColor : oColor;
                squareButton.textContent = value;

                if (newRow == row && newCol == col) {
                    squareButton.style.backgroundColor = "yellow";
                }
                
                if (isWinningSquare) {
                    squareButton.style.backgroundColor = "yellow";
                    squareButton.style.fontWeight = "bold";
                } else {
                    squareButton.addEventListener("click", () => handleClick(row, col));
                }

                rowElement.appendChild(squareButton);
            }

            boardElement.appendChild(rowElement);
        }
    }

    function updateStatus() {
        if (theWinner) {
            statusElement.style.color = !xIsNext ? xColor : oColor;
            statusElement.textContent = `Winner: ${theWinner}`;
        } else {
            statusElement.style.color = xIsNext ? xColor : oColor;
            statusElement.textContent = `Turn: ${xIsNext ? xMark : oMark}`;
        }
    }

    function restartGame() {
        squares = Array(defaultDimension).fill(Array(defaultDimension).fill(null));
        xIsNext = true;
        theWinner = null;
        winningLine = [];
        newCol = null;
        newRow = null;
        renderBoard();
        updateStatus();
    }

    function dimensionButtonClick() {
        dimensionIndex = (dimensionIndex + 1) % dimensions.length;
        defaultDimension = dimensions[dimensionIndex];
        dimensionButton.textContent = `${defaultDimension} x ${defaultDimension}`;
        restartGame();
    }
};

document.addEventListener("DOMContentLoaded", domContentLoaded);

// refer https://techmaster.vn/posts/37756/huong-dan-tao-game-co-caro-bang-javascript