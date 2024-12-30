import { returnTime } from './returnTime.js';

export function showModal(obj) {
  const time = returnTime(obj);
  const overlay = document.querySelector('.overlay');
  const modalTextResult = document.querySelector('.modal-text-result');
  modalTextResult.innerHTML = `Great!<br> You have solved the nonogram in <span><b>${time}</b></span> seconds!`;
  overlay.classList.add('overlay-active');
}
