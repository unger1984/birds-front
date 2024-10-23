import { createEvent, createStore } from 'effector';
import { ChatMessageEntity } from 'domain/entities/chat.message.entity';

export class ChatEffector {
	private static instance: ChatEffector;

	static getInstance() {
		if (!ChatEffector.instance) {
			ChatEffector.instance = new ChatEffector();
		}
		return ChatEffector.instance;
	}

	public readonly addMessage = createEvent<ChatMessageEntity>();

	public readonly $list = createStore<ChatMessageEntity[]>([]).on(this.addMessage, (old, message) => [
		...old,
		message,
	]);

	public readonly setCount = createEvent<number>();

	public readonly $count = createStore<number>(0).on(this.setCount, (__, count) => count);
}
