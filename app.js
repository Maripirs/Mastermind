const submitGuess = document.querySelector('#submitGuess')
const userInput = document.querySelector('#userInput')
const guessDisplay = document.querySelectorAll('.guess')
const playAgainBtn = document.querySelector('.playAgain')
const solutionReveal = document.querySelector('.solution')
const gameEnd = document.querySelector('.gameEnd')
const gameResult = document.querySelector('#gameResult')
const gameResult2 = document.querySelector('#gameResult2')
const finalScreen = document.querySelector('.finalScreen')
const evalSpot = document.querySelectorAll('.evalSpot')
const resetBtn =document.querySelector('#mainScreen')


const guessColor = 'rgb(50, 1, 50)';
const evalColor = 'rgb(64, 64, 64)';

const choices =['rgb(0, 128, 0)', 'rgb(0, 0, 255)', 'rgb(255, 255, 0)', 'rgb(255, 0, 0)', 'rgb(0, 0, 0)', 'rgb(255, 255, 255)' ]
let solution = []
let round = 1


let userGuess = []
let gameOver = false


const evaluation = {
    rightPlace: 0,
    rightColor: 0
}

//random solution based on the 'choices' array
const generateSolution = () =>{
    for (let i = 0 ; i < 4; i++){
        let indexChoice = Math.floor(Math.random()*(6) )
        solution.push(choices[indexChoice])
    }
}
generateSolution()


//displays solution at top. Should only be called if the game is over
//useful for testing
const displaySolution = () => {
    document.querySelector(`#solutiona`).style.backgroundColor = solution[0]
    document.querySelector(`#solutionb`).style.backgroundColor = solution[1]
    document.querySelector(`#solutionc`).style.backgroundColor = solution[2]
    document.querySelector(`#solutiond`).style.backgroundColor = solution[3]
}

displaySolution()

//asigns the user an array based on the colors of the circles when called
const getUserGuess = () => {
    const userA =document.querySelector('#usera')
    const userB =document.querySelector('#userb')
    const userC =document.querySelector('#userc')
    const userD =document.querySelector('#userd')
    const index0 = window.getComputedStyle(userA).backgroundColor
    const index1 = window.getComputedStyle(userB).backgroundColor
    const index2 = window.getComputedStyle(userC).backgroundColor
    const index3 = window.getComputedStyle(userD).backgroundColor
    
    userGuess = [index0,index1,index2, index3]
} 

//changes the color of the circles in the current round to match the user guesses
const updateGuess = (round) => {
        const guess1a = document.querySelector(`#guess${round}a`)
        const guess1b = document.querySelector(`#guess${round}b`)
        const guess1c = document.querySelector(`#guess${round}c`)
        const guess1d = document.querySelector(`#guess${round}d`)
        
        guess1a.style.backgroundColor =userGuess[0]
        guess1b.style.backgroundColor =userGuess[1]
        guess1c.style.backgroundColor =userGuess[2]
        guess1d.style.backgroundColor =userGuess[3]
}

