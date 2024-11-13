import React, { useEffect, useRef, useState } from 'react';
import { useUnit } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { useGoogleLogin } from '@react-oauth/google';

import './chat.scss';
import google from './google.png';
import yandex from './yandex.png';
import { WsEffector } from 'presentation/effectors/ws.effector';
import { Preloader } from 'presentation/components/preloader/preloader';
import { ChatEffector } from 'presentation/effectors/chat.effector';
import { ChatMessage } from 'presentation/pages/video/chat/chat.message';
import { ChatForm } from 'presentation/pages/video/chat/chat.form';
import { WsCmd, WsDataSignIn, WsDto, WsSignType } from 'domain/dto/ws.dto';
import { Svg } from 'presentation/components/svg';
import { MusicEffector } from 'presentation/effectors/music.effector';
import { ChatOnline } from 'presentation/pages/video/chat/chat.online';
import { ServiceLocator } from 'factories/service.locator';
import { useLocation } from 'react-router-dom';

export interface ChatVewProps {
	onScreenshot: () => void;
}

export const ChatVew: React.FC<ChatVewProps> = ({ onScreenshot }) => {
	// eslint-disable-next-line id-length
	const { t } = useTranslation();
	const [clickCount, setClickCount] = useState<number>(0);
	const [isOnline, setOnline] = useState<boolean>(false);
	const listRef = useRef<HTMLDivElement>(null);
	const [loadingWs, user] = useUnit([WsEffector.getInstance().$loading, WsEffector.getInstance().$user]);
	const [list, count] = useUnit([ChatEffector.getInstance().$list, ChatEffector.getInstance().$count]);
	const music = useUnit(MusicEffector.getInstance().$music);
	const { hash } = useLocation();

	useEffect(() => {
		listRef?.current?.scrollTo({ top: listRef?.current?.scrollHeight ?? 0 });
	}, [list]);

	useEffect(() => {
		if (clickCount >= 5) {
			setOnline(old => !old);
		}
	}, [clickCount]);

	useEffect(() => {
		if (!loadingWs) {
			// eslint-disable-next-line no-useless-escape
			const regex = new RegExp(/^#access_token=(.*)\&token_type/i);

			if (regex.test(hash)) {
				const match = hash.match(regex) ?? [];
				const access_token = match.length > 1 ? match[1] : '';
				WsEffector.getInstance().send(
					new WsDto(WsCmd.sign_in, new WsDataSignIn(access_token, WsSignType.yandex)),
				);
				// self.location.assign('/');
			}
		}
	}, [hash, loadingWs]);

	const handleLoginGoogle: () => void = useGoogleLogin({
		onSuccess: async codeResponse => {
			WsEffector.getInstance().send(new WsDto(WsCmd.sign_in, new WsDataSignIn(codeResponse.access_token)));
		},
		// eslint-disable-next-line no-console
		onError: error => console.error('Login Failed:', error),
	});

	const handleLoginYandex = () => {
		self.location.assign(
			`https://oauth.yandex.ru/authorize?response_type=token&client_id=${ServiceLocator.getInstance().configSource.yandexAuthClientId}`,
		);
	};

	const handleChangeMusic = () => {
		MusicEffector.getInstance().setMusic(!music);
	};

	const handleClickOnline = () => {
		setClickCount(old => (old >= 5 ? 0 : old + 1));
	};

	return (
		<div className="video-page__chat chat__view">
			{loadingWs ? (
				<div className="centered">
					<Preloader />
				</div>
			) : (
				<>
					<div className="chat__title">
						<div className="chat__count" onClick={handleClickOnline}>
							{t('chat.online')} {count}
						</div>
						<button className="btn" onClick={onScreenshot}>
							<Svg name="camera" />
						</button>
						<button className="btn" onClick={handleChangeMusic}>
							<Svg name={`music_${music ? 'on' : 'off'}`} />
						</button>
					</div>
					{isOnline && <ChatOnline />}
					<div className="chat__messages" ref={listRef}>
						{list.map((itm, index) => (
							<ChatMessage key={index} message={itm} />
						))}
					</div>
					<a
						href="https://www.tbank.ru/cf/5mfwO0VNFF9"
						target="_blank"
						className="btn btn--primery"
						rel="noreferrer"
					>
						{t('chat.donate')}
					</a>
					{user ? (
						<ChatForm />
					) : (
						<div className="chat__sign">
							<div className="chat__sign--title">{t('chat.sign')}</div>
							<button className="btn" onClick={handleLoginGoogle}>
								<img src={google} alt="google" />
							</button>
							<button className="btn" onClick={handleLoginYandex}>
								<img src={yandex} alt="yandex" />
							</button>
						</div>
					)}
				</>
			)}
		</div>
	);
};
