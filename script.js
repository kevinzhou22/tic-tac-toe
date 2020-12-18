
const playerFactory = function(name, marker,) {
    return {
        name,
        marker
    };
}
const gameBoard = (function() {
    const currentState = [[],[],[]];

    const _render = function() {

    };
    const makeMove = function(x,y,marker) {
        currentState[x][y] = marker;
        _render();
    };

    const getCurrentState = function() {
        return currentState;
    };
    return {
        makeMove,
        getCurrentState,
    }
})();

const gameController = (function() {
    
    // set up players
    let players = [];
    players[0] = playerFactory("Player 1", "x");
    player[1] = playerFactory("Player 2","o");

    let currentPlayer = players[0];

    const _isValid = function(x,y) {

    };
    const _checkVictory = function(x,y) {

    };

    const _declareVictory = function(x,y) {

    };

    const _nextTurn = function() {

    };
    const attemptMove = function(x,y) {
        if(_isValid(x,y)) {
            gameBoard.makeMove(x,y,currentPlayer.marker);
            if(_checkVictory()) {
                declareVictory(); 
            } else {
                _nextTurn();
            }
        }
    };
    return {
        attemptMove,
    }
})();

