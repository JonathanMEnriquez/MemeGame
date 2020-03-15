class MemeValidator {
    constructor() {
        this.required = ['id', 'alt', 'data', 'extension', 
        'playable', 'addedOn', 'updatedOn'];
    }
    validate(meme) {
        console.info('validating meme: ', meme.alt);
        if (!meme) {
            return false;
        }
        for (let req of this.required) {
            if (!meme[req]) {
                return false;
            }
        }
        return true;
    }
}

module.exports = {
    MemeValidator: MemeValidator,
}