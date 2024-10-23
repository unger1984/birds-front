import { ConfigSource } from 'domain/datasources/config.source';
import { ConfigSourceWebpack } from 'data/datasources/config.source.webpack';
import { ApiSource } from 'domain/datasources/api.source';
import { ApiSourceAxios } from 'data/datasources/api.source.axios';
import { GoogleRepository } from 'domain/repositories/google.repository';
import { GoogleRepositoryImpl } from 'data/repositories/google.repository.impl';
import { SettingsSource } from 'domain/datasources/settings.source';
import { SettingsSourceLocalstorage } from 'data/datasources/settings.source.localstorage';

export class ServiceLocator {
	private static _instance: ServiceLocator;
	private readonly _configSource: ConfigSource;
	private readonly _apiSource: ApiSource;
	private readonly _settingsSource: SettingsSource;

	private readonly _googleRepository: GoogleRepository;

	private constructor() {
		this._configSource = new ConfigSourceWebpack();
		this._apiSource = new ApiSourceAxios(this.configSource);
		this._settingsSource = new SettingsSourceLocalstorage();

		this._googleRepository = new GoogleRepositoryImpl(this.apiSource);
	}

	public static getInstance(): ServiceLocator {
		if (!ServiceLocator._instance) {
			ServiceLocator._instance = new ServiceLocator();
		}
		return ServiceLocator._instance;
	}

	public get configSource(): ConfigSource {
		return this._configSource;
	}

	public get apiSource(): ApiSource {
		return this._apiSource;
	}

	public get settingsSource(): SettingsSource {
		return this._settingsSource;
	}

	public get googleRepository(): GoogleRepository {
		return this._googleRepository;
	}
}
