//Game values
let min = 1,
max = 10,
winningNum = getRandomNum(min,max),
guessesLeft = 3;

//UI elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play agian event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

//Listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

    //Validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    //Check if won
    if(guess === winningNum){
        //Game Over - Won
        gameOver(true, `${winningNum} is correct, You Win!`);
    }else{
        //Wrong Number
        guessesLeft -= 1;

        if(guessesLeft === 0){
            //Game over - lost
            gameOver(false, `Game Over, You Lost. The correct number was ${winningNum}`);
        }else{
            //Game continues - answer wrong

            //Change border number
            guessInput.style.borderColor = 'red';

            //Clear input
            guessInput.value = '';

            //Tell user its the wrong number
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
        }
    }
});

//Game Over Function
function gameOver(won,msg){
    let color;
    won === true ? color = 'green' : color = 'red';
    //Disable Input
    guessInput.disabled = true;
    //Change border number
    guessInput.style.borderColor = 'color';
    //Change text color
    message.style.color = color;
    //Set message
    setMessage(msg);

    //Play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

//Get random number
function getRandomNum(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

//Set Message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}