class Ballot {
    constructor(name, number, meme) {
        this.name = name;
        this.number = number;
        this.card = meme;
        this.votes = 0;
    }
}

class BallotCollection {
    constructor() {
        this.collection = [];
    }

    _findBallotByNameOrReturnUndefined(name) {
        return this.collection.find(ballot => ballot.name === name);
    }

    addBallot(name, idx, meme) {
        this.collection.push(new Ballot(name, idx, meme));
    }

    addVote(name) {
        const player = this._findBallotByNameOrReturnUndefined(name);
        if (player) {
            player.votes += 1;
        }
    }

    stripDownBallots() {
        return this.collection.map(ballot => {
            return { name: ballot.name, number: ballot.number };
        });
    }
}

export default BallotCollection;