import { CanvasDraw, IColorPlayerVariant } from "@/shared";
import { CellModel, IPortCellOptionsCache } from "../../model";

interface IPortCellProps {
  drawService: CanvasDraw;
  playerColor: IColorPlayerVariant;
  imageSrc: string;
}

export class PortCell {
  private drawService: CanvasDraw;
  private readonly textAling = "center";
  private readonly baseline = "middle";
  private readonly playerColor;
  private cache;
  private portImage: HTMLImageElement;

  constructor({ drawService, playerColor, imageSrc }: IPortCellProps) {
    this.drawService = drawService;
    this.playerColor = playerColor;
    this.cache = new Map();
    this.portImage = new Image();
    this.portImage.src = imageSrc;
  }

  async drawPortCell(cell: CellModel) {
    const ownerColor = cell.owner ? cell.owner.color : null;

    const cellOptions = this.getSizeDirection(cell, ownerColor);

    if (!cellOptions) return;

    /** Закрасить поле в цвет владельца, если есть владелец */
    if (ownerColor) {
      this.drawService.rect(cellOptions.playerColor);
    }

    /** Название направление порта */
    this.drawService.text(cellOptions.direction);
    /** Стоимость ячейки, или оплата владельцу */
    this.drawService.text(cellOptions.price);
    /** Изображение */
    this.drawService.image(cellOptions.img);
  }

  /** Вычисляем расположение елементов ячейки */
  private getSizeDirection(
    cell: CellModel,
    ownerColor: string | null
  ): IPortCellOptionsCache | undefined {
    if (!this.cache.has(cell._id)) {
      const cellPrice = (cell.owner ? cell.owner.price : cell.price) as number;
      const centerCellWidth = cell.x + cell.width / 2;
      const step = cell.height / 4;
      let fontSize = cell.width > 46 ? "1.5rem" : "1rem";
      const lastWord = cell.name.slice(5, cell.name.length);
      let widthImage = cell.width / 2;
      let imageX = cell.x + cell.width / 4;

      if (cell.direction?.includes("side")) {
        widthImage = cell.width / 3;
        imageX = cell.x + cell.width / 3;
        if (cell.width < 65) {
          fontSize = "0.6";
        } else if (cell.width < 85) {
          fontSize = "1rem";
        } else {
          fontSize = "1.3rem";
        }
      }

      const cellOptions: IPortCellOptionsCache = {
        playerColor: {
          start: { x: cell.x, y: cell.y },
          size: { width: cell.width, height: cell.height },
          fill: ownerColor
            ? { color: this.playerColor[ownerColor] }
            : { color: "" },
        },
        direction: {
          text: lastWord,
          x: centerCellWidth,
          y: cell.y,
          textAling: this.textAling,
          baseline: "top",
          maxWidth: cell.width - 6,
          fontSize: fontSize,
        },
        price: {
          text: String(cellPrice),
          x: centerCellWidth,
          y: cell.y + step * 1.5,
          textAling: this.textAling,
          baseline: this.baseline,
          maxWidth: cell.width - 6,
          fontSize: fontSize,
        },
        img: {
          image: this.portImage,
          imageOptions: {
            x: imageX,
            y: cell.y + cell.height / 2,
            width: widthImage,
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
