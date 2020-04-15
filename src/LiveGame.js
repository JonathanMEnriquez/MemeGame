import React, {useContext, useState} from 'react';
import './css/LiveGame.css';
import GameContext from './GameContext';
import SubmissionsDisplay from './SubmissionsDisplay';
import Announcement from './reusable/Announcement';
import Vote from './Vote';

const LiveGame = (props) => {
    const { players, round, judge, automaticProgressGame, 
            deck, maxTimePerRound, startNewRound,
            getJudgesContinueAction } = useContext(GameContext);
    const liveGameStates = {
        round: 'ro',
        caption: 'ca',
        display: 'di',
        announceVote: 'an',
        winner: 'wi',
        vote: 'vo',
    }
    const [announcement, setAnnouncement] = useState(`ROUND ${round.number}`);
    const [liveGameMode, setLiveGameMode] = useState(liveGameStates.round);
    const [shuffledSubmissions, setShuffledSubmissions] = useState();

    console.log(shuffledSubmissions);

    const switchAfterTwoSeconds = (liveGameState) => {
        setTimeout(() => setLiveGameMode(liveGameState), 1000 * 2);
    }

    const getPlayerColor = (name) => {
        return players.find(p => p.name === name).color;
    }

    const prepareToVote = () => {
        setAnnouncement('It\'s time to vote!');
        setLiveGameMode(liveGameStates.announceVote);
    }

    const generateContent = () => {
        switch(liveGameMode) {
            case liveGameStates.round:
                switchAfterTwoSeconds(liveGameStates.caption);
                return <Announcement content={announcement} />
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
            case liveGameStates.display:
                return <SubmissionsDisplay 
                        deck={deck} 
                        round={round}
                        shuffledSubmissions={shuffledSubmissions}
                        setGameModeToVote={prepareToVote} />
            case liveGameStates.announceVote:
                switchAfterTwoSeconds(liveGameStates.vote);
                return <Announcement content={announcement} />
            case liveGameStates.vote:
                return <Vote submissions={shuffledSubmissions} 
                        players={players}
                        round={round}
                        deck={deck} />
            default:
                return <div>Something has gone wrong.</div>
        }
    }

    const allPlayersHaveSubmitted = () => {
        return round.submissions.length === players.length - 1;
    };

    const shuffleSubmissions = () => {
        if (!shuffledSubmissions) {
            const rand = round.shuffleAndReturnSubmissions();
            console.log(rand);
            setShuffledSubmissions(rand);
        }
    };

    const checkIfJudgeIsReady = async() => {
        if (allPlayersHaveSubmitted()) {
            if (await getJudgesContinueAction()) {
                shuffleSubmissions();
                setLiveGameMode(liveGameStates.display);
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