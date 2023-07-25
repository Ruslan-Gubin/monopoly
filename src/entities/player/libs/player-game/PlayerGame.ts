import { CanvasDraw, Sprite } from "@/shared";
import { IFrames, PlayerCanvasType } from "../../model";
import { playerFrames } from "../utils/playersFrame";

export interface BasePlayerProps {
  drawService: CanvasDraw;
  players: PlayerCanvasType[];
  imageSrc: string;
  frameHold: number;
}

export interface IMoveParams {
  isCenterCell: boolean,
  isStart: boolean,
  endPosition: { x: number, y: number }
}

export class PlayersGame extends Sprite {
  public drawService: CanvasDraw;
  private players: PlayerCanvasType[];
  private playerActive: PlayerCanvasType | null;
  private image: HTMLImageElement;
  private activeDirection: string;
  private framesVariant: IFrames[];

  constructor({  drawService, players, imageSrc, frameHold }: BasePlayerProps) {
    super(frameHold)
    this.drawService = drawService;
    this.players = players;
    this.playerActive = null;
    this.activeDirection = '';
    this.image = new Image()
    this.image.src = imageSrc
    this.framesVariant = []
  }

 private drawPlayer() {
    for (let i = 0; i < this.players.length; i++) {
      const player = this.players[i]
      const playerHeight = player.width * 1.4 
      let sourceImage = playerFrames[player.color].down[1] 
      
      if (this.playerActive?.color === player.color) {
        const activeFrame = this.getFramesVariant()
        if (activeFrame) {
          sourceImage = activeFrame
        }
     }

     this.drawService.image({
       image: this.image,
       imageOptions: { x: player.x - (player.width / 2), y: player.y - (playerHeight / 2), width: player.width, height: playerHeight },
       sourceOptions: sourceImage
      })
    }
  }

  set playerMove(position: { x: number, y: number }) {
    if (!this.playerActive) return;
    this.playerActive.x = position.x
    this.playerActive.y = position.y
  }

  set setActiveDirection(direction: string) {
    this.activeDirection = direction
    if (!this.playerActive) return;
    this.framesVariant = playerFrames[this.playerActive.color][direction]
  }

  get getActiveDirection() {
   return this.activeDirection
  }

   getPosition(color: string): { playerX: number, playerY: number } | undefined  {
    if (!this.playerActive) {
    const player = this.players.find(player => player.color === color)
    if (!player) return;
    this.playerActive = player
  }
  
    if (this.playerActive) {
      return {  playerX: this.playerActive.x,  playerY: this.playerActive.y, }
    }
  }

  private getFramesVariant() {
      return this.framesVariant[this.framesCurrent]
  }

  update() {
    this.drawPlayer()
    if (this.playerActive) {
      this.animateFrames()
    }
  }
}