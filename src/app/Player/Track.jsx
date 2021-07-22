import React, { useEffect, useState, useRef } from "react";
import Track_level_control from "./Track_level_control";
import { useSelector, useDispatch } from "react-redux";
import {
  removeTrack,
  selectTracks
} from "../../features/selection/selectionSlice";
import {
  playPause,
  selectPlayPause
} from "../../features/selection/playPauseSlice";
import {
  updateVisualProgress,
  updateAudioProgress,
  selectProgress
} from "../../features/selection/progressSlice";

export default function Track(props) {
  const dispatch = useDispatch();
  const progress = useSelector(selectProgress);
  const pp = useSelector(selectPlayPause);
  const selection = useSelector(selectTracks);

  const track = props.track;

  // Refs
  const duration = 31;
  const [audio, setAudio] = useState(null);
  const [displayDescription, setDisplayDuration] = useState(`none`);
  const [displayWidth, setDisplayWidth] = useState(`0%`);
  const [displayOpacity, setDisplayOpacity] = useState(`0`);

  const currentPercentage = duration
    ? `${ (progress.visual / duration) * 100 }%`
    : "0%";
  const trackStyling = `
  -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${ currentPercentage }, #fff), color-stop(${ currentPercentage }, #777))
`;

  const intervalRef = useRef();

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audio.ended) {
        dispatch(playPause(false));
        audio.currentTime = 0;
      }
      dispatch(updateVisualProgress(audio.currentTime));
    }, [1000]);
  };

  const handleDown = (event) => {
    dispatch(updateVisualProgress(event.target.value));
    dispatch(playPause(false));
  };

  const handleChange = (event) => {
    dispatch(updateVisualProgress(event.target.value));
  };

  const handleUp = (event) => {
    dispatch(updateVisualProgress(event.target.value));
    dispatch(updateAudioProgress(event.target.value));
  };

  const handleDelete = () => {
    dispatch(playPause(false));
    dispatch(removeTrack(track));
    clearInterval(intervalRef.current);
    audio.src = null;
  };

  useEffect(() => {
    setAudio(new Audio(track.preview));
  }, []);

  useEffect(() => {
    setDisplayDuration(duration ? `inline-block` : `none`);
    setDisplayOpacity(1);
    setDisplayWidth("95%");
  }, [duration]);

  useEffect(() => {
    if (audio) {
      pp.value ? audio.play() : audio.pause();

      if (track === selection.tracks[0]) {
        pp.value ? startTimer() : clearInterval(intervalRef.current);
      }
    }
  }, [pp]);

  useEffect(() => {
    if (audio) {
      audio.currentTime = progress.visual;
    }
  }, [progress.audio]);

  return (
    <div className='input-container' style={{ opacity: displayOpacity }}>
      {selection.tracksDescriptionVisible ?
        <div className="track-description">
          <span><strong>{track.title_short}</strong> / </span>
          <span className="description-artist-name">{track.artist.name}</span>
        </div>
        : null}

      <input
        type='range'
        value={progress.visual}
        step='1'
        min='0'
        max={duration ? duration : `${ duration }`}
        className='input-progress'
        onChange={handleChange}
        onMouseDown={handleDown}
        onMouseUp={handleUp}
        style={{
          background: trackStyling,
          display: displayDescription,
          width: displayWidth
        }}
      />
      <Track_level_control audio={audio} />
      <div
        className='trash'
        onClick={() => {
          handleDelete();
        }}>
        <i className='fas fa-minus-circle fa-lg'></i>
      </div>
    </div>
  );
}
