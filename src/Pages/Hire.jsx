import React from "react";
import AOS from 'aos';
import { Link } from "react-router-dom";
import { useEffect,useState } from 'react'
import Navbar from "../Component/Navbar";
import banner from '../assets/images/banner.jpg'
import categoriesData from '../DummyData/categoriesData'; // Import the data
import { useNavigate } from "react-router-dom";
import productsData from '../DummyData/productsData';
import Banner from "../Component/Banner";
import axios from "axios";
import Footer from '../Component/Footer';
import { Helmet } from 'react-helmet-async';
import fetchScoData from "../Contex/GetSco";
const Hire = ()=>{
const nav = useNavigate()

const [metaData,setMetaData]=useState({})
const Api_url = import.meta.env.VITE_API_URL;

    useEffect(()=>{
      fetchScoData('Hire', setMetaData, Api_url); 
        FatchCategory()
    },[])



  
      useEffect(()=>{
    
          AOS.init({
            duration: 1000,
          
            easing: 'ease-out-back',
            mirror: false,             // Prevent the animation from being triggered again on scroll back
            anchorPlacement: 'top-center',
        })},[]);

const [category,setCategory]=useState([])

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

           <Banner title={'Equipment Categories'}/>
       
       
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
       
        <section className="cst-projects aos-animated my-5" id="cst-projects">
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

export default Hire