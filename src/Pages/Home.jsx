import React from "react";
import AOS from 'aos';
import { Link } from "react-router-dom";
import { useEffect,useState } from 'react'
import Navbar from "../Component/Navbar";
import banner from '../assets/images/banner.jpg'
import categoriesData from '../DummyData/categoriesData'; // Import the data
import { useNavigate } from "react-router-dom";
import productsData from '../DummyData/productsData';
import axios from "axios";
import Footer from '../Component/Footer';
import Freeshipping from '../assets/images/FREE-SHIPPING.png'
import SUPPORT from '../assets/images/SUPPORT.png'
import MEMBERS from '../assets/images/MEMBERS-DISCOUNT.png'
import { Helmet } from 'react-helmet-async';
import fetchScoData from "../Contex/GetSco";
const Home= ()=>{
  const [category,setCategory]=useState([])
  const [metaData,setMetaData]=useState({})
  const Api_url = import.meta.env.VITE_API_URL;
const nav = useNavigate()
    useEffect(()=>{
  


      fetchScoData('Home', setMetaData, Api_url); 
        FatchCategory()
        // document.title = metaData?.title
    },[])



      useEffect(()=>{
    
          AOS.init({
            duration: 1000,
          
            easing: 'ease-out-back',
            mirror: false,             // Prevent the animation from being triggered again on scroll back
            anchorPlacement: 'top-center',
        })},[]);



const FatchCategory = async ()=>{
try{
const respons = await axios.get(`${Api_url}/user/category`)
setCategory(respons.data)
}catch(error){
console.log(error)
}
}


const handelsug = (id , name)=>{
  const slug = `${id}-${name.toLowerCase().replace(/\s+/g, '-')}`;
 return encodeURIComponent(slug)
}
    return(


      <>
  <Helmet>
        <title>{metaData?.title}</title>
        <meta 
          name="description" 
          content={metaData?.meta_description}
        />
        <meta 
          name="keywords" 
          content={metaData?.meta_keywords} 
        />
        <meta property="og:title" content={metaData?.title} />
        <meta property="og:description"  content={metaData?.meta_description}/>
      </Helmet>
        <div id="main_lukhire">

        <section className="banner" id="banner">
            <div className="hero-img">
                <img src={banner} alt="banner" />
            </div>
            <div className="banner-desc">
                <div className="container">
                    <div className="text-panel">
                        <div className="sub-title">Your Key to Unmatched Engineering Efficiency</div>
                        <div className="banner-title">Plant & Tools Hire Solutions </div>
                        <p className="text">Empowering Construction, building and engineering Excellence with
                            Premier Equipment Solutions from Lukhire.</p>
                    </div>
                </div>
            </div>
        </section>
     
        <section className="service-block aos-animated" id="service">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-6 mt-5">
                        <div className="box" data-aos="fade-up">
                            <div className="icon-panel">
                                <img src={Freeshipping} alt="free-shipping" />
                            </div>
                            <div className="text-panel">
                                <span className="icon-title">
                                    FREE SHIPPING
                                </span>
                                <p className="text">On all orders within Ireland</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6 mt-5">
                        <div className="box" data-aos="fade-up">
                            <div className="icon-panel">
                                <img src={SUPPORT} alt="SUPPORT" />
                            </div>
                            <div className="text-panel">
                                <span className="icon-title">
                                    24/7 SUPPORT
                                </span>
                                <p className="text">Support when available</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6 mt-5">
                        <div className="box" data-aos="fade-up">
                            <div className="icon-panel">
                                <img src={MEMBERS} alt="MEMBERS-DISCOUNT" />
                            </div>
                            <div className="text-panel">
                                <span className="icon-title">
                                    MEMBERS DISCOUNT
                                </span>
                                <p className="text">15 % OFF on all orders above €100</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
       
        <section className="equipment-categorie aos-animated" id="equipment-categorie">
            <div className="container">
                <div className="heading" data-aos="fade-down">Equipment Categories</div>
              

<div className="row justify-content-center">
      {category.map((category,index) => (
        <div key={category.index} className="col-lg-3 col-md-6 col-sm-12">
          <div className="box" data-aos="fade-up">
          
          <Link to={`/equipment/${encodeURIComponent(category.Category.toLowerCase().replace(/\s+/g, '-'))}`}>
       
              <span className="img-panel">
                <img  src={`${Api_url}/uploads/${category?.image}`}  alt={category?.Category} />
              </span>
              <span className="text-desc">
                <span className="text" data-aos="fade-up">
                  {category?.Category}
                </span>
                <span className="text view-btn" data-aos="fade-up">
                  {/* {category?.Description} */}
                  {' View Collection → '}
                </span>
              </span>
            </Link>
          </div>
        </div>
      ))}
    </div>
            </div>
        </section>
       
        <section className="shop-category aos-animated" id="shop-category">
      <div className="container">
        <div className="top-panel text-center">
          <div className="heading" data-aos="fade-down">
            Shop By Category
          </div>
          <p className="text">
            From Precision Carpentry to Site Safety Solutions, Lukhire Offers a Spectrum of Specialized Tools for Every Project
          </p>
        </div>
        <div className="products-content" data-aos="fade-up">
          <div className="row">
            {productsData.map((product) => (
              <div className="col-lg-3 col-md-6 col-sm-12" key={product.id}>
                <div className="box">
                  <div className="img-desc">
                    <div className="img-panel">
                      <img src={product.image} alt={product.title} />
                    </div>
                    <div className="quack-block">
                      <ul>
                        {/* <li>
                          <a href={product.heartIconLink}>
                            <i className="fa-regular fa-heart"></i>
                          </a>
                        </li> */}
                        <li>
                          <a href={product.viewIconLink} data-bs-toggle="modal" data-bs-target={product.modalTarget}>
                            <i className="fa-solid fa-eye"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="text-desc text-center">
                    <a href={product.link} className="text">
                      {product.title}
                    </a>
                  </div>
                  <div className="btn-panel">
                    <ul>
                      <li>
                        <a href={product.link} className="accent-btn">
                          Browse Options →
                        </a>
                      </li>
                      {/* <li>
                        <a href={product.heartIconLink} className="accent-btn">
                          <i className="fa-regular fa-heart"></i>
                        </a>
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
       
        <section className="about-block aos-animated" id="about">
            <div className="container">
                <div className="about-desc" data-aos="fade-up">
                    <div className="sub-title">about us</div>
                    <div className="heading">Your Trusted Partner in Construction Excellence</div>
                    <p className="text">At Lukhire, we take pride in being your premier partner for equipment hire solutions in the construction industry. With a commitment to excellence, we provide a comprehensive range of top-notch tools and machinery to ensure the success of your projects. Our focus extends beyond delivering quality equipment; we strive to build lasting relationships with our clients by offering personalized service, expert guidance, and reliable support throughout every stage of your construction journey. Choose Lukhire for a seamless experience that elevates your projects to new heights.</p>
                    <a href="/about" className="accent-btn">Learn More</a>
                </div>
            </div>
        </section>
    
        <section className="cst-projects aos-animated" id="cst-projects">
            <div className="container">
                <div className="count-panel" data-aos="fade-up">
                    <div className="items">
                        <div className="box">
                            <h3 className="count">5</h3>
                            <p className="text">Equipment & Tools</p>
                        </div>
                        <div className="box">
                            <h3 className="count">10</h3>
                            <p className="text">Units Sold</p>
                        </div>
                        <div className="box">
                            <h3 className="count satisfaction">99</h3>
                            <p className="text">Customer Satisfaction</p>
                        </div>
                    </div>
                </div>
                <div className="btm-desc" data-aos="fade-up">
                    <div className="heading">Ready to elevate your construction projects?</div>
                    <p className="text">Explore Lukhire's extensive equipment catalog now and experience the difference in quality and service.</p>
                    <a href="/shop" className="accent-btn">Shop Now</a>
                </div>
            </div>
        </section>
        
   <Footer/>
       
    </div>
    </>
    )
}

export default Home