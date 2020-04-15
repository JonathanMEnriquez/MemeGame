import React, {useState, useEffect} from 'react';
import './css/Vote.css';
import BallotCollection from './classes/Ballot';

const Vote = (props) => {
    const { submissions, players, round, deck } = props;
    const [ballots, setBallots] = useState();

    useEffect(() => setUpBallots(), []);

    const setUpBallots = () => {
        if (!ballots) {
            const collection = new BallotCollection();

            submissions.forEach((sub, idx) => {
                const card = deck.getCardByMemeId(sub.card);  
                collection.addBallot(sub.player, idx, card);
            });

            setBallots(collection);
        }
    }

    //TODO: add method callback to gameprovider

    return (
        <div className="vote">
            {ballots && ballots.collection.map((ballot, key) => {
                return (
                    <div className="ballot" key={key}>
                        <div className="card"
                            style={{backgroundImage: `url(${ballot.card.data})`}}>
                        </div>
                        <p>Choice: {ballot.number}</p>
                    </div>
                )
            })}
            <p className="rules">Choose your favorite. The Judge awards one Point, while the rest of the players vote for 
                half a point for their favorite.</p>
        </div>
    )
}

export default Vote;