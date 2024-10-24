import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { VideoPage } from 'presentation/pages/video.page';
import { WsEffector } from 'presentation/effectors/ws.effector';
import { Header } from 'presentation/components/header/header';

export const App: React.FC = () => {
	useEffect(() => {
		WsEffector.getInstance().connect();
	}, []);

	return (
		<>
			<Header />
			<Routes>
				<Route exact={true} path="/" element={<VideoPage />} />
				<Route path="/about" element={<h1>Under construction</h1>} />
			</Routes>
		</>
	);
};
