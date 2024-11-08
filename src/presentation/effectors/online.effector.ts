import { createEvent, createStore } from 'effector';
import { OnlineDto } from 'domain/dto/online.dto';

export class OnlineEffector {
	private static instance: OnlineEffector;

	static getInstance() {
		if (!OnlineEffector.instance) {
			OnlineEffector.instance = new OnlineEffector();
		}
		return OnlineEffector.instance;
	}

	public readonly updateList = createEvent<OnlineDto[]>();

	public readonly $list = createStore<OnlineDto[]>([]).on(this.updateList, (__, list) => list);
}
