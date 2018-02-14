
//  1) create list of words
var wordlist = ["rock", "paper", "scissors"];
var guesses = 13;
var wrongGuesses = [];

//TODO Build magic word and player placeholder word dynamically...
var magicWord = ["R", "O", "C", "K"];
var playerWord = ["-", "-", "-", "-"];
var judge;

// 5) create onkey listener
document.onkeyup = function (event) {

    // 2) randomly select first word (array of characters?)
    // 3) build masked string of proper length for the word
    // 4) initialize guesses to 13

    // 6) when player presses key
    // Determines which key was pressed.
    var playerGuess = event.key.toUpperCase();

    // - ignore non-alphabet - ascii (65-90)
    if (playerGuess.charCodeAt(0) >= 65 && playerGuess.charCodeAt(0) <= 90) {
        var ltrPos = magicWord.indexOf(playerGuess);
        if (ltrPos >= 0) {
            playerWord[ltrPos] = magicWord[ltrPos];
            judge = "";
            playerWord.forEach(function (element) {
                judge += element + " ";
            });
            document.querySelector("#hidden-word").innerHTML = judge;
        }
        // // - ignore previous guesses
        // if (guesses.indexOf(playerGuess) < 0) {
        //     // - reduce guess count
        //     // - if in word, reveal letter in word 
        //     // - if not in word, add to guesses
        //     wrongGuesses.push(playerGuess);
        //     document.querySelector("#guesses").innerHTML += playerGuess + " ";
        //     // - if guess count is 0, end game
        //     document.querySelector("#guesses-left").innerHTML = guesses;
        // }
    }

    // - if word revealed, add to wins
    // 7) reset and select new word    
}