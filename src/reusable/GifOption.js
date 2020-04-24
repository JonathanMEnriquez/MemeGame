import React, {useState} from 'react';
import '../css/GifOption.css';

const GifOption = (props) => {
    const { meme, toggleSingleSelected } = props;
    const { dataMinified, data, alt } = meme;
    const [selected, setSelected] = useState(false);

    const toggleSelected = () => {
        const updateValue = !selected;
        setSelected(updateValue);
        toggleSingleSelected(updateValue, meme);
    };

    return (
        <div className={selected ? 'gif-option selected-gif' : 'gif-option'}
            style={{backgroundImage: `url(${dataMinified || data})`}}
            onClick={toggleSelected} >
            <span>{alt}</span>
        </div>
    )
}

export default GifOption;