
const playerFactory = function(name, marker,) {
    return {
        name,
        marker
    };
}


const DOMController = (function() {
     /* updates the UI for the current state of the board */
     const render = function(currentState) {
         console.table(currentState);
    };

    const displayVictory = function(victorName) {
        console.log(`${victorName} wins`);
    }
    const displayDraw = function() {
        console.log("DRAW");

    };
    const resetDisplay = function() {
        console.log("DISPLAY RESET");
    };

    const switchTurn = function(name) {
        console.log("TURN SWITCH")
    };
    return {
        render,
        displayVictory,
        switchTurn,
        resetDisplay,
        displayDraw,
    }
})();

const gameBoard = (function() {
    const currentState = [[],[],[]];
    for(let i = 0; i < 3; i ++) {
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
                        currentState[i][1] === currentState[i][2]) {
                return currentState[i][1];
            }
        }
        for(let i = 0; i < 3; i++) {
            if(currentState[0][i] === currentState[1][i] &&
                        currentState[1][i] === currentState[2][i]) {
                return currentState[1][i];
            }
        }
        if(currentState[0][0] ===currentState[1][1] && currentState[1][1] === currentState[2][2]) {
            return currentState[1][1];
        }
        if(currentState[2][0] ===currentState[1][1] && currentState[1][1] === currentState[0][2]) {
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

const gameController = (function() {
    
    // set up players
    let players = [];
    players[0] = playerFactory("Player 1", "x");
    players[1] = playerFactory("Player 2","o");

    let currentPlayer = players[0];

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
        DOMController.resetDisplay();
    };

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

