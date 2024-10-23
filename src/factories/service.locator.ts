import { ConfigSource } from 'domain/datasources/config.source';
import { ConfigSourceWebpack } from 'data/datasources/config.source.webpack';
import { SettingsSource } from 'domain/datasources/settings.source';
import { SettingsSourceLocalstorage } from 'data/datasources/settings.source.localstorage';

export class ServiceLocator {
	private static _instance: ServiceLocator;
	private readonly _configSource: ConfigSource;
	private readonly _settingsSource: SettingsSource;

	private constructor() {
		this._configSource = new ConfigSourceWebpack();
		this._settingsSource = new SettingsSourceLocalstorage();
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

	public get settingsSource(): SettingsSource {
		return this._settingsSource;
	}
}
