
const cards = document.querySelectorAll('.memory-card');
let count = 0
let array = []
let arrScore = [0]


let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  count++
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  arr = [...cards].map(card => card.classList.contains('flip'))
  if (arr.every(el => el === true)) {
    arrScore = JSON.parse(localStorage.getItem('score1'))
    if (arrScore.length === 4) {
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
