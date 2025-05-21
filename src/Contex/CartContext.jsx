import React, { createContext, useState, useEffect } from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Create the context
export const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [hiredProducts, setHiredProducts] = useState(() => {
    return JSON.parse(localStorage.getItem('hiredProducts')) || [];
  });

  // Sync with localStorage whenever hiredProducts changes
  useEffect(() => {
    localStorage.setItem('hiredProducts', JSON.stringify(hiredProducts));
  }, [hiredProducts]);

//   const addToCart = (product, quantity) => {
//     setHiredProducts(prev => {
//       const existing = prev.find(p => p.id === product.id);
//      if (existing) {
//   return prev.map(p =>
//     p.id === product.id ? { ...p, quantity: quantity } : p
//   );
// }

//       return [...prev, { ...product, quantity }];
//     });
//   };

const addToCart = (product, quantity) => {
  setHiredProducts((prevProducts) => {
    
    const exists = prevProducts.find((item) => item.id === product.id);

    if (exists) {
      // Update quantity if already exists

      return prevProducts.map((item) =>
        
        item.id === product.id ? { ...item, quantity } : item
      );
      
    } else {
      // Add new product with quantity
      return [...prevProducts, { ...product, quantity }];
    }
  });
};




  const removeFromCart = (id) => {
    setHiredProducts(prev => prev.filter(item => item.id !== id));
     toast.error("Product Remove from Cart");
  };

  return (
    <CartContext.Provider value={{ hiredProducts, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
