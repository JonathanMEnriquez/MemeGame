import React, {useState, useContext} from 'react';
import '../css/MemeDiscover.css';
import TenorFetch from '../webservices/Tenor';
import DiscoverDisplay from '../reusable/DiscoverDisplay';
import GameContext from '../contextStore/GameContext';
import GiphyFetch from '../webservices/Giphy';
import GfycatFetch from '../webservices/Gfycat';
import ImgFlipFetch from '../webservices/ImgFlip';

const MemeDiscover = (props) => {
    const providers = {
        Giphy: 'Giphy',
        Tenor: 'Tenor',
        Gfycat: 'Gfycat',
        ImgFlip: 'ImgFlip',
    }
    const { memes } = useContext(GameContext);
    const [provider, setProvider] = useState(providers.Gfycat);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchById, setSearchById] = useState();
    const [hideSearch, setHideSearch] = useState(false);

    const switchProvider = (value) => {
        if (!value || value === provider) {
            // do nothing
            return
        }
        console.info(`Switching Provider to ${value}`);

        // ImgFlip's api does does not support search
        const willSetToImgFlip = value === providers.ImgFlip;
        if (willSetToImgFlip) {
            setSearchById(undefined);
            setSearchTerm('');
        }

        setHideSearch(willSetToImgFlip);

        setProvider(value);
    }

    const getWebFetchService = () => {
        switch(provider) {
            case providers.Tenor:
                return new TenorFetch();
            case providers.Giphy:
                return new GiphyFetch();
            case providers.Gfycat:
                return new GfycatFetch();
            case providers.ImgFlip:
                return new ImgFlipFetch();
            default:
                return new TenorFetch();
        }
    }

    const keyDownHandler = (e) => {
        if (e.which === 13 || e.keyCode === 13) {
            if (e.target.value.startsWith('[id]')) {
                const id = e.target.value.replace('[id]', '').trim();
                console.info(`About to search ${provider} for item with id ${id}`);
                setSearchById(id);
                setSearchTerm('');
            } else {
                console.info(`About to search ${provider} for ${e.target.value}`);
                setSearchById(undefined);
                setSearchTerm(e.target.value);
            }
        }

        return true;
    }

    return (
        <div className="meme-discover">
            <div className="discover-header">
                {!hideSearch && 
                    <div className="discover-search">
                        <input placeholder="Search"
                                onKeyDown={keyDownHandler} />
                    </div>
                }
                {providers && Object.keys(providers).map((prov, key) => {
                    return (
                        <span 
                            className={provider === providers[prov] ? 'selected' : ''}
                            key={key}
                            onClick={() => switchProvider(providers[prov])} >
                            {providers[prov]}
                        </span>
                    )
                })}
            </div>
            <DiscoverDisplay memes={memes} 
                fetchService={getWebFetchService()}
                searchTerm={searchTerm}
                searchById={searchById} />
        </div>
    )
}

export default MemeDiscover;