class Player {
    constructor(id, name, socket) {
        this.socketId = id;
        this.name = name;
        this.socket = socket;
        this.points = 0;
    }

    addPoint() {
        this.points += 1;
    }
}

export default Player;