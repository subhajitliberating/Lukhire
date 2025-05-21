import React, { useEffect } from "react";
import logo from '../assets/images/logo.png'
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { CartContext } from '../Contex/CartContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
 const { hiredProducts, removeFromCart } = useContext(CartContext);
const [token, setToken] = useState(false);

useEffect(()=>{
  const token = localStorage.getItem('lukhiretoken');
  if(token){
    setToken(true)
  }
},[])
const navigate = useNavigate();

// inside onClick:




    const location = useLocation();
    
         const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
      { path: "/", label: "Home" },
      { path: "/about", label: "About" },
      { path: "/hire", label: "Hire" },
      // { path: "/shop", label: "Shop" },
      // { path: "/terms", label: "Terms" },
      { path: "/faq", label: "FAQ" },
      { path: "/contact", label: "Contact" },
    ];

     const AccountNavLinks = [
      { path: "/myorders", label: "My Orders" },
      { path: "/cart", label: "Cart" },
      { path: "/logout", label: "Log Out" },
      // { path: "/shop", label: "Shop" },
      // { path: "/terms", label: "Terms" },
      // { path: "/faq", label: "FAQ" },
      // { path: "/contact", label: "Contact" },
    ];
  useEffect(() => {
    // Handle scroll event using pure JavaScript
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar-default');
      if (window.scrollY > 50) {
    
        navbar.classList.add('navbar-shrink');
      } else {
        navbar.classList.remove('navbar-shrink');
      }
    };

    // Add the event listener for scroll
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
    return(
        <header className="navbar navbar-default" id="header">
        <div className="top-header">
            <div className="container">
                <div className="inner-content">
                    <div className="block">
                        <ul>
                            <li><a href="tel:015563353"><i className="fa-solid fa-headset"></i> Customer Support (01) 556 3353</a></li>
                        </ul>
                    </div>
                    <div className="rt-side">
                        {/* <div className="block">
                            <ul>
                                <li><a href="#">Wishlist (0)</a></li>
                            </ul>
                        </div> */}
                        {/* <div className="block">
                            <select name="" id="">
                                <option value="">EUR (€)</option>
                                <option value="">EUR (€)</option>
                            </select>
                        </div>
                        <div className="block">
                            <select name="" id="">
                                <option value="">English</option>
                                <option value="">English</option>
                            </select>
                        </div> */}
                        <div className="block">
                            <ul>
                                <li><Link to="/myorders">My Orders</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="mobile-rt-side">
              {/* ✅ Toggle menu open */}
              <button className="mobile-mob_open_menu" onClick={() => setMenuOpen(!menuOpen)}><i className="fa fa-bars" style={{
                color : 'red',
                fontSize: '30px'
              }}></i></button>
              <div style={{
                width : '100%',
                overflowY  :'hidden',
                display : 'flex',
                flexDirection  : 'row',
                alignItems : 'center',
                justifyContent : 'space-around'
          
              }}>

                <img src={logo}
                style={{
                  objectFit : 'contain',
                //  marginTop : '4px',
                //  marginBottom : '4px',
                //  marginLeft : '6%'
                 
          
                }}
                />
                     <li style={{
                      listStyle : 'none',
                     }}> 
  <Link to="/cart" style={{
                      color : 'black',
                      fontSize : '20px',
                     }}>
    <i className="fa-solid fa-cart-shopping" style={{
      fontSize : '30px',
      color : 'red',
    }}></i> {hiredProducts.length}
  </Link>
  </li>
             
              </div>

              {/* ✅ Mobile nav */}
              <div className={`navigation-mobile ${menuOpen ? "open" : ""}`}>
                <button className="mobile-mob_close_menu" onClick={() => setMenuOpen(!menuOpen)}><i className="fas fa-times" style={{
                color : 'red',
                fontSize  : '30px',
              }}></i></button>
                <ul>
                  {navLinks.map((link) => (
                    <li key={link.path} className={location.pathname === link.path ? "active" : ""}>
                      <Link to={link.path} onClick={() => setMenuOpen(false)}>{link.label}</Link>
                    </li>
                  ))}
              <li className="card-icon">
  <Link to="/cart">
    <i className="fa-solid fa-cart-shopping"></i> {hiredProducts.length} Items
  </Link>
    </li>
{!token && (

  <li className="card-icon">
    <Link to='/login'>
        <i class="fa-solid fa-user" > </i> Login
</Link>
</li>
)}

{token && ( <div>
   {AccountNavLinks.map((link) => (
      <li key={link.path}>
        <Link
          className="mt-2"
          to={link.path}
          onClick={() => {
            setMenuOpen(false);
            if (link.path === "/logout") {
              localStorage.removeItem("token"); // Remove token from localStorage
              window.location.href = "/"; // Redirect to login or home page
            }
          }}
        >
          {link.label}
        </Link>
      </li>
    ))}
    </div>
)}
    </ul>
              </div>

            </div>

        <div className="btm-header">
            <div className="container">
                <div className="inner-content">
                    <div className="logo-panel">
                        <a href="/"><img src={logo} alt="" /></a>
                    </div>
                    <div className="rt-side">
                        <a className="mob_open_menu" href="javascript:void(0)"><i className="fa fa-bars"></i></a>
                        <div className="navigation">
                            <a className="mob_close_menu" href="javascript:void(0)"><i className="fas fa-times"></i></a>
                            <ul>
      {navLinks.map((link) => (
        <li key={link.path} className={location.pathname === link.path ? "active" : ""}>
          <Link to={link.path}>{link.label}</Link>
          
        </li>
      ))}

      
     <li className="card-icon">
  <Link to="/cart">
    <i className="fa-solid fa-cart-shopping"></i> {hiredProducts.length} Items
  </Link>

  <div className="hover-card-box">
    <div className="gap-60-box"></div>
    <div className="main-hover-card-box cus-center">
      <h4>YOUR ORDER</h4>
      <p>HIRE</p>

      {hiredProducts.map((item) => (
        <div key={item.id} className="order-item cus-center">
          <p>{item.name}</p>
          <p>x{item.quantity}</p>
          <i
            style={{ color: 'red', cursor: 'pointer' }}
            className="fa-solid fa-xmark"
            onClick={() => removeFromCart(item.id)}
          ></i>
        </div>
      ))}

      {hiredProducts.length === 0 && <p>No items in cart</p>}
<Link to="/cart" style={{
  width:'100%'
}}>
      <button class="accent-btn w-100 border-0 py-3 mt-5">View Cart</button>
  </Link>
    </div>
  </div>
</li>
<li className="card-icon">
        <i class="fa-solid fa-user" style={{
          fontSize: '28px',
        }}></i>
     <div className="hover-card-box" style={{
      width: '300px',
    }}>
    <div className="gap-60-box" style={{
      width: '300px',
    }}></div>
    <div className="main-hover-card-box" style={{
      width: '300px',
      textAlign : "left",
      alignItems : 'self-start'
    }}>
      <h3>Account</h3>

    {token && (
  <div style={{ flexDirection: 'column' , }}>
    {AccountNavLinks.map((link) => (
      <li key={link.path}>
        <Link
          className="mt-2"
          to={link.path}
          onClick={() => {
            setMenuOpen(false);
            if (link.path === "/logout") {
              localStorage.removeItem("lukhiretoken"); // Remove token from localStorage
              window.location.href = "/"; // Redirect to login or home page
            }
          }}
        >
          {link.label}
        </Link>
      </li>
    ))}
  </div>
)}

      {!token && (
<div style={{
  display: 'flex',
  flexDirection : "row"
}}>
    <Link to="/login" style={{
  width:'100%'
}}>
      <button class="accent-btn w-100 border-0 py-3 mt-3 mb-3">Login</button>
  </Link>
  <Link to="/register" style={{
  width:'100%',
  marginLeft : '5px'
}}>
      <button class="accent-btn  w-100 border-0 py-3 mt-3 mb-3">Register</button>
  </Link>
  </div>

      )}
  
      </div>
      </div>
      </li>

    </ul>
                        </div>
                        {/* <div className="card-item">
                            <a href="#"><i className="fa-solid fa-cart-shopping"></i> 0 Items | € 0.00</a>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    </header>
    )
}
export default Navbar