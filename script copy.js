const
    welcomeScreen = document.getElementById('welcome-screen'),
    multiPlayerBtn = document.getElementById('multi-btn'),
    singlePlayerBtn = document.getElementById('single-btn'),
    form = document.querySelector('form'),
    gameOptions = document.getElementById('game-options'),
    playerTwoPanel = document.getElementById('player-two'),
    computerPanel = document.getElementById('computer'),
    gamePage = document.getElementById('game'),
    boardElement = document.getElementById('gameboard'),
    winningMessageElement = document.getElementById('winningMessage'),
    restartBtn = document.getElementById('restartBtn'),
    winningMessageTextElement = document.getElementById('winningMessageText'),
    cellElements = document.querySelectorAll('[data-cell]'),
    playerOneName = document.querySelector('#player-one-panel .player-name h3'),
    playerTwoName = document.querySelector('#player-two-panel .player-name h3'),
    playerOneScore = document.querySelector('#player-one-panel .score'),
    playerTwoScore = document.querySelector('#player-two-panel .score'),
    playerOne = {
        name: '',
        avatar: '',
        marker: '',
        score: ''
        },
    playerTwo = {
        name: '',
        avatar: '',
        marker: '',
        score: '',
        },
        PLAYER_ONE_CLASS = 'p1',
        PLAYER_TWO_CLASS = 'p2',
        WINNING_COMBINATIONS = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

let isPlayer_TWO_Turn = false;
let moves = 0;


//// OPEN GAME OPTIONS /////

multiPlayerBtn.addEventListener('click', multiPlayers);

function multiPlayers() {
    welcomeScreen.classList.add('no-display');
    gameOptions.classList.remove('no-display');
    playerTwoPanel.classList.remove('no-display');
    document.getElementById('game-form').id = 'multiPlayerGame';
    const multiGameForm = document.getElementById('multiPlayerGame');
    multiGameForm.addEventListener('submit', getGameOptions);
}

// singlePlayerBtn.addEventListener('click', singlePlayer);

// function singlePlayer() {
//     welcomeScreen.classList.add('no-display');
//     gameOptions.classList.remove('no-display');
//     computerPanel.classList.remove('no-display');
//     document.getElementById("p2avatar1").removeAttribute("required");
//     document.getElementById("p2naught").removeAttribute("required");
//     document.getElementById('game-form').id = 'singlePlayerGame';
//     singleGameForm = document.getElementById('singlePlayerGame');
//     singleGameForm.addEventListener('submit', getGameOptions);
// }

/////     /////




//// OPEN GAME  /////

function getGameOptions(event) {
    event.preventDefault();
    gameOptions.classList.add('no-display');
    gamePage.classList.remove('no-display');


    const playerOneObject = {
        name: document.getElementById('playerone-name').value,
        avatar: document.querySelector("input[type='radio'][name=p1avatar]:checked").value,
        marker: document.querySelector("input[type='radio'][name=p1marker]:checked").value,
        score: '= 0'
    }
    Object.assign(playerOne, playerOneObject);


    const playerTwoObject = {
        name: document.getElementById('playertwo-name').value,
        avatar: document.querySelector("input[type='radio'][name=p2avatar]:checked").value,
        marker: document.querySelector("input[type='radio'][name=p2marker]:checked").value,
        score: '= 0'
    }
    Object.assign(playerTwo, playerTwoObject);

    addDetails();
    startGame();
    
    // return (
    //     playerOneObject,
    //     playerTwoObject
    // )
       

}

/////     /////

function addDetails() {
    let playerOneAvatar = document.querySelector('#player-one-panel .player-avatar img');
    let playerTwoAvatar = document.querySelector('#player-two-panel .player-avatar img');
    let playerOneMarker = document.querySelector('#player-one-panel .player-marker img');
    let playerTwoMarker = document.querySelector('#player-two-panel .player-marker img');    

    playerOneAvatar.src = 'images/' + playerOne.avatar + '.png';
    playerTwoAvatar.src = 'images/' + playerTwo.avatar + '.png';

    playerOneMarker.src = 'images/' + playerOne.avatar + '/' + playerOne.marker + '.png';
    playerTwoMarker.src = 'images/' + playerTwo.avatar + '/'  + playerTwo.marker + '.png';

    playerOneName.innerHTML = playerOne.name;
    playerTwoName.innerHTML = playerTwo.name;

}

//// GAME  /////

restartBtn.addEventListener('click', startGame);

function startGame() {
	isPlayer_TWO_Turn = false
	cellElements.forEach(cell => {
		cell.classList.remove(PLAYER_ONE_CLASS)
		cell.classList.remove(PLAYER_TWO_CLASS)
        cell.style.backgroundImage = "none";
		cell.removeEventListener('click', handleCellClick)
		cell.addEventListener('click', handleCellClick, { once: true })
	})
	setBoardHoverClass()
	winningMessageElement.classList.add('no-display')

};

function handleCellClick(e) {
	const cell = e.target
	const currentClass = isPlayer_TWO_Turn ? PLAYER_TWO_CLASS : PLAYER_ONE_CLASS
	placeMark(cell, currentClass)
    moves++;
    // computerTurns()
    // console.log(moves);
	if (checkWin(currentClass)) {
		endGame(false)
	} else if (isDraw()) {
		endGame(true)
	} else {
		swapTurns()
		setBoardHoverClass()
	}

}

function endGame(draw) {
    if(draw) {winningMessageTextElement.innerText = "It's a draw!"
    } else {
        winningMessageTextElement.innerText = `${isPlayer_TWO_Turn ? playerTwo.name : playerOne.name} wins!`
    }
    moves = 0;
    winningMessageElement.classList.remove('no-display');
}

function isDraw() {
	return [...cellElements].every(cell => {
		return cell.classList.contains(PLAYER_ONE_CLASS) || cell.classList.contains(PLAYER_TWO_CLASS)
	})
}

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass);
    if (cell.classList.contains('p1')) {
        cell.style.backgroundImage = `url('images/${playerOne.avatar}/${playerOne.marker}.png')`;
    } else if (cell.classList.contains('p2')) {
        cell.style.backgroundImage = `url('images/${playerTwo.avatar}/${playerTwo.marker}.png')`;
    }
}

function swapTurns() {
	isPlayer_TWO_Turn = !isPlayer_TWO_Turn
}



function setBoardHoverClass() {
	boardElement.classList.remove(PLAYER_ONE_CLASS)
	boardElement.classList.remove(PLAYER_TWO_CLASS)
	if (isPlayer_TWO_Turn) {
		boardElement.classList.add(PLAYER_TWO_CLASS)
	} else {
		boardElement.classList.add(PLAYER_ONE_CLASS)
	}
}

function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some(combination => {
		return combination.every(index => {
			return cellElements[index].classList.contains(currentClass)
		})
	})
}
