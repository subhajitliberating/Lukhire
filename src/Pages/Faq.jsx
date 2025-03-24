




import React, { useState, useEffect } from "react";
import Banner from "../Component/Banner";
import Footer from "../Component/Footer";
import AOS from 'aos';
import { Helmet } from 'react-helmet-async';
import fetchScoData from "../Contex/GetSco";

const faqData = [
  {
    category: "Equipment Quality and Rental Process",
    items: [
      { question: "How does Lukhire ensure the quality of its equipment?", answer: ` At Lukhire, we prioritize the quality and performance of our equipment. Each tool
                      undergoes rigorous inspection and maintenance before and after every rental. Our
                      team of experienced professionals ensures that you receive top-notch,
                      well-maintained tools, guaranteeing reliability and efficiency for your projects.` },
      { question: "What is the rental process at Lukhire?", answer: ` At Lukhire, we prioritize the quality and performance of our equipment. Each tool
                      undergoes rigorous inspection and maintenance before and after every rental. Our
                      team of experienced professionals ensures that you receive top-notch,
                      well-maintained tools, guaranteeing reliability and efficiency for your projects.` },
      { question: "Are there any warranties on the equipment?", answer: ` At Lukhire, we prioritize the quality and performance of our equipment. Each tool
                      undergoes rigorous inspection and maintenance before and after every rental. Our
                      team of experienced professionals ensures that you receive top-notch,
                      well-maintained tools, guaranteeing reliability and efficiency for your projects.` },
      { question: "Can I extend my rental period?", answer: ` At Lukhire, we prioritize the quality and performance of our equipment. Each tool
                      undergoes rigorous inspection and maintenance before and after every rental. Our
                      team of experienced professionals ensures that you receive top-notch,
                      well-maintained tools, guaranteeing reliability and efficiency for your projects.` }
    ]
  },
  {
    category: "Expert Guidance and Discounts",
    items: [
      { question: "Does Lukhire provide guidance on equipment usage?", answer: ` At Lukhire, we prioritize the quality and performance of our equipment. Each tool
                      undergoes rigorous inspection and maintenance before and after every rental. Our
                      team of experienced professionals ensures that you receive top-notch,
                      well-maintained tools, guaranteeing reliability and efficiency for your projects.` },
      { question: "Are there any discounts for bulk rentals?", answer: ` At Lukhire, we prioritize the quality and performance of our equipment. Each tool
                      undergoes rigorous inspection and maintenance before and after every rental. Our
                      team of experienced professionals ensures that you receive top-notch,
                      well-maintained tools, guaranteeing reliability and efficiency for your projects.` },
      { question: "What kind of support is available for first-time users?", answer: ` At Lukhire, we prioritize the quality and performance of our equipment. Each tool
                      undergoes rigorous inspection and maintenance before and after every rental. Our
                      team of experienced professionals ensures that you receive top-notch,
                      well-maintained tools, guaranteeing reliability and efficiency for your projects.` },
      { question: "How do I qualify for membership discounts?", answer:` At Lukhire, we prioritize the quality and performance of our equipment. Each tool
                      undergoes rigorous inspection and maintenance before and after every rental. Our
                      team of experienced professionals ensures that you receive top-notch,
                      well-maintained tools, guaranteeing reliability and efficiency for your projects.` }
    ]
  },
  {
    category: "Customer Support and Additional Services",
    items: [
      { question: "What are Lukhire’s customer support hours?", answer: ` At Lukhire, we prioritize the quality and performance of our equipment. Each tool
                      undergoes rigorous inspection and maintenance before and after every rental. Our
                      team of experienced professionals ensures that you receive top-notch,
                      well-maintained tools, guaranteeing reliability and efficiency for your projects.` },
      { question: "Do you offer delivery services for rented equipment?", answer: ` At Lukhire, we prioritize the quality and performance of our equipment. Each tool
                      undergoes rigorous inspection and maintenance before and after every rental. Our
                      team of experienced professionals ensures that you receive top-notch,
                      well-maintained tools, guaranteeing reliability and efficiency for your projects.` },
      { question: "Is there a refund policy in case of issues?", answer:` At Lukhire, we prioritize the quality and performance of our equipment. Each tool
                      undergoes rigorous inspection and maintenance before and after every rental. Our
                      team of experienced professionals ensures that you receive top-notch,
                      well-maintained tools, guaranteeing reliability and efficiency for your projects.` },
      { question: "Can I purchase equipment from Lukhire?", 
        answer: `At Lukhire, we prioritize the quality and performance of our equipment. Each tool
                      undergoes rigorous inspection and maintenance before and after every rental. Our
                      team of experienced professionals ensures that you receive top-notch,
                      well-maintained tools, guaranteeing reliability and efficiency for your projects.` }
    ]
  }
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [metaData,setMetaData]=useState({})
  const Api_url = import.meta.env.VITE_API_URL;
  
      useEffect(()=>{
        fetchScoData('Faq', setMetaData, Api_url); 
         
      },[])

  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-out-back', mirror: false, anchorPlacement: 'top-center' });
  }, []);

  const toggleAccordion = (sectionIndex, itemIndex) => {
    if (activeIndex === itemIndex && activeSection === sectionIndex) {
      setActiveIndex(null);
      setActiveSection(null);
    } else {
      setActiveIndex(itemIndex);
      setActiveSection(sectionIndex);
    }
  };

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
      <Banner title={'Faq'} />
      <section className="faq-block" id="faq-block">
        <div className="container">
          {faqData.map((section, sectionIndex) => (
            <div key={sectionIndex} className="faq-box">
              <div className="heading text-start">{section.category}</div>
              <div className="accordion-container pt-4">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="accordion-item">
                    <div
                      className={`accordion-title ${activeSection === sectionIndex && activeIndex === itemIndex ? "open" : ""}`}
                      onClick={() => toggleAccordion(sectionIndex, itemIndex)}
                      role="button"
                      tabIndex={0}
                    >
                      {item.question}
                    </div>
                    <div
                      className={`accordion-content ${activeSection === sectionIndex && activeIndex === itemIndex ? "open" : ""}`}
                    >
                      <p className="text">{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
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
      <Footer />
    </div>
    </>
  );
};

export default Faq;
