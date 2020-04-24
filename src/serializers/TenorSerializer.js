import Meme from '../classes/Meme';

export function serializeToMeme(entry) {
    return new Meme(
        '', 
        entry.media[0].gif.url, 
        entry.media[0].tinygif.url, 
        'URL', 
        'gif', 
        entry.title || 'Tenor-'.concat(entry.id), 
        'Tenor', 
        entry.id);
}

export function serializeToMemeList(results) {
    return results.map(res => {
        return serializeToMeme(res);
    });
}