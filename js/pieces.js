//----------------Importowanie----------------//
import { runGame } from "./game.js";
import { gamemode } from "./main.js";
import { ocupySquare, position, square, squaresID, squaresOC, squaresPC, writeSquare } from "./squares.js";
import { createPromotionSelection, show } from "./visual.js";
//--------------------------------------------//

let pieceClass = {
    1: "pawnW",
    2: "pawnB",
    3: "knightW",
    4: "knightB",
    5: "bishopW",
    6: "bishopB",
    7: "rookW",
    8: "rookB",
    9: "queenW",
    10: "queenB",
    11: "kingW",
    12: "kingB"
};
export let pawnsMoved = {};
let positionXY = null;
let piece = null;
let chessboard = document.querySelector(".chessboard");
let row = null;
let column = null;
let piecesCount = 0;
let pieceColor = null;
export let checkingPieces = [];
export let whiteKInCheck = false;
export let blackKInCheck = false;

export function drawClasic() {
    if (gamemode !== "clasic") {
        return;
    }
    piecesCount = 0;
    let backRow = [7, 3, 5, 9, 11, 5, 3, 7];

    // Białe figury
    row = 1;
    column = 1;
    for (let i = 0; i < 8; i++) {
        pieceColor = "W";
        drawPieces(backRow[i], row, column, piecesCount, pieceColor);
        piecesCount++;
        column++;
    }

    // Białe pionki
    row = 2;
    column = 1;
    for (let i = 0; i < 8; i++) {
        drawPieces(1, row, column, piecesCount, pieceColor);
        piecesCount++;
        column++;
    }

    // Czarne pionki
    row = 7;
    column = 1;
    for (let i = 0; i < 8; i++) {
        pieceColor = "B"
        drawPieces(2, row, column, piecesCount, pieceColor);
        piecesCount++;
        column++;
    }

    // Czarne figury
    row = 8;
    column = 1;
    for (let i = 0; i < 8; i++) {
        drawPieces(backRow[i] + 1, row, column, piecesCount, pieceColor);
        piecesCount++;
        column++;
    }
    setTimeout(function() {
        runGame();
    }, piecesCount * 30);
};

function drawPieces(classD, rowD, columnD, countD, color) {
            setTimeout(function() {
                positionXY = position(columnD, rowD);
                piece = document.createElement("div");
                piece.classList.add(pieceClass[classD]);
                piece.classList.add("piece");
                piece.id = countD;
                piece.style.left = positionXY.X + "px";
                piece.style.bottom = positionXY.Y + "px";
                chessboard.appendChild(piece);
                show(piece);
                ocupySquare(columnD, rowD, color);
                writeSquare(piece.id, columnD, rowD)
            }, countD * 30);
};

export function movePiece(id, targetColumn,targetRow) {
    let piece = document.getElementById(id);
    let target = position(targetColumn, targetRow);
    deletePiece(targetColumn, targetRow);   
    piece.style.left = target.X + "px";
    piece.style.bottom = target.Y + "px";

    if (piece.classList[0] === "pawnW" || piece.classList[0] === "pawnB") {
        //console.log("ruszono pionek")
        pawnsMoved[id] = true;
    };
};

export function deletePiece(x, y){
    let pieceToDelete = document.getElementById(squaresID[""+x+y])
    if (pieceToDelete !== null) {
        pieceToDelete.remove();
    };
};

export function promotePawn(piece) {
    let x = piece.style.left;
    let y = piece.style.bottom;
    let color = piece.classList[0].at(-1);
    console.log("promote " + piece.id);
    if (color === "W") {
        createPromotionSelection("queenW", "rookW", "bishopW", "knightW", x, y);
    }
    if (color === "B") {
        createPromotionSelection("queenB", "rookB", "bishopB", "knightB", x, y);
    }
    document.querySelectorAll(".promotionOption").forEach(function(option) {
        option.addEventListener("click", function() {

            piece.classList.replace(
                piece.classList[0],
                option.classList[0]
            );

            document.querySelector(".promotionSelection").remove();

        });
    });
}

export function checkAllChecks() {

    for (let id = 0; id < 64; id++) {

        let piece = document.getElementById(id);

        if (piece === null) {
            continue;
        }

        let left = piece.style.left;
        let bottom = piece.style.bottom;

        let position = square(left, bottom);

        checkIfPieceChecking(id, position.x, position.y);
    }
}

