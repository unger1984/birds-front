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

	public override set music(val: boolean) {
		if (!this.storage) {
			return;
		}
		if (val !== null) this.storage.setItem(`${this.storageKey}-music`, val ? 'true' : 'false');
		else this.storage.removeItem(`${this.storageKey}-music`);
	}

	public override get music(): boolean {
		const music = this.storage && this.storage.getItem(`${this.storageKey}-music`);
		return !!(music && music === 'true');
	}

	public override set resolution(val: string | null) {
		if (!this.storage) {
			return;
		}
		if (val) this.storage.setItem(`${this.storageKey}-resolution`, val);
		else this.storage.removeItem(`${this.storageKey}-resolution`);
	}

	public override get resolution(): string {
		const music = this.storage && this.storage.getItem(`${this.storageKey}-resolution`);
		return music ?? '360p';
	}
}
