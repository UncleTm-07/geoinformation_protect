import React, {useEffect, useState} from 'react';
import "./index.css"
import ServerCard from "../ServerCard";

const ServerWidget = ({widget, setWidget, servers, getCoordinateForFlyTo, editServer, getMines}) => {

    const [_servers, setServer] = useState()



    useEffect(() => {
        if (Array.isArray(servers) && servers.length > 0) setServer(servers)
    }, [servers])

    const getCoordinate = (longitude, latitude) => {
        getCoordinateForFlyTo( {
            longitude: longitude,
            latitude: latitude
        })
    }



    return (
        <div className={widget === "server" ? "server_widget" : "close"}>
            <div className={"server_widget_list"}>
                <h4>Список ділянок:</h4>
                <div className={"widget_list_container"}>
                    {
                        _servers?.map((value, index) => (
                            <ServerCard key={`Server-ID-${value.id}`} value={value} index={index} getCoordinate={getCoordinate} getMines={getMines} editServer={editServer}/>
                        ))
                    }
                </div>
            </div>
            {/*<div className={showAdd? "server_widget_container" : "close"}>*/}
            {/*    <span>Api Server</span>*/}
            {/*    <input type="text" name={"serverApi"} onChange={(e) => {*/}
            {/*        setApi(e.target.value)*/}
            {/*        if (isError) setIsError(!isError)*/}
            {/*    }}/>*/}
            {/*    <span className={isError? "error" : "close"}>Ви не вказали сервер</span>*/}
            {/*    <div style={{display:"flex", gap:"10px"}}>*/}
            {/*        <button style={{padding: "2px 7px 2px 7px", cursor: "pointer"}} className={"widget_button"} onClick={() => addServer()}>add</button>*/}
            {/*        <button style={{padding: "2px 7px 2px 7px", cursor: "pointer"}} className={"widget_button"} onClick={() => {*/}
            {/*            setShowAdd(false)*/}
            {/*            setIsError(false)*/}
            {/*        }}>close</button>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<button className={!showAdd ? "server_widget_button" : "close"} onClick={() => setShowAdd(true)}>+</button>*/}
        </div>
    );
};

export default ServerWidget;