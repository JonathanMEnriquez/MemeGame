import React, {useState} from 'react';
import './css/DynamicInput.css';
import Update from './img/enter.png';

const DynamicInput = (props) => {
    const { text, clickHandler } = props;
    const [displayInput, setDisplayInput] = useState(false);
    let inputVal = text;

    const toggleDisplayInput = () => {
        setDisplayInput(!displayInput);
    }

    const updateVal = (e) => {
        inputVal = e.target.value;
    }

    const updateMeme = () => {
        clickHandler(inputVal);
        toggleDisplayInput();
    }

    return (
        <div className="dynamic-input">
            {!displayInput &&
            <span
                onClick={toggleDisplayInput}>
                {text}
            </span>
            }
            {displayInput &&
            <div className="input-group">
                 <input autoFocus
                     defaultValue={inputVal}
                     onChange={updateVal} />
                 <img src={Update} 
                     alt="*"
                     onClick={updateMeme} />
             </div>
            }
        </div>
    )
}

export default DynamicInput;