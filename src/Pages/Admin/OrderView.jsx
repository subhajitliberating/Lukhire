import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Col, Row, Spinner, Alert, Badge } from 'react-bootstrap';
import axios from 'axios';
import { FaCalculator, FaFilePdf, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import { format, parseISO } from 'date-fns';
import { MdCancel } from "react-icons/md";
import CancelOrderModal from './CancelOrderModal';
const OrderView = ({token}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const Api_url = import.meta.env.VITE_API_URL;
  const [showCancel, setShowCancel] = useState(false);

  const [alartshow,setAleartShow]=useState(false)
      useEffect(() => {
        if (alartshow) {
          const timer = setTimeout(() => {
            setAleartShow(false);
          }, 3000); // 3000ms = 3 seconds, adjust delay as needed
    
          return () => clearTimeout(timer); // Cleanup on unmount
        }
      }, [alartshow]);


      const fetchOrder = async () => {
        try {
          const response = await axios.get(`${Api_url}/apiv1/orders/${id}`,{
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          });
          setOrder(response.data);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch order details');
          setLoading(false);
        }
      };

  useEffect(() => {


    fetchOrder();
  }, [id,loading,showCancel]);

  const handelCancel = async () => {
  const response = await axios.post(`${Api_url}/apiv1/orders/cancel${id}`);
  
  };

  const handleDownloadReceipt = async () => {
    try {
 
        const response = await axios.get(`${Api_url}/apiv1/${id}/receipt`, {
            
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json' // Add this line
          },
          responseType: 'blob'
        });

        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `receipt-${id}.pdf`); // Use the correct order ID
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);

    } catch (err) {
        setError('Failed to download receipt');
        console.error('Download error:', err);
    }
};

const handleCompleteOrder = async () => {
  try {
    await axios.put(
      `${Api_url}/apiv1/orders/${id}/status`,
      { status: order.orderStatus === 'pending' ? 'processed' : 'completed' }, // Request body
      {
        headers: {
          'Authorization': `Bearer ${token}`, // Move headers here
          'Content-Type': 'application/json',
        },
      }
    );
    // setOrder(prev => ({ ...prev, orderStatus: 'completed' }));
    alert('Order marked as completed!');
    fetchOrder();
  } catch (err) {
    console.log(err);
   
    setError(err.response.data.message);
  }
};


  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-3">
        <Alert variant="danger">{error}</Alert>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          <FaArrowLeft className="me-2" /> Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <CancelOrderModal
  show={showCancel}
  handleClose={() => setShowCancel(false)}
  orderId={order.id}
  Api_url={Api_url}
  setAleartShow={setAleartShow}
  token={token}
/>
{alartshow && (
          <div class="alert alert-success" role="alert">
         The order is Cancelled, .
        </div>
  )}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button variant="secondary" onClick={() => navigate(-1)}>
          <FaArrowLeft className="me-2" /> Back to Orders
        </Button>
        <div className="d-flex gap-2">
          <Button variant="primary btn btn-danger"   disabled={ order.orderStatus === 'Cancelled' || order.orderStatus === 'completed'} onClick={()=>{setShowCancel(true)}}>
            <MdCancel className="me-2" /> Cancel Order
          </Button>
          <Button variant="success" onClick={handleDownloadReceipt}>
            <FaFilePdf className="me-2" /> Download Receipt
          </Button>
          <Button 
            variant="warning" 
            onClick={handleCompleteOrder}
            disabled={order.orderStatus === 'completed'|| order.orderStatus === 'Cancelled'}
          >
            <FaCheckCircle className="me-2" />{order.orderStatus === 'pending' ? 'Accept Order' : 'Mark as Completed'}
          </Button>
        </div>
      </div>

      <Card className="shadow">
        <Card.Body>
          <Card.Title className="mb-4">
            Order #{order.id}
            <Badge 
              bg={order.orderStatus === 'completed' ? 'success' : 'warning'}
              className="ms-3"
            >
              {order.orderStatus.toUpperCase()}
            </Badge>
          </Card.Title>

          <Row className="g-4">
            <Col md={6}>
              <Card className="h-100">
                <Card.Header className="bg-light">Customer Details</Card.Header>
                <Card.Body>
                  <dl className="row">
                    <dt className="col-sm-4">Name</dt>
                    <dd className="col-sm-8">{order.name}</dd>

                    <dt className="col-sm-4">Email</dt>
                    <dd className="col-sm-8">{order.email}</dd>

                    <dt className="col-sm-4">Phone</dt>
                    <dd className="col-sm-8">{order.phone}</dd>

                    <dt className="col-sm-4">Location</dt>
                    <dd className="col-sm-8">{order.location}</dd>

                    <dt className="col-sm-4">Eircode</dt>
                    <dd className="col-sm-8">{order.eircode}</dd>
                  </dl>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="h-100">
                <Card.Header className="bg-light">Order Summary</Card.Header>
                <Card.Body>
                  <dl className="row">
                    <dt className="col-sm-4">Product</dt>
                    <dd className="col-sm-8">{order.ProductName}</dd>

                    <dt className="col-sm-4">Category</dt>
                    <dd className="col-sm-8">{order.Category}</dd>

                    <dt className="col-sm-4">Quantity</dt>
                    <dd className="col-sm-8">{order.quantity}</dd>

                    <dt className="col-sm-4">Total Amount</dt>
                    <dd className="col-sm-8">
                      €{(order.hire_price || order.amount).toLocaleString()}
                    </dd>

                    <dt className="col-sm-4">Order Date</dt>
                    <dd className="col-sm-8">
                      {format(parseISO(order.createdAt), 'PPpp')}
                    </dd>
                  </dl>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {order.hire && (
            <Row className="mt-4">
              <Col>
                <Card>
                  <Card.Header className="bg-light">Hire Details</Card.Header>
                  <Card.Body>
                    <dl className="row">
                      <dt className="col-sm-3">Hire Period</dt>
                      <dd className="col-sm-9">
                        {format(parseISO(order.fromDate), 'PP')} - {' '}
                        {format(parseISO(order.toDate), 'PP')}
                      </dd>

                      <dt className="col-sm-3">Daily Rate</dt>
                      <dd className="col-sm-9">
                        €{order.hire_price.toLocaleString()}
                      </dd>

                      <dt className="col-sm-3">Total Days</dt>
                      <dd className="col-sm-9">
                        {Math.ceil(
                          (new Date(order.toDate) - new Date(order.fromDate)) / 
                          (1000 * 60 * 60 * 24)
                        )} days
                      </dd>
                    </dl>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}

          <Row className="mt-4">
            <Col>
              <Card>
                <Card.Header className="bg-light">Additional Information</Card.Header>
                <Card.Body>
                  <p className="mb-0">{order.information || 'No additional information'}</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default OrderView;