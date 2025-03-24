


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const AddCategory = ({ token }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState({
        Category: "",
        Description: "",
        Parent: "none",
        Parent_id: "0",
        image: null,
        existingImage: ""
    });

    const [allCategories, setAllCategories] = useState([]);
    const [modalMessage, setModalMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const Api_url = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetchAllCategories();
        if (id) fetchCategoryData();
    }, [id]);

    const fetchCategoryData = async () => {
        try {
            const response = await axios.get(`${Api_url}/categories/main/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = response.data;
            setCategory({
                Category: data.Category,
                Description: data.Description,
                Parent: data.Parent === 'main' ? 'none' : data.Parent,
                Parent_id: data.Parent_id,
                image: null,
                existingImage: data.image
            });
        } catch (error) {
            console.error("Error fetching category:", error);
        }
    };

    const fetchAllCategories = async () => {
        try {
            const response = await axios.get(`${Api_url}/categories/main/dropdown`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAllCategories(response.data.respons);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory(prev => ({ ...prev, [name]: value }));
        
        if (name === "Parent" && value !== "none") {
            const selectedCategory = allCategories.find(cat => cat.Category === value);
            setCategory(prev => ({ ...prev, Parent_id: selectedCategory?.id || "0" }));
        }
    };

    const handlePhotoChange = (e) => {
        setCategory(prev => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("Category", category.Category);
        formData.append("Description", category.Description);
        formData.append("Parent", category.Parent === 'none' ? 'main' : category.Parent);
        formData.append("Parent_id", category.Parent_id);
        if (category.image) formData.append("image", category.image);

        try {
            const url = id ? `${Api_url}/categories/main/${id}` : `${Api_url}/categories/main`;
            const method = id ? 'put' : 'post';
            
            const response = await axios[method](url, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            setModalMessage(id ? "Category updated successfully!" : "Category added successfully!");
            setShowModal(true);
            
            if (!id) {
                setCategory({
                    Category: "",
                    Description: "",
                    Parent: "none",
                    Parent_id: "0",
                    image: null,
                    existingImage: ""
                });
            }
            
            fetchAllCategories();
        } catch (error) {
            setModalMessage(error.response?.data?.message || "Operation failed");
            setShowModal(true);
        }
    };

    const handleDeleteImage = () => {
        setCategory(prev => ({ ...prev, image: null, existingImage: "" }));
    };

    const filteredCategories = allCategories.filter(cat =>
        cat.Category.toLowerCase().includes(category.Category.toLowerCase())
    )

    return (
        <div className="container my-4">
             <div className="formStyle">
            <h2 className="mb-4">{id ? 'Edit' : 'Add'} Category</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
        
                <div className="mb-4 category-dropdown">
                        <label className="labelStyle">Category</label>
                        <div className="position-relative">
                            <input
                                type="text"
                                className="form-control inputStyle"
                                required 
                              
                                name="Category"
                                value={category.Category}
                                onChange={handleChange}
                               
                                // onFocus={() => setIsDropdownOpen(true)}
                                // onBlur={() => setIsDropdownOpen(false)}
                                placeholder="Category Name"
                            />
                            {/* {isDropdownOpen && (
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
                                                setCategory(prev => ({
                                                    ...prev,
                                                    Category: cat.Category,
                                                    Parent_id: cat.id
                                                }));
                                                setIsDropdownOpen(false);
                                            }}
                                        >
                                            {cat.Category}
                                        </div>
                                    ))}
                                </div>
                            )} */}
                        </div>
                    </div>

                <div className="mb-3">
                    <label htmlFor="Description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="Description"
                        name="Description"
                        value={category.Description}
                        onChange={handleChange}
                        rows="3"
                      
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="Parent" className="form-label">Parent Category</label>
                    <select
                        className="form-select"
                        id="Parent"
                        name="Parent"
                        value={category.Parent}
                        onChange={handleChange}
                        required
                        disabled={!!id && category.Parent === 'main'}
                    >
                        <option value="none">None (Main Category)</option>
                        {allCategories.map((cat) => (
                            <option key={cat.id} value={cat.Category}>{cat.Category}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Category Image</label>
                    {category.existingImage && (
                        <div className="mb-2">
                            <img
                             required 
                              
                                src={`${Api_url}/uploads/${category.existingImage}`}
                                alt="Current"
                                style={{ width: '100px', marginRight: '10px' }}
                            />
                            {/* <Button variant="danger" size="sm" onClick={handleDeleteImage}>
                                Remove Image
                            </Button> */}
                        </div>
                    )}
                    <div
                        className="border p-3 text-center"
                        style={{ cursor: 'pointer', borderRadius: '5px', borderStyle: 'dashed' }}
                        onClick={() => document.getElementById('imageInput').click()}
                    >
                        {category.image?.name || 'Click to select an image'}
                    </div>
                    <input
                        type="file"
                        className="form-control d-none"
                        id="imageInput"
                        name="image"
                        accept="image/*"
                        onChange={handlePhotoChange}
                    />
                </div>

                <button type="submit" className="btn btn-dark me-2">
                    {id ? 'Update' : 'Add'} Category
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
                    Cancel
                </button>

                {showModal && (
                    <div className="modal show d-block" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Message</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <p>{modalMessage}</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </form>
            </div>
        </div>
    );
};

export default AddCategory;