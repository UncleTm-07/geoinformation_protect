import React from 'react';
import "./index.css"
import {MdOutlineLandscape} from "react-icons/md";
import {IoIosWarning} from "react-icons/io";

const MenuBlock = ({widget, setWidget}) => {
    return (
        <div className="nav-bar">
            <ul>
                <li className="nav-icon" onClick={() => widget === "server" ? setWidget("") : setWidget("server")}>
                    <MdOutlineLandscape/>
                </li>
                <li className="nav-icon" onClick={() => widget === "target" ? setWidget("") : setWidget("target")}>
                    <IoIosWarning />
                </li>
            </ul>
        </div>

    );
};

export default MenuBlock;