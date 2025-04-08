import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Login from './Pages/Admin/Login';
import Admin from './Pages/Admin/Admin';
import Categories from './Pages/Admin/Categories';
import AddCategory from './Pages/Admin/AddCategory';
import SubCategory from './Pages/Admin/SubCategory';
import Producets from './Pages/Admin/Producets';
import AddProducts from './Pages/Admin/AddProducets';
import ProductViewPage from './Pages/Admin/ProductViewPage';
import Orders from './Component/Admin/Orders';
import DashboardHome from './Pages/Admin/DashboardHome';
import OrderView from './Pages/Admin/OrderView';
import Home from './Pages/Home';
import Main from './Pages/Main';
import Category from './Pages/Category';
import Shop from './Pages/Shop';
import SingleProduct from './Pages/SingleProduct';
import About from './Pages/About';
import Hire from './Pages/Hire';
import Faq from './Pages/Faq';
import Contact from './Pages/Contact';
import HirePage from './Pages/HirePage';
import Sco from './Component/Admin/Sco';
import AddSco from './Pages/Admin/AddSco';
import AdminContact from './Pages/Admin/AdminContact';
import { HelmetProvider } from 'react-helmet-async';
function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const valu = sessionStorage.getItem('token');
    setToken(valu);
  }, []);

  return (
    <HelmetProvider>
    <BrowserRouter>
      <AppRoutes token={token} setToken={setToken} />
    </BrowserRouter>
    </HelmetProvider>
  );
}

// Wrap Routes in a Component That Forces Re-render on Route Change
const AppRoutes = ({ token, setToken }) => {
  const location = useLocation(); // Get current route


  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on route change
  }, [location.pathname]);
  return (

    <Routes key={location.pathname}> {/* Forces re-render on every route change */}
      {token && (
        <Route path="/admin" element={<Admin setToken={setToken} />}>
          <Route path="categories" element={<Categories token={token} />} />
          <Route path="addcategory" element={<AddCategory token={token} />} />
          <Route path="editcategory/:id" element={<AddCategory token={token} />} />
          <Route path=":name/categories/:id" element={<SubCategory token={token} />} />
          <Route path="productes" element={<Producets token={token} />} />
          <Route path="addproductes" element={<AddProducts token={token} />} />
          <Route path="editproduct/:id" element={<AddProducts token={token} />} />
          <Route path=":name/productview/:id" element={<Producets token={token} />} />
          <Route path="productview/:id" element={<ProductViewPage token={token} />} />
          <Route path="orders" element={<Orders token={token} />} />
          <Route path="dashboard" element={<DashboardHome token={token} />} />
          <Route path="orderview/:id" element={<OrderView token={token} />} />
          <Route path="sco" element={<Sco token={token} />} />
          <Route path="addsco" element={<AddSco token={token} />} />
          <Route path="scoview/:id" element={<AddSco token={token} />} />
          <Route path="message" element={<AdminContact token={token} />} />
          <Route path="editsco/:id" element={<AddSco token={token} />} />

        </Route>
      )}
      <Route path="/admin/login" element={<Login setToken={setToken} />} />
      <Route path="/" element={<Main />}>
        <Route index element={<Home />} />
        <Route path="equipment/:categoryName" element={<Category />} />
        <Route path="shop" element={<Shop />} />
        <Route path="shop/:categoryName" element={<Shop />} />
        <Route path="equipment/:categoryName/:name" element={<SingleProduct />} />
        <Route path="about" element={<About />} />
        <Route path="hire" element={<Hire />} />
        <Route path="faq" element={<Faq />} />
        <Route path="contact" element={<Contact />} />
    
<Route path="/hire/:category/:product" element={<HirePage />} />
       
      </Route>
    </Routes>
  );
};

export default App;
