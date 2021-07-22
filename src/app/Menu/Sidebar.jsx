import { useState, useEffect } from "react";
import TrackBlock from "./TrackBlock";
import { useSelector } from "react-redux";
import {
  selectMenu
} from "../../features/selection/menuSlice";

export default function Sidebar() {
  const menu = useSelector(selectMenu);
  const [datas, setDatas] = useState([]);
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

        {datas ? (
          <ul>
            {datas.map((data) => (
              <li key={data.id}>
                <TrackBlock data={data} />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  } else {
    return null;
  }
}
