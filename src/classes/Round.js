class Submission {
    constructor(playerName, cardId) {
        this.player = playerName;
        this.card = cardId;
    }
}

class Round {
    constructor(roundNumber, judge, caption) {
        this.number = roundNumber || 1;
        this.caption = caption;
        this.judge = judge || '';
        this.winner = '';
        this.submissions = [];
    }

    setWinner(name) {
        this.winner = name;
    }

    getWinner() {
        return this.winner;
    }

    isWinner(name) {
        return name === this.winner;
    }

    _playerHasAlreadySubmitted(name) {
        this.submissions.forEach(sub => {
            if (sub.player === name) {
                return true;
            }
        });

        return false;
    }

    addSubmission(playerName, cardId) {
        console.log('about to add a card to the round submissions. ', playerName, cardId);
        if (playerName && cardId) {
            if (!this._playerHasAlreadySubmitted()) {
                this.submissions.push(new Submission(playerName, cardId));
                return true;
            }
        }

        return false;
    }

    submissionsSize() {
        return this.submissions.length;
    }
}

export default Round;