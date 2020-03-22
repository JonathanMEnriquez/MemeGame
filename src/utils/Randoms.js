const _generateImageName = () => {
    const rand = Math.floor(Math.random() * 1000000);
    return 'meme-'.concat(rand);
}

export function generateJoinCode() {
    const alphanumeric = Math.random().toString(36).replace('0.', '');
    return alphanumeric.slice(0, 6);
}

export function generateUniqueImageName(list, ext) {
    let imgName = _generateImageName();
    while (list.includes(imgName)) {
        imgName = _generateImageName();
    }
    return imgName.concat(ext);
}
