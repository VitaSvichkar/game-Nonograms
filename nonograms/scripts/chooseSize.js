import { updateSelect } from './updateSelect.js';

export function chooseSize(obj, val, name) {
  const gameBlock = document.querySelector('.game');
  const selectNames = document.querySelector('.select-names');
  obj.curSize = val;
  obj.cellWrapInRow = val / obj.cellsInRow;
  gameBlock.style.setProperty('--cellWrapCount', obj.cellWrapInRow);
  const keyNames = `valuesGameNames${obj.curSize}`;
  const arrNames = obj[keyNames];
  console.log(arrNames);
  obj.curName = name ? name : arrNames[0];
  updateSelect(arrNames, selectNames);
}
