const SIZE = 3;

function Cell(x, y) {
    this.val = "";
    this.x = x;
    this.y = y;
}

function Player(name, val) {
    this.name = name;
    this.val = val;
}

// Create board
let BOARD = [];
for (let i = 0; i < SIZE; i++) {
    let row = []
    for (let j = 0; j < SIZE; j++) {
        row.push(new Cell(i, j));
    }
    BOARD.push(row);
}
console.log(BOARD);

// Create players
const p1 = new Player("p1", "X");
const p2 = new Player("p2", "O");
const PLAYERS = [p1, p2];
let CurrentPlayer = PLAYERS[0];
console.log(PLAYERS);

function GetNextObj(array, obj) {
    const currentIndex = array.indexOf(obj);
    const nextIndex = (currentIndex + 1) % array.length;
    return array[nextIndex];
}

/* Game - DOM interactions */
const board = document.getElementById("board");
for (let i = 0; i < SIZE; i++) {
    let row = []
    for (let j = 0; j < SIZE; j++) {
        const elem = document.createElement("div");
        elem.addEventListener("click", () => {
            elem.innerText = CurrentPlayer.val;
            CurrentPlayer = GetNextObj(PLAYERS, CurrentPlayer);
        }, { once: true });
        board.appendChild(elem);
    }
}