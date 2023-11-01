import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "react-datalist-input/dist/styles.css";
import { Router } from "./routes/index";
import { BrowserRouter } from "react-router-dom";
import { SidebarContext } from "./components/hooks/UseHooks/UseContext";
import { useNavigate } from "react-router";

function App() {
  
  return (
    <BrowserRouter>
      <SidebarContext>
        <Router />
      </SidebarContext>
    </BrowserRouter>
  );
}

export default App;
