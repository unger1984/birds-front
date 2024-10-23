export abstract class SettingsSource {
	public abstract clear(): void;

	public abstract get auth(): string | null;
	public abstract set auth(value: string | null);
}
