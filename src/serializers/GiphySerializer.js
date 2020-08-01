import Meme from '../classes/Meme';

export function serializeToMeme(entry) {
    return new Meme(
        '', 
        entry.images.original.url, 
        entry.images.fixed_width_downsampled.url, 
        'URL', 
        entry.type, 
        entry.slug || 'Giphy-'.concat(entry.id), 
        'Giphy', 
        entry.id);
}

export function serializeToMemeList(results) {
    return results.map(res => {
        return serializeToMeme(res);
    });
}
