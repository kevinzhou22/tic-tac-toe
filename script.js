
const playerFactory = function(name, marker,) {
    return {
        name,
        marker
    };
}
const gameBoard = (function() {
    const currentState = [[],[],[]];
    for(let i = 0; i < 3; i ++) {
        for (let j = 0; j < 3; j++) {
            currentState[i][j] = null;
        }
    }

    /* updates the UI for the current state of the board */
    const _render = function() {

    };

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
        if(currentState[i][j] === null) {
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
            _render();
            return true;
        } else {
            return false;
        }
    };
    return {
        checkVictory,
        attemptMove,
    }
})();

const gameController = (function() {
    
    // set up players
    let players = [];
    players[0] = playerFactory("Player 1", "x");
    players[1] = playerFactory("Player 2","o");

    let currentPlayer = players[0];

  
    
    const _declareVictory = function(x,y) {

    };

    const _nextTurn = function() {

    };

    return {
    }
})();

