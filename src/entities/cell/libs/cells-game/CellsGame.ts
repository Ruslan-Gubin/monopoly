import { CanvasDraw, COLOR_CELL_VARIANT, COLOR_CELL_PLAYER_COLOR } from "@/shared";
import { CellModel } from "../../model";
import { Property } from "./Property";

interface ICellsGameProps {
  cells: CellModel[]
  drawService: CanvasDraw
}

export class CellsGame {
  private drawService: CanvasDraw;
  private cells: CellModel[];
  private drawProperty: Property;
  starsColor: string;

   constructor({  cells, drawService }: ICellsGameProps) {
    this.drawService = drawService
    this.drawProperty = new Property({ service: this.drawService })
    this.cells = cells
    this.starsColor = 'gold'
  }

  private  drawCells() {
    for (let i = 0; i < this.cells.length; i++) {
      const cell = this.cells[i]
      const color = cell.color ? COLOR_CELL_VARIANT[cell.color] : COLOR_CELL_VARIANT.none;
      
      if (cell.direction === 'corner') {
        this.cornerCell(cell)
      }
      if (cell.type === 'property') {
        this.drawProperty.drawPropertyCell(cell, color, this.starsColor)
      }

      this.drawService.rect({
        size: {height: cell.height, width: cell.width},
        start: {x: cell.x, y: cell.y},
        // fill: { color },
        border: { width: 2,  },
      })
    }
    }

    public set changeStarsColor(color: string) {
      this.starsColor = color
    }

  private  cornerCell(cell: CellModel) {
    this.drawService.rect({
      size: {height: cell.height, width: cell.width},
      start: {x: cell.x, y: cell.y},
      border: { width: 2 },
    })
    const fontSize =  cell.name.length < 8 ? '1.5rem' : '1.2rem';
    this.drawService.text({
      text: cell.name,
      x: cell.x + (cell.width / 2),
      y: cell.y + (cell.height / 2),
      textAling: 'center',
      baseline: 'middle',
      maxWidth: cell.width - 10,
      fontSize,
    })
    }


    public update() {
      this.drawCells()
    }
}
