import React, { Component } from 'react';
import GameContext from './GameContext';
import TitleScreen from './TitleScreen';
import Pregame from './Pregame';

class GameSwitch extends Component {
    selectedGameMode() {
        const { gameMode, modes } = this.context;

        switch (gameMode) {
            case modes.TITLE:
                return <TitleScreen />;
            case modes.PREGAME:
                return <Pregame />;
            default:
                return <div>Should not display</div>;
        }
    }

    render() {
        return this.selectedGameMode();
    }
}

GameSwitch.contextType = GameContext;
 
export default GameSwitch;