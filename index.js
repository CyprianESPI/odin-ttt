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
const p1 = new Player("Player 1", "X");
const p2 = new Player("Player 2", "O");
const PLAYERS = [p1, p2];
let CurrentPlayer = PLAYERS[0];
let Winner = null;
console.log(PLAYERS);

function GetSameValueCellsCount(x, y, val, dir) {
    let count = 0;
    if (val === "" || val === undefined) {
        return count;
    }

    while (0 <= x && x < SIZE
        && 0 <= y && y < SIZE
        && BOARD[x][y].val === val) {
        count++;
        x += dir[0];
        y += dir[1];
    }
    return count;
}

function GetWinner() {
    const DIRECTIONS = [[1, 0], [0, 1], [1, 1], [1, -1]];
    let winner = null;

    // It is enough to check first row and first column
    for (let i = 0; i < SIZE; i++) {
        for (let d = 0; d < DIRECTIONS.length; d++) {
            const dir = DIRECTIONS[d];
            if (GetSameValueCellsCount(0, i, BOARD[0][i].val, dir) === SIZE) {
                winner = PLAYERS.find(e => BOARD[0][i].val == e.val);
                return winner;
            }
            // Avoid checking twice the [0][0] cell
            else if (i !== 0 && GetSameValueCellsCount(i, 0, BOARD[i][0].val, dir) === SIZE) {
                winner = PLAYERS.find(e => BOARD[0][i].val == e.val);
                return winner;
            }
        }
    }

    return winner;
}

function UpdateGameState() {
    console.log(BOARD);
    Winner = GetWinner();
    if (Winner !== null) {
        // Stop game
        console.log("Congratulations! You won", CurrentPlayer);
        document.getElementById("winner").innerText = CurrentPlayer.val;
        dialog.showModal();
        return;
    }

    // Continue game
    CurrentPlayer = GetNextObj(PLAYERS, CurrentPlayer);
}

function GetNextObj(array, obj) {
    const currentIndex = array.indexOf(obj);
    const nextIndex = (currentIndex + 1) % array.length;
    return array[nextIndex];
}

/* Game - DOM interactions */
newGame();
function newGame() {
    const board = document.getElementById("board");

    // Remove previous content
    while (board.firstChild) {
        board.firstChild.remove()
    }

    // Fill the board
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            BOARD[i][j].val = "";
            const elem = document.createElement("div");
            elem.addEventListener("click", () => {
                if (Winner !== null) {
                    return;
                }
                elem.innerText = CurrentPlayer.val;
                BOARD[i][j].val = CurrentPlayer.val;
                UpdateGameState();
            }, { once: true });
            board.appendChild(elem);
        }
    }
    Winner = null;
}

const dialog = document.querySelector("dialog");

dialog.addEventListener("click", () => {
    if (dialog.open)
        dialog.close();
});

document.getElementById("newGameBtn").addEventListener("click", () => {
    newGame();
});