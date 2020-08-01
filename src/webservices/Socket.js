import Constants from '../utils/Constants';

function ioServer(code, callbacks) {
    let self = this;
    self.joinCode = code;
    self.io = window.require('socket.io')();
    self.callbacks = callbacks;
    self.initialized = false;

    self.startRound = (judge, players, round) => {
        console.info('Socket emitting signals to begin round: ' + round);
        console.debug(judge, players, round);

        judge.socket.emit(Constants.SOCKET_START_ROUND_AS_JUDGE, { round: round });

        players.forEach(p => {
            p.socket.emit(Constants.SOCKET_START_ROUND_AS_PLAYER, { round: round });
        });
    };

    self.sendHand = (playerSocket, cards) => {
        return new Promise((resolve, reject) => {
            playerSocket.emit(Constants.SOCKET_SEND_HAND, {hand: cards});
            playerSocket.on(Constants.SOCKET_SEND_HAND_ERROR, (err) => {
                console.error('Failed sending full hand');
                reject(err);
            });
            playerSocket.on(Constants.SOCKET_SEND_HAND_CONFIRM, () => {
                console.info('Player received hand');
                resolve('Success');
            });
        });
    }

    self.sendCard = (playerSocket, card) => {
        console.debug('Socket about to emit sendCard signal. ', card.id);
        playerSocket.emit(Constants.SOCKET_SEND_CARD, {card: card});
        playerSocket.on(Constants.SOCKET_SEND_CARD_CONFIRM, () => console.debug(`Socket received a ${Constants.SOCKET_SEND_CARD_CONFIRM} signal for ${card}`));
    }

    self.getReadyResponseFromJudge = (judge) => {
        return new Promise(resolve => {
            console.debug(`Socket about to emit \'${Constants.SOCKET_SEND_JUDGE_CAN_CONTINUE}\' signal.`);
            judge.socket.emit(Constants.SOCKET_SEND_JUDGE_CAN_CONTINUE);
            judge.socket.on(Constants.SOCKET_RECEIVE_JUDGE_PERMISSION_TO_CONTINUE, (data) => {
                console.debug(`Socket received a ${Constants.SOCKET_RECEIVE_JUDGE_PERMISSION_TO_CONTINUE} signal with data: `, data);
                if (data && data.name === judge.name) {
                    resolve(1);
                }
            });
        });
    }

    self.getStartRoundResponseFromJudge = (nextRoundJudge) => {
        return new Promise(resolve => {
            console.debug(`Socket about to emit ${Constants.SOCKET_SEND_START_ROUND_OPTION} signal to ${nextRoundJudge.name}`);
            nextRoundJudge.socket.emit(Constants.SOCKET_SEND_START_ROUND_OPTION);
            nextRoundJudge.socket.on(Constants.SOCKET_RECEIVED_JUDGE_NEW_ROUND_START, data => {
                console.debug(`Socket receieved a ${Constants.SOCKET_RECEIVED_JUDGE_NEW_ROUND_START} signal from ${data.judge}`);
                if (data && data.name === nextRoundJudge.name) {
                    resolve(1);
                }
            });
        });
    }

    self.sendChoicesForSelecting = (players, choices) => {
        console.debug(`Socket about to emit \'${Constants.SOCKET_SEND_OPTIONS_TO_PLAYERS}\' signal: `, choices);
        players.forEach(player => {
            player.socket.emit(Constants.SOCKET_SEND_OPTIONS_TO_PLAYERS, {choices});
        });
    }

    self.sendWinnerInfo = (judgeChoice, playersChoice) => {
        console.debug(`Socket about to emit ${Constants.SOCKET_SEND_WINNER_INFO}`);
        self.io.sockets.emit(Constants.SOCKET_SEND_WINNER_INFO, { judgeChoice: judgeChoice, playersChoice: playersChoice });
    }

    if (!self.initialized) {
        self.io.sockets.on('connection', function(socket) {
            console.debug('Socket connection made');
            console.debug('Client socket ID: ', socket.id);

            socket.on(Constants.SOCKET_NEW_CONNECTION, function() {
                console.debug('received connection confirmation');
                socket.emit(Constants.SOCKET_SEND_ID, {id: socket.id});
            });
        
            socket.on(Constants.SOCKET_ADD_PLAYER, function(data) {
                console.info('new player ', data, self.joinCode);
                if (data.code && data.code !== self.joinCode) {
                    console.error('wrong code received: ', data);
                    socket.emit(Constants.SOCKET_ADD_PLAYER_ERROR, {error: 'Invalid code submitted.'});
                    return;
                }
                if (self.callbacks[Constants.SOCKET_ADD_PLAYER]) {
                    self.callbacks[Constants.SOCKET_ADD_PLAYER](socket.id, data.name, socket);
                }
                socket.emit(Constants.SOCKET_CONFIRM_PLAYER_ADDED);
            });

            socket.on(Constants.SOCKET_SEND_ROUND_SUBMISSION, data => {
                console.debug(`Socket received ${Constants.SOCKET_SEND_ROUND_SUBMISSION} signal with data: ${data}`);
                if (self.callbacks[Constants.SOCKET_SEND_ROUND_SUBMISSION]) {
                    self.callbacks[Constants.SOCKET_SEND_ROUND_SUBMISSION](data.name, data.id, data.round);
                }
            });

            socket.on(Constants.SOCKET_SEND_ROUND_SELECTION, data => {
                console.debug(`Socket received ${Constants.SOCKET_SEND_ROUND_SELECTION} signal with data: `, data);
                if (self.callbacks[Constants.SOCKET_SEND_ROUND_SELECTION]) {
                    self.callbacks[Constants.SOCKET_SEND_ROUND_SELECTION](data);
                }
            });
        });

        self.io.listen(6969);
        self.initialized = true;
    }
}

export default ioServer;