// src/component/Sidebar.js
import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { 
  FaHome, 
  FaList, 
  FaLayerGroup, 
  FaEnvelope, 
  FaAddressBook,
  FaBox
} from "react-icons/fa";
import { FaSignalMessenger } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa6";
import { useSidebar } from "../../Contex/SidebarContext";
import { useEffect } from "react";
import { IoIosConstruct } from "react-icons/io";

const Sidebar = ({setOpen}) => {
  const { isOpen } = useSidebar();


  useEffect(()=>{
    setOpen(isOpen);
  },[isOpen])
  

  return (
    <nav 
      id="sidebar" 
      className={`  text-black vh-100 fixed-left ${isOpen ? 'sidebar-active' : 'sidebar-deactive'}`}
    >
      <div className={`sidebar-header p-3 ${isOpen ? '' : 'd-lg-none'}`}>
        <h3 className="text-center">Lukhire</h3>
      </div>

      <Nav className="flex-column p-3">
        <Link to="/admin/dashboard" className="nav-link " end>
          <FaHome className="me-2" size={18} />  <span className={`${isOpen ? '' : 'd-lg-none'}`}>Dashboard
            </span>
        </Link>

        <Link to="/admin/categories" className="nav-link ">
          <FaList className="me-2" size={18} /> 
          <span className={`${isOpen ? '' : 'd-lg-none'}`}>
          Categories
          
          </span>
        </Link>
     
       

        {/* <NavLink to="/admin/subcategories" className="nav-link ">
          <FaLayerGroup className="me-2" /> Sub Categories
        </NavLink> */}

        <Link to="/admin/products" className="nav-link ">
          <FaBox className="me-2" size={18} />
          
          <span className={`${isOpen ? '' : 'd-lg-none'}`}> Products</span> 
        </Link>

        <Link to="/admin/orders" className="nav-link ">
          <FaCartPlus className="me-2" size={18} /> <span className={`${isOpen ? '' : 'd-lg-none'}`}> Orders</span> 
        </Link>

        {/* <Link to="/admin/contacts" className="nav-link ">
          <FaAddressBook className="me-2" /> <span className={`${isOpen ? '' : 'd-lg-none'}`}> Contacts
            </span> 
        </Link> */}
         <Link to="/admin/seo" className="nav-link ">
          < IoIosConstruct className="me-2" size={18}/> 
          <span className={`${isOpen ? '' : 'd-lg-none'}`}>
          Seo
          
          </span>
        </Link>
        <Link to="/admin/message" className="nav-link ">
          <FaSignalMessenger className="me-2" size={18} /> 
          <span className={`${isOpen ? '' : 'd-lg-none'}`}>
          Contact
          
          </span>
        </Link>
      </Nav>
    </nav>
  );
};

export default Sidebar;