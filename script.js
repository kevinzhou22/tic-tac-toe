
/* Creates objects that represent players*/
const playerFactory = function(name, marker,) {
    return {
        name,
        marker
    };
}

/* Handles input and control of the DOM */
const DOMController = (function() {

    // cache DOM
    const newGameContainer = document.querySelector(".new-game-container");
    const board = document.querySelector(".board");
    const displayText = document.querySelector(".announcer");

     /* updates the UI for the current state of the board */
     const render = function(currentState) {
        const squares = board.querySelectorAll(".square");
        squares.forEach((square) => {
            const positions = square.getAttribute("data-position").split("-");
            const x = positions[0];
            const y = positions[1];
            square.textContent = currentState[x][y] === null ? "":
                    currentState[x][y].toUpperCase();
        });
    };

    /* Updates the text above the board. If either argument is null,
    it is not rendered. If both are present, first enters the boldPortion,
    then the nonBoldPortion */
    const _updateDisplayText = function(boldPortion, nonBoldPortion) {
        displayText.textContent = "";
        if(boldPortion !== null) {
            const playerName = document.createElement("span");
            playerName.textContent = boldPortion;
            playerName.style.fontWeight = "bold";
            displayText.appendChild(playerName);
        }
        if(nonBoldPortion !== null) {
            const restOfText = document.createTextNode(nonBoldPortion);
            displayText.appendChild(restOfText);
        }

    };

    /* Updates displayText to accounce a victory and prevents further moves*/
    const displayVictory = function(victorName) {
        _updateDisplayText(victorName, " wins!");
        newGameContainer.style.display = "flex";
    }

    /* Updates displayText to accounce a draw and prevents further moves*/
    const displayDraw = function() {
        _updateDisplayText(null, "It's a draw!");
        newGameContainer.style.display = "flex";
    };

    /* resets the display for restarting the game */
    const resetDisplay = function(firstMovePlayerName) {
        const emptyBoard = [];
        for(let i = 0; i < 3; i++) {
            emptyBoard.push([null,null,null]);
        }
        render(emptyBoard);
        _updateDisplayText(firstMovePlayerName, ", make your move!");
    };

    /* updates the display text to reflect that it is a new player's turn */
    const switchTurn = function(name) {
        _updateDisplayText(name, ", it's your turn!");
    };

    /* callback function for handling users clicking on the squares of the tic-tac-toe board */
    const _onClickOfSquare = function(e) {
        const positions = e.currentTarget.getAttribute("data-position").split("-");
        const x = positions[0];
        const y = positions[1];
        gameController.handleMoveSelection(x,y);
    };

    /* callback function for handling the "New Game" button */
    const _onClickOfNewGameButton = function(e) {
        e.currentTarget.parentNode.style.display = "none";
        gameController.restartGame();
    };


    /* Sets up initialization of the UI for the beginning of the game*/
    const initialize = function(player1Name) {        

        // set up initial text
        const playerName = document.createElement("span");
        playerName.textContent = player1Name;
        playerName.style.fontWeight = "bold";
        displayText.textContent = "";
        displayText.appendChild(playerName);
        const restOfText = document.createTextNode(", it's your turn!");
        displayText.appendChild(restOfText);

        // add squares and append event listeners
        for(let y = 0; y < 3; y++) {
            for(let x = 0; x < 3; x++) {
                const square = document.createElement("div");
                square.classList.add("square");
                square.setAttribute("data-position",`${x}-${y}`);
                board.appendChild(square);
                square.addEventListener("click",_onClickOfSquare);
            }
        }

        //add event listener to make newGameContainer close when the new-game-button is clicked
        newGameContainer.querySelector(".new-game-button").addEventListener("click",_onClickOfNewGameButton);
    }

    
    return {
        render,
        displayVictory,
        switchTurn,
        resetDisplay,
        displayDraw,
        initialize,
    }
})();

