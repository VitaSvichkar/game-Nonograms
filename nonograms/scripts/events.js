import { updateGame } from './updateGame.js';
import { colorCell } from './colorCell.js';
import { chooseSize } from './chooseSize.js';
import { randomGame } from './randomGame.js';
import { timer, stopTimer } from './startTimer.js';
import { showModal } from './showModal.js';
import { updateGameState } from './updateGameState.js';
import { checkResultGame } from './checkResultGame.js';

export function events(obj) {
  const selectSizes = document.querySelector('.select-sizes');
  const selectNames = document.querySelector('.select-names');
  const btnTheme = document.querySelector('.theme');
  const gameBlock = document.querySelector('.game');
  const btnReset = document.querySelector('.reset');
  const hintLeft = document.querySelector('.hint-left');
  const hintTop = document.querySelector('.hint-top');
  const btnRandom = document.querySelector('.random-btn');
  const modalClose = document.querySelector('.modal-close');
  const overlay = document.querySelector('.overlay');
  let startTimer = timer(obj);
  let isTimerStart = false;
  let updateTimer;

  btnTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
  });

  selectNames.addEventListener('change', () => {
    obj.curName = selectNames.value;
    updateGame(obj);
    isTimerStart = stopTimer(updateTimer, obj);
    startTimer = timer(obj);
  });

  selectSizes.addEventListener('change', () => {
    chooseSize(obj, selectSizes.value);
    updateGame(obj);
    isTimerStart = stopTimer(updateTimer, obj);
    startTimer = timer(obj);
  });

  hintLeft.addEventListener('click', colorHint);
  hintTop.addEventListener('click', colorHint);

  gameBlock.addEventListener('click', (e) => {
    const ind = colorCell(e, obj);
    updateGameState(obj, ind);
    isWon(obj);

    if (!isTimerStart) {
      updateTimer = setInterval(startTimer, 1000);
      isTimerStart = true;
    } else {
      return;
    }
  });

  gameBlock.addEventListener('contextmenu', (e) => {
    colorCell(e, obj);
    isWon(obj);
  });

  btnReset.addEventListener('click', () => {
    updateGame(obj);
    isTimerStart = stopTimer(updateTimer, obj);
    startTimer = timer(obj);
  });

  btnRandom.addEventListener('click', () => {
    isTimerStart = stopTimer(updateTimer, obj);
    startTimer = timer(obj);
    const [size, name] = randomGame(obj);
    selectSizes.value = size;
    chooseSize(obj, selectSizes.value, name);
    selectNames.value = name;
    updateGame(obj);
  });

  modalClose.addEventListener('click', () => {
    overlay.classList.remove('overlay-active');
    isTimerStart = false;
    startTimer = timer(obj);
    updateGame(obj);
  });

  function isWon(obj) {
    const isWon = checkResultGame(obj);
    if (isWon) {
      showModal(obj);
      stopTimer(updateTimer, obj);
    }
  }

  function colorHint(e) {
    if (e.target.tagName === 'SPAN') {
      e.target.classList.toggle('hint-done');
    }
  }
}
