import React, {useState} from 'react';
import "./index.css"
import {FaPlaneDeparture, FaRegTrashAlt} from "react-icons/fa";
import {RiEditLine} from "react-icons/ri";

const ServerCard = ({value, getCoordinate}) => {

    const [edit, setEdit] = useState(false)


    return (
        <div className={"serverCard"}>
            {
                edit ?
                    <div className={"serverCard_container"}>

                    </div>
                    :
                    <div className={"serverCard_container"}>
                        <h4 style={{textDecoration: "underline"}}>Контрольний пункт №{value?.id}</h4>
                        <span>Name: {value?.name}</span>
                        <span>
                    Status:
                        <span style={value?.status === "active" ?
                            {
                                color: "green",
                                backgroundColor: "green",
                                borderRadius: "20px",
                                padding: "0 7px 0 7px",
                                marginLeft: "10px"
                            }
                            :
                            {color: "red", backgroundColor: "red", borderRadius: "20px", padding: "0 7px 0 7px"}}>
                             0
                        </span>
                </span>
                        <span>Longitude: {value?.longitude}</span>
                        <span>Latitude: {value?.latitude}</span>
                    </div>

            }
            {
                edit ?
                    <div className={"serverCard_buttons"}>
                        <button onClick={() => getCoordinate(value.longitude, value.latitude)}
                                style={{cursor: "pointer", fontSize: "20px", padding: "0 10px 0 10px"}}>
                            <FaPlaneDeparture/>
                        </button>
                        <button onClick={() => setEdit(false)}
                                style={{cursor: "pointer", fontSize: "20px", padding: "0 10px 0 10px"}}>
                            <RiEditLine/>
                        </button>
                    </div>
                    :
                    <div className={"serverCard_buttons"}>
                        <button onClick={() => getCoordinate(value.longitude, value.latitude)}
                                style={{cursor: "pointer", fontSize: "20px", padding: "0 10px 0 10px"}}>
                            <FaPlaneDeparture/>
                        </button>
                        <button
                            style={{cursor: "pointer", fontSize: "20px", padding: "0 10px 0 10px"}}>
                            <FaRegTrashAlt/>
                        </button>
                        <button onClick={() => setEdit(true)}
                            style={{cursor: "pointer", fontSize: "20px", padding: "0 10px 0 10px"}}>
                            <RiEditLine/>
                        </button>
                    </div>

            }

        </div>
    );
};

export default ServerCard;