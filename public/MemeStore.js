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
        console.info('Memestore will get all memes from storage.');
        return this.get('memes') || [];
    }

    addMeme(meme) {
        console.info('Memestore received a request to add an image.', meme.id);
        this.memes = [...this.memes, meme];
        return this.saveMemes();
    }

    clearAllMemes() {
        this.memes = [];
        return this.saveMemes();
    }

    deleteMeme(id) {
        console.info('Memestore received a request to delete an image.')
        const prevCount = this.memes.length;
        this.memes = this.memes.filter(m => m.id !== id);
        this.saveMemes();
        return prevCount - 1 === this.memes.length;
    }
}

module.exports = MemeStore;