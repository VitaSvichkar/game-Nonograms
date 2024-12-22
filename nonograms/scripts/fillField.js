export function fillField(obj) {
  for (let i = 0; i < obj.cellWrapInRow * obj.cellWrapInRow; i += 1) {
    const cellWrap = document.createElement('div');
    cellWrap.classList.add('cell-wrap');

    for (let j = 0; j < obj.cellsInRow * obj.cellsInRow; j += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cellWrap.append(cell);
    }
    return cellWrap;
  }
}
