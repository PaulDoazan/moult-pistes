import { createSlice } from "@reduxjs/toolkit";

export const selectionSlice = createSlice({
  name: "selection",
  initialState: { tracks: [], tracksDescriptionVisible: false },
  reducers: {
    addTrack: (state, action) => {
      const idAlreadyExists =
        state.tracks.findIndex((item) => {
          return item.id === action.payload.id;
        }) > -1;

      if (!idAlreadyExists) state.tracks.push(action.payload);
    },
    removeTrack: (state, action) => {
      const index = state.tracks.findIndex((item) => {
        return item.id === action.payload.id;
      });
      if (index > -1) {
        state.tracks.splice(index, 1);
      }
    },
    showTrackDescription: (state, action) => {
      state.tracksDescriptionVisible = action.payload;
    }
  }
});

export const { addTrack, removeTrack, showTrackDescription } = selectionSlice.actions;
export const selectTracks = (state) => state.selection;

export default selectionSlice.reducer;
