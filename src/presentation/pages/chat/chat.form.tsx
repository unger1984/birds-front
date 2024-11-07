import React, { useRef } from 'react';

import { WsEffector } from 'presentation/effectors/ws.effector';
import { Svg } from 'presentation/components/svg';
import { WsCmd, WsDataMessage, WsDto } from 'domain/dto/ws.dto';
import { useUnit } from 'effector-react/effector-react.mjs';

export const ChatForm: React.FC = () => {
	const editRef = useRef<HTMLDivElement>(null);
	const user = useUnit(WsEffector.getInstance().$user);

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
			event.preventDefault();
			const brNode1 = document.createElement('br');

			const range = window.getSelection()?.getRangeAt(0);
			if (range) {
				range.deleteContents();
				range.insertNode(brNode1);
				range.insertNode(document.createElement('br'));
				range.collapse();
			} else {
				event.currentTarget.append(brNode1);
			}

			const range2 = window.getSelection()?.getRangeAt(0);
			range2?.collapse();
		} else if (event.key === 'Enter') {
			event.preventDefault();
			handleSend();
		}
	};

	const handleSend = () => {
		const text = editRef.current?.innerHTML?.replaceAll('<br>', '\n') ?? '';

		if (text.trim().length > 0) {
			let toSend = text.trim();
			while (toSend.includes('\n\n')) {
				toSend = toSend.replaceAll('\n\n', '\n');
			}
			WsEffector.getInstance().send(new WsDto(WsCmd.message, new WsDataMessage(toSend, new Date())));
			editRef.current!.innerHTML = '';
		}
	};

	return (
		<div className="chat__form">
			{user?.avatar ? <img className="chat__avatar" src={user?.avatar} /> : <></>}
			<div
				ref={editRef}
				className="textarea"
				contentEditable
				role="textbox"
				// placeholder="Введите сообщение"
				// value={text}
				onKeyDown={handleKeyDown}
			>
				<br />
			</div>
			<button type="submit" className="btn" onClick={handleSend}>
				<Svg name="send" />
			</button>
		</div>
	);
};
