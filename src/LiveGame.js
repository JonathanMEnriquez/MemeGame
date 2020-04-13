import React, {useContext, useState} from 'react';
import './css/LiveGame.css';
import GameContext from './GameContext';

const LiveGame = (props) => {
    const { players, round, judge, automaticProgressGame, 
            deck, maxTimePerRound, startNewRound,
            getJudgesContinueAction } = useContext(GameContext);
    const liveGameStates = {
        round: 'ro',
        caption: 'ca',
        display: 'di',
        winner: 'wi',
        playerVote: 'pl',
    }
    const [liveGameMode, setLiveGameMode] = useState(liveGameStates.round);

    const switchAfterTwoSeconds = () => {
        setTimeout(() => setLiveGameMode(liveGameStates.caption), 1000 * 2);
    }

    const getPlayerColor = (name) => {
        return players.find(p => p.name === name).color;
    }

    const generateContent = () => {
        switch(liveGameMode) {
            case liveGameStates.round:
                switchAfterTwoSeconds();
                return (
                    <div className="round">
                        <p>ROUND {round.number}</p>
                    </div>
                )
            case liveGameStates.caption:
                return (
                    <div className="caption">
                        <div className="header">
                            <p>ROUND {round.number}</p>
                        </div>
                        <div className="judge">
                            <p>The Honorable Judge {round.judge.name} is presiding.</p>
                        </div>
                        <div className="main">
                            {round.caption.content}
                        </div>
                        <div className="submitted">
                            {round.submissions.map((sub, key) => {
                                return (
                                    <div className="player"
                                        style={{color: getPlayerColor(sub.player)}}
                                        key={key}>
                                        {sub.player}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            default:
                return <div>Something has gone wrong.</div>
        }
    }

    const isMode = (mode) => {
        return liveGameMode === liveGameStates[mode];
    }

    const allPlayersHaveSubmitted = () => {
        console.log(round.submissionsSize(), players.length - 1);
        return round.submissions.length === players.length - 1;
    }

    const checkIfJudgeIsReady = async() => {
        if (allPlayersHaveSubmitted()) {
            if (await getJudgesContinueAction()) {
                console.log('woooot');
                setLiveGameMode(liveGameMode.display);
            } else {
                console.log("something bad happened");
            }
        }
    };

    checkIfJudgeIsReady();

    return (
        <div className="live-game">
            {generateContent()}
        </div>
    )
}

export default LiveGame;