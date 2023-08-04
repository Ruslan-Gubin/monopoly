import { useAppDispatch, useAppSelector } from "@/shared";
import { propertySlice } from "./slice";

const select = (state: RootState) => state.property;
export const actionProperty = propertySlice.actions;
export const propertyReducer = propertySlice.reducer;

export const useProperty = () => {
  return useAppSelector(select);
};

// export const useDiceAction = () => {
//   const dispatch = useAppDispatch();

//   return {
    
//   };
// };

