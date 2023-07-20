import { CanvasDraw, IColorPlayerVariant } from "@/shared";
import { CellModel, IUtilitesCellOptionsCache } from "../../model";

interface IUtilitiesCellProps {
  playerColor: IColorPlayerVariant;
  drawService: CanvasDraw;
  images: {
    water: string;
    energy: string;
  };
}

export class UtilitiesCell {
  private drawService: CanvasDraw;
  private readonly textAling = "center";
  private readonly baseline = "middle";
  private readonly playerColor;
  private cache;
  private energyImage: HTMLImageElement;
  private waterImage: HTMLImageElement;

  constructor({ drawService, images, playerColor }: IUtilitiesCellProps) {
    this.drawService = drawService;
    this.playerColor = playerColor;
    this.cache = new Map();
    this.waterImage = new Image();
    this.waterImage.src = images.water;
    this.energyImage = new Image();
    this.energyImage.src = images.energy;
  }

  async drawUtilitesCell(cell: CellModel) {
    const ownerColor = cell.owner ? cell.owner.color : null;
    const cellOptions = this.getSizeDirection(cell, ownerColor);

    if (!cellOptions) return;

     /** Закрасить поле в цвет владельца, если есть владелец */
     if (ownerColor) {
      this.drawService.rect(cellOptions.playerColor);
    }

    /** Название */
    this.drawService.text(cellOptions.name);
      /** Стоимость ячейки, или оплата владельцу */
      this.drawService.text(cellOptions.price);
    /** Изображение */
    this.drawService.image(cellOptions.img);
  }

  /** Вычисляем расположение елементов ячейки */
  private getSizeDirection(
    cell: CellModel,
    ownerColor: string | null
  ): IUtilitesCellOptionsCache | undefined {
    if (!this.cache.has(cell._id)) {
      const centerCellWidth = cell.x + cell.width / 2;
      const step = cell.height / 4;
      let fontSize = cell.width > 46 ? "1.4rem" : "0.8rem";

      const images: { [key: string]: HTMLImageElement } = {
        "utilities-energy": this.energyImage,
        "utilities-water": this.waterImage,
      };

      if (cell.direction?.includes("side")) {
        if (cell.width < 65) {
          fontSize = "0.6";
        } else if (cell.width < 85) {
          fontSize = "1rem";
        } else {
          fontSize = "1.3rem";
        }
      }

      const cellOptions: IUtilitesCellOptionsCache = {
        playerColor: {
          start: { x: cell.x, y: cell.y },
          size: { width: cell.width, height: cell.height },
          fill: ownerColor
            ? { color: this.playerColor[ownerColor] }
            : { color: "" },
        },
        name: {
          text: cell.name,
          x: centerCellWidth,
          y: cell.y,
          textAling: this.textAling,
          baseline: "top",
          maxWidth: cell.width - 6,
          fontSize: fontSize,
        },
        price: {
          text: String(cell.price),
          x: centerCellWidth,
          y: cell.y + step * 1.5,
          textAling: this.textAling,
          baseline: this.baseline,
          maxWidth: cell.width - 6,
          fontSize: fontSize,
        },
        img: {
          image: images[cell.type],
          imageOptions: {
            x: cell.x + cell.width / 4,
            y: cell.y + cell.height / 2,
            width: cell.width / 2,
            height: cell.height / 2,
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