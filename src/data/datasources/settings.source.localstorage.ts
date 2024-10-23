import { SettingsSource } from 'domain/datasources/settings.source';
import { UserEntity } from 'domain/entities/user.entity';

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

	public override get auth(): UserEntity | null {
		const authStored = this.storage && this.storage.getItem(`${this.storageKey}-auth`);
		if (authStored) {
			return JSON.parse(authStored) as UserEntity;
		}
		return null;
	}

	public override set auth(value: UserEntity | null) {
		if (!this.storage) {
			return;
		}
		if (value !== null) this.storage.setItem(`${this.storageKey}-auth`, JSON.stringify(value));
		else this.storage.removeItem(`${this.storageKey}-auth`);
	}
}
