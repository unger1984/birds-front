import React from 'react';
import { ChatMessageEntity } from 'domain/entities/chat.message.entity';
import moment from 'moment';

export interface ChatMessageProps {
	message: ChatMessageEntity;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
	return (
		<div className="chat__message">
			{message.user?.picture ? (
				<img className="chat__avatar" src={message.user?.picture} />
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
