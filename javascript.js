function GameBoard(){
    const board = [Cell(),Cell(),Cell(),Cell(),Cell(),Cell(),Cell(),Cell(),Cell()]

    const getBoard = () => board;
    const addMarker = (index, player) => {
       // if (board[index].getValue() !== "null") return;
        board[index].stamp(player);
    }

    const printBoard = () => {
        console.log(board.map((cell)=>cell.getValue()));
    }

    return {getBoard, addMarker, printBoard};
}




function Cell(){
    let value = null;
    
    const stamp = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {
        stamp,
        getValue
    }
}




function gameController(){
    const players = [
        {
            name: "Exes",
            marker: "X"
        },
        {
            name: "Ohhs",
            marker: "O"
        }
    ]

    const board = GameBoard();

    let activePlayer = players[0];

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0]? players[1]: players[0];
    }

    const getActivePlayer = () => activePlayer;

    const printNewRound = () =>{
        board.printBoard();
        console.log(`It is ${activePlayer.name} Turn`);
    }

    const playRound = (index) => {
        console.log(`This will Mark ${getActivePlayer().name}'s Symbol into Index ${index}...`);
        board.addMarker(index, getActivePlayer().marker)

        switchPlayer();
        printNewRound();
    }

    printNewRound();

    return{
        playRound,
        getActivePlayer,
        getBoard: board.getBoard
    }
}




//const game = gameController();

function displayController(){
    const game = gameController();
    const turn = document.querySelector(".turn");
    const boardDiv = document.querySelector(".board");

    const createScreen = () =>{
        //clear Screen
        boardDiv.textContent= "";


        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        turn.textContent= `${activePlayer.name}'s Turn is Now;`

        board.forEach((cell, index) =>{
            const cellButton = document.createElement("button");
            cellButton.classList.add("cell");
            cellButton.dataset.index = index;
            cellButton.textContent= cell.getValue();
            boardDiv.appendChild(cellButton);
        })
    }

    function stampCell (e) {
        const selectedCell = e.target.dataset.index;
        if (!selectedCell)return;
        if (e.target.textContent !== "") return;
        game.playRound(selectedCell);
        createScreen();
    }

    boardDiv.addEventListener("click", stampCell);
    createScreen();

}

const game = displayController();