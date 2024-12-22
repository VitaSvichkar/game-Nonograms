export function updateSelect(arr, domElem) {
  domElem.innerHTML = '';

  arr.forEach((el) => {
    const option = document.createElement('option');
    option.value = el;
    option.textContent = typeof el === 'number' ? `${el}x${el}` : el;
    domElem.append(option);
  });

  domElem.value = arr[0];
}
