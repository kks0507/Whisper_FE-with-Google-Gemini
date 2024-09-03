import React from 'react';
import '../styles/DeleteConfirmationComponent.css';

const DeleteConfirmationComponent = ({ show, onDelete, onCancel }) => {
    if (!show) return null;

    return (
        <div className="modal" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Delete Confirmation</h5>
                        <button type="button" className="close" onClick={onCancel}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete this?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" onClick={onDelete}>Yes</button>
                        <button type="button" className="btn btn-secondary" onClick={onCancel}>No</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationComponent;
