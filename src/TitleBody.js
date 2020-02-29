import React from 'react';
import MenuButton from './MenuButton';
import './css/TitleBody.css';

const TitleBody = (props) => {
    const { pregameMode } = props;

    return (
        <div className="title-body">
            <div className="menu">
                <MenuButton text="Begin" clickHandler={pregameMode} />
            </div>
        </div>
    )
};

export default TitleBody;