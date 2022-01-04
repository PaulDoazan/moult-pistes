import React, { useState, useEffect, useRef } from "react";
import Track from "./Track";
import { useSelector, useDispatch } from "react-redux";
import {
  enablePlay
} from "../../features/selection/playPauseSlice";
import { selectTracks, showTrackDescription } from "../../features/selection/selectionSlice";

export default function TracksContainer() {
  const [preloadedTracks, setPreloadedTracks] = useState([]);
  const ref = useRef(null);
  const selection = useSelector(selectTracks);
  const dispatch = useDispatch();
  const handleEyeClick = () => {
    dispatch(showTrackDescription(!selection.tracksDescriptionVisible));
  }

  const handleLoad = (id) => {
    let foundIndex = ref.current.findIndex(t => t.id === id);
    ref.current[foundIndex] = { id: id, loaded: true };

    let notLoadComplete = ref.current.find(elem => elem.loaded === false);
    dispatch(enablePlay(!notLoadComplete));
  }

  useEffect(() => {
    selection.tracks.map((track) => {
      const value = preloadedTracks.find(elem => elem.id === track.id);
      if (!value) {
        let preloaded = { id: track.id, loaded: false };
        let newPreloadedArray = [...preloadedTracks, preloaded];
        setPreloadedTracks(newPreloadedArray);
      }
    })

    if (preloadedTracks.length > selection.tracks.length) {
      let result = preloadedTracks.filter(x => {
        return selection.tracks.find(t => t.id === x.id)
      })
      setPreloadedTracks(result);
    }
  }, [selection.tracks])

  useEffect(() => {
    ref.current = preloadedTracks;
    let notLoadComplete = ref.current.find(elem => elem.loaded === false);
    dispatch(enablePlay(!notLoadComplete));
  }, [preloadedTracks])

  return (
    <div>
      <ul>
        {selection.tracks
          ? selection.tracks.map((item) => {
            return (
              <li key={item.id}>
                <Track track={item} handleLoad={(e) => { handleLoad(e) }}></Track>
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
