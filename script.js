const gameBoard = (() => {
    let board = ["", "", "",
                 "", "", "",
                 "", "", ""];

    const getBoardState = () => board;
    const clear = () => {
        board.fill("");
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
        }
    };      
    return {getBoardState, clear, play};
})();

console.log(gameBoard.getBoardState());

gameBoard.play({symbol: "X"}, 1, 1);
gameBoard.play({symbol: "X"}, 1, 1);