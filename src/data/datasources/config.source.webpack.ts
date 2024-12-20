import { ConfigSource } from 'domain/datasources/config.source';

declare const __VERSION__: string;
declare const __URL_WS__: string;
declare const __URL_HLS__: string;
declare const __URL_HLS_360P__: string;
declare const __URL_HLS_480P__: string;
declare const __URL_HLS_720P__: string;
declare const __GOOGLE_AUTH_CLIENT_ID__: string;
declare const __YANDEX_AUTH_CLIENT_ID__: string;

export class ConfigSourceWebpack extends ConfigSource {
	private readonly _hlsUrl: string;
	private readonly _hlsUrl360p: string;
	private readonly _hlsUrl480p: string;
	private readonly _hlsUrl720p: string;
	private readonly _wsUrl: string;
	private readonly _googleAuthClientId: string;
	private readonly _yandexAuthClientId: string;
	private readonly _version: string;

	constructor() {
		super();
		this._hlsUrl = __URL_HLS__;
		this._hlsUrl360p = __URL_HLS_360P__;
		this._hlsUrl480p = __URL_HLS_480P__;
		this._hlsUrl720p = __URL_HLS_720P__;
		this._wsUrl = __URL_WS__;
		this._googleAuthClientId = __GOOGLE_AUTH_CLIENT_ID__;
		this._yandexAuthClientId = __YANDEX_AUTH_CLIENT_ID__;
		this._version = __VERSION__;
	}

	public override get wsUrl(): string {
		return this._wsUrl;
	}

	public override get hlsUrl(): string {
		return this._hlsUrl;
	}

	public override get googleAuthClientId(): string {
		return this._googleAuthClientId;
	}

	public override get yandexAuthClientId(): string {
		return this._yandexAuthClientId;
	}

	public override get version(): string {
		return this._version;
	}

	public get hlsUrl360p(): string {
		return this._hlsUrl360p;
	}

	public get hlsUrl480p(): string {
		return this._hlsUrl480p;
	}

	public get hlsUrl720p(): string {
		return this._hlsUrl720p;
	}
}
