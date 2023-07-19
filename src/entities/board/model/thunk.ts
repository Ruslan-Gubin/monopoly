import { createAppThunk } from '@/shared';
import { BoardApi } from '../api'
import { BoardModel } from './types';


export const fetchBoard = createAppThunk('board/fetchBoard', async(id: string, { rejectWithValue })  => {
  const response = await BoardApi.getBoard<BoardModel>(id)
  
  if (!response) {
    return rejectWithValue(response)
  }

  return response
})




 



