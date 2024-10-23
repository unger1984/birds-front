import React, { useEffect } from 'react';
import ReactHlsPlayer from 'react-hls-video-player';
import Hls from 'hls.js';

import './video-page.scss';
import { Preloader } from 'presentation/components/preloader/preloader';
import { ServiceLocator } from 'factories/service.locator';
import { ChatVew } from 'presentation/pages/chat/chat.vew';

export const VideoPage: React.FC = () => {
	const playerRef = React.useRef<HTMLVideoElement>(null);
	const hlsUrl = ServiceLocator.getInstance().configSource.hlsUrl;

	useEffect(() => {
		play();
	}, [playerRef]);

	const play = () => {
		const playPromise = playerRef.current?.play();

		if (playPromise !== undefined) {
			playPromise
				.then(() => {
					// setWorking(true);
				})
				.catch(() => {
					// setWorking(false);
				});
		}
	};

	const handleDoubleClick = () => {
		playerRef.current?.requestFullscreen();
	};

	return (
		<div className="video-page">
			<h1>Онлайн трансляция</h1>
			<div className="video-page__container">
				<div className="video-page__wrapper">
					<div className="video-page__placeholder">
						<Preloader />
					</div>
					<ReactHlsPlayer
						className="video-page__player"
						playerRef={playerRef}
						onDoubleClick={handleDoubleClick}
						src={hlsUrl}
						getHLSInstance={hls => {
							hls.on(Hls.Events.BUFFER_APPENDED, () => {
								// eslint-disable-next-line no-console
								// console.log('APPENDED');
								// setWorking(true);
								// play();
								// if(playerRef.current?.played)
								// playerRef.current?.play();
							});
							hls.on(Hls.Events.ERROR, (event, data) => {
								const errorType = data.type;
								// const errorDetails = data.details;
								// const errorFatal = data.fatal;

								// eslint-disable-next-line no-console
								// console.log('EVENT', errorType);
								// fireOnVideoEnd();
								switch (errorType) {
									// case Hls.ErrorTypes.NETWORK_ERROR:
									case Hls.ErrorTypes.MEDIA_ERROR:
										// setWorking(false);
										// playerRef.current?.load();
										play();
										break;
								}
							});
						}}
						autoPlay
						muted
						width="100%"
						height="100%"
						// height="auto"
					/>
				</div>
				<ChatVew />
			</div>
		</div>
	);
};
