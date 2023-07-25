import { CanvasDraw, IColorPlayerVariant, IImageOptions, ITextOptions } from "@/shared";
import { CellModel, IUtilitesCellOptionsCache } from "../../model";
import { BaseCellPlayers } from "./BaseCell";

interface IUtilitiesCellProps {
  playerColor: IColorPlayerVariant;
  drawService: CanvasDraw;
  images: {
    water: string;
    energy: string;
  };
}

export class UtilitiesCell extends BaseCellPlayers {
  private energyImage: HTMLImageElement;
  private waterImage: HTMLImageElement;

  constructor({ drawService, images, playerColor }: IUtilitiesCellProps) {
    super({ drawService, playerColor })
    this.waterImage = new Image();
    this.waterImage.src = images.water;
    this.energyImage = new Image();
    this.energyImage.src = images.energy;
  }

  async drawUtilitesCell(cell: CellModel) {
    const ownerColor = cell.owner ? cell.owner.color : null;
    const id = cell._id
    let cellCache = this.getCellCacheId<IUtilitesCellOptionsCache>(id)

    if (!cellCache) {
      cellCache = this.getParamsPosition<IUtilitesCellOptionsCache>({
        id,
        fields: {
          playerColor: this.getParamsPlayerColor(cell, ownerColor),
          name: this.getParamsTitle(cell),
          price: this.getParamsPrice(cell),
          img: this.getParamsImage(cell),
        },
      });
    }

    if (!cellCache) return;

     /** Закрасить поле в цвет владельца, если есть владелец */
     if (ownerColor) {
      this.drawRectCell(cellCache.playerColor);
    }

    /** Название */
    this.drawTextCell(cellCache.name);
    /** Стоимость ячейки, или оплата владельцу */
    this.drawTextCell(cellCache.price);
    /** Изображение */
    this.drawImgCell(cellCache.img);
  }

  private getParamsTitle(cell: CellModel): ITextOptions {
    return {
      text: cell.name,
      x: cell.x + cell.width / 2,
      y: cell.y,
      textAling: this.textAling,
      baseline: "top",
      maxWidth: cell.width - 6,
      fontSize: this.getFontSizeTitle(cell),
    };
  }

  private getParamsPrice(cell: CellModel): ITextOptions {
    const step = cell.height / 4;

    return {
      text: String(cell.price),
      x: cell.x + cell.width / 2,
      y: cell.y + step * 1.5,
      textAling: this.textAling,
      baseline: this.baseline,
      maxWidth: cell.width - 6,
      fontSize: this.getFontSizeTitle(cell),
    };
  }

  private getParamsImage(cell: CellModel): IImageOptions {
    const images: { [key: string]: HTMLImageElement } = {
      "utilities-energy": this.energyImage,
      "utilities-water": this.waterImage,
    };

    return {
      image: images[cell.type],
      imageOptions: {
        x: cell.x + cell.width / 4,
        y: cell.y + cell.height / 2,
        width: cell.width / 2,
        height: cell.height / 2,
      },
    };
  }

  private getFontSizeTitle(cell: CellModel) {
    let fontSize = cell.width > 50 ? "1.4rem" : "0.8rem";

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

}