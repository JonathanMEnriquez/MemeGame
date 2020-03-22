import React, { useState } from 'react';
import MenuButton from './MenuButton';
import './css/TitleBody.css';
import Modal from './Modal';
import ImageDragAndDrop from './ImageDragAndDrop';
import Collection from './Collection';
import MemeDetail from './MemeDetail';

const TitleBody = (props) => {
    const modalContentOpts = {
        upload: 'UP',
        edit: 'ED',
        detail: 'DE',
    }
    const { pregameMode } = props;
    const [optionMode, setOptionMode] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState();
    const [loadedMeme, setLoadedMeme] = useState();

    const generateModalContent = () => {
        switch(modalContent) {
            case modalContentOpts.upload:
                return <ImageDragAndDrop />;
            case modalContentOpts.edit:
                return <Collection 
                        uploadMode={setUploadMode}
                        showMemeDetail={setDetailMode} />
            case modalContentOpts.detail:
                return <MemeDetail
                        meme={loadedMeme} 
                        returnToCollectionView={setEditMode} />
            default:
                return <div></div>
        }

    };

    const setUploadMode = () => {
        setModalContent(modalContentOpts.upload);
        setShowModal(true);
    }

    const setEditMode = () => {
        setModalContent(modalContentOpts.edit);
        setShowModal(true);
    }

    const setDetailMode = (meme) => {
        setLoadedMeme(meme);
        setModalContent(modalContentOpts.detail);
    }

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
                <MenuButton text="Back" 
                            clickHandler={() => setOptionMode(false)} />
                <MenuButton text="Collection"
                            clickHandler={setEditMode.bind(this)} />
                <MenuButton text="Add Memes"
                            clickHandler={setUploadMode.bind(this)} />
            </div>
            {showModal &&
                <Modal body={generateModalContent()} closeMethod={() => setShowModal(false)} />
            }
        </div>
    )
};

export default TitleBody;