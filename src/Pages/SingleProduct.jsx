import React from "react";
import AOS from 'aos';
import { useEffect, useState} from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Banner from "../Component/Banner";
import Footer from "../Component/Footer";
const SingleProduct = () => {
    const { categoryName, name } = useParams();
    const [products, setProducts] = useState([]);
    const [singleProduct, setSingleProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const Api_url = import.meta.env.VITE_API_URL;

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

    const handleQuantity = (operation) => {
        setQuantity(prev => {
            if(operation === 'inc') return prev + 1;
            if(operation === 'dec' && prev > 1) return prev - 1;
            return prev;
        });
    };

    if(!singleProduct) return <div>Loading...</div>;

    return (
        <div className="category-lukhire-access">
            <Banner title={singleProduct?.name}/>
            <section className="singlequipment aos-animated" id="singlequipment">
                <div className="container">
                    <div className="breadcrumbs">
                        <ul>
                            <li><Link to="/">Home / </Link></li>
                            <li><Link to="/hire">Equipment / </Link></li>
                            <li><Link to={`/shop/${categoryName}`}>{categoryName} / </Link></li>
                            <li>{singleProduct.name}</li>
                        </ul>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-12">
                            <div className="lf-side">
                                <div id="sync1" className="owl-carousel">
                                    {productImages.map((img, index) => (
                                        <div key={index} className="img-panel">
                                            <img src={`${Api_url}/uploads/${img}`} alt={singleProduct.name} />
                                        </div>
                                    ))}
                                </div>
                                <div id="sync2" className="owl-carousel">
                                    {productImages.map((img, index) => (
                                        <div key={index} className="item">
                                            <img src={`${Api_url}/uploads/${img}`} alt="thumb" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
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
                                <p className="text mb-4">
                                    <b>Description:</b> {singleProduct.Description}
                                </p>
                                <p className="text mb-4">
                                    <b>Specifications:</b>  <div dangerouslySetInnerHTML={{ __html: singleProduct.Specifications }} />
                                </p>
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
    <Link 
        to={`/hire/${categoryName}/${singleProduct.slugto}`}
        className="accent-btn w-100 border-0 py-3"
    >
        Hire
    </Link>
</div>
                                <p className="text my-3">{singleProduct.note}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="equipmentitems aos-animated" id="equipmentitemproducts">
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
                                            to={`/category/${categoryName}/${product.slug}`} 
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
            </section>
            <Footer/>
        </div>
    )
}

export default SingleProduct;


