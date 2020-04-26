import React, {useState, useEffect, useContext} from 'react';
import '../css/Vote.css';
import GameContext from '../contextStore/GameContext';

const Vote = (props) => {
    const { submissions, round, deck } = props;
    const { sendChoicesForSelecting, ballotCollection } = useContext(GameContext);
    const [ballotsSet, setBallotsSet] = useState(false);

    const collection = ballotCollection;

    useEffect(() => init(), []);

    const init = () => {
        setUpBallots();
        const strippedDownBallots = collection.stripDownBallots();
        sendChoicesForSelecting(strippedDownBallots);
    };

    const setUpBallots = () => {
        if (!ballotsSet) {
            submissions.forEach((sub, idx) => {
                const card = deck.getCardByMemeId(sub.card);  
                collection.addBallot(sub.player, idx, card);
            });

            setBallotsSet(true);
        }

        return null;
    };

    return (
        <div className="vote">
            <div className="vote-caption">
                {round.caption.content}
            </div>
            <div className="ballot-cards">
                {collection.collection && collection.collection.length && collection.collection.map((ballot, key) => {
                    return (
                        <div className="ballot" key={key}>
                            <div className="card"
                                style={{backgroundImage: `url(${ballot.card.data})`}}>
                            </div>
                            <p>{ballot.number}</p>
                        </div>
                    )
                })}
            </div>
            <p className="rules"><strong>Choose your favorite</strong>The Judge awards one Point, while the winner of the player's vote gets half a point.</p>
        </div>
    )
}

export default Vote;