
const cards = document.querySelectorAll('.memory-card');
const score = document.querySelector('.score')
let count = 0
let array = []
let arrScore = []
let arrStorage = JSON.stringify(arrScore)


if (localStorage.getItem('score1') === null) {
  localStorage.setItem('score1', arrStorage)
}



let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
console.table(count)
function flipCard() {
  count++
  console.table(count)
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  arr = [...cards].map(card => card.classList.contains('flip'))
  if (arr.every(el => el === true)) {
    arrScore = JSON.parse(localStorage.getItem('score1'))

    if (arrScore.length === 10) {
      arrScore.push(count)
      arrScore.shift()

    } else arrScore.push(count)
    let arrStorage = JSON.stringify(arrScore)
    localStorage.setItem('score1', arrStorage)

  }

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
let tableScore = JSON.parse(localStorage.getItem('score1'))
tableScore = tableScore.sort((a, b) => a - b)

for (i = 0; i < tableScore.length; i++) {
  let div = document.createElement("div")
  score.append(div)
  div.innerHTML = `№${i + 1}  Score = ${tableScore[i]}`
}

console.log(JSON.parse(localStorage.getItem('score1')))

