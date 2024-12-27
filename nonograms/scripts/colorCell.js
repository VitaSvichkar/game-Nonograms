export function colorCell(e, obj) {
  if (e.target.classList.contains('cell')) {
    const ind = +e.target.dataset.index;
    e.stopPropagation();

    if (e.type === 'click') {
      e.target.classList.remove('mark-wrong');
      e.target.classList.toggle('active');
    } else if (e.type === 'contextmenu') {
      obj.gameState[ind] = 0;
      e.preventDefault();
      e.target.classList.remove('active');
      e.target.classList.toggle('mark-wrong');
    }
    return ind;
  }
}
