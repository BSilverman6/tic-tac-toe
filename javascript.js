function GameBoard(){
    const board = [Cell(),Cell(),Cell(),Cell(),Cell(),Cell(),Cell(),Cell(),Cell()]

    const getBoard = () => board;
    const addMarker = (index, player) => {
        //This is now checked in the UI
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
    const p1Name = document.querySelector("#p1-name").value;
    const p2Name = document.querySelector("#p2-name").value;
    let p1Marker = document.querySelector(`input[name="p1-icon"]:checked`).value;
    if (p1Marker === "smiley"){
        p1Marker = document.createElement("img");
        p1Marker.src="./media/smiley.png"
    }
    let p2Marker = document.querySelector(`input[name="p2-icon"]:checked`).value;

    const players = [
        {name: p1Name === ""? "Player 1": p1Name, marker: p1Marker},
        {name: p1Name === ""? "Player 2": p2Name, marker: p2Marker}
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
        board.addMarker(index, getActivePlayer().marker)

        if(!checkWinner(board.getBoard())){
            switchPlayer();
            printNewRound();
        }else{
            console.log("there was a winner in the game controller");
        }
    }
    const checkWinner = (board) => {

        if (board[0].getValue() === getActivePlayer().marker && 
        board[1].getValue() === getActivePlayer().marker &&
        board[2].getValue() === getActivePlayer().marker ||
        
        board[3].getValue() === getActivePlayer().marker && 
        board[4].getValue() === getActivePlayer().marker &&
        board[5].getValue() === getActivePlayer().marker ||
        
        board[6].getValue() === getActivePlayer().marker && 
        board[7].getValue() === getActivePlayer().marker &&
        board[8].getValue() === getActivePlayer().marker ||
        
        board[0].getValue() === getActivePlayer().marker && 
        board[3].getValue() === getActivePlayer().marker &&
        board[6].getValue() === getActivePlayer().marker ||
        
        board[1].getValue() === getActivePlayer().marker && 
        board[4].getValue() === getActivePlayer().marker &&
        board[7].getValue() === getActivePlayer().marker ||
        
        board[2].getValue() === getActivePlayer().marker && 
        board[5].getValue() === getActivePlayer().marker &&
        board[8].getValue() === getActivePlayer().marker ||
        
        board[0].getValue() === getActivePlayer().marker && 
        board[4].getValue() === getActivePlayer().marker &&
        board[8].getValue() === getActivePlayer().marker ||
        
        board[2].getValue() === getActivePlayer().marker && 
        board[4].getValue() === getActivePlayer().marker &&
        board[6].getValue() === getActivePlayer().marker){
            return true;
        }else{
            return false;
        }
    }
    const checkTie = (board) =>{
        for (let i = 0; i<9; i++){
            if (board[i].getValue() === null) {return false};
        }
        return true;
    }

    printNewRound();

    return{
        playRound,
        getActivePlayer,
        getBoard: board.getBoard,
        checkWinner,
        checkTie
    }
}




//const game = gameController();

function displayController(){
    const game = gameController();
    const turn = document.querySelector(".turn");
    const boardDiv = document.querySelector(".board");

    const createScreen = () =>{
        boardDiv.textContent= "";

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        if(game.checkWinner(board)){
            turn.textContent=`${activePlayer.name} Wins the Game!`
            boardDiv.removeEventListener("click", stampCell);
        }else if(game.checkTie(board)){
            turn.textContent=`-~The Game was a Tie~-`;
            boardDiv.removeEventListener("click", stampCell);
        }else{
            turn.textContent= `${activePlayer.name}'s Turn`
        }

        board.forEach((cell, index) =>{
            const cellButton = document.createElement("button");
            cellButton.classList.add("cell");
            cellButton.dataset.index = index;
            cellButton.textContent= cell.getValue();
            console.log(cell.getValue());
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

(function gatherGameInfo(){
    const newGame = document.querySelector("#new-game");
    newGame.addEventListener("click", displayController);
})()
