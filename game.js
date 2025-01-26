// CODE FOR THE game.html (a.k.a GAME SESSION PAGE)

// queries the "Go Back to Home" div
const goHome = document.querySelector("#gohomediv");

// queries the "Play Again" anchor tag
const reset = document.querySelector("#reset-btn")

// Adding a click event listener to the "Go Back to Home" div (if the user clicks it, then they will be asked if they are sure that they want to proceed; if they say NO, then they'll stay on the game.html page, but if they say YES, then they'll be redirected to the index.html page)
goHome.addEventListener("click", (e) => {
  let youSure = confirm("Are you sure you want to proceed? All progress in the current game session will be lost.");
  if (youSure === true) {
    window.location.replace("https://huzayfahawan.github.io/Mr.-Midnight-The-Logophile-Hangman-/game.html");
  };
});

// queries the "GENERATE WORD" button
const generateBtn = document.querySelector("#generatebtn");

// queries the "Press a letter on your keyboard" message
const pressLetter = document.querySelector("#pressaletter");

// queries the on-screen alphabet
const onScreenAlpha = document.querySelector("#alphabet");

// queries the container that will hold each dash displayed on-screen
const dashes = document.querySelector("#dashesflex");

// queries the container that will hold each letter displayed on-screen
const letters = document.querySelector("#lettersflex");

// Declaring a variable that keeps track of how many wrong guesses the user has made
let wrong = 0;

// Setting this boolean to false intially (will turn true when the user reaches 6 incorrect guesses, or when the user guesses all of the letters in the secret word)
let gameOver = false;

// Checks if the key that the user pressed is in the string stored in the "secretWord" variable (if it is, then all instances of that letter in the secret word are unhidden; if it isn't, then the image displaying the noose will be updated)
function checkGuess(word, array) {
  // This if-statement checks to see if the secret word includes the most recent guess of the user (the most recent key that they pressed)
  if (word.includes(array.slice(-1))) {
    
    // queries all elements with the class name .(whatever letter the user guessed)
    let unHideCorrectLetter = document.querySelectorAll(`.${array.slice(-1)}`);
    
    // For each element stored in "unHideLetter", the class name that makes the letter black (to blend in with the background color to create the illusion of the letter being hidden) will now be turned green (to create the illusion that the letter has become unhidden with the green color symbolizing a correct guess)
    unHideCorrectLetter.forEach((correct_guess) => {
      correct_guess.classList.remove("has-text-black");
      correct_guess.style.color = "#00FF00"
    });

    // This boolean is initialized to be "true" and that assumption will only be changed to "false" if the "all_guesses" array DOES NOT include every letter of the secret word
    let userWins = true;
    
    // Checks to see if the "all_guesses" array (which is passed in to this function as a parameter) DOES NOT have each letter of the secret word present inside of it (if that is the case, that the boolean "userWins" is set to false because the user hasn't won yet -> doesn't change back to "true" b/c there is no conditional that allows that to happen even if the other letters are present in the "all_guesses" array)
    for (let i = 0; i < word.length; i++) {
      if (!array.includes(word[i])) {
        userWins = false;
      };
    };
    
    if (userWins) {
      // Displays a "You Win" message on-screen along with unhiding the "Play Again" button, which refreshes the page upon the user's click
      let youWinMessage = document.querySelector("#onscreenalphabet");
      youWinMessage.classList.add("GAMEOVER");
      youWinMessage.innerHTML = "Congratulations, You Win! &#129395;";
      youWinMessage.style = "padding-bottom: 30px; font-family: 'Fira Mono', monospace; font-size: 45px;";
      reset.classList.remove("is-hidden");
      
      // Setting the "gameOver" boolean to true, so the user can't continue playing the game
      gameOver = true;
    }
  }
  // If the user's most recent guess is not in the "secretWord" variable, then the user's guess is wrong, meaning that the following code will be executed to update the image of the noose on-screen
  else {
    // queries the image displaying the noose on-screen
    let noose = document.querySelector("#noose");
    // Incrementing the "wrong" variable by 1 for each incorrect guess the user makes (the first wrong guess would make wrong = 1, the second wrong guess -> wrong = 2, and so on until the user makes 6 incorrect guesses)
    wrong++;
    if (wrong === 1) {
      noose.src = "Wrong_1.png";
    }
    else if (wrong === 2) {
      noose.src = "Wrong_2.png";
    }
    else if (wrong === 3) {
      noose.src = "Wrong_3.png";
    }
    else if (wrong === 4) {
      noose.src = "Wrong_4.png";
    }
    else if (wrong === 5) {
      noose.src = "Wrong_5.png";
    }
    else if (wrong === 6) {
      noose.src = "Wrong_6.png";
      // queries all of the letters on-screen with the class .alpha (which is all of the letters in secretWord) -> unhides the letters that weren't guessed correctly by turning their color to red
      let unHideWrongLetter = document.querySelectorAll(".alpha");
      unHideWrongLetter.forEach((wrong_guess) => {
        if (wrong_guess.classList.contains("has-text-black")) {
          wrong_guess.classList.remove("has-text-black");
          wrong_guess.style.color = "#FF3131";
        };
      });
      
      // Setting the "gameOver" boolean to true, so the user can't continue playing the game
      gameOver = true;
      
      // Displays a "You Lose" message on-screen along with unhiding the "Play Again" button, which refreshes the page upon the user's click
      let youLoseMessage = document.querySelector("#onscreenalphabet");
      youLoseMessage.classList.add("GAMEOVER");
      youLoseMessage.innerHTML = "GAME OVER, You Lose! &#128577;";
      youLoseMessage.style = "padding-bottom: 30px; font-family: 'Fira Mono', monospace; font-size: 45px;";
      reset.classList.remove("is-hidden");
    };
  };
};

