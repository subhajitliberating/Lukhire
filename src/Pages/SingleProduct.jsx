import React, { useRef } from "react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import AOS from 'aos';
import { useEffect, useState} from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Banner from "../Component/Banner";
import { CartContext } from '../Contex/CartContext';
import { useContext } from 'react';
import Footer from "../Component/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SingleProduct = () => {
    const { categoryName, name } = useParams();
    const [products, setProducts] = useState([]);
    const [singleProduct, setSingleProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const Api_url = import.meta.env.VITE_API_URL;
    const specRef = useRef(null);
     const pdfRef = useRef(null);
       const { addToCart } = useContext(CartContext);

  const handleHire = () => {
    addToCart(singleProduct, quantity);
     toast.success("Product Add To Cart"); 
  };

  
    // Create array of all product images
    const productImages = singleProduct ? [
        singleProduct.image,
        singleProduct.image1,
        singleProduct.image2,
        singleProduct.image3
    ].filter(img => img) : [];

    // Create pricing array from hire price fields
    const pricing = singleProduct ? [
        { duration: "1 Day", amount: singleProduct.hire_price_day_one },
        { duration: "2 Days", amount: singleProduct.hire_price_day_two },
        { duration: "3 Days", amount: singleProduct.hire_price_day_three },
        { duration: "Week", amount: singleProduct.hire_week },
        { duration: "Weekend", amount: singleProduct.hire_weekend },
        { duration: "Deposit", amount: singleProduct.hire_deposit }
    ].filter(price => price.amount !== undefined) : [];

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-back',
            mirror: false,
            anchorPlacement: 'top-center'
        });

   


        const fetchSingleProduct = async () => {
            try {
                const response = await axios.get(`${Api_url}/user/single/product/${name}`);
                setSingleProduct(response.data);
            } catch(error) {
                console.log(error);
            }
        };

        const fetchRelatedProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${Api_url}/user/products/`, {
                    params: {
                        page: 1,
                        limit: 3,
                        search: categoryName || '',
                    }
                });
                setProducts(response.data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSingleProduct();
        fetchRelatedProducts();
    }, [name, categoryName]);


    const handleDownloadSpecifications = () => {
        if (!singleProduct) return;
      
        // Create a hidden container for PDF content
        const pdfContent = document.createElement('div');
        pdfContent.style.position = 'absolute';
        pdfContent.style.left = '-9999px';
        pdfContent.style.width = '210mm'; // A4 width
        pdfContent.style.padding = '20px';
        pdfContent.style.fontFamily = 'Arial';
        
        // PDF content structure
        pdfContent.innerHTML = `
          <div class="pdf-container">
            <h1 style="font-size: 24px; margin-bottom: 20px;">${singleProduct.name}</h1>
            <div style="margin-bottom: 15px;">
              <strong>Manufacturer:</strong> ${singleProduct.manufacturer}<br>
              <strong>Model:</strong> ${singleProduct.model}<br>
              <strong>Code:</strong> ${singleProduct.code}
            </div>
            <h2 style="font-size: 20px; margin: 20px 0;">Specifications</h2>
            <div class="specs-content" style="line-height: 1.6;">
              ${singleProduct.Specifications}
            </div>
          </div>
        `;
      
        document.body.appendChild(pdfContent);
      
        html2canvas(pdfContent, {
          scale: 3, // Increase scale for better quality
          logging: true,
          useCORS: true
        }).then((canvas) => {
          const imgData = canvas.toDataURL('image/png', 1.0);
          const pdf = new jsPDF('p', 'mm', 'a4');
          const imgWidth = pdf.internal.pageSize.getWidth() - 40; // 20mm margins
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
          pdf.setFont('helvetica', 'normal');
          pdf.addImage(imgData, 'PNG', 20, 20, imgWidth, imgHeight);
          document.body.removeChild(pdfContent);
          pdf.save(`${singleProduct.name}-specifications.pdf`);
        }).catch(error => {
          console.error('Error generating PDF:', error);
          document.body.removeChild(pdfContent);
        });
      };
      

    const handleQuantity = (operation) => {
        setQuantity(prev => {
            if(operation === 'inc') return prev + 1;
            if(operation === 'dec' && prev > 1) return prev - 1;
            return prev;
        });
    };






    const truncateHTML = (html, maxWords) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const text = tempDiv.textContent || tempDiv.innerText || '';
        const words = text.trim().split(/\s+/);
        
        if (words.length <= maxWords) return html;
        
        // Find approximate truncation point
        const truncatedText = words.slice(0, maxWords).join(' ');
        const truncatedHTML = html.substring(0, html.indexOf(truncatedText) + truncatedText.length) + '...';
        
        return truncatedHTML;
      };

    if(!singleProduct) return <div>Loading...</div>;

    return (
        <div className="category-lukhire-access">
             <ToastContainer /> 
            <Banner title={singleProduct?.name}/>
            <section className="singlequipment aos-animated" id="singlequipment">
                <div className="container">
                    <div className="breadcrumbs">
                        <ul>
                            <li><Link to="/">Home / </Link></li>
                            <li><Link to="/hire">Equipment / </Link></li>
                            <li><Link to={`/hireproduct/${singleProduct.slug}`}>{categoryName} / </Link></li>
                            <li>{singleProduct.name}</li>
                        </ul>
                    </div>
                    <div className="row">
                    <div className="col-lg-5 col-md-5 col-sm-12">
    <div className="lf-side">
        {/* Main image display */}
        <div className="main-image-box" style={{ marginBottom: '15px', borderRadius: '8px', overflow: 'hidden' }}>
            {productImages.length > 0 && (
                <img 
                    src={`${Api_url}/uploads/${productImages[selectedImageIndex]}`} 
                    alt={singleProduct.name} 
                    style={{ 
                        width: '100%', 
                        height: '400px', 
                        objectFit: 'cover',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                />
            )}
        </div>

        {/* Thumbnail carousel */}
        <div className="thumbnail-carousel" style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
            {productImages.map((img, index) => (
                <div 
                    key={index} 
                    className="thumbnail-item"
                    style={{
                        flex: '0 0 80px',
                        cursor: 'pointer',
                        border: selectedImageIndex === index ? '2px solid #007bff' : '1px solid #ddd',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        opacity: selectedImageIndex === index ? 1 : 0.7,
                        transition: 'all 0.3s ease'
                    }}
                    onClick={() => setSelectedImageIndex(index)}
                >
                    <img 
                        src={`${Api_url}/uploads/${img}`} 
                        alt="thumb" 
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '4px'
                        }}
                    />
                </div>
            ))}
        </div>
    </div>
</div>
                        <div className="col-lg-7 col-md-7 col-sm-12">
                            <div className="product-desc">
                                <div className="products-sub-title">{singleProduct.manufacturer}</div>
                                <div className="products-title">{singleProduct.name}</div>
                                <div className="manufacturer-block">
                                    <div className="row">
                                        <div className="col-lg-4 col-md-6 col-sm-12">
                                            <span className="block-title">Code</span>
                                            <ul>
                                                <li className="text">{singleProduct.code}</li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-12">
                                            <span className="block-title">Manufacturer</span>
                                            <ul>
                                                <li className="text">{singleProduct.manufacturer}</li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-12">
                                            <span className="block-title">Model</span>
                                            <ul>
                                                <li className="text">{singleProduct.model}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {/* <p className="text mb-4">
                                    <b>Description:</b> {singleProduct.Description}
                                </p> */}

<div className="text mb-4">
  <b>Specifications:</b>
  {/* Visible truncated content */}
  <div 
    dangerouslySetInnerHTML={{ 
      __html: truncateHTML(singleProduct.Specifications, 50) 
    }} 
  />
  
  {/* Hidden full content for PDF */}
  <div 
    style={{ display: 'none' }} 
    dangerouslySetInnerHTML={{ __html: singleProduct.Specifications }} 
    ref={pdfRef}
  />
</div>
<div class="download">
                                <button  onClick={handleDownloadSpecifications}  class="accent-btn download"><i class="fa-solid fa-download"></i> Download Specifications</button>
                            </div>
                                <div className="price-block">
                                    <div className="price-title">Hire Price</div>
                                    <div className="row">
                                        {pricing.map((price, index) => (
                                            <div key={index} className="col-lg-3 col-md-4 col-6">
                                                <div className="select-price">
                                                    <label>
                                                        <span className="daytime">{price.duration}</span>
                                                        <span className="price">€{price.amount}</span>
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="quantity-block">
                                    <div className="products-sub-title">Quantity</div>
                                    <div className="number">
                                        <span className="minus" onClick={() => handleQuantity('dec')}>-</span>
                                        <input type="text" value={quantity} readOnly />
                                        <span className="plus" onClick={() => handleQuantity('inc')}>+</span>
                                    </div>
                                </div>
                                <div className="hire-btn">
    <button onClick={() => handleHire(singleProduct)}
      
        className="accent-btn w-100 border-0 py-3"
    >
        Hire
    </button>
       {/* <Link 
        to={`/hire/${categoryName}/${singleProduct.slugto}`}
        className="accent-btn w-100 border-0 py-3"
    >
        Hire
    </Link> */}
</div>
                                <p className="text my-3">{singleProduct.note}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <section className="equipmentitems aos-animated" id="equipmentitemproducts">
                <div className="container">
                    <div className="heading">Related Products</div>
                    <div className="row justify-content-center">
                        {products.map((product) => (
                            <div key={product.id} className="col-lg-4 col-md-6 col-sm-12">
                                <div className="box" data-aos="fade-up">
                                    <span className="img-panel">
                                        <img src={`${Api_url}/uploads/${product.image}`} alt={product.name} />
                                    </span>
                                    <span className="text-desc">
                                        <span className="text sub-heading" data-aos="fade-up">
                                            {product.manufacturer}
                                        </span>
                                        <span className="text" data-aos="fade-up">
                                            {product.name}
                                        </span>
                                        <p className="text">{product.Description}</p>
                                        <span className="text mb-4" data-aos="fade-up">
                                            €{product.hire_price_day_one}
                                        </span>
                                        <Link 
                                            to={`/equipment/${categoryName}/${product.slugto}`} 
                                            className="accent-btn"
                                        >
                                            View Options
                                        </Link>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}
            <Footer/>
        </div>
    )
}

export default SingleProduct;


