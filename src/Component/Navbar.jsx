import React, { useEffect } from "react";
import logo from '../assets/images/logo.png'
import { Link, useLocation } from "react-router-dom";
const Navbar = () => {

    const location = useLocation();

    const navLinks = [
      { path: "/", label: "Home" },
      { path: "/about", label: "About" },
      { path: "/hire", label: "Hire" },
      { path: "/shop", label: "Shop" },
      { path: "/terms", label: "Terms" },
      { path: "/faq", label: "FAQ" },
      { path: "/contact", label: "Contact" },
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
                        <div className="block">
                            <ul>
                                <li><a href="#">Wishlist (0)</a></li>
                            </ul>
                        </div>
                        <div className="block">
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
                        </div>
                        <div className="block">
                            <ul>
                                <li><a href="#">My Orders</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="btm-header">
            <div className="container">
                <div className="inner-content">
                    <div className="logo-panel">
                        <a href="index.html"><img src={logo} alt="" /></a>
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
    </ul>
                        </div>
                        <div className="card-item">
                            <a href="#"><i className="fa-solid fa-cart-shopping"></i> 0 Items | € 0.00</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    )
}
export default Navbar