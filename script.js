var debug = 0;

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
    if (debug) board.fill("D");
    console.log(debug);
    return {getBoardState, updateDisplay, clear, play};
})();

console.log(gameBoard.getBoardState());

gameBoard.play({symbol: "X"}, 1, 1);
gameBoard.play({symbol: "X"}, 1, 1);
gameBoard.updateDisplay();