// This function checks if the string passed in (a.k.a the key that the user types in) is a letter or not
function isAlpha(string) {
  // This will return true if the string contains a letter
  return /[a-zA-Z]/.test(string);
};

// This array will store each guess that the user makes (by pressing a key)
let all_guesses = [];

// Adding a click event listener to the "GENERATE WORD" button
generateBtn.addEventListener("click", async (e) => {
  
  // Fetching a random word from the Random Word API
  let response = await fetch(`https://random-word-api.herokuapp.com/word`);
  
  // Converting the data fetched from the API into json format, so it returns an array containing the data (which will be just one word)
  let data = await response.json();

  // If the generated word is longer than 12 letters (meaning it would run off-screen), then a different word that is 12 letters or less is generated
  while (data[0].length > 12) {
    response = await fetch(`https://random-words-api.vercel.app/word`);
    data = await response.json();
  };

  gameOver = false;

  // Taking the word stored in the array that was generated by the API and storing it the variable "word"
  const word = data[0];

  // Capitalizing all letters of the generated word, then storing it  in the variable "secretWord"
  let secretWord = word.toUpperCase();
  
  // Hiding the "GENERATE WORD" button and unhiding the on-screen alphabet and the message telling the user to press a letter on their keyboard
  generateBtn.classList.add("is-hidden");
  pressLetter.classList.remove("is-hidden");
  onScreenAlpha.classList.remove("is-hidden");

  // This for-loop goes through the generated word and displays a dash on screen for each letter in the generated word
  for (let i = 0; i < secretWord.length; i++) {
    dashes.innerHTML += `<span class="dash noselect">_&nbsp;&nbsp;</span>`;
  };

  // This for-loop goes through each letter in the generated word and displays it on screen
  for (let i = 0; i < secretWord.length; i++) {
    letters.innerHTML += `<span class="${secretWord[i].toUpperCase()} alpha has-text-black noselect">${secretWord[i]}&nbsp;&nbsp;</span>`;
  };
  
  // Adding a keypress event listener that listens for the user pressing a key on their keyboard
  window.addEventListener("keypress", (pressed) => {
    
    // If the "gameOver" boolean is true, then that means that the user either reached 6 incorrect guesses or has guessed all letters in the secret word correctly
    if (gameOver) {
      // By just writing "return" here, the entire event listener is halted immediately
      return;
    }
      
    // If the key that the user presses is a letter, then their guess will be pushed onto the end of the "guesses" array in uppercase form
    else if (isAlpha(pressed.key) === true) {
      
      // If the key that the user presses is not present in the "all_guesses" array, then the code executes to push it onto that array and hide the letter on-screen, signaling that it can't be guessed again
      if (!all_guesses.includes(pressed.key.toUpperCase())) {
        all_guesses.push(pressed.key.toUpperCase());
        
        // queries the element with the id #(whatever key the user pressed) and then hides it from the user's view on-screen
        let hideOnScreen = document.querySelector(`#${pressed.key.toUpperCase()}`);
        hideOnScreen.classList.add("is-hidden");

        // Checking to see if the user's guess is correct or incorrect by passing in the "secretWord" variable and "guesses" array as parameters to the checkGuess function
        checkGuess(secretWord, all_guesses);
      }
        
      // If the user types in a letter that has already been hidden from the on-screen letter options, then they are alerted to type in a different letter
      else {
        alert("Please only choose a letter to type in from the letters displayed on-screen");
      };
    }
      
    // If the user presses a key but that key isn't a letter, then they are alerted that they must type in a letter
    else {
      alert("Please type in a letter.");
    };
  });
});
