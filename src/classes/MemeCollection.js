import Meme from './Meme';
import Renderer from '../store/Renderer';
import { generateUniqueImageName } from '../utils/Randoms';

class MemeCollection {
    constructor(memes) {
        this.collection = memes || [];
        this.renderer = new Renderer();
    }

    addMeme(meme) {
        if (!meme instanceof Meme) {
            console.error('Meme must be of meme type.');
            return
        }

        if (!meme.id) {
            meme.giveId(generateUniqueImageName(this.collection, meme.extension || 'gif'));
        }

        if (!this.renderer.storeNewImage(meme)) {
            console.error('Renderer failed to store new Image ', meme);
            return
        }

        this.collection.push(meme);
        return true;
    }

    alreadyInCollection(meme) {
        return this.collection.findIndex(m => m.data === meme.data) > -1;
    }

    map(callback) {
        return this.collection.map(callback);
    }

    addMemeList(memeList) {
        memeList.forEach(m => this.addMeme(m));
    }

    deleteMeme(memeId) {
        return new Promise((resolve, reject) => {
            if (this.renderer.deleteImgFromStore(memeId)) {
                this.collection = this.collection.filter(m => m.id !== memeId);
                resolve(1);
            } else {
                reject('Failed deleting from store');
            }
        });
    }

    updateMeme(meme, property, newVal) {
        const idx = this.collection.findIndex(m => m === meme);
        meme[property] = newVal;
        this.renderer.updateImage(meme);
        this.collection[idx] = meme;
    }

    size() {
        return this.collection.length;
    }
}

export default MemeCollection;