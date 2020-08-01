import { serializeToMemeList } from '../serializers/TenorSerializer';

class TenorFetch {
    constructor(key) {
        // TODO: fetch key from db
        this.key = key || 'EUE1YTP8M6QW';
    }

    getTrendingGifs(serialize) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.tenor.com/v1/trending?key=${this.key}`)
                .then(response => response.json())
                .then(data => {
                    resolve (
                        serialize ?
                            serializeToMemeList(data.results) :
                            data
                    );
                })
                .catch(err => reject(err));
        });
    }

    getGifsBySearchTerm(searchTerm, serialize) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.tenor.com/v1/search?q=${searchTerm}&key=${this.key}`)
                .then(response => response.json())
                .then(data => {
                    resolve (
                        serialize ?
                            serializeToMemeList(data.results) :
                            data
                    );
                })
                .catch(err => reject(err));
        });
    }

    getGifById(id, serialize) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.tenor.com/v1/gifs/?ids=${id}&key=${this.key}`)
                .then(response => response.json())
                .then(data => {
                    resolve (
                        serialize ?
                            serializeToMemeList(data.results) :
                            data
                    );
                })
                .catch(err => resolve([]));
        });
    }
}

export default TenorFetch;