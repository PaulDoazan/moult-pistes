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

  if (menu.isDisplayed) {
    return (
      <>
      <div className='menu-container'>
        <div className="top-menu-container ">
          <div className="searchbar-container">
            <div className='searchbar'>
              <input
                className='search-input'
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
              <i onClick={handleEnvelope} className='fas fa-envelope fa-lg'></i>
              {mailVisible && <a className="mailto" href="mailto:gianni.vattimi@gmail.com">gianni.vattimi@gmail.com</a>}
            </div>}
      </div>
      </>
    );
  } else {
    return null;
  }
}
