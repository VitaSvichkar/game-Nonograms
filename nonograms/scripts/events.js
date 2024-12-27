import { updateGame } from './updateGame.js';
import { colorCell } from './colorCell.js';
import { chooseSize } from './chooseSize.js';
import { randomGame } from './randomGame.js';
import { timer, stopTimer } from './startTimer.js';

export function events(obj) {
  const selectSizes = document.querySelector('.select-sizes');
  const selectNames = document.querySelector('.select-names');
  const btnTheme = document.querySelector('.theme');
  const gameBlock = document.querySelector('.game');
  const btnReset = document.querySelector('.reset');
  const hintLeft = document.querySelector('.hint-left');
  const hintTop = document.querySelector('.hint-top');
  const btnRandom = document.querySelector('.random-btn');
  let startTimer = timer();
  let isTimerStart = false;
  let updateTimer;

  btnTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
  });

  selectNames.addEventListener('change', () => {
    obj.curName = selectNames.value;
    updateGame(obj);
    isTimerStart = stopTimer(updateTimer);
    startTimer = timer();
  });

  selectSizes.addEventListener('change', () => {
    chooseSize(obj, selectSizes.value);
    updateGame(obj);
    isTimerStart = stopTimer(updateTimer);
    startTimer = timer();
  });

  hintLeft.addEventListener('click', colorHint);
  hintTop.addEventListener('click', colorHint);
  function colorHint(e) {
    if (e.target.tagName === 'SPAN') {
      e.target.classList.toggle('hint-done');
    }
  }

  gameBlock.addEventListener('click', (e) => {
    colorCell(e);

    if (!isTimerStart) {
      updateTimer = setInterval(startTimer, 1000);
      isTimerStart = true;
    } else {
      return;
    }
  });

  gameBlock.addEventListener('contextmenu', colorCell);
  btnReset.addEventListener('click', () => {
    updateGame(obj);

    isTimerStart = stopTimer(updateTimer);
    startTimer = timer();
  });

  btnRandom.addEventListener('click', () => {
    isTimerStart = stopTimer(updateTimer);
    startTimer = timer();

    const [size, name] = randomGame(obj);
    selectSizes.value = size;

    chooseSize(obj, selectSizes.value, name);

    selectNames.value = name;

    updateGame(obj);
  });
}
