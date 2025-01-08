import React from 'react';
import { MessageProps } from '../@types/componentsType';

const Message: React.FC<MessageProps> = ({ text, type }) => {
    switch (type) {
        case 'error':
            return <div className='msg-error'>{text}</div>;
        case 'warning':
            return <div className='msg-warning'>{text}</div>;
        case 'information':
            return <div className='msg-information'>{text}</div>;
        default:
            return <div>{text}</div>;
    }
};

export default Message;