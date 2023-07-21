const player = (name, symbol) => {
    return {name, symbol};
};

let players = [ player('Player 1', 'X'), 
                player('Player 2', 'O')];

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
    const isValid = (index) => board[index] === "";
    const play = (player, index) => {

        /* Positions
         * 0 1 2
         * 3 4 5
         * 6 7 8
         */

        if (isValid(index)){
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

const gameController = (() => {
    let turn = 0;
    const resetGame = () => {
        gameBoard.clear();
        turn = Math.round(Math.random());
    }
    const startGame = () => {
        resetGame();
        document.querySelector('.info').textContent = `${players[turn].name}'s turn to play.`
    }
    const play = (index) => {
        if (gameBoard.play(players[turn], index)) {
            if (turn) turn = 0;
            else turn = 1;

            document.querySelector('.info').textContent = `${players[turn].name}'s turn to play.`
        }
    }
    return {resetGame, startGame, play};
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
    const symbolBoxes = document.querySelectorAll('.symbol');
    symbolBoxes.forEach(element => {
        element.addEventListener('change', () => {
            element.value = element.value.charAt(0);
        });
    });

    const updateButtons = document.querySelectorAll('.updatePlayerButton');
    updateButtons.forEach(element => {
        element.addEventListener('click', () => {
            updatePlayers(element.getAttribute('pid'));
        });
    });

    const startGameButton = document.querySelector('.startGameButton');
    startGameButton.addEventListener('click', () => gameController.startGame());
    const resetGameButton = document.querySelector('.resetGameButton');
    resetGameButton.addEventListener('click', () => gameController.resetGame());
    
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            gameController.play(cell.getAttribute('data-id'));
        })
    });
}

setup();