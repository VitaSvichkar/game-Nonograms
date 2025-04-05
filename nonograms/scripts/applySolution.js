export function applySolution(array) {
  document.querySelectorAll('.cell').forEach((el, ind) => {
    el.classList.remove('active', 'mark-wrong');

    switch (array[ind]) {
      case 1:
        el.classList.add('active');
        break;
      case 'x':
        el.classList.add('mark-wrong');
        break;
    }
  });
}
