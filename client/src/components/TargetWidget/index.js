import React, {useEffect, useState} from 'react';
import "./index.css"
import ServerCard from "../ServerCard";
import TargetCard from "../TargetCard";

const TargetWidget = ({widget, setWidget, target}) => {

    const [_servers, setServer] = useState()



    useEffect(() => {
        if (Array.isArray(target) && target.length > 0) setServer(target)
    }, [target])




    return (
        <div className={widget === "target" ? "server_widget" : "close"}>
            <div className={"server_widget_list"}>
                <h4>Список цілей для знищення:</h4>
                <div className={"widget_list_container"}>
                    {
                        _servers?.map((value, index) => (
                            <TargetCard key={`Target-ID-${value.id}`} value={value}/>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default TargetWidget;