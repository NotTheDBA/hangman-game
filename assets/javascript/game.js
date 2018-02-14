
//  1) create list of words
var wordlist = ["rock", "paper", "scissors"];

// 2) randomly select first word (array of characters?)
//TODO Build magic word and player placeholder word dynamically...
var magicWord = ["R", "O", "C", "K"];

// 3) build masked string of proper length for the word
var playerWord = ["-", "-", "-", "-"];

// 4) initialize guesses to 13
var guesses = 13;

var wrongGuesses = [];
var judge;

// 5) create onkey listener
document.onkeyup = function (event) {

    // 6) when player presses key
    // Determines which key was pressed.
    var currentGuess = event.key.toUpperCase();

    // - ignore non-alphabet - ascii (65-90)
    if (currentGuess.charCodeAt(0) >= 65 && currentGuess.charCodeAt(0) <= 90) {

        // // - ignore previous guesses
        if (playerWord.indexOf(currentGuess) < 0) {

            var ltrPos = magicWord.indexOf(currentGuess);

            if (ltrPos >= 0) {
                // - if in word, reveal letter in word 
                playerWord[ltrPos] = magicWord[ltrPos];
                judge = "";
                playerWord.forEach(function (element) {
                    judge += element + " ";
                });
                document.querySelector("#hidden-word").innerHTML = judge;
            } else if (wrongGuesses.indexOf(currentGuess) < 0) {
                // - if not in word, add to guesses
                wrongGuesses.push(currentGuess);
                document.querySelector("#guesses").innerHTML += currentGuess + " ";
                guesses--;
                document.querySelector("#guesses-left").innerHTML = guesses;
            }
            // - if guess count is 0, end game
            // - if word revealed, add to wins
            // 7) reset and select new word    
        }
    }
}
