import Constants from './utils/Constants';

function ioServer(code, callbacks) {
    let self = this;
    self.joinCode = code;
    self.io = window.require('socket.io')();
    self.callbacks = callbacks;
    self.initialized = false;

    self.startRound = (players, judgeIdx, round) => {
        console.log('socket starting round ' + round);
        const judge = players[judgeIdx];
        console.log('all players ', players);
        const rest = players.filter(p => p !== judge);
        console.log('rest: ', rest);

        judge.socket.emit(Constants.SOCKET_START_ROUND_AS_JUDGE, { round: round });

        rest.forEach(p => {
            p.socket.emit(Constants.SOCKET_START_ROUND_AS_PLAYER, { round: round });
        });
    };

    self.sendHand = (playerSocket, cards) => {
        console.log('called ioserver sendhand');
        return new Promise((resolve, reject) => {
            playerSocket.emit(Constants.SOCKET_SEND_HAND, {hand: cards});
            playerSocket.on(Constants.SOCKET_SEND_HAND_ERROR, (err) => {
                console.error('failed sending full hand.');
                reject(err);
            });
            playerSocket.on(Constants.SOCKET_SEND_HAND_CONFIRM, () => {
                console.log('player got hand!');
                resolve('Success');
            });
        });
    }

    if (!self.initialized) {
        self.io.sockets.on('connection', function(socket) {
            console.log('Socket connection made');
            console.log('Client socket ID: ', socket.id);

            socket.on(Constants.SOCKET_NEW_CONNECTION, function() {
                console.log('received connection confirmation');
                socket.emit(Constants.SOCKET_SEND_ID, {id: socket.id});
            });
        
            socket.on(Constants.SOCKET_ADD_PLAYER, function(data) {
                console.info('new player ', data, self.joinCode);
                if (data.code && data.code !== self.joinCode) {
                    console.log('wrong code received.')
                    socket.emit(Constants.SOCKET_ADD_PLAYER_ERROR, {error: 'Invalid code submitted.'});
                    return;
                }
                if (self.callbacks[Constants.SOCKET_ADD_PLAYER]) {
                    self.callbacks[Constants.SOCKET_ADD_PLAYER](socket.id, data.name, socket);
                }
                socket.emit(Constants.SOCKET_CONFIRM_PLAYER_ADDED);
            });
        });

        self.io.listen(6969);
        self.initialized = true;
    }
}

export default ioServer;