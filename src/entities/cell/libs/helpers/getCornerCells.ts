import { getSizeCells, RectTypeSize } from "@/shared";
import { CellModel } from "../../model";


export const getCornerPosition = (boardSize: RectTypeSize,cell: CellModel): CellModel | undefined => {
  if (!boardSize || !cell) return;
  const { cornerCell } = getSizeCells(boardSize.width)

  const bottomY = boardSize.y + boardSize.height - cornerCell;
  const startBoardX = boardSize.x + boardSize.width - cornerCell;

  switch (cell.type) {
    case 'customs':
      const customsPosition = {
        x: boardSize.x,
        y: boardSize.y,
        width: cornerCell,
        height: cornerCell,    
      }
      return { ...cell, ...customsPosition }
    
    case 'visit theater':
      const visitTheatrPosition = {
        x: startBoardX,
        y: boardSize.y,
        width: cornerCell,
        height: cornerCell,  
      }
      return  {...cell, ...visitTheatrPosition}

    case 'theatre':
      const theatrePosition = {
        x: boardSize.x,
        y: bottomY,
        width: cornerCell,
        height: cornerCell,  
      }
      return  { ...cell, ...theatrePosition }

    case 'start':
      const startPosition = {
        x: startBoardX,
        y: bottomY,
        width: cornerCell,
        height: cornerCell,  
      }
     return  {...cell, ...startPosition}
  }

}
