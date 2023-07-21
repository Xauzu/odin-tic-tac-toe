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
    // 0 = No end, 1 = Player 1 Win, 2 = Player 2 Win, 3 = Tie
    const checkEndCondition = () => {
        const boardState = gameBoard.getBoardState();
                
        /* Positions
         * 0 1 2
         * 3 4 5
         * 6 7 8
         */

        let row = [0, 0, 0];    // i<3 eif_i<6 else
        let col = [0, 0, 0];    // i%3=0 i%3 i%3=2
        let diag = [0, 0];      // i%4=0 i%2,i!=0&&i!=8
        let total = 0;

        for (i = 0; i < boardState.length; i++) {
            let change = 0;
            if (boardState[i] !== ''){
                total++;
                if (boardState[i] === players[0].symbol) change = -1;
                else if (boardState[i] === players[1].symbol) change = 1;

                if (i < 3) row[0] += change;
                else if (i < 6) row[1] += change;
                else row[2] += change;

                if (i % 3 === 0) col[0] += change;
                if (i % 3 === 1) col[1] += change;
                if (i % 3 === 2) col[2] += change;

                if (i % 4 === 0) diag[0] += change;
                if (i % 2 === 0 && i !== 0 && i !== 8) diag[1] += change;
            }
        }

        const result = [...row, ...col, ...diag];

        if (result.includes(-3)) return 1;
        else if (result.includes(3)) return 2;
        else if (total === 9) return 3;

        return 0;
    }
    const play = (index) => {
        if (turn != -1) 
            if (gameBoard.play(players[turn], index)) {
                const endCondition = checkEndCondition();
                if (endCondition === 0) {
                    if (turn) turn = 0;
                    else turn = 1;

                    document.querySelector('.info').textContent = `${players[turn].name}'s turn to play.`
                }
                else if (endCondition === 3) {
                    turn = -1;
                    document.querySelector('.info').textContent = `The game is a tie!`
                }
                else {
                    // End
                    turn = -1;
                    document.querySelector('.info').textContent = `${players[endCondition-1].name} Wins!`
                }
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
    
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            gameController.play(cell.getAttribute('data-id'));
        })
    });
}

setup();