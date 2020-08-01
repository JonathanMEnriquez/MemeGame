import { serializeToMemeList } from '../serializers/ImgFlipSerializer';

class ImgFlipFetch {
    getTrendingGifs(serialize) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.imgflip.com/get_memes`)
                .then(response => response.json())
                .then(data => {
                    resolve (
                        serialize ?
                            serializeToMemeList(data.data.memes) :
                            data
                    );
                })
                .catch(err => reject(err));
        });
    }

    getGifsBySearchTerm(searchTerm, serialize) {
        return new Promise((resolve, reject) => {
            // api does not support
            resolve([]);
        });
    }

    getGifById(id, serialize) {
        return new Promise((resolve, reject) => {
            // api does not support
            resolve([]);
        });
    }
}

export default ImgFlipFetch;