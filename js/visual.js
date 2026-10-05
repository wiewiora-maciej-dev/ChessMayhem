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
    console.log(Pieces);
    console.log("x: "+x+" y: "+y)
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