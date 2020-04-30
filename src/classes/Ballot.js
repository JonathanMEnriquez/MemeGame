class Vote {
    constructor(voterName) {
        this.name = voterName;
    }
}

class Ballot {
    constructor(name, number, meme) {
        this.name = name;
        this.number = number;
        this.card = meme;
        this.votes = [];
        this.judgeChoice = false;
    }

    voteCount() {
        return this.votes.length;
    }

    _voterAlreadyVotedForThis(name) {
        return this.votes.find(vote => vote.name === name);
    }

    addVote(voterName) {
        if (!this._voterAlreadyVotedForThis(voterName)) {
            this.votes.push(new Vote(voterName));
        }
    }

    setAsJudgeChoice() {
        this.judgeChoice = true;
    }
}

class BallotCollection {
    constructor() {
        this.collection = [];
        this.judgeChoiceIn = false;
    }

    _findBallotByNameOrReturnUndefined(name) {
        return this.collection.find(ballot => ballot.name === name);
    }

    _findBallotByNumberOrReturnUndefined(number) {
        return this.collection.find(ballot => ballot.number === number);
    }

    addBallot(name, idx, meme) {
        this.collection.push(new Ballot(name, idx, meme));
    }

    addVote(playerName, number) {
        const ballot = this._findBallotByNumberOrReturnUndefined(number);
        console.log('found ballot ', ballot);
        if (ballot) {
            ballot.addVote(playerName);
        }
    }

    stripDownBallots() {
        return this.collection.map(ballot => {
            return { name: ballot.name, number: ballot.number };
        });
    }

    size() {
        return this.collection.length;
    }

    setAsJudgeChoice(choice) {
        const winner = this._findBallotByNumberOrReturnUndefined(choice);
        if (winner && !this.judgeChoiceIn) {
            winner.setAsJudgeChoice();
            this.judgeChoiceIn = true;
        }
    }

    getPeoplesChoice() {
        let max = -1,
            leader = '',
            hasColeader = false;

        this.collection.forEach((ballot, idx) => {
            if (ballot.voteCount() > max) {
                max = ballot.voteCount();
                leader = idx;
                hasColeader = false;
            } else if (ballot.voteCount() === max) {
                hasColeader = true;
            }
        });

        if (!hasColeader) {
            return this.collection[leader];
        }
    }

    getJudgesChoice() {
        return this.collection.filter(ballot => ballot.judgeChoice === true)[0];
    }

    totalVotesCast() {
        const judgeVoted = this.judgeChoiceIn ? 1 : 0;
        return this.collection.reduce((total, ballot) => total + ballot.voteCount(), 0) + judgeVoted;
    }
}

export default BallotCollection;