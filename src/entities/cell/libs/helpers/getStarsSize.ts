import { CellModel } from "../../model";

export const getStarsSize = (cell: CellModel, side: boolean | undefined) => {
  const bandHeight = side ? cell.width / 4 : cell.height / 4
  const maxWidth = cell.width - 6;
  const maxHeight = bandHeight - 12;
  const step = maxWidth / 5;
  const nexStep = step + step / 3;
  const quarterHeigth = Math.ceil(maxHeight / 4);
  const quarterWidth = Math.ceil(step / 4);

 const starsSize = {
    leftSize: { x: cell.x + 3, y: cell.y + 6 + maxHeight / 2 },
    rightSize: { x: cell.x + 3 + step, y: cell.y + 6 + maxHeight / 2 },
    top: { x: cell.x + 3 + step / 2, y: cell.y + 6 },
    bottom: { x: cell.x + 3 + step / 2, y: cell.y + 6 + maxHeight },
    start() {
      return { x: this.leftSize.x, y: this.leftSize.y };
    },
    lines() {
      return [
        this.leftSize.x + quarterWidth + 1,
        this.top.y + quarterHeigth + 1,
        this.top.x,
        this.top.y,
        this.rightSize.x - quarterWidth - 1,
        this.top.y + quarterHeigth + 1,
        this.rightSize.x,
        this.rightSize.y,
        this.rightSize.x - quarterWidth - 1,
        this.bottom.y - quarterHeigth - 1,
        this.bottom.x,
        this.bottom.y,
        this.leftSize.x + quarterWidth + 1,
        this.bottom.y - quarterHeigth - 1,
        this.leftSize.x,
        this.leftSize.y,
      ];
    },
  } 

  return {
    nexStep,
    starsSize,
  };
};
