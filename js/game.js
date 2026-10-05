//----------------Importowanie----------------//
import { gameRunning } from "./main.js";
import { checkAllChecks, deletePiece, movePiece, promotePawn } from "./pieces.js";
import { highlightSquare, square, writeSquare } from "./squares.js";
import { unhighlight } from "./visual.js";
//--------------------------------------------//

//-------------------Zmienne------------------//
let pieceChosen = null;
let pieceIDChosen = null;
export let pawnMoved2 = {
    state: false,
    color: null,
    column: null,
    row: null
    };
export let rookW1Moved = false;
export let rookW2Moved = false;
export let rookB1Moved = false;
export let rookB2Moved = false;
export let kingWMoved = false;
export let kingBMoved = false;
//--------------------------------------------//

export function runGame() {
    if (!gameRunning) {
        return;
    }

    document.querySelectorAll(".piece").forEach(function(piece) {
        piece.addEventListener("click", function(event) {
            let id = piece.id;
            let LeftS = piece.style.left;
            let ClassS = piece.classList[0];
            let BottomS = piece.style.bottom;
            let SquareS = square(LeftS, BottomS)
            highlightSquare(id, ClassS, SquareS.x, SquareS.y);
            //console.log("Id: "+id+" Piece: "+ClassS+" Left: "+LeftS+ " Bottom: "+BottomS+" Position: "+SquareS.x + SquareS.y);
            pieceChosen = true;
            pieceIDChosen = id;
            waitForSecondInput();
        });
    });
};

function waitForSecondInput() {
    if (pieceChosen !== true) {
        return;
    }
    document.querySelectorAll(".highlight-hitbox").forEach(function(highlight) {
        highlight.addEventListener("click", function(event) {
            let piece = document.getElementById(pieceIDChosen);
            let LeftL = highlight.style.left;
            let BottomL = highlight.style.bottom;
            let PieceLeftL = piece.style.left;
            let PieceBottomL = piece.style.bottom;
            let previousSquere = square(PieceLeftL,PieceBottomL);
            let targetSquere = square(LeftL,BottomL);
            pieceRules(piece,previousSquere,targetSquere);
        });
    });
};

function pawnMoved2SQuares(piece, x1, y1, x2, y2) {
    let pieceClass = piece.classList[0];
    let result = {
        state: false,
        color: null,
        column: null,
        row: null
    };
    if (pieceClass !== "pawnW" && pieceClass !== "pawnB") {
        return result;
    }
    if (x1 === x2 && Math.abs(y1 - y2) === 2) {
        result.state = true;
        if (pieceClass === "pawnW") {
            result.color = "white";
        } else {
            result.color = "black";
        }
        result.column = x2;
        result.row = y2;
    }
    return result;
}

function pieceRules(piece, previousSquere, targetSquere) {  
    let targetColumn = targetSquere.x;
    let targetRow = targetSquere.y;
    
    // console.log("=== EN PASSANT DEBUG ===");
    // console.log("piece:", piece.classList[0]);
    // console.log("target:", targetColumn, targetRow);
    // console.log("pawnMoved2:", pawnMoved2);
    
    if (
    piece.classList[0] === "pawnW" ||
    piece.classList[0] === "pawnB"
    ) {
        if (
            (piece.classList[0] === "pawnW" || piece.classList[0] === "pawnB") &&
            (targetRow === 8 || targetRow === 1)
        ) {
            //console.log("promote");
            promotePawn(piece);
        }
        if (
            piece.classList[0] === "pawnW" &&
            pawnMoved2.state === true &&
            pawnMoved2.color === "black" &&
            targetColumn === pawnMoved2.column &&
            targetRow === pawnMoved2.row + 1
        ) {
            //console.log("EN PASSANT BIAŁY");
            writeSquare(null, previousSquere.x, previousSquere.y);
            movePiece(pieceIDChosen, targetColumn, targetRow);
            writeSquare(pieceIDChosen, targetSquere.x, targetSquere.y);
            deletePiece(targetSquere.x, targetSquere.y - 1);
            writeSquare(null, targetSquere.x, targetSquere.y - 1);

            pawnMoved2 = pawnMoved2SQuares( piece, previousSquere.x, previousSquere.y, targetSquere.x, targetSquere.y);
            unhighlight();
            return;
        }
        if (
            piece.classList[0] === "pawnB" &&
            pawnMoved2.state === true &&
            pawnMoved2.color === "white" &&
            targetColumn === pawnMoved2.column &&
            targetRow === pawnMoved2.row - 1
        ) {
            //console.log("EN PASSANT CZARNY");
            writeSquare(null,previousSquere.x,previousSquere.y);
            movePiece(pieceIDChosen,targetColumn,targetRow);
            writeSquare(pieceIDChosen,targetSquere.x,targetSquere.y);
            deletePiece(targetSquere.x, targetSquere.y + 1);
            writeSquare(null, targetSquere.x, targetSquere.y + 1);

            pawnMoved2 = pawnMoved2SQuares( piece, previousSquere.x, previousSquere.y, targetSquere.x, targetSquere.y);
            unhighlight();
            return;
        }
    }
    if (
        targetSquere.x !== previousSquere.x ||
        targetSquere.y !== previousSquere.y
    ) {
        writeSquare(null,previousSquere.x,previousSquere.y);
        movePiece(pieceIDChosen,targetColumn,targetRow);
        writeSquare(pieceIDChosen,targetSquere.x,targetSquere.y);
    } else {
        console.log("nie ruszono figury");
        pawnMoved2 = pawnMoved2SQuares( piece, previousSquere.x, previousSquere.y, targetSquere.x, targetSquere.y);
        unhighlight();
        return;
    }
    checkAllChecks();
    pawnMoved2 = pawnMoved2SQuares( piece, previousSquere.x, previousSquere.y, targetSquere.x, targetSquere.y);
    unhighlight();
}