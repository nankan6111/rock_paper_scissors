const player = document.querySelector(".player div");
const computer = document.querySelector(".computer div");
const playerScore = document.querySelector(".player p");
const computerScore = document.querySelector(".computer p");

const promptBoard = document.querySelector(".prompt");
const promptButton = document.querySelector(".prompt button");
const promptHeader = document.querySelector(".prompt h2");
const promptMessage = document.querySelector(".prompt span");

const displayBoard = document.querySelector(".displayBoard");
const optionBoard = document.querySelector(".optionBoard");
const message = document.querySelector(".message");

let pScore = 0;
let cScore = 0;



function game() {
startGame();

const buttons = document.querySelectorAll(".btn");
buttons.forEach(button =>{
    button.addEventListener("click", function(){playRound(this.getAttribute("id"))});
    button.addEventListener("transitionend", function(){});
});

}

function startGame(){
promptButton.addEventListener("click", function(){
    promptBoard.classList.add("fadeOut");
    promptBoard.classList.remove("fadeIn");
    displayBoard.classList.remove("fadeOut");
    optionBoard.classList.remove("fadeOut");
    displayBoard.style.top = "0vh";
    optionBoard.style.top = "-25vh";
});
}


function gameManager(m){
let winner = "";
if(m.match(/Win/i)) pScore++;
else if(m.match(/Lose/i)) cScore++;

playerScore.innerHTML = pScore;
computerScore.innerHTML = cScore;
message.innerHTML = m;

if(pScore==5 || cScore==5){
    setTimeout(function(){
        if(pScore==5) promptHeader.innerHTML = "You Win!";
        else promptHeader.innerHTML = "Computer Win!";

        promptMessage.innerHTML = `${pScore} : ${cScore}`;

        promptBoard.classList.add("fadeIn");
        displayBoard.classList.add("fadeOut");
        optionBoard.classList.add("fadeOut");
        promptButton.innerHTML = "Play Again";

        startGame();

        pScore = 0;
        cScore = 0;
        message.innerHTML = "Choose Your Move!";
        playerScore.innerHTML = pScore;
        computerScore.innerHTML = cScore;
    }, 1000);

}
}

function animation(obj, hand){
if(obj.getAttribute("id") === "playerHand"){
    obj.classList.remove("playerShootAnimation");
    void obj.offsetWidth;
    obj.classList.add("playerShootAnimation");
}else{
    obj.classList.remove("computerShootAnimation");
    void obj.offsetWidth;
    obj.classList.add("computerShootAnimation");
}

setTimeout(function(){
    obj.style.background = `url(images/${hand}.png) no-repeat center`;
}, 800);
}

function computerPlay() {
let hand = ["rock", "paper", "scissors"];
let i = Math.floor(Math.random()*3);

return hand[i];
}

function playRound(playerSelection){
playerSelection = playerSelection.toLowerCase();
computerSelection = computerPlay().toLowerCase();
let hand = {r:"rock", p:"paper", s:"scissors"};
let outcome = {w:"You Win! ", l:"You Lose! ", d:"Draw!"};
let rule= {r:"Rock crushes Scissors", p:"Paper covers Rock", s:"Scissors cut Paper"};
let m = "";

animation(player, playerSelection);
animation(computer, computerSelection);


if(playerSelection === computerSelection) {
    m = outcome.d;
}else{
    switch(playerSelection) {
        // players is rock
        case hand.r:
            // player wins, rock crushes scissors
            if(computerSelection === hand.s) m = outcome.w + rule.r;
            // player loses, paper covers rock
            else m = outcome.l + rule.p;
            break;
        // players is paper
        case hand.p:
            // player wins, paper covers rock
            if(computerSelection === hand.r) m = outcome.w + rule.p;
            // player loses, scissors cut paper
            else m = outcome.l + rule.s;
            break;
        // player is scissors
        case hand.s:
            // player wins, scissors cut paper
            if(computerSelection === hand.p) m = outcome.w + rule.s;
            // player loses, rock crushes scissors
            else m = outcome.l + rule.r;
            break;

        default:
            m = "Invalid input";
    } 
}

setTimeout(function(){gameManager(m)}, 1000);
}

game();