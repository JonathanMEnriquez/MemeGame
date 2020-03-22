import React, {Component} from 'react';
import Dropzone from './Dropzone';
import './css/ImageDragAndDrop.css';
import UploadImg from './img/upload-img.png';
import { generateUniqueImageName } from './utils/Randoms';
import Meme from './classes/Meme';
import GameContext from './GameContext';
import ImagePreview from './ImagePreview';
import Renderer from './Renderer';
import Message from './Message';

class ImageDragAndDrop extends Component {
    state = {
        uploading: false,
        dashboard: false,
        previewImages: [],
        messages: [],
    }

    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
              resolve(reader.result);
            };
            reader.onerror = function (error) {
              reject('Error: ', error);
            };
        });
    }

    removeImage(imgId) {
        const renderer = new Renderer();
        const { removeMeme } = this.context;
        if (renderer.deleteImgFromStore(imgId)) {
            const dupe = this.state.previewImages.slice(0).filter(img => img.id !== imgId);
            this.setState({previewImages: dupe});
            removeMeme(imgId);
            this.addMessage(`Deleted image from your collection`);
        }
    }

    addMessage(msg) {
        const mArr = [...this.state.messages, msg];
        this.setState({messages: mArr});
    }

    async onDrop(files) {
        this.setState({uploading: true, dashboard: true});
        const renderer = new Renderer();
        const { addMeme, memes } = this.context;
        const usedNames = memes.map(m => m.id);
        const images = [...this.state.previewImages];
        for (let f of files) {
            if ('type' in f && f.type.split('/')[0] === 'image') {
                const splitName = f.name.split('.');
                const originalName = splitName[0];
                const extension = '.'.concat(splitName[1]);
                const imgName = generateUniqueImageName(usedNames, extension);
                const imgData = await this.getBase64(f);
                const newMeme = new Meme(imgName, imgData, extension, originalName);
                const saved = renderer.storeNewImage(newMeme);
                if (saved) {
                    images.push(newMeme);
                    this.setState({previewImages: images});
                    addMeme(newMeme);
                } else {
                    this.addMessage(`Failed to save ${f.name}`);
                }
            }
        }
        this.setState({uploading: false});
    }

    returnToDragAndDropView() {
        this.setState({'dashboard': false, messages: []});
    }

    render() {
        const { uploading, dashboard, previewImages, messages } = this.state;
        const icon = { src: UploadImg, alt: 'Add Image(s)' };

        return (
            <div className="title-body-modal-content">
                {!uploading && !dashboard &&
                <Dropzone onDrop={this.onDrop.bind(this)} icon={icon} text="Drop new memes to add to your game collection!" />
                }
            {dashboard &&
                <div className={uploading ? 'dashboard no-action' : 'dashboard'}>
                    <div className="messages">
                        {messages.map((m, key) => {
                            return <Message temp={1} key={key} timeout={15000} text={m} />;
                        })}
                    </div>
                    {previewImages.map((nImg, i) => {
                        return <ImagePreview 
                                meme={nImg}
                                key={i} 
                                removeImage={(id) => this.removeImage(id)}
                                isLive={!uploading && dashboard} />
                    })}
                    {!uploading &&
                        <p className="upload-more" onClick={this.returnToDragAndDropView.bind(this)}>Upload More Images</p>
                    }
                </div>
            }
        </div>
        );
    }
}

ImageDragAndDrop.contextType = GameContext;

export default ImageDragAndDrop;