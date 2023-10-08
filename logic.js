const buttons=document.querySelectorAll('.box');
const message=document.querySelector('.result');
const win=new Audio('win.mp3');
const turn=new Audio('turn.mp3');
const draw=new Audio('draw.mp3');
const resetSound=new Audio('reset.mp3');
const audio=document.getElementById('backgroundMusic');

let currentplayer='X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a]!='' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            buttons[a].classList.add('win');
            buttons[b].classList.add('win');
            buttons[c].classList.add('win');
            gameActive = false;
            return gameBoard[a];
        }
    }

    if (!gameBoard.includes('')) {
        gameActive = false;
        return 'Draw';
    }
    return null;
}


function handleClick(event) {
    const button=event.target;
    const buttonIndex = parseInt(button.id) - 1;
    if(gameActive && gameBoard[buttonIndex]==='')
    {
        button.querySelector('.boxtext').textContent=currentplayer;
        button.classList.add('game-over');
        turn.play();
    }
    else 
    return

    gameBoard[buttonIndex] = currentplayer;
    const winner=checkWinner();
    if (winner!=null) {
        buttons.forEach(button=>{
            button.classList.add('game-over');
        });
        
        if (winner === 'Draw') {
            message.textContent = "It's a Draw!";
            draw.play();
        } else {
            message.textContent = `${winner} wins!`;
            win.play();
        }
    } else {
        currentplayer = currentplayer === 'X' ? 'O' : 'X';
        message.textContent = `${currentplayer}'s turn`;
    }
    
}

function resetGame() {
    resetSound.play();
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentplayer = 'X';
    message.textContent = 'X plays first!';
    buttons.forEach(button => {
        button.querySelector('.boxtext').textContent = '';
        button.classList.remove('win');
        button.classList.remove('game-over')
    });
}

function soundCheck(event) {
    const button=event.target;
    if (button.textContent==='Sound: On') {
        button.textContent='Sound: Off';
        audio.pause();
    }
    else
    {
        button.textContent='Sound: On';
        audio.play();
    }

}

buttons.forEach(button=>{
    button.addEventListener('click',handleClick);
});
const res=document.querySelector('.reset');
res.addEventListener('click',resetGame);

const soundBtn=document.querySelector('.sound');
soundBtn.addEventListener('click',soundCheck);

