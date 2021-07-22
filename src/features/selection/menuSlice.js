import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
  name: "menu",
  initialState: { isDisplayed: false },
  reducers: {
    toggle: (state, action) => {
      state.isDisplayed = action.payload;
    }
  }
});

export const { toggle } = menuSlice.actions;
export const selectMenu = (state) => state.menu;

export default menuSlice.reducer;
