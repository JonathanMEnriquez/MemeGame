import React, {useState, useEffect} from 'react';
import '../css/DiscoverDisplay.css';
import { serializeToMemeList } from '../serializers/TenorSerializer';

const DiscoverDisplay = (props) => {
    const { fetchService } = props;
    const [display, setDisplay] = useState([]);

    useEffect(() => {
        getTrendingGifs();
    }, []);

    const getTrendingGifs = async() => {
        try {
            const data = await fetchService.getTrendingGifs();
            console.log('data ', data);
            console.log(serializeToMemeList(data.results));
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <div className="discover-display">
            HOLA
        </div>
    )
}

export default DiscoverDisplay;