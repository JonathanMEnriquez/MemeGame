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
        const dupe = this.state.previewImages.slice(0).filter(img => img.id !== imgId);
        this.setState({previewImages: dupe});
        renderer.deleteImgFromStore(imgId);
        this.addMessage(`Deleted image from your collection`);
    }

    addMessage(msg) {
        const mArr = [...this.state.messages, msg];
        this.setState({messages: mArr});
    }

    async onDrop(files) {
        this.setState({uploading: true, dashboard: true});
        const renderer = new Renderer();
        const images = [...this.state.previewImages];
        for (let f of files) {
            if ('type' in f && f.type.split('/')[0] === 'image') {
                const splitName = f.name.split('.');
                const originalName = splitName[0];
                const extension = '.'.concat(splitName[1]);
                const imgName = generateUniqueImageName([], extension);
                const imgData = await this.getBase64(f);
                const newMeme = new Meme(imgName, imgData, extension, originalName);
                const saved = renderer.storeNewImage(newMeme);
                if (saved) {
                    images.push(newMeme);
                    this.setState({previewImages: images});
                } else {
                    this.addMessage(`Failed to save ${f.name}`);
                }
            }
        }
        this.setState({uploading: false});
    }

    render() {
        const { uploading, dashboard, previewImages, messages } = this.state;
        const icon = { src: UploadImg, alt: 'Add Image(s)' };

        return (
            <div className="title-body-modal-content">
                {!uploading && !dashboard &&
                <Dropzone onDrop={this.onDrop.bind(this)} icon={icon} text="Drop new images to add to your game collection!" />
                }
            {dashboard &&
                <div className={uploading ? 'dashboard no-action' : 'dashboard'}>
                    {messages.map((m, key) => {
                        return <Message temp={1} key={key} timeout={15000} text={m} />;
                    })
                    }
                    {previewImages.map((nImg, i) => {
                        const { id, alt, data } = nImg;
                        return <ImagePreview src={data} alt={alt} key={i} id={id} removeImage={(id) => this.removeImage(id)} isLive={!uploading && dashboard} />
                    })}
                </div>
            }
        </div>
        );
    }
}

ImageDragAndDrop.contextType = GameContext;

export default ImageDragAndDrop;