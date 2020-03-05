import React from 'react';
import Dropzone from './Dropzone';
import './css/ImageDragAndDrop.css';
import UploadImg from './img/upload-img.png';
import Path from 'path';
import { generateUniqueImageName } from './utils/Randoms';

const ImageDragAndDrop = (props) => {
    const fs = window.require('fs');
    const icon = { src: UploadImg, alt: 'Add Image(s)' };
    // console.log(fs.Dirent);

    const onDrop = (files) => {
        const memesPath = Path.resolve(__dirname, '/memes');
        const accepted = [];
        for (let f of files) {
            // check the extension of the File
            if (f.type.split('/')[0] === 'image') {
                accepted.push(f);
            }
        }

        for (let img of accepted) {
            console.log('hola ', memesPath);
            // generate random image name
            console.log(img);
            // save to folder
            const imgName = generateUniqueImageName([], '.'.concat(img.name.split('.')[1]));
            // fs.copyFile(img.path, memesPath, (err) => console.log(err ? err : 'went through'));
            // fs.appendFile('testy.txt', 'hola ', null, () => {});
            // fs.appendFile(`./src/memes/${'testy.txt'}`, "hola", undefined, (err) => console.error(err));
            fs.appendFile(`./src/memes/${'testy.txt'}`, "hola", undefined, (err) => console.error(err));
            fs.copyFileSync(img.path, `./src/memes/${imgName}`);
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