import React, { useState,useEffect } from "react";
import Banner from "../Component/Banner";
import Footer from "../Component/Footer";
import { Helmet } from 'react-helmet-async';
import fetchScoData from "../Contex/GetSco";
import AOS from 'aos';
import axios from "axios";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [showtext,setShowtext] =useState(false)
  const handleFocus = (e) => {
    e.target.closest('.form-group').classList.add('focused');
  };
  
  const handleBlur = (e) => {
    if (e.target.value === "") {
      e.target.closest('.form-group').classList.remove('focused');
    }
  };


  const [metaData,setMetaData]=useState({})
  const Api_url = import.meta.env.VITE_API_URL;

  


    useEffect(()=>{
  


      fetchScoData('Contact', setMetaData, Api_url); 
     
        // document.title = metaData?.title
    },[])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
   const response = await axios.post(`${Api_url}/contact/add`, formData);
   if (response) {
    setShowtext(true);
    setTimeout(() => {
      setShowtext(false);
    }, 60000); // 60000ms = 1 minute
  }


    }catch(err){
console.log(err)
    }
    console.log("Form Data:", formData);
    // Add your form submission logic here
  };
    useEffect(() => {
          AOS.init({
              duration: 1000,
              easing: 'ease-out-back',
              mirror: false,
              anchorPlacement: 'top-center'
          });
  
       
      }, []);
  

  return (
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
        <Banner title={"Contact"} />
      <section className="BookEquipment aos-animated" id="BookEquipment">
        <div className="container">
          <div className="top-panel text-center">
            <div className="heading" data-aos="fade-down">
              Do you have a question about equipment or need assistance?
            </div>
            <h4>We have reserved this space specifically for you to communicate with us.</h4>
          </div>
          <div className="middle-panel">
         
                    <div class="row">
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <div class="box">
                                <div class="row align-items-center">
                                    <div class="col-lg-3 col-md-3 col-6">
                                        <div class="icon-panel">
                                            <i class="fa-solid fa-phone"></i>
                                        </div>
                                    </div>
                                    <div class="col-lg-9 col-md-9 col-6">
                                        <div class="text-panel">
                                            <h2>Call Now</h2>
                                            <a href="tel:015563353">(01) 556 3353</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <div class="box">
                                <div class="row align-items-center">
                                    <div class="col-lg-3 col-md-3 col-6">
                                        <div class="icon-panel">
                                            <i class="fa-solid fa-envelope"></i>
                                        </div>
                                    </div>
                                    <div class="col-lg-9 col-md-9 col-6">
                                        <div class="text-panel">
                                            <h2>Email Us</h2>
                                            <a href="mailto:info@ralkore.ie">info@ralkore.ie</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <div class="box">
                                <div class="row align-items-center">
                                    <div class="col-lg-3 col-md-3 col-6">
                                        <div class="icon-panel">
                                            <i class="fa-solid fa-location-dot"></i>
                                        </div>
                                    </div>
                                    <div class="col-lg-9 col-md-9 col-6">
                                        <div class="text-panel">
                                            <h2>Location</h2>
                                            <a href="#">Dublin , D11 FT52 Ireland</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
               
          </div>
          <div className="btm-panel">
            <div className="form-panel">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="YourName">Your Name</label>
                  <input 
  id="YourName" 
  className="form-control" 
  type="text"
  name="name"
  required

  value={formData.name}
  onChange={handleChange}
  onFocus={handleFocus}
  onBlur={handleBlur}
/>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input 
                    id="email" 
                    className="form-control" 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                     required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="Phone">Phone</label>
                  <input 
                    id="Phone" 
                    className="form-control" 
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="Message">Message</label>
                  <textarea 
                    id="Message" 
                    className="form-control"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    
                  ></textarea>
                </div>
                <div className="sub-btn">
                  <button type="submit" className="submit-btn">
                    Submit
                  </button>
                  <p className={`text ${showtext ? 'showtext' : 'hide'}`}>We’ll get in touch with you shortly</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="map-block">
        <iframe 
          title="Company Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3366.1133983076265!2d-6.3070969598355875!3d53.37544208683368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670dc31e7e883d%3A0x76d99068acc6aed0!2sRalkore%20Ltd%20Core%20Drilling%20%26%20Concrete%20Cutting%20Experts!5e0!3m2!1sja!2sjp!4v1716540825983!5m2!1sja!2sjp" 
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
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
                    <a href="/hireproduct" className="accent-btn">Hire Now</a>
                </div>
            </div>
        </section>
        <Footer/>
    </div>
    </>
  );
};

export default Contact; 