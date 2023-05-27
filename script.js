// CODE FOR THE index.html (a.k.a HOMEPAGE) 

// queries the "Read the Rules!" button on the top-left corner of the hompage
const rulesButton = document.querySelector("#rulesbutton");

// queries the "Rules" section of the homepage, which tells the user the rules of the game
const rulesSection = document.querySelector("#rulesdiv");

// Adding a click event listener to the "Read the Rules!" button (if the user clicks it, then the rules section of the homepage is unhidden, but if the user does not click it, then the rules section of the homepage remains hidden, and it is assumed that the user already knows the rules of the game)
rulesButton.addEventListener("click", (e) => {
  rulesSection.classList.toggle("is-hidden");
});