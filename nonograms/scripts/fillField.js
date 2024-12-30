export function fillField() {
  const gameBlock = document.querySelector('.game');

  return function (obj) {
    gameBlock.innerHTML = '';
    const sumCell = obj.cellWrapInRow * obj.cellWrapInRow;
    let index = 0;

    for (let i = 0; i < sumCell; i += 1) {
      const cellWrap = document.createElement('div');
      cellWrap.classList.add('cell-wrap');

      for (let j = 0; j < obj.cellsInRow * obj.cellsInRow; j += 1) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', index);
        index++;
        cellWrap.append(cell);
      }

      gameBlock.append(cellWrap);
    }
  };
}
