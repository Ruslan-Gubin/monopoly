import { ISize } from "@/entities";


export function setupCanvas(boardRef: React.RefObject<HTMLCanvasElement>, size: ISize | null): CanvasRenderingContext2D {
  if (!boardRef.current) throw new Error("Error get ref board");
  if (!size) throw new Error("Error get size board");

  boardRef.current.style.position = "absolute";
  boardRef.current.style.top = `${size.y}px`;
  boardRef.current.style.left = `${size.x}px`;
  boardRef.current.width = size.width;
  boardRef.current.height = size.height;

  const context = boardRef.current.getContext("2d");
  if (!context) throw new Error("Cannot get canvas context");

  return context;
}