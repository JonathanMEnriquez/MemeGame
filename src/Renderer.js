const {
    RETRIEVE_ALL_IMAGES,
    ADD_IMAGE,
    DELETE_IMAGE,
    UPDATE_IMAGE,
} = require('./utils/Constants');
const { ipcRenderer } = window.require('electron');

module.exports = {
    storeNewImage: (img) => ipcRenderer.send(ADD_IMAGE, img),
    retrieveAllImages: () => ipcRenderer.send(RETRIEVE_ALL_IMAGES),
    deleteImgFromStore: (img) => ipcRenderer.send(DELETE_IMAGE, img),
    updateImage: (img) => ipcRenderer.send(UPDATE_IMAGE, img),
}