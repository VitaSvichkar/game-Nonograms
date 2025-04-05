import { updateSelect } from './updateSelect.js';
import { updateTable } from './updateTable.js';
import { applySolution } from './applySolution.js';
import { events } from './events.js';

export default function renderPage(game) {
  const body = document.body;

  const main = document.createElement('div');
  main.classList.add('main');

  const tableRecords = document.createElement('table');
  tableRecords.classList.add('table-results');

  const wrap = document.createElement('div');
  wrap.classList.add('wrap');

  const gameButtons = document.createElement('div');
  gameButtons.classList.add('game-btns');

  // BUTTONS

  const btnRandom = document.createElement('button');
  btnRandom.classList.add('random-btn');
  btnRandom.textContent = 'random';

  const btnSolution = document.createElement('button');
  btnSolution.classList.add('solution-btn');
  btnSolution.textContent = 'solution';

  const btnReset = document.createElement('button');
  btnReset.classList.add('reset');
  btnReset.textContent = 'reset';

  // THEME

  const btnTheme = document.createElement('button');
  btnTheme.classList.add('theme');

  const wrapSelect = document.createElement('div');
  wrapSelect.classList.add('wrap-select');

  // SELECT NAMES

  const selectGameNames = document.createElement('select');
  selectGameNames.classList.add('select-style');
  selectGameNames.classList.add('select-names');
  updateSelect(game.state.valuesGameNames5, selectGameNames);

  // SELECT SIZES

  const selectSizes = document.createElement('select');
  selectSizes.classList.add('select-style');
  selectSizes.classList.add('select-sizes');
  const valuesSizes = [5, 10, 15];
  updateSelect(valuesSizes, selectSizes);

  const timer = document.createElement('div');
  timer.classList.add('timer');

  game.state.cellWrapInRow = selectSizes.value / game.state.cellsInRow;
  game.state.curSize = selectSizes.value;

  const wrapGame = document.createElement('div');
  wrapGame.classList.add('wrap-game');

  const blockLeft = document.createElement('div');
  blockLeft.classList.add('block-left');

  const blockRight = document.createElement('div');
  blockRight.classList.add('block-right');

  const hintLeft = document.createElement('div');
  hintLeft.classList.add('hint-left');

  const hintTop = document.createElement('div');
  hintTop.classList.add('hint-top');

  const gameBlock = document.createElement('div');
  gameBlock.classList.add('game');
  gameBlock.style.setProperty('--cellWrapCount', game.cellWrapInRow);

  const btnSaveGame = document.createElement('button');
  btnSaveGame.classList.add('btn-save');
  // btnSaveGame.innerText = localStorage.getItem('saveBtnText')
  //   ? localStorage.getItem('saveBtnText')
  //   : 'save game';

  const overlay = document.createElement('div');
  overlay.classList.add('overlay');

  const modal = document.createElement('div');
  modal.classList.add('modal');

  const modalCloseIco = document.createElement('span');
  modalCloseIco.classList.add('modal-close');
  modalCloseIco.innerHTML = `&#215;`;

  const modalTextResult = document.createElement('div');
  modalTextResult.classList.add('modal-text-result');
  modalTextResult.innerHTML = `Great!<br> You have solved the nonogram in <span><b>0${game.minutes}:0${game.seconds}</b></span> seconds!`;

  blockRight.append(hintTop, gameBlock);
  wrapSelect.append(selectSizes, selectGameNames);
  blockLeft.append(wrapSelect, hintLeft);
  wrapGame.append(blockLeft, blockRight);
  gameButtons.append(timer, btnTheme, btnRandom, btnSolution, btnReset);
  wrap.append(gameButtons, wrapGame, btnSaveGame);
  main.append(tableRecords, wrap);
  modal.append(modalCloseIco, modalTextResult);
  overlay.append(modal);
  body.append(overlay, main);

  game.state.curName = game.state.valuesGameNames5[0];
  game.state.gameState = new Array(
    game.state.curSize * game.state.curSize
  ).fill(0);

  game.initDOM();
  loadOrInitGame(game);
}

function loadOrInitGame(game) {
  const { gameBlock, selectSizes, selectNames, btnSaveGame } = game.domElem;
  const savedCurGame = JSON.parse(localStorage.getItem('currentGame'));

  if (savedCurGame) {
    game.state = savedCurGame;
    gameBlock.style.setProperty('--cellWrapCount', game.state.cellWrapInRow);
    selectSizes.value = game.state.curSize;
    const arrNames = `valuesGameNames${game.state.curSize}`;
    updateSelect(game.state[arrNames], selectNames);
    selectNames.value = game.state.curName;
    savedCurGame.minute = savedCurGame.saveMin;
    savedCurGame.seconds = savedCurGame.saveSec;

    localStorage.setItem('saveBtnText', game.state.CONTINUE_GAME);
    btnSaveGame.innerText = localStorage.getItem('saveBtnText');

    initGameUI(game, true);
  } else {
    btnSaveGame.innerText = game.state.SAVE_GAME;
    initGameUI(game);
  }
}

function initGameUI(game, applySaved = false) {
  events(game);
  game.updateGame();
  updateTable(game);

  if (applySaved) {
    applySolution(game.state.gameState);
  }
}
