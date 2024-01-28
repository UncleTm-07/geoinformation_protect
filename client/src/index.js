import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import MinesStore from "./store/MinesStore";

export const _minesStore = new MinesStore();

export const Context = createContext({
    minesStore: _minesStore,
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Context.Provider value={{
          minesStore: _minesStore,
      }}>
        <App />
      </Context.Provider>
  </React.StrictMode>
);

