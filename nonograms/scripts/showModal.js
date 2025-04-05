import { returnTime } from './returnTime.js';
import { game } from './gameData.js';

export function showModal() {
  const time = returnTime();
  const domEl = game.domElem;

  domEl.modalTextResult.innerHTML = `Great!<br> You have solved the nonogram in <span><b>${time}</b></span> seconds!`;
  domEl.overlay.classList.add('overlay-active');
}
