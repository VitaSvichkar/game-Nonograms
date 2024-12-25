export function randomGame(obj) {
  let r = 0;
  const length =
    obj.variants.size5.length +
    obj.variants.size10.length +
    obj.variants.size15.length;

  const arr = [
    ...obj.variants.size5,
    ...obj.variants.size10,
    ...obj.variants.size15,
  ];

  let val;
  do {
    val = randomValue(length);
  } while (val === r);

  r = val;

  const size = r <= 4 ? 5 : r <= 9 ? 10 : 15;
  const name = arr[r].name;

  return [size, name];
}

function randomValue(length) {
  return Math.floor(Math.random() * length);
}
