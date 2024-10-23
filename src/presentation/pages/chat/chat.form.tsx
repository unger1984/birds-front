import React, { useState } from 'react';

import { WsEffector } from 'presentation/effectors/ws.effector';
import { Svg } from 'presentation/components/svg';
import { WsCmd, WsDataMessage, WsDto } from 'domain/dto/ws.dto';

export const ChatForm: React.FC = () => {
	const [text, setText] = useState<string>('');

	const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setText(event.target.value);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
			setText(old => `${old}\n`);
		} else if (event.key === 'Enter') {
			event.preventDefault();
			handleSend();
		}
	};

	const handleSend = () => {
		if (text.trim().length > 0) {
			let toSend = text.trim();
			while (toSend.includes('\n\n')) {
				toSend = toSend.replaceAll('\n\n', '\n');
			}
			WsEffector.getInstance().send(new WsDto(WsCmd.message, new WsDataMessage(toSend, new Date())));
			setText('');
		}
	};

	return (
		<div className="chat__form">
			<textarea
				placeholder="Введите сообщение"
				value={text}
				onChange={handleChangeText}
				onKeyDown={handleKeyDown}
			/>
			<button type="submit" className="btn" onClick={handleSend}>
				<Svg name="send" />
			</button>
		</div>
	);
};
