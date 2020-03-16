import React, {useState} from 'react';

const Message = (props) => {
    const { temp, text } = props;
    const timeout = props.timeout || 20000;
    const [message, setMessage] = useState(text);

    if (temp) {
        setTimeout(() => setMessage(null), timeout);
    }

    return (
        <span className={message ? 'message' : 'hidden'}>
            {message}
        </span>
    )
}

export default Message;