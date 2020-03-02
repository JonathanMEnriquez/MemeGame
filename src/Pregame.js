import React, { useState, useContext } from 'react';
import './css/Pregame.css';
import GameContext from './GameContext';
import MenuButton from './MenuButton';

const Pregame = (props) => {
    const { code, players, addPlayer, gameIsFull } = useContext(GameContext);

    return (
        <div className="pregame">
            <div className="middle">
                <div className="code-section">
                    <span className={gameIsFull ? 'hidden' : ''}>Enter this code to join this game.</span>
                    <span className={gameIsFull ? '' : 'hidden'}>Game is full.</span>
                    <span className={gameIsFull ? 'hidden' : 'code'}>{code}</span>
                </div>
                <div className="button-section">
                    <MenuButton text="Start game" clickHandler={() => console.log('code me!')} />
                </div>
            </div>
        </div>
    )
};

export default Pregame;
