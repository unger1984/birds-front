import { UserEntity } from 'domain/entities/user.entity';

export abstract class SettingsSource {
	public abstract clear(): void;

	public abstract get auth(): UserEntity | null;
	public abstract set auth(value: UserEntity | null);
}
