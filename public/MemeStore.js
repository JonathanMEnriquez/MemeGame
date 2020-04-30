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

    refresh() {
        this.memes = this.get('memes') || [];
    }

    getMemes() {
        console.info('Memestore will get all memes from storage.');
        console.info(this.memes.map(m => m.id));
        return this.memes;
    }

    addMeme(meme) {
        console.info('Memestore received a request to add an image: ', meme.id);
        const prevCount = this.memes.length;
        this.memes = [...this.memes, meme];
        return prevCount + 1 === this.memes.length;
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

    updateMeme(meme) {
        console.info('Memestore received a request to update an image: ' + meme.id);
        const idx = this.memes.findIndex(m => m.id === meme.id);
        if (idx > -1) {
            meme.updateOn = new Date().toUTCString();
            this.memes[idx] = meme;
            this.saveMemes();
            return true;
        }
        return false;
    }
}

module.exports = MemeStore;