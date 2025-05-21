import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Badge } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { FaBox, FaTag, FaInfoCircle, FaMoneyBillWave, FaCalendarAlt, FaIdCard } from 'react-icons/fa';
const ProductViewPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
      const [expanded, setExpanded] = useState(false);
    const Api_url = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${Api_url}/products/prouct/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    if (!product) {
        return (
            <Container className="text-center mt-5">
                <div className="spinner-border  p-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </Container>
        );
    }

    // Format dates
    const createdAtDate = new Date(product.createdAt).toLocaleDateString();
    const updatedAtDate = new Date(product.updatedAt).toLocaleDateString();

    const plainText = product?.Specifications.replace(/<[^>]+>/g, '');
  const words = plainText.split(/\s+/);
  const isLong = words.length > 100;

  const truncatedText = words.slice(0, 100).join(' ') + '...';
         
        
            return (
                <Container className="my-5">
                    <Card className="shadow-lg p-4 mb-5 bg-body rounded" style={{ border: 'none' }}>
                        <Row className="g-4">
                            {/* Image Column */}
                            <Col md={6}>
                                <div className="position-relative">
                                    <Card.Img 
                                        variant="top" 
                                        src={`${Api_url}/uploads/${product.image}`} 
                                        alt={product.name} 
                                        className="img-fluid rounded-4 shadow-sm"
                                        style={{ 
                                            maxHeight: '600px', 
                                            objectFit: 'cover',
                                            border: '1px solid #f0f0f0'
                                        }}
                                    />
                                    <Badge 
                                        pill 
                                        bg="dark" 
                                        className="position-absolute top-0 start-0 m-3 px-3 py-2 fs-6 shadow"
                                        style={{ backdropFilter: 'blur(4px)', backgroundColor: 'rgba(0,0,0,0.7)' }}
                                    >
                                        ID: {product.id}
                                    </Badge>
                                </div>
                            </Col>
        
                            {/* Details Column */}
                            <Col md={6}>
                                <Card.Body className="px-3">
                                    {/* Title Section */}
                                    <div className="mb-4 pb-3 border-bottom border-2">
                                        <h1 className="display-5 fw-bold mb-3 text-gradient productview-titile">
                                            {product.name}
                                        </h1>
                                        <div className="d-flex align-items-center gap-2">
                                            {/* <Badge 
                                                pill 
                                                bg={product.hire_status ? "success" : "danger"} 
                                                className="fs-6 px-3 py-2 d-flex align-items-center gap-2"
                                            >
                                                <FaTag className="me-1" />
                                                {product.hire_status ? 'Available' : 'Not Available'}
                                            </Badge> */}
                                        </div>
                                    </div>
        
                                    {/* Main Product Info */}
                                    <Row className="g-3 mb-4">
                                        <Col md={12}>
                                            <div className="bg-light p-3 rounded-3 mb-3 shadow-sm">
                                                <h5 className=" mb-3 d-flex align-items-center gap-2 p-2 basic_info-title ">
                                                    <FaBox  /> Basic Info
                                                </h5>
                                                <dl className="row">
                                                    <div className='basic_info'>
                                                    <dt className="text-muted mx-2">Category:</dt>
                                                    <dd className="fw-medium ">{product.Category}</dd>
                                                     </div>
                                                     <div className='basic_info'>
                                                    <dt className="text-muted mx-2">Quantity:</dt>
                                                    <dd className="fw-medium">{product.quntity}</dd>
                                                    </div>
                                                </dl>
                                            </div>
                                        </Col>
        
                                        {/* <Col md={12}>
                                            <div className="bg-light p-3 rounded-3 mb-3 shadow-sm">
                                                <h5 className=" p-2 mb-3 d-flex align-items-center gap-2">
                                                    <FaMoneyBillWave /> Pricing
                                                </h5>
                                                <dl className="row">
                                                    <dt className="col-sm-5 text-muted">Amount:</dt>
                                                    <dd className="col-sm-7 fw-medium">${product.amount}</dd>
        
                                                    <dt className="col-sm-5 text-muted">Deposit:</dt>
                                                    <dd className="col-sm-7 fw-medium">${product.hire_deposit}</dd>
                                                </dl>
                                            </div>
                                        </Col> */}
                                    </Row>
        
                                    {/* Description & Specifications */}
                                    <div className="mb-4">
                                        <div className="bg-light p-3 rounded-3 mb-3 shadow-sm">
                                            <h5 className=" p-2 mb-3 d-flex align-items-center gap-2 basic_info-title">
                                                <FaInfoCircle /> Details
                                            </h5>
                                            <div className="mb-3">
                                                <h6 className="text-secondary mb-2">Description</h6>
                                                <p className="text-muted mt-1 lead" style={{ lineHeight: '1.6' }}>
                                                    {product.Description}
                                                </p>
                                            </div>
                                            {/* <div>
                                                <h6 className="text-secondary mb-2">Specifications</h6>
                                                <div 
                                                    className="text-muted mt-1 specifications-content"
                                                    style={{ lineHeight: '1.6' }}
                                                    dangerouslySetInnerHTML={{ __html: product.Specifications }} 
                                                />
                                            </div> */}

                                              <div>
      <h6 className="text-secondary mb-2">Specifications</h6>

      <div
        className="text-muted mt-1 specifications-content"
        style={{ lineHeight: '1.6' }}
        dangerouslySetInnerHTML={{
          __html: expanded || !isLong
            ? product.Specifications
            : truncatedText
        }}
      />

      {isLong && (
        <button
          className="btn btn-link p-0 mt-2"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Read Less' : 'Read More'}
        </button>
      )}
    </div>
                                        </div>
                                    </div>
        
                                    {/* Hire Pricing Section */}
                                    <div className="mb-4">
                                        <div className="bg-light p-3 rounded-3 shadow-sm">
                                            <h5 className=" p-2 mb-4 d-flex align-items-center gap-2 basic_info-title">
                                                <FaCalendarAlt /> Hire Rates
                                            </h5>
                                            <Row>
                                                {[
                                                    { days: '1 Day', price: product.hire_price_day_one },
                                                    { days: '2 Days', price: product.hire_price_day_two },
                                                    { days: '3 Days', price: product.hire_price_day_three },
                                                    { days: 'Weekly', price: product.hire_week, fullWidth: true }
                                                ].map((rate, index) => (
                                                    <Col md={rate.fullWidth ? 12 : 4} className='mt-2' key={index}>
                                                        <div className={`bg-white p-3 rounded-2 mb-3 shadow-hover ${!rate.fullWidth ? 'h-100' : ''}`}>
                                                            <div className=" p-2 fw-bold small">{rate.days}</div>
                                                            <div className="h4 text-dark fw-bold mt-2">
                                                                ${rate.price}
                                                            </div>
                                                        </div>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </div>
                                    </div>
        
                                    {/* System Information */}
                                    <div className="mt-4">
                                        <div className="bg-light p-3 rounded-3 shadow-sm">
                                            <h5 className=" p-2 mb-3 d-flex align-items-center gap-2 basic_info-title">
                                                <FaIdCard /> System Info
                                            </h5>
                                            <Row>
                                                <Col md={6}>
                                                    <dl className="row">
                                                        <dt className="col-sm-6 text-muted">Product Code:</dt>
                                                        <dd className="col-sm-6 fw-medium">{product.code}</dd>
                                                    </dl>
                                                </Col>
                                                <Col md={6}>
                                                    <dl className="row">
                                                        <dt className="col-sm-6 text-muted">Category ID:</dt>
                                                        <dd className="col-sm-6 fw-medium">{product.cat_id}</dd>
                                                    </dl>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Container>
    
    );
};

export default ProductViewPage;