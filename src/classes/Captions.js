import Captions from '../json/captions.json';

class Caption {
    constructor(entry) {
        this.content = entry.caption;
        this.nsfw = entry.NSFW;
    }
}

class CaptionsCollection {
    constructor() {
        this.collection = [];
        this.usedCaptions = [];
        this.init();
    }

    init() {
        this.collection = Captions.captions.map(caption => new Caption(caption));
    }

    isEmpty() {
        return this.usedCaptions >= this.collection.length;
    }

    _getRandomCaption() {
        if (!this.isEmpty()) {
            return this.collection[Math.floor(Math.random() * this.collection.length)];
        }

        return null;
    }

    getRandomCaption() {
        let caption = this._getRandomCaption();
        while (caption && this.usedCaptions.includes(caption)) {
            caption = this._getRandomCaption();
        }
        if (caption) {
            this.usedCaptions.push(caption);
        }

        return caption;
    }
}

export default CaptionsCollection;