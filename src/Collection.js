import React, {useContext} from 'react';
import GameContext from './GameContext';
import './css/Collection.css';
import Renderer from './Renderer';
import ImagePreview from './ImagePreview';
import Upload from './img/upload-img.png';

const Collection = (props) => {
    const { uploadMode, showMemeDetail } = props;
    const { memes, syncMemes } = useContext(GameContext);
    const renderer = new Renderer();
    
    const deleteMeme = (memeId) => {
        if (renderer.deleteImgFromStore(memeId)) {
            const dupe = memes.filter(m => m.id !== memeId);
            syncMemes(dupe);
        }
    }

    return (
        <div className="meme-collection">
            <div className="header">
                <img className="upload-more"
                    src={Upload}
                    alt="Upload More"
                    onClick={uploadMode} />
            </div>
            <h1>Meme Collection</h1>
            {memes.map((meme, key) => {
                return <ImagePreview 
                    meme={meme} 
                    key={key} 
                    removeImage={(id) => deleteMeme(id)} 
                    isLive={true}
                    clickHandler={showMemeDetail} />
            })}
        </div>
    )
}

export default Collection;