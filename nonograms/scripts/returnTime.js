export function returnTime(obj) {
  const time = `${String(obj.minutes).padStart(2, '0')}:${String(
    obj.seconds
  ).padStart(2, '0')}`;
  return time;
}
