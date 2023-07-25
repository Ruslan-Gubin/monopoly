import { CanvasDraw, IImageOptions, IRectOptions, ITextOptions } from "@/shared";
import { CellModel, IActionCellOptionsCache } from "../../model";
import { BaseCell } from "./BaseCell";

interface IActionCellProps {
  drawService: CanvasDraw;
  images: {
    dice: string;
    lottery: string;
    tax: string;
  };
}

export class ActionCell extends BaseCell {
  private cubesImage: HTMLImageElement;
  private lotteryImage: HTMLImageElement;
  private taxImage: HTMLImageElement;

  constructor({ drawService, images }: IActionCellProps) {
    super({ drawService })
    this.cubesImage = new Image();
    this.cubesImage.src = images.dice;
    this.lotteryImage = new Image();
    this.lotteryImage.src = images.lottery;
    this.taxImage = new Image();
    this.taxImage.src = images.tax;
  }

  async drawActionCell(cell: CellModel) {
    const id = cell._id
    let cellCache = this.getCellCacheId<IActionCellOptionsCache>(id)

    if (!cellCache) {
      cellCache = this.getParamsPosition<IActionCellOptionsCache>({
        id,
        fields: {
          name: this.getParamsTitle(cell),
          ceilCell: this.getParamsCeil(cell),
          tax: this.getParamsTax(cell),
          img: this.getParamsImage(cell),
        },
      });
    }

    if (!cellCache) return;
 

    /** Вся ячейка */
    this.drawRectCell(cellCache.ceilCell)
    /** Заголовок */
    this.drawTextCell(cellCache.name);
    /** Изображение */
    this.drawImgCell(cellCache.img);
  }

  private getParamsTitle(cell: CellModel): ITextOptions {
    const fontSize = this.getFontSize(cell);
    let text = cell.name

    if (cell.name === "плати налог" && cell.direction === "center-bottom") {
      text = "налог";
    }

    return {
      text: text,
      x: cell.x + cell.width / 2,
      y: cell.y + cell.height / 6,
      textAling: this.textAling,
      baseline: this.baseline,
      maxWidth: cell.width - 6,
      fontSize: fontSize,
    };
  }

  private getParamsTax(cell: CellModel): ITextOptions {
    const fontSize = this.getFontSize(cell);
    const lastWord = cell.name.slice(5);

    return {
      text: lastWord,
      x: cell.x + cell.width / 2,
      y: cell.y,
      textAling: this.textAling,
      baseline: "top",
      maxWidth: cell.width - 6,
      fontSize: fontSize,
    };
  }

  private getFontSize(cell: CellModel) {
    let fontSize = cell.width > 46 ? "1.5rem" : "1rem";

    if (cell.direction?.includes("side")) {
      if (cell.width < 65) {
        fontSize = "0.6";
      } else if (cell.width < 85) {
        fontSize = "1rem";
      } else {
        fontSize = "1.5rem";
      }
    }
    return fontSize
  }

  private getParamsImage(cell: CellModel): IImageOptions {
    const images: { [key: string]: HTMLImageElement } = {
      "action-chance": this.cubesImage,
      "action-lottery": this.lotteryImage,
      "action-tax": this.taxImage,
    };

    return {
      image: images[cell.type],
      imageOptions: {
        x: cell.x + cell.width / 4,
        y: cell.y + cell.height / 2.5,
        width: cell.width / 2,
        height: cell.height / 2,
      }
  }
  }

}
