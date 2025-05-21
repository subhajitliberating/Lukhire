import React, { useContext, useEffect, useState } from "react";
import Banner from "../Component/Banner";
import { CartContext } from '../Contex/CartContext';
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../Component/Footer";
const Card = () => {
  const Api_url = import.meta.env.VITE_API_URL;
  const { hiredProducts, removeFromCart, addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await Promise.all(
       hiredProducts.map(async (hired,index) => {
  const nameWithoutSpaces = hired.name.replace(/\s+/g, ''); 
  console.log(nameWithoutSpaces)
  // remove all spaces
  const res = await axios.get(`${Api_url}/user/single/product/${hired.slugto}`);
  return {
    ...res.data,
    quantity: hired.quantity,
  };
})

        );

        // Prevent duplicates based on product ID
        const uniqueProducts = fetchedProducts.reduce((acc, product) => {
          const exists = acc.find(p => p.id === product.id);
          if (!exists) acc.push(product);
          return acc;
        }, []);

        setProducts(uniqueProducts);
      } catch (error) {
        console.log(error);
      }
    };

    if (hiredProducts.length > 0) {
      fetchProducts();
    } else {
      setProducts([]);
    }
  }, [JSON.stringify(hiredProducts)]); // Use JSON.stringify to track deep changes

 const handleQuantityChange = (product, newQuantity) => {
    console.log("productid:",product)
  if (newQuantity < 1) {
    removeFromCart(product.id); // or product._id if that's what you use
  } else {
    addToCart(product, newQuantity); // Ensure quantity is updated, not added again
  }
};

  const totalItems = products.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
    <div className="main-card">
      <Banner title={'Cart'} />
      
      <div className="card-items-container">
        {products.length === 0 && (
      <div class="container-fluid">
				 <div class="row">
				 
					<div class="col-md-12">
					
							<div class="emty-card">
				
						<div class="emty-card-body emty-cart">
								<div class="col-sm-12 empty-cart-cls text-center d-flex" style={{
                  flexDirection: 'column',
                  alignItems : 'center'
                }}>
									<i class="fa-solid fa-cart-arrow-down" style={{
                    fontSize: '100px',
                    color : '#cc1e28'
                  }}></i>
									<h3 className="emty-cart-text mt-3"><strong>Your Cart is Empty</strong></h3>
									<div style={{
                    width : '50%'
                  }}>
									<Link to="/hire" class="accent-btn w-100 border-0 py-3 mt-3 mb-3"  data-abc="true">Continue Shopping</Link>
									</div>
								
								</div>
						</div>
				</div>
						
					
					</div>
				 
				 </div>
				
				</div>
        )}
        {products.map((item) => (
          <div key={item.id} className="card-item">
            <div className="item-info">
            <img src={`${Api_url}/uploads/${item.image}`} style={{
              width: '80px',
              height: '80px',
              objectFit:'contain',
              borderRadius:'10px'
            }} />
            <div>
              <p className="item-name">{item.name}</p>
              <p className="item-name"><strong>Category:</strong> {item.Category}</p>
            </div>
            </div>
            
            
            <div className="quantity-controls">
              <p className="quantity-label">Quantity</p>
              <button 
                className="quantity-btn"
                onClick={() => handleQuantityChange(item, item.quantity - 1)}
              >-</button>
              <span className="quantity-number">{item.quantity}</span>
              <button 
                className="quantity-btn"
                onClick={() => handleQuantityChange(item, item.quantity + 1)}
              >+</button>
            </div>

            <i
              className="fa-solid fa-xmark remove-icon"
              onClick={() => removeFromCart(item.id)}
              style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }}
            ></i>
          </div>
        ))}
      </div>
       {products.length > 0 && (
        <div className="card-items-container">
      <div className="card-item" style={{
       
        display: 'flex',
        alignItems : 'end',
        flexDirection : 'column',
        margin: '0px 50px',
        border : 'none'
        
      }}>
	<Link to="/checkout"  state={{ products }} class="accent-btn border-0 py-3 mt-3 mb-3" style={{
    width : '200px',

  }}  data-abc="true">Checkout</Link>
<li className="cus-link">
  	<Link to="/hire"  state={{ products }}    data-abc="true">Continue Shopping</Link> </li>
    </div>
  </div> )}
    
     {/* {products.length > 0 && (
        <div className="checkout-section">
          <div className="total-items">{totalItems} item{totalItems > 1 ? 's' : ''} hired</div>
    <Link
  to="/hire"
  className="checkout-button"
 
>
  Go Back
</Link>
        </div>
      )} */}
 
    </div>
         <Footer/>
    </>

  );
};

export default Card;
