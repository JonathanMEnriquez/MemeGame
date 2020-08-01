class Deck {
    constructor(memes) {
        this.cards = memes;
        this.usedCards = [];
    }

    count() {
        return this.cards.length;
    }

    add(meme) {
        this.cards.push(meme);
    }

    remove(memeId) {
        this.cards = this.cards.filter(m => m.id !== memeId);
    }

    isEmpty() {
        return this.cards == null || this.cards.length <= this.usedCards.length;
    }

    getCardByMemeId(memeId) {
        return this.cards.find(card => card.id === memeId);
    }

    _getRandomCard() {
        if (!this.isEmpty()) {
            return this.cards[Math.floor(Math.random() * this.cards.length)];
        }

        return null;
    }

    getRandomCard() {
        let meme = this._getRandomCard();
        while (meme && this.usedCards.includes(meme.id)) {
            meme = this._getRandomCard();
        }
        if (meme) {
            this.usedCards.push(meme.id);
        }

        return meme;
    }

    getRandomHand(total) {
        let cardsInHand = 0;
        let hand = [];
        while (total > cardsInHand && !this.isEmpty()) {
            const card = this.getRandomCard();
            if (!card) {
                break;
            }
            hand.push(card);
            cardsInHand += 1;
        }

        if (total === hand.length) {
            return hand;
        }

        return null;
    }

    hasEnoughCardsForNextRound(playersCount, cardsPerPlayer) {
        return (playersCount * cardsPerPlayer + this.usedCards.length) > this.cards.length;
    }
}

export default Deck;