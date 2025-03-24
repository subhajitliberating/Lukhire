import React from "react";

import Banner from "../Component/Banner";
import Footer from "../Component/Footer";
import { useEffect,useState } from "react";
import aboutimg from '../assets/images/about-img2.jpg'
import Excellence from '../assets/images/Excellence.jpg'
import Integrity from '../assets/images/Integrity.jpg'
import Innovation from '../assets/images/Innovation.jpg'
import CustomerFocus from '../assets/images/CustomerFocus.jpg'
import Collaboration from '../assets/images/Collaboration.jpg'
import Sustainability from '../assets/images/Sustainability.jpg'
import { Helmet } from 'react-helmet-async';
import fetchScoData from "../Contex/GetSco";
import Aos from "aos";
const About =()=>{
  const [metaData,setMetaData]=useState({})
  const Api_url = import.meta.env.VITE_API_URL;

    useEffect(()=>{
  


      fetchScoData('About', setMetaData, Api_url); 
     
        // document.title = metaData?.title
    },[])
     useEffect(() => {
            Aos.init({
                duration: 1000,
                easing: 'ease-out-back',
                mirror: false,
                anchorPlacement: 'top-center'
            });
            document.title = "About Us - LookHire";
           
        }, []);
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
        <div className="category-lukhire-access">
            <Banner title={'About'} />
        <section className="c-cxcellence-w" id="c-cxcellence-w">
            <div className="container-fluid g-0">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="img-panel">
                            <img src={aboutimg} alt="about-img2" />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="text-panel">
                            <div className="heading text-start">Your Trusted Partner in Construction Excellence</div>
                            <p className="text">Our journey began with a vision to revolutionize the construction industry by providing unparalleled access to high-quality equipment and exceptional service. Founded by a team of industry experts with decades of combined experience, Lukhire was born out of a passion for innovation and a commitment to empowering construction excellence. Since our inception, we have been dedicated to building lasting relationships with our clients, understanding their unique needs, and delivering tailored solutions that drive success. With a focus on continuous improvement and customer satisfaction, Lukhire has emerged as a trusted partner for construction professionals seeking reliability, efficiency, and innovation.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
     
        <section className="OurValues aos-animated" id="OurValues">
            <div className="container">
                <div className="top-panel text-center">
                    <div className="heading" data-aos="fade-down">
                        Our Values
                    </div>
                </div>
                <div className="products-content" data-aos="fade-up">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="box">
                                <div className="img-panel">
                                    <img src={Excellence} alt="Excellence" />
                                </div>
                                <div className="text-desc">
                                    <h3>Excellence:</h3>
                                    <p className="text">We strive for excellence in every aspect of our business, from the quality of our equipment to the level of service we provide.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="box">
                                <div className="img-panel">
                                    <img src={Integrity} alt="Integrity" />
                                </div>
                                <div className="text-desc">
                                    <h3>Integrity:</h3>
                                    <p className="text">We conduct ourselves with the utmost integrity, earning the trust and respect of our clients, partners, and employees.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="box">
                                <div className="img-panel">
                                    <img src={Innovation} alt="Innovation" />
                                </div>
                                <div className="text-desc">
                                    <h3>Innovation:</h3>
                                    <p className="text">We embrace innovation and continuously seek new ways to improve our offerings, staying ahead of industry trends and technologies.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="box">
                                <div className="img-panel">
                                    <img src={CustomerFocus} alt="CustomerFocus" />
                                </div>
                                <div className="text-desc">
                                    <h3>Customer Focus:</h3>
                                    <p className="text">Our customers are at the center of everything we do. We listen to their needs, anticipate their challenges, and go above and beyond to exceed their expectations.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="box">
                                <div className="img-panel">
                                    <img src={Collaboration} alt="Collaboration" />
                                </div>
                                <div className="text-desc">
                                    <h3>Collaboration:</h3>
                                    <p className="text">We believe in the power of collaboration, fostering strong partnerships with our clients and suppliers to achieve mutual success.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="box">
                                <div className="img-panel">
                                    <img src={Sustainability} alt="Sustainability" />
                                </div>
                                <div className="text-desc">
                                    <h3>Sustainability:</h3>
                                    <p className="text">We are committed to sustainability and environmental responsibility, minimizing our impact on the planet and supporting eco-friendly practices wherever possible.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
     
        <section className="about-block aos-animated" id="about">
            <div className="container">
                <div className="about-desc" data-aos="fade-up">
                    <div className="heading">Our Commitment:</div>
                    <p className="text">Our journey began with a vision to revolutionize the construction industry by providing unparalleled access to high-quality equipment and exceptional service. Founded by a team of industry experts with decades of combined experience, Lukhire was born out of a passion for innovation and a commitment to empowering construction excellence. Since our inception, we have been dedicated to building lasting relationships with our clients, understanding their unique needs, and delivering tailored solutions that drive success. With a focus on continuous improvement and customer satisfaction, Lukhire has emerged as a trusted partner for construction professionals seeking reliability, efficiency, and innovation.</p>
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
                    <a href="/hire" className="accent-btn">Hire Now</a>
                </div>
            </div>
        </section>
        <Footer/>
        </div>
        </>
    )
}

export default About