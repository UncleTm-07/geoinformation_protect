import './App.css';
import MapBlock from "../components/MapBlock";
import MenuBlock from "../components/MenuBlock";
import {useContext, useEffect, useState} from "react";
import ServerWidget from "../components/ServerWidget";
import {Context} from "../index";


function App() {
    const [widget, setWidget] = useState("");

    const [mines, setMines] = useState();

    const [servers, setServers] = useState([])

    const [coordinateFly, setCoordinateFLy] = useState({})


    const {minesStore} = useContext(Context);
    const {serverStore} = useContext(Context);


    useEffect(() => {
        serverStore.getServer().then(res => {
            if (res && res.data) {
                setServers(res.data)
            }
        })
    }, []);


    function getMines(controlPointId) {
        minesStore.getMines(controlPointId).then(res => {
            if (res && res.data) {
                setMines(res.data)
            }
        })
    }



    function editServer(server) {
        serverStore.editServer(server).then(res => {
            const newServerArray = servers.map(server =>
                server.id === res.data.id ? res.data : server
            );

            setServers(newServerArray);
        })
    }

    const getCoordinateForFlyTo = (coordinate) => {
        setCoordinateFLy(coordinate)
        setTimeout(() => {
            setCoordinateFLy({})
        }, 3000)
    }

    useEffect(() => {
        if (servers) serverStore.setServers(servers)
    }, [servers]);

    useEffect(() => {
        if (mines) minesStore.setMines(mines)
    }, [mines]);

    return (
    <div className={"app"}>
        <MapBlock mines={mines} servers={servers} coordinateFly={coordinateFly}/>
        <MenuBlock widget={widget} setWidget={setWidget}/>
        <ServerWidget widget={widget} setWidget={setWidget} servers={servers} getCoordinateForFlyTo={getCoordinateForFlyTo} getMines={getMines} editServer={editServer}/>
    </div>
  );
}

export default App;
