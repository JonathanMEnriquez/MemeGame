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
        let memeFound = false;
        for (let i = 0; i < this.memes.length; i++) {
            if (this.memes[i].id === meme.id) {
                this.memes[i] = meme;
                memeFound = true;
                break;
            }
        }
        this.saveMemes();
        return memeFound;
    }
}

module.exports = MemeStore;