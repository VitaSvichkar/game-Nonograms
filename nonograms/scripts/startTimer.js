export function initTimer(obj) {
  const timer = document.querySelector('.timer');

  let min = obj.saveMin;
  let sec = obj.saveSec;

  return function () {
    sec++;

    if (sec > 59) {
      min++;
      sec = 0;
    }

    obj.seconds = sec <= 9 ? `0${sec}` : sec;
    obj.minutes = min < 9 ? `0${min}` : min;

    timer.innerText = `${obj.minutes}:${obj.seconds}`;
    // console.log(obj.seconds);
    return [min, sec];
  };
}

export function stopTimer(fun, obj) {
  clearInterval(fun);
  obj.seconds = null;
  obj.minutes = null;

  return false;
}
