import { AppDispatch } from "../../app";
import { AsyncThunkPayloadCreator, createAsyncThunk, AsyncThunkOptions } from "@reduxjs/toolkit";

type AppThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
}

export const createAppThunk = <Returned, ThunkArg = void> (
  type: string,
  payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg, AppThunkConfig>,
  options?: AsyncThunkOptions<ThunkArg, AppThunkConfig>,
) => {
  return createAsyncThunk(type, payloadCreator, options);
}