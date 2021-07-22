import { createSlice } from "@reduxjs/toolkit";

const checkId = (state, action) => {
  const idAlreadyExists =
    state.tracks.findIndex((item) => {
      return item.id === action.payload.id;
    }) > -1;

  return idAlreadyExists;
};

export const selectionSlice = createSlice({
  name: "selection",
  initialState: { tracks: [], tracksDescriptionVisible: false },
  reducers: {
    idIsInList: (state, action) => {
      return checkId(state, action);
    },
    addTrack: (state, action) => {
      const idAlreadyExists = checkId(state, action);

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

export const { addTrack, removeTrack, showTrackDescription, idIsInList } =
  selectionSlice.actions;
export const selectTracks = (state) => state.selection;

export default selectionSlice.reducer;
