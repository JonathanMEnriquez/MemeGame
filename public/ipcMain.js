const { ipcMain } = require('electron');
const { 
    RETRIEVE_ALL_IMAGES, 
    ADD_IMAGE, 
    DELETE_IMAGE, 
    UPDATE_IMAGE 
} = require('../utils/constants');
const { MemeValidator } = require('./validators');

ipcMain.on(ADD_IMAGE, (event, args) => {
    // console.error('hola event ', event, args);
    if (args.length && MemeValidator.validate(args[0])) {
        console.error('hola!')
    }
});