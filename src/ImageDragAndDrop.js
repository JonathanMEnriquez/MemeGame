import React from 'react';
import Dropzone from './Dropzone';
import './css/ImageDragAndDrop.css';
import UploadImg from './img/upload-img.png';
import { generateUniqueImageName } from './utils/Randoms';

const ImageDragAndDrop = (props) => {
    const fs = window.require('fs');
    const icon = { src: UploadImg, alt: 'Add Image(s)' };

    const onDrop = (files) => {
        for (let f of files) {
            if (f.type.split('/')[0] === 'image') {
                const imgName = generateUniqueImageName([], '.'.concat(f.name.split('.')[1]));
                fs.copyFileSync(f.path, `./src/memes/${imgName}`);
                // TODO add data to db
            }
        }
    }

    return (
        <div className="title-body-modal-content">
            <Dropzone onDrop={onDrop} icon={icon} text="Drop new images to add to your game collection!" />
        </div>
    );
}

export default ImageDragAndDrop;