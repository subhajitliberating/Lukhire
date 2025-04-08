import React from "react";
import Navbar from '../Component/Navbar'
import { Outlet } from "react-router-dom";
import { useState } from "react";

const Main = ()=>{
     const [menuOpen, setMenuOpen] = useState(false);
    const helmetContext = {};
    return(

        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Navbar/>
        <Outlet />
      </div>
  
    )
}

export default Main