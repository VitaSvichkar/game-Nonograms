export function sorting(arr) {
  const sortData = arr.sort(
    (a, b) => timeToSeconds(a.time) - timeToSeconds(b.time)
  );

  return sortData;
}

function timeToSeconds(time) {
  const [minutes, seconds] = time.split(':').map(Number);
  return minutes * 60 + seconds;
}
