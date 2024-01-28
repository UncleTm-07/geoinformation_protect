import React, {useEffect, useState} from 'react';
import "./index.css"

const ServerWidget = ({widget, setWidget}) => {

    return (
        <div className={widget === "server" ? "server_widget" : "close"}>
            <div className={"server_widget_container"}>
                <span>Api Server</span>
                <input type="text"/>
            </div>
        </div>
    );
};

export default ServerWidget;