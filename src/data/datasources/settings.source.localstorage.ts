import { SettingsSource } from 'domain/datasources/settings.source';

export class SettingsSourceLocalstorage extends SettingsSource {
	private readonly storageKey = 'birds';
	private readonly storage: Storage | null;

	constructor() {
		super();
		this.storage = this.__supportsHtml5Storage() ? window.localStorage : null;
	}

	private __supportsHtml5Storage(): boolean {
		try {
			return 'localStorage' in window && window.localStorage !== null;
		} catch (__) {
			return false;
		}
	}

	public override clear(): void {
		if (this.storage) {
			this.storage.clear();
		}
	}

	public override get auth(): string | null {
		const authStored = this.storage && this.storage.getItem(`${this.storageKey}-auth`);
		if (authStored) {
			return JSON.parse(authStored) as string;
		}
		return null;
	}

	public override set auth(value: string | null) {
		if (!this.storage) {
			return;
		}
		if (value !== null) this.storage.setItem(`${this.storageKey}-auth`, JSON.stringify(value));
		else this.storage.removeItem(`${this.storageKey}-auth`);
	}

	public override get lang(): string {
		let locale = this.storage && this.storage.getItem(`${this.storageKey}-locale`);
		if (locale) {
			return locale;
		}
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		locale = window.navigator.userLanguage || window.navigator.language;
		return locale!;
	}

	public override set lang(value: string) {
		if (!this.storage) {
			return;
		}
		if (value !== null) this.storage.setItem(`${this.storageKey}-locale`, value);
		else this.storage.removeItem(`${this.storageKey}-locale`);
	}
}
