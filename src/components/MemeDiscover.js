import React, {useState, useEffect} from 'react';
import '../css/MemeDiscover.css';
import TenorFetch from '../webservices/Tenor';
import DiscoverDisplay from '../reusable/DiscoverDisplay';

const MemeDiscover = (props) => {
    const providers = {
        Tenor: 'Tenor',
        Giphy: 'Giphy',
    }
    const [provider, setProvider] = useState(providers.Tenor);

    useEffect( () => {
        console.log(`hello`);

        return ( ()=>{
            console.log(`cleanup similar to componentWillUnmount`);
        });
    }, []);

    const switchProvider = (value) => {
        if (!value || value === provider) {
            // do nothing
            return
        }
        console.log('switching to ' + value);
    }

    const getWebFetchService = () => {
        switch(provider) {
            case providers.Tenor:
                return new TenorFetch();
            default:
                return new TenorFetch();
        }
    }

    return (
        <div className="meme-discover">
            <div className="discover-header">
                <div className="discover-search">
                    <input placeholder="Search" />
                </div>
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
            <DiscoverDisplay fetchService={getWebFetchService()} />
        </div>
    )
}

export default MemeDiscover;