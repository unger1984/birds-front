import React, { useEffect, useState } from 'react';
import { WsEffector } from 'presentation/effectors/ws.effector';
import { WsCmd, WsDataOnline, WsDto } from 'domain/dto/ws.dto';
import { useUnit } from 'effector-react/effector-react.mjs';
import { OnlineEffector } from 'presentation/effectors/online.effector';
import { ChatOnlineItem } from 'presentation/pages/video/chat/chat.online.item';
import { Preloader } from 'presentation/components/preloader/preloader';

export const ChatOnline: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [list] = useUnit([OnlineEffector.getInstance().$list]);

	useEffect(() => {
		setLoading(true);
		handleReload();
	}, []);

	useEffect(() => {
		if (list.length > 0) {
			setLoading(false);
		}
	}, [list]);

	const handleReload = () => {
		WsEffector.getInstance().send(new WsDto(WsCmd.online, new WsDataOnline()));
		setTimeout(() => handleReload(), 5000);
	};

	return (
		<div className="chat__online">
			{loading ? (
				<Preloader />
			) : (
				<>
					{list.map(item => (
						<ChatOnlineItem key={item.uuid} online={item} />
					))}
				</>
			)}
		</div>
	);
};
