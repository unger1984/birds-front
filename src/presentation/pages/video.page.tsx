import React, { useEffect } from 'react';
import { useUnit } from 'effector-react';
import ReactHlsPlayer from 'react-hls-video-player';
import Hls from 'hls.js';

import './video-page.scss';
import { Preloader } from 'presentation/components/preloader/preloader';
import { ServiceLocator } from 'factories/service.locator';
import { ChatVew } from 'presentation/pages/chat/chat.vew';
import { MusicEffector } from 'presentation/effectors/music.effector';

export const VideoPage: React.FC = () => {
	const playerRef = React.useRef<HTMLVideoElement>(null);
	const audioRef = React.useRef<HTMLAudioElement>(null);
	const hlsUrl = ServiceLocator.getInstance().configSource.hlsUrl;
	const music = useUnit(MusicEffector.getInstance().$music);

	useEffect(() => {
		playVideo();
	}, [playerRef]);

	useEffect(() => {
		playAudio();
	}, [music]);

	const playVideo = () => {
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

	const playAudio = () => {
		if (music) {
			audioRef.current?.play();
		} else {
			audioRef.current?.pause();
		}
	};

	const handleDoubleClick = () => {
		playerRef.current?.requestFullscreen();
	};

	return (
		<div className="video-page">
			<div className="video-page__container">
				<div className="video-page__wrapper">
					<div className="video-page__placeholder">
						<Preloader />
					</div>
					<audio ref={audioRef} className="playback" src="/birds.mp3" loop={true}>
						test
					</audio>
					<ReactHlsPlayer
						className="video-page__player"
						playerRef={playerRef}
						onDoubleClick={handleDoubleClick}
						src={hlsUrl}
						getHLSInstance={hls => {
							hls.on(Hls.Events.BUFFER_APPENDED, () => {});
							hls.on(Hls.Events.ERROR, (event, data) => {
								const errorType = data.type;

								switch (errorType) {
									case Hls.ErrorTypes.MEDIA_ERROR:
										playVideo();
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
