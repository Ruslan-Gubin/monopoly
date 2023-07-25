import { CanvasDraw,  IArbitraryFormsOptions,  IColorPlayerVariant, IRectOptions, ITextOptions } from "@/shared";
import { CellModel, IPropertyCellOptionsCache } from "../../model";
import { getStarsSize } from "../helpers";
import { BaseCellPlayers } from "./BaseCell";


export class PropertyCell extends BaseCellPlayers {
  constructor({ drawService, playerColor }: { drawService: CanvasDraw, playerColor: IColorPlayerVariant }) {
    super({ drawService, playerColor })
  }

  public drawPropertyCell(cell: CellModel, color: string, colorStars: string) {
    const ownerColor = cell.owner ? cell.owner.color : null;
    const side = cell.direction?.includes('side')

    const id = cell._id
    let cellCache = this.getCellCacheId<IPropertyCellOptionsCache>(id)

    if (!cellCache) {
      cellCache = this.getParamsPosition<IPropertyCellOptionsCache>({
        id,
        fields: {
          playerColor: this.getParamsPlayerColor(cell, ownerColor, true),
          ceilCell: this.getParamsCeil(cell),
          bandSize: this.getParamsBand(cell, color, side),
          price: this.getParamsPrice(cell, side),
          name: this.getParamsTitle(cell, side),
          stars: this.getParamsStars(cell, side),
        },
      });
    }

    if (!cellCache) return;

  /** Закрасить поле в цвет владельца, если есть владелец */
  if (ownerColor) {
  this.drawRectCell(cellCache.playerColor)
  }
  /** Вся ячейка */
  this.drawRectCell(cellCache.ceilCell)
  /** Название собственности */
  this.drawTextCell(cellCache.name) 
  /** Верхняя полоса */
  this.drawRectCell(cellCache.bandSize)
  /** Цена собственности или оплата владельцу */
  this.drawTextCell(cellCache.price)
  /** Показываем улучшение собственности */
  const houseCount = cellCache.stars.length
if (houseCount > 0 && houseCount < 5) {
  this.drawStars(cellCache.stars, colorStars)
 } else if (houseCount > 4) {
  this.drawHotel(cell, side)
 }

}

private getParamsStars(cell: CellModel, side: boolean | undefined): IArbitraryFormsOptions[] | [] {
  if (!cell.house_count) {
    return [];
  }

  const starsArray: IArbitraryFormsOptions[] = []
  const { nexStep, starsSize } = getStarsSize(cell, side)

    for (let i = 0; i < cell.house_count; i++) {
    starsArray.push({ startLine: starsSize.start(), lines: starsSize.lines() })
      
    starsSize.leftSize.x += nexStep
    starsSize.top.x += nexStep
    starsSize.bottom.x += nexStep
    starsSize.rightSize.x += nexStep
   } 

  return starsArray
}

private getParamsBand(cell: CellModel, color: string, side: boolean | undefined): IRectOptions {
  const height = side ? cell.width / 4 : cell.height / 4

  return {
    start: { x: cell.x, y: cell.y },
    size: { width: cell.width, height },
    border: { width: 2 },
    fill: { color } 
  }
}

private getParamsPrice(cell: CellModel, side: boolean | undefined): ITextOptions {
  const cellPrice = (cell.owner ? cell.owner.price : cell.price) as number;
  let textY = cell.width > 40 ? cell.y + (cell.height / 1.3) : cell.y + (cell.height / 1.2)
  let fontSize = cell.width > 40 ? '1.3rem' : '.6rem';
  
  if (side) {
    textY =  cell.y + (cell.height / 1.2)
    fontSize = cell.width > 80 ? '1.3rem' : '.8rem';
  }

  return {
    text: String(cellPrice),
    x: cell.x + (cell.width / 2),
    y: textY,
    textAling: this.textAling,
    baseline: this.baseline,
    maxWidth: cell.width / 2,
    fontSize,
  }
}

private getParamsTitle(cell: CellModel, side: boolean | undefined): ITextOptions {
  let textY = cell.y + (cell.height / 2)
  let fontSize = cell.width > 40 ? '1.2rem' : '.6rem';

  if (side) {
    textY = cell.y + (cell.height / 1.9)
    fontSize = cell.width > 80 ? '1.3rem' : '.9rem';
  }

  return {
    text: cell.name,
    x: cell.x + (cell.width / 2),
    y: textY,
    textAling: this.textAling,
    baseline: this.baseline,
    maxWidth: cell.width - 10,
    fontSize: fontSize,
  }
}

private drawStars(stars: IArbitraryFormsOptions[], colorStars: string) {
  for (let i = 0; i < stars.length; i++) {
    const currentStars = stars[i]
    this.drawArbitraryCell({
      startLine: currentStars.startLine,
      lines: currentStars.lines,
      border: { width: 1, color: 'white' },
      fill: {color: colorStars}
    })
  }
}

private drawHotel(cell: CellModel, side: boolean | undefined) {
  const bandHeight = side ? cell.width / 4 : cell.height / 4
  const fontSize = (cell.width / 13) * 2

  this.drawService.text({
    text: 'Торговый дом',
    x: cell.x + (cell.width / 2), y: (cell.y + bandHeight / 2),
    textAling: this.textAling,
    baseline: this.baseline,
    maxWidth: cell.width - 6,
    color: 'white',
    fontSize: `${fontSize}px`
  })
}

}