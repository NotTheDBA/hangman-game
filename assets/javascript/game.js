
//  1) create list of words
var wordlist = ["rock", "paper", "scissors"];

var guesses = [];

// 5) create onkey listener
document.onkeyup = function (event) {

    // 2) randomly select first word (array of characters?)
    // 3) build masked string of proper length for the word
    // 4) initialize guesses to 13

    // 6) when user presses key
    // Determines which key was pressed.
    var userGuess = event.key.toUpperCase();

    // - ignore non-alphabet - ascii (65-90)
    if (userGuess.charCodeAt(0) >= 65 && userGuess.charCodeAt(0) <= 90) {
        // - ignore previous guesses
        if (guesses.indexOf(userGuess) < 0) {
            // - reduce guess count
            // - if in word, reveal letter in word 
            // - if not in word, add to guesses
            guesses.push(userGuess);
            document.querySelector("#guesses").innerHTML += userGuess + " ";
            // - if guess count is 0, end game
            document.querySelector("#guesses-left").innerHTML = (13 - guesses.length);
        }
    }

    // - if word revealed, add to wins
    // 7) reset and select new word    
}