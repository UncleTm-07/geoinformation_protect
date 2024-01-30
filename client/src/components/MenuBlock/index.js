import React from 'react';
import "./index.css"
import {MdOutlineLandscape} from "react-icons/md";

const MenuBlock = ({widget, setWidget}) => {
    return (
        <div className="nav-bar">
            <ul>
                <li className="nav-icon" onClick={() => widget === "server" ? setWidget("") : setWidget("server")}>
                    <MdOutlineLandscape />
                </li>
            </ul>
        </div>

    );
};

export default MenuBlock;