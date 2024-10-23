import { createEffect, createEvent, createStore } from 'effector';
import { ConfigSource } from 'domain/datasources/config.source';
import { ServiceLocator } from 'factories/service.locator';
import { ChatEffector } from 'presentation/effectors/chat.effector';
import { WsCmd, WsDataAuth, WsDataCount, WsDataMessage, WsDto } from 'domain/dto/ws.dto';
import { UserDto } from 'domain/dto/user.dto';
import { SettingsSource } from 'domain/datasources/settings.source';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.WebSocket = window.WebSocket || window.MozWebSocket;

export class WsEffector {
	private static instance: WsEffector;
	private readonly _configSource: ConfigSource;
	private readonly _settingsSource: SettingsSource;
	private readonly _chat: ChatEffector;

	private constructor() {
		this._configSource = ServiceLocator.getInstance().configSource;
		this._settingsSource = ServiceLocator.getInstance().settingsSource;
		this._chat = ChatEffector.getInstance();

		this.connect.doneData.watch(() => {
			const token = this._settingsSource.auth;
			if (token) {
				this.send(new WsDto(WsCmd.auth, new WsDataAuth(token)));
			}
		});
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
					// eslint-disable-next-line no-console
					console.log(JSON.parse(messageEvent.data));
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

	public readonly setUser = createEvent<UserDto | null | undefined>();
	public readonly $user = createStore<UserDto | null | undefined>(null).on(this.setUser, (__, user) => user);

	public send(msg: WsDto): void {
		try {
			this.$socket.getState()?.send(JSON.stringify(msg));
		} catch (exception) {
			// eslint-disable-next-line no-console
			console.error('error ws send', msg, exception);
		}
	}

	public async _handleRecvMessag(message: WsDto): Promise<void> {
		const { cmd, data } = message;
		switch (cmd) {
			case WsCmd.auth:
				{
					const { user, token } = data as WsDataAuth;
					if (user) {
						this._settingsSource.auth = token;
						this.setUser(user);
					} else {
						this._settingsSource.auth = null;
						this.setUser(null);
					}
				}
				break;
			case WsCmd.message:
				this._chat.addMessage(data as WsDataMessage);
				break;
			case WsCmd.count:
				this._chat.setCount((data as WsDataCount).total);
				break;
		}
	}
}
