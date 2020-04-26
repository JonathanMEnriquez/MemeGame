import React, {useContext} from 'react';
import '../css/Standings.css';
import GameContext from '../contextStore/GameContext';

const Standings = (props) => {
    const { players, round } = props;
    const { goalPoints } = useContext(GameContext);
    const playersInOrderOfPoints = [...players].sort((a, b) => a.points > b.points);

    const percentageOfRequiredPoints = (points) => {
        return `${Math.round(points / goalPoints * 100)}%`;
    };

    const heightBasedOnTotalPlayers = () => {
        return `${Math.floor(100 / players.length - 2)}%`
    };

    return (
        <div className="standings">
            <div className="standings-header">
                <h4>STANDINGS</h4>
                <span>after {round.number} round{round.number === 1 ? '' : 's'}</span>
                <p>{goalPoints} total points to win</p>
            </div>
            <div className="player-standings">
                {playersInOrderOfPoints.map((player, key) => {
                    return (
                        <div className="player-container"
                            style={{height: heightBasedOnTotalPlayers()}}
                            key={key}>
                            <div className="player-info">
                                {player.name}
                            </div>
                            <div className="point-percentage">
                                <div
                                    style={{width: percentageOfRequiredPoints(player.points), backgroundColor: player.color}}>
                                        <span>{player.points}</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Standings;