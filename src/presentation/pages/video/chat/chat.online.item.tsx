import React from 'react';
import { OnlineDto } from 'domain/dto/online.dto';
import moment from 'moment/moment';

export interface ChatOnlineItemProps {
	online: OnlineDto;
}

export const ChatOnlineItem: React.FC<ChatOnlineItemProps> = ({ online }) => {
	const duration = moment.duration(moment().diff(moment(online.createdAt)));
	const hours = Math.floor(duration.asHours());
	const minutes = Math.floor(duration.asMinutes() % 60);
	const seconds = Math.floor(duration.asSeconds() % 60);

	const time = `${hours > 0 ? String(hours).padStart(2, '0') + ':' : ''}${minutes > 0 ? String(minutes).padStart(2, '0') + ':' : ''}${String(seconds).padStart(2, '0')}`;

	return (
		<div className="chat__online-item">
			{online.user?.avatar ? (
				<img className="chat__online-item-avatar" src={online.user?.avatar} title={online.user?.name} />
			) : (
				<div className="chat__online-item-avatar" />
			)}
			<div className="chat__online-item-ip">
				<a href={`https://iplocation.io/ip/${online.ip}`} target="_blank" rel="noreferrer">
					{online.ip}
				</a>
			</div>
			<div className="chat__online-item-time">{time}</div>
		</div>
	);
};
