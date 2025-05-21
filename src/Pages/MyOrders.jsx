import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Banner from "../Component/Banner";
import Footer from "../Component/Footer";


const MyOrders = () => {
  const Api_url = import.meta.env.VITE_API_URL;
  const userToken = localStorage.getItem("lukhiretoken");
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const fetchUserOrders = async () => {
    try {
      const response = await axios.get(`${Api_url}/apiv1/user/order/summery/`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setOrders(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!userToken) {
      navigate("/login");
    }
    fetchUserOrders();
  }, [userToken]);

  return (
    <>
      <div className="main-card">
        <Banner title={"Your Orders"} />
        <div className="container">
        <div className="order-list">
          {orders.length === 0 ? (
            <p className="no-orders">No Orders Found</p>
          ) : (
            orders.map((item) => (
              <div key={item.id} className="order-row">
                <div className="order-image">
                  <img src={`${Api_url}/uploads/${item.img}`} alt={item.productName} />
                </div>
                <div className="order-details">
                  <h3 >{item.productName}</h3>
                  <p><strong>Category:</strong> {item.Category}</p>
                  <p><strong>Start:</strong> {new Date(item.startDate).toLocaleDateString()}</p>
                  <p><strong>End:</strong> {new Date(item.endDate).toLocaleDateString()}</p>
                  <p style={{
                    display : 'flex',
                    flexDirection : 'row'
                  }}><strong>Status:</strong> <span className={`status ${item.orderStatus.toLowerCase()}`}>{item.orderStatus}</span></p>
                  <p><strong>Qty:</strong> {item.quntity}</p>
                </div>
              </div>
            ))
          )}
        </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;
