class PreviewImage {
    constructor(name, data, extension, alt) {
        this.id = name;
        this.alt = alt;
        this.data = data;
        this.extension = extension;
        this.added_on = new Date().toUTCString();
        this.updated_on = new Date().toUTCString();
    }

    update(key, newValue) {
        this[key] = newValue;
        this.updated_on(new Date().toUTCString());
    }
}

export default PreviewImage;