import './App.css';
import MapBlock from "../components/MapBlock";
import MenuBlock from "../components/MenuBlock";
import {useContext, useEffect, useState} from "react";
import ServerWidget from "../components/ServerWidget";
import {Context} from "../index";
import TargetWidget from "../components/TargetWidget";


function App() {
    const [widget, setWidget] = useState("");

    const [mines, setMines] = useState();

    const [servers, setServers] = useState([])

    const [target, setTarget] = useState([])

    const [coordinateFly, setCoordinateFLy] = useState({})
    const [rerender, setRerender] = useState(false)

    const forceRerender = () => setRerender(!rerender)


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

    const createTarget = (coordinate) => {
        setTarget(prevArray => {
            if (prevArray && prevArray.length > 0) {
                return [...prevArray, { id: prevArray.length + 1, firstPoint: `${coordinate[0].longitude}, ${coordinate[0].latitude}`,
                    secondPoint: `${coordinate[3].longitude}, ${coordinate[3].latitude}` }];
            } else {
                return [{
                    id : 1,
                    firstPoint: `${coordinate[0].longitude}, ${coordinate[0].latitude}`,
                    secondPoint: `${coordinate[3].longitude}, ${coordinate[3].latitude}`
                }];
            }
        });
        forceRerender()
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
        <MapBlock mines={mines} servers={servers} coordinateFly={coordinateFly} createTarget={createTarget}/>
        <MenuBlock widget={widget} setWidget={setWidget}/>
        <ServerWidget widget={widget} setWidget={setWidget} servers={servers} getCoordinateForFlyTo={getCoordinateForFlyTo} getMines={getMines} editServer={editServer}/>
        <TargetWidget widget={widget} setWidget={setWidget} target={target}/>
    </div>
  );
}

export default App;
