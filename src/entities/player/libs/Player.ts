type CircleType = { x: number; y: number; radius: number; color: string };

export class Player {
  constructor() {}

  drawCircle(circle: CircleType, ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.ellipse(
      circle.x,
      circle.y,
      circle.radius,
      circle.radius,
      Math.PI / 4,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = circle.color;
    ctx.fill();
  }
}