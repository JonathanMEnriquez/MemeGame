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
        this.playersChoice = '';
        this.submissions = [];
        this.judgeReady = false;
        this.complete = false;
    }

    setWinner(name, type) {
        if (!name) {
            return
        }

        if (type === 'judge') {
            this.winner = name;
        } else if (type === 'players') {
            this.playersChoice = name;
        }
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

    _getRandomSubmissionIndex(subs) {
        return Math.floor(Math.random() * subs.length);
    }

    _swapTwoRandomSubmissions(subs) {
        const randIdx1 = this._getRandomSubmissionIndex(subs);
        const randIdx2 = this._getRandomSubmissionIndex(subs);
        if (randIdx1 !== randIdx2) {
            const tempVal = subs[randIdx1];
            subs[randIdx1] = subs[randIdx2];
            subs[randIdx2] = tempVal;
        }
    }

    shuffleAndReturnSubmissions() {
        let subs = [...this.submissions];

        for (let i = 0; i < subs.length; i++) {
            this._swapTwoRandomSubmissions(subs);
        }

        return subs;
    }

    getJudgeReady() {
        return this.judgeReady();
    }

    setJudgeAsReady() {
        if (!this.judgeReady) {
            this.judgeReady = true;
        }
    }

    isComplete() {
        return this.complete;
    }

    setAsComplete() {
        this.complete = true;
    }
}

export default Round;