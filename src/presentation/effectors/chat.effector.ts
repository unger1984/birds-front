import { createEffect, createEvent, createStore } from 'effector';
import { WsCmd, WsDataMessage, WsDataReloadChat, WsDto } from 'domain/dto/ws.dto';
import { WsEffector } from 'presentation/effectors/ws.effector';

export class ChatEffector {
	private static instance: ChatEffector;

	static getInstance() {
		if (!ChatEffector.instance) {
			ChatEffector.instance = new ChatEffector();
		}
		return ChatEffector.instance;
	}

	public readonly addMessage = createEvent<WsDataMessage>();
	public readonly clear = createEvent();

	public readonly reload = createEffect<void, void>(() => {
		WsEffector.getInstance().send(new WsDto(WsCmd.reload_chat, new WsDataReloadChat()));
	});

	public readonly $list = createStore<WsDataMessage[]>([])
		.on(this.addMessage, (old, message) => [...old, message])
		.on(this.clear, () => [])
		.on(this.reload, () => []);

	public readonly setCount = createEvent<number>();

	public readonly $count = createStore<number>(0, {
		updateFilter: (update: number, current: number) => update != current,
	}).on(this.setCount, (__, count) => count);
}
