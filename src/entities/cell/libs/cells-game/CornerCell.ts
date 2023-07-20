import { CanvasDraw } from "@/shared";
import { CellModel, ICornerCellOptionsCache } from "../../model";

interface ICornerCellProps {
  drawService: CanvasDraw;
  images: {
    start: string;
    theatre: string;
    customs: string;
  };
}

export class CornerCell {
  private drawService: CanvasDraw;
  private readonly textAling = "center";
  private readonly baseline = "middle";
  private cache;
  private startImage: HTMLImageElement;
  private theatreImage: HTMLImageElement;
  private customsImage: HTMLImageElement;

  constructor({ drawService, images }: ICornerCellProps) {
    this.drawService = drawService;
    this.cache = new Map();
    this.startImage = new Image();
    this.startImage.src = images.start;
    this.theatreImage = new Image();
    this.theatreImage.src = images.theatre;
    this.customsImage = new Image();
    this.customsImage.src = images.customs;
  }

  async drawCornerCell(cell: CellModel) {
    const cellOptions = this.getSizeDirection(cell);

    if (!cellOptions) return;

    /** Заголовок */
    this.drawService.text(cellOptions.name);
    /** Изображение */
    this.drawService.image(cellOptions.img);
  }

  /** Вычисляем расположение елементов ячейки */
  private getSizeDirection(
    cell: CellModel
  ): ICornerCellOptionsCache | undefined {
    if (!this.cache.has(cell._id)) {
      const step = cell.height / 5;

      const images: { [key: string]: HTMLImageElement } = {
        start: this.startImage,
        theatre: this.theatreImage,
        customs: this.customsImage,
        "visit theater": this.theatreImage,
      };

      const cellOptions: ICornerCellOptionsCache = {
        name: {
          text: cell.name,
          x: cell.x + cell.width / 2,
          y: cell.y + step * 4,
          textAling: this.textAling,
          baseline: this.baseline,
          maxWidth: cell.width - 6,
          fontSize: cell.width > 46 ? "1.5rem" : "1rem",
        },
        img: {
          image: images[cell.type],
          imageOptions: {
            x: cell.x + step,
            y: cell.y + step / 2,
            width: step * 3,
            height: step * 3,
          },
        },
      };

      this.cache.set(cell._id, cellOptions);
    }

    const cellCache = this.cache.get(cell._id);
    if (!cellCache) return;

    return cellCache;
  }
}
