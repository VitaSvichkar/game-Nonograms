import { fillField } from './fillField.js';
import { returnTime } from './returnTime.js';
import { showHints } from './showHints.js';

export function updateGame(obj) {
  const timer = document.querySelector('.timer');
  const time = returnTime(obj);
  timer.innerText = time;

  obj.curGame = obj.variants[`size${obj.curSize}`].find(
    (el) => el.name === obj.curName
  );

  const fillCell = fillField();
  fillCell(obj);

  const fillHints = showHints();
  fillHints(obj);
}
