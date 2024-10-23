import { createEffect, createStore } from 'effector';
import { ConfigSource } from 'domain/datasources/config.source';
import { ServiceLocator } from 'factories/service.locator';
import { ChatEffector } from 'presentation/effectors/chat.effector';
import { ChatMessageEntity } from 'domain/entities/chat.message.entity';
import { WsMessage } from 'domain/entities/ws.message';
// import Url from 'url-parse';
// import queryString from 'query-string';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.WebSocket = window.WebSocket || window.MozWebSocket;

export class WsEffector {
	private static instance: WsEffector;
	private readonly _configSource: ConfigSource;
	private readonly _chat: ChatEffector;

	private constructor() {
		this._configSource = ServiceLocator.getInstance().configSource;
		this._chat = ChatEffector.getInstance();
	}

	static getInstance() {
		if (!WsEffector.instance) {
			WsEffector.instance = new WsEffector();
		}
		return WsEffector.instance;
	}

	public readonly connect = createEffect<void, WebSocket | null>(async () => {
		return await new Promise(resolve => {
			this.$socket.getState()?.close();
			const uri = new URL(this._configSource.wsUrl);
			// if (uri.hostname !== window.location.hostname) {
			// 	uri.hostname = window.location.hostname;
			// }
			const socket = new WebSocket(uri.toString(), 'birds');

			socket.onopen = () => {
				// eslint-disable-next-line no-console
				console.log('ws open');
				resolve(socket);
			};

			socket.onerror = exc => {
				// eslint-disable-next-line no-console
				console.error('ws error', exc);
			};
			socket.onclose = () => {
				// eslint-disable-next-line no-console
				console.log('ws close');
				setTimeout(() => this.connect(), 1000);
			};
			socket.onmessage = messageEvent => {
				try {
					this._handleRecvMessag(JSON.parse(messageEvent.data));
				} catch (exc) {
					// eslint-disable-next-line no-console
					console.error('error message', exc);
				}
			};
		});
	});

	public readonly $loading = createStore<boolean>(true).on(this.connect.finally, () => false);

	public readonly $socket = createStore<WebSocket | null>(null).on(this.connect.doneData, (__, data) => data);

	public send(msg: WsMessage): void {
		try {
			this.$socket.getState()?.send(JSON.stringify(msg));
		} catch (exception) {
			// eslint-disable-next-line no-console
			console.error('error ws send', msg, exception);
		}
	}

	public async _handleRecvMessag(message: any): Promise<void> {
		const { command, data } = message;
		// eslint-disable-next-line no-console
		console.log('message', command, data);
		switch (command) {
			case 'message':
				this._chat.addMessage(data as ChatMessageEntity);
				break;
			case 'count':
				this._chat.setCount(data as number);
				break;
		}
	}
}
