const wordElement = document.getElementById("word");
const wrongLettersElement = document.getElementById("wrong-letters");
const playAgainButton = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const finalMessageRevealWord = document.getElementById(
  "final-message-reveal-word"
);
const figureParts = document.querySelectorAll(".figure-part");
const hintButton = document.getElementById("hint-button");
const hintElement = document.getElementById("hint");

const words = [
  "application",
  "programming",
  "interface",
  "wizard",
  "element",
  "prototype",
  "callback",
  "undefined",
  "arguments",
  "settings",
  "selector",
  "container",
  "instance",
  "response",
  "console",
  "constructor",
  "token",
  "function",
  "return",
  "length",
  "type",
  "node",
];
const hints = {
  application: "A software designed to perform specific tasks.",
  programming: "The process of creating instructions for computers.",
  interface: "A shared boundary where two systems communicate.",
  wizard:
    "A magical being in fantasy stories, also used in software to guide users.",
  element: "A single part of a larger structure, often in HTML.",
  prototype: "A preliminary model of something, often used in programming.",
  callback:
    "A function passed into another function as an argument in JavaScript.",
  undefined: "A variable that has been declared but not yet assigned a value.",
  arguments: "Values passed to a function when it is called.",
  settings: "Configurations that define behavior or appearance.",
  selector: "A way to target HTML elements in CSS.",
  container: "An element that groups other elements in web development.",
  instance: "A single occurrence of an object in programming.",
  response: "The data sent back from a server after a request.",
  console: "A tool used to log information in JavaScript.",
  constructor: "A special method for creating and initializing objects in OOP.",
  token: "A piece of data used for authentication or authorization.",
  function: "A block of code designed to perform a particular task.",
  return:
    "A statement that ends function execution and specifies a value to be returned.",
  length:
    "A property that returns the number of elements in an array or characters in a string.",
  type: "The kind of data (e.g., string, number, boolean) in JavaScript.",
  node: "An individual part of a data structure like a tree or DOM.",
};

let selectedWord = words[Math.floor(Math.random() * words.length)];

let playable = true;

const correctLetters = [];
const wrongLetters = [];

function displayWord() {
  wordElement.innerHTML = `
    ${selectedWord
      .split("") // to array
      .map(
        (letter) => `
    <span class="letter">
    ${correctLetters.includes(letter) ? letter : ""}
    </span>
    `
      )
      .join("")} 
    `; // to string

  const innerWord = wordElement.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won! 😃";
    finalMessageRevealWord.innerText = "";
    popup.style.display = "flex";
    playable = false;
  }
}

function updateWrongLettersElement() {
  wrongLettersElement.innerHTML = `
  ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    index < errors
      ? (part.style.display = "block")
      : (part.style.display = "none");
  });
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost. 😕";
    finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`;
    popup.style.display = "flex";
    playable = false;
  }
}

// Show a notification
function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

window.addEventListener("keypress", (e) => {
  if (playable) {
    const letter = e.key.toLowerCase();
    if (letter >= "a" && letter <= "z") {
      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);
          displayWord();
        } else {
          showNotification();
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);
          updateWrongLettersElement();
        } else {
          showNotification();
        }
      }
    }
  }
});
function displayHint() {
  hintElement.innerText = hints[selectedWord];
}

// Restart the game
playAgainButton.addEventListener("click", () => {
  playable = true;
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLettersElement();
  popup.style.display = "none";
  displayHint();
});

// Initial game
displayWord();
displayHint();
