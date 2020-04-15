import React from 'react';
import '../css/Announcement.css';

const Announcement = (props) => {
    const { content } = props;

    return (
        <div className="announcement">
            {content}
        </div>
    )
}

export default Announcement;