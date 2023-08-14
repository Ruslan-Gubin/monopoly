import { useAppDispatch, useAppSelector } from "@/shared";
import { connectSlice } from "./slice";
import { fetchConnect } from "./thunk";

const select = (state: RootState) => state.connect;
const action = connectSlice.actions;
export const connectReducer = connectSlice.reducer;

export const useConnect = () => {
  return useAppSelector(select);
};

export const useConnectAction = () => {
  const dispatch = useAppDispatch();

  return {
    fetchConnect: () => dispatch(fetchConnect()),
  };
};


