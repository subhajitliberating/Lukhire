import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

const AddSco = ({ token }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const editorRef = useRef(null);
    
    const [Sco, setSco] = useState({
        title: "",
        meta_description: "",
        meta_keywords: "",
        page_name: "",
        slug: "",
      
    });

    const [modalMessage, setModalMessage] = useState("");
    const [showModal, setShowModal] = useState(false);

    const Api_url = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (id) fetchScoData();
    }, [id]);

    const fetchScoData = async () => {
        try {
            const response = await axios.get(`${Api_url}/sco/sco/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSco(response.data);
        } catch (error) {
            console.error("Error fetching Sco:", error);
            setModalMessage("Failed to load Sco data");
            setShowModal(true);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSco(prev => ({
            ...prev,
            [name]: value,
            slug: name === "title" ? value.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "") : prev.slug
        }));
    };
    



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = id ? `${Api_url}/sco/sco/${id}` : `${Api_url}/sco/sco`;
            const method = id ? "put" : "post";

            await axios[method](url, Sco, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            setModalMessage(id ? "Sco updated!" : "Sco added!");
            setShowModal(true);
        } catch (error) {
            setModalMessage(error.response?.data?.message || "Operation failed");
            setShowModal(true);
        }
    };

    return (
        <div className="container my-4">
            <div className="formStyle">
                <h2 className="mb-4 text-center" style={{ color: "#34495e" }}>
                    {id ? "Edit Sco" : "Add New Sco"}
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="labelStyle">Title</label>
                        <input
                            type="text"
                            className="form-control inputStyle"
                            name="title"
                            value={Sco.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="labelStyle">Page Name</label>
                        <input
                            type="text"
                            className="form-control inputStyle"
                            name="page_name"
                            value={Sco.page_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="labelStyle">Meta Description</label>
                        <textarea
                            className="form-control inputStyle"
                            style={{ minHeight: "100px" }}
                            name="meta_description"
                            value={Sco.meta_description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="labelStyle">Meta Keywords</label>
                        <textarea
                            className="form-control inputStyle"
                            style={{ minHeight: "100px" }}
                            name="meta_keywords"
                            value={Sco.meta_keywords}
                            onChange={handleChange}
                            required
                        />
                    </div>

                  

                    <button type="submit" className="btn btn-dark me-2">
                        {id ? "Update Sco" : "Add Sco"}
                    </button>
                </form>
            </div>

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

export default AddSco;
