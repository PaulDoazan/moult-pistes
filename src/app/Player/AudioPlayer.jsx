import React, { useState, useEffect, useRef } from "react";
import "../../styles.css";
import AudioControls from "./AudioControls";
import TracksContainer from "./TracksContainer";
import Backdrop from "../Backdrop";
import { useSelector, useDispatch } from "react-redux";
import {
  playPause,
  selectPlayPause
} from "../../features/selection/playPauseSlice";

const AudioPlayer = ({ tracks }) => {
  const pp = useSelector(selectPlayPause);

  // Destructure for conciseness
  const track0 = tracks[0];

  return (
    <div className='audio-player'>
      <div className='track-info'>
        <img
          className='artwork'
          src={track0.image}
          alt={`track artwork for ${ track0.title } by ${ track0.artist }`}
        />
        <h2 className='title'>Songs</h2>
        <h3 className='artist'>Artists</h3>
        <AudioControls />
        <TracksContainer />
      </div>
      <Backdrop
        trackIndex='0'
        activeColor={track0.color}
        isPlaying={pp.value}
      />
    </div>
  );
};

export default AudioPlayer;
