import { PlayerConfirmation } from '@/features';
import { createAppThunk } from '@/shared';
import { BoardApi } from '../api'

export const createBoard = createAppThunk('board/createBoard', async(body: PlayerConfirmation[], { rejectWithValue })  => {
  const response = await BoardApi.createBoard<string>(body)

  if (!response) {
    return rejectWithValue(response)
  }

  return response
})




 



