import React from 'react';
import '../css/OptionsDisplay.css';
import GifOption from './GifOption';

const OptionsDisplay = (props) => {
    const { display, toggleSingleSelected, memes, selected } = props;
    
    const isSelected = (gif) => {
        return selected.includes(gif);
    };

    return (
        <div className="options-display">
            {display && display.map((gif, key) => {
                return <GifOption meme={gif} 
                                key={key}
                                toggleSingleSelected={toggleSingleSelected}
                                inMemeCollection={memes.alreadyInCollection(gif)}
                                isSelected={isSelected(gif)} />
            })}
        </div>
    )
}

export default OptionsDisplay;