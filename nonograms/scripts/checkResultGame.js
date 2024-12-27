export function checkResultGame(obj) {
  const solution = JSON.stringify(obj.curGame.solution);
  const gameState = JSON.stringify(obj.gameState);
  if (solution === gameState) {
    return true;
  }
  return false;
}
