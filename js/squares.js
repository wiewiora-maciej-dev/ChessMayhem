import { blackKInCheck, pawnsMoved, whiteKInCheck } from "./pieces.js";
import { kingBMoved, kingWMoved, pawnMoved2, rookA1Moved, rookA8Moved, rookH1Moved, rookH8Moved } from "./game.js";
import { highlight, unhighlight } from "./visual.js";

//-------------------Zmienne------------------//
export let squaresHL = {}; //Podswietlone Pola
export let squaresOC = {}; //Okupowane Pola
export let squaresPC = {}; //Kolor Figury Na Polu
export let squaresID = {}; //Jakie Id figury na polu
export let enPassantTarget = null;
//--------------------------------------------//

export function position(column,row) {
    let left = 100*column-100;
    let bottom = 100*row-100;
    return {X: left, Y: bottom}
}

export function square(left, bottom) {
    let x = parseInt(left)/100 + 1;
    let y = parseInt(bottom)/100 + 1;

    return { x: x, y: y };
}

export function ocupySquare(x, y, color) {
    squaresOC["" + x + y] = true;
    squaresPC["" + x + y] = color;
};

export function highlightSquare(id, pieceType, x, y) {
    enPassantTarget = null;
    unhighlight();
    squaresHL = {};
    //console.log("Picking squares to highlight");
    if (pieceType === "pawnW") {
        let square = "" + x + y;
        squaresHL[square] = true;
        if (pawnsMoved[id] !== true) {
            square = "" + x + (y + 1);
            if (squaresOC[square] !== true) {
                square = "" + x + (y + 2);
                if (squaresOC[square] !== true) {
                    squaresHL[square] = true;
                }
            }
        }
        square = "" + x + (y + 1);
        if (squaresOC[square] !== true) {
            squaresHL[square] = true;
        }
        if (x < 8) {
            square = "" + (x + 1) + (y + 1);
            if (squaresPC[square] === "B") {
                squaresHL[square] = true;
            }
        }
        if (x > 1) {
            square = "" + (x - 1) + (y + 1);
            if (squaresPC[square] === "B") {
                squaresHL[square] = true;
            }
        }
        if (
            pawnMoved2.state === true &&
            pawnMoved2.color === "black" &&
            pawnMoved2.row === y &&
            Math.abs(pawnMoved2.column - x) === 1
        ) {
            square = "" + pawnMoved2.column + (y + 1);
            squaresHL[square] = true;

            enPassantTarget = {
                column: pawnMoved2.column,
                row: pawnMoved2.row
            };
        }
    };
    if (pieceType === "pawnB") {
        let square = "" + x + y;
        squaresHL[square] = true;

        if (pawnsMoved[id] !== true) {
            square = "" + x + (y - 1);
            if (squaresOC[square] !== true) {
                square = "" + x + (y - 2);
                if (squaresOC[square] !== true) {
                    squaresHL[square] = true;
                }
            }
        }

        square = "" + x + (y - 1);
        if (squaresOC[square] !== true) {
            squaresHL[square] = true;
        }

        if (x < 8) {
            square = "" + (x + 1) + (y - 1);
            if (squaresPC[square] === "W") {
                squaresHL[square] = true;
            }
        }

        if (x > 1) {
            square = "" + (x - 1) + (y - 1);
            if (squaresPC[square] === "W") {
                squaresHL[square] = true;
            }
        }

        if (
            pawnMoved2.state === true &&
            pawnMoved2.color === "white" &&
            pawnMoved2.row === y &&
            Math.abs(pawnMoved2.column - x) === 1
        ) {
            square = "" + pawnMoved2.column + (y - 1);
            squaresHL[square] = true;

            enPassantTarget = {
                column: pawnMoved2.column,
                row: pawnMoved2.row
            };
        }
    }
    if (pieceType === "rookW") {
        let square = "" + x + y;
        squaresHL[square] = true;
        for (let i = x; i < 8; i++) {
            square = "" + (i + 1) + y;
            if (squaresPC[square] === "B") {
                squaresHL[square] = true;
                break;
            } else if (squaresOC[square] === true){
                break;
            } else {
                squaresHL[square] = true;
            }
        }
        for (let i = x; i > 1; i--) {
            square = "" + (i - 1) + y;
            if (squaresPC[square] === "B") {
                squaresHL[square] = true;
                break;
            } else if (squaresOC[square] === true){
                break;
            } else {
                squaresHL[square] = true;
            }
        }
        for (let i = y; i < 8; i++) {
            square = "" + x + (i + 1);
            if (squaresPC[square] === "B") {
                squaresHL[square] = true;
                break;
            } else if (squaresOC[square] === true){
                break;
            } else {
                squaresHL[square] = true;
            }
        }
        for (let i = y; i > 1; i--) {
            square = "" + x + (i - 1);
            if (squaresPC[square] === "B") {
                squaresHL[square] = true;
                break;
            } else if (squaresOC[square] === true){
                break;
            } else {
                squaresHL[square] = true;
            }
        }
    }
    if (pieceType === "rookB") {
        let square = "" + x + y;
        squaresHL[square] = true;
        for (let i = x; i < 8; i++) {
            square = "" + (i + 1) + y;
            if (squaresPC[square] === "W") {
                squaresHL[square] = true;
                break;
            } else if (squaresOC[square] === true){
                break;
            } else {
                squaresHL[square] = true;
            }
        }
        for (let i = x; i > 1; i--) {
            square = "" + (i - 1) + y;
            if (squaresPC[square] === "W") {
                squaresHL[square] = true;
                break;
            } else if (squaresOC[square] === true){
                break;
            } else {
                squaresHL[square] = true;
            }
        }
        for (let i = y; i < 8; i++) {
            square = "" + x + (i + 1);
            if (squaresPC[square] === "W") {
                squaresHL[square] = true;
                break;
            } else if (squaresOC[square] === true){
                break;
            } else {
                squaresHL[square] = true;
            }
        }
        for (let i = y; i > 1; i--) {
            square = "" + x + (i - 1);
            if (squaresPC[square] === "W") {
                squaresHL[square] = true;
                break;
            } else if (squaresOC[square] === true){
                break;
            } else {
                squaresHL[square] = true;
            }
        }
    }
    if (pieceType === "knightW") {
        let square = "" + x + y;
            squaresHL[square] = true;
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
            if (squaresOC[square] !== true) {
                squaresHL[square] = true;
            } else if (squaresPC[square] === "B") {
                squaresHL[square] = true;
            };
        };
    }
    if (pieceType === "knightB") {
        let square = "" + x + y;
            squaresHL[square] = true;
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
            if (squaresOC[square] !== true) {
                squaresHL[square] = true;
            } else if (squaresPC[square] === "W") {
                squaresHL[square] = true;
            };
        };
    };
    if (pieceType === "bishopW") {
        let square = "" + x + y;
        squaresHL[square] = true;
        for (let i = x, j = y; i < 8, j < 8; i++, j++) {
            square = "" + (i + 1) + (j + 1);
            if (squaresPC[square] === "B") {
                squaresHL[square] = true;
                break;
            } else if (squaresOC[square] === true){
                break;
            } else {
                squaresHL[square] = true;
            }
        }
        for (let i = x, j = y; i < 8, j > 1; i++, j--) {
            square = "" + (i + 1) + (j - 1);
            if (squaresPC[square] === "B") {
                squaresHL[square] = true;
                break;
            } else if (squaresOC[square] === true){
                break;
            } else {
                squaresHL[square] = true;
            }
        }
        for (let i = x, j = y; i > 1, j > 1; i--, j--) {
            square = "" + (i - 1) + (j - 1);
            if (squaresPC[square] === "B") {
                squaresHL[square] = true;
                break;
            } else if (squaresOC[square] === true){
                break;
            } else {
                squaresHL[square] = true;
            }
        }
        for (let i = x, j = y; i > 1, j < 8; i--, j++) {
            square = "" + (i - 1) + (j + 1);
            if (squaresPC[square] === "B") {
                squaresHL[square] = true;
                break;
            } else if (squaresOC[square] === true){
                break;
            } else {
                squaresHL[square] = true;
            }
        }
    }
    if (pieceType === "bishopB") {
        let square = "" + x + y;
        squaresHL[square] = true;
        for (let i = x, j = y; i < 8, j < 8; i++, j++) {
            square = "" + (i + 1) + (j + 1);
            if (squaresPC[square] === "W") {
                squaresHL[square] = true;
                break;
            } else if (squaresOC[square] === true){
                break;
            } else {
                squaresHL[square] = true;
            }
        }
        for (let i = x, j = y; i < 8, j > 1; i++, j--) {
            square = "" + (i + 1) + (j - 1);
            if (squaresPC[square] === "W") {
                squaresHL[square] = true;
                break;
            } else if (squaresOC[square] === true){
                break;
            } else {
                squaresHL[square] = true;
            }
        }
        for (let i = x, j = y; i > 1, j > 1; i--, j--) {
            square = "" + (i - 1) + (j - 1);
            if (squaresPC[square] === "W") {
                squaresHL[square] = true;
                break;
            } else if (squaresOC[square] === true){
                break;
            } else {
                squaresHL[square] = true;
            }
        }
        for (let i = x, j = y; i > 1, j < 8; i--, j++) {
            square = "" + (i - 1) + (j + 1);
            if (squaresPC[square] === "W") {
                squaresHL[square] = true;
                break;
            } else if (squaresOC[square] === true){
                break;
            } else {
                squaresHL[square] = true;
            }
        }
    }
    if (pieceType === "queenW") {
        let square = "" + x + y;
        squaresHL[square] = true;
        for (let i = x; i < 8; i++) {
            square = "" + (i + 1) + y;
            if (squaresPC[square] === "B") {
                squaresHL[square] = true;
                break;
            } else if (squaresOC[square] === true){
                break;
            } else {
                squaresHL[square] = true;
            }
        }
        for (let i = x; i > 1; i--) {
            square = "" + (i - 1) + y;
            if (squaresPC[square] === "B") {
                squaresHL[square] = true;
                break;
            } else if (squaresOC[square] === true){
                break;
            } else {
                squaresHL[square] = true;
            }
        }
        for (let i = y; i < 8; i++) {
            square = "" + x + (i + 1);
            if (squaresPC[square] === "B") {
                squaresHL[square] = true;
                break;
            } else if (squaresOC[square] === true){
                break;
            } else {
                squaresHL[square] = true;
            }
        }
        for (let i = y; i > 1; i--) {
            square = "" + x + (i - 1);
            if (squaresPC[square] === "B") {
                squaresHL[square] = true;
                break;
            } else if (squaresOC[square] === true){
                break;
            } else {
                squaresHL[square] = true;
            }
        }
        for (let i = x, j = y; i < 8, j < 8; i++, j++) {
            square = "" + (i + 1) + (j + 1);
            if (squaresPC[square] === "B") {
                squaresHL[square] = true;
                break;
            } else if (squaresOC[square] === true){
                break;
            } else {
                squaresHL[square] = true;
            }
        }
        for (let i = x, j = y; i < 8, j > 1; i++, j--) {
            square = "" + (i + 1) + (j - 1);
            if (squaresPC[square] === "B") {
                squaresHL[square] = true;
                break;
            } else if (squaresOC[square] === true){
                break;
            } else {
                squaresHL[square] = true;
            }
        }
        for (let i = x, j = y; i > 1, j > 1; i--, j--) {
            square = "" + (i - 1) + (j - 1);
            if (squaresPC[square] === "B") {
                squaresHL[square] = true;
                break;
            } else if (squaresOC[square] === true){
                break;
            } else {
                squaresHL[square] = true;
            }
        }
        for (let i = x, j = y; i > 1, j < 8; i--, j++) {
            square = "" + (i - 1) + (j + 1);
            if (squaresPC[square] === "B") {
                squaresHL[square] = true;
                break;
            } else if (squaresOC[square] === true){
                break;
            } else {
                squaresHL[square] = true;
            }
        }
    }
    if (pieceType === "queenB") {
        let square = "" + x + y;
        squaresHL[square] = true;
        for (let i = x; i < 8; i++) {
            square = "" + (i + 1) + y;
            if (squaresPC[square] === "W") {
                squaresHL[square] = true;
                break;
            } else if (squaresOC[square] === true){
                break;
            } else {
                squaresHL[square] = true;
            }
        }
        for (let i = x; i > 1; i--) {
            square = "" + (i - 1) + y;
            if (squaresPC[square] === "W") {
                squaresHL[square] = true;
                break;
            } else if (squaresOC[square] === true){
                break;
            } else {
                squaresHL[square] = true;
            }
        }
        for (let i = y; i < 8; i++) {
            square = "" + x + (i + 1);
            if (squaresPC[square] === "W") {
                squaresHL[square] = true;
                break;
            } else if (squaresOC[square] === true){
                break;
            } else {
                squaresHL[square] = true;
            }
        }
        for (let i = y; i > 1; i--) {
            square = "" + x + (i - 1);
            if (squaresPC[square] === "W") {
                squaresHL[square] = true;
                break;
            } else if (squaresOC[square] === true){
                break;
            } else {
                squaresHL[square] = true;
            }
        }
        for (let i = x, j = y; i < 8, j < 8; i++, j++) {
            square = "" + (i + 1) + (j + 1);
            if (squaresPC[square] === "W") {
                squaresHL[square] = true;
                break;
            } else if (squaresOC[square] === true){
                break;
            } else {
                squaresHL[square] = true;
            }
        }
        for (let i = x, j = y; i < 8, j > 1; i++, j--) {
            square = "" + (i + 1) + (j - 1);
            if (squaresPC[square] === "W") {
                squaresHL[square] = true;
                break;
            } else if (squaresOC[square] === true){
                break;
            } else {
                squaresHL[square] = true;
            }
        }
        for (let i = x, j = y; i > 1, j > 1; i--, j--) {
            square = "" + (i - 1) + (j - 1);
            if (squaresPC[square] === "W") {
                squaresHL[square] = true;
                break;
            } else if (squaresOC[square] === true){
                break;
            } else {
                squaresHL[square] = true;
            }
        }
        for (let i = x, j = y; i > 1, j < 8; i--, j++) {
            square = "" + (i - 1) + (j + 1);
            if (squaresPC[square] === "W") {
                squaresHL[square] = true;
                break;
            } else if (squaresOC[square] === true){
                break;
            } else {
                squaresHL[square] = true;
            }
        }
    }
    if (pieceType === "kingW") {
        let square = "" + x + y;
            squaresHL[square] = true;
        let moves = [
            [0, 1],
            [1, 1],
            [1, 0],
            [1, -1],
            [0, -1],
            [-1, -1],
            [-1, 0],
            [-1, 1]
        ];
        for (let i = 0; i < moves.length; i++) {
            let targetX = x + moves[i][0];
            let targetY = y + moves[i][1];
            if (targetX < 1 || targetX > 8 || targetY < 1 || targetY > 8) {
                continue;
            }
            let square = "" + targetX + targetY;
            if (squaresOC[square] !== true) {
                squaresHL[square] = true;
            } else if (squaresPC[square] === "B") {
                squaresHL[square] = true;
            };
        };
        if (!kingWMoved || !rookA1Moved) {
            let square1 = "" + (x - 1) + y; // d1
            let square2 = "" + (x - 2) + y; // c1
            let square3 = "" + (x - 3) + y; // b1

            if (
                squaresOC[square1] !== true &&
                squaresOC[square2] !== true &&
                squaresOC[square3] !== true
            ) {
                squaresHL[square2] = true; // podświetla c1
            }
        }
        if (!kingWMoved && !rookH1Moved) {
            if (!whiteKInCheck) {
                let square1 = "" + (x + 1) + y; // f1
                let square2 = "" + (x + 2) + y; // g1

                if (
                    squaresOC[square1] !== true &&
                    squaresOC[square2] !== true
                ) {
                    squaresHL[square2] = true; // podświetla g1
                }
            }
        }
    };
    if (pieceType === "kingB") {
        let square = "" + x + y;
            squaresHL[square] = true;
        let moves = [
            [0, 1],
            [1, 1],
            [1, 0],
            [1, -1],
            [0, -1],
            [-1, -1],
            [-1, 0],
            [-1, 1]
        ];
        for (let i = 0; i < moves.length; i++) {
            let targetX = x + moves[i][0];
            let targetY = y + moves[i][1];
            if (targetX < 1 || targetX > 8 || targetY < 1 || targetY > 8) {
                continue;
            }
            let square = "" + targetX + targetY;
            if (squaresOC[square] !== true) {
                squaresHL[square] = true;
            } else if (squaresPC[square] === "W") {
                squaresHL[square] = true;
            };
        };
        if (!kingBMoved && !rookA8Moved) {
            if (!blackKInCheck) {

                let square1 = "" + (x - 1) + y; // d8
                let square2 = "" + (x - 2) + y; // c8
                let square3 = "" + (x - 3) + y; // b8

                if (
                    squaresOC[square1] !== true &&
                    squaresOC[square2] !== true &&
                    squaresOC[square3] !== true
                ) {
                    squaresHL[square2] = true; // c8
                }
            }
        }
        if (!kingBMoved && !rookH8Moved) {
            
            let square1 = "" + (x + 1) + y; // f8
            let square2 = "" + (x + 2) + y; // g8

            if (
                squaresOC[square1] !== true &&
                squaresOC[square2] !== true
            ) {
                squaresHL[square2] = true; // g8
            }
        }
    };
    highlight();
    return;
}

export function writeSquare(id, x, y) {
    let square = "" + x + y;
    squaresID[square] = id;
    if (id === null) {
        squaresOC[square] = false;
        squaresPC[square] = null;
    } else {
        squaresOC[square] = true;
        let piece = document.getElementById(id);
        if (piece.classList[0].at(-1) === "W") {
            squaresPC[square] = "W";
        } else if (piece.classList[0].at(-1) === "B") {
            squaresPC[square] = "B";
        } else {
            squaresPC[square] = null;
        }
    }
    //console.log("Nadpisano " + x + y + " na: " + id);
}