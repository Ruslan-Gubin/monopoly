import { CanvasDraw, IColorPlayerVariant, IImageOptions, ITextOptions } from "@/shared";
import { CellModel, IPortCellOptionsCache } from "../../model";
import { BaseCellPlayers } from "./BaseCell";

interface IPortCellProps {
  drawService: CanvasDraw;
  playerColor: IColorPlayerVariant;
  imageSrc: string;
}

export class PortCell extends BaseCellPlayers {
  private portImage: HTMLImageElement;

  constructor({ drawService, playerColor, imageSrc }: IPortCellProps) {
    super({ drawService, playerColor });
    this.portImage = new Image();
    this.portImage.src = imageSrc;
  }

  async drawPortCell(cell: CellModel) {
    const ownerColor = cell.ownerColor ? cell.ownerColor : null;
    const isMortgage = cell.is_mortgage ? cell.is_mortgage : false;
    const id = cell._id
    let cellCache = this.getCellCacheId<IPortCellOptionsCache>(id)

    if (!cellCache) {
      cellCache = this.getParamsPosition<IPortCellOptionsCache>({
        id,
        fields: {
          playerColor: this.getParamsPlayerColor(cell, ownerColor),
          direction: this.getParamsTitle(cell),
          price: this.getParamsPrice(cell),
          img: this.getParamsImage(cell),
          mortgage: this.getParamsMortgage(cell, isMortgage),
        },
      });
    }

    if (!cellCache) return;

    /** Закрасить поле в цвет владельца, если есть владелец */
    if (ownerColor) {
      this.drawRectCell(cellCache.playerColor);
    }

    /** Название направление порта */
    this.drawTextCell(cellCache.direction);
    /** Если собственность заложена */
    if (!cellCache.mortgage) {
      /** Стоимость ячейки, или оплата владельцу */
      this.drawTextCell(cellCache.price);
    } else {
      this.drawTextCell(cellCache.mortgage)
    }
    /** Изображение */
    this.drawImgCell(cellCache.img);
  }

  private getParamsTitle(cell: CellModel): ITextOptions {
    const lastWord = cell.name.slice(5);

    return {
      text: lastWord,
      x: cell.x + cell.width / 2,
      y: cell.y,
      textAling: this.textAling,
      baseline: "top",
      maxWidth: cell.width - 6,
      fontSize: this.getFontSize(cell),
    };
  }

  private getParamsPrice(cell: CellModel): ITextOptions {
    const cellPrice = (cell.owner ? cell.owner.price : cell.price) as number;
    const step = cell.height / 4;

    return {
      text: String(cellPrice),
      x: cell.x + cell.width / 2,
      y: cell.y + step * 1.5,
      textAling: this.textAling,
      baseline: this.baseline,
      maxWidth: cell.width - 6,
      fontSize: this.getFontSize(cell),
    };
  }

  private getParamsImage(cell: CellModel): IImageOptions {
    let widthImage = cell.width / 2;
    let imageX = cell.x + cell.width / 4;

    if (cell.direction?.includes("side")) {
      widthImage = cell.width / 3;
      imageX = cell.x + cell.width / 3;
    }

    return {
      image: this.portImage,
      imageOptions: {
        x: imageX,
        y: cell.y + cell.height / 2,
        width: widthImage,
        height: cell.height / 2,
      },
    };
  }

  private getFontSize(cell: CellModel) {
    let fontSize = cell.width > 50 ? "1.5rem" : "1.1rem";
    
    if (cell.direction?.includes("side")) {
      if (cell.width < 65) {
        fontSize = "0.6";
      } else if (cell.width < 85) {
        fontSize = "1rem";
      } else {
        fontSize = "1.3rem";
      }
    }

    return fontSize
  }

  private getParamsMortgage(cell: CellModel, isMorgage: boolean): ITextOptions | null {
    if (!isMorgage) return null;
    const step = cell.height / 4;
  
    return {
      text: 'Заложено',
      x: cell.x + cell.width / 2,
      y: cell.y + step * 1.5,
      textAling: this.textAling,
      baseline: this.baseline,
      maxWidth: cell.width - 6,
      fontSize: this.getFontSize(cell),
      color: 'red'
    }
  }
}
