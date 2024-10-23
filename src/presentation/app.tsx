import React, { useEffect } from 'react';
import { useUnit } from 'effector-react';

import { VideoPage } from 'presentation/pages/video.page';
import { WsEffector } from 'presentation/effectors/ws.effector';
import { AuthEffector } from 'presentation/effectors/auth.effector';
import { WsMessage } from 'domain/entities/ws.message';

export const App: React.FC = () => {
	const [ws, auth] = useUnit([WsEffector.getInstance().$socket, AuthEffector.getInstance().$auth]);

	useEffect(() => {
		WsEffector.getInstance().connect();
		AuthEffector.getInstance().load();
	}, []);

	useEffect(() => {
		// eslint-disable-next-line no-console
		console.log('ws_auth', auth, ws);
		if (ws && auth) {
			WsEffector.getInstance().send(new WsMessage('sign', auth));
		}
	}, [ws, auth]);

	return <VideoPage />;
};
