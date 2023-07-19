
export const calculateSizeBoard = ( width: number, height: number ) => {
  let boardX = (width - height) / 2;
  let boardY = 0;
  let boardSize = height;
    
  if (height > width) {
    boardX = 0;
    boardY = (height - width) / 2;
    boardSize = width;
  }

  const smallCell = boardSize / 12;
  const cornerCell = smallCell * 1.5;

  return {
    size: { x: boardX, y: boardY, width: boardSize, height: boardSize},
    smallCell,
    cornerCell,
  }
}