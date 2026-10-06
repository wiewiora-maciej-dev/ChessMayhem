import { position, squaresHL } from "./squares.js";

export function hide(selection) {
    selection.style.transform = "scale(1.2)";

    setTimeout(function() {
        selection.style.opacity = "0";
    }, 300);
}

export function show(selection) {
    setTimeout(function() {
        selection.style.opacity = "1";
        selection.style.transform = "scale(1)";
    }, 10);
}
export function highlight() {
    //console.log("highlighting");
    let row = 1;
    let column = 1;
    let positionHL = null;
    let HL = null;
    let HLH = null;
    let chessboard = document.querySelector(".chessboard");
    for (let i = 0; i < 64; i++) {
        if (squaresHL["" + column + row] === true) {
            positionHL = position(column, row);
            HL = document.createElement("div");
            HL.className = ("highlight");
            HL.style.left = positionHL.X + "px";
            HL.style.bottom = positionHL.Y + "px";
            chessboard.appendChild(HL);

            HLH = document.createElement("div");
            HLH.className = ("highlight-hitbox");
            HLH.style.left = positionHL.X + "px";
            HLH.style.bottom = positionHL.Y + "px";
            chessboard.appendChild(HLH);
        }
        column++;
        if (column > 8) {
            column = 1;
            row++;
        }
    }
}

export function unhighlight() {
    document.querySelectorAll(".highlight").forEach(function(element) {
    element.remove();
    });
    document.querySelectorAll(".highlight-hitbox").forEach(function(element) {
    element.remove();
    });
};

export function createPromotionSelection(Piece0, Piece1, Piece2, Piece3, x, y) {

    let Pieces = [Piece0, Piece1, Piece2, Piece3];
    // console.log(Pieces);
    // console.log("x: "+x+" y: "+y)
    let promotionSelection = document.createElement("div");
    promotionSelection.classList.add("promotionSelection");
    promotionSelection.style.left = x;
    promotionSelection.style.bottom = y;
    for (let i = 0; i < 4; i++) {
        let promotionPiece = document.createElement("div");
        promotionPiece.classList.add(Pieces[i]);
        promotionPiece.classList.add("promotionOption");
        promotionPiece.style.left = 100*i +"px";
        promotionPiece.style.opacity = 1;
        promotionSelection.appendChild(promotionPiece);
    }

    document.querySelector(".chessboard").appendChild(promotionSelection);
}

export function showGameOver(winner) {
    // Tworzenie tła
    let overlay = document.createElement("div");
    overlay.classList.add("gameOverOverlay");

    // Tworzenie okienka
    let popup = document.createElement("div");
    popup.classList.add("gameOverPopup");

    // Tekst zwycięzcy
    let title = document.createElement("h1");

    if (winner === "W") {
        title.textContent = "Białe wygrały!";
    } else if (winner === "B") {
        title.textContent = "Czarne wygrały!";
    }

    // Przycisk
    let restartButton = document.createElement("button");
    restartButton.textContent = "Zagraj ponownie";

    restartButton.addEventListener("click", function() {
        location.reload();
    });

    // Dodanie elementów do popupu
    popup.appendChild(title);
    popup.appendChild(restartButton);

    // Dodanie popupu do strony
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
}

export function showCheckingPieces(checkingPieces) {

    checkingPieces.forEach(function(pieceID) {

        let piece = document.getElementById(pieceID);

        if (piece === null) {
            return;
        }

        let warning = document.createElement("div");

        warning.classList.add("checkWarning");

        warning.textContent = "❗";

        warning.style.left = (parseInt(piece.style.left) + 25) + "px";
        warning.style.bottom = piece.style.bottom;

        document.querySelector(".chessboard").appendChild(warning);

        let warningHL = document.createElement("div");

        warningHL.classList.add("boxWarning");
        warningHL.style.backgroundColor = "rgb(255 0 0 / 45%)";

        warningHL.style.left = piece.style.left;
        warningHL.style.bottom = piece.style.bottom;

        document.querySelector(".chessboard").appendChild(warningHL);

        setTimeout(function() {
            warning.remove();
            warningHL.remove();
        }, 1200);
    });
}