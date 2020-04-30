import React, {useState, useEffect} from 'react';
import '../css/SubmissionsDisplay.css';

const SubmissionsDisplay = (props) => {
    const { deck, round, setGameModeToVote, shuffledSubmissions } = props;
    const [submission, setSubmission] = useState();
    const timePerSubmission = 1000 * 10;

    const setSubmissionToDisplay = (idx) => {
        const card = deck.getCardByMemeId(shuffledSubmissions[idx].card);
        setSubmission(card);
        if (idx + 1 < round.submissionsSize()) {
            const nextIdx = idx + 1;
            setTimeout(() => setSubmissionToDisplay(nextIdx), timePerSubmission);
        } else {
            setTimeout(() => setGameModeToVote(), timePerSubmission);
        }
    }

    const getIndexForSubmission = () => {
        const idx = shuffledSubmissions.findIndex(sub => sub.card === submission.id);
        return idx + 1;
    }

    useEffect(() => setSubmissionToDisplay(0), []);

    return (
        <div className="submissions-display">
            {submission &&
                <p className="submissions-header">Submission Number {getIndexForSubmission()}</p>
            }
            {submission && submission.data &&
                <div className="meme-display">
                    <div className="submission"
                        style={{backgroundImage: `url(${submission.data})`}}>
                    </div>
                    <div className="submission-caption">
                        <p>{round.caption.content}</p>
                    </div>
                </div>
            }
            {!submission &&
                <span>Loading submissions...</span>
            }
        </div>
    )
}

export default SubmissionsDisplay;