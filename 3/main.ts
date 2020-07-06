interface GameState {
    index :number | string,
    player :string
}
let startBoard :Array<string | number> = [];
const humanPlayer :string = "O";
const botPlayer :string = "X";
const winningCombinations :Array<Array<number>> = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells :NodeListOf<HTMLElement> = document.querySelectorAll('.cell');
const winnerParentEl :HTMLElement = document.querySelector('.winner') as HTMLElement;
const winnerChildEl :HTMLElement = document.querySelector('.winner .text');


startGame();

function startGame() :void {
    winnerParentEl.style.display = "none";
    startBoard = Array.from({length : 9}, (v, k) => k);
    cells.forEach(el => {
        el.innerText = '';
        el.addEventListener('click', playerClickAction, false);
        el.style.removeProperty('background-color');
    });
}

function playerClickAction(e :Event) :void {
    playerAction((e.target as HTMLInputElement).id, humanPlayer);      
}

function playerAction(id, player :string) :void {
    const cell = document.getElementById(id) as HTMLElement;
    cell.removeEventListener('click', playerClickAction);
    cell.innerText = player;
    startBoard[id] = player;
    const gameState :GameState | null = isPlayerWinner(startBoard, player);
    if(gameState) {
        gameEnd(gameState);
    }
}

function isPlayerWinner(board :(string | number)[], player : string) :GameState {
    const plays :Array<number> = board.reduce((a :Array<number>, e, i) => (e === player) ? a.concat(i): a, []);
    console.log(plays);
    let gameState :GameState = null;
    for(const [index, winning] of winningCombinations.entries()) {
        if(winning.every(elem => plays.indexOf(elem) > -1)) {
            gameState = {
                index: index,
                player: player
            };
            break;
        }
    }
    return gameState;
}


function gameEnd(gameState :GameState) :void {
    const color :string = (gameState.player === humanPlayer ? "lightblue": "salmon");
    cells.forEach((el) => {
        el.removeEventListener('click', playerClickAction);
    });
    for(const index of winningCombinations[gameState.index]) {
        const cell = document.getElementById(index);
        cell.style.backgroundColor = color;
    }
    winnerChildEl.innerText = "You win";
    winnerParentEl.style.display = "block";
}