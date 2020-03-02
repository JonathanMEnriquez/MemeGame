import React, { useState } from 'react';
import MenuButton from './MenuButton';
import './css/TitleBody.css';
import Modal from './Modal';

const TitleBody = (props) => {
    const { pregameMode } = props;
    const [optionMode, setOptionMode] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const modalContent = () => {
        return (
            <div className="title-body-modal-content">
                <label htmlFor="fileUpload">New Images</label>
                <input id="fileUpload" type="file"/>
            </div>
        )
    };

    return (
        <div className="title-body">
            <div className={!optionMode ? 'menu' : 'hidden'}>
                <MenuButton text="Begin" clickHandler={pregameMode} />
                <MenuButton text="Options" clickHandler={() => setOptionMode(true)} />
            </div>
            <div className={optionMode ? 'options' : 'hidden'}>
                <div>Options</div>
            </div>
            <div className={optionMode ? 'menu' : 'hidden'}>
                <MenuButton text="Back" clickHandler={() => setOptionMode(false)} />
                <MenuButton text="Add Images" clickHandler={() => setShowModal(true)} />
            </div>
            {showModal &&
                <Modal body={modalContent()} closeMethod={() => setShowModal(false)} />
            }
        </div>
    )
};

export default TitleBody;