import React, {useState} from 'react';
import Dropzone from './Dropzone';
import './css/ImageDragAndDrop.css';
import UploadImg from './img/upload-img.png';
import { generateUniqueImageName } from './utils/Randoms';
import PreviewImage from './classes/Meme';
import Meme from './Meme';
import { storeNewImage } from './Renderer';

const ImageDragAndDrop = (props) => {
    const icon = { src: UploadImg, alt: 'Add Image(s)' };
    const [uploading, setUploading] = useState(false);
    const [dashboard, setDashboard] = useState(false);
    const [previewImages, setPreviewImages] = useState([]);
    const reader = new FileReader();

    const onDrop = async(files) => {
        setPreviewImages([]);
        setUploading(true);
        setDashboard(true);
        const images = [];
        for (let f of files) {
            if (f.type.split('/')[0] === 'image') {
                const originalName = f.name.split('.')(0);
                const extension = '.'.concat(f.name.split('.')[1]);
                const imgName = generateUniqueImageName([], extension);
                const imgData = await getBase64(f);
                // save to db
                // if successful, add a preview img
                const newMeme = new Meme(imgName, imgData, extension, originalName);
                // setPreviewImages([...previewImages, previewImg]);
                images.push(newMeme);
                storeNewImage(newMeme);
                // console.log(previewImages);
                // const filepath = memeImgPath + imgName;
                // fs.copyFileSync(f.path, filepath);
                // // generate preview image
                // const previewImage = new PreviewImage(imgName, filepath, true);
                // console.log(previewImage);
                // let imagesCopy = [previewImages.slice(0)];
                // imagesCopy.push(previewImage);
                // console.log(imagesCopy);
                // setpreviewImages(imagesCopy);
                // console.log(previewImages, typeof previewImages);
                // TODO add data to db
            }
        }
        console.log(images);
        setPreviewImages(images);
        setTimeout(() => console.log(previewImages), 4000);
        setUploading(false);
    }

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            reader.readAsDataURL(file);
            reader.onload = function () {
              resolve(reader.result);
            };
            reader.onerror = function (error) {
              reject('Error: ', error);
            };
        });
     }

    return (
        <div className="title-body-modal-content">
            {!uploading && !dashboard &&
            <Dropzone onDrop={onDrop} icon={icon} text="Drop new images to add to your game collection!" />
            }
            {dashboard &&
            <div className={uploading ? 'dashboard no-action' : 'dashboard'}>
                {/* {previewImages && previewImages.map((nImg, i) => {
                    const { onDisk, src, name } = nImg;
                    return <ImagePreview onDisk={onDisk} src={src} alt={name} key={i} isLive={!uploading && dashboard} />
                })} */}
            </div>
            }
        </div>
    );
}

export default ImageDragAndDrop;