import React from 'react';
import './css/ImagePreview.css';

const ImagePreview = (props) => {
    let { src } = props;
    const { onDisk, isLive, alt } = props;
    if (onDisk) {
        src = src.replace('/src', '');
    }

    // const Img = require('./memes/meme-934175.jpg');

    return (
        <div className='image-preview'>
            <div className='image-preview-header'>
                hola
            </div>
            <img src={src} alt={alt} className={isLive ? 'image' : 'image no-actions'} />
        </div>
    )
}

export default ImagePreview;