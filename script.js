const player = (name, symbol) => {
    return {name, symbol};
};

let players = [ player('Player 1', 'X'), 
                player('Player 2', 'O')];

const gameController = (() => {
})();

const gameBoard = (() => {
    let board = ["", "", "",
                 "", "", "",
                 "", "", ""];

    const getBoardState = () => board;
    const updateDisplay = () => {
        cells = document.querySelectorAll(`.cell`);
        cells.forEach(cell => {
            cell.textContent = board[cell.getAttribute('data-id')];
        });
    }
    const clear = () => {
        board.fill("");
        updateDisplay();
    };
    const isValid = (x, y) => board[x + y * 3] === "";
    const play = (player, x, y) => {

        /* Positions
         * 0 1 2
         * 3 4 5
         * 6 7 8
         */

        if (isValid(x, y)){
            let index = x + y * 3;
            board[index] = player.symbol;

            updateDisplay();

            return 1;
        }
        else return 0;
    };
    const forceReplace = (symbol, index) => {
        board[index] = symbol
        updateDisplay();
    };
    return {getBoardState, updateDisplay, clear, play, forceReplace};
})();

let updatePlayers = (id) => {
    let user = players[id];
    user.name = document.querySelector(`.player${+id+1}.name`).value;

    const oldSymbol = user.symbol;
    user.symbol = document.querySelector(`.player${+id+1}.symbol`).value;

    const boardState = gameBoard.getBoardState();
    for (let i = 0; i < boardState.length; i++) 
        {
            if (boardState[i] === oldSymbol)
                gameBoard.forceReplace(user.symbol, i);
        }

    gameBoard.updateDisplay();
};

function setup() {
    let symbolBoxes = document.querySelectorAll('.symbol');
    symbolBoxes.forEach(element => {
        element.addEventListener('change', () => {
            element.value = element.value.charAt(0);
        });
    });

    let updateButtons = document.querySelectorAll('.updatePlayerButton');
    updateButtons.forEach(element => {
        element.addEventListener('click', () => {
            updatePlayers(element.getAttribute('pid'));
        });
    });
}

setup();