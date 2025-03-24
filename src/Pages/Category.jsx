// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './Category.css';
// import axios from 'axios';
// import AOS from 'aos';
// import { useLocation, Link ,useParams, useSearchParams } from 'react-router-dom';
// import Footer from '../Component/Footer';
// import Banner from '../Component/Banner';
// const Category = () => {
//     const location = useLocation();
//   const [searchParams] = useSearchParams();
//   const categoryId = searchParams.get("id");
//     const [category, setCategory] = useState([]);
//     const [page, setPage] = useState(1);
//     const [hasMore, setHasMore] = useState(true);
//     const [loading, setLoading] = useState(false);
//     const Api_url = import.meta.env.VITE_API_URL;

//     useEffect(() => {
//         AOS.init({
//             duration: 1000,
//             easing: 'ease-out-back',
//             mirror: false,
//             anchorPlacement: 'top-center'
//         });

//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     useEffect(() => {
//         setCategory([]); // Reset category on new categoryId
//         setPage(1);
//         setHasMore(true);
//     }, [categoryId]);

//     useEffect(() => {
//         if (hasMore && categoryId) {
//             fetchCategory();
//         }
//     }, [page, categoryId]);

//     const fetchCategory = async () => {
//         try {
//             setLoading(true);
//             const response = await axios.get(
//                 `${Api_url}/user/category/sub/${categoryId}?page=${page}&limit=10`
//             );

//             setCategory((prev) => {
//                 const uniqueCategories = new Map(prev.map((cat) => [cat.id, cat])); // Convert to Map for uniqueness
//                 response.data.categories.forEach((newCat) => {
//                     if (!uniqueCategories.has(newCat.id)) {
//                         uniqueCategories.set(newCat.id, newCat);
//                     }
//                 });
//                 return Array.from(uniqueCategories.values()); // Convert Map back to array
//             });

//             setHasMore(response.data.currentPage < response.data.totalPages);
//         } catch (error) {
//             console.error('Error fetching categories:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleScroll = () => {
//         if (
//             window.innerHeight + document.documentElement.scrollTop + 400 >= 
//             document.documentElement.offsetHeight &&
//             !loading &&
//             hasMore
//         ) {
//             setPage((prev) => prev + 1);
//         }
//     };

//     return (
//         <div className="category-lukhire-access">
          
//             <Banner title={category?.[0]?.Parent}/>

//             <div className="container">
//                 <section className="equipment-categorie aos-animated" id="equipment-categorie">
//                     <div className="container">
//                         <div className="row justify-content-center">
//                             {category.map((cat, index) => (
//                                 <div key={cat.id || `category-${index}`} className="col-lg-3 col-md-6 col-sm-12">
//                                     <div className="box" data-aos="fade-up">
//                                         <Link to={`/shop/${cat.Category}`} state={{ categoryId: cat.id }}>
//                                             <span className="img-panel">
//                                                 <img src={`${Api_url}/uploads/${cat?.image}`} alt={cat?.Category} />
//                                             </span>
//                                             <span className="text-desc">
//                                                 <span className="text" data-aos="fade-up">
//                                                     {cat?.Category}
//                                                 </span>
//                                                 <span className="text view-btn" data-aos="fade-up">
//                                                     {' View Collection → '}
//                                                 </span>
//                                             </span>
//                                         </Link>
//                                     </div>
//                                 </div>
//                             ))}
//                                {category.length  <= 0  && (
//                                     <div className="col-lg-4 col-md-6 col-sm-12">
//                                         NO Category Found
//                                     </div>
//                                 )}
//                         </div>
//                     </div>
//                 </section>

//                 {loading && (
//                     <div className="text-center my-4">
//                         <div className="spinner-border text-primary" role="status">
//                             <span className="visually-hidden">Loading...</span>
//                         </div>
//                     </div>
//                 )}

