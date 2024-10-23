import { createEvent, createStore } from 'effector';
import { WsDataMessage } from 'domain/dto/ws.dto';

export class ChatEffector {
	private static instance: ChatEffector;

	static getInstance() {
		if (!ChatEffector.instance) {
			ChatEffector.instance = new ChatEffector();
		}
		return ChatEffector.instance;
	}

	public readonly addMessage = createEvent<WsDataMessage>();

	public readonly $list = createStore<WsDataMessage[]>([]).on(this.addMessage, (old, message) => [...old, message]);

	public readonly setCount = createEvent<number>();

	public readonly $count = createStore<number>(0, {
		updateFilter: (update: number, current: number) => update != current,
	}).on(this.setCount, (__, count) => count);
}
