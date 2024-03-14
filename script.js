'use strict';
const q = q => document.querySelector(q),
  again = q('.again'),
  number = q('.number'),
  guessInput = q('.guess'),
  checkBtn = q('.check'),
  message = q('.message'),
  labelScore = q('.score'),
  labelHighscore = q('.highscore'),
  initMessage = message.innerHTML,
  initScore = Number(labelScore.innerHTML),
  initNumber = number.innerHTML,
  initBG = '#222',
  renderMessage = m => (message.textContent = m),
  renderNumber = n => (number.textContent = n),
  renderScore = s => (labelScore.textContent = s),
  changeBG = c => (q('body').style.backgroundColor = c);

let secretNumber = Math.floor(Math.random() * 20) + 1;

let score = 20;
let highscore = 0;

const checkFun = () => {
  const guess = Number(guessInput.value);

  if (guess < 1 && score > 0) {
    renderMessage('⛔ Number must be greater than 0');
  } else if (guess === secretNumber && score > 0) {
    renderMessage('🎉 Correct Number');
    score > highscore && (highscore = score);
    renderNumber(secretNumber);
    changeBG('#60b347');
    labelHighscore.textContent = highscore;
    guessInput.setAttribute('disabled', true);
    checkBtn.setAttribute('disabled', true);
  } else if (guess !== secretNumber && score > 0) {
    if (score > 1) {
      renderMessage(guess > secretNumber ? '📈 Too high' : '📉 Too low');
      score--;
      labelScore.textContent = score;
    } else {
      message.textContent = '💥 You lost the game';
      renderScore(0);
    }
  }
};

const resetGame = () => {
  secretNumber = Math.floor(Math.random() * 20) + 1;
  renderMessage(initMessage);
  score = initScore;
  renderScore(initScore);
  renderNumber(initNumber);
  changeBG(initBG);
  guessInput.removeAttribute('disabled');
  checkBtn.removeAttribute('disabled');
  guessInput.value = '';
};

checkBtn.addEventListener('click', checkFun);

again.addEventListener('click', resetGame);
