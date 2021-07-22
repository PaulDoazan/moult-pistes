import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    selectTracks
} from "../../features/selection/selectionSlice";

import {
    selectMenu, toggle
} from "../../features/selection/menuSlice";

export default function ToggleButton() {
    const selection = useSelector(selectTracks);
    const menu = useSelector(selectMenu);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(toggle(!menu.isDisplayed));
    }

    return (
        <div className={menu.isDisplayed ? 'toggle-button background-green' : 'toggle-button background-blue'} onClick={handleClick}>
            {menu.isDisplayed ? (
                <div>
                    <span className="list-badge">{selection.tracks.length}</span>
                    <div className="icon-toggle-container">
                        <i className="fas fa-list-ul fa-2x"></i>
                    </div>
                </div>) : <i className="fas fa-search fa-2x"></i>}

        </div>
    )
}
