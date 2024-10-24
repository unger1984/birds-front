import React, { useEffect, useRef } from 'react';
import { useUnit } from 'effector-react';
import { useTranslation } from 'react-i18next';

import './chat.scss';
import { WsEffector } from 'presentation/effectors/ws.effector';
import { Preloader } from 'presentation/components/preloader/preloader';
import { ChatEffector } from 'presentation/effectors/chat.effector';
import { ChatMessage } from 'presentation/pages/chat/chat.message';
import { useGoogleLogin } from '@react-oauth/google';
import { ChatForm } from 'presentation/pages/chat/chat.form';
import { WsCmd, WsDataSignIn, WsDto } from 'domain/dto/ws.dto';

export const ChatVew: React.FC = () => {
	// eslint-disable-next-line id-length
	const { t } = useTranslation();
	const listRef = useRef<HTMLDivElement>(null);
	const [loadingWs, user] = useUnit([WsEffector.getInstance().$loading, WsEffector.getInstance().$user]);
	const [list, count] = useUnit([ChatEffector.getInstance().$list, ChatEffector.getInstance().$count]);

	useEffect(() => {
		listRef?.current?.scrollTo({ top: listRef?.current?.scrollHeight ?? 0 });
	}, [list]);

	const handleLogin: () => void = useGoogleLogin({
		onSuccess: async codeResponse => {
			WsEffector.getInstance().send(new WsDto(WsCmd.sign_in, new WsDataSignIn(codeResponse.access_token)));
		},
		// eslint-disable-next-line no-console
		onError: error => console.error('Login Failed:', error),
	});

	return (
		<div className="video-page__chat chat__view">
			{loadingWs ? (
				<div className="centered">
					<Preloader />
				</div>
			) : (
				<>
					<div className="chat__title">
						<div className="chat__count">
							{t('chat.online')} {count}
						</div>
					</div>
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
						<button className="btn btn--secondary chat__sign" onClick={handleLogin}>
							{t('chat.sign')}
						</button>
					)}
				</>
			)}
		</div>
	);
};
