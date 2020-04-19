import Colors from '../json/colors.json';

class Player {
    constructor(id, name, socket) {
        this.socketId = id;
        this.name = name;
        this.socket = socket;
        this.points = 0;
        this.color = this.getOrGenerateRandomColor();
    }

    addPoints() {
        this.points += 2;
    }

    addPoint() {
        this.points += 1;
    }

    _generateRandomColor() {
        return '#' + Math.random().toString(16).slice(2, 8);
    }

    getOrGenerateRandomColor() {
        if (Colors && Colors.length) {
            return Colors[Math.floor(Math.random() * Colors.length)].hexString;
        }

        return this._generateRandomColor();
    }
}

export default Player;