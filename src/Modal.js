import React from 'react';
import './css/Modal.css';
import Close from './img/cross.png';

const Modal = (props) => {
    const { body, closeMethod } = props;

    return (
        <div className="modal">
            <div className="modal-dialog">
                <div className="modal-header">
                    <img src={Close} onClick={closeMethod} alt="x" />
                </div>
                <div className="modal-content">
                    {body}
                </div>
            </div>
        </div>
    )
}

export default Modal;