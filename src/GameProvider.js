import React, { Component } from 'react';
import GameContext from './GameContext';
import { generateJoinCode } from './utils/Randoms';
import Renderer from './Renderer';
import ioServer from './Socket';
import Constants from './utils/Constants';
import Player from './classes/Player';
import Deck from './classes/Deck';
import Round from './classes/Round';
import CaptionsCollection from './classes/Captions';
import BallotCollection from './classes/Ballot';

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
        cardsPerHand: 3,
        gameIsFull: false,
        memes: [],
        ioServer: null,
        judge: 0,
        roundNumber: 1,
        round: null,
        rounds: [],
        deck: null,
        captions: null,
        ballotCollection: null,
        automaticProgressGame: true,
        isFinalRound: false,
        goalPoints: 5,
        // 5 mins
        maxTimePerRound: 1000 * 60 * 5,
    }

    componentDidMount() {
        this.retrieveImages();
        this.setupCaptions();
    }

    setupCaptions() {
        this.setState({ captions: new CaptionsCollection() });
    }

    generateCallbacks() {
        let callbacks = {};
        callbacks[Constants.SOCKET_ADD_PLAYER] = (id, name, socket) => this.addPlayer(id, name, socket);
        callbacks[Constants.SOCKET_SEND_ROUND_SUBMISSION] = (name, cardId, round) => this.addSubmissionToRound(name, cardId, round);
        callbacks[Constants.SOCKET_SEND_ROUND_SELECTION] = (data) => this.processSelection(data)
        return callbacks;
    }

    retrieveImages() {
        const renderer = new Renderer();
        const memes = renderer.retrieveAllImages();
        this.setState({memes: memes});
    }

    processSelection(data) {
        if (!data || data.name === undefined || data.choice === undefined || data.round === undefined) {
            console.debug('ProcessSelection method did not receive all required values');
            return
        }

        if (this._selectionIsValid(data)) {
            console.info('selection is valid');
            if (data.isJudge){
                this.state.ballotCollection.setAsJudgeChoice(data.choice);
            } else {
                this.state.ballotCollection.addVote(data.name, data.choice);
            }

            this.forceUpdate();
        } else {
            console.error('failed validation.');
        }
    }

    _judgeDeclarationIsCorrect(data) {
        return data.isJudge === false || this.state.round.judge.name === data.name;
    }

    _selectionIsValid(data) {
        return (
            data.round === this.state.round.number
            && this._judgeDeclarationIsCorrect(data)
        )
    }

    _gameCanGoToPregameMode() {
        // TODO: update this logic to reflect the max players
        return this.state.memes.length;
    }

    setToPregameMode() {
        if (this._gameCanGoToPregameMode()) {
            this.initializeSocketServer();
            this.initializeDeck();
            this.setState({ gameMode: this.state.modes.PREGAME });
        }
    }

    initializeSocketServer() {
        if (!this.state.ioServer) {
            const gameCode = generateJoinCode();
            const server = new ioServer(gameCode, this.generateCallbacks());
            this.setState({ code: gameCode, ioServer: server });
        }
    }

    initializeDeck() {
        if (!this.state.deck) {
            this.setState({deck: new Deck(this.state.memes)});
        }
    }

    addSubmissionToRound(name, cardId, round) {
        console.log('adding submission ', name, cardId, round);
        if (round === this.state.round.number) {
            if (this.state.round.addSubmission(name, cardId)) {
                const player = this.state.players.find(pl => pl.name === name);
                const card = this.state.deck.getRandomCard();
                console.log('about to send card ', card, player);
                if (player && card) {
                    console.log('sending card to ' + player.name);
                    this.state.ioServer.sendCard(player.socket, card);
                    this.forceUpdate();
                }
            }
        }
    }

    setToLiveGameMode() {
        this.startNewRound();
        this.setState({gameMode: this.state.modes.LIVEGAME});
    }

    startNewRound() {
        const { roundNumber, round, rounds, judge, players, deck, captions } = this.state;
        if (this.state.roundNumber >= this.state.players.length) {
            this.setState({judge: 0});
        }

        if (round) {
            const dupe = [...rounds, round];
            this.setState({ rounds: dupe });
        }

        console.info('Starting new round: ' + roundNumber);
        const roundJudge = players[judge];
        const rest = players.filter(p => p !== roundJudge);
        const caption = captions.getRandomCaption();
        const newRound = new Round(roundNumber, roundJudge, caption);
        // checks to see if there are enough cards for a following round
        const enoughCardsForAnotherRound = deck.hasEnoughCardsForNextRound(players.length, 1);

        this.state.ioServer.startRound(roundJudge, rest, roundNumber);

        this.setState({ judge: judge + 1, 
            roundNumber: roundNumber + 1, 
            round: newRound, isFinalRound: !enoughCardsForAnotherRound,
            ballotCollection: new BallotCollection() });
    }

    addPlayer(id, name, socket) {
        if (this.state.gameIsFull) {
            return { success: false, error: 'Game is full.' };
        }

        const player = new Player(id, name, socket);
        const playersDupe = [...this.state.players, player];
        this.setState({ players: playersDupe });
        
        if (this.state.players.length === this.state.maxPlayers) {
            this.setState({ gameIsFull: true });
        }

        this.givePlayerHand(player.socket);
        return { success: true };
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
        return this.state.deck.getRandomHand(this.state.cardsPerHand);
    }

    async givePlayerHand(socket) {
        const playerHand = this.getHand();
        try {
            const res = await this.state.ioServer.sendHand(socket, playerHand);
            console.info(res);
        } catch(err) {
            console.error(err);
        }
    }

    async getJudgesContinueAction() {
        const { judge } = this.state.round;
        const res = await this.state.ioServer.getReadyResponseFromJudge(judge);
        return res;
    }

    sendChoicesForSelecting(choices) {
        console.debug('SendChoicesForSelecting called with ', choices);
        this.state.ioServer.sendChoicesForSelecting(this.state.players, choices);
    }

    socketSendWinnerInfo(judgeChoice, playersChoice) {
        this.state.ioServer.sendWinnerInfo(judgeChoice, playersChoice);
    }

    render() {
        const { gameMode, modes, code, players, memes, judge, round, rounds, 
                maxTimePerRound, automaticProgressGame, isFinalRound, deck,
                ballotCollection } = this.state;

        return ( 
            <GameContext.Provider
                value={{
                    modes: modes,
                    gameMode: gameMode,
                    pregameMode: this.setToPregameMode.bind(this),
                    code: code,
                    players: players,
                    memes: memes,
                    syncMemes: (memes) => this.setState({ memes: memes }),
                    addMeme: (meme) => this.addMeme(meme),
                    removeMeme: (memeId) => this.removeMeme(memeId),
                    judge: judge,
                    isFinalRound: isFinalRound,
                    round: round,
                    rounds: rounds,
                    startNewRound: this.startNewRound.bind(this),
                    liveGameMode: this.setToLiveGameMode.bind(this),
                    automaticProgressGame: automaticProgressGame,
                    maxTimePerRound: maxTimePerRound,
                    getJudgesContinueAction: this.getJudgesContinueAction.bind(this),
                    deck: deck,
                    sendChoicesForSelecting: (choices) => this.sendChoicesForSelecting(choices),
                    ballotCollection: ballotCollection,
                    socketSendWinnerInfo: (judgeChoice, playersChoice) => this.socketSendWinnerInfo(judgeChoice, playersChoice),
                }}
            >
                {this.props.children}
            </GameContext.Provider>
         );
    }
}
 
export default GameProvider;