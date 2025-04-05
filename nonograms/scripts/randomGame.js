import { game } from './gameData.js';

export function randomGame() {
  let r = 0;
  let val;
  const variantsArr = game.getVariants();
  const length = variantsArr.length;

  do {
    val = randomValue(length);
  } while (val === r);

  r = val;

  const size = r <= 4 ? 5 : r <= 9 ? 10 : 15;
  const name = variantsArr[r].name;

  return [size, name];
}

function randomValue(length) {
  return Math.floor(Math.random() * length);
}
