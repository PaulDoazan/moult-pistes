import React, { useState, useEffect } from "react";

export default function Track_level_control(props) {
  const { audio } = props;
  const [volume, setVolume] = useState(20);

  const volumeOn = `white`;
  const volumeOff = `#777`;

  const handleChange = (event) => {
    let value = event.target.value;
    setVolume(value);
  };

  useEffect(() => {
    if (audio) {
      audio.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (audio) {
      audio.volume = volume / 100;
    }
  }, [audio]);

  return (
    <div className='control-box'>
      <div className='volume-control'>
        <div
          className='speaker'
          style={{ color: volume > 0 ? volumeOn : volumeOff }}
          onClick={() => {
            volume ? setVolume(0) : setVolume(100);
          }}>
          <i className='fas fa-volume-off fa-lg'></i>
        </div>
        <div className='bars'>
          <span
            className='bar'
            style={{ background: volume > 0 ? volumeOn : volumeOff }}></span>
          <span
            className='bar'
            style={{ background: volume > 20 ? volumeOn : volumeOff }}></span>
          <span
            className='bar'
            style={{ background: volume > 40 ? volumeOn : volumeOff }}></span>
          <span
            className='bar'
            style={{ background: volume > 60 ? volumeOn : volumeOff }}></span>
          <span
            className='bar'
            style={{ background: volume > 80 ? volumeOn : volumeOff }}></span>
          <input
            type='range'
            className='level-input'
            min='0'
            max='100'
            step='20'
            onChange={handleChange}
            onMouseDown={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
