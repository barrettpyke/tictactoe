const gameBoard = (() => {
    const boardArray = ["","","","","","","","",""]

    const topRow = document.querySelector('#top-row');
    const midRow = document.querySelector('#mid-row');
    const botRow = document.querySelector('#bot-row');
    
    const topLeft = document.createElement('div');
    topLeft.setAttribute('id', 'top-left');
    topLeft.setAttribute('data-pos', '0')
    topLeft.classList.add('bottom-border', 'right-border', 'square');
    topRow.appendChild(topLeft);
    
    const topMid = document.createElement('div');
    topMid.setAttribute('id', 'top-mid');
    topMid.setAttribute('data-pos', '1')
    topMid.classList.add('bottom-border', 'right-border', 'square');
    topRow.appendChild(topMid);

    const topRight = document.createElement('div');
    topRight.setAttribute('id', 'top-right');
    topRight.setAttribute('data-pos', '2')
    topRight.classList.add('bottom-border', 'square');
    topRow.appendChild(topRight);

    const midLeft = document.createElement('div');
    midLeft.setAttribute('id', 'mid-left');
    midLeft.setAttribute('data-pos', '3')
    midLeft.classList.add('bottom-border', 'right-border', 'square');
    midRow.appendChild(midLeft);
    
    const midMid = document.createElement('div');
    midMid.setAttribute('id', 'mid-mid');
    midMid.setAttribute('data-pos', '4')
    midMid.classList.add('bottom-border', 'right-border', 'square');
    midRow.appendChild(midMid);

    const midRight = document.createElement('div');
    midRight.setAttribute('id', 'mid-right');
    midRight.setAttribute('data-pos', '5')
    midRight.classList.add('bottom-border', 'square');
    midRow.appendChild(midRight);

    const botLeft = document.createElement('div');
    botLeft.setAttribute('id', 'bot-left');
    botLeft.setAttribute('data-pos', '6')
    botLeft.classList.add('right-border', 'square');
    botRow.appendChild(botLeft);
    
    const botMid = document.createElement('div');
    botMid.setAttribute('id', 'bot-mid');
    botMid.setAttribute('data-pos', '7')
    botMid.classList.add('right-border', 'square');
    botRow.appendChild(botMid);

    const botRight = document.createElement('div');
    botRight.setAttribute('id', 'bot-right');
    botRight.setAttribute('data-pos', '8')
    botRight.classList.add('square');
    botRow.appendChild(botRight);

    return { boardArray }
})()

const player = (name, side) => {
    const turn = (pos) => gameBoard.boardArray[pos] = side;
    return { name, side, turn }; 
}


const game = (() => {
    const player1 = player('Player 1', 'X');
    const player2 = player('Player 2', 'O');

    let i = 1;

    const squares = document.querySelectorAll('.square');
    squares.forEach (square =>
        square.addEventListener('click', () => {
    
        if (i % 2 === 0) {
            activePlayer = player2;
        } else {
            activePlayer = player1;
        }

        square.textContent = activePlayer.side;
        activePlayer.turn(square.getAttribute('data-pos'));
        i++;
        checkWin();
        }, {once: true})
    );
    
    const gameStatus = document.querySelector('#game-status');
    const win = (player) => {
        gameStatus.textContent = `${player} wins!`;
    }
    const tie = () => {
        gameStatus.textContent = 'Tie game!'
    }

    const submit = document.querySelector('#submit');
    submit.addEventListener('click', () => {
        const player1field = document.querySelector('#player1');
        const player2field = document.querySelector('#player2');
        const player1input = document.querySelector('#player1').value;
        const player2input = document.querySelector('#player2').value;
        player1.name = player1input;
        player2.name = player2input;
        player1field.value = '';
        player2field.value = '';
    })

    const reset = document.querySelector('#reset');
    reset.addEventListener('click', () => {
        gameBoard.boardArray = ["","","","","","","","",""]
        squares.forEach(square => square.textContent = '')
        gameStatus.textContent = ''
    })

    const xWin = (value) => value === 'X';
    const oWin = (value) => value === 'O';

    const checkWin = () => {
    let board = gameBoard.boardArray;
    const rowA = [board[0], board[1], board[2]];
    const rowB = [board[3], board[4], board[5]];
    const rowC = [board[6], board[7], board[8]];
    const colA = [board[0], board[3], board[6]];
    const colB = [board[1], board[4], board[7]];
    const colC = [board[2], board[5], board[8]];
    const diaA = [board[0], board[4], board[8]];
    const diaB = [board[2], board[4], board[6]];

    if (rowA.every(xWin)  || 
        rowB.every(xWin)  || 
        rowC.every(xWin)  || 
        colA.every(xWin)  || 
        colB.every(xWin)  || 
        colC.every(xWin)  || 
        diaA.every(xWin)  || 
        diaB.every(xWin) 
        === true) {
        win(player1.name);
        } else if (
        rowA.every(oWin)  || 
        rowB.every(oWin)  || 
        rowC.every(oWin)  || 
        colA.every(oWin)  || 
        colB.every(oWin)  || 
        colC.every(oWin)  || 
        diaA.every(oWin)  || 
        diaB.every(oWin)
        === true) {
        win(player2.name);
        } else if (!board.includes("")) {
            tie();
        }
    }
})()