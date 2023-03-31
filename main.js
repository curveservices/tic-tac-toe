// use as litle global code as possible. 
// if using one of something use a module.

// store gameboard as array inside a Gameboard object
function Gameboard () {
    const board = [];

    for (let i = 0; i < 9; i++) {
        board[i] = [];
    }
}

// players also need to be stored in objects
// If need multiples of something (players!), create with factories
// need an object to control the flow of the game.
function GameController(playerOne, playerTwo) {
    playerOne = playerOne
    playerTwo = playerTwo
}

// function that will render game conents array to webpage.

// functions that allow to add marks to board then tie to DOM.

