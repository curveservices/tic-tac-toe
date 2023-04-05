// Use module || factory. store gameboard as array inside a Gameboard object
// Each little piece of functionality should be able to fit in the game, player or gameboard objects.  
// JS function that renders game conents array to webpage.

const Gameboard = (() => {
    let gameboard = ['', '', '', '', '', '', '', '', ''];
    const render = () => {
      let boardHTML = "";
      gameboard.forEach((square, index) => {
        boardHTML += `<div class="square" id="${index}">${square}</div>`
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
    };
    const getGameboard = () => gameboard;

    return { 
      render,
      update,
      getGameboard,
    }
})();

// Display module that gratz the winning player!

// Player factory function
const createPlayer = (name, mark) => {
  return { name, mark };
};

// Game module 
const Game = (() => {
  let players = [];
  let currentPlayerindex;
  let gameOver;
  // functions that lets player add marks to squares on board then tie it to the DOM. 
  const start = () => {
    players = [
      createPlayer(document.querySelector('#player1').value, 'X'),
      createPlayer(document.querySelector('#player2').value, 'O')
    ]

    currentPlayerindex = 0;
    gameOver = false;
    Gameboard.render();
    const squares = document.querySelectorAll('.square')
    squares.forEach((square) => {
      square.addEventListener('click', handleClick);
    })
  };

  // include a button to start/restart the game
  const startButton = document.querySelector('#start-button');
  startButton.addEventListener('click', () => {
    console.log('hello')
    Game.start();
  });

  const restartButton = document.querySelector('#restart');
  restartButton.addEventListener('click', () => {
    Game.restart();
  });
  
  const handleClick = (e) => {
    // logic that stops players from playing same squares twice
    if (gameOver)
      return;
    let index = (e.target.id);
    if (Gameboard.getGameboard()[index] !=='')
      return;
    
    Gameboard.update(index, players[currentPlayerindex].mark);
    // check when game over! should check 3-in-a-row and tie
    if (checkForWin(Gameboard.getGameboard(), players[currentPlayerindex].mark)) {
      gameOver = true;
      displayModule.renderMessage(`Congrats ${players[currentPlayerindex].name} you Win!`)
    } else if (checkForTie(Gameboard.getGameboard())) {
      gameOver = true;
      displayModule.renderMessage(`It's a tie`);
    }
    currentPlayerindex = currentPlayerindex === 0 ? 1 : 0;
  };

  const checkForWin = (board, mark) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
      [0, 4, 8], [2, 4, 6] // diagonal
    ];
    return winningCombinations.some(combination => combination.every(index => board[index] === mark))
  };

  const checkForTie = (board) => {
    return board.every(square => square !== '')
  };

  const restart = () => {
    for (let i = 0; i < 9; i++) {
      Gameboard.update(i,'');
    }
    Gameboard.render();
  }

  return {
    start,
    handleClick,
    restart,
    checkForWin,
    checkForTie

  }
})();

/**
 * create an AI so that a player can play against the computer!
 * Start by just getting the computer to make a random legal move.
 * Once you’ve gotten that, work on making the computer smart. 
 * It is possible to create an unbeatable AI using the minimax algorithm 
 * (read about it here, some googling will help you out with this one)
 */
// dark / light mode
const toggle = document.getElementById('toggle-dark');
const body = document.querySelector('body');

toggle.addEventListener('click', function() {
  this.classList.toggle('bi-brightness-high-fill');
  if (this.classList.toggle('bi-moon')) {
    body.style.background = 'var(--background-light)';
    body.style.color = '#000';
    body.style.transition = '0.1s';
  } else {
    body.style.background = 'var(--background-dark';
    body.style.color = '#ccc';
    body.style.transition = '0.1s';
  }
});
