const { ipcMain } = require('electron');
const { 
    RETRIEVE_ALL_IMAGES, 
    ADD_IMAGE, 
    DELETE_IMAGE, 
    UPDATE_IMAGE
} = require('../utils/constants');
const { MemeValidator } = require('./validators');
const validator = new MemeValidator();
const MemeStore = require('./MemeStore');
const memeStore = new MemeStore({ name: 'MemesMain' });

class MainIpc {
    constructor(mainWindow) {
        this.win = mainWindow;
        this.init();
    }

    init() {
        ipcMain.on(ADD_IMAGE, (e, img) => {
            if (validator.validate(img)) {
                const added = memeStore.addMeme(img);
                e.returnValue = added;
            } else {
                console.error('Failed validation.');
                e.returnValue = false;
            }
        });
        
        ipcMain.on(RETRIEVE_ALL_IMAGES, (e) => {
            console.info('ipcMain received the request to send all images.');
            const memes = memeStore.getMemes();
            e.returnValue = memes;
        });

        ipcMain.on(DELETE_IMAGE, (e, id) => {
            console.info('ipcMain received a request to delete img: ', id);
            const success = memeStore.deleteMeme(id);
            e.returnValue = success;
        });

        ipcMain.on(UPDATE_IMAGE, (e, img) => {
            console.info('ipcMain received a request to update an image ', img);
            const success = memeStore.updateMeme(img);
            e.returnValue = success;
        });
    }
}

module.exports = MainIpc;