import React from 'react';
import Dropzone from './Dropzone';
import './css/ImageDragAndDrop.css';
import UploadImg from './img/upload-img.png';

const ImageDragAndDrop = (props) => {
    const icon = { src: UploadImg, alt: 'Add Image(s)' };

    const onDrop = (files) => {
        const accepted = [];
        // console.log(files);
        for (let f of files) {
            if (f.type.split('/')[0] === 'image') {
                console.log(f.type + ' is good!');
            }
        }
        // check the extension of the File
        // get fs to give you abs path and save files
    }

    return (
        <div className="title-body-modal-content">
            <Dropzone onDrop={onDrop} icon={icon} text="Drop new images to add to your game collection!" />
        </div>
    );
}

export default ImageDragAndDrop;