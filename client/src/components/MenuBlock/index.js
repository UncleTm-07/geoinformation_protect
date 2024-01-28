import React from 'react';
import {FaServer} from "react-icons/fa";
import "./index.css"

const MenuBlock = ({widget, setWidget}) => {
    return (
        <div className="nav-bar">
            <ul>
                <li className="nav-icon" onClick={() => widget === "server" ? setWidget("") : setWidget("server")}>
                    <FaServer/>
                </li>
            </ul>
        </div>

    );
};

export default MenuBlock;