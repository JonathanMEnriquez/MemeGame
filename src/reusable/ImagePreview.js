import React, {useState} from 'react';
import '../css/ImagePreview.css';
import Delete from '../img/trash.png';

const ImagePreview = (props) => {
    const { removeImage, isLive, meme, clickHandler } = props;
    const { alt, dataMinified, data, id } = meme;
    const [options, setOptions] = useState(false);
    
    const deleteImg = (e) => {
        // stops propagation to not propagate to handleClick handler
        e.stopPropagation();
        removeImage(id);
    };

    const showOptions = () => {
        setOptions(true);
    }

    const hideOptions = () => {
        setOptions(false);
    }

    const setClassName = () => {
        let className = isLive ? 
                        'image-preview': 'image-preview no-actions';
        if (clickHandler) {
            className += ' clickable';
        }
        return className;
    }

    const handleClick = () => {
        if (clickHandler) {
            clickHandler(meme);
        }
    }

    return (
        <div style={{backgroundImage: `url(${dataMinified || data})`}} 
            className={setClassName()}
            onMouseEnter={showOptions}
            onMouseLeave={hideOptions}
            onClick={handleClick}
            title={alt}>
            <div className="image-preview-body">
                {options &&
                <div className="image-options">
                    <img src={Delete} 
                        alt='x'
                        onClick={deleteImg} />
                </div>
                }
            </div>
        </div>
    )
}

export default ImagePreview;