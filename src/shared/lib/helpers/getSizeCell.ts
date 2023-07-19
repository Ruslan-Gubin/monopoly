export const getSizeCells = (width: number) => {
  const smallCell = width / 12;
  const cornerCell = smallCell * 1.5
  
  return {
    smallCell,
    cornerCell,
  };
};
