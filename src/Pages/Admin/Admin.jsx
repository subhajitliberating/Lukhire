// src/component/Admin.js
import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import CustomNavbar from "../../Component/Admin/CustomNavbar";
import Sidebar from "../../Component/Admin/Sidebar";
import { SidebarProvider } from "../../Contex/SidebarContext";
import { useState,useEffect } from "react";
// import { useSidebar } from "../Contex/SidebarContext";

//  const { isOpen } = useSidebar();
//  const [isOpen, setOpen] = useState(true);


const Admin = ({setToken}) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <SidebarProvider>
      <div className="d-flex">
        <Sidebar setOpen={setOpen}/>
        
        <div id="content" className={`w-100 ${isOpen ? 'content-m-250' : 'content-m-100'}`}>
          <CustomNavbar setToken={setToken}/>
          
          <Container fluid className="p-4">
            <div className="main-content">
              <Outlet />
            </div>
          </Container>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Admin;