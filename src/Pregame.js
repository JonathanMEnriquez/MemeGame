import React, { useContext } from 'react';
import './css/Pregame.css';
import GameContext from './GameContext';
import MenuButton from './MenuButton';

const Pregame = (props) => {
    const { code, players, gameIsFull, liveGameMode } = useContext(GameContext);

    const startGameClickHandler = () => {
        if (players.length > 1) {
            console.log('let us do this!');
            liveGameMode();
        }
    }

    return (
        <div className="pregame">
            <div className="players">
                {players.map((player, key) => {
                    return (
                        <div key={key}
                            style={{color: player.color}}
                            className="player"
                        >{player.name}</div>
                    )
                })}
            </div>
            <div className="middle">
                <div className="code-section">
                    <span className={gameIsFull ? 'hidden' : ''}>Enter this code to join this game.</span>
                    <span className={gameIsFull ? '' : 'hidden'}>Game is full.</span>
                    <span className={gameIsFull ? 'hidden' : 'code'}>{code}</span>
                </div>
                <div className="button-section">
                    <MenuButton text="Start game" clickHandler={startGameClickHandler} />
                </div>
            </div>
        </div>
    )
};

export default Pregame;
