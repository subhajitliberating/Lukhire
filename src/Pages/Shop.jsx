import React from "react";
import Banner from "../Component/Banner";
import AOS from 'aos';
import { useEffect, useState} from "react";
import Footer from "../Component/Footer";
import axios from "axios";
import { Helmet } from 'react-helmet-async';
import fetchScoData from "../Contex/GetSco";
import { Link ,useLocation,useParams} from "react-router-dom";

const Shop = () => {

    const location = useLocation();
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [search,setSearch]=useState()
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        categories: [],
        powerSources: [],
        types: []
    });

    const [metaData,setMetaData]=useState({})
const Api_url = import.meta.env.VITE_API_URL;

    useEffect(()=>{
      fetchScoData('Shop', setMetaData, Api_url); 
       
    },[])


    useEffect(() => {
        
  
         
    setSearch(categoryName)
    fetchProducts();
        setPage(1);
        setHasMore(true);
    }, [categoryName]);
    
  

    // Initialize AOS
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-back',
            mirror: false,
            anchorPlacement: 'top-center'
        });

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Fetch products when page or filters change
    useEffect(() => {
        if (hasMore) {
            fetchProducts();
        }
    }, [page, filters]);

    const fetchProducts = async () => {
        console.log(typeof(search))
        try {
            setLoading(true);
            const response = await axios.get(`${Api_url}/user/products/`, {
                params: {
                    
                    page,
                    limit: 10,
                    search : categoryName ? categoryName  : '',
                    categories: filters.categories.join(','),
                    powerSources: filters.powerSources.join(','),
                    types: filters.types.join(',')
                }
            });
console.log(response)
            setProducts(prev => [
                ...new Map([...prev, ...response.data.products]
                    .map(product => [product.id, product]))
                .values()
            ]);

            setHasMore(response.data.currentPage < response.data.totalPages);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 400 >= 
            document.documentElement.offsetHeight && !loading && hasMore) {
            setPage(prev => prev + 1);
        }
    };

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: prev[filterType].includes(value) 
                ? prev[filterType].filter(item => item !== value)
                : [...prev[filterType], value]
        }));
        setPage(1);
        setProducts([]);
        setHasMore(true);
        
     
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
                
              
              
             
            <Banner title={'Shop Products'} />

            <section className="c-arrivals-w">
                <div className="container">
                    <div className="row">
                        {/* Filter Sidebar */}
                        <div className="col-lg-3 col-md-4 col-sm-12">
                            <div className="filter">
                                <div className="filter-title">Filter By:</div>
                                
                                {/* Categories Filter */}
                                <div className="category_list">
                                    <div className="categories_title">
                                        <h3>Categories</h3>
                                    </div>
                                    {['Concrete Cutting', 'Toolbox', 'Diamond Core Drilling', 'Others'].map(category => (
                                        <div className="label-block" key={category}>
                                            <input
                                                type="checkbox"
                                                id={category}
                                                checked={filters.categories.includes(category)}
                                                onChange={() => handleFilterChange('categories', category)}
                                            />
                                            <label htmlFor={category}>{category}</label>
                                        </div>
                                    ))}
                                </div>

                                {/* Power Source Filter */}
                                  <div className="category_list">
                                <div className="categories_title">
                                        <h3>Power Source</h3>
                                    </div>
                                    {['Electric', 'Gasoline/Petrol', 'Battery-Powered'].map(source => (
                                        <div className="label-block" key={source}>
                                            <input
                                                type="checkbox"
                                                id={source}
                                                checked={filters.powerSources.includes(source)}
                                                onChange={() => handleFilterChange('powerSources', source)}
                                            />
                                            <label htmlFor={source}>{source}</label>
                                        </div>
                                    ))}
                                </div>

                                {/* Type Filter */}
                                <div className="category_list">
                                    <div className="categories_title">
                                        <h3>Type</h3>
                                    </div>
                                    {['Handheld', 'Standalone', 'Attachment'].map(type => (
                                        <div className="label-block" key={type}>
                                            <input
                                                type="checkbox"
                                                id={type}
                                                checked={filters.types.includes(type)}
                                                onChange={() => handleFilterChange('types', type)}
                                            />
                                            <label htmlFor={type}>{type}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="col-lg-9 col-md-8 col-sm-12">
                            <div className="row g-5">
                                {products.map(product => (
                                    <div className="col-lg-4 col-md-6 col-sm-12" key={product.id} data-aos="fade-up">
                                        <Link to={`/equipment/${encodeURIComponent(product.Category.toLowerCase().replace(/\s+/g, '-'))}/${encodeURIComponent(product.name.toLowerCase().replace(/\s+/g, '-'))}`}> 
                                            <span className="img-panel">
                                                <img 
                                                    src={`${Api_url}/uploads/${product.image}`} 
                                                    alt={product.name} 
                                                    style={{
                                                        height : '200px'
                                                    }}
                                                />
                                            </span>
                                            <span className="text-panel">
                                                <span className="product-title">{product.name}</span>
                                                <span className="product-price">
                                                    €{product.hire_price_day_one}
                                                </span>
                                            </span>
                                        </Link>
                                        <div className="add-to-card">
                                           
                                            <Link className="accent-btn" to={`/equipment/${encodeURIComponent(product.Category.toLowerCase().replace(/\s+/g, '-'))}/${encodeURIComponent(product.name.toLowerCase().replace(/\s+/g, '-'))}`}>
                                                Hire
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                                {products.length  <= 0  && (
                                    <div className="col-lg-4 col-md-6 col-sm-12">
                                        NO PRoduct Found
                                    </div>
                                )}
                            </div>
                            {loading && <div className="text-center my-4">Loading more products...</div>}
                        </div>
                    </div>
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
        <Footer/>
            {/* ... Keep the existing count panel and bottom section ... */}
        </>
    );
};

export default Shop;
 
