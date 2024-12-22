import { game } from './gameData.js';

export default function renderPage() {
  const body = document.body;

  const main = document.createElement('div');
  main.classList.add('main');

  const wrap = document.createElement('div');
  wrap.classList.add('wrap');

  const gameButtons = document.createElement('div');
  gameButtons.classList.add('game-btns');

  // SELECT THEME

  const selectTheme = document.createElement('select');
  selectTheme.classList.add('theme');

  const valuesTheme = ['light', 'dark', 'secret'];

  valuesTheme.forEach((theme) => {
    const option = document.createElement('option');
    option.value = theme;
    option.textContent = theme;
    selectTheme.append(option);
  });
  selectTheme.value = 'light';

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

  // SELECT NAMES

  const selectGameNames = document.createElement('select');
  selectGameNames.classList.add('select-style');

  game.valuesGameNames10.forEach((name) => {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    selectGameNames.append(option);
  });
  game.curName = selectGameNames.value = 'name1';
  game.curGame = game.variants[0];
  console.log(game.curGame);

  // SELECT SIZES

  const selectSizes = document.createElement('select');
  selectSizes.classList.add('select-style');

  const valuesSizes = [5, 10, 15];

  valuesSizes.forEach((size) => {
    const option = document.createElement('option');
    option.value = size;
    option.textContent = `${size}x${size}`;
    selectSizes.append(option);
  });

  game.cellWrapInRow = (selectSizes.value = 5) / game.cellsInRow;
  game.curSize = selectSizes.value;

  const wrapGame = document.createElement('div');
  wrapGame.classList.add('wrap-game');

  const blockLeft = document.createElement('div');
  blockLeft.classList.add('block-left');

  const hintLeft = document.createElement('div');
  hintLeft.classList.add('hint-left');

  const hintTop = document.createElement('div');
  hintTop.classList.add('hint-top');

  const blockRight = document.createElement('div');
  blockRight.classList.add('block-right');

  const gameBlock = document.createElement('div');
  gameBlock.classList.add('game');
  gameBlock.style.setProperty('--cellWrapCount', game.cellWrapInRow);

  blockRight.append(hintTop, gameBlock);
  blockLeft.append(selectSizes, selectGameNames, hintLeft);
  wrapGame.append(blockLeft, blockRight);
  gameButtons.append(selectTheme, btnRandom, btnSolution, btnReset);
  wrap.append(gameButtons, wrapGame);
  main.append(wrap);
  body.append(main);
}