export function checkIfPieceChecking(id, x, y) {
    let pieceCIPC = document.getElementById(id);
    let pieceType = pieceCIPC.classList[0];
    let whiteKing = document.querySelector(".kingW")
    let blackKing = document.querySelector(".kingB")
    let square;
        if (pieceType === "pawnW") {
            if (x < 8) {
                square = "" + (x + 1) + (y + 1);
                if (squaresID[square] === blackKing.id) {
                    checkingPieces.push(id);
                    blackKInCheck = true;
                }
            }
            if (x > 1) {
                square = "" + (x - 1) + (y + 1);
                if (squaresID[square] === blackKing.id) {
                    checkingPieces.push(id);
                    blackKInCheck = true;
                }
            }
        };
        if (pieceType === "pawnB") {
            if (x < 8) {
                square = "" + (x + 1) + (y - 1);
                if (squaresID[square] === whiteKing.id) {
                    checkingPieces.push(id);
                    blackKInCheck = true;
                }
            }
            if (x > 1) {
                square = "" + (x - 1) + (y - 1);
                if (squaresID[square] === whiteKing.id) {
                    checkingPieces.push(id);
                    blackKInCheck = true;
                }
            }
        }
        if (pieceType === "rookW") {
            for (let i = x; i < 8; i++) {
                square = "" + (i + 1) + y;
                if (squaresPC[square] === "B") {
                    if (squaresID[square] === blackKing.id) {
                    checkingPieces.push(id);
                    blackKInCheck = true;
                    }
                    break;
                } else if (squaresOC[square] === true){
                    break;
                }
            }
            for (let i = x; i > 1; i--) {
                square = "" + (i - 1) + y;
                if (squaresPC[square] === "B") {
                    if (squaresID[square] === blackKing.id) {
                    checkingPieces.push(id);
                    blackKInCheck = true;
                    }
                    break;
                } else if (squaresOC[square] === true){
                    break;
                }
            }
            for (let i = y; i < 8; i++) {
                square = "" + x + (i + 1);
                if (squaresPC[square] === "B") {
                    if (squaresID[square] === blackKing.id) {
                    checkingPieces.push(id);
                    blackKInCheck = true;
                    }
                    break;
                } else if (squaresOC[square] === true){
                    break;
                }
            }
            for (let i = y; i > 1; i--) {
                square = "" + x + (i - 1);
                if (squaresPC[square] === "B") {
                    if (squaresID[square] === blackKing.id) {
                    checkingPieces.push(id);
                    blackKInCheck = true;
                    }
                    break;
                } else if (squaresOC[square] === true){
                    break;
                }
            }
        }
        if (pieceType === "rookB") {
            for (let i = x; i < 8; i++) {
                square = "" + (i + 1) + y;
                if (squaresPC[square] === "W") {
                    if (squaresID[square] === whiteKing.id) {
                    checkingPieces.push(id);
                    blackKInCheck = true;
                    }
                    break;
                } else if (squaresOC[square] === true){
                    break;
                }
            }
            for (let i = x; i > 1; i--) {
                square = "" + (i - 1) + y;
                if (squaresPC[square] === "W") {
                    if (squaresID[square] === whiteKing.id) {
                    checkingPieces.push(id);
                    blackKInCheck = true;
                    }
                    break;
                } else if (squaresOC[square] === true){
                    break;
                }
            }
            for (let i = y; i < 8; i++) {
                square = "" + x + (i + 1);
                if (squaresPC[square] === "W") {
                    if (squaresID[square] === whiteKing.id) {
                    checkingPieces.push(id);
                    blackKInCheck = true;
                    }
                    break;
                } else if (squaresOC[square] === true){
                    break;
                }
            }
            for (let i = y; i > 1; i--) {
                square = "" + x + (i - 1);
                if (squaresPC[square] === "W") {
                    if (squaresID[square] === whiteKing.id) {
                    checkingPieces.push(id);
                    blackKInCheck = true;
                    }
                    break;
                } else if (squaresOC[square] === true){
                    break;
                }
            }
        }
        if (pieceType === "knightW") {
            let moves = [
                [2, 1],
                [2, -1],
                [-2, 1],
                [-2, -1],
                [1, 2],
                [1, -2],
                [-1, 2],
                [-1, -2]
            ];
            for (let i = 0; i < moves.length; i++) {
                let targetX = x + moves[i][0];
                let targetY = y + moves[i][1];
                if (targetX < 1 || targetX > 8 || targetY < 1 || targetY > 8) {
                    continue;
                }
                let square = "" + targetX + targetY;
                if (squaresID[square] === blackKing.id) {
                    checkingPieces.push(id);
                    blackKInCheck = true;
                }
            };
        }
        if (pieceType === "knightB") {
            let moves = [
                [2, 1],
                [2, -1],
                [-2, 1],
                [-2, -1],
                [1, 2],
                [1, -2],
                [-1, 2],
                [-1, -2]
            ];
            for (let i = 0; i < moves.length; i++) {
                let targetX = x + moves[i][0];
                let targetY = y + moves[i][1];
                if (targetX < 1 || targetX > 8 || targetY < 1 || targetY > 8) {
                    continue;
                }
                let square = "" + targetX + targetY;
                if (squaresID[square] === whiteKing.id) {
                    checkingPieces.push(id);
                    blackKInCheck = true;
                }
            };
        };
        if (pieceType === "bishopW") {
            for (let i = x, j = y; i < 8, j < 8; i++, j++) {
                square = "" + (i + 1) + (j + 1);
                if (squaresPC[square] === "B") {
                    if (squaresID[square] === blackKing.id) {
                    checkingPieces.push(id);
                    blackKInCheck = true;
                    }
                    break;
                } else if (squaresOC[square] === true){
                    break;
                }
            }
            for (let i = x, j = y; i < 8, j > 1; i++, j--) {
                square = "" + (i + 1) + (j - 1);
                if (squaresPC[square] === "B") {
                    if (squaresID[square] === blackKing.id) {
                    checkingPieces.push(id);
                    blackKInCheck = true;
                    }
                    break;
                } else if (squaresOC[square] === true){
                    break;
                }
            }
            for (let i = x, j = y; i > 1, j > 1; i--, j--) {
                square = "" + (i - 1) + (j - 1);
                if (squaresPC[square] === "B") {
                    if (squaresID[square] === blackKing.id) {
                    checkingPieces.push(id);
                    blackKInCheck = true;
                    }
                    break;
                } else if (squaresOC[square] === true){
                    break;
                }
            }
            for (let i = x, j = y; i > 1, j < 8; i--, j++) {
                square = "" + (i - 1) + (j + 1);
                if (squaresPC[square] === "B") {
                    if (squaresID[square] === blackKing.id) {
                    checkingPieces.push(id);
                    blackKInCheck = true;
                    }
                    break;
                } else if (squaresOC[square] === true){
                    break;
                }
            }
        }
        if (pieceType === "bishopB") {
            for (let i = x, j = y; i < 8, j < 8; i++, j++) {
                square = "" + (i + 1) + (j + 1);
                if (squaresPC[square] === "W") {
                    if (squaresID[square] === whiteKing.id) {
                    checkingPieces.push(id);
                    blackKInCheck = true;
                    }
                    break;
                } else if (squaresOC[square] === true){
                    break;
                }
            }
            for (let i = x, j = y; i < 8, j > 1; i++, j--) {
                square = "" + (i + 1) + (j - 1);
                if (squaresPC[square] === "W") {
                    if (squaresID[square] === whiteKing.id) {
                    checkingPieces.push(id);
                    blackKInCheck = true;
                    }
                    break;
                } else if (squaresOC[square] === true){
                    break;
                }
            }
            for (let i = x, j = y; i > 1, j > 1; i--, j--) {
                square = "" + (i - 1) + (j - 1);
                if (squaresPC[square] === "W") {
                    if (squaresID[square] === whiteKing.id) {
                    checkingPieces.push(id);
                    blackKInCheck = true;
                    }
                    break;
                } else if (squaresOC[square] === true){
                    break;
                }
            }
            for (let i = x, j = y; i > 1, j < 8; i--, j++) {
                square = "" + (i - 1) + (j + 1);
                if (squaresPC[square] === "W") {
                    if (squaresID[square] === whiteKing.id) {
                    checkingPieces.push(id);
                    blackKInCheck = true;
                    }
                    break;
                } else if (squaresOC[square] === true){
                    break;
                }
            }
        }
        if (pieceType === "queenW") {
            for (let i = x; i < 8; i++) {
                square = "" + (i + 1) + y;
                if (squaresPC[square] === "B") {
                    if (squaresID[square] === blackKing.id) {
                    checkingPieces.push(id);
                    blackKInCheck = true;
                    }
                    break;
                } else if (squaresOC[square] === true){
                    break;
                }
            }
            for (let i = x; i > 1; i--) {
                square = "" + (i - 1) + y;
                if (squaresPC[square] === "B") {
                    if (squaresID[square] === blackKing.id) {
                    checkingPieces.push(id);
                    blackKInCheck = true;
                    }
                    break;
                } else if (squaresOC[square] === true){
                    break;
                }
            }
            for (let i = y; i < 8; i++) {
                square = "" + x + (i + 1);
                if (squaresPC[square] === "B") {
                    if (squaresID[square] === blackKing.id) {
                    checkingPieces.push(id);
                    blackKInCheck = true;
                    }
                    break;
                } else if (squaresOC[square] === true){
                    break;
                }
            }
            for (let i = y; i > 1; i--) {
                square = "" + x + (i - 1);
                if (squaresPC[square] === "B") {
                    if (squaresID[square] === blackKing.id) {
                    checkingPieces.push(id);
                    blackKInCheck = true;
                    }
                    break;
                } else if (squaresOC[square] === true){
                    break;
                }
            }
            for (let i = x, j = y; i < 8, j < 8; i++, j++) {
                square = "" + (i + 1) + (j + 1);
                if (squaresPC[square] === "B") {
                    if (squaresID[square] === blackKing.id) {
                    checkingPieces.push(id);
                    blackKInCheck = true;
                    }
                    break;
                } else if (squaresOC[square] === true){
                    break;
                }
            }
            for (let i = x, j = y; i < 8, j > 1; i++, j--) {
                square = "" + (i + 1) + (j - 1);
                if (squaresPC[square] === "B") {
                    if (squaresID[square] === blackKing.id) {
                    checkingPieces.push(id);
                    blackKInCheck = true;
                    }
                    break;
                } else if (squaresOC[square] === true){
                    break;
                }
            }
            for (let i = x, j = y; i > 1, j > 1; i--, j--) {
                square = "" + (i - 1) + (j - 1);
                if (squaresPC[square] === "B") {
                    if (squaresID[square] === blackKing.id) {
                    checkingPieces.push(id);
                    blackKInCheck = true;
                    }
                    break;
                } else if (squaresOC[square] === true){
                    break;
                }
            }
            for (let i = x, j = y; i > 1, j < 8; i--, j++) {
                square = "" + (i - 1) + (j + 1);
                if (squaresPC[square] === "B") {
                    if (squaresID[square] === blackKing.id) {
                    checkingPieces.push(id);
                    blackKInCheck = true;
                    }
                    break;
                } else if (squaresOC[square] === true){
                    break;
                }
            }
        }
        if (pieceType === "queenB") {
            for (let i = x; i < 8; i++) {
                square = "" + (i + 1) + y;
                if (squaresPC[square] === "W") {
                    if (squaresID[square] === whiteKing.id) {
                    checkingPieces.push(id);
                    blackKInCheck = true;
                    }
                    break;
                } else if (squaresOC[square] === true){
                    break;
                }
            }
            for (let i = x; i > 1; i--) {
                square = "" + (i - 1) + y;
                if (squaresPC[square] === "W") {
                    if (squaresID[square] === whiteKing.id) {
                    checkingPieces.push(id);
                    blackKInCheck = true;
                    }
                    break;
                } else if (squaresOC[square] === true){
                    break;
                }
            }
            for (let i = y; i < 8; i++) {
                square = "" + x + (i + 1);
                if (squaresPC[square] === "W") {
                    if (squaresID[square] === whiteKing.id) {
                    checkingPieces.push(id);
                    blackKInCheck = true;
                    }
                    break;
                } else if (squaresOC[square] === true){
                    break;
                }
            }
            for (let i = y; i > 1; i--) {
                square = "" + x + (i - 1);
                if (squaresPC[square] === "W") {
                    if (squaresID[square] === whiteKing.id) {
                    checkingPieces.push(id);
                    blackKInCheck = true;
                    }
                    break;
                } else if (squaresOC[square] === true){
                    break;
                }
            }
            for (let i = x, j = y; i < 8, j < 8; i++, j++) {
                square = "" + (i + 1) + (j + 1);
                if (squaresPC[square] === "W") {
                    if (squaresID[square] === whiteKing.id) {
                    checkingPieces.push(id);
                    blackKInCheck = true;
                    }
                    break;
                } else if (squaresOC[square] === true){
                    break;
                }
            }
            for (let i = x, j = y; i < 8, j > 1; i++, j--) {
                square = "" + (i + 1) + (j - 1);
                if (squaresPC[square] === "W") {
                    if (squaresID[square] === whiteKing.id) {
                    checkingPieces.push(id);
                    blackKInCheck = true;
                    }
                    break;
                } else if (squaresOC[square] === true){
                    break;
                }
            }
            for (let i = x, j = y; i > 1, j > 1; i--, j--) {
                square = "" + (i - 1) + (j - 1);
                if (squaresPC[square] === "W") {
                    if (squaresID[square] === whiteKing.id) {
                    checkingPieces.push(id);
                    blackKInCheck = true;
                    }
                    break;
                } else if (squaresOC[square] === true){
                    break;
                }
            }
            for (let i = x, j = y; i > 1, j < 8; i--, j++) {
                square = "" + (i - 1) + (j + 1);
                if (squaresPC[square] === "W") {
                    if (squaresID[square] === whiteKing.id) {
                    checkingPieces.push(id);
                    blackKInCheck = true;
                    }
                    break;
                } else if (squaresOC[square] === true){
                    break;
                }
            }
        }
    if (checkingPieces.length > 0){
    console.log(checkingPieces);
    }
}