import React, {useContext, useState} from 'react';
import GameContext from '../contextStore/GameContext';
import '../css/Collection.css';
import ImagePreview from '../reusable/ImagePreview';
import Upload from '../img/upload-img.png';

const Collection = (props) => {
    const { uploadMode, showMemeDetail } = props;
    const { memes } = useContext(GameContext);
    const [collection, setCollection] = useState(memes.collection || []);
    
    const deleteMeme = async(memeId) => {
        await memes.deleteMeme(memeId);
        setCollection(memes.collection);
    }

    return (
        <div className="meme-collection">
            <div className="header">
                <img className="upload-more"
                    src={Upload}
                    alt="Upload More"
                    onClick={uploadMode} />
                <span>Game Collection</span>
            </div>
            {collection.map((meme, key) => {
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