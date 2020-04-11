import React, { Component } from 'react';
import GameContext from './GameContext';
import { generateJoinCode, getRandomHand } from './utils/Randoms';
import Renderer from './Renderer';
import ioServer from './Socket';
import Constants from './utils/Constants';
import Player from './classes/Player';

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
        newMemes: [],
        ioServer: null,
        memesInPlay: [],
        judge: 0,
        round: 1,
    }

    componentDidMount() {
        this.retrieveImages();
    }

    setMemes(memes) {
        if (memes.length !== this.state.memes.length) {
            this.setState({ memes: memes });
        }
    }

    generateCallbacks() {
        let callbacks = {};
        callbacks[Constants.SOCKET_ADD_PLAYER] = (id, name, socket) => this.addPlayer(id, name, socket);
        return callbacks;
    }

    retrieveImages() {
        const renderer = new Renderer();
        const memes = renderer.retrieveAllImages();
        this.setState({memes: memes});
    }

    setToPregameMode() {
        if (!this.state.ioServer) {
            const gameCode = generateJoinCode();
            const server = new ioServer(gameCode, this.generateCallbacks());
            this.setState({ gameMode: this.state.modes.PREGAME, code: gameCode, ioServer: server });
        }
    }

    startGame() {
        console.log('Starting the game.');
        this.startNewRound();
        this.setState({ gameMode: this.state.modes.LIVEGAME });
    }

    startNewRound() {
        const { players, round } = this.state;
        let { judge } = this.state;
        if (judge >= this.state.players.length) {
            judge = 0;
        }

        this.state.ioServer.startRound(players, judge, round);

        this.setState({round: round + 1, judge: judge + 1});
    }

    addPlayer(id, name, socket) {
        if (this.state.gameIsFull) {
            return { success: false, error: 'Game is full.' };
        }

        const player = new Player(id, name, socket);
        const playersDupe = [...this.state.players, player];
        this.setState({players: playersDupe});
        
        if (this.state.players.length === this.state.maxPlayers) {
            this.setState({ gameIsFull: true });
        }

        this.givePlayerHand(player.socket);
    }

    addMeme(meme) {
        const dupe = [...this.state.memes, meme]
        this.setState({memes: dupe});
    }

    removeMeme(memeId) {
        const memes = this.state.memes.filter(m => m.id !== memeId);
        this.setState({memes: memes});
    }

    getHand() {
        const hand = getRandomHand(this.state.memes, this.state.memesInPlay, 3);
        const inPlay = [...this.state.memesInPlay, ...hand];
        this.setState({memesInPlay: inPlay});
        return hand;
    }

    async givePlayerHand(socket) {
        const playerHand = this.getHand();
        try {
            const res = await this.state.ioServer.sendHand(socket, playerHand);
            console.log('Successfully added new player. ', res);
        } catch(err) {
            console.error(err);
        }
    }

    render() {
        const { gameMode, modes, code, players, memes, newMemes,
                memesInPlay, judge, round } = this.state;

        return ( 
            <GameContext.Provider
                value={{
                    modes: modes,
                    gameMode: gameMode,
                    pregameMode: this.setToPregameMode.bind(this),
                    code: code,
                    players: players,
                    memes: memes.concat(newMemes),
                    syncMemes: (memes) => this.setState({ memes: memes }),
                    addMeme: (meme) => this.addMeme(meme),
                    removeMeme: (memeId) => this.removeMeme(memeId),
                    memesInPlay: memesInPlay,
                    judge: judge,
                    round: round,
                    liveGameMode: this.startGame.bind(this),
                    startRound: this.startNewRound.bind(this),
                }}
            >
                {this.props.children}
            </GameContext.Provider>
         );
    }
}
 
export default GameProvider;