console.log('JavaScript is here')


/*----- constants -----*/
//player X & O
const PLAYERS = {
    '1': 'X',
    '-1': 'O'
}
// winning combinations
/*012
345
678*/
const COMBOS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

/*----- app's state (variables) -----*/
// where the user click (where to put an x or o) - make sure a square is not taken first
let board; // stores board positions, and what they hold
// whose turn it is
let turn; // either x or o
// when we have a winner or if there is a tie - if game is ongoing
let winner; //can be 3 things: x/o, tie, null(ongoing)
// bonus -if the player wants to quit
//bonus - timer for moves
//bonus- score for games won

/*----- cached element references -----*///- things referenced constantly
//game squares
const domSquares = document.querySelectorAll('.square') //returns an array
//message container - h1
const domMessage = document.querySelector('h2');
//reset button
const resetButton = document.querySelector('button')
//game board
const gameBoard = document.querySelector('.game-board');

/*----- event listeners -----*/
//mouse click on 9 squares
gameBoard.addEventListener('click', handleMove ) //game squares -thisis an example of delegating
//mouse click on reset button
resetButton.addEventListener('click', init)
//optional - user initiates game start

/*----- functions -----*/
//intialize start game
function init() {
    console.log('init function called')
    board = new Array(9).fill(null) //[null,null,null....]x9
    turn = 1; //X goes first
    winner = null; //inital winner is no-one 
    render()
}
//startgame on page load
init();
//handle user interaction (logic for what happens when user interacts)
function handleMove(event){
    console.log(`${event.target.dataset.square} was clicked`)
    const squareNumber = parseInt(event.target.dataset.square);
    //same as winner !== null
    if (board[squareNumber] || winner){
        return //end the turn
    }
    //set the index in the board array so we know that spot has been claimed
    board[squareNumber] = turn;
    //check for winner
    winner = checkForWinner()
    //switched the turn
    turn *= -1;
    //render message to user
    render()
}
//check for 3 in a row -or winner(main game logic)
function checkForWinner(){
    console.log('checkfor winner function called')
    for (let index in COMBOS) {
        if (board[COMBOS[index][0]] == turn && board[COMBOS[index][1]] == turn && board[COMBOS[index][2]] == turn){
            return turn
        }
    }
    if (board.includes(null)){
        return null
    }

    return 'Tie'
}
//render messages to the dom
function render(){
    // console.log('render function called')
    //puts an x or o on the board mapped fro board
    board.forEach(function(value, index) {
        domSquares[index].textContent = PLAYERS[value]
    })
    if (!winner){
        //tell whose turn it is
        domMessage.textContent = `${PLAYERS[turn]}'s turn`
    } else if (winner === 'Tie'){
        //Tell user there is a tie
        domMessage = 'It is a Tie'
    } else {
        //Tell them winner
        domMessage.textContent = `${PLAYERS[winner]} is the Winner`
    }
}