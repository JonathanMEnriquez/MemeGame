const _generateImageName = () => {
    const rand = Math.floor(Math.random() * 1000000);
    return 'meme-'.concat(rand);
}

export function generateJoinCode() {
    let code = '';
    for (let i = 0; i < 4; i++) {
        const char = Math.floor(Math.random() * 26) + 65;
        code += String.fromCharCode(char);
    }
    return code;
}

export function generateUniqueImageName(list, ext) {
    let imgName = _generateImageName();
    while (list.includes(imgName)) {
        imgName = _generateImageName();
    }
    return imgName.concat(ext);
}

const _getRandomCard = (pile) => {
    return pile[Math.floor(Math.random() * pile.length)];
}

export function getRandomCardFromPile(pile, taken) {
    let card = _getRandomCard(pile);
    while (taken.includes(card.id)) {
        card = _getRandomCard(pile);
    }
    return card;
}

export function getRandomHand(pile, taken, total) {
    let hand = [];
    while (total) {
        const card = getRandomCardFromPile(pile, taken);
        taken.push(card.id);
        hand.push(card);
        total -= 1;
    }
    return hand;
}
