//----------------Importowanie----------------//
import { hide } from "./visual.js";
import { show } from "./visual.js";
import { drawClasic } from "./pieces.js";
//--------------------------------------------//

//-------------------Zmienne------------------//
export let gamemode = null;
export let conectionType = null;
export let gameRunning = false;
let selectionStage = 0;
let selection = null;
let newOption = null;
//--------------------------------------------//

//----------------Pierwszy Wybór--------------//

document.querySelector(".selection-local").addEventListener("click", function()  {
    if (selectionStage !== 0){
        return;
    }
    conectionType = "local";

    selection = document.querySelector(".selection-local");

    hide(selection);

    setTimeout(function() {
        selection.style.display = "none";
    }, 1000);

    console.log(conectionType)
    
    setTimeout(function() {
        newOption = document.querySelector(".selection-clasic");
        newOption.style.display = "block";
        show(newOption);
    }, 1000);
    selectionStage++
});

//--------------------------------------------//
//----------------Drugi Wybór-----------------//

document.querySelector(".selection-clasic").addEventListener("click", function()  {
    if (selectionStage !== 1){
        return;
    }
    gamemode = "clasic";

    selection = document.querySelector(".selection-clasic");

    hide(selection);

    setTimeout(function() {
        selection.style.display = "none";
    }, 1000);

    console.log(gamemode)
    setTimeout(function() {
        drawClasic();
        gameRunning = true;
    }, 1000);
    selectionStage++
});

//--------------------------------------------//