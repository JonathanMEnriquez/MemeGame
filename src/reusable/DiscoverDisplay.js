import React, {useState, useEffect} from 'react';
import '../css/DiscoverDisplay.css';
import { serializeToMemeList } from '../serializers/TenorSerializer';
import OptionsDisplay from './OptionsDisplay';

const DiscoverDisplay = (props) => {
    const { fetchService } = props;
    const [display, setDisplay] = useState([]);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        getTrendingGifs();
    }, []);

    const getTrendingGifs = async() => {
        try {
            const data = await fetchService.getTrendingGifs();
            setDisplay(serializeToMemeList(data.results));
        } catch(err) {
            console.error(err);
        }
    }

    const toggleSingleSelected = (select, gif) => {
        if (select) {
            setSelected([...selected, gif]);
        } else {
            setSelected(selected.filter(g => g !== gif));
        }
    }

    return (
        <div className="discover-display">
            <OptionsDisplay display={display} toggleSingleSelected={toggleSingleSelected} />
            {selected.length && 
                // button to add to collection
                // TODO: COMPLETE THIS, CLEAN COLLECTION OF OLD PICS AND ADD 
                // ADD SEARCH
                // ADD GIPHY
                <div></div>
            }
        </div>
    )
}

export default DiscoverDisplay;