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
var gameover = true;

//These are initialized in the setupGame function, called at game start...
var guesses, playerWord, magicWord, wrongGuesses;

document.querySelector("#js-guage").className = "btn btn-success";



promptToPlay("Press any key to begin...");

// 5) create onkey listener
document.onkeyup = function (event) {

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

function declareFinal(prompt) {
    if (document.querySelector("#js-guage").innerHTML.length === 0) {
        prompt = "Sorry!  Try again later.";
    } else {
        prompt += "<br>Press any key to play again."
    }
    gameover = true;
    promptToPlay(prompt);
}

function addToGuesses(currentGuess) {
    wrongGuesses.push(currentGuess);
    document.querySelector("#guesses").innerHTML += currentGuess + " ";
    guesses--;
    displayGuessCount();
}

function displayGuess(maskedWord) {
    var judge = "";
    maskedWord.forEach(function (element) {
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
    gameover = false;
    guesses = 13;
    wrongGuesses = [];
    document.querySelector("#guesses").innerHTML = "";
    magicWord = buildMagicWord()
    playerWord = hidePlayerWord(magicWord);
    displayGuess(playerWord);
    displayGuessCount();
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