function GameBoard(){
    const board = [Cell(),Cell(),Cell(),Cell(),Cell(),Cell(),Cell(),Cell(),Cell()]

    const getBoard = () => board;
    const addMarker = (index, player) => {
        //This is now checked in the UI
       // if (board[index].getValue() !== "null") return;
        board[index].stamp(player);
    }

    return {
        getBoard, 
        addMarker
    }
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
    const p1Marker = document.querySelector(`input[name="p1-icon"]:checked`).value;
    const p2Marker = document.querySelector(`input[name="p2-icon"]:checked`).value;

    //DETERMINES if it is an AI game or not
    const p2AI = document.querySelector(`input[name="play-type"]:checked`).value === "h-v-h"? false: true;

    const players = [
        {name: p1Name === ""? "Player 1": p1Name, marker: p1Marker},
        {name: p2Name === ""? "Player 2": p2Name, marker: p2Marker}
    ]

    const board = GameBoard();
    let activePlayer = players[0];

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0]? players[1]: players[0];
    }
    const getActivePlayer = () => activePlayer;

    const playRound = (index) => {
        board.addMarker(index, getActivePlayer().marker)

        if(!checkWinner(board.getBoard())){
            switchPlayer();
        }

//AI TURN IS HERE
        if (p2AI&&aritificialInt(board.getBoard())!==undefined&&!checkWinner(board.getBoard())){
            board.addMarker(aritificialInt(board.getBoard()), getActivePlayer().marker);
            if(checkWinner(board.getBoard())){
                console.log("The Ai just won the game")
            }
            if(!checkWinner(board.getBoard())){
                switchPlayer();
            }
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

//RANDOM AI FUNCTION
    function aritificialInt(board){
        const emptySpot = [];
        for (let i=0; i<9; i++){
            if(board[i].getValue()===null) {emptySpot.push(i)};
        }
        return emptySpot[Math.floor((Math.random()*emptySpot.length))];
    }

    return{
        playRound,
        getActivePlayer,
        getBoard: board.getBoard,
        checkWinner,
        checkTie,
    }
}


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
            if (cell.getValue() === "smiley"){
                const smiles = document.createElement("img");
                smiles.src="./media/smiley.png";
                cellButton.appendChild(smiles);
            }else{
                cellButton.textContent= cell.getValue();
            }
            boardDiv.appendChild(cellButton); 
        })
    }

    function stampCell (e) {
        const selectedCell = e.target.dataset.index;
        if (!selectedCell)return;
        if (e.target.textContent !== "" || e.target.hasChildNodes()) return;
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
