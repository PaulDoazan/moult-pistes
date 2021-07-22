import React from "react";
import AudioPlayer from "./app/Player/AudioPlayer";
import tracks from "./tracks";
import Sidebar from "./app/Menu/Sidebar";
import ToggleButton from "./app/Menu/ToggleButton";
import store from "./app/store";
import { Provider } from "react-redux";


export default function App() {
  return (
    <div className='app-container'>
      <Provider store={store}>
        <ToggleButton />
        <Sidebar />
        <AudioPlayer tracks={tracks} />
      </Provider>
    </div>
  );
}
