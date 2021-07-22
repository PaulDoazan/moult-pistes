import { createSlice } from "@reduxjs/toolkit";

export const progressSlice = createSlice({
  name: "progress",
  initialState: { visual: 0, audio: 0 },
  reducers: {
    updateVisualProgress: (state, action) => {
      state.visual = action.payload;
    },
    updateAudioProgress: (state, action) => {
      state.audio = action.payload;
    }
  }
});

export const { updateVisualProgress, updateAudioProgress } =
  progressSlice.actions;
export const selectProgress = (state) => state.progress;

export default progressSlice.reducer;
