import React from 'react';
import moment from 'moment';
import { WsDataMessage } from 'domain/dto/ws.dto';

export interface ChatMessageProps {
	message: WsDataMessage;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
	return (
		<div className="chat__message">
			{message.user?.avatar ? (
				<img className="chat__avatar" src={message.user?.avatar} />
			) : (
				<div className="chat__avatar" />
			)}
			<div className="chat__message-wrapper">
				<div className="chat__user">{message.user?.name}</div>
				<div className="chat__text">{message.text}</div>
				<div className="chat__time">{moment(message.date).fromNow()}</div>
			</div>
		</div>
	);
};
