import React from "react";
import Track from "./Track";
import { useSelector, useDispatch } from "react-redux";
import { selectTracks, showTrackDescription } from "../../features/selection/selectionSlice";

export default function TracksContainer() {
  const selection = useSelector(selectTracks);
  const dispatch = useDispatch();
  const handleEyeClick = () => {
    dispatch(showTrackDescription(!selection.tracksDescriptionVisible));
  }

  return (
    <div>
      <ul>
        {selection.tracks
          ? selection.tracks.map((item) => {
            return (
              <li key={item.id}>
                <Track track={item}></Track>
              </li>
            );
          })
          : null}
      </ul>
      {selection.tracks.length
        ?
        <div className="input-container">
          <div className="eye-container" onClick={handleEyeClick}>
            {selection.tracksDescriptionVisible ? <i className='far fa-eye fa-2x'></i> : <i className='far fa-eye-slash fa-2x'></i>}
          </div>
        </div>
        : null}
    </div>
  );
}
