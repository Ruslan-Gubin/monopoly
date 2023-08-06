export class Sprite {
  public framesCurrent: number;
  public framesHold: number;
  public framesElapsed: number;
  public framesMax: number = 3;
  constructor(frameHold: number) {
    this.framesCurrent = 0;
    this.framesHold = frameHold;
    this.framesElapsed = 0;
  }

  public animateFrames() {
    this.framesElapsed++;

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++;
      } else {
        this.framesCurrent = 0;
      }
    }
  }
}
