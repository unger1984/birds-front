import { createEvent, createStore } from 'effector';
import { SettingsSource } from 'domain/datasources/settings.source';
import { ServiceLocator } from 'factories/service.locator';

export class VideoEffector {
	private static instance: VideoEffector;
	private readonly _settingsSource: SettingsSource = ServiceLocator.getInstance().settingsSource;

	private constructor() {
		this.$resolution.map(state => (this._settingsSource.resolution = state));
	}

	static getInstance() {
		if (!VideoEffector.instance) {
			VideoEffector.instance = new VideoEffector();
		}
		return VideoEffector.instance;
	}

	public readonly setResolution = createEvent<string>();

	public readonly $resolution = createStore<string>(this._settingsSource.resolution).on(
		this.setResolution,
		(__, data) => data,
	);
}
