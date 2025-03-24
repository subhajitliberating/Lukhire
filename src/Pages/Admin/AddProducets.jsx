
import React, { useState, useEffect,useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import { Editor } from "@tinymce/tinymce-react";
const AddProducts = ({ token }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const editorRef = useRef(null);
    const [product, setProduct] = useState({
        Category: "",
        name:'',
        cat_id: "",
        Description: "",
        Specifications: " ENTER YOUR SPECIFICATIONS HERE ",
        hire_price_day_one: "",
        hire_price_day_two: "",
        hire_price_day_three: "",
        hire_week: "",
        hire_deposit: "",
        hire_status: false,
        amount: "",
        image: null,
        existingImage: "",
        quntity: 0,
        hire_weekend : "",
        power_source : '',
        type :"",
        code : "",
        manufacturer : '',
        model : ''
    });

    const [allCategories, setAllCategories] = useState([]);
    const [modalMessage, setModalMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showSpecsModal, setShowSpecsModal] = useState(false);

    const Api_url = import.meta.env.VITE_API_URL;
    const handleEditorChange = (content) => {
        setProduct((prevProduct) => ({ ...prevProduct, Specifications: content }));
      };

    // Styled components
   

    useEffect(() => {
        fetchAllCategories();
        if (id) fetchProductData();
    }, []);

    const fetchAllCategories = async () => {
        try {
            const response = await axios.get(`${Api_url}/categories/main/sub/dropdown`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAllCategories(response.data.respons);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const fetchProductData = async () => {
        try {
            const response = await axios.get(`${Api_url}/products/prouct/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const productData = response.data;
            setProduct({
                ...productData,
                image: null,
                existingImage: productData.image
            });
            console.log(response);
        } catch (error) {
            console.error("Error fetching product:", error);
            setModalMessage("Failed to load product data");
            setShowModal(true);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
            ...(name === "Category" && { cat_id: "" })
        }));
    };

    const handlePhotoChange = (e) => {
        setProduct(prev => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!product.cat_id) {
            setModalMessage("Please select a valid category");
            setShowModal(true);
            return;
        }

        const formData = new FormData();
        Object.entries(product).forEach(([key, value]) => {
            if (value !== null) formData.append(key, value);
        });

        try {
            const url = id ? `${Api_url}/products/prouct/${id}` : `${Api_url}/products/prouct`;
            const method = id ? "put" : "post";

            await axios[method](url, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            setModalMessage(id ? "Product updated!" : "Product added!");
            setShowModal(true);
            if (!id) setProduct(prev => ({ ...prev, image: null, existingImage: "" }));
        } catch (error) {
            setModalMessage(error.response?.data?.message || "Operation failed");
            setShowModal(true);
        }
    };

    const filteredCategories = allCategories.filter(cat =>
        cat.Category.toLowerCase().includes(product.Category.toLowerCase())
    );

    // const cleanSpecs = DOMPurify.sanitize(product.Specifications.replace(/\n/g, '<br>'));

    return (
        <div className="container my-4">
            <div className="formStyle">
                <h2 className="mb-4 text-center" style={{ color: '#34495e' }}>
                    {id ? "Edit Product" : "Add New Product"}
                </h2>
                
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    {/* Category Dropdown */}
                    <div className="mb-4 category-dropdown">
                        <label className="labelStyle">Category</label>
                        <div className="position-relative">
                            <input
                                type="text"
                                className="form-control inputStyle"
                                
                                value={product.Category}
                                name="Category"
                                onChange={handleChange}
                                onFocus={() => setIsDropdownOpen(true)}
                                placeholder="Search category..."
                            />
                            {isDropdownOpen && (
                                <div className="border mt-1 shadow-sm" style={{
                                    maxHeight: '200px',
                                    overflowY: 'auto',
                                    position: 'absolute',
                                    width: '100%',
                                    zIndex: 1000,
                                    background: 'white',
                                    borderRadius: '8px'
                                }}>
                                    {filteredCategories.map(cat => (
                                        <div
                                            key={cat.id}
                                            className="p-2 hover-cursor"
                                            style={{ 
                                                cursor: 'pointer',
                                                transition: 'background 0.2s',
                                                borderBottom: '1px solid #eee'
                                            }}
                                            onClick={() => {
                                                setProduct(prev => ({
                                                    ...prev,
                                                    Category: cat.Category,
                                                    cat_id: cat.id
                                                }));
                                                setIsDropdownOpen(false);
                                            }}
                                        >
                                            {cat.Category}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="labelStyle">Name</label>
                        <input type="text" 
                            className="form-control inputStyle"
                           
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label className="labelStyle">Description</label>
                        <textarea
                            className="form-control inputStyle"
                            style={{ minHeight: '100px' }}
                            name="Description"
                            value={product.Description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Specifications */}
                    <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <label className="labelStyle">Specifications</label>
                            <button
                                type="button"
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => setShowSpecsModal(true)}
                            >
                                Preview Specs
                            </button>
                        </div>
                        <Editor
                        apiKey="imcj5lcwtj7zoi1bcf6gwnbkzzkgvxnkso4u0f340egont3p"
                        onInit={(_, editor) => editorRef.current = editor}
                        initialValue={product.Specifications}
                        init={{
                          height: 500,
                          menubar: false,
                          plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                          ],
                          toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                        onChange={(e) => handleEditorChange(e.target.getContent())}
                      />
                    </div>

                    {/* Pricing Section */}
                    <div className="row mb-4 g-3">
                        <div className="col-md-3">
                            <label className="  labelStyle">Day 1 Price (£)</label>
                            <input
                             
                                type="number"
                                className="form-control inputStyle"
                                name="hire_price_day_one"
                                value={product.hire_price_day_one}
                                onChange={handleChange}
                                onWheel={(e) => e.target.blur()}
                                required
                            />
                        </div>
                        <div className="col-md-3">
                        <label className=" labelStyle" >Day 2 Price</label>
                        <input
                        onWheel={(e) => e.target.blur()}
                            type="number"
                            className="form-control inputStyle"
                            name="hire_price_day_two"
                            value={product.hire_price_day_two}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="labelStyle">Day 3 Price</label>
                        <input
                        onWheel={(e) => e.target.blur()}
                            type="number"
                            className="form-control inputStyle"
                            name="hire_price_day_three"
                            value={product.hire_price_day_three}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="labelStyle">Weekly Price</label>
                        <input
                        onWheel={(e) => e.target.blur()}
                            type="number"
                            className="form-control inputStyle"
                            name="hire_week"
                            value={product.hire_week}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

              

              
               

                    {/* Stock Section */}
                    <div className="row mb-4 g-3">
                        <div className="col-md-4">
                            <label className="labelStyle">Deposit (£)</label>
                            <input
                             
                                type="number"
                                className="form-control inputStyle"
                                name="hire_deposit"
                                value={product.hire_deposit}
                                onChange={handleChange}
                                onWheel={(e) => e.target.blur()}
                                required
                            />
                        </div>
                        <div className="col-md-4">
                        <label className=" labelStyle">Stock Quantity</label>
                        <input 
                        onWheel={(e) => e.target.blur()}
                            type="number"
                            className="form-control inputStyle"
                            name="quntity"
                            value={product.quntity}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-4">
                        <label className=" labelStyle">Amount</label>
                        <input 
                        onWheel={(e) => e.target.blur()}
                            type="number"
                            className="form-control inputStyle"
                            name="amount"
                            value={product.amount}
                            onChange={handleChange}
                            required
                        />
                    </div>
                       </div>
                

                    {/* Image Upload */}
                    <div className="mb-4">
                        <label className="labelStyle">Product Image</label>
                      
                             <div
                        className="border p-3 text-center"
                        style={{ cursor: 'pointer', borderRadius: '5px', borderStyle: 'dashed' }}
                        onClick={() => document.getElementById('imageInput').click()}
                    >
                        {product.image?.name || 'Click to select an image'}
                    </div>
                    <input
                        type="file"
                        className="form-control d-none"
                        id="imageInput"
                        name="image"
                        accept="image/*"
                        onChange={handlePhotoChange}
                    />
             
                        {id && product.existingImage && (
                            <div className="mt-3 text-center">
                                <img
                                    src={`${Api_url}/uploads/${product.existingImage}`}
                                    alt="Current"
                                    style={{ 
                                        maxWidth: '300px',
                                        borderRadius: '10px',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
        <label className="labelStyle">Product Type</label>
        <select 
            className="form-select inputStyle"
            name="type"
            value={product.type}
            onChange={handleChange}
            required
        >
            <option value="">Select Product Type</option>
            <option value="Handheld">Handheld</option>
            <option value="Standalone">Standalone</option>
            <option value="Attachment">Attachment</option>
        </select>
    </div>

    {/* Additional Fields */}
    <div className="row mb-4 g-3">
        <div className="col-md-4">
            <label className="labelStyle">Power Source</label>
            <input
                type="text"
                className="form-control inputStyle"
                name="power_source"
                value={product.power_source}
                onChange={handleChange}
                required
            />
        </div>
        
        <div className="col-md-4">
            <label className="labelStyle">Manufacturer</label>
            <input
                type="text"
                className="form-control inputStyle"
                name="manufacturer"
                value={product.manufacturer}
                onChange={handleChange}
                required
            />
        </div>

        <div className="col-md-4">
            <label className="labelStyle">Model Number</label>
            <input
                type="text"
                className="form-control inputStyle"
                name="model"
                value={product.model}
                onChange={handleChange}
                required
            />
        </div>
    </div>

    <div className="row mb-4 g-3">
        <div className="col-md-6">
            <label className="labelStyle">Product Code</label>
            <input
                type="text"
                className="form-control inputStyle"
                name="code"
                value={product.code}
                onChange={handleChange}
                required
            />
        </div>
        
        <div className="col-md-6">
            <label className="labelStyle">Weekend Rate (£)</label>
            <input
                type="number"
                className="form-control inputStyle"
                name="hire_weekend"
                value={product.hire_weekend}
                onChange={handleChange}
                onWheel={(e) => e.target.blur()}
                required
            />
        </div>
    </div>

                    {/* Submit Button */}
                 
                        <button 
                            type="submit" 
                            className="btn btn-dark me-2"
                        
                        >
                            {id ? "Update Product" : "Add Product"}
                        </button>
                
                </form>
            </div>

            {showSpecsModal && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content" style={{ borderRadius: '12px' }}>
                            <div className="modal-header">
                                <h5 className="modal-title">Specifications Preview</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowSpecsModal(false)}
                                />
                            </div>
                            <div className="modal-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                                <div dangerouslySetInnerHTML={{ __html: product.Specifications }} />
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowSpecsModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Success/Error Modal */}
            {showModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Notification</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => {
                                        setShowModal(false);
                                        if (!id && !modalMessage.includes("fail")) navigate(-1);
                                    }}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>{modalMessage}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddProducts;