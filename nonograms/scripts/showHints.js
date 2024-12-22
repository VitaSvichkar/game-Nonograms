function renderHints(arrayHints, obj) {
  for (let i = 0; i < obj.cellWrapInRow; i += 1) {
    const wrap = document.createElement('div');

    for (let i = 0; i < obj.cellsInRow; i += 1) {
      const hints = document.createElement('div');
      hints.classList.add('hints');

      arrayHints[i].forEach((el) => {
        const span = document.createElement('span');
        span.textContent = el;
        hints.append(span);
      });

      wrap.append(hints);
    }

    return wrap;
  }
}

export function showHints(obj) {
  const wrapHintLeft = renderHints(obj.curGame.hintLeft, obj);
  wrapHintLeft.classList.add('wrap-hint-left');

  const wrapHintTop = renderHints(obj.curGame.hintTop, obj);
  wrapHintTop.classList.add('wrap-hint-top');

  return [wrapHintLeft, wrapHintTop];
}
