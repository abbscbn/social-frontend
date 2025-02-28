import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../Types/Types";

export interface AppSliceType {
  currentUser: UserType | null;
}

const initialState: AppSliceType = {
  currentUser: null,
};

export const AppSliceType = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentUser: (
      state: AppSliceType,
      action: PayloadAction<UserType | null>
    ) => {
      state.currentUser = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setCurrentUser} = AppSliceType.actions;
export default AppSliceType.reducer;
