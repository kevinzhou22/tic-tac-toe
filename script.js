
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
    const _makeMove = function(x,y,marker) {
        currentState[x][y] = marker;
        _render();
    };
    const checkVictory = function() {

    };

    const _isValid = function(x,y) {

    };
    const attemptMove = function(x,y,marker) {
        if(_isValid(x,y)) {
            return _makeMove(x,y,marker,marker);  
        }
    };
    return {
        _makeMove,
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

