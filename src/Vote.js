import React, {useState, useEffect, useContext} from 'react';
import './css/Vote.css';
import BallotCollection from './classes/Ballot';
import GameContext from './GameContext';

const Vote = (props) => {
    const { submissions, players, round, deck } = props;
    const { sendChoicesForSelecting } = useContext(GameContext);
    console.log('what the fuck?  ', sendChoicesForSelecting);
    const [ballots, setBallots] = useState();

    useEffect(() => init(), []);

    const init = () => {
        const collection = setUpBallots();
        if (collection) {
            const strippedDownBallots = collection.stripDownBallots();
            console.log(strippedDownBallots, sendChoicesForSelecting);
            sendChoicesForSelecting(strippedDownBallots);
            setBallots(collection);
        }
    };

    const setUpBallots = () => {
        if (!ballots) {
            const collection = new BallotCollection();

            submissions.forEach((sub, idx) => {
                const card = deck.getCardByMemeId(sub.card);  
                collection.addBallot(sub.player, idx, card);
            });

            return collection;
        }

        return null;
    };

    //TODO: add method callback to gameprovider

    return (
        <div className="vote">
            <div className="vote-caption">
                {round.caption.content}
            </div>
            <div className="ballot-cards">
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
            </div>
            <p className="rules"><strong>Choose your favorite</strong>The Judge awards one Point, while the winner of the player's vote gets half a point.</p>
        </div>
    )
}

export default Vote;