import { fillField } from './fillField.js';
import { showHints } from './showHints.js';

export function updateGame(obj) {
  const timer = document.querySelector('.timer');
  timer.innerText = '00:00';

  obj.curGame = obj.variants[`size${obj.curSize}`].find(
    (el) => el.name === obj.curName
  );

  const fillCell = fillField();
  fillCell(obj);

  const fillHints = showHints();
  fillHints(obj);
}
