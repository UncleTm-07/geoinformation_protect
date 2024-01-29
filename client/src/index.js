import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import MinesStore from "./store/MinesStore";
import ServerStore from "./store/ServerStore";

export const _minesStore = new MinesStore();
export const _serverStore = new ServerStore();

export const Context = createContext({
    minesStore: _minesStore,
    serverStore: _serverStore,
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Context.Provider value={{
          minesStore: _minesStore,
          serverStore: _serverStore,
      }}>
        <App />
      </Context.Provider>
  </React.StrictMode>
);

