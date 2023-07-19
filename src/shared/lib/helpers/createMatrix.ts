type CreateMatrixProps = {
  rowCount: number;
  columnCount: number;
};

export const createMatrix = ({ rowCount, columnCount }: CreateMatrixProps) => {
  const result: number[][] = [];
  for (let i = 0; i < rowCount; i++) {
    result.push(new Array(columnCount).fill(0));
  }
  return result as number[][];
};
