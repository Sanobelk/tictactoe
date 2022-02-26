let game = false;
let turn = 0;
let playerTurn = false;

const spots = document.querySelectorAll('.box');
const winConditions = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];

const playerSpots = [];
const aiSpots = [];



const startGame = document.getElementById('startGame');
startGame.addEventListener('click',function(){
    game = true;
    //this.disabled = true;
    let turn = firstTurnCalc();
    if(turn == 1 && game == true){
        playerStart();
    }else{
        aiStart();
    }
})

function firstTurnCalc(){
    return Math.floor(Math.random() * 2) + 1;
}

spots.forEach(element =>{
    element.addEventListener('click',function(){
    if(playerTurn && element.innerHTML != "O"){
            element.innerHTML = "X";
            turn++;
            let num = +element.getAttribute('val');
            playerSpots.push(num);
            let gameStatus = winCondition(winConditions,playerSpots,aiSpots);
            if(!gameStatus){
                aiStart();
            }
        }
    });
});

function playerStart(){
    console.log("Player Start");
    playerTurn = true;
}
function aiStart(){
    console.log("AI Start");
    playerTurn = false;
    let aiPlay = +Math.floor(Math.random() * 8) + 1;
    console.log("AI PLAY " + (aiPlay + 1));
    if(spots[aiPlay].innerHTML == "X"){
        console.log('X played there');
        aiStart();
    }else if(spots[aiPlay].innerHTML == "O"){
        console.log('O played there...');
        aiStart();
    }else{
        spots[aiPlay].innerHTML = "O";
        turn++;
        playerStart();
    }

}

function winCondition(winConditions, playerSpots, aiSpots){
    let playerWon = false;
    playerSpots = playerSpots.sort(function(a,b){
        return a-b;
    });
    for(let i = 0; i < winConditions.length; i++){
        let arr = winConditions[i];
        if(playerSpots.length === arr.length && playerSpots.every(spot => arr.includes(spot))){
            alert('you win');
            playerWon = true;
        }
    }
    return playerWon;
}
