import React from "react";
import { useState,useEffect } from "react";
import logo from '../assets/footer-logo.png'
import Pay from '../assets/images/pay.png'
import prowreBy from '../assets/images/poweredbywhite.png'
import axios from "axios";
import { Link } from "react-router-dom";
const Footer = ()=>{
    const Api_url = import.meta.env.VITE_API_URL;
    const [category,setCategory]=useState([])
    
    const FatchCategory = async ()=>{
    try{
    const respons = await axios.get(`${Api_url}/user/category`)
    setCategory(respons.data)
    }catch(error){
    console.log(error)
    }
    }
       useEffect(()=>{
    
        FatchCategory()
    },[])
return(
    <footer className="footer" id="footer">
    <div className="logo-section">
        <div className="container">
            <div className="footer-logo">
                <a href="/"><img src={logo} alt="footer-logo" /></a>
            </div>
        </div>
    </div>
    <div className="container">
        <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="box">
                            <span className="footer-heading">
                                Quick Links
                            </span>
                            <div className="link">
                                <ul>
                                    {category.map((category,index)=>(
                                        <li>    <Link key={index} to={`/equipment/${encodeURIComponent(category.Category.toLowerCase().replace(/\s+/g, '-'))}`}>
                                           {category.Category}
                                            </Link>
                                        </li>
                                    ))}
                                    <li><a href="#">Deliveries</a></li>
                                    <li><a href="#">Order Status</a></li>
                                    <li><a href="support.html">Support</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="box">
                            <span className="footer-heading">
                                Information
                            </span>
                            <div className="link">
                                <ul>
                                    <li><a href="customer-service.html">Customer Service</a></li>
                                    <li><a href="#">Store Location</a></li>
                                    <li><a href="refund-policy.html">Shipping & Refund Policy</a></li>
                                    <li><a href="privacy-policy.html">Privacy Policy</a></li>
                                    <li><a href="/faq">FAQ</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="box">
                            <span className="footer-heading">
                                Contact
                            </span>
                            <address className="address">
                                <ul>
                                    <li><i className="fa-solid fa-location-dot"></i> Unit 05, Block 01,
                                            Tolka Valley Business Park,
                                            Ballyboggan Rd, Dublin , D11 FT52
                                            Ireland</li>
                                    <li><a href="tel:015563353"><i className="fa-solid fa-phone"></i> (01) 556 3353</a></li>
                                    <li><a href="mailto:info@ralkore.ie"><i className="fa-solid fa-envelope"></i> info@ralkore.ie</a></li>
                                </ul>
                            </address>
                        </div>
                        <div className="social-block">
                            <span className="footer-heading">
                                Follow Us On
                            </span>
                            <ul>
                                <li><a href="#"><i className="fa-brands fa-facebook"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-linkedin-in"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="copy-right">
            <div className="pay-img">
                <img src={Pay} alt="pay" />
            </div>
            <div className="img-panel">
                <img src={prowreBy} alt="poweredbywhite" />
            </div>
        </div>
    </div>
</footer>
)

}
export default Footer