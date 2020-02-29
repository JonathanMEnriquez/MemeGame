import React, { Component } from 'react';
import GameContext from './GameContext';

class GameProvider extends Component {
    state = {
        modes: {
            TITLE: 'ti',
            PREGAME: 'pr',
            LIVEGAME: 'li',
            POSTGAME: 'po'
        },
        gameMode: 'ti',
    }

    render() {
        const { gameMode, modes } = this.state;

        console.log(this.state);

        return ( 
            <GameContext.Provider
                value={{
                    modes: modes,
                    gameMode: gameMode,
                    pregameMode: () => this.setState({ gameMode: modes.PREGAME }),
                }}
            >
                {this.props.children}
            </GameContext.Provider>
         );
    }
}
 
export default GameProvider;