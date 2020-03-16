import React, { Component } from 'react';
import GameContext from './GameContext';
import { generateJoinCode } from './utils/Randoms';
import Renderer from './Renderer';

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
        memes: [],
    }

    componentDidMount() {
        this.retrieveImages();
    }

    setMemes(memes) {
        if (memes.length !== this.state.memes.length) {
            this.setState({ memes: memes });
        }
    }

    retrieveImages() {
        const renderer = new Renderer();
        const memes = renderer.retrieveAllImages();
        this.setState({memes: memes});
    }

    generateCode() {
        const code = generateJoinCode();
        this.setState({ code: code });
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
        const { gameMode, modes, code, players, memes } = this.state;

        return ( 
            <GameContext.Provider
                value={{
                    modes: modes,
                    gameMode: gameMode,
                    pregameMode: this.setToPregameMode.bind(this),
                    code: code,
                    players: players,
                    addPlayer: (player) => this.addPlayer(player),
                    memes: memes,
                    setMemes: (memes) => this.setState({ memes: memes }),
                }}
            >
                {this.props.children}
            </GameContext.Provider>
         );
    }
}
 
export default GameProvider;