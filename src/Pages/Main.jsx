import React from "react";
import Navbar from '../Component/Navbar'
import { Outlet } from "react-router-dom";


const Main = ()=>{
    const helmetContext = {};
    return(

        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Navbar/>
        <Outlet />
      </div>
  
    )
}

export default Main