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
let Winner = null;
console.log(PLAYERS);

function GetSameValueCellsCount(x, y, val, dir) {
    let count = 0;
    if (val === "" || val === undefined) {
        return count;
    }

    while (x < SIZE && y < SIZE && BOARD[x][y].val === val) {
        count++;
        x += dir[0];
        y += dir[1];
    }
    return count;
}

// TODO: check why line 2/3 does not trigger a winner
function GetWinner() {
    const DIRECTIONS = [[1, 0], [0, 1], [1, 1]];
    let winner = null;

    // It is enough to check first row and first column
    for (let i = 0; i < SIZE; i++) {
        for (let d = 0; d < DIRECTIONS.length; d++) {
            const dir = DIRECTIONS[d];
            const row_val = BOARD[0][i].val;
            const row_res = GetSameValueCellsCount(0, i, row_val, dir);
            const col_val = BOARD[i][0].val;
            const col_res = row_res;
            if (i !== 0)
                GetSameValueCellsCount(i, 0, col_val, dir);

            if (row_res === SIZE) {
                winner = PLAYERS.find(e => row_val == e.val);
            }
            else if (col_res === SIZE) {
                winner = PLAYERS.find(e => row_val == e.val);
            }

            if (winner !== null) {
                break;
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
        let row = []
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

document.getElementById("newGameBtn").addEventListener("click", () => {
    newGame();
});