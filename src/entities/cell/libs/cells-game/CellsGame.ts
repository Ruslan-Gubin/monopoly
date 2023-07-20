import { CanvasDraw, COLOR_CELL_VARIANT, COLOR_CELL_PLAYER_COLOR } from "@/shared";
import { CellModel } from "../../model";
import { ActionCell } from "./ActionCell";
import { CornerCell } from "./CornerCell";
import { PortCell } from "./PortCell";
import { PropertyCell } from "./PropertyCell";
import { UtilitiesCell } from "./UtilitiesCell";

interface ICellsGameProps {
  cells: CellModel[]
  drawService: CanvasDraw
  images: { 
    ship: string; 
    dice: string;
    lottery: string;
    tax: string;
    water: string;
    energy: string;
    start: string;
    customs: string;
    theatre: string;
  }
}

export class CellsGame {
  private drawService: CanvasDraw;
  private cells: CellModel[];
  private drawProperty: PropertyCell;
  private drawPort: PortCell;
  private drawAction: ActionCell;
  private drawUtilites: UtilitiesCell;
  private drawCorner: CornerCell;
  starsColor: string;

   constructor({  cells, drawService, images }: ICellsGameProps) {
    this.drawService = drawService
    this.drawProperty = new PropertyCell({ drawService, playerColor: COLOR_CELL_PLAYER_COLOR  })
    this.drawPort = new PortCell({ drawService , playerColor: COLOR_CELL_PLAYER_COLOR, imageSrc: images.ship })
    this.drawAction = new ActionCell({ drawService , images: { dice: images.dice, lottery: images.lottery, tax: images.tax } })
    this.drawUtilites = new UtilitiesCell({ drawService , playerColor: COLOR_CELL_PLAYER_COLOR, images: { water: images.water, energy: images.energy } })
    this.drawCorner = new CornerCell({ drawService , images: { start: images.start, customs: images.customs, theatre: images.theatre } })
    this.cells = cells
    this.starsColor = 'gold'
  }

  private  drawCells() {
    for (let i = 0; i < this.cells.length; i++) {
      const cell = this.cells[i]
      const color = cell.color ? COLOR_CELL_VARIANT[cell.color] : COLOR_CELL_VARIANT.none;
           
      if (cell.direction === 'corner') {
        this.drawCorner.drawCornerCell(cell)
      } else if (cell.type === 'property') {
       this.drawProperty.drawPropertyCell(cell, color, this.starsColor)
      } else if (cell.type === 'port') {
        this.drawPort.drawPortCell(cell)
      } else if (cell.type.includes('action')) {
        this.drawAction.drawActionCell(cell)
      } else if (cell.type.includes('utilities')) {
        this.drawUtilites.drawUtilitesCell(cell)
      } 
    }
    }

    public set changeStarsColor(color: string) {
      this.starsColor = color
    }

    public update() {
      this.drawCells()
    }
}
