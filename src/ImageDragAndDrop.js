import React from 'react';
import Dropzone from './Dropzone';
import './css/ImageDragAndDrop.css';
import UploadImg from './img/upload-img.png';
import Path from 'path';
import { generateUniqueImageName } from './utils/Randoms';

const ImageDragAndDrop = (props) => {
    const fs = window.require('fs');
    const icon = { src: UploadImg, alt: 'Add Image(s)' };

    const onDrop = (files) => {
        const memesPath = Path.resolve(__dirname, '..');
        const accepted = [];
        for (let f of files) {
            // check the extension of the File
            if (f.type.split('/')[0] === 'image') {
                accepted.push(f);
            }
        }

        for (let img of accepted) {
            console.log(memesPath);
            // generate random image name
            console.log(img);
            // save to folder
            const imgName = generateUniqueImageName([], '.'.concat(img.name.split('.')[1]));
            // fs.appendFile(imgName, f, {}, (err) => console.error(err));
            console.log(img.toString());
            const data = JSON.stringify(img).replace(/^data:image\/\w+;base64,/, "");
            const buf = new Buffer(data, 'base64');
            fs.appendFile(`./src/memes/${imgName}`, data, undefined, (err) => console.error(err));
            // add data to db
        }
        // get fs to give you abs path and save files
    }

    return (
        <div className="title-body-modal-content">
            <Dropzone onDrop={onDrop} icon={icon} text="Drop new images to add to your game collection!" />
        </div>
    );
}

export default ImageDragAndDrop;