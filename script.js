'use strict';
//selcting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNewEl = document.querySelector('.btn--new');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

//Starting Condition
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let current, activePlayer, playing, score;
const init = function () {
  score = [0, 0];
  current = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
const switchPlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  current = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
init();
//Rolling the dice
btnRollEl.addEventListener('click', function () {
  if (playing) {
    //generate numbers between 1 and 6
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    //showing the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceNumber}.png`;

    //when dice number is not 1
    if (diceNumber !== 1) {
      current += diceNumber;
      document.querySelector(`#current--${activePlayer}`).textContent = current;
    }
    //if dice number is 1
    else {
      document.querySelector(`#current--${activePlayer}`).textContent = 0;

      switchPlayer();
    }
  }
});
//Holding button
btnHoldEl.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += current;
    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];

    //check player score
    if (score[activePlayer] >= 20) {
      //finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});
//Resetting the game
btnNewEl.addEventListener('click', init);
