import React from 'react';
import '../css/MenuButton.css';

const MenuButton = (props) => {
    const { text, clickHandler } = props;

    const allCaps = (t) => {
        return t.toUpperCase();
    };

    return (
        <div className="menu-button"
            onClick={clickHandler} >
                {allCaps(text)}
        </div>
    )
};

export default MenuButton;