/*

1) create list of words
2) randomly select first word (array of characters?)
3) build masked string of proper length for the word
4) initialize guesses to 13
5) create onkey listener
6) when user presses key
    - ignore non-alphabet
    - ignore previous guesses
        - reduce guess count
            - if in word, reveal letter in word 
            - if not in word, add to guesses
    - if guess count is 0, end game
    - if word revealed, add to wins
7) reset and select new word    

*/