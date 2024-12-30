export function applySolution(array) {
  document.querySelectorAll('.cell').forEach((el, ind) => {
    if (array[ind] === 1) {
      el.classList.add('active');
    }
  });
}
