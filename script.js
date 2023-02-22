"use strict";

const title = document.querySelector(".title");
const score1 = document.getElementById("score--0");
const score2 = document.getElementById("score--1");
const dice1 = document.querySelector(".dice1");
const dice2 = document.querySelector(".dice2");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const roll = document.querySelector(".btn--roll");
const reset = document.querySelector(".btn--new");
const dice1Score = document.getElementById("current--0");
const dice2Score = document.getElementById("current--1");
const roundDisplay = document.querySelector(".round");

dice1.classList.add("hidden");
dice2.classList.add("hidden");

let player1Score = 0;
let player2Score = 0;
let player1DiceScore;
let player2DiceScore;
let round = 0;
let currentPlayer = 0;
let play = true;
let roundDisplayCounter = 1;

const displayDiceScore = function (currentPlayer, playerCurrentScore) {
  document.getElementById(`current--${currentPlayer}`).textContent =
    playerCurrentScore;
};

const displayScore = function (player1Score, player2Score) {
  score1.textContent = player1Score;
  score2.textContent = player2Score;
};
const newGame = function () {
  play = true;
  player1Score = 0;
  player2Score = 0;
  player1DiceScore = 0;
  player2DiceScore = 0;
  round = 0;
  currentPlayer = 0;
  roundDisplayCounter = 1;
  score1.textContent = 0;
  score2.textContent = 0;

  dice1Score.textContent = 0;
  dice2Score.textContent = 0;

  title.textContent = "Who will win?";
  roundDisplay.textContent = `Round: ${roundDisplayCounter}`;

  dice1.classList.add("hidden");
  dice2.classList.add("hidden");

  player0.classList.remove("player--winner");
  player0.classList.remove("player--loser");
  player1.classList.remove("player--winner");
  player1.classList.remove("player--loser");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};

const winner = function (round, player1Score, player2Score) {
  if (player1Score == 4) {
    title.textContent = `Player 1 won, congratulations!`;
    play = false;

    player0.classList.add("player--winner");
    player1.classList.add("player--loser");
  } else if (player2Score == 4) {
    title.textContent = `Player 2 won, congratulations!`;
    play = false;
    player0.classList.add("player--loser");
    player1.classList.add("player--winner");
  } else if (round == 12 && player1Score == player2Score) {
    title.textContent = `It's a draw, good game!`;
    play = false;
    player0.classList.toggle("player--active");
  } else if (round == 12 && player1Score > player2Score) {
    title.textContent = `Player 1 won, congratulations!`;
    play = false;
    player0.classList.add("player--winner");
    player1.classList.add("player--loser");
  } else if (round == 12 && player1Score < player2Score) {
    title.textContent = `Player 2 won, congratulations!`;
    play = false;
    player0.classList.add("player--loser");
    player1.classList.add("player--winner");
    player1.toggle("player--active");
  }
};

roll.addEventListener("click", function () {
  if (play) {
    round++;
    roundDisplay.textContent = `Round: ${roundDisplayCounter}`;
    player0.classList.toggle("player--active");
    player1.classList.toggle("player--active");

    let random1 = Math.trunc(Math.random() * 6) + 1;
    let random2 = Math.trunc(Math.random() * 6) + 1;

    dice1.classList.remove("hidden");
    dice2.classList.remove("hidden");

    dice1.src = `dice-${random1}.png`;
    dice2.src = `dice-${random2}.png`;

    if (currentPlayer == 0) {
      player1DiceScore = random1 + random2;
      displayDiceScore(currentPlayer, player1DiceScore);
    } else if (currentPlayer == 1) {
      player2DiceScore = random1 + random2;
      displayDiceScore(currentPlayer, player2DiceScore);
    }

    if (round > 0 && round % 2 == 0) {
      if (player1DiceScore > player2DiceScore) {
        player1Score++;
        displayScore(player1Score, player2Score);
      } else if (player1DiceScore < player2DiceScore) {
        player2Score++;
        displayScore(player1Score, player2Score);
      }
    }

    winner(round, player1Score, player2Score);

    if (currentPlayer == 0) {
      currentPlayer = 1;
    } else if (currentPlayer == 1) {
      currentPlayer = 0;
      roundDisplayCounter++;
    }
    console.log(player1Score, player2Score);
    console.log(round, play);
  }
});

reset.addEventListener("click", function () {
  newGame();
});
