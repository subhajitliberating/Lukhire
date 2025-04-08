import React from 'react';
import { Modal, Button } from "react-bootstrap";

const Modalmessage = ({show,message,onClose}) => {
    return (
     <Modal show={show}  centered>

  <div class="modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Message  </h1>
        <button onClick={onClose} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body m-2">
      <h3 className='cus-title-1'>Message From <a className='mail' href={`mailto:"${message?.email}" `}>{message?.email} </a> </h3>
      <h4 className='cus-title-2'>Name: <span> {message?.name} </span> </h4>
    <h4 className='cus-title-2'>Phone Number: <a href={`tel:"${message?.phone}"`}> {message?.phone} </a> </h4>
<h4 className='cus-title-2'>Message</h4>
<hr/>
<p className='message'>
  {message?.message || 'N/A'} 
</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>Close</button>
        <button type="button" class="btn btn-primary" onClick={onClose}>Understood</button>
      </div>
    </div>
  </div>

     </Modal>

    )
}

export default Modalmessage;