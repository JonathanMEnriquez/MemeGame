import React, {useState, useContext} from 'react';
import '../css/MemeDetail.css';
import DynamicInput from '../reusable/DynamicInput';
import Detail from '../reusable/Detail';
import GameContext from '../contextStore/GameContext';

const MemeDetail = (props) => {
    const { meme, returnToCollectionView } = props;
    const { alt, data, id, addedOn, dataType, extension, provider, playable } = meme;
    const { memes } = useContext(GameContext);
    const legibleAddedOn = new Date(addedOn).toLocaleDateString();
    const [, updateState] = useState();
    const DETAILFONTSIZE = '2vw';

    const updateMemeDetail = (property, newVal) => {
        console.log(property, newVal);
        if (newVal && newVal.length && meme[property] !== newVal) {
            memes.updateMeme(meme, property, newVal);
            updateState({});
        }
    }

    return (
        <div className="meme-detail">
            <p className="return"
                onClick={returnToCollectionView}>
                Back to Meme Collection
            </p>
            <div className="meme"
                style={{backgroundImage: `url(${data})`}} >
            </div>
            <div className="meme-info">
                <div className="meme-title">
                    <DynamicInput 
                        text={alt} 
                        clickHandler={(val) => updateMemeDetail('alt', val)} />
                </div>
                <div className="row">
                    <Detail name="gameid"
                            value={id}
                            fontSize={DETAILFONTSIZE} />
                    <Detail name="added"
                            value={legibleAddedOn}
                            fontSize={DETAILFONTSIZE} />
                </div>
                <div className="row">
                    <Detail name="data type"
                            value={dataType}
                            fontSize={DETAILFONTSIZE} />
                    <Detail name="file type"
                            value={extension}
                            fontSize={DETAILFONTSIZE} />
                </div>
                {provider &&
                    <div className="row">
                        <Detail name="provider"
                                value={provider}
                                fontSize={DETAILFONTSIZE} />
                        <Detail name="playable"
                                value={playable === 1 ? 'Yes' : 'No'}
                                fontSize={DETAILFONTSIZE} />
                    </div>
                }
            </div>
        </div>
    )
}

export default MemeDetail;