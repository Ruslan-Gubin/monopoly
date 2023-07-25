import {
  CanvasDraw,
  IArbitraryFormsOptions,
  IColorPlayerVariant,
  IImageOptions,
  IRectOptions,
  ITextOptions,
} from "@/shared";
import { CellModel } from "../../model";

interface BaseCellProps {
  drawService: CanvasDraw;
}
interface BaseCellPlayersProps extends BaseCellProps {
  playerColor: IColorPlayerVariant;
}

export class BaseCell {
  public drawService: CanvasDraw;
  public readonly textAling = "center";
  public readonly baseline = "middle";
  private cellCache: Map<string, unknown>;

  constructor({ drawService }: BaseCellProps) {
    this.drawService = drawService;
    this.cellCache = new Map();
  }

  public drawTextCell(params: ITextOptions) {
    this.drawService.text(params);
  }

  public drawImgCell(params: IImageOptions) {
    this.drawService.image(params);
  }

  public drawRectCell(params: IRectOptions) {
    this.drawService.rect(params);
  }

  public drawArbitraryCell(params: IArbitraryFormsOptions) {
    this.drawService.arbitraryForms(params);
  }

  public getCellCacheId<T>(id: string): T | undefined {
    return this.cellCache.get(id) as T
  }

  public getParamsPosition<T>({ id, fields }: {
    id: string;
    fields: T;
  }): T | undefined {
    if (!this.cellCache.has(id)) {
      this.cellCache.set(id, fields);
    }

    return fields;
  }

  public getParamsCeil(cell: CellModel): IRectOptions {
    return {
      size: {height: cell.height, width: cell.width},
      start: {x: cell.x, y: cell.y},
      border: { width: 2 },  
    }
  }
  
}

export class BaseCellPlayers extends BaseCell {
  readonly playerColor: IColorPlayerVariant;
  constructor({
    drawService,
    playerColor,
  }: BaseCellPlayersProps) {
    super({ drawService });
    this.playerColor = playerColor;
  }

  public getParamsPlayerColor(cell: CellModel, ownerColor: string | null, property: boolean = false): IRectOptions {
    let y = cell.y;
    let height = cell.height

    if (property) {
      y = cell.y + cell.height / 4;
      height = cell.height - cell.height / 4
    }
    
    return {
      start: { x: cell.x, y },
      size: { width: cell.width, height },
      fill: ownerColor
        ? { color: this.playerColor[ownerColor] }
        : { color: "" },
    };
  }

}
