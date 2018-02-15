//TODO: Capture larger list of words
//  1) create list of words
var wordlist = ["rock", "paper", "scissors"];

//TODO: Build magic word and player placeholder word dynamically...
// 2) randomly select first word (array of characters?)
var winCount = 0;
var gameover = true;

//These are initialized in the setupGame function, called at game start...
var guesses, playerWord, magicWord, wrongGuesses;

promptToPlay("Press any key to begin...");

// 5) create onkey listener
document.onkeyup = function (event) {
    debugger;
    // 6) when player presses key
    var currentGuess = event.key.toUpperCase();

    // Determines which key was pressed.
    if (gameover) {
        //wait for any key to start
        setUpGame();
    } else {
        //  - ignore non-alphabet - ascii (65-90) 
        if (currentGuess.length === 1 && currentGuess.charCodeAt(0) >= 65 && currentGuess.charCodeAt(0) <= 90) {

            // // - ignore previous guesses
            if ((playerWord.indexOf(currentGuess) < 0) && (wrongGuesses.indexOf(currentGuess) < 0)) {

                var ltrPos = magicWord.indexOf(currentGuess);

                if (ltrPos >= 0) {
                    // - if in word, reveal letter in word 
                    playerWord[ltrPos] = magicWord[ltrPos];
                    displayGuess(playerWord);

                } else {
                    // - if not in word, add to guesses
                    addToGuesses(currentGuess);
                }

                // check if end of game
                // - if guess count is 0, 
                if (guesses === 0) {
                    //Declare loser
                    declareFinal("Sorry, you lose!")
                }
                // - if word revealed, add to wins
                if (playerWord.indexOf("-") < 0) {
                    //increment wins
                    incrementWins();

                    //Declare winner
                    declareFinal("WINNER!")

                }

            } else {
                promptToPlay("Guess again...");
            }
        } else {
            promptToPlay("Press any letter to play...");
        }
    }
}

function incrementWins() {
    winCount++;
    document.querySelector("#win-count").innerHTML = winCount;
}

function declareFinal(prompt) {
    prompt += "<br>Press any key to play again."
    gameover = true;
    promptToPlay(prompt);
}

function addToGuesses(currentGuess) {
    wrongGuesses.push(currentGuess);
    document.querySelector("#guesses").innerHTML += currentGuess + " ";
    guesses--;
    document.querySelector("#guesses-left").innerHTML = guesses;
}

function displayGuess(maskedWord) {
    var judge = "";
    maskedWord.forEach(function (element) {
        judge += element + " ";
    });
    document.querySelector("#hidden-word").innerHTML = judge;
}


function setUpGame() {

    gameover = false;
    guesses = 13;
    wrongGuesses = [];
    document.querySelector("#guesses").innerHTML = "";
    magicWord = buildMagicWord()
    playerWord = hidePlayerWord(magicWord);
    displayGuess(playerWord);
    promptToPlay("Press any letter to play...");
}

function promptToPlay(message) {
    document.querySelector("#game-alert").innerHTML = message;
}

function hidePlayerWord(word) {
    // 3) build masked string of proper length for the word
    var hideWord = ["-"];
    for (i = 1; i < word.length; i++) {
        hideWord.push("-");
    }
    return hideWord;
}

function buildMagicWord() {
    var word = pickWord();
    var magic = [""];
    magic.pop();
    for (i = 0; i < word.length; i++) {
        magic.push(word.charAt(i).toUpperCase());
    }
    return magic;
}

function pickWord() {
    return wordlist[Math.floor(Math.random() * wordlist.length)];
}