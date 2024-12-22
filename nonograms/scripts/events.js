import { updateSelect } from './updateSelect.js';
import { updateGame } from './updateGame.js';
import { colorCell } from './colorCell.js';

export function events(obj) {
  const selectSizes = document.querySelector('.select-sizes');
  const selectNames = document.querySelector('.select-names');
  const gameBlock = document.querySelector('.game');

  selectNames.addEventListener('change', () => {
    obj.curName = selectNames.value;
    updateGame(obj);
  });

  selectSizes.addEventListener('change', () => {
    obj.curSize = selectSizes.value;
    obj.cellWrapInRow = selectSizes.value / obj.cellsInRow;

    gameBlock.style.setProperty('--cellWrapCount', obj.cellWrapInRow);
    const selectNames = document.querySelector('.select-names');
    const keyNames = `valuesGameNames${obj.curSize}`;
    const arrNames = obj[keyNames];
    obj.curName = arrNames[0];
    updateSelect(arrNames, selectNames);
    updateGame(obj);
  });

  gameBlock.addEventListener('click', (e) => colorCell(e));

  gameBlock.addEventListener('contextmenu', (e) => colorCell(e));
}
