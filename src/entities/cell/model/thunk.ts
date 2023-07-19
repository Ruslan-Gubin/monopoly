import { createAppThunk } from '@/shared';
import { CellApi } from '../api'
import { CellModel } from './types';


export const fetchAllCells = createAppThunk('cells/fetchAllCells', async(nameBoard: string, { rejectWithValue })  => {
  const cells = await CellApi.getCells<CellModel[]>(nameBoard)

  if (!cells) {
    return rejectWithValue(cells)
  }

  return { cells }
})




 



