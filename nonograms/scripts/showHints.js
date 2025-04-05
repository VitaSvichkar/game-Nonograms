import { game } from './gameData.js';

function renderHints(arrayHints) {
  const arrWraps = [];
  let index = 0;

  for (let i = 0; i < game.state.cellWrapInRow; i += 1) {
    const wrap = document.createElement('div');

    for (let j = 0; j < game.state.cellsInRow; j += 1) {
      const hints = document.createElement('div');
      hints.classList.add('hints');

      arrayHints[index].forEach((el) => {
        const span = document.createElement('span');
        span.textContent = el === 0 ? '' : el;
        hints.append(span);
      });
      index += 1;
      wrap.append(hints);
    }
    arrWraps.push(wrap);
  }
  return arrWraps;
}

export function showHints() {
  const domEl = game.domElem;
  domEl.hintLeft.innerHTML = '';
  domEl.hintTop.innerHTML = '';

  const wrapHintLeft = renderHints(game.state.curGame.hintLeft);
  wrapHintLeft.forEach((el) => el.classList.add('wrap-hint-left'));

  const wrapHintTop = renderHints(game.state.curGame.hintTop);
  wrapHintTop.forEach((el) => el.classList.add('wrap-hint-top'));

  wrapHintLeft.forEach((el) => domEl.hintLeft.append(el));
  wrapHintTop.forEach((el) => domEl.hintTop.append(el));
}
