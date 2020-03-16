import React, {useState} from 'react';
import './css/Message.css';
import Delete from './img/cross.png';

const Message = (props) => {
    const { temp, text } = props;
    const timeout = props.timeout || 20000;
    const [message, setMessage] = useState(text);

    if (temp) {
        setTimeout(() => setMessage(null), timeout);
    }

    const removeMessage = () => {
        setMessage(null);
    }

    return (
        <div className={message ? 'message' : 'hidden'}>
            <span>{message}</span>
            <img src={Delete} alt='x' onClick={removeMessage} />
        </div>
    )
}

export default Message;