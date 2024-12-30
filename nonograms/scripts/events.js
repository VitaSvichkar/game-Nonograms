import { updateGame } from './updateGame.js';
import { colorCell } from './colorCell.js';
import { chooseSize } from './chooseSize.js';
import { randomGame } from './randomGame.js';
import { initTimer, stopTimer } from './startTimer.js';
import { showModal } from './showModal.js';
import { updateGameState } from './updateGameState.js';
import { checkResultGame } from './checkResultGame.js';
import { saveDataInArray } from './saveDataLocalStorage.js';
import { applySolution } from './applySolution.js';

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
  const btnSaveGame = document.querySelector('.btn-save');
  const audioLeftClick = new Audio('./assets/sounds/leftClick.mp3');
  const audioRightClick = new Audio('./assets/sounds/rightClick.mp3');
  const audioVictory = new Audio('./assets/sounds/victory.mp3');

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

  if (obj.saveBtnText === 'continue game') {
    btnSaveGame.classList.add('continue-game');
    gameBlock.removeEventListener('click', onClickGameBlock);
    gameBlock.removeEventListener('contextmenu', onContextMenuGameBlock);
  }

  btnSaveGame.addEventListener('click', () => {
    if (btnSaveGame.classList.contains('continue-game')) {
      addEvent();
      btnSaveGame.classList.remove('continue-game');
      localStorage.setItem('saveBtnText', 'save game');
      obj.saveBtnText = localStorage.getItem('saveBtnText');
      btnSaveGame.innerText = obj.saveBtnText;
      startTimer();
    } else {
      gameBlock.removeEventListener('click', onClickGameBlock);
      gameBlock.removeEventListener('contextmenu', onContextMenuGameBlock);
      btnSaveGame.classList.add('continue-game');
      localStorage.setItem('saveBtnText', 'continue game');
      obj.saveBtnText = localStorage.getItem('saveBtnText');
      btnSaveGame.innerText = obj.saveBtnText;
      isTimerStart = stopTimer(timerInterval, obj);
      const time = createTimerFunction();
      obj.saveMin = time[0];
      obj.saveSec = time[1];
      localStorage.setItem('currentGame', JSON.stringify(obj));
    }
  });

  btnSolution.addEventListener('click', () => {
    obj.gameState = obj.curGame.solution;
    const solution = obj.gameState;
    btnReset.click();
    applySolution(solution);
    gameBlock.removeEventListener('click', onClickGameBlock);
    gameBlock.removeEventListener('contextmenu', onContextMenuGameBlock);
  });

  modalClose.addEventListener('click', () => {
    overlay.classList.remove('overlay-active');
    isTimerStart = false;
    createTimerFunction = initTimer(obj);
    resetGameValues(obj);
    updateGame(obj);
  });

  function isWon(obj) {
    const isYes = checkResultGame(obj);

    if (isYes) {
      playAudio(audioVictory);
      showModal(obj);
      saveDataInArray(obj);
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
    resetGameValues(obj);

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
    resetGameValues(obj);
    addEvent();

    if (e.target.classList.contains('select-names')) {
      obj.curName = selectNames.value;
    } else {
      chooseSize(obj, selectSizes.value);
    }

    updateGame(obj);
    isTimerStart = stopTimer(timerInterval, obj);
    createTimerFunction = initTimer(obj);
  }

  function onClickGameBlock(e) {
    playAudio(audioLeftClick);
    startTimer();
    const ind = colorCell(e, obj);
    updateGameState(obj, ind);
    isWon(obj);
  }

  function onContextMenuGameBlock(e) {
    playAudio(audioRightClick);

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

  function playAudio(audio) {
    audio.currentTime = 0;
    audio.play();
  }

  function resetGameValues(obj) {
    obj.gameState = new Array(obj.curSize * obj.curSize).fill(0);
    obj.minutes = null;
    obj.seconds = null;
    obj.saveMin = 0;
    obj.saveSec = 0;
    localStorage.removeItem('currentGame');
    localStorage.removeItem('saveBtnText');
    obj.saveBtnText = 'save game';
    btnSaveGame.classList.remove('continue-game');
    btnSaveGame.innerText = obj.saveBtnText;
  }
}
