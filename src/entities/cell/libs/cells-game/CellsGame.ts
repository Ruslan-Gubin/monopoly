import { PropertyModel } from "@/entities/property";
import { COLOR_CELL_VARIANT, COLOR_CELL_PLAYER_COLOR } from "@/shared";
import { CellModel, ICellsGameProps } from "../../model";
import { ActionCell } from "./ActionCell";
import { CornerCell } from "./CornerCell";
import { PortCell } from "./PortCell";
import { PropertyCell } from "./PropertyCell";
import { UtilitiesCell } from "./UtilitiesCell";

export class CellsGame {
  private starsColor: string = 'gold';
  private cells: CellModel[];
  private drawProperty: PropertyCell;
  private drawPort: PortCell;
  private drawAction: ActionCell;
  private drawUtilites: UtilitiesCell;
  private drawCorner: CornerCell;
  
   constructor({  cells, drawService, images, propertyes }: ICellsGameProps) { 
    this.drawProperty = new PropertyCell({ drawService, playerColor: COLOR_CELL_PLAYER_COLOR  })
    this.drawPort = new PortCell({ drawService , playerColor: COLOR_CELL_PLAYER_COLOR, imageSrc: images.ship })
    this.drawAction = new ActionCell({ drawService , images: { dice: images.dice, lottery: images.lottery, tax: images.tax } })
    this.drawUtilites = new UtilitiesCell({ drawService , playerColor: COLOR_CELL_PLAYER_COLOR, images: { water: images.water, energy: images.energy } })
    this.drawCorner = new CornerCell({ drawService , images: { start: images.start, customs: images.customs, theatre: images.theatre } })
    this.cells = this.cellsUpdateProperty(cells, propertyes)
  }

  private cellsUpdateProperty(cells: CellModel[], propertyes: PropertyModel[]) {
    return cells.map(cell => {
      const owner = propertyes.find(property => property.cell_id === cell._id)
      
      if (owner && cell.rent) {
        const price = owner.is_mortgage ? 0 : cell.rent[owner.current_rent]
        const house_count = owner.house_count ? owner.house_count : 0

        return { ...cell, ownerColor: owner.player_color, price, is_mortgage: owner.is_mortgage, house_count }
      } else {
        return cell
      }
    })
  }

  private  drawCells() {
    for (const cell of this.cells) {
      const { color, direction, type } = cell;
      
      if (direction === 'corner') {
        this.drawCorner.drawCornerCell(cell)
      } else if (type === 'property') {
        const cellColor = color ? COLOR_CELL_VARIANT[color] : COLOR_CELL_VARIANT.none;
       this.drawProperty.drawPropertyCell(cell, cellColor, this.starsColor)
      } else if (type === 'port') {
        this.drawPort.drawPortCell(cell)
      } else if (type.includes('action')) {
        this.drawAction.drawActionCell(cell)
      } else if (type.includes('utilities')) {
        this.drawUtilites.drawUtilitesCell(cell)
      } 
    }
    }

    public update() {
      this.drawCells()
    }
}
