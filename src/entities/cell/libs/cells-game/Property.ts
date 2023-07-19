import { CanvasDraw, COLOR_CELL_PLAYER_COLOR } from "@/shared";
import { CellModel } from "../../model";


export class Property {
  private drawService: CanvasDraw;
  private readonly textAling = 'center';
  private readonly baseline = 'middle';
  private readonly playerColor;

  constructor({ service }: {service: CanvasDraw}) {
    this.drawService = service
    this.playerColor = COLOR_CELL_PLAYER_COLOR
  }

  public drawPropertyCell(cell: CellModel, color: string, colorStars: string) {
  const playerColor = cell.owner ? cell.owner.color : null;
  const side = cell.direction?.includes('side')
  const cellPrice = (cell.owner ? cell.owner.price : cell.price) as number;
  const { bandHeight, nameFont, nameY, priceFont, priceY } = this.getSizeDirection(side, cell)
  
  /** Закрасить поле в цвет владельца, если есть владелец */
  if (playerColor) {
  this.drawService.rect({
    start: { x: cell.x, y: cell.y + cell.height / 4 },
      size: { width: cell.width, height: cell.height - cell.height / 4 },
      fill: {color: this.playerColor[playerColor]}
    })
  }

  /** Вся ячейка */
  this.drawService.rect({
    size: {height: cell.height, width: cell.width},
    start: {x: cell.x, y: cell.y},
    border: { width: 2 },
  })

  /** Название собственности */
  this.drawService.text({
    text: cell.name,
    x: cell.x + (cell.width / 2),
    y: nameY,
    textAling: this.textAling,
    baseline: this.baseline,
    maxWidth: cell.width - 10,
    fontSize: nameFont,
  })

  /** Верхняя полоса */
  this.drawService.rect({
    start: { x: cell.x, y: cell.y },
    size: { width: cell.width, height: bandHeight },
    border: { width: 2 },
    fill: { color }
  })

    /** Цена собственности или оплата владельцу */
     this.drawService.text({
      text: String(cellPrice),
      x: cell.x + (cell.width / 2),
      y: priceY,
      textAling: this.textAling,
      baseline: this.baseline,
    maxWidth: cell.width / 2,
    fontSize: priceFont,
  })

    /** Показываем улучшение ячейки */
    const mockCountStars = 4
    const houseCount = mockCountStars
    // const houseCount = cell.house_count
   if (houseCount > 0 && houseCount < 5) {
     this.drawStars(cell, mockCountStars, bandHeight, colorStars)
    } else if (houseCount > 4) {
      this.drawHotel(cell, bandHeight)
    }  
}

private drawStars(cell: CellModel, houseCount: number, bandHeight: number, colorStars: string) {
  if (houseCount < 1) return;
  const maxWidth = cell.width - 6
  const maxHeight = bandHeight - 12
  const step = maxWidth / 5
  const nexStep = step + (step / 3)
  const quarterHeigth = Math.ceil(maxHeight / 4)
  const quarterWidth = Math.ceil(step / 4)

  const leftSize = {x: cell.x + 3, y: cell.y + 6 + (maxHeight / 2)}
  const rightSize = { x: leftSize.x + step, y: leftSize.y }
  const top = { x: leftSize.x + (step / 2), y: cell.y + 6}
  const bottom = { x: top.x, y: cell.y + 6 + maxHeight }

  for (let i = 0; i < houseCount; i++) {
    this.drawService.arbitraryForms({
      startLine: { x: leftSize.x, y: leftSize.y },
      lines: [
        leftSize.x + quarterWidth + 1, top.y + quarterHeigth + 1,
        top.x, top.y,
        rightSize.x - quarterWidth - 1, top.y + quarterHeigth + 1,
        rightSize.x, rightSize.y,
        rightSize.x - quarterWidth - 1, bottom.y - quarterHeigth - 1,
        bottom.x, bottom.y,
        leftSize.x + quarterWidth + 1, bottom.y - quarterHeigth - 1,
        leftSize.x, leftSize.y
      ],
      border: { width: 1, color: 'white' },
      fill: {color: colorStars}
    })
    leftSize.x += nexStep
    top.x += nexStep
    bottom.x += nexStep
    rightSize.x += nexStep
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
private getSizeDirection(side: boolean | undefined, cell: CellModel) {
  let nameFont = cell.width > 40 ? '1.3rem' : '.7rem';
  let nameY = cell.y + (cell.height / 2);
  let bandHeight = cell.height / 4;
  let priceFont = cell.width > 40 ? '1.5rem' : '.6rem';
  let priceY = cell.width > 40 ? cell.y + (cell.height / 1.3) : cell.y + (cell.height / 1.2);

  if (side) {
    nameFont = cell.width > 60 ? '1.5rem' : '.9rem'; 
    nameY = cell.y + (cell.height / 1.8);
    bandHeight = cell.width / 4;
    priceFont = cell.width > 80 ? '1.5rem' : '.8rem';
    priceY = cell.y + (cell.height / 1.2)
  }

 return { nameFont, nameY, bandHeight, priceFont, priceY }
}

}