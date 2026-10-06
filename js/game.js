//----------------Importowanie----------------//
import { gameRunning } from "./main.js";
import { blackKInCheck, checkAllChecks, checkingPieces, deletePiece, movePiece, promotePawn, whiteKInCheck } from "./pieces.js";
import { highlightSquare, position, square, squaresID, squaresHL, writeSquare, squaresOC } from "./squares.js";
import { unhighlight, showGameOver, showCheckingPieces } from "./visual.js";
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
export let kingWMoved = false;
export let kingBMoved = false;

export let rookA1Moved = false; // biała wieża z a1
export let rookH1Moved = false; // biała wieża z h1

export let rookA8Moved = false; // czarna wieża z a8
export let rookH8Moved = false; // czarna wieża z h8
let moveColor = "W";
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
            // console.log("moveColor:", moveColor);
            // console.log("piece:", piece.classList[0]);
            if (!piece.classList[0].endsWith(moveColor)) {
                return;
            }

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

    let previousColumn = previousSquere.x;
    let previousRow = previousSquere.y;

    // ROSZADA
    if (
        (piece.classList.contains("kingW") && !kingWMoved) ||
        (piece.classList.contains("kingB") && !kingBMoved)
    ) {

        // =========================
        // ROSZADA W LEWO
        // =========================
        if (
            previousColumn === 5 &&
            targetColumn === 3 &&
            previousRow === targetRow
        ) {

            let rook;

            if (piece.classList.contains("kingW")) {

                if (rookA1Moved) return false;

                rook = document.getElementById("0");

                if (
                    squaresOC["41"] === true ||
                    squaresOC["31"] === true ||
                    squaresOC["21"] === true
                ) {
                    return false;
                }

            } else {

                if (rookA8Moved) return false;

                rook = document.getElementById("24");

                if (
                    squaresOC["48"] === true ||
                    squaresOC["38"] === true ||
                    squaresOC["28"] === true
                ) {
                    return false;
                }
            }


            // =========================
            // SPRAWDZENIE POLA POŚREDNIEGO
            // =========================

            piece.style.left = ((previousColumn - 1) * 100 - 100) + "px";
            writeSquare(piece.id, previousColumn - 1, previousRow)
            checkAllChecks();

            if (
                whiteKInCheck || blackKInCheck
            ) {
                showCheckingPieces(checkingPieces);
                piece.style.left = ((previousColumn) * 100 - 100) + "px";
                writeSquare(null, previousColumn - 1, previousRow)
                checkAllChecks();

                return false;
            }


            // =========================
            // SPRAWDZENIE POLA KOŃCOWEGO
            // =========================

            piece.style.left = ((previousColumn - 2) * 100 - 100) + "px";
            writeSquare(piece.id, previousColumn - 2, previousRow)
            checkAllChecks();

            if (
                whiteKInCheck || blackKInCheck
            ) {
                showCheckingPieces(checkingPieces);
                piece.style.left = ((previousColumn) * 100 - 100) + "px";
                writeSquare(null, previousColumn - 1, previousRow)
                writeSquare(null, previousColumn - 2, previousRow)
                checkAllChecks();
                kingWMoved = true;
                rookA1Moved = true;
                return false;
            }


            // =========================
            // PRZESUNIĘCIE WIEŻY
            // =========================

            rook.style.left = ((previousColumn - 1) * 100 - 100) + "px";
            writeSquare(rook.id, previousColumn - 1, previousRow)
            writeSquare(null, previousColumn - 4, previousRow)
            writeSquare(null, previousColumn, previousRow)
            unhighlight();

            checkAllChecks();

            if (whiteKInCheck || blackKInCheck) {
                showCheckingPieces(checkingPieces);
            }

            changeMoveColor();
            return true;
        }


        // =========================
        // ROSZADA W PRAWO
        // =========================

        if (
            previousColumn === 5 &&
            targetColumn === 7 &&
            previousRow === targetRow
        ) {

            let rook;

            if (piece.classList.contains("kingW")) {

                if (rookH1Moved) return false;

                rook = document.getElementById("7");

                if (
                    squaresOC["61"] === true ||
                    squaresOC["71"] === true
                ) {
                    return false;
                }

            } else {

                if (rookH8Moved) return false;

                rook = document.getElementById("31");

                if (
                    squaresOC["68"] === true ||
                    squaresOC["78"] === true
                ) {
                    return false;
                }
            }


            // =========================
            // SPRAWDZENIE POLA POŚREDNIEGO
            // =========================

            piece.style.left = ((previousColumn + 1) * 100 - 100) + "px";
            writeSquare(piece.id, previousColumn + 1, previousRow);
            checkAllChecks();

            if (
                (piece.classList.contains("kingW") && whiteKInCheck) ||
                (piece.classList.contains("kingB") && blackKInCheck)
            ) {

                showCheckingPieces(checkingPieces);

                writeSquare(null, previousColumn + 1, previousRow);
                writeSquare(piece.id, previousColumn, previousRow);

                piece.style.left = ((previousColumn) * 100 - 100) + "px";

                checkAllChecks();

                return false;
            }


            // =========================
            // SPRAWDZENIE POLA KOŃCOWEGO
            // =========================

            // usuwamy króla z pola pośredniego
            writeSquare(null, previousColumn + 1, previousRow);

            piece.style.left = ((previousColumn + 2) * 100 - 100) + "px";
            writeSquare(piece.id, previousColumn + 2, previousRow);
            checkAllChecks();

            if (
                (piece.classList.contains("kingW") && whiteKInCheck) ||
                (piece.classList.contains("kingB") && blackKInCheck)
            ) {

                showCheckingPieces(checkingPieces);

                writeSquare(null, previousColumn + 2, previousRow);
                writeSquare(piece.id, previousColumn, previousRow);

                piece.style.left = ((previousColumn) * 100 - 100) + "px";

                checkAllChecks();

                return false;
            }


            // =========================
            // PRZESUNIĘCIE WIEŻY
            // =========================

            rook.style.left = ((previousColumn + 1) * 100 - 100) + "px";

            writeSquare(rook.id, previousColumn + 1, previousRow);

            // usuwamy starą pozycję wieży
            writeSquare(null, previousColumn + 3, previousRow);

            // usuwamy starą pozycję króla
            writeSquare(null, previousColumn, previousRow);

            unhighlight();

            checkAllChecks();

            if (
                (piece.classList.contains("kingW") && whiteKInCheck) ||
                (piece.classList.contains("kingB") && blackKInCheck)
            ) {
                showCheckingPieces(checkingPieces);
            }

            changeMoveColor();
            return true;
        }
    }

    // ==========================================
    // PROMOCJA
    // ==========================================

    if (
        piece.classList[0] === "pawnW" ||
        piece.classList[0] === "pawnB"
    ) {

        if (targetRow === 8 || targetRow === 1) {
            promotePawn(piece);
        }


        // ==========================================
        // EN PASSANT - BIAŁY
        // ==========================================

        if (
            piece.classList[0] === "pawnW" &&
            pawnMoved2.state === true &&
            pawnMoved2.color === "black" &&
            targetColumn === pawnMoved2.column &&
            targetRow === pawnMoved2.row + 1
        ) {

            // Usunięcie piona z poprzedniego pola
            writeSquare(
                null,
                previousColumn,
                previousRow
            );


            // Przesunięcie białego piona
            movePiece(
                pieceIDChosen,
                targetColumn,
                targetRow
            );


            writeSquare(
                pieceIDChosen,
                targetColumn,
                targetRow
            );


            // Usunięcie czarnego piona
            deletePiece(
                targetColumn,
                targetRow - 1
            );


            writeSquare(
                null,
                targetColumn,
                targetRow - 1
            );


            // Sprawdzenie szacha
            checkingPieces.length = 0;
            checkAllChecks();


            // ==========================================
            // NIELEGALNY EN PASSANT
            // ==========================================

            if (whiteKInCheck) {

                showCheckingPieces(checkingPieces);

                console.log(
                    "Nie można wykonać ruchu - biały król jest w szachu."
                );


                // Cofnięcie ruchu białego piona
                writeSquare(
                    null,
                    targetColumn,
                    targetRow
                );

                movePiece(
                    pieceIDChosen,
                    previousColumn,
                    previousRow
                );

                writeSquare(
                    pieceIDChosen,
                    previousColumn,
                    previousRow
                );


                // Przywrócenie zbitego czarnego piona
                let restoredPiece = document.createElement("div");

                restoredPiece.id =
                    pawnMoved2.column + pawnMoved2.row;

                restoredPiece.classList.add("pawnB");
                restoredPiece.classList.add("piece");


                let restoredPosition = position(
                    pawnMoved2.column,
                    pawnMoved2.row
                );

                restoredPiece.style.left =
                    restoredPosition.X + "px";

                restoredPiece.style.bottom =
                    restoredPosition.Y + "px";


                document.querySelector(".chessboard").appendChild(
                    restoredPiece
                );


                writeSquare(
                    restoredPiece.id,
                    pawnMoved2.column,
                    pawnMoved2.row
                );


                runGame();

                checkAllChecks();

                unhighlight();

                return;
            }


            // ==========================================
            // LEGALNY EN PASSANT
            // ==========================================

            pawnMoved2 = pawnMoved2SQuares(
                piece,
                previousColumn,
                previousRow,
                targetColumn,
                targetRow
            );


            // Sprawdzenie czy ruch dał szacha
            if (whiteKInCheck || blackKInCheck) {
                showCheckingPieces(checkingPieces);
            }


            unhighlight();

            changeMoveColor();

            return;
        }



        // ==========================================
        // EN PASSANT - CZARNY
        // ==========================================

        if (
            piece.classList[0] === "pawnB" &&
            pawnMoved2.state === true &&
            pawnMoved2.color === "white" &&
            targetColumn === pawnMoved2.column &&
            targetRow === pawnMoved2.row - 1
        ) {

            // Usunięcie piona z poprzedniego pola
            writeSquare(
                null,
                previousColumn,
                previousRow
            );


            // Przesunięcie czarnego piona
            movePiece(
                pieceIDChosen,
                targetColumn,
                targetRow
            );


            writeSquare(
                pieceIDChosen,
                targetColumn,
                targetRow
            );


            // Usunięcie białego piona
            deletePiece(
                targetColumn,
                targetRow + 1
            );


            writeSquare(
                null,
                targetColumn,
                targetRow + 1
            );


            // Sprawdzenie szacha
            checkingPieces.length = 0;
            checkAllChecks();


            // ==========================================
            // NIELEGALNY EN PASSANT
            // ==========================================

            if (blackKInCheck) {

                showCheckingPieces(checkingPieces);

                console.log(
                    "Nie można wykonać ruchu - czarny król jest w szachu."
                );


                // Cofnięcie ruchu czarnego piona
                writeSquare(
                    null,
                    targetColumn,
                    targetRow
                );

                movePiece(
                    pieceIDChosen,
                    previousColumn,
                    previousRow
                );

                writeSquare(
                    pieceIDChosen,
                    previousColumn,
                    previousRow
                );


                // Przywrócenie zbitego białego piona
                let restoredPiece = document.createElement("div");

                restoredPiece.id =
                    pawnMoved2.column + pawnMoved2.row;

                restoredPiece.classList.add("pawnW");
                restoredPiece.classList.add("piece");


                let restoredPosition = position(
                    pawnMoved2.column,
                    pawnMoved2.row
                );

                restoredPiece.style.left =
                    restoredPosition.X + "px";

                restoredPiece.style.bottom =
                    restoredPosition.Y + "px";


                document.querySelector(".chessboard").appendChild(
                    restoredPiece
                );


                writeSquare(
                    restoredPiece.id,
                    pawnMoved2.column,
                    pawnMoved2.row
                );


                runGame();

                checkAllChecks();

                unhighlight();

                return;
            }


            // ==========================================
            // LEGALNY EN PASSANT
            // ==========================================

            pawnMoved2 = pawnMoved2SQuares(
                piece,
                previousColumn,
                previousRow,
                targetColumn,
                targetRow
            );


            // Sprawdzenie czy ruch dał szacha
            if (whiteKInCheck || blackKInCheck) {
                showCheckingPieces(checkingPieces);
            }


            unhighlight();

            changeMoveColor();

            return;
        }
    }



    // ==========================================
    // RUCH NA TO SAMO POLE
    // ==========================================

    if (
        targetColumn === previousColumn &&
        targetRow === previousRow
    ) {

        console.log("nie ruszono figury");

        unhighlight();

        return;
    }



    // ==========================================
    // ZAPAMIĘTANIE ZBITEJ FIGURY
    // ==========================================

    let capturedPiece = document.getElementById(
        squaresID["" + targetColumn + targetRow]
    );

    let capturedPieceHTML = null;


    if (capturedPiece !== null) {
        capturedPieceHTML = capturedPiece.outerHTML;
    }



    // ==========================================
    // WYKONANIE RUCHU
    // ==========================================

    writeSquare(
        null,
        previousColumn,
        previousRow
    );


    movePiece(
        pieceIDChosen,
        targetColumn,
        targetRow
    );


    writeSquare(
        pieceIDChosen,
        targetColumn,
        targetRow
    );



    // ==========================================
    // SPRAWDZENIE SZACHA
    // ==========================================

    checkingPieces.length = 0;

    checkAllChecks();


    let ownKingInCheck;


    if (piece.classList[0].endsWith("W")) {
        ownKingInCheck = whiteKInCheck;
    } else {
        ownKingInCheck = blackKInCheck;
    }



    // ==========================================
    // RUCH NIELEGALNY
    // ==========================================

    if (ownKingInCheck) {

        // Pokazanie figur szachujących
        showCheckingPieces(checkingPieces);


        console.log(
            "Ruch niedozwolony - własny król nadal jest w szachu."
        );


        // ==========================================
        // COFNIĘCIE BIJĄCEJ FIGURY
        // ==========================================

        writeSquare(
            null,
            targetColumn,
            targetRow
        );


        movePiece(
            pieceIDChosen,
            previousColumn,
            previousRow
        );


        writeSquare(
            pieceIDChosen,
            previousColumn,
            previousRow
        );



        // ==========================================
        // PRZYWRÓCENIE ZBITEJ FIGURY
        // ==========================================

        if (capturedPieceHTML !== null) {

            let temp = document.createElement("div");

            temp.innerHTML = capturedPieceHTML;

            let restoredPiece = temp.firstElementChild;


            document.querySelector(".chessboard").appendChild(
                restoredPiece
            );


            writeSquare(
                restoredPiece.id,
                targetColumn,
                targetRow
            );
        }



        // ==========================================
        // PONOWNE SPRAWDZENIE SZACHA
        // ==========================================

        checkAllChecks();


        // ==========================================
        // PONOWNE PODPIĘCIE EVENTÓW
        // ==========================================

        runGame();

        unhighlight();

        return;
    }



    // ==========================================
    // RUCH LEGALNY
    // ==========================================

    pawnMoved2 = pawnMoved2SQuares(
        piece,
        previousColumn,
        previousRow,
        targetColumn,
        targetRow
    );

    if (piece.classList.contains("kingW")) {
        kingWMoved = true;
    }

    if (piece.classList.contains("kingB")) {
        kingBMoved = true;
    }

    if (piece.id === "0") {
        rookA1Moved = true;
    }

    if (piece.id === "7") {
        rookH1Moved = true;
    }

    if (piece.id === "24") {
        rookA8Moved = true;
    }

    if (piece.id === "31") {
        rookH8Moved = true;
    }


    unhighlight();


    // ==========================================
    // SPRAWDZENIE CZY RUCH DAŁ SZACHA
    // ==========================================

    checkAllChecks();


    if (whiteKInCheck || blackKInCheck) {
        showCheckingPieces(checkingPieces);
    }



    // ==========================================
    // ZMIANA TURY
    // ==========================================

    changeMoveColor();



    // ==========================================
    // SPRAWDZENIE MATA
    // ==========================================

    if (moveColor === "W") {

        if (whiteKInCheck) {

            if (checkMate("W")) {

                showGameOver("B");

                return;
            }
        }

    } else {

        if (blackKInCheck) {

            if (checkMate("B")) {

                showGameOver("W");

                return;
            }
        }
    }
}

