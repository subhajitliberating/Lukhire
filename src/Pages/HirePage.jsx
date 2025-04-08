import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../Component/Footer";
import Banner from "../Component/Banner";

const HirePage = () => {
    const { category, product } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        location: "",
        eircode: "",
        fromDate: "",
        toDate: "",
        information: "",
        quantity: 0,
        hire_type: "",
        hire_price: "",
        productData: null
    });

    const Api_url = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${Api_url}/user/single/product/${product}`);
                setFormData(prev => ({
                    ...prev,
                    productData: response.data,
                    Category: category,
                    ProductName: response.data.name,
                    p_id: response.data.id
                }));
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [category, product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            hire_price: name === 'hire_type' ? calculatePrice(value) : prev.hire_price
        }));
    };

    const calculatePrice = (hireType) => {
        if (!formData.productData) return 0;
        
        const prices = {
            'hire_price_day_one': formData.productData.hire_price_day_one,
            'hire_price_day_two': formData.productData.hire_price_day_two,
            'hire_price_day_three': formData.productData.hire_price_day_three,
            'hire_week': formData.productData.hire_week,
            'hire_weekend': formData.productData.hire_weekend
        };

        return prices[hireType] || 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const orderData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                location: formData.location,
                eircode: formData.eircode,
                quantity: formData.quantity,
                hire: formData.hire_type, // Matches backend 'hire' field
                hire_price: formData.hire_price,
                fromDate: formData.fromDate,
                toDate: formData.toDate,
                information: formData.information,
                p_id: formData.productData?.id,
                Category: category,
                ProductName: formData.productData?.name // Matches backend typo 'ProductNAme'
            };

            const response = await axios.post(`${Api_url}/apiv1/orders`, orderData);
            console.log("Order created:", response.data);
            // navigate('/confirmation'); // Redirect to confirmation page
        } catch (error) {
            console.error("Error creating order:", error);
            alert("Error submitting order. Please try again.");
        }
    };

    if (!formData.productData) return <div>Loading...</div>;





    return (
        <div id="main_lukhire">
            <Banner title={formData.productData.name}/>
        <div className="category-lukhire-access">
            <section className="BookEquipment aos-animated" id="BookEquipment">
                <div className="container">
                    {/* <div className="breadcrumbs">
                        <ul>
                            <li><Link to="/">Home / </Link></li>
                            <li><Link to={`/shop/${category}`}>{category} / </Link></li>
                            <li>Hire {formData.productData.name}</li>
                        </ul>
                    </div> */}
                    
                    <div className="btm-panel">
                       
                        <div className="form-panel">
                            <form onSubmit={handleSubmit}>
                                <div className="my-4">    <h3  style={{
                                color:'white'
                            }}>Product : {formData.productData.name}</h3>
                            <div className="products-sub-title" style={{
                                color:'white'
                            }} >Manufacturer : {formData.productData.manufacturer}</div>
                            <div style={{
                                color:'white'
                            }}> Model : {formData.productData.model}</div>

                                </div>
                        

                                <div className="form-group">
                           
                                    <input 
                                        id="YourName" 
                                        className="form-control" 
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    
                                    <input 
                                        id="email" 
                                        className="form-control" 
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    
                                    <input 
                                        id="Phone" 
                                        className="form-control" 
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                  
                                    <input 
                                        id="location" 
                                        className="form-control" 
                                        type="text"
                                        name="location"
                                        placeholder="Location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                  
                                    <input 
                                        id="eircode" 
                                        className="form-control" 
                                        type="text"
                                        name="eircode"
                                        value={formData.eircode}
                                        onChange={handleChange}
                                        placeholder="Eircode"
                                    />
                                </div>
                                <div className="form-group">
                                  
                                    <input 
                                        id="quntity" 
                                        className="form-control" 
                                        type="number"
                                        name="quantity"
                                        placeholder="Quntity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                
                                    <select
                                        id="hire_type"
                                        className="form-control"
                                        name="hire_type"
                                        value={formData.hire_type}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Hire Type</option>
                                        <option value="hire_price_day_one">1 Day (€{formData.productData.hire_price_day_one})</option>
                                        <option value="hire_price_day_two">2 Days (€{formData.productData.hire_price_day_two})</option>
                                        <option value="hire_price_day_three">3 Days (€{formData.productData.hire_price_day_three})</option>
                                        <option value="hire_weekend">Weekend (€{formData.productData.hire_weekend})</option>
                                        <option value="hire_week">Week (€{formData.productData.hire_week})</option>
                                    </select>
                                </div>

                                <div className="form-group">
                              
                                    <input 
                                        id="fromDate" 
                                        className="form-control" 
                                        type="date"
                                        name="fromDate"
                                        value={formData.fromDate}
                                        onChange={handleChange}
                                        required
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>

                                <div className="form-group">
                                   
                                    <input 
                                        id="toDate" 
                                        className="form-control" 
                                        type="date"
                                        name="toDate"
                                        value={formData.toDate}
                                        onChange={handleChange}
                                        required
                                        min={formData.fromDate}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="information">Additional Information</label>
                                    <textarea 
                                        id="information" 
                                        className="form-control"
                                        name="information"
                                        value={formData.information}
                                        onChange={handleChange}
                                        rows="4"
                                    />
                                </div>

                                <div className="sub-btn">
                                    <button type="submit" className="submit-btn">
                                        Submit
                                    </button>
                                    <p className="text">We’ll get in touch with you shortly</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
        </div>
    );
};

export default HirePage;