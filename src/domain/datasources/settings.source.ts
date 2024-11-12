export abstract class SettingsSource {
	public abstract clear(): void;

	public abstract get auth(): string | null;
	public abstract set auth(value: string | null);
	public abstract get lang(): string;
	public abstract set lang(value: string);

	public abstract set music(val: boolean);
	public abstract get music(): boolean;

	public abstract set resolution(val: string | null);
	public abstract get resolution(): string;
}
