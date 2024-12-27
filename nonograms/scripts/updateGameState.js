import { checkResultGame } from './checkResultGame.js';

export function updateGameState(obj, ind) {
  if (obj.gameState[ind] === 0) {
    obj.gameState[ind] = 1;
  } else {
    obj.gameState[ind] = 0;
  }
  checkResultGame(obj);
}
