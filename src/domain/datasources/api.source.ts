export abstract class ApiSource {
	public abstract setAuthToken(token?: string | null): void;
	public abstract get<T>(url: string, params?: any): Promise<T>;
	public abstract delete<T>(url: string): Promise<T>;
	public abstract post<T, D = any>(url: string, data?: D): Promise<T>;
	public abstract put<T = any, D = any>(url: string, data?: D): Promise<T>;
	public abstract download(url: string, method: string, data?: any): Promise<Blob>;
}
