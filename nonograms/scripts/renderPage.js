import { game } from './gameData.js';
import { updateSelect } from './updateSelect.js';
import { updateGame } from './updateGame.js';
import { events } from './events.js';

export default function renderPage() {
  const body = document.body;

  const main = document.createElement('div');
  main.classList.add('main');

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
  // btnTheme.innerText = 'dark';

  // const valuesTheme = ['light', 'dark', 'secret'];
  // updateSelect(valuesTheme, selectTheme);

  const wrapSelect = document.createElement('div');
  wrapSelect.classList.add('wrap-select');

  // SELECT NAMES

  const selectGameNames = document.createElement('select');
  selectGameNames.classList.add('select-style');
  selectGameNames.classList.add('select-names');
  updateSelect(game.valuesGameNames5, selectGameNames);

  // SELECT SIZES

  const selectSizes = document.createElement('select');
  selectSizes.classList.add('select-style');
  selectSizes.classList.add('select-sizes');
  const valuesSizes = [5, 10, 15];
  updateSelect(valuesSizes, selectSizes);

  game.cellWrapInRow = selectSizes.value / game.cellsInRow;
  game.curSize = selectSizes.value;

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

  blockRight.append(hintTop, gameBlock);
  wrapSelect.append(selectSizes, selectGameNames);
  blockLeft.append(wrapSelect, hintLeft);
  wrapGame.append(blockLeft, blockRight);
  gameButtons.append(btnTheme, btnRandom, btnSolution, btnReset);
  wrap.append(gameButtons, wrapGame);
  main.append(wrap);
  body.append(main);

  game.curName = game.valuesGameNames5[0];

  updateGame(game);
  events(game);
}
