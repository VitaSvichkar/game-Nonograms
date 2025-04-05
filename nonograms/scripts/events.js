import { colorCell } from './colorCell.js';
import { randomGame } from './randomGame.js';
import { initTimer, stopTimer } from './gameTimer.js';
import { showModal } from './showModal.js';
import { applySolution } from './applySolution.js';

export function events(game) {
  const {
    btnCloseRules,
    rulesModal,
    btnTheme,
    selectNames,
    selectSizes,
    hintLeft,
    hintTop,
    gameBlock,
    btnReset,
    btnRandom,
    btnSaveGame,
    btnSolution,
    modalCloseIco,
    overlay,
  } = game.domElem;

  const { CONTINUE_GAME, SAVE_GAME } = game.state;

  const sounds = {
    audioLeftClick: new Audio('./assets/sounds/leftClick.mp3'),
    audioRightClick: new Audio('./assets/sounds/rightClick.mp3'),
    audioVictory: new Audio('./assets/sounds/victory.mp3'),
  };

  // INIT TIMER

  let createTimerFunction = initTimer();
  let isTimerStart = false;
  let timerInterval;

  // CLOSE RULES

  btnCloseRules.addEventListener('click', () => {
    rulesModal.style.display = 'none';
  });

  // CHOOSE THEME

  btnTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
  });

  // EVENTS

  selectNames.addEventListener('change', onclickSelects);
  selectSizes.addEventListener('change', onclickSelects);
  hintLeft.addEventListener('click', colorHint);
  hintTop.addEventListener('click', colorHint);
  gameBlock.addEventListener('click', onClickGameBlock);
  gameBlock.addEventListener('contextmenu', onContextMenuGameBlock);
  btnReset.addEventListener('click', onClickButtons);
  btnRandom.addEventListener('click', onClickButtons);
  btnSolution.addEventListener('click', showSolution);
  modalCloseIco.addEventListener('click', closeModal);

  if (game.state.saveBtnText === CONTINUE_GAME) {
    removeEvents();
    btnSaveGame.classList.add('continue-game');
  }
  btnSaveGame.addEventListener('click', toggleSaveGameState);

  function showSolution() {
    game.state.gameState = game.state.curGame.solution;
    const solution = game.state.gameState;
    btnReset.click();
    applySolution(solution);
    removeEvents();
  }

  function closeModal() {
    overlay.classList.remove('overlay-active');
    isTimerStart = false;
    createTimerFunction = initTimer();
    resetGameValues(game);
    game.updateGame();
  }

  function isWon(game) {
    const isYes = game.checkResultGame();

    if (isYes) {
      playAudio(sounds.audioVictory);
      showModal();
      game.saveDataLocalStorage();
      stopTimer(timerInterval);
    }
  }

  function colorHint(e) {
    if (e.target.tagName === 'SPAN') {
      e.target.classList.toggle('hint-done');
    }
  }

  function addEvents() {
    gameBlock.addEventListener('click', onClickGameBlock);
    gameBlock.addEventListener('contextmenu', onContextMenuGameBlock);
  }

  function removeEvents() {
    gameBlock.removeEventListener('click', onClickGameBlock);
    gameBlock.removeEventListener('contextmenu', onContextMenuGameBlock);
  }

  function onClickButtons(e) {
    addEvents();
    isTimerStart = stopTimer(timerInterval);
    createTimerFunction = initTimer();
    if (e.target.classList.contains('random-btn')) {
      const [size, name] = randomGame();
      selectSizes.value = size;
      game.chooseSize(selectSizes.value, name);
      selectNames.value = name;
    }
    resetGameValues(game);
    game.updateGame();
  }

  function onclickSelects(e) {
    addEvents();
    if (e.target.classList.contains('select-names')) {
      game.state.curName = selectNames.value;
    } else {
      game.chooseSize(selectSizes.value);
    }

    resetGameValues(game);
    game.updateGame();
    isTimerStart = stopTimer(timerInterval);
    createTimerFunction = initTimer();
  }

  function onClickGameBlock(e) {
    playAudio(sounds.audioLeftClick);
    startTimer();
    const ind = colorCell(e);
    game.updateGameState(ind);
    isWon(game);
  }

  function onContextMenuGameBlock(e) {
    playAudio(sounds.audioRightClick);
    startTimer();
    const ind = colorCell(e);
    game.updateGameState(ind);
    isWon(game);
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

  function resetGameValues({ state }) {
    state.gameState = new Array(state.curSize * state.curSize).fill(0);
    state.saveMin = 0;
    state.saveSec = 0;
    state.minutes = state.saveMin;
    state.seconds = state.saveSec;
    localStorage.removeItem('currentGame');
    localStorage.removeItem('saveBtnText');
    state.saveBtnText = SAVE_GAME;
    btnSaveGame.classList.remove('continue-game');
    btnSaveGame.innerText = state.saveBtnText;
  }

  function toggleSaveGameState() {
    if (btnSaveGame.classList.contains('continue-game')) {
      addEvents();
      btnSaveGame.classList.remove('continue-game');
      localStorage.setItem('saveBtnText', SAVE_GAME);
      getAndSaveText();
      startTimer();
    } else {
      removeEvents();
      btnSaveGame.classList.add('continue-game');
      localStorage.setItem('saveBtnText', CONTINUE_GAME);
      getAndSaveText();
      isTimerStart = stopTimer(timerInterval);
      localStorage.setItem('currentGame', JSON.stringify(game.state));
    }

    function getAndSaveText() {
      game.state.saveBtnText = localStorage.getItem('saveBtnText');
      btnSaveGame.innerText = game.state.saveBtnText;
    }
  }
}
