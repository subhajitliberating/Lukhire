



import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FaTimesCircle } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";

const Confirmation = ({ show, message, onClose, onConform }) => {
  return (
    <Modal show={show}  centered>
    <div className="modal-dialog modal-confirm">
		<div className="modal-content">
			<div className="modal-header flex-column">
				<div className="icon-box cus-icon-box">
					<i className=" cus-sucess"><GiConfirmed color="#D3E671"/></i>
				</div>						
				<h4 className="modal-title w-100">Are you sure?</h4>	
               
			</div>
			<div className="modal-body">
				<p>{message}</p>
			</div>
			<div className="modal-footer justify-content-center">
				<button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onClose} >Cancel</button>
				<button type="button" className="btn btn-danger" onClick={onConform} >Confirm</button>
			</div>
		</div>
	</div>
    </Modal>
  );
};

export default Confirmation;

