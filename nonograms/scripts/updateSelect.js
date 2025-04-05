export function updateSelect(arr, domElem) {
  domElem.innerHTML = '';
  const levels = ['easy', 'medium', 'hard'];
  console.log(arr);
  arr.forEach((el, ind) => {
    const option = document.createElement('option');
    option.value = el;
    option.textContent =
      typeof el === 'number' ? `${levels[ind]} ${el}x${el}` : el;
    domElem.append(option);
  });

  domElem.value = arr[0];
}
