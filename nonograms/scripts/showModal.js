export function showModal(obj) {
  const overlay = document.querySelector('.overlay');
  const modalTextResult = document.querySelector('.modal-text-result');
  modalTextResult.innerHTML = `Great!<br> You have solved the nonogram in <span><b>${obj.minutes}:${obj.seconds}</b></span> seconds!`;
  overlay.classList.add('overlay-active');
}
