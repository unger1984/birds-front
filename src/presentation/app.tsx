import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import './app.scss';
import { VideoPage } from 'presentation/pages/video.page';
import { WsEffector } from 'presentation/effectors/ws.effector';
import { Header } from 'presentation/components/header/header';
import { Footer } from 'presentation/components/footer/footer';

export const App: React.FC = () => {
	useEffect(() => {
		WsEffector.getInstance().connect();
	}, []);

	return (
		<div className="app">
			<Header />
			<div className="main">
				<Routes>
					<Route path="/" element={<VideoPage />} />
					<Route path="/about" element={<h1>Under construction</h1>} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
};
