import { CanvasDraw, Sprite } from "@/shared";
import { IFrames, IPlayerProps, IStartMovePlayerPosition, PlayerCanvasType } from "../../model";
import { playerFrames } from "../utils/playersFrame";

export class PlayersGame extends Sprite {
  public drawService: CanvasDraw;
  private players: PlayerCanvasType[];
  private playerActive: PlayerCanvasType | null;
  private image: HTMLImageElement;
  private activeDirection: string;
  private framesVariant: IFrames[];

  constructor({  drawService, players, imageSrc, frameHold }: IPlayerProps) {
    super(frameHold)
    this.drawService = drawService;
    this.players = players;
    this.playerActive = null;
    this.activeDirection = '';
    this.image = new Image()
    this.image.src = imageSrc
    this.framesVariant = []
  }

 private drawPlayers() {
    for (const player of this.players) {
      const playerHeight = this.calculatePlayerHeight(player.width); 
      let sourceImage = this.getSourceImage(player);  

     this.drawService.image({
       image: this.image,
       imageOptions: { x: player.x - (player.width / 2), y: player.y - (playerHeight / 2), width: player.width, height: playerHeight },
       sourceOptions: sourceImage
      })
    }
  }

  private calculatePlayerHeight(width: number): number {
    return width * 1.4;
  }

  private getSourceImage(player: PlayerCanvasType) {
    if (this.playerActive?.color === player.color) {
      const activeFrame = this.getFramesVariant();
      if (activeFrame) {
        return activeFrame;
      }
    }
  
    return playerFrames[player.color].down[1];
  }

  private getFramesVariant(): IFrames {
    return this.framesVariant[this.framesCurrent];
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

 public getPosition(color: string, startMovePosition: IStartMovePlayerPosition): { playerX: number, playerY: number } | undefined  {
    if (!this.playerActive) {
      const player = this.players.find(player => player.color === color)
      if (!player) return;
      this.setStartMovePosition(player, startMovePosition)
    this.playerActive = player
  }
  
    if (this.playerActive) {
      return {  playerX: this.playerActive.x,  playerY: this.playerActive.y }
    }
  }

  private setStartMovePosition(player: PlayerCanvasType, startMovePosition: IStartMovePlayerPosition) {
    player.x = startMovePosition.startMoveX
    player.y = startMovePosition.startMoveY
  }

  update() {
    this.drawPlayers()
    if (this.playerActive) {
      this.animateFrames()
    }
  }
}