/* Handles the state of the game board*/
const gameBoard = (function() {
    const currentState = [];
    for(let i = 0; i < 3; i ++) {
        currentState[i] = [];
        for (let j = 0; j < 3; j++) {
            currentState[i][j] = null;
        }
    }

    
    
   
    /* returns the board to having no markers*/
    const resetBoard = function() {
        for(let i = 0; i < 3; i ++) {
            for (let j = 0; j < 3; j++) {
                currentState[i][j] = null;
            }
        }
        DOMController.render(currentState);
    }

    /* Checks if the board is completely filled with user input */
    const isBoardFull = function() {
        for(let i = 0; i < currentState.length; i++) {
            for(let j = 0; j < currentState[i].length; j++) {
                if (currentState[i][j] === null) {
                    return false;
                }
            }
        }
        return true;
    }
    /* checks if someone has won. 
    returns null if no one has won. Returns
    the marker of the victor if someone has won*/
    const checkVictory = function() {
        for(let i = 0; i < 3; i++) {
            if(currentState[i][0] === currentState[i][1] &&
                        currentState[i][1] === currentState[i][2] & currentState[i][0] !== null) {
                return currentState[i][1];
            }
        }
        for(let i = 0; i < 3; i++) {
            if(currentState[0][i] === currentState[1][i] &&
                        currentState[1][i] === currentState[2][i] && currentState[0][i] !== null) {
                return currentState[1][i];
            }
        }
        if(currentState[0][0] ===currentState[1][1] && currentState[1][1] === currentState[2][2] &&
                currentState[0][0] !== null) {
            return currentState[1][1];
        }
        if(currentState[2][0] ===currentState[1][1] && currentState[1][1] === currentState[0][2] &&
                currentState[2][0] !== null) {
            return currentState[1][1];
        }
        return null;
    };

    /* checks if a position is valid */
    const _isValid = function(x,y) {
        if(currentState[x][y] !== null) {
            return false;
        } else {
            return true;
        }
    };

    /* places a marker at location (x,y) on the tic tac toe board
    if the position is valid. Returns true if it is valid.*/
    const attemptMove = function(x,y,marker) {
        if(_isValid(x,y)) {
            currentState[x][y] = marker;
            DOMController.render(currentState);
            return true;
        } else {
            return false;
        }
    };
    return {
        checkVictory,
        attemptMove,
        resetBoard,
        isBoardFull,
    }
})();

/* Handles game logic*/
const gameController = (function() {
    
    // set up players
    let players = [];
    players[0] = playerFactory("Player 1", "x");
    players[1] = playerFactory("Player 2","o");

    let currentPlayer = players[0];
    DOMController.initialize(currentPlayer.name);


    /* takes a position (x,y) and attempts to make that move on the
    gameBoard. If successful, _handlesSelection will either declare victory
    or move on to the next turn.*/
    const handleMoveSelection = function(x,y) {
        if(gameBoard.attemptMove(x,y,currentPlayer.marker)) {
            if(gameBoard.checkVictory()) {
                _declareVictory();
            } else {
                if(gameBoard.isBoardFull()) {
                    _declareDraw();
                } else {
                    _nextTurn();
                }
                
            }

        }
    }

    /* instructs the DOM to alter the UI to display victory */
    const _declareVictory = function() {
        DOMController.displayVictory(currentPlayer.name);
    };

    /* instructs the DOM to alter the UI to display a draw */
    const _declareDraw = function() {
        DOMController.displayDraw();
    };

    /* sets up the game for a new round */
    const restartGame = function() {
        gameBoard.resetBoard();
        currentPlayer = players[0];
        DOMController.resetDisplay(players[0].name);
    };

    /* switches control of input from one player to the other, changing displays
    to reflect that*/
    const _nextTurn = function() {
        let nextPlayer = (players.indexOf(currentPlayer) + 1) % players.length;
        currentPlayer = players[nextPlayer];
        DOMController.switchTurn(currentPlayer.name);
    };

    return {
        handleMoveSelection,
        restartGame,
    }
})();

