//  1) create list of words
var wordlist = ["do",
    "if",
    "in",
    "for",
    "int",
    "let",
    "new",
    "try",
    "var",
    "byte",
    "case",
    "char",
    "else",
    "enum",
    "eval",
    "goto",
    "long",
    "null",
    "this",
    "true",
    "void",
    "with",
    "await",
    "break",
    "catch",
    "class",
    "const",
    "false",
    "final",
    "float",
    "short",
    "super",
    "throw",
    "while",
    "yield",
    "delete",
    "double",
    "export",
    "import",
    "native",
    "public",
    "return",
    "static",
    "switch",
    "throws",
    "typeof",
    "boolean",
    "default",
    "extends",
    "finally",
    "package",
    "private",
    "abstract",
    "continue",
    "debugger",
    "function",
    "volatile",
    "arguments",
    "interface",
    "protected",
    "transient",
    "implements",
    "instanceof",
    "synchronized"
];

// 2) randomly select first word (array of characters?)
var winCount = 0;
var gameOver = true;
var gameFinal = false;

//These are initialized in the setupGame function, called at game start...
var guesses, playerWord, magicWord, wrongGuesses;

document.querySelector("#js-guage").className = "btn btn-success";



actionMessage("Press any key to begin...", "alert-info");

// 5) create onkey listener
document.onkeyup = function(event) {

    // 6) when player presses key
    // Determines which key was pressed.
    var currentGuess = event.key.toUpperCase();

    debugger;
    if (gameFinal) {
        return;
    } else if (gameOver) {
        //wait for any key to start
        setUpGame();
    } else {
        //  - ignore non-alphabet - ascii (65-90) 
        if (currentGuess.length === 1 && currentGuess.charCodeAt(0) >= 65 && currentGuess.charCodeAt(0) <= 90) {

            // // - ignore previous guesses
            if ((playerWord.indexOf(currentGuess) < 0) && (wrongGuesses.indexOf(currentGuess) < 0)) {

                var ltrPos = magicWord.indexOf(currentGuess);

                if (ltrPos >= 0) {
                    while (ltrPos >= 0) {
                        // - if in word, reveal letter in word 
                        playerWord[ltrPos] = magicWord[ltrPos];
                        ltrPos++;
                        ltrPos = magicWord.indexOf(currentGuess, ltrPos)
                    }
                    displayGuess(playerWord);

                } else {
                    // - if not in word, add to guesses
                    addToGuesses(currentGuess);
                }

                // check if end of game
                // - if guess count is 0, 
                if (guesses === 0) {
                    updateGauge();
                    //Declare loser
                    declareFinal("Sorry, you lose!", "alert-warning")
                }
                // - if word revealed, add to wins
                if (playerWord.indexOf("-") < 0) {
                    //increment wins
                    incrementWins();

                    //Declare winner
                    declareFinal("WINNER!", "alert-success")

                }

            } else {
                actionMessage("Guess again...", "alert-light");
            }
        } else {
            actionMessage("Press any letter to play...", "alert-info");
        }
    }
}

function updateGauge() {
    var guage = document.querySelector("#js-guage").innerHTML;
    guage = guage.substring(0, guage.length - 1);
    document.querySelector("#js-guage").innerHTML = guage;
    if (guage.length === 0) {
        document.querySelector("#js-guage").className = "";
    } else if (guage.length < 4) {
        document.querySelector("#js-guage").className = "btn btn-danger";
    } else if (guage.length < 8) {
        document.querySelector("#js-guage").className = "btn btn-warning";
    }

}

function incrementWins() {
    winCount++;
    document.querySelector("#win-count").innerHTML = winCount;
}

function declareFinal(prompt, alert) {
    debugger;
    if (document.querySelector("#js-guage").innerHTML.length === 0) {
        prompt = "Sorry!  Try again later.";
        alert = "alert-danger";
        gameFinal = true;
    } else if (winCount >= 10) {
        prompt = "AMAZING!  You are a JavaScript Superstar!";
        alert = "alert-success"
        gameFinal = true;
    } else {
        prompt += " Press any key to play again."
    }
    gameOver = true;
    actionMessage(prompt, alert);
}

function addToGuesses(currentGuess) {
    wrongGuesses.push(currentGuess);
    document.querySelector("#guesses").innerHTML += currentGuess + " ";
    guesses--;
    displayGuessCount();
}

function displayGuess(maskedWord) {
    var judge = "";
    maskedWord.forEach(function(element) {
        judge += element + " ";
    });
    document.querySelector("#hidden-word").innerHTML = judge;
}

function displayGuessCount() {
    document.querySelector("#guesses-left").innerHTML = guesses;
}

function setUpGame() {

    if (document.querySelector("#js-guage").innerHTML.length === 0) {
        // short circuit if gauge is empty
        return;
    }
    gameOver = false;
    guesses = 13;
    wrongGuesses = [];
    document.querySelector("#guesses").innerHTML = "";
    magicWord = buildMagicWord()
    playerWord = hidePlayerWord(magicWord);
    displayGuess(playerWord);
    displayGuessCount();
    actionMessage("Press any letter to play...", "alert-success");
}

function actionMessage(message, alert) {
    document.querySelector("#action-prompt").innerHTML = message;
    document.querySelector("#action-prompt").className = "alert ";
    document.querySelector("#action-prompt").className += alert;
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