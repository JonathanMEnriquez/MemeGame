const { REQUIRED_MEME_FIELDS } = require('../utils/constants')

class MemeValidator {
    constructor() {
        this.required = REQUIRED_MEME_FIELDS;
    }
    validate(meme) {
        console.info('validating meme: ', meme.alt);
        if (!meme) {
            return false;
        }
        for (let req of this.required) {
            if (!meme[req]) {
                console.error('Meme is missing required field: ', req);
                return false;
            }
        }
        return true;
    }
}

module.exports = {
    MemeValidator: MemeValidator,
}