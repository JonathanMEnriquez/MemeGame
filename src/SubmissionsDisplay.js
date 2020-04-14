import React, {useState, useEffect} from 'react';
import './css/SubmissionsDisplay.css';

const SubmissionsDisplay = (props) => {
    const { deck, round, judge, setGameModeToVote } = props;
    const [submission, setSubmission] = useState();
    const shuffledSubmissions = round.shuffleAndReturnSubmissions();
    const timePerSubmission = 1000 * 6;

    const setSubmissionToDisplay = (idx) => {
        console.log('set submission called with idx ', idx);
        const card = deck.getCardByMemeId(shuffledSubmissions[idx].card);
        console.log('to display: ', card);
        console.log(round.submissionsSize());
        setSubmission(card);
        if (idx + 1 < round.submissionsSize()) {
            const nextIdx = idx + 1;
            console.log('calling it again with idx of ' + nextIdx);
            setTimeout(() => setSubmissionToDisplay(nextIdx), timePerSubmission);
        } else {
            setTimeout(() => setGameModeToVote(), timePerSubmission);
        }
    }

    const getIndexForSubmission = () => {
        return round.submissions.findIndex(sub => sub.card === submission.id);
    }

    useEffect(() => setSubmissionToDisplay(0), []);

    return (
        <div className="submissions-display">
            {submission &&
                <p>Submission Number {getIndexForSubmission()}</p>
            }
            {submission && submission.data &&
                <div className="submission"
                    style={{backgroundImage: `url(${submission.data})`}}>
                </div>
            }
            {submission && round.caption &&
                <p className="submission-caption">{round.caption.content}</p>
            }
            {!submission &&
                <span>Loading submissions...</span>
            }
        </div>
    )
}

export default SubmissionsDisplay;