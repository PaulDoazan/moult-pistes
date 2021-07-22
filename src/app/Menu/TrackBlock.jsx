import React from "react";
import { useDispatch } from "react-redux";
import { addTrack } from "../../features/selection/selectionSlice";
import { playPause } from "../../features/selection/playPauseSlice";

export default function TrackBlock(props) {
  const dispatch = useDispatch();
  return (
    <div className='trackBlock'>
      <div className='infos'>
        <img src={props.data.album.cover_small} alt='' />
        <div className='infos-text'>
          <div className='info-title'>{props.data.title_short}</div>
          <div className='info-artist-name'>{props.data.artist.name}</div>
        </div>
      </div>
      <div className='trackBlock-buttons'>
        <div
          className='trash'
          onClick={() => {
            dispatch(addTrack(props.data));
            dispatch(playPause(false));
          }}>
          <i className='fas fa-plus-circle fa-lg'></i>
        </div>
      </div>
    </div>
  );
}
