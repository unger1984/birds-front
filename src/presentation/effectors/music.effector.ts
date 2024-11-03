import { createEvent, createStore } from 'effector';

export class MusicEffector {
	private static instance: MusicEffector;

	static getInstance() {
		if (!MusicEffector.instance) {
			MusicEffector.instance = new MusicEffector();
		}
		return MusicEffector.instance;
	}

	public readonly setMusic = createEvent<boolean>();

	public readonly $music = createStore<boolean>(false).on(this.setMusic, (__, data) => data);
}
