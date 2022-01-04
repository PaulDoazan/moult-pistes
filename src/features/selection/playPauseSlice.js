import { createSlice } from "@reduxjs/toolkit";

export const playPauseSlice = createSlice({
  name: "playPause",
  initialState: { value: false, enabled: true },
  reducers: {
    playPause: (state, action) => {
      state.value = action.payload;
    },
    enablePlay: (state, action) => {
      state.enabled = action.payload;
    }
  }
});

export const { playPause, enablePlay } = playPauseSlice.actions;
export const selectPlayPause = (state) => state.playPause;

export default playPauseSlice.reducer;
