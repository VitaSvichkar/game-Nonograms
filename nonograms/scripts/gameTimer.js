import { returnTime } from './returnTime.js';
import { game } from './gameData.js';

export function initTimer() {
  const timer = game.domElem.timer;

  let min = game.state.minutes;
  let sec = game.state.seconds;

  return function () {
    sec++;

    if (sec > 59) {
      min++;
      sec = 0;
    }

    game.state.minutes = min;
    game.state.seconds = sec;

    const time = returnTime();
    timer.innerText = time;

    game.state.saveMin = min;
    game.state.saveSec = sec;
  };
}

export function stopTimer(fun) {
  clearInterval(fun);
  game.state.seconds = 0;
  game.state.minutes = 0;

  return false;
}