function changeMoveColor() {
    if (moveColor === "W") {
        moveColor = "B"
    } else {
        moveColor = "W"
    }
}

function checkMate(color) {

    let kingInCheck;

    if (color === "W") {
        kingInCheck = whiteKInCheck;
    } else {
        kingInCheck = blackKInCheck;
    }

    // Jeżeli król nie jest w szachu,
    // nie może być mata.
    if (!kingInCheck) {
        return false;
    }

    console.log("Król " + color + " jest w szachu.");
    console.log("Sprawdzam możliwe ruchy...");

    // Pobieramy wszystkie figury danego koloru
    let pieces = [];

    document.querySelectorAll(".piece").forEach(function(piece) {

        if (piece.classList[0].endsWith(color)) {
            pieces.push(piece);
        }

    });

    // Sprawdzamy każdą figurę
    for (let i = 0; i < pieces.length; i++) {

        let currentPiece = pieces[i];

        let pieceLeft = currentPiece.style.left;
        let pieceBottom = currentPiece.style.bottom;

        let currentSquare = square(
            pieceLeft,
            pieceBottom
        );

        // Wygeneruj wszystkie możliwe ruchy tej figury
        highlightSquare(
            currentPiece.id,
            currentPiece.classList[0],
            currentSquare.x,
            currentSquare.y
        );

        // Kopiujemy listę pól,
        // żeby móc spokojnie ją przeglądać
        let possibleMoves = Object.keys(squaresHL);

        unhighlight();

        // Sprawdzamy każde możliwe pole
        for (let j = 0; j < possibleMoves.length; j++) {

            let target = possibleMoves[j];

            let targetColumn = Number(target.charAt(0));
            let targetRow = Number(target.slice(1));

            // Nie można wykonać ruchu na własne pole
            if (
                targetColumn === currentSquare.x &&
                targetRow === currentSquare.y
            ) {
                continue;
            }

            // ==========================================
            // ZAPIS STANU
            // ==========================================

            let capturedPiece = document.getElementById(
                squaresID[target]
            );

            let capturedPieceHTML = null;

            if (capturedPiece !== null) {
                capturedPieceHTML = capturedPiece.outerHTML;
            }

            let oldPieceLeft = currentPiece.style.left;
            let oldPieceBottom = currentPiece.style.bottom;

            let oldPawnMoved2 = {
                state: pawnMoved2.state,
                color: pawnMoved2.color,
                column: pawnMoved2.column,
                row: pawnMoved2.row
            };

            // ==========================================
            // WYKONANIE TESTOWEGO RUCHU
            // ==========================================

            writeSquare(
                null,
                currentSquare.x,
                currentSquare.y
            );

            movePiece(
                currentPiece.id,
                targetColumn,
                targetRow
            );

            writeSquare(
                currentPiece.id,
                targetColumn,
                targetRow
            );

            // ==========================================
            // SPRAWDZENIE SZACHA
            // ==========================================

            checkAllChecks();

            let stillInCheck;

            if (color === "W") {
                stillInCheck = whiteKInCheck;
            } else {
                stillInCheck = blackKInCheck;
            }

            // ==========================================
            // COFNIĘCIE TESTOWEGO RUCHU
            // ==========================================

            writeSquare(
                null,
                targetColumn,
                targetRow
            );

            currentPiece.style.left = oldPieceLeft;
            currentPiece.style.bottom = oldPieceBottom;

            writeSquare(
                currentPiece.id,
                currentSquare.x,
                currentSquare.y
            );

            // Przywrócenie zbitej figury
            if (capturedPieceHTML !== null) {

                let temp = document.createElement("div");

                temp.innerHTML = capturedPieceHTML;

                let restoredPiece =
                    temp.firstElementChild;

                document.querySelector(
                    ".chessboard"
                ).appendChild(restoredPiece);

                writeSquare(
                    restoredPiece.id,
                    targetColumn,
                    targetRow
                );
            }

            pawnMoved2 = oldPawnMoved2;

            checkAllChecks();

            // ==========================================
            // ZNALEZIONO LEGALNY RUCH
            // ==========================================

            if (!stillInCheck) {

                console.log(
                    "Jest przynajmniej jeden legalny ruch:",
                    currentPiece.classList[0],
                    currentSquare.x,
                    currentSquare.y,
                    "->",
                    targetColumn,
                    targetRow
                );

                return false;
            }
        }
    }

    // ==========================================
    // NIE MA ŻADNEGO LEGALNEGO RUCHU
    // ==========================================

    console.log("MAT!");

    return true;
}