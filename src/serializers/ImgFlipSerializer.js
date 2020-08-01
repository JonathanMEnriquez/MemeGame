import Meme from '../classes/Meme';

export function serializeToMeme(entry) {
    const extension = entry.url.split('.');
    return new Meme(
        '', 
        entry.url,
        undefined, 
        'URL', 
        extension.length > 2 ? extension[2] : 'image', 
        entry.name || 'ImgFlip-'.concat(entry.id), 
        'ImgFlip', 
        entry.id);
}

export function serializeToMemeList(results) {
    return results.map(res => {
        return serializeToMeme(res);
    });
}
