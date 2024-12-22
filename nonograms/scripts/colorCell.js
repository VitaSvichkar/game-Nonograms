export function colorCell(e) {
  if (e.target.classList.contains('cell')) {
    e.stopPropagation();

    if (e.type === 'click') {
      e.target.classList.remove('mark-wrong');
      e.target.classList.toggle('active');
    } else if (e.type === 'contextmenu') {
      e.preventDefault();
      e.target.classList.remove('active');
      e.target.classList.toggle('mark-wrong');
    }
  }
}
