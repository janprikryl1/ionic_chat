import React, {useState} from 'react';
import './App.css'
import {IonApp, setupIonicReact} from "@ionic/react";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Room from "./pages/Room";
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import {Toaster} from "react-hot-toast";
import {ConnectionProvider} from "./ConnectionProvider";

setupIonicReact();

function App() {
    const [name, setName] = useState("");
  return (
      <ConnectionProvider>
        <IonApp>
          <BrowserRouter>
              <Routes>
                  <Route path="" element={<Dashboard name={name} setName={setName}/>} />
                  <Route path="/room/:id" element={<Room name={name}/>} />
              </Routes>
          </BrowserRouter>
            <Toaster />
        </IonApp>
      </ConnectionProvider>
  );
}

export default App;
