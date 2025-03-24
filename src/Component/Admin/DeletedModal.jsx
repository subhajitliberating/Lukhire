import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FaTimesCircle } from "react-icons/fa";

const DeletedModal = ({ show, message, onClose, onDelete }) => {
  return (
    <Modal show={show}  centered>
    <div className="modal-dialog modal-confirm">
		<div className="modal-content">
			<div className="modal-header flex-column">
				<div className="icon-box">
					<i className="material-icons">&#xE5CD;</i>
				</div>						
				<h4 className="modal-title w-100">Are you sure?</h4>	
               
			</div>
			<div className="modal-body">
				<p>{message}</p>
			</div>
			<div className="modal-footer justify-content-center">
				<button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onClose} >Cancel</button>
				<button type="button" className="btn btn-danger" onClick={onDelete} >Delete</button>
			</div>
		</div>
	</div>
    </Modal>
  );
};

export default DeletedModal;

