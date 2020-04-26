import React, {useState, useEffect} from 'react';
import '../css/DiscoverDisplay.css';
import OptionsDisplay from './OptionsDisplay';
import MenuButton from '../reusable/MenuButton';

const DiscoverDisplay = (props) => {
    const { fetchService, memes, searchTerm, searchById } = props;
    const [display, setDisplay] = useState([]);
    const [selected, setSelected] = useState([]);
    const displayButton = selected.length > 0;

    useEffect(() => {
        setSelected([]);
        if (searchById) {
            getGifById();
        } else if (searchTerm && searchTerm.length) {
            searchForGifs(searchTerm);
        } else {
            getTrendingGifs();
        }
    }, [fetchService, searchTerm]);

    useEffect( () => {
        return ( ()=>{
            setSelected([]);
        });
    }, []);

    const getTrendingGifs = async() => {
        try {
            const serializedData = await fetchService.getTrendingGifs(true);
            setDisplay(serializedData);
        } catch (err) {
            console.error(err);
        }
    };

    const searchForGifs = async() => {
        try {
            const serializedData = await fetchService.getGifsBySearchTerm(searchTerm, true);
            setDisplay(serializedData);
        } catch (err) {
            console.error(err);
        }
    };

    const getGifById = async() => {
        try {
            const serializedData = await fetchService.getGifById(searchById, true);
            setDisplay(serializedData);
        } catch (err) {
            console.error(err);
        }
    };

    const toggleSingleSelected = (select, gif) => {
        if (select) {
            setSelected([...selected, gif]);
        } else {
            setSelected(selected.filter(g => g !== gif));
        }
    };

    const addSelectedToCollection = () => {
        console.info(`Adding ${selected.length} image${selected.length > 1 ? 's' : ''} to the collection.`);
        memes.addMemeList(selected);
        setSelected([]);
    };

    return (
        <div className="discover-display">
            <OptionsDisplay display={display} 
                    toggleSingleSelected={toggleSingleSelected}
                    memes={memes}
                    selected={selected} />
            {displayButton && 
                <div className="save-button">
                    <MenuButton text="Save" clickHandler={addSelectedToCollection} />
                </div>
            }
        </div>
    )
}

export default DiscoverDisplay;