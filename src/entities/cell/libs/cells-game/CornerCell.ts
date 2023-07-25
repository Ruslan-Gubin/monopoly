import { CanvasDraw, IImageOptions, ITextOptions } from "@/shared";
import { CellModel, ICornerCellOptionsCache } from "../../model";
import { BaseCell } from "./BaseCell";

interface ICornerCellProps {
  drawService: CanvasDraw;
  images: {
    start: string;
    theatre: string;
    customs: string;
  };
}

export class CornerCell extends BaseCell {
  private startImage: HTMLImageElement;
  private theatreImage: HTMLImageElement;
  private customsImage: HTMLImageElement;

  constructor({ drawService, images }: ICornerCellProps) {
    super({ drawService });
    this.startImage = new Image();
    this.startImage.src = images.start;
    this.theatreImage = new Image();
    this.theatreImage.src = images.theatre;
    this.customsImage = new Image();
    this.customsImage.src = images.customs;
  }

  async drawCornerCell(cell: CellModel) {
    const id = cell._id
    let cellCache = this.getCellCacheId<ICornerCellOptionsCache>(id)
    
    if (!cellCache) {
      cellCache = this.getParamsPosition<ICornerCellOptionsCache>({
        id,
        fields: {
          name: this.getParamsTitle(cell),
          img: this.getParamsImage(cell),
        },
      });
    }  
    
    if (!cellCache) return;

    /** Заголовок */
    this.drawTextCell(cellCache.name);
    /** Изображение */
    this.drawImgCell(cellCache.img);
  }

  private getParamsTitle(cell: CellModel): ITextOptions {
    const step = cell.height / 5;

    return {
      text: cell.name,
      x: cell.x + cell.width / 2,
      y: cell.y + step * 4,
      textAling: this.textAling,
      baseline: this.baseline,
      maxWidth: cell.width - 6,
      fontSize: cell.width > 46 ? "1.5rem" : "1rem",
    };
  }

  private getParamsImage(cell: CellModel): IImageOptions {
    const step = cell.height / 5;

    const images: { [key: string]: HTMLImageElement } = {
      start: this.startImage,
      theatre: this.theatreImage,
      customs: this.customsImage,
      "visit theater": this.theatreImage,
    };

    return {
      image: images[cell.type],
      imageOptions: {
        x: cell.x + step,
        y: cell.y + step / 2,
        width: step * 3,
        height: step * 3,
      },
    };
  }
}
