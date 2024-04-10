'use strict';
const game = {
    cardDisplay: document.getElementById('card'),
    body: document.getElementById('body'),
    btnHigher: document.getElementById('btnhigher'),
    btnLower: document.getElementById('btnlower'),
    scoreString: document.getElementById('score'),
    resultString: document.getElementById('result'),
    gameScreen: document.getElementById('GRS'),
    startstartGameButton: document.getElementById('startstartGame'),
    startGameButton: document.getElementById('startGame'),
    restartGameButton:document.getElementById('restartGame'),
    overrestartGameButton:document.getElementById('overrestartGame'),
    endGameButton: document.getElementById('endGame'),
    gamePauseScreen: document.getElementById('GPS'),
    gameStartScreen: document.getElementById('GSS'),
    resumeGameButton: document.getElementById('resumeGame'),
    pauseScoreString: document.getElementById('pauseScore'),
    endGameScreen: document.getElementById('GES'),
    endScoreString: document.getElementById('endScore'),
    rulesButton : document.getElementById('rules'),
    changeDesk: document.getElementById('desk'),
    exitRules: document.getElementById('ruleExitBTN'),
    isRunning: false,
    isSuccess: true,
    isRed: false,
    isRules: false,
    score: 0,
    previosCardValue: 0,
    CurrentCardValue: 0,
    lastScore: 0,
    toggleRunning: function() {
        this.isRunning = !this.isRunning;
        const gameRunningScreen = document.querySelector('#GRS');
        this.startGameButton.textContent = this.isRunning ? "Pause Game" : "Resume Game";
        this.startGameButton.style.backgroundColor = this.isRunning ? "red" : "green";
        if(this.isRunning)
        {
            game.gameScreen.style.visibility = 'visible';
            game.startGameButton.style.visibility = 'visible';
            game.gameScreen.style.display = 'flex';
            game.gamePauseScreen.style.display = 'none';
            game.gameStartScreen.style.display = 'none'
        }
        else
        {
            game.gamePauseScreen.style.visibility = 'visible'
            game.gameScreen.style.visibility = 'hidden';
            game.startGameButton.style.visibility = 'visible';
            game.gamePauseScreen.style.display = 'flex';
            game.gameScreen.style.display = 'none';
            game.pauseScoreString.textContent = `Your Current Score Is: ${game.score ? game.score : game.lastScore}`
        }
    },
    // toggleDesk: function() {
    //     this.isRed = !this.isRed;
    //     if(this.isRed)
    //     {
    //         game.body.style.backgroundImage = 'url(./images/free-vector-casino-royale-background.jpg)'
    //     }
    //     else
    //     {
    //         game.body.style.backgroundImage = 'url(./images/vecteezy_green-casino-poker-table-texture-game-background_24232274.jpg)'
    //     }
    // },
    getRandomInt: function(min, max)
    {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    updateScore: function()
    {
        game.score++;
        game.scoreString.textContent = `Score: ${game.score}`;
    },
    isSuccessRight: function(lowerOrHigher , currentCard)
    {
        this.previosCardValue = this.CurrentCardValue;
        this.CurrentCardValue = currentCard;
        if(lowerOrHigher === 'lower')
        {
            if(this.CurrentCardValue <= this.previosCardValue)
            {
                this.isSuccess = true
                game.updateScore();
            }
            else
            {
                this.isSuccess = false;
                game.gameScreen.style.display = 'none';
                game.endGameScreen.style.visibility = 'visible'
                game.endGameScreen.style.display = 'flex';
                game.endScoreString.textContent = `Your Score Is: ${game.score ? game.score : game.lastScore}`
            }
        }
        else if(lowerOrHigher === 'higher')
        {
            if( this.CurrentCardValue >= this.previosCardValue)
            {
                this.isSuccess = true
                game.updateScore();
            }
            else
            {
                this.isSuccess = false;
                game.gameScreen.style.display = 'none';
                game.endGameScreen.style.visibility = 'visible'
                game.endGameScreen.style.display = 'flex';
                game.endScoreString.textContent = `Your Score Is: ${game.score ? game.score : game.lastScore}`
            }
        }
    },
    updateResultsMessage: function()
    {
        if(this.isSuccess)
        {
            game.resultString.textContent = 'You Guessed Correct';
        }
        else
        {
            game.resultString.textContent = `You Lost with score: ${this.score}`;
            game.lastScore = game.score;
            this.score = 0;
        }
    },
    restart: function () {
        location.reload();
    },
}   

document.addEventListener('DOMContentLoaded', function()
{
    let randomCard = game.getRandomInt(2,14);
    let randomCardClass = game.getRandomInt(1,4);
    game.CurrentCardValue = randomCard;
    game.gameStartScreen.style.display = 'flex';
    game.gameScreen.style.display = 'none';
    game.cardDisplay.style.backgroundImage = `url(./images/PNG-cards-1.3/${randomCard}_of_${randomCardClass}.png)`
});
game.btnHigher.addEventListener('click', function() {
    let randomCard = game.getRandomInt(2,14);
    let randomCardClass = game.getRandomInt(1,4);
    game.isSuccessRight('higher', randomCard);
    game.updateResultsMessage();
    console.log(randomCard);
    console.log(randomCardClass);
    game.cardDisplay.style.backgroundImage = `url(./images/PNG-cards-1.3/${randomCard}_of_${randomCardClass}.png)`
});
game.btnLower.addEventListener('click', function() {
    let randomCard = game.getRandomInt(2,14);
    let randomCardClass = game.getRandomInt(1,4);
    game.isSuccessRight('lower', randomCard);
    game.updateResultsMessage();
    console.log(randomCard);
    console.log(randomCardClass);
    game.cardDisplay.style.backgroundImage = `url(./images/PNG-cards-1.3/${randomCard}_of_${randomCardClass}.png)`
});
game.startGameButton.addEventListener('click', function() {
    game.toggleRunning();
});
game.restartGameButton.addEventListener('click', function() {
    game.restart();
});
game.overrestartGameButton.addEventListener('click', function() {
    game.restart();
});
game.endGameButton.addEventListener('click', function() {
    game.restart();
});
game.resumeGameButton.addEventListener('click', function() {
    game.toggleRunning();
});
game.startstartGameButton.addEventListener('click', function() {
    game.toggleRunning();
});

game.rulesButton.addEventListener('click', function() {
    document.getElementById('GRuleS').style.visibility = 'visible';
});
game.exitRules.addEventListener('click', function() {
    document.getElementById('GRuleS').style.visibility = 'hidden';
});
// game.changeDesk.addEventListener('click', function(){
//     game.toggleDesk();
// })