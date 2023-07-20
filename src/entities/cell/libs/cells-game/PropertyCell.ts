import { CanvasDraw,  IColorPlayerVariant } from "@/shared";
import { CellModel, IPropertyCellOptionsCache } from "../../model";
import { getStarsSize } from "../helpers";


export class PropertyCell {
  private drawService: CanvasDraw;
  private readonly textAling = 'center';
  private readonly baseline = 'middle';
  private readonly playerColor;
  private cache;

  constructor({ drawService, playerColor }: { drawService: CanvasDraw, playerColor: IColorPlayerVariant }) {
    this.drawService = drawService
    this.playerColor = playerColor
    this.cache = new Map()
  }

  public drawPropertyCell(cell: CellModel, color: string, colorStars: string) {
  const playerColor = cell.owner ? cell.owner.color : null;
  const side = cell.direction?.includes('side')
  const cellOptions = this.getSizeDirection(side, cell, playerColor, color)

  if(!cellOptions) return;

  const bandHeight = cellOptions.bandSize.size.height
  
  /** Закрасить поле в цвет владельца, если есть владелец */
  if (playerColor) {
  this.drawService.rect(cellOptions.playerColor)
  }
  /** Вся ячейка */
  this.drawService.rect(cellOptions.ceilCell)
  /** Название собственности */
  this.drawService.text(cellOptions.name) 
  /** Верхняя полоса */
  this.drawService.rect(cellOptions.bandSize)
  /** Цена собственности или оплата владельцу */
  this.drawService.text(cellOptions.price)

  /** Показываем улучшение собственности */
   const houseCount = cell.house_count
   if (houseCount > 0 && houseCount < 5) {
     this.drawStars(cell, houseCount, bandHeight, colorStars)
     if (cell.name === 'кресло') {
    }
    } else if (houseCount === 5) {
      this.drawHotel(cell, bandHeight)
    }  
}

private drawStars(cell: CellModel, houseCount: number, bandHeight: number, colorStars: string) {
  if (houseCount < 1) return;
  const keyStarsInCache = `stars${cell._id}${houseCount}`;

  if (!this.cache.has(keyStarsInCache)) {
    const { nexStep, starsSize } = getStarsSize(cell, bandHeight)

    this.cache.set(keyStarsInCache, [])
    const starsItem = this.cache.get(keyStarsInCache)

    for (let i = 0; i < houseCount; i++) {
      starsItem.push({ start: starsSize.start(), lines: starsSize.lines() })
      
     starsSize.leftSize.x += nexStep
     starsSize.top.x += nexStep
     starsSize.bottom.x += nexStep
     starsSize.rightSize.x += nexStep
   } 
 }

 const cacheStar = this.cache.get(keyStarsInCache)
 if (!cacheStar) return;

  for (let i = 0; i < cacheStar.length; i++) {
    const stars = cacheStar[i]
    this.drawService.arbitraryForms({
      startLine: stars.start,
      lines: stars.lines,
      border: { width: 1, color: 'white' },
      fill: {color: colorStars}
    })
  }
}

private drawHotel(cell: CellModel, bandHeight: number) {
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

/** Вычисляем расположение елементов ячейки */
private getSizeDirection(side: boolean | undefined, cell: CellModel, playerColor: string | null, color: string): IPropertyCellOptionsCache | undefined {
  
  if (!this.cache.has(cell._id)) {
    const cellPrice = (cell.owner ? cell.owner.price : cell.price) as number;

    const cellOptions: IPropertyCellOptionsCache = {
      playerColor: {
        start: { x: cell.x, y: cell.y + cell.height / 4 },
        size: { width: cell.width, height: cell.height - cell.height / 4 },
        fill: playerColor ? {color: this.playerColor[playerColor]} : { color: '' }
      },
      ceilCell: {
        size: {height: cell.height, width: cell.width},
        start: {x: cell.x, y: cell.y},
        border: { width: 2 },  
      },
      bandSize: {
        start: { x: cell.x, y: cell.y },
        size: { width: cell.width, height: cell.height / 4 },
        border: { width: 2 },
        fill: { color } 
      },
      price: {
        text: String(cellPrice),
        x: cell.x + (cell.width / 2),
        y: cell.width > 40 ? cell.y + (cell.height / 1.3) : cell.y + (cell.height / 1.2),
        textAling: this.textAling,
        baseline: this.baseline,
        maxWidth: cell.width / 2,
        fontSize: cell.width > 40 ? '1.5rem' : '.6rem',
      },
      name: {
        text: cell.name,
        x: cell.x + (cell.width / 2),
        y: cell.y + (cell.height / 2),
        textAling: this.textAling,
        baseline: this.baseline,
        maxWidth: cell.width - 10,
        fontSize: cell.width > 40 ? '1.3rem' : '.7rem',
      }

    }

    if (side) {
      cellOptions.bandSize.size.height = cell.width / 4;
      cellOptions.name.y = cell.y + (cell.height / 1.8);
      cellOptions.name.fontSize = cell.width > 60 ? '1.5rem' : '.9rem';
      cellOptions.price.y = cell.y + (cell.height / 1.2);
      cellOptions.price.fontSize = cell.width > 80 ? '1.5rem' : '.8rem';
    }
    this.cache.set(cell._id, cellOptions)
  }

  const cellCache = this.cache.get(cell._id)
  if (!cellCache) return;
  
 return cellCache;
}

}