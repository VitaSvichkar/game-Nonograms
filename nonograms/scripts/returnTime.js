import { game } from './gameData.js';

export function returnTime() {
  const time = `${String(game.state.minutes).padStart(2, '0')}:${String(
    game.state.seconds
  ).padStart(2, '0')}`;
  return time;
}
