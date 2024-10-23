import React, { useEffect, useRef, useState } from 'react';
import { useUnit } from 'effector-react';

import './chat.scss';
import { WsEffector } from 'presentation/effectors/ws.effector';
import { Preloader } from 'presentation/components/preloader/preloader';
import { ChatEffector } from 'presentation/effectors/chat.effector';
import { ChatMessage } from 'presentation/pages/chat/chat.message';
import { useGoogleLogin } from '@react-oauth/google';
import { AuthEffector } from 'presentation/effectors/auth.effector';
import { ChatForm } from 'presentation/pages/chat/chat.form';

export const ChatVew: React.FC = () => {
	const listRef = useRef<HTMLDivElement>(null);
	const loadingWs = useUnit(WsEffector.getInstance().$loading);
	const auth = useUnit(AuthEffector.getInstance().$auth);
	const [list, count] = useUnit([ChatEffector.getInstance().$list, ChatEffector.getInstance().$count]);

	useEffect(() => {
		listRef?.current?.scrollTo({ top: listRef?.current?.scrollHeight ?? 0 });
	}, [list]);

	const handleLogin: () => void = useGoogleLogin({
		onSuccess: async codeResponse => {
			AuthEffector.getInstance().sign(codeResponse.access_token);
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
					<div className="chat__count">Сейчас смотрят {count}</div>
					<div className="chat__messages" ref={listRef}>
						{list.map((itm, index) => (
							<ChatMessage key={index} message={itm} />
						))}
					</div>
					{auth ? <ChatForm /> : <button onClick={handleLogin}>Sign in with Google 🚀</button>}
				</>
			)}
		</div>
	);
};
