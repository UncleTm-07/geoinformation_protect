import './App.css';
import MapBlock from "../components/MapBlock";
import MenuBlock from "../components/MenuBlock";
import {useContext, useEffect, useState} from "react";
import ServerWidget from "../components/ServerWidget";
import {Context} from "../index";


function App() {
    const [widget, setWidget] = useState("");

    const [mines, setMines] = useState();

    const {minesStore} = useContext(Context);

    useEffect(() => {
        minesStore.getMines().then(res => {
            if (res && res.data) {
                setMines(res.data)
            }
        })
    }, []);

    useEffect(() => {
        if (mines) minesStore.setMines(mines)
    }, [mines]);

    return (
    <div className={"app"}>
        <MapBlock mines={mines}/>
        <MenuBlock widget={widget} setWidget={setWidget}/>
        <ServerWidget widget={widget} setWidget={setWidget}/>
    </div>
  );
}

export default App;
