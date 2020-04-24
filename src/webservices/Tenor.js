class TenorFetch {
    constructor(key) {
        // TODO: fetch key from db
        this.key = key || 'EUE1YTP8M6QW';
    }

    getTrendingGifs() {
        return new Promise((resolve, reject) => {
            fetch(`https://api.tenor.com/v1/trending?key=${this.key}`)
                .then(response => response.json())
                .then(data => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    getGifById(id) {
        //stuff
    }
}

export default TenorFetch;