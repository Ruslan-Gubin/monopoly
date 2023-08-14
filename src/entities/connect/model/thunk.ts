import { createAppThunk } from '@/shared';
import { connect } from '../api'


export const fetchConnect = createAppThunk('viewer/fetchConnect', async(_: void, { rejectWithValue })  => {
  const response = await connect<{success: boolean} | any>()

  if (response.text) {
    return rejectWithValue(response.text)
  }

  return response
})



