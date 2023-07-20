import { CanvasDraw } from "@/shared";
import { CellModel, IActionCellOptionsCache } from "../../model";

interface IActionCellProps {
  drawService: CanvasDraw;
  images: {
    dice: string;
    lottery: string;
    tax: string;
  };
}

export class ActionCell {
  private drawService: CanvasDraw;
  private readonly textAling = "center";
  private readonly baseline = "middle";
  private cache;
  private cubesImage: HTMLImageElement;
  private lotteryImage: HTMLImageElement;
  private taxImage: HTMLImageElement;

  constructor({ drawService, images }: IActionCellProps) {
    this.drawService = drawService;
    this.cache = new Map();
    this.cubesImage = new Image();
    this.cubesImage.src = images.dice;
    this.lotteryImage = new Image();
    this.lotteryImage.src = images.lottery;
    this.taxImage = new Image();
    this.taxImage.src = images.tax;
  }

  async drawActionCell(cell: CellModel) {
    const cellOptions = this.getSizeDirection(cell);

    if (!cellOptions) return;

    /** Вся ячейка */
    this.drawService.rect(cellOptions.ceilCell)
    /** Заголовок */
    this.drawService.text(cellOptions.name);
    /** Изображение */
    this.drawService.image(cellOptions.img);
  }

  /** Вычисляем расположение елементов ячейки */
  private getSizeDirection(
    cell: CellModel
  ): IActionCellOptionsCache | undefined {
    if (!this.cache.has(cell._id)) {
      const centerCellWidth = cell.x + cell.width / 2;
      let fontSize = cell.width > 46 ? "1.5rem" : "1rem";
      const lastWord = cell.name.slice(5, cell.name.length);

      const images: { [key: string]: HTMLImageElement } = {
        "action-chance": this.cubesImage,
        "action-lottery": this.lotteryImage,
        "action-tax": this.taxImage,
      };

      if (cell.direction?.includes("side")) {
        if (cell.width < 65) {
          fontSize = "0.6";
        } else if (cell.width < 85) {
          fontSize = "1rem";
        } else {
          fontSize = "1.5rem";
        }
      }

      const cellOptions: IActionCellOptionsCache = {
        name: {
          text: cell.name,
          x: centerCellWidth,
          y: cell.y + cell.height / 6,
          textAling: this.textAling,
          baseline: this.baseline,
          maxWidth: cell.width - 6,
          fontSize: fontSize,
        },
        ceilCell: {
          size: {height: cell.height, width: cell.width},
          start: {x: cell.x, y: cell.y},
          border: { width: 2 },  
        },
        tax: {
          text: lastWord,
          x: centerCellWidth,
          y: cell.y,
          textAling: this.textAling,
          baseline: "top",
          maxWidth: cell.width - 6,
          fontSize: fontSize,
        },
        img: {
          image: images[cell.type],
          imageOptions: {
            x: cell.x + cell.width / 4,
            y: cell.y + cell.height / 2.5,
            width: cell.width / 2,
            height: cell.height / 2,
          },
        },
      };

      if (cell.name === "плати налог" && cell.direction === "center-bottom") {
        cellOptions.name.text = "налог";
      }

      this.cache.set(cell._id, cellOptions);
    }

    const cellCache = this.cache.get(cell._id);
    if (!cellCache) return;

    return cellCache;
  }
}
