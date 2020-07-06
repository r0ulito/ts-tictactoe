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
const winnerChildEl :HTMLElement = document.querySelector('.winner .text') as HTMLElement;


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
}