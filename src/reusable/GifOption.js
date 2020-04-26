import React from 'react';
import '../css/GifOption.css';

const GifOption = (props) => {
    const { meme, toggleSingleSelected, inMemeCollection, isSelected } = props;
    const { dataMinified, data, alt } = meme;

    const toggleSelected = () => {
        toggleSingleSelected(!isSelected, meme);
    };

    const generateClassName = () => {
        let className = '';
        className += isSelected ? 'gif-option selected-gif' : 'gif-option';
        className += inMemeCollection ? ' in-collection' : '';
        return className;
    };

    return (
        <div className={generateClassName()}
            style={{backgroundImage: `url(${dataMinified || data})`}}
            onClick={toggleSelected} >
            <span>{alt}</span>
            <p className="warning">{inMemeCollection ? 'Already in Collection' : ''}</p>
        </div>
    )
}

export default GifOption;