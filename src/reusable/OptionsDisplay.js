import React from 'react';
import '../css/OptionsDisplay.css';
import GifOption from './GifOption';

const OptionsDisplay = (props) => {
    const { display, toggleSingleSelected } = props;

    return (
        <div className="options-display">
            {display && display.map((gif, key) => {
                return <GifOption meme={gif} 
                                key={key}
                                toggleSingleSelected={toggleSingleSelected} />
            })}
        </div>
    )
}

export default OptionsDisplay;