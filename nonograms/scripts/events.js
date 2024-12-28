import { updateGame } from './updateGame.js';
import { colorCell } from './colorCell.js';
import { chooseSize } from './chooseSize.js';
import { randomGame } from './randomGame.js';
import { initTimer, stopTimer } from './startTimer.js';
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
  const btnSolution = document.querySelector('.solution-btn');
  let createTimerFunction = initTimer(obj);
  let isTimerStart = false;
  let timerInterval;

  btnTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
  });

  selectNames.addEventListener('change', onclickSelects);
  selectSizes.addEventListener('change', onclickSelects);

  hintLeft.addEventListener('click', colorHint);
  hintTop.addEventListener('click', colorHint);

  gameBlock.addEventListener('click', onClickGameBlock);
  gameBlock.addEventListener('contextmenu', onContextMenuGameBlock);

  btnReset.addEventListener('click', onClickButtons);
  btnRandom.addEventListener('click', onClickButtons);

  btnSolution.addEventListener('click', () => {
    obj.gameState = obj.curGame.solution;
    const solution = obj.gameState;
    btnReset.click();

    document.querySelectorAll('.cell').forEach((el, ind) => {
      if (solution[ind] === 1) {
        el.classList.add('active');
      }
    });
    gameBlock.removeEventListener('click', onClickGameBlock);
    gameBlock.removeEventListener('contextmenu', onContextMenuGameBlock);
  });

  modalClose.addEventListener('click', () => {
    overlay.classList.remove('overlay-active');
    isTimerStart = false;
    createTimerFunction = initTimer(obj);
    updateGame(obj);
  });

  function isWon(obj) {
    const isWon = checkResultGame(obj);

    if (isWon) {
      showModal(obj);
      stopTimer(timerInterval, obj);
    }
  }

  function colorHint(e) {
    if (e.target.tagName === 'SPAN') {
      e.target.classList.toggle('hint-done');
    }
  }

  function addEvent() {
    gameBlock.addEventListener('click', onClickGameBlock);
    gameBlock.addEventListener('contextmenu', onContextMenuGameBlock);
  }

  function onClickButtons(e) {
    addEvent();
    isTimerStart = stopTimer(timerInterval, obj);
    createTimerFunction = initTimer(obj);
    if (e.target.classList.contains('random-btn')) {
      const [size, name] = randomGame(obj);
      selectSizes.value = size;
      chooseSize(obj, selectSizes.value, name);
      selectNames.value = name;
    }
    updateGame(obj);
  }

  function onclickSelects(e) {
    addEvent();
    if (e.target.classList.contains('select-names')) {
      obj.curName = selectNames.value;
      console.log('name');
    } else {
      console.log('size');

      chooseSize(obj, selectSizes.value);
    }
    updateGame(obj);
    isTimerStart = stopTimer(timerInterval, obj);
    createTimerFunction = initTimer(obj);
  }

  function onClickGameBlock(e) {
    startTimer();
    const ind = colorCell(e, obj);
    updateGameState(obj, ind);
    isWon(obj);
  }

  function onContextMenuGameBlock(e) {
    startTimer();
    colorCell(e, obj);
    isWon(obj);
  }

  function startTimer() {
    if (!isTimerStart) {
      timerInterval = setInterval(createTimerFunction, 1000);
      isTimerStart = true;
    } else {
      return;
    }
  }
}
