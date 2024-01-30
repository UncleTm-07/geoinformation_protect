import React, {useState} from 'react';
import "./index.css"
import {FaPlaneDeparture, FaRegTrashAlt} from "react-icons/fa";
import {RiEditLine} from "react-icons/ri";
import {IoSaveOutline} from "react-icons/io5";
import {CiCircleRemove} from "react-icons/ci";
import {FiPower} from "react-icons/fi";
import EditInput from "../EditInput";
import {GrStatusGood, GrStatusWarning} from "react-icons/gr";

const ServerCard = ({value, getCoordinate, getMines, editServer}) => {

    const [edit, setEdit] = useState(false)

    const [server, setServer] = useState(value)
    const [rerender, setRerender] = useState(false)

    const forceRerender = () => setRerender(!rerender)

    function editServerName(_name) {
        setServer({...server, name: _name});
        forceRerender()
    }

    function editServerStatus(_status) {
        setServer({...server, status: _status});
        forceRerender()
    }


    return (
        <div className={"serverCard"}>
            {
                edit ?
                    <div className={"serverCard_container"}>
                        <EditInput title={"Name"} name={server.name} typeOfInput={"text"} editServerName={editServerName}/>
                    </div>
                    :
                    <div className={"serverCard_container"}>
                        <h4 style={{textDecoration: "underline"}}>Ділянка №{value?.id}</h4>
                        <span>Назва: {value?.name}</span>
                        <span>Довгота: {value?.longitude}</span>
                        <span>Широта: {value?.latitude}</span>
                    </div>

            }
            {
                edit ?
                    <div className={"serverCard_buttons"}>
                        <button onClick={() => {
                            editServer(server)
                            setTimeout(() => {
                                setEdit(false)
                            }, 300)
                        }}
                                style={{cursor: "pointer", fontSize: "20px", padding: "0 10px 0 10px"}}>
                            <IoSaveOutline />
                        </button>
                        <button onClick={() => setEdit(false)}
                                style={{cursor: "pointer", fontSize: "20px", padding: "0 10px 0 10px"}}>
                            <CiCircleRemove />
                        </button>
                    </div>
                    :
                    <div className={"serverCard_buttons"}>
                        <button onClick={() => {
                            editServerStatus(!value.status)
                            editServer(server)
                        }}
                                className={value.status ?   "powerButtonOn" : "powerButtonOff"}
                                style={{cursor: "pointer", fontSize: "20px", padding: "0 10px 0 10px"}}>
                            {
                                value.status?
                                    <GrStatusGood />
                                    :
                                    <GrStatusWarning />
                            }
                        </button>
                        <button onClick={() => {
                                getCoordinate(value.longitude, value.latitude)
                                getMines(value.id)
                            }
                        }
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