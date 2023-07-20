import { CanvasDraw, RectTypeSize } from "@/shared";

interface BoardGameProps {
  cellsSize: { corner: number; small: number };
  boardSize: RectTypeSize;
  drawService: CanvasDraw;
  centerSrc: string;
};

export class BoardGame {
  private readonly boardColor = "#fdf4b99e";
  private boardSize: RectTypeSize;
  private smallCell: number;
  private cornerCell: number;
  private drawService: CanvasDraw;
  private centerImage: HTMLImageElement;

  constructor({ cellsSize, boardSize, drawService, centerSrc }: BoardGameProps) {
    this.boardSize = boardSize;
    this.smallCell = cellsSize.small;
    this.cornerCell = cellsSize.corner;
    this.drawService = drawService;
    this.centerImage = new Image();
    this.centerImage.src = centerSrc
  }

  private drawCenterBoard() {
    const x = this.boardSize.x + this.cornerCell;
    const y = this.boardSize.y + this.cornerCell;
    const width = this.smallCell * 9;
    const height = width;

    this.drawService.image({
      image: this.centerImage,
      imageOptions: { x, y, width: this.smallCell * 9, height: width }
    })
  
    this.drawService.rect({
      size: {height, width},
      start: {x, y},
      border: { width: 2 },
    })
  }

  private drawBoard() {
    this.drawService.rect({
      start: { x: this.boardSize.x, y: this.boardSize.y },
      size: {width: this.boardSize.width, height: this.boardSize.height},
      border: { width: 3, },
      fill: { color: this.boardColor }
    })
  }

  public animate(sizeX: number) {
    this.drawService.arc({
      size: {x: sizeX, y: 300, radius: 10},
      border: {color: 'red'},
      fill: {color: 'orange'}
    })
  }

  public update(sizeX: number) {
    this.drawBoard();
    this.drawCenterBoard();
    this.animate(sizeX);
  }
}
