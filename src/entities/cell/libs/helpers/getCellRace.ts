import { ISize } from "@/entities/board";

export interface ICellRace {
  bottom: {
    leftX: number;
    rightX: number;
    y: number;
  };
  leftSide: {
    x: number;
    topY: number;
    bottomY: number;
  };
  top: {
    y: number;
    leftX: number;
    right: number;
  };
  right: {
    x: number;
    topY: number;
    bottomY: number;
  };
}

export const getCellRace = (cornerSize: number, size: ISize): ICellRace => {
  const center = cornerSize / 2;

  const direction = {
    bottom: {
      leftX: center,
      rightX: size.width - center,
      y: size.height - center,
    },
    leftSide: { x: center, topY: center, bottomY: size.height - center },
    top: { y: center, leftX: center, right: size.width - center },
    right: {
      x: size.width - center,
      topY: center,
      bottomY: size.height - center,
    },
  };
  return direction;
};
