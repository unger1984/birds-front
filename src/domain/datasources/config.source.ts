export abstract class ConfigSource {
	public abstract get hlsUrl(): string;
	public abstract get wsUrl(): string;
	public abstract get googleAuthClientId(): string;
}
