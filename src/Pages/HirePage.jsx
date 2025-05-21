import React, { useState, useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../Component/Footer";
import Banner from "../Component/Banner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  Loader from '../Component/Loader'
import logo from '../assets/images/logo.png'
import { Link } from "react-router-dom";
const HirePage = () => {
  const location = useLocation();
  const products = location.state?.products || [];
  const Api_url = import.meta.env.VITE_API_URL;
  const [callingCode, setCallingCode] = useState("+353"); // Default for Ireland
  const nav =  useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eircode: "",
    city: "",
    county: "",
    country: "Ireland",
    information: "",
    location: "",
    products: products.map((item) => ({
      ...item,
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
    })),
  });
  const userToken =  localStorage.getItem('lukhiretoken')

  const [countries, setCountries] = useState([]);
  const [loade,setload]=useState(false);
  const [done,setdone]=useState(false);



  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get("https://restcountries.com/v3.1/all");
        const countryList = res.data.map((country) => ({
          name: country.name.common,
          callingCode: country.idd?.root
            ? country.idd.root + (country.idd.suffixes?.[0] || "")
            : "",
        }));

        const sorted = countryList.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setCountries(sorted);

        const ireland = sorted.find((c) => c.name === "Ireland");
        if (ireland) setCallingCode(ireland.callingCode);
      } catch (error) {
        console.error("Error fetching countries:", error);
        toast.error("❌ Failed to load country list.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    };

    fetchCountries();
  }, []);

  const handleFocus = (e) => {
    e.target.closest(".form-group").classList.add("focused");
  };

  const handleBlur = (e) => {
    if (e.target.value === "") {
      e.target.closest(".form-group").classList.remove("focused");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "country") {
      const selected = countries.find((c) => c.name === value);
      setCallingCode(selected?.callingCode || "");
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (index, field, value) => {
    const updatedProducts = [...formData.products];
    updatedProducts[index][field] = value;
    setFormData((prev) => ({ ...prev, products: updatedProducts }));
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
      //  if(!userToken){
      //          return nav('/login')
      //         }
              

    const { name, email, eircode, county } = formData;

    if (!name || !email || !eircode || !county) {
      toast.error(
        "❌ Please fill in all required fields (Name, Email, Eircode, County).",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
      return;
    }

    try {
      setload(true)
   const response = await axios.post(
  `${Api_url}/apiv1/orders`,
  {
    ...formData,
    phone: `${callingCode}${formData.phone}`,
  },
  {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  }
);
localStorage.removeItem('hiredProducts')
setdone(true)
setload(false)

      console.log("Order submitted:", response.data);
      toast.success("✅ Your hire request has been sent successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      setload(false)
      console.log(err)
      console.error("Submission failed:", err);
      toast.error("❌ Failed to submit your request. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  if(loade){
    return (<Loader/>)
  }

  if(done){
  return(
  <div className="hire-page">
      <Banner title="Check Out" />
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-sm-12 checkout-form BookEquipment aos-animated">
       <img src={logo} className="mt-3"/>
<div class="content">
  <div class="wrapper-1">
    <div class="wrapper-2">
      <h1>Thank you !</h1>
      <p>Thank you for placing your hire enquiry, LukHire will be in touch shortly regarding your request.  </p>
    
      <Link to='/' class="accent-btn  border-0 py-3 mt-5">
      go home
      </Link>
    </div>

</div>
</div>





            
          </div>

          <div className="col-lg-6 col-sm-12 checkout-card">
            <h4>YOUR HIRE</h4>
            {formData.products.map((item, index) => (
              <div key={item.id} className="border p-3 rounded shadow-sm mb-4">
                <div className="d-flex align-items-center">
                  <img
                    src={`${Api_url}/uploads/${item.image}`}
                    alt={item.name}
                    style={{
                      width: 80,
                      height: 80,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                  <div className="ms-3">
                    <strong>{item.name}</strong>
                    <div className="quantity-controls">
                      <p className="quantity-label">Quantity</p>
                      <span className="quantity-number">{item.quantity}</span>
                    </div>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-md-6">
                    <label>Start Date : {item.startDate}</label>
                  
                  </div>
                  <div className="col-md-6">
                    <label>End Date : {item.endDate}</label>
                    
                   
                  </div>
                </div>
              </div>
            ))}

        
          </div>
        </div>
      </div>
<div className="mt-5"></div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Footer />
    </div>
  )
  }

  return (
    <div className="hire-page">
      <Banner title="Check Out" />
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-sm-12 checkout-form BookEquipment aos-animated">
            <h3>HIRE</h3>
            <p>Please select the anticipated hire period for each item and complete the form below.</p>
            <p>We require you to enter your email address or telephone number in order that we are able to contact you in respect of this enquiry.</p>
            <p>Once you are happy with your enquiry, click the 'Send Basket' button and your request will be emailed to us.</p>

            <div className="form-panel bg-white" >
              {[
                { label: "Name", name: "name", type: "text", required: true },
                { label: "Email Address", name: "email", type: "email", required: true },
                { label: "Eircode", name: "eircode", type: "text" },
                { label: "City/Town", name: "city", type: "text" },
                { label: "County", name: "county", type: "text" },
                { label: "Depot Location", name: "location", type: "text" },
              ].map((field) => (
                <div className="form-group mt-4 mb-4" key={field.name}>
                  <label className="form-label">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    className="form-control bg-white"
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required={field.required || false}
                  />
                </div>
              ))}

              {/* Phone with Country Code */}
              <div className="form-group mt-4 mb-4 focused">
                <label className="form-label">Phone Number</label>
                <div className="d-flex phone-code-div">
                  <span
                    className="phone-code"
                    style={{  borderRadius: "4px", color : 'red' }}
                  >
                    {callingCode}
                  </span>
                  <input
                    type="number"
                    name="phone"
                    className="form-control bg-white number-input"
                    value={formData.phone}
                    onChange={handleInputChange}
                
                  />
                </div>
              </div>

              {/* Country Dropdown */}
              <div className="form-group mt-4 mb-4 focused">
                <label className="form-label">Country</label>
                <select
                  name="country"
                  className="form-control bg-white"
                  value={formData.country}
                  onChange={handleInputChange}
                >
                  <option value="">Select Country</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group mt-4 mb-4">
                <label className="form-label">Additional Information</label>
                <textarea
                  name="information"
                  className="form-control bg-white"
                  rows="3"
                  value={formData.information}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-sm-12 checkout-card">
            <h4>YOUR HIRE</h4>
            {formData.products.map((item, index) => (
              <div key={item.id} className="border p-3 rounded shadow-sm mb-4">
                <div className="d-flex align-items-center">
                  <img
                    src={`${Api_url}/uploads/${item.image}`}
                    alt={item.name}
                    style={{
                      width: 80,
                      height: 80,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                  <div className="ms-3">
                    <strong>{item.name}</strong>
                    <div className="quantity-controls">
                      <p className="quantity-label">Quantity</p>
                      <span className="quantity-number">{item.quantity}</span>
                    </div>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-md-6">
                    <label>Start Date</label>
                    <input
                      type="date"
                      value={item.startDate}
                      onChange={(e) =>
                        handleDateChange(index, "startDate", e.target.value)
                      }
                      className="form-control bg-white"
                    />
                  </div>
                  <div className="col-md-6">
                    <label>End Date</label>
                    <input
                      type="date"
                      value={item.endDate}
                      onChange={(e) =>
                        handleDateChange(index, "endDate", e.target.value)
                      }
                      className="form-control bg-white"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button onClick={handleSubmit} className="accent-btn w-100 border-0 py-3 mt-5" >
              Submit
            </button>
          </div>
        </div>
      </div>
<div className="mt-5"></div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Footer />
    </div>
  );
};

export default HirePage;
