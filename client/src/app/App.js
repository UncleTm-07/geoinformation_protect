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
        minesStore.getMines().then(res => {
            if (res && res.data) {
                setMines(res.data)
            }
        })
    }, []);


    const addNewServer = (api) => {
        serverStore.getServerWithAttribute(api).then(res => {
            if (res && res.data) {
                const newServerArray = [...servers, res.data[0]];
                console.log(newServerArray)
                setServers(newServerArray);
            }
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
        <ServerWidget widget={widget} setWidget={setWidget} servers={servers} addNewServer={addNewServer} getCoordinateForFlyTo={getCoordinateForFlyTo}/>
    </div>
  );
}

export default App;
