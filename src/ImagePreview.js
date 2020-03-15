import React, {useState} from 'react';
import './css/ImagePreview.css';
import Delete from './img/cross.png';

const ImagePreview = (props) => {
    const { removeImage, isLive, alt, src, id } = props;
    const [options, setOptions] = useState(false);
    
    const deleteImg = () => {
        console.log('delete me!');
        removeImage(id);
    };

    const showOptions = () => {
        setOptions(true);
    }

    const hideOptions = () => {
        setOptions(false);
    }

    return (
        <div className='image-preview' onMouseEnter={showOptions} onMouseLeave={hideOptions}>
            <div className="image-preview-body">
                {options &&
                <div className="image-options">
                    <img src={Delete} alt='x' onClick={deleteImg} />
                </div>
                }
                <img src={src} alt={alt} className={isLive ? 'image' : 'image no-actions'} />
            </div>
        </div>
    )
}

export default ImagePreview;