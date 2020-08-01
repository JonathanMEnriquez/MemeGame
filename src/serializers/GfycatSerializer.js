import Meme from '../classes/Meme';

export function serializeToMeme(entry) {
    if (!entry) return;
    return new Meme(
        '', 
        entry.content_urls.largeGif.url, 
        entry.content_urls.max1mbGif.url, 
        'URL', 
        'gif',
        entry.title || entry.gfySlug || entry.gfyName || 'Gfycat-'.concat(entry.gfyId), 
        'Gfycat', 
        entry.gfyNumber);
}

export function serializeToMemeList(results) {
    const cleaned = _filterOutBadResults(results);
    return cleaned.map(res => {
        return serializeToMeme(res);
    });
}

const _filterOutBadResults = (res) => {
    return res.filter(entry => entry.content_urls !== undefined);
}
