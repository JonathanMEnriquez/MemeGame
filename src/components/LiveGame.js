import React, {useContext, useState, useEffect} from 'react';
import '../css/LiveGame.css';
import GameContext from '../contextStore/GameContext';
import SubmissionsDisplay from './SubmissionsDisplay';
import Announcement from '../reusable/Announcement';
import Vote from './Vote';
import Standings from './Standings';

const LiveGame = (props) => {
    const { players, round, judge, automaticProgressGame, 
            deck, maxTimePerRound, startNewRound,
            getJudgesContinueAction, ballotCollection,
            socketSendWinnerInfo, getStartRoundResponseFromJudge
            } = useContext(GameContext);
    const liveGameStates = {
        round: 'ro',
        caption: 'ca',
        display: 'di',
        announceVote: 'an',
        winner: 'wi',
        vote: 'vo',
        standings: 'st',
        announceRoundWinner: 'anwi',
    }
    const [announcement, setAnnouncement] = useState(`ROUND ${round.number}`);
    const [liveGameMode, setLiveGameMode] = useState(liveGameStates.round);
    const [shuffledSubmissions, setShuffledSubmissions] = useState();

    const switchAfterXSeconds = (liveGameState, milliseconds) => {
        setTimeout(() => setLiveGameMode(liveGameState), milliseconds);
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
                switchAfterXSeconds(liveGameStates.caption, 2000);
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
                switchAfterXSeconds(liveGameStates.vote, 2000);
                return <Announcement content={announcement} />
            case liveGameStates.vote:
                return <Vote submissions={shuffledSubmissions} 
                        players={players}
                        round={round}
                        deck={deck} />
            case liveGameStates.announceRoundWinner:
                switchAfterXSeconds(liveGameStates.standings, 5000);
                return <Announcement content={announcement} />
            case liveGameStates.standings:
                return <Standings 
                        players={players}
                        round={round}
                        switchToNewRoundView={() => setLiveGameMode(liveGameStates.round)}
                        getStartRoundResponseFromJudge={getStartRoundResponseFromJudge}
                        startNewRound={startNewRound} />
            case liveGameStates.winner:
                return <div>winner</div>
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
            setShuffledSubmissions(rand);
        }
    };

    const checkIfJudgeIsReady = async() => {
        if (!round.judgeReady && allPlayersHaveSubmitted()) {
            if (await getJudgesContinueAction()) {
                shuffleSubmissions();
                round.setJudgeAsReady();
                setLiveGameMode(liveGameStates.display);
            } else {
                console.error("Should not happen.");
            }
        }
    };

    const checkIfAllPlayersHaveVoted = () => {
        if (!round.isComplete() && allVotesAreIn()) {
            const judgesChoice = ballotCollection.getJudgesChoice(),
                playersChoice = ballotCollection.getPeoplesChoice();

            round.setWinner(judgesChoice.name, 'judge');
            round.setWinner(playersChoice && playersChoice.name, 'players');
            round.setAsComplete();

            const judgeChoicePlayer = players.find(player => player.name === judgesChoice.name);
            const playersChoicePlayer = players.find(player => playersChoice && player.name === playersChoice.name);
            judgeChoicePlayer.addPoints();
            if (playersChoicePlayer) {
                playersChoicePlayer.addPoint();
            }
            const newAnnouncement = `Round winner: \n${judgesChoice.name}\n`
                    .concat(
                        playersChoice === undefined ?
                        `\nNo one earned a majority of the vote of the people` :
                        `Player's choice: \n${playersChoice.name}`
                    )
            setAnnouncement(newAnnouncement);
            socketSendWinnerInfo(judgesChoice.name, playersChoice && playersChoice.name);
            setLiveGameMode(liveGameStates.announceRoundWinner);
        }
    }

    const allVotesAreIn = () => {
        return ballotCollection.totalVotesCast() === players.length;
    };

    useEffect(() => setShuffledSubmissions(), [round]);

    // TODO - REWRITE TO UTILIZE USEEFFECT
    checkIfJudgeIsReady();
    checkIfAllPlayersHaveVoted();

    return (
        <div className="live-game">
            {generateContent()}
        </div>
    )
}

export default LiveGame;