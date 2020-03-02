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
        code: '',
        players: [],
        maxPlayers: 6,
        gameIsFull: false,
    }

    generateCode() {
        const alphanumeric = Math.random().toString(36).replace('0.', '');
        this.setState({ code: alphanumeric.slice(0, 6) });
    }

    setToPregameMode() {
        this.generateCode();
        this.setState({ gameMode: this.state.modes.PREGAME });
    }

    addPlayer(player) {
        if (this.state.gameIsFull) {
            return { success: false, error: 'Game is full.' };
        }

        this.state.players.push(player);
        if (this.state.players.length === this.state.maxPlayers) {
            this.setToPregameMode({ gameIsFull: true });
        }
        return { success: true };
    }

    render() {
        const { gameMode, modes, code, players } = this.state;

        return ( 
            <GameContext.Provider
                value={{
                    modes: modes,
                    gameMode: gameMode,
                    pregameMode: this.setToPregameMode.bind(this),
                    code: code,
                    players: players,
                    addPlayer: (player) => this.addPlayer(player),
                }}
            >
                {this.props.children}
            </GameContext.Provider>
         );
    }
}
 
export default GameProvider;