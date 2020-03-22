import React from 'react';
import './css/MemeDetail.css';
import DynamicInput from './DynamicInput';
import Renderer from './Renderer';
import Detail from './reusable/Detail';

const MemeDetail = (props) => {
    const { meme, returnToCollectionView } = props;
    const { alt, data, id, addedOn } = meme;
    const legibleAddedOn = new Date(addedOn).toLocaleDateString();
    const [, updateState] = React.useState();
    const DETAILFONTSIZE = '2vw';

    const updateMemeDetail = (property, newVal) => {
        if (newVal && newVal.length && meme[property] !== newVal) {
            const renderer = new Renderer();
            meme[property] = newVal;
            renderer.updateImage(meme);
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
            </div>
        </div>
    )
}

export default MemeDetail;