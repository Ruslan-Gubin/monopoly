import { getSizeCells, RectTypeSize } from "@/shared";
import { CellModel } from "../../model";
import { getCornerPosition } from "./getCornerCells";

export const getCellsPosition = (boardSize:RectTypeSize, cells: CellModel[]) => {
  if (!boardSize || !cells) return;
  const { cornerCell, smallCell } = getSizeCells(boardSize.width)
  if (!cornerCell) return;

  const updateCells:CellModel[] = []

  const bottomY = boardSize.y + boardSize.height - cornerCell;
  let bottomSide  = boardSize.x + boardSize.width - cornerCell - smallCell;
  let leftSide = boardSize.y + boardSize.height - (cornerCell + smallCell);
  let topSide = boardSize.x + cornerCell;
  let rightSide = boardSize.y + cornerCell;


  cells.forEach(cell => {

    switch (cell.direction) {
      case 'center-bottom':
        const centerCell = {
          x: bottomSide,
          y: bottomY,
          width: smallCell,
          height: cornerCell, 
        }
        updateCells.push({ ...cell, ...centerCell })
        bottomSide -= smallCell;  
        break;
      case 'side-left':
        const leftCell = {
          x: boardSize.x,
          y: leftSide,
          width: cornerCell,
          height: smallCell,
        }

        updateCells.push({ ...cell, ...leftCell })
        leftSide -= smallCell;  
        break;
      case 'center-top':
        const topCell = {
          x: topSide,
          y: boardSize.y,
          width: smallCell,
          height: cornerCell, 
        }

        updateCells.push({ ...cell, ...topCell })
        topSide += smallCell;  
        break;
      case 'side-right':
        const rightCell = {
          x: boardSize.x + boardSize.width - cornerCell,
          y: rightSide,
          width: cornerCell,
          height: smallCell,
        }
        updateCells.push({ ...cell, ...rightCell })
          rightSide += smallCell;  
        break;
      case 'corner':
        const corner = getCornerPosition(boardSize, cell)
        if (corner) {
          updateCells.push(corner)
        }
        break;
    }
  })

  return updateCells;
}


