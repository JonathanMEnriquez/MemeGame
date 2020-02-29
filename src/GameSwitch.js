import React, { Component } from 'react';
import GameContext from './GameContext';
import TitleScreen from './TitleScreen';

class GameSwitch extends Component {
    state = {
        imgLoaded: false
    }

    selectedGameMode() {
        const { gameMode, modes } = this.context;
        console.log(gameMode, modes);
        switch (gameMode) {
            case modes.TITLE:
                return <TitleScreen />;
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