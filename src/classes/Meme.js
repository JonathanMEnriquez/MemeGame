class Meme {
    constructor(name, data, extension, alt) {
        this.id = name;
        this.alt = alt;
        this.data = data;
        this.extension = extension;
        this.playable = 1;
        this.addedOn = new Date().toUTCString();
        this.updatedOn = new Date().toUTCString();
    }
}

export default Meme;