//updates the 'evaluation' object based on the amount of correct guesses
//for current round
const compareGuesses = (solution, guess) => {
    let tempSolution =[]

    solution.forEach(element => {
        if (element === choices[0]){
            tempSolution.push('green')
        } else if (element === choices[1]){
            tempSolution.push('blue')
        } else if(element === choices[2]){
            tempSolution.push('yellow')
        } else if (element === choices[3]){
            tempSolution.push('red')
        } else if(element === choices[4]){
            tempSolution.push('black')
        } else if (element === choices[5]){
            tempSolution.push('white')
        }   
    });
    let tempGuess = []
    guess.forEach(element => {
        if (element === choices[0]){
            tempGuess.push('green')
        } else if (element === choices[1]){
            tempGuess.push('blue')
        } else if(element === choices[2]){
            tempGuess.push('yellow')
        } else if (element === choices[3]){
            tempGuess.push('red')
        } else if(element === choices[4]){
            tempGuess.push('black')
        } else if (element === choices[5]){
            tempGuess.push('white')
        }   
    })
    console.log(tempSolution)
    // let tempSolution = [...solution]
    // let tempGuess = [...guess]
    for (let i = 0; i<4; i++ ) {
        if (tempGuess[i] === tempSolution [i]) {
            evaluation.rightPlace += 1
            tempSolution[i] = 0
            tempGuess[i] = 0
        }
    }
    for (let i = 0; i<4; i++ ) {
        if (tempGuess[i] === 0) {
            continue
        }else if (tempSolution.includes(tempGuess[i])){
            evaluation.rightColor += 1
            tempSolution[tempSolution.indexOf(tempGuess[i])] = 0
            tempGuess[i] = 0
        }
    }
    console.log(evaluation)
    return evaluation
    
}
//changes colors of markers on the rigth of the current round according
//to evaluation
const drawHints = (result,round) => {
    const ev0 = document.querySelector(`#ev${round}a`)
    const ev1 = document.querySelector(`#ev${round}b`)
    const ev2 = document.querySelector(`#ev${round}c`)
    const ev3 = document.querySelector(`#ev${round}d`)
    const evArr = [ev0, ev1, ev2, ev3]
    
    let green = result.rightPlace
    let yellow = result.rightColor

    for (let i = 0; i < 4; i++) {
        if (green > 0){
            evArr[i].style.backgroundColor ='green'
            green --
        }else if( yellow >0){
            evArr[i].style.backgroundColor = 'yellow'
            yellow --
        }

    }

}

//resets the circles to original color
const clearGuesses = (container) =>{
    container.style.backgroundColor = 'rgb(50, 1, 50)'
}
const clearHints = (container) =>{
    container.style.backgroundColor = 'rgb(64, 64, 64)'
}

// clears screen and generates new solution
const resetGame =() => {
    solutionReveal.style.visibility = 'hidden'
    solution = []
    generateSolution()
    displaySolution()
    gameEnd.style.display = 'none';
    gameOver = false;
    guessDisplay.forEach(clearGuesses)
    evalSpot.forEach(clearHints)
    submitGuess.style.display = 'flex'
    resetBtn.style.display = 'none'
    round = 1
}

//checks for the current color of the button and moves up on the array
//if already at the end it resets
//Only works if game is not over
const rotateColors = (currentColor, circle) =>{
    if (gameOver === false){
        if (currentColor === choices[choices.length-1]){
            currentColor = choices[0]
        } else{
            currentColor = choices[choices.indexOf(currentColor)+1]
        }
        circle.style.backgroundColor = `${currentColor}`
    }
}

const checkGameEnd = () =>{
    return (evaluation.rightPlace === 4 || round === 10)
}

const displayGameEnd =() =>{
    displaySolution()
    gameEnd.style.display = 'flex'
    solutionReveal.style.visibility = 'visible'
    if (evaluation.rightPlace === 4){
        gameResult.textContent = `Congratulations! `
        gameResult2.textContent = `You won in round ${round}`
    } else {
        gameResult.textContent = `Sorry :( `
        gameResult2.textContent = `You didn't guess in time`
    }
} 



//main function triggered when submit button is clicked
const pushGuess = () => {
    evaluation.rightColor = 0
    evaluation.rightPlace = 0
    if (gameOver === false){
        getUserGuess()
        if (userGuess.includes('rgb(50, 1, 50)')=== false ){
            updateGuess(round)
            let result = compareGuesses (solution,userGuess)
            drawHints(result, round)
            gameOver = checkGameEnd()
            if (gameOver) {
                displayGameEnd()
            }
            round ++
        }else{
            console.log('Please complete your guess')
        }
    }
}




//rotate colors if user clicks on them only if the game hasn't ended
userInput.addEventListener('click', function (e){
    if (e.target.className === 'guess guessInput' && gameOver === false){

        let circle = e.target
        currentColor =window.getComputedStyle(circle).backgroundColor
        rotateColors(currentColor, circle)
    }
})


finalScreen.addEventListener('click', function (){
    gameEnd.style.display = 'none'
    submitGuess.style.display = 'none'
    resetBtn.style.display = 'flex'
})


resetBtn.addEventListener('click', resetGame)

playAgainBtn.addEventListener('click', resetGame)

// listening for the submit button to play a round of the came
submitGuess.addEventListener('click',pushGuess)
