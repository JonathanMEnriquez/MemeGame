const {
    RETRIEVE_ALL_IMAGES,
    ADD_IMAGE,
    DELETE_IMAGE,
    UPDATE_IMAGE,
} = require('./utils/Constants');
const { ipcRenderer } = window.require('electron');

class Renderer {
    storeNewImage(img) {
        console.info('Adding new image to Store.', img);
        const success = ipcRenderer.sendSync(ADD_IMAGE, img);
        if (!success) {
            console.error('Failed to save image to db.');
        } else {
            console.info('Added new meme to db.');
        }
        return success;
    }

    retrieveAllImages() {
        console.info('Requesting that all images be resent from the store.');
        const images = ipcRenderer.sendSync(RETRIEVE_ALL_IMAGES);
        console.log('hola ', images.length);
        return images;
    }

    deleteImgFromStore(id) {
        console.info('Deleting image from Store.', id);
        const success = ipcRenderer.sendSync(DELETE_IMAGE, id);
        if (!success) {
            console.error('Failed to delete image from db.');
        } else {
            console.info('Deleted meme to db.');
        }
    }

    updateImage(img) {
        console.info('Updating image.', img);
        ipcRenderer.send(UPDATE_IMAGE, img);
    }
}

module.exports = Renderer;