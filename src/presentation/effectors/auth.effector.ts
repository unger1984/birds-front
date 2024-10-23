import { SettingsSource } from 'domain/datasources/settings.source';
import { GoogleRepository } from 'domain/repositories/google.repository';
import { ServiceLocator } from 'factories/service.locator';
import { UserEntity } from 'domain/entities/user.entity';
import { createEffect, createStore } from 'effector';

export class AuthEffector {
	private static instance: AuthEffector;
	private readonly _settingsSource: SettingsSource;
	private readonly _googleRepository: GoogleRepository;

	private constructor() {
		this._googleRepository = ServiceLocator.getInstance().googleRepository;
		this._settingsSource = ServiceLocator.getInstance().settingsSource;
	}

	static getInstance() {
		if (!AuthEffector.instance) {
			AuthEffector.instance = new AuthEffector();
		}
		return AuthEffector.instance;
	}

	public readonly load = createEffect<void, UserEntity | null>(async () => {
		return this._settingsSource.auth;
	});

	public readonly sign = createEffect<string, UserEntity | null>(async access_token => {
		const auth = await this._googleRepository.getProfile(access_token);
		if (auth) {
			this._settingsSource.auth = auth;
		}
		return auth;
	});

	public readonly $auth = createStore<UserEntity | null>(null)
		.on(this.load.doneData, (__, data) => data)
		.on(this.sign.doneData, (__, data) => data);

	public readonly $loading = createStore<boolean>(true)
		.on(this.load.finally, () => false)
		.on(this.sign.doneData, () => false);
}
