
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
        image1: null,
        image2: null,
        image3: null,
        existingImage: "",
        existingImage1: "",
        existingImage2: "",
        existingImage3: "",
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
                image1: null,
                image2: null,
                image3: null,
                existingImage: productData.image || "",
                existingImage1: productData.image1 || "",
                existingImage2: productData.image2 || "",
                existingImage3: productData.image3 || ""
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

    // const handlePhotoChange = (field) => (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         setProduct(prev => ({ ...prev, [field]: file }));
    //     }
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (!product.cat_id) {
    //         setModalMessage("Please select a valid category");
    //         setShowModal(true);
    //         return;
    //     }

    //     const formData = new FormData();
    //     Object.entries(product).forEach(([key, value]) => {
    //         if (value !== null) formData.append(key, value);
    //     });

    //     try {
    //         const url = id ? `${Api_url}/products/prouct/${id}` : `${Api_url}/products/w a`;
    //         const method = id ? "put" : "post";

    //         await axios[method](url, formData, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 "Content-Type": "multipart/form-data",
    //             },
    //         });

    //         setModalMessage(id ? "Product updated!" : "Product added!");
    //         setShowModal(true);
    //         if (!id) setProduct(prev => ({ ...prev, image: null, existingImage: "" }));
    //     } catch (error) {
    //         console.log(error)
    //         setModalMessage(error.response?.data?.message || "Operation failed");
    //         setShowModal(true);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!product.cat_id) {
          setModalMessage("Please select a valid category");
          setShowModal(true);
          return;
        }
      
        const formData = new FormData();
        
        // Handle all fields except images
        const fieldsToSend = [
          'Category', 'name', 'cat_id', 'Description', 'Specifications',
          'hire_price_day_one', 'hire_price_day_two', 'hire_price_day_three',
          'hire_week', 'hire_deposit', 'hire_status', 'amount', 'quntity',
          'hire_weekend', 'power_source', 'type', 'code', 'manufacturer', 'model'
        ];
      
        fieldsToSend.forEach(field => {
          formData.append(field, product[field]);
        });
      
        // Handle image fields and existing image references
        const imageFields = ['image', 'image1', 'image2', 'image3'];
        imageFields.forEach(field => {
          const existingField = `existing${capitalize(field)}`;
          
          // If new file uploaded
          if (product[field]) {
            formData.append(field, product[field]);
          }
          // If existing image reference exists (including swapped ones)
          else if (product[existingField]) {
            formData.append(existingField, product[existingField]);
          }
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
          console.log(error)
          setModalMessage(error.response?.data?.message || "Operation failed");
          setShowModal(true);
        }
      };

    const filteredCategories = allCategories.filter(cat =>
        cat.Category.toLowerCase().includes(product.Category.toLowerCase())
    );


    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    const handlePhotoChange = (field) => (e) => {
      const file = e.target.files[0];
      if (file) {
        setProduct((prev) => ({
          ...prev,
          [field]: file,
          [`existing${capitalize(field)}`]: undefined,
        }));
      }
    };
    
  

    const handleDrop = (targetField) => (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        const draggedField = e.dataTransfer.getData('draggedField');
      
        // Handle file drop from system
        if (file?.type.startsWith('image/')) {
          setProduct(prev => ({
            ...prev,
            [targetField]: file,
            [`existing${capitalize(targetField)}`]: undefined
          }));
          return;
        }
      
        // Handle drag between boxes
        if (draggedField && draggedField !== targetField) {
            setProduct(prev => {
              const newState = { 
                ...prev,
                [targetField]: prev[draggedField],
                [draggedField]: prev[targetField],
                [`existing${capitalize(targetField)}`]: prev[`existing${capitalize(draggedField)}`],
                [`existing${capitalize(draggedField)}`]: prev[`existing${capitalize(targetField)}`]
              };
              
              console.log('Swap debug:', {
                from: draggedField,
                to: targetField,
                newState: {
                  [targetField]: newState[targetField]?.name || newState[`existing${capitalize(targetField)}`],
                  [draggedField]: newState[draggedField]?.name || newState[`existing${capitalize(draggedField)}`]
                }
              });
              return newState;
            });
          }
        };
    
    const renderImageBox = (fieldName, label) => (
      <div className="mb-4">
        <label className="labelStyle">{label}</label>
        <div
          className="border p-3 text-center"
          style={{
            cursor: 'pointer',
            borderRadius: '5px',
            borderStyle: 'dashed',
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            backgroundColor: !product[fieldName] && !product[`existing${capitalize(fieldName)}`] ? '#f8f9fa' : 'transparent',
          }}
          onClick={() => document.getElementById(`${fieldName}Input`).click()}
          onDrop={handleDrop(fieldName)}
          onDragOver={(e) => {
            e.preventDefault();
            e.currentTarget.style.borderColor = '#007bff';
          }}
          onDragLeave={(e) => {
            e.currentTarget.style.borderColor = '';
          }}
          draggable={!!product[fieldName] || !!product[`existing${capitalize(fieldName)}`]}
          onDragStart={(e) => {
            if (product[fieldName] || product[`existing${capitalize(fieldName)}`]) {
              e.dataTransfer.setData('draggedField', fieldName);
              e.currentTarget.style.opacity = '0.5';
            }
          }}
          onDragEnd={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.borderColor = '';
          }}
        >
          {product[fieldName] ? (
            <img
              src={URL.createObjectURL(product[fieldName])}
              alt="Preview"
              style={{
                maxHeight: '100%',
                maxWidth: '100%',
                objectFit: 'contain'
              }}
            />
          ) : product[`existing${capitalize(fieldName)}`] ? (
            <img
              src={`${Api_url}/uploads/${product[`existing${capitalize(fieldName)}`]}`}
              alt="Current"
              style={{
                maxHeight: '100%',
                maxWidth: '100%',
                objectFit: 'contain'
              }}
            />
          ) : (
            <div>
              <i className="fas fa-cloud-upload-alt fa-2x mb-2"></i>
              <p>Click or drag to upload {label}</p>
            </div>
          )}
        </div>
        <input
          type="file"
          className="form-control d-none"
          id={`${fieldName}Input`}
          name={fieldName}
          accept="image/*"
          onChange={handlePhotoChange(fieldName)}
        />
      </div>
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
                        apiKey="ee6ftl5g80zsbp6d1sdlspk1fwuyw1ym2lniiwfbj5ghhhiz"
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
                    <div className="row">
        <div className="col-md-3">
            {renderImageBox('image', 'Main Image')}
        </div>
        <div className="col-md-3">
            {renderImageBox('image1', 'Image 1')}
        </div>
        <div className="col-md-3">
            {renderImageBox('image2', 'Image 2')}
        </div>
        <div className="col-md-3">
            {renderImageBox('image3', 'Image 3')}
        </div>
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