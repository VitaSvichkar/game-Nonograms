function renderHints(arrayHints, obj) {
  const arrWraps = [];
  let index = 0;

  for (let i = 0; i < obj.cellWrapInRow; i += 1) {
    const wrap = document.createElement('div');

    for (let j = 0; j < obj.cellsInRow; j += 1) {
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
  const hintLeft = document.querySelector('.hint-left');
  const hintTop = document.querySelector('.hint-top');

  return function (obj) {
    hintLeft.innerHTML = '';
    hintTop.innerHTML = '';

    const wrapHintLeft = renderHints(obj.curGame.hintLeft, obj);
    wrapHintLeft.forEach((el) => el.classList.add('wrap-hint-left'));

    const wrapHintTop = renderHints(obj.curGame.hintTop, obj);
    wrapHintTop.forEach((el) => el.classList.add('wrap-hint-top'));

    wrapHintLeft.forEach((el) => hintLeft.append(el));
    wrapHintTop.forEach((el) => hintTop.append(el));
  };
}
