import { createSlice } from "@reduxjs/toolkit";

export const playPauseSlice = createSlice({
  name: "playPause",
  initialState: { value: false },
  reducers: {
    playPause: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { playPause } = playPauseSlice.actions;
export const selectPlayPause = (state) => state.playPause;

export default playPauseSlice.reducer;
