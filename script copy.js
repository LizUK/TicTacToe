const
    welcomeScreen = document.getElementById('welcome-screen'),
    multiPlayerBtn = document.getElementById('multi-btn'),
    gameOptions = document.getElementById('game-options'),
    gameForm = document.getElementById('game-form'),
    gamePage = document.getElementById('game'),
    playerOneName = document.querySelector('#player-one-panel .player-name h3'),
    playerTwoName = document.querySelector('#player-two-panel .player-name h3');
    const obj1 ={
        name: '',
        avatar: '',
        marker: '',
        moves: []
        }
    const obj2 ={
        name: '',
        avatar: '',
        marker: '',
        moves: [],
        }

//// OPEN GAME OPTIONS /////

multiPlayerBtn.addEventListener('click', multiPlayers);

function multiPlayers() {
    welcomeScreen.classList.add('no-display');
    gameOptions.classList.remove('no-display');
}


/////     /////

//// OPEN GAME  /////

gameForm.addEventListener('submit', getGameOptions);

function getGameOptions(event) {
    event.preventDefault();
    gameOptions.classList.add('no-display');
    gamePage.classList.remove('no-display');

    let getPlayerOneName = document.getElementById('playerone-name').value;
    if (getPlayerOneName === '') {
        getPlayerOneName = 'Player One'
    }
    let getPlayerTwoName = document.getElementById('playertwo-name').value;
    if (getPlayerTwoName === '') {
        getPlayerTwoName = 'Player Two'
    }
    playerOneName.innerHTML = getPlayerOneName;
    playerTwoName.innerHTML = getPlayerTwoName;

    let playerOneAvatar = document.querySelector('#player-one-panel .player-avatar img');
    let playerTwoAvatar = document.querySelector('#player-two-panel .player-avatar img');
    let playerOneMarker = document.querySelector('#player-one-panel .player-marker img');
    let playerTwoMarker = document.querySelector('#player-two-panel .player-marker img');

    var avatarOne = document.querySelector("input[type='radio'][name=p1avatar]:checked").value;
    var avatarTwo = document.querySelector("input[type='radio'][name=p2avatar]:checked").value;

    var markerOne = document.querySelector("input[type='radio'][name=p1marker]:checked").value;
    var markerTwo = document.querySelector("input[type='radio'][name=p2marker]:checked").value;


    playerOneAvatar.src = 'images/' + avatarOne + '.png';
    playerTwoAvatar.src = 'images/' + avatarTwo + '.png';

    playerOneMarker.src = 'images/' + avatarOne + '/' + markerOne + '.png';
    playerTwoMarker.src = 'images/' + avatarTwo + '/'  + markerTwo + '.png';


    const player1 = {
        name: getPlayerOneName,
        avatar: avatarOne,
        marker: playerOneMarker,
        moves: []
    }
    Object.assign(obj1, player1)

    const player2 = {
        name: getPlayerTwoName,
        avatar: avatarTwo,
        marker: playerOneMarker,
        moves: []
    }
    Object.assign(obj2, player2)
    
    return (
        player1,
        player2
    )
       

}

const pOne = getGameOptions.obj1;
const pTwo = getGameOptions.obj2;
console.log("pOne, pTwo --->", pOne, pTwo);

console.log("obj1, 2", obj1, obj2);
document.querySelector('#player-one-panel .player-avatar').addEventListener('click', show)

function show() {
console.log('Players are '+ pOne + '& '+ pTwo);
}


/////     /////


//// GAME  /////

const players =() =>{
    console.log("obj1, 2", obj1, obj2);
}
players();


const game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;
   
    const start = () => {
        players = [
            createPlayer(pOne, markerOne),
            createPlayer(pTwo, markerTwo)
        ]

        currentPlayerIndex = 0;
        gameOver = false;

    }
    return {
        start,
    };
    
})();



if(form.getAttribute('id')=="multiPlayerGame"){
    const playerTwoObject = {
        name: document.getElementById('playertwo-name').value,
        avatar: document.querySelector("input[type='radio'][name=p2avatar]:checked").value,
        marker: document.querySelector("input[type='radio'][name=p2marker]:checked").value,
        score: '= 0'
    }
    Object.assign(playerTwo, playerTwoObject);
} else {
        const playerTwoObject = {
            name: "Computer",
            avatar: 'avc',
            marker: 'cross',
            score: '= 0'
    }
    Object.assign(playerTwo, playerTwoObject);

};




function computerTurns() {
    
    if(moves == ODD) {
       let computerMove = Math.floor(Math.random() * 10);
    }
    
    return computerMove;
}

console.log(computerMove);