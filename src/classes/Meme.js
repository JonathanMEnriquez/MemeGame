class Meme {
    constructor(name, data, minified, dataType, extension, alt, provider, provierId) {
        this.id = name;
        this.alt = alt;
        this.dataType = dataType || 'local';
        this.data = data;
        this.dataMinified = minified;
        this.extension = extension;
        this.playable = 1;
        this.provider = provider;
        this.provierId = provierId;
        this.addedOn = new Date().toUTCString();
        this.updatedOn = new Date().toUTCString();
    }

    giveId(id) {
        if (!this.id && id) {
            this.id = id;
        }
    }
}

export default Meme;