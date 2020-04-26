import { serializeToMemeList } from '../serializers/GiphySerializer';

class GiphyFetch {
    constructor(key) {
        // TODO: fetch key from db
        this.key = key || 'WYbyQkORdwOuYzvbJDQO4WHRWUa4NxQ6';
    }

    getTrendingGifs(serialize) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${this.key}&limit=24&rating=R`)
                .then(response => response.json())
                .then(data => {
                    resolve (
                        serialize ?
                            serializeToMemeList(data.data) :
                            data
                    );
                })
                .catch(err => reject(err));
        });
    }

    getGifsBySearchTerm(searchTerm, serialize) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.giphy.com/v1/gifs/search?api_key=${this.key}&q=${searchTerm}&limit=24&offset=0&rating=R&lang=en`)
                .then(response => response.json())
                .then(data => {
                    resolve (
                        serialize ?
                            serializeToMemeList(data.data) :
                            data
                    );
                })
                .catch(err => reject(err));
        });
    }

    getGifById(id, serialize) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.giphy.com/v1/gifs/${id}?api_key=${this.key}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    resolve (
                        serialize ?
                            serializeToMemeList([data.data]) :
                            data
                    );
                })
                .catch (err => resolve([]));
        });
    }
}

export default GiphyFetch;