import React, {useState} from 'react';
import './css/ImagePreview.css';
import Delete from './img/cross.png';

const ImagePreview = (props) => {
    const { removeImage, isLive, alt, src, id } = props;
    const [options, setOptions] = useState(false);
    
    const deleteImg = () => {
        removeImage(id);
    };

    const showOptions = () => {
        setOptions(true);
    }

    const hideOptions = () => {
        setOptions(false);
    }

    return (
        <div style={{backgroundImage: `url(${src})`}} className={isLive ? 'image-preview': 'image-preview no-actions'}
            onMouseEnter={showOptions}onMouseLeave={hideOptions} title={alt}>
            <div className="image-preview-body">
                {options &&
                <div className="image-options">
                    <img src={Delete} alt='x' onClick={deleteImg} />
                </div>
                }
            </div>
        </div>
    )
}

export default ImagePreview;