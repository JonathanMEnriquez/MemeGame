const Store = require('electron-store');

class MemeStore extends Store {
    constructor(settings) {
        super(settings);
        this.memes = this.get('memes') || [];
    }

    saveMemes() {
        this.set('memes', this.memes);
        return this;
    }

    getMemes() {
        return this.get('memes') || [];
    }

    addMeme(meme) {
        this.memes = [...this.memes, meme];
        return this.saveMemes();
    }
}

module.exports = MemeStore;