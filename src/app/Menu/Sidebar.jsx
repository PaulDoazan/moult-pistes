import { useState, useEffect } from "react";
import TrackBlock from "./TrackBlock";
import { useSelector } from "react-redux";
import {
  selectMenu
} from "../../features/selection/menuSlice";

export default function Sidebar() {
  const menu = useSelector(selectMenu);
  const [datas, setDatas] = useState([]);
  const [mailVisible, setMailVisible] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);

  const handleHelp = () => {
    setVideoVisible(!videoVisible);
  }

  const handleEnvelope = () => {
    setMailVisible(!mailVisible);
  }

  const fetchData = (e) => {
    e.preventDefault();

    let DZ = window.dzAsyncInit();
    DZ.api("/search?q=" + e.target.value, function (response) {
      setDatas(response.data);
    });
  };

  useEffect(() => {
    if (!menu.isDisplayed) {
      setDatas([]);
    }
  }, [menu.isDisplayed]);

  useEffect(() => {
    setVideoVisible(false);
    setMailVisible(false);
  }, [datas]);

  if (menu.isDisplayed) {
    return (
      <>
        <div className='menu-container'>
          <div className="top-menu-container ">
            <div className="searchbar-container">
              <div className='searchbar'>
                <input
                  className='search-input'
                  autocomplete="off"
                  type='search'
                  id='name'
                  name='name'
                  placeholder='search...'
                  style={{ color: "#000" }}
                  onChange={(e) => {
                    fetchData(e);
                  }}
                />
              </div>
            </div>
          </div>

          {datas && datas.length > 0 ? (
            <ul>
              {datas.map((data) => (
                <li key={data.id}>
                  <TrackBlock data={data} />
                </li>
              ))}
            </ul>
          ) : <div className="footer">
            {videoVisible && <div className="container-embed">
              <iframe width="560" height="315" src="https://www.youtube.com/embed/ZkNVgonZ-6s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              <div className="video-loading">loading ...</div>
            </div>}
            <div className="mail-info">
              <i onClick={handleHelp} className={videoVisible ? 'far fa-question-circle fa-lg icon-footer' : 'fas fa-question-circle fa-lg icon-footer'}></i>
              <i onClick={handleEnvelope} className='fas fa-envelope fa-lg icon-footer'></i>
              {mailVisible && <a className="mailto" href="mailto:gianni.vattimi@gmail.com">gianni.vattimi@gmail.com</a>}
            </div>
          </div>
          }
        </div>
      </>
    );
  } else {
    return null;
  }
}