//                 {!hasMore && (
//                     <div className="text-center my-4 text-muted">
//                         No more categories to load
//                     </div>
//                 )}
//             </div>
// <Footer/>
//         </div>
//     );
// };

// export default Category;









import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Category.css';
import axios from 'axios';
import AOS from 'aos';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Footer from '../Component/Footer';
import Banner from '../Component/Banner';

const Category = () => {
    const { categoryName } = useParams();
    const navigate = useNavigate();
    const [categoryData, setCategoryData] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const Api_url = import.meta.env.VITE_API_URL;

    // Clean up category name for display
    const cleanCategoryName = decodeURIComponent(categoryName)
        .replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());

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

    useEffect(() => {
        const fetchCategoryId = async () => {
            try {
                const response = await axios.get(`${Api_url}/user/category`);
                const categories = response.data;
                
                // Find category by cleaned name
                const matchedCategory = categories.find(cat => 
                    cat.Category.toLowerCase() === cleanCategoryName.toLowerCase()
                );

                if (!matchedCategory) {
                    navigate('/404', { replace: true });
                    return;
                }

                setCategoryData(matchedCategory);
                loadSubCategories(matchedCategory.id, 1); // Start with page 1

            } catch (error) {
                console.error('Error fetching categories:', error);
                navigate('/404', { replace: true });
            }
        };

        fetchCategoryId();
    }, [categoryName]);

    const loadSubCategories = async (categoryId, pageNumber) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${Api_url}/user/category/sub/${categoryId}?page=${pageNumber}&limit=10`
            );

            setSubCategories((prev) => {
                                const uniqueCategories = new Map(prev.map((cat) => [cat.id, cat])); // Convert to Map for uniqueness
                             response.data.categories.forEach((newCat) => {
                                    if (!uniqueCategories.has(newCat.id)) {
                                        uniqueCategories.set(newCat.id, newCat);
                                     }
                               });
                              return Array.from(uniqueCategories.values()); // Convert Map back to array
                             });


       
            setHasMore(response.data.currentPage < response.data.totalPages);
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 400 >= 
            document.documentElement.offsetHeight && !loading && hasMore) {
            setPage(prev => {
                loadSubCategories(categoryData.id, prev + 1);
                return prev + 1;
            });
        }
    };

    return (
        <div className="category-lukhire-access">
            <Banner title={cleanCategoryName} />

            <div className="container">
                <section className="equipment-categorie aos-animated" id="equipment-categorie">
                    <div className="container">
                        <div className="row justify-content-center">
                            {subCategories.map((cat, index) => (
                                  <div key={cat.id || `category-${index}`} className="col-lg-3 col-md-6 col-sm-12">
                                                                      <div className="box" data-aos="fade-up">
                                                                      <Link to={`/shop/${encodeURIComponent(cat.Category.toLowerCase().replace(/\s+/g, '-'))}`}>
                                                                          {/* <Link to={`/shop/${encodeURIComponent(cat.Category.toLowerCase().replace(/\s+/g, '-'))}/${encodeURIComponent(cat.id)}`}> */}
                                                                              <span className="img-panel">
                                                                                  <img src={`${Api_url}/uploads/${cat?.image}`} alt={cat?.Category} />
                                                                              </span>
                                                                              <span className="text-desc">
                                                                                  <span className="text" data-aos="fade-up">
                                                                                      {cat?.Category}
                                                                                 </span>
                                                                                 <span className="text view-btn" data-aos="fade-up">
                                                                                    {' View Collection → '}
                                                                                 </span>
                                                                           </span>
                                                                         </Link>
                                                                     </div>
                                                                  </div>
                            ))}
                            
                            {subCategories.length === 0 && !loading && (
                                <div className="col-12 text-center py-5">
                                    <h3>No subcategories found</h3>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {loading && (
                    <div className="text-center my-4">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}

                {!hasMore && subCategories.length > 0 && (
                    <div className="text-center my-4 text-muted">
                        End of list
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Category;
