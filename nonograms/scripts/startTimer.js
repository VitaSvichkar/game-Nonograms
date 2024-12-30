import { returnTime } from './returnTime.js';

export function initTimer(obj) {
  const timer = document.querySelector('.timer');

  let min = obj.minutes;
  let sec = obj.seconds;

  return function () {
    sec++;

    if (sec > 59) {
      min++;
      sec = 0;
    }

    obj.minutes = min;
    obj.seconds = sec;

    const time = returnTime(obj);
    timer.innerText = time;

    obj.saveMin = min;
    obj.saveSec = sec;
  };
}

export function stopTimer(fun, obj) {
  clearInterval(fun);
  obj.seconds = 0;
  obj.minutes = 0;

  return false;
}
