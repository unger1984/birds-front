import React, { useEffect } from 'react';
import { useUnit } from 'effector-react';
import ReactHlsPlayer from 'react-hls-video-player';
import Hls from 'hls.js';
import { useScreenshot, createFileName } from 'use-react-screenshot';

import './video-page.scss';
import { Preloader } from 'presentation/components/preloader/preloader';
import { ServiceLocator } from 'factories/service.locator';
import { ChatVew } from 'presentation/pages/video/chat/chat.vew';
import { MusicEffector } from 'presentation/effectors/music.effector';
import { InputSelect } from 'presentation/components/input.select/input.select';
import { VideoEffector } from 'presentation/effectors/video.effector';

export const VideoPage: React.FC = () => {
	const hlsUrl360p = ServiceLocator.getInstance().configSource.hlsUrl360p;
	const hlsUrl480p = ServiceLocator.getInstance().configSource.hlsUrl480p;
	const hlsUrl720p = ServiceLocator.getInstance().configSource.hlsUrl720p;
	const hlsUrl1080p = ServiceLocator.getInstance().configSource.hlsUrl;

	const playerRef = React.useRef<HTMLVideoElement>(null);
	const audioRef = React.useRef<HTMLAudioElement>(null);
	const [image, takeScreenshot] = useScreenshot({ type: 'image/png', quality: 1.0 });
	const music = useUnit(MusicEffector.getInstance().$music);
	const resolution = useUnit(VideoEffector.getInstance().$resolution);

	useEffect(() => {
		playVideo();
	}, [playerRef]);

	useEffect(() => {
		playAudio();
	}, [music]);

	useEffect(() => {
		if (image) {
			const aLink = document.createElement('a');
			aLink.href = image;
			aLink.download = createFileName('png', 'screenshot');
			aLink.click();
		}
	}, [image]);

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

	const handleCreateScreenshot = () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		takeScreenshot(playerRef.current!);
	};

	let url = hlsUrl360p;
	switch (resolution) {
		case '1080p':
			url = hlsUrl1080p;
			break;
		case '720p':
			url = hlsUrl720p;
			break;
		case '480p':
			url = hlsUrl480p;
			break;
		case '360p':
		default:
			url = hlsUrl360p;
			break;
	}

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
						src={url}
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
					<InputSelect
						placeholder="Resolution"
						value={resolution}
						onChange={VideoEffector.getInstance().setResolution}
					>
						{['360p', '480p', '720p', '1080p']}
					</InputSelect>
				</div>
				<ChatVew onScreenshot={handleCreateScreenshot} />
			</div>
		</div>
	);
};
