import { serializeToMemeList } from '../serializers/GfycatSerializer';

class GfycatFetch {
    getTrendingGifs(serialize) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.gfycat.com/v1/reactions/populated?tagName=trending`)
                .then(response => response.json())
                .then(data => {
                    resolve (
                        serialize ?
                            serializeToMemeList(data.gfycats) :
                            data
                    );
                })
                .catch(err => reject(err));
        });
    }

    getGifsBySearchTerm(searchTerm, serialize) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.gfycat.com/v1/gfycats/search?search_text=${searchTerm}`)
                .then(response => response.json())
                .then(data => {
                    resolve (
                        serialize ?
                            serializeToMemeList(data.gfycats) :
                            data
                    );
                })
                .catch(err => reject(err));
        });
    }

    getGifById(id, serialize) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.gfycat.com/v1/gfycats/${id}`)
                .then(response => response.json())
                .then(data => {
                    resolve (
                        serialize ?
                            serializeToMemeList([data.gfyItem]) :
                            data
                    );
                })
                .catch(err => resolve([]));
        });
    }
}

export default GfycatFetch;