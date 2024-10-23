import React, { useState } from 'react';

import { WsEffector } from 'presentation/effectors/ws.effector';
import { ChatMessageEntity } from 'domain/entities/chat.message.entity';
import { WsMessage } from 'domain/entities/ws.message';
import { Svg } from 'presentation/components/svg';

export const ChatForm: React.FC = () => {
	const [text, setText] = useState<string>('');

	const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setText(event.target.value);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
			handleSend();
		}
	};

	const handleSend = () => {
		if (text.trim().length > 0) {
			WsEffector.getInstance().send(new WsMessage('message', new ChatMessageEntity(text)));
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
