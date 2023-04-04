// Use module || factory. store gameboard as array inside a Gameboard object 
const Gameboard = (() => {
    let gameboard = ['', '', '', '', '', '', '', '', ''];
    
    const render = () => {
      let boardHTML = "";
      gameboard.forEach((square, index) => {
        boardHTML += `<div class="square" id="square-${index}">${square}</div>`
      })
      document.querySelector('#gameboard').innerHTML = boardHTML;
      const squares = document.querySelectorAll('.square')
      squares.forEach((square) => {
        square.addEventListener('click', Game.handleClick);
    })
    }
    const update = (index, value) => {
      gameboard[index] = value;
      render();
    }
    return { 
      render,
      update,
    }
})();

// Player factory
const createPlayer = (name, mark) => {
  return {
    name,
    mark,
  }
}

// game module 
const Game = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver;

  const start = () => {
    players = [
      createPlayer(document.querySelector('#player1').value, 'X'),
      createPlayer(document.querySelector('#player2').value, 'O')
    ]
    currentPlayerIndex = 0;
    gameOver = false;
    Gameboard.render();
    const squares = document.querySelectorAll('.square')
    squares.forEach((square) => {
      square.addEventListener('click', handleClick);
    })
  }
  const handleClick = (event) => {
    let index = parseInt(event.target.id.split("-")[1]);
    Gameboard.update(index, players[currentPlayerIndex].mark);
      currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  }
  return {
    start,
    handleClick
  }
})();

/**
 * Clean up the interface to allow players to put in their names, 
 * include a button to start/restart the game and 
 * add a display element that congratulates the winning player!
 */
const startButton = document.querySelector('#start-button');
startButton.addEventListener('click', () => {
  console.log('hello')
  Game.start();
});

// function GameController(playerOne, playerTwo) {
//     playerOne = playerOne
//     playerTwo = playerTwo
// }

// JS function that will render game conents array to webpage.

/** 
 * build the functions that allow player to ad marks to 
 * spot on the board then tie it to the DOM. 
 * letting players click on the gameboard to place their marker. 
 * Don’t forget the logic that keeps players from playing
 * in spots that are already taken.
 * Think carefully about where each bit of logic should reside. 
 * Each little piece of functionality should be able to fit in the game, 
 * player or gameboard objects. 
 * Take care to put them in “logical” places. 
 * Spending a little time brainstorming here can make your life much easier later! 
*/

/** 
 * Function that checks when the game is over! 
 * Should check for 3-in-a-row and a tie.
*/
// const checkWinningCondition = (board, marker) => {
//     const winningCombinations = [
//       [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
//       [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
//       [0, 4, 8], [2, 4, 6] // diagonal
//     ];
//     return winningCombinations.some(combination => combination.every(index => board[index] === marker));
//   };

/**
 * create an AI so that a player can play against the computer!
 * Start by just getting the computer to make a random legal move.
 * Once you’ve gotten that, work on making the computer smart. 
 * It is possible to create an unbeatable AI using the minimax algorithm 
 * (read about it here, some googling will help you out with this one)
 */
  
  // Game module
  // const Game = (() => {
  //   let player1 = null;
  //   let player2 = null;
  //   let currentPlayer = null;
    
  //   const startGame = () => {
  //     player1 = Player('Player 1', 'X');
  //     player2 = Player('Player 2', 'O');
  //     currentPlayer = player1;
  //   };
    
  //   const switchPlayer = () => {
  //     currentPlayer = currentPlayer === player1 ? player2 : player1;
  //   };
    
  //   const getPlayer = () => currentPlayer;
    
  //   const makeMove = (index) => {
  //     const result = gameBoard.makeMove(currentPlayer, index);
  //     if (result) {
  //       switchPlayer();
  //     }
  //     return result;
  //   };
    
  //   const checkWinner = () => {
  //     return gameBoard.checkWinner();
  //   };
    
  //   const resetGame = () => {
  //     gameBoard.resetBoard();
  //     currentPlayer = player1;
  //   };
    
  //   return { startGame, makeMove, checkWinner, resetGame, getPlayer };
  // })();
const toggle = document.getElementById('toggle-dark');
const body = document.querySelector('body');

toggle.addEventListener('click', function() {
  this.classList.toggle('bi-brightness-high-fill');
  if (this.classList.toggle('bi-moon')) {
    body.style.background = 'white';
    body.style.color = '#012';
    body.style.transition = '0.1s'
  } else {
    body.style.background = 'var(--background-dark';
    body.style.color = '#ccc';
    body.style.transition = '0.1s'
  }
});
