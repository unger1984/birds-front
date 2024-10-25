import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './app.scss';
import { VideoPage } from 'presentation/pages/video.page';
import { WsEffector } from 'presentation/effectors/ws.effector';
import { Header } from 'presentation/components/header/header';
import { Footer } from 'presentation/components/footer/footer';

export const App: React.FC = () => {
	const {
		// eslint-disable-next-line id-length
		t,
		i18n: { language },
	} = useTranslation();
	const { pathname } = useLocation();

	useEffect(() => {
		WsEffector.getInstance().connect();
	}, []);

	useEffect(() => {
		switch (pathname) {
			case '/':
				document.title = `BirdsFeeder: ${t('title.home')}`;
				break;
			case '/about':
				document.title = `BirdsFeeder: ${t('title.about')}`;
				break;
		}
	}, [pathname, language]);

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
