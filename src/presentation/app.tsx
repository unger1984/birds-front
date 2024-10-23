import React, { useEffect } from 'react';

import { VideoPage } from 'presentation/pages/video.page';
import { WsEffector } from 'presentation/effectors/ws.effector';

export const App: React.FC = () => {
	useEffect(() => {
		WsEffector.getInstance().connect();
	}, []);

	return <VideoPage />;
};
