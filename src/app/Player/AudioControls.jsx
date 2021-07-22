import React from "react";
import { ReactComponent as Play } from "../assets/play.svg";
import { ReactComponent as Pause } from "../assets/pause.svg";
import { useSelector, useDispatch } from "react-redux";
import { playPause, selectPlayPause } from "../../features/selection/playPauseSlice";
import {
  selectTracks
} from "../../features/selection/selectionSlice";

const AudioControls = () => {
  const selection = useSelector(selectTracks);
  const pp = useSelector(selectPlayPause);
  const dispatch = useDispatch();

  return (
    <div className={selection.tracks.length ? 'audio-controls' : 'audio-controls btn-disabled'}>
      {pp.value ? (
        <button
          type='button'
          className='pause'
          onClick={() => dispatch(playPause(false))}
          aria-label='Pause'>
          <Pause />
        </button>
      ) : (
        <button
          type='button'
          className='play'
          onClick={() => dispatch(playPause(true))}
          aria-label='Play'>
          <Play />
        </button>
      )}
    </div>)
};

export default AudioControls;
