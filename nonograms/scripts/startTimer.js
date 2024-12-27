export function timer(obj) {
  const timer = document.querySelector('.timer');

  let min = 0;
  let sec = 0;

  return function () {
    sec++;

    if (sec > 59) {
      min++;
      sec = 0;
    }

    obj.seconds = sec <= 9 ? `0${sec}` : sec;
    obj.minutes = min < 9 ? `0${min}` : min;

    timer.innerText = `${obj.minutes}:${obj.seconds}`;
    console.log(obj.seconds);
  };
}

export function stopTimer(fun, obj) {
  clearInterval(fun);
  obj.minutes = 0;
  obj.seconds = 0;

  return false;
}
