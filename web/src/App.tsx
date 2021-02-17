import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Notify } from "./components/Notify";
import { useAuth } from "./hooks/useAuth";
import { Routes } from "./pages/routes";
import "./styles/App.scss";
import { config } from "./config/config";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Notify />
        <Routes />
      </BrowserRouter>
    </>
  );
}

export default App;
