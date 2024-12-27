export function timer() {
  const timer = document.querySelector('.timer');
  let min = 0;
  let sec = 0;

  return function () {
    sec++;

    if (sec > 59) {
      min++;
      sec = 0;
    }

    const resSec = sec <= 9 ? `0${sec}` : sec;
    const resMin = min < 9 ? `0${min}` : min;

    timer.innerText = `${resMin}:${resSec}`;
  };
}

export function stopTimer(fun) {
  const timer = document.querySelector('.timer');
  clearInterval(fun);
  timer.innerText = '00:00';
  return false;
}
