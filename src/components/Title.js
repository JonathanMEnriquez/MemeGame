import React from 'react';
import '../css/Title.css';

const Title = (props) => {
    return (
        <div className="header">
            <div className="title">
                <div className="top-line">
                    <span>WHAT DO</span>
                    <span>YOU</span>
                </div>
                <div className="second-line">
                    <span>MEME</span>
                    <span>?</span>
                </div>
                <div className="sub-title">
                    <p>An adult party</p>
                    <p>game for Meme lovers.</p>
                </div>
            </div>
        </div>
    )
}

export default Title;