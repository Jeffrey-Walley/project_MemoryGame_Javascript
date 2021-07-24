/* Project Objective

1- shuffle Cards on Load or Restart
2- Game will handle Matched and Unmatched cards
*/

const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;


/* creates function -- the 'toggle' is used to assign / remove 'flip' to the memory-card class */
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');

    if (!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        firstCard = this;
    } else {
        // second click
        hasFlippedCard = false;
        secondCard = this;

        // check for match
        if (firstCard.dataset.framework === secondCard.dataset.framework) {
            // it's a match
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
        } else {
            // not a match
            lockBoard = true;
            setTimeout(() => {
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');
                lockBoard = false;
            }, 1500);
        }

    }
}

function resetBoard() {
    hasFlippedCard = lockBoard = false;
    firstCard = secondCard = null
}

// shuffle elements
cards.forEach(card => {
    const ramdomPos = Math.floor(Math.random() * cards.length);
    card.style.order = ramdomPos;
});

cards.forEach(card => card.addEventListener('click', flipCard));