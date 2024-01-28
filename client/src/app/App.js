import './App.css';
import MapBlock from "../components/MapBlock";
import MenuBlock from "../components/MenuBlock";
import {useState} from "react";
import ServerWidget from "../components/ServerWidget";

function App() {
    const [widget, setWidget] = useState("");


    return (
    <div className={"app"}>
        <MapBlock/>
        <MenuBlock widget={widget} setWidget={setWidget}/>
        <ServerWidget widget={widget} setWidget={setWidget}/>
    </div>
  );
}

export default App;
