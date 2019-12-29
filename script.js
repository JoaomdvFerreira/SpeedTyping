const API_URL = "https://api.whatdoestrumpthink.com/api/v1/quotes/random";
const quoteDisplayElement = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");
const refreshBtn = document.getElementById("refreshBtn");
const timerElement = document.getElementById("timer");

refreshBtn.addEventListener("click", () => {
  renderNewQuote();
});

quoteInputElement.addEventListener("input", () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll("span");
  const arrayValue = quoteInputElement.value.split("");
  let correct = true;

  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];
    if (character == null) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      correct = false;
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.remove("correct");
      characterSpan.classList.add("incorrect");
      correct = false;
    }
  });

  if (correct) {
    // const countCharacteres = arrayQuote.length;
    // const countTimer = timerElement.innerText;
    // saveScore(countCharacteres, countTimer);
    renderNewQuote();
  }
});

async function getRandomQuote() {
  return fetch(API_URL)
    .then(response => response.json())
    .then(data => data.message);
}

async function renderNewQuote() {
  const quote = await getRandomQuote();
  quoteDisplayElement.innerText = "";
  quote.split("").forEach(character => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quoteDisplayElement.appendChild(characterSpan);
  });
  quoteInputElement.value = null;
  startTimer();
}

let startTime;
function startTimer() {
  timerElement.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    timer.innerText = getTimerTime();
  }, 1000);
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}

// function saveScore(countCharacteres, countTimer) {
//   const scoreBoard = document.querySelector("#scoreBoard > tbody");
//   const row = scoreBoard.insertRow();

//   const col1 = row.insertCell();
//   const col2 = row.insertCell();

//   const txtCC = document.createTextNode(countCharacteres);
//   const txtCT = document.createTextNode(countTimer);

//   col1.appendChild(txtCC);
//   col2.appendChild(txtCT);
// }

renderNewQuote();
