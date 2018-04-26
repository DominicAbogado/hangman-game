$(document).ready(function () {
    // Global Variables for application
    var again = "Would you like to play again?"
    var wrongLetter = [] // Stores wrong uer input
    var underScores = [] // displays the underscroes to the screen
    var winCondition = [] // the correct user input
    //Create an array of words
    var gotNames = ["tyrion", "stark", "dragon", 'jaime', 'greyjoy']
    var gameOver = false
    var lives = 4 //Create Variables for user lives,

    // Global Functions
    // This creates the underscores displayed to the screen
    function genUnderScores() {
        randNum = Math.floor(Math.random() * gotNames.length);
        chosenWord = gotNames[randNum]
        letters = chosenWord.split('');
        for (let i = 0; i < letters.length; i++) {
            underScores.push('_');
        }
        return underScores;
    }
    // Runs the application
    function startGame() {
        // sets each recoreded array to an empty array
        underScores = []
        winCondition = []
        wrongLetter = []
        $("#wrongGuess").text(wrongLetter)
        lives = 4
        genUnderScores();
        $('#theWord').text(underScores);
        $('#lives').text(lives);
        document.onkeyup = littleFinger
    }
    // handles the game ending 
    function endGame() {
        var userResponse = confirm(again)
        if (userResponse == true) {
            startGame()
        } else {
            alert("Thank you for playing the game of Thrones")
        }
    }

    //  The logic for the hangman game
    function littleFinger(event) {
        if (gameOver) { return; }
        userGuess = String.fromCharCode(event.keyCode).toLowerCase();
        var replace = (chosenWord.indexOf(userGuess));
        // logic for incorrect guess
        if (replace < 0) {
            wrongLetter.push(userGuess);
            console.log(wrongLetter)
            $("#wrongGuess").text(wrongLetter);
            lives--;
            $('#lives').text(lives);
        }
        // logic for correct guess
        if (replace >= 0) {
            underScores[replace] = userGuess;
            $('#theWord').text(underScores);
            winCondition.push(userGuess);
            console.log(winCondition)
        }
        // logic for when user runs out of lives
        if (lives == 0) {
            alert('You are no true heir to the Iron Throne')
            alert('Something terrible has happened to you in the worst imaginable way possible')
            endGame()
        }
        // determines whether the user has won
        if (winCondition.length == letters.length) {
            setTimeout(function () {
                alert('You have won the Game of Thrones')
                gameOver = false;
                endGame()
            }, 500)
        }
    }
    //Start the Game
    $('.row').on('click', ".start-btn", startGame);
})

