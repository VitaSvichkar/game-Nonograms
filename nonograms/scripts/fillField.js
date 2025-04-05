import { game } from './gameData.js';

export function fillField() {
  const wrapCount = game.state.cellWrapInRow;
  const cellCount = game.state.cellsInRow;

  game.domElem.gameBlock.innerHTML = '';
  const sumCell = wrapCount * wrapCount;
  let index = 0;
  for (let i = 0; i < sumCell; i += 1) {
    const cellWrap = document.createElement('div');
    cellWrap.classList.add('cell-wrap');

    for (let j = 0; j < cellCount * cellCount; j += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.setAttribute('data-index', index);
      index++;
      cellWrap.append(cell);
    }

    game.domElem.gameBlock.append(cellWrap);
  }
}
