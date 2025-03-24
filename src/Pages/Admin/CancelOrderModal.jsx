import React, { useState,useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

const CancelOrderModal = ({ show, handleClose, orderId, Api_url,setAleartShow,token }) => {
  const [reason, setReason] = useState("");
  

  const handleCancel = async () => {
    try {
      const response = await axios.post(`${Api_url}/apiv1/orders/cancel/${orderId}`, { reason },{
        headers: {
            'Authorization': `Bearer ${token}`
        }
      });
     
      handleClose();
      setAleartShow(true)
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Failed to cancel the order.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cancel Order #{orderId}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Reason for Cancellation</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleCancel}>
          Cancel Order
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CancelOrderModal;
