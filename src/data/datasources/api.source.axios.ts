import { ConfigSource } from 'domain/datasources/config.source';
import axios, { AxiosResponse } from 'axios';
import { stringify } from 'qs';
import { ApiErrorEntity } from 'domain/entities/api.error.entity';
import { ApiSource } from 'domain/datasources/api.source';

export class ApiSourceAxios implements ApiSource {
	private readonly config: ConfigSource;

	constructor(config: ConfigSource) {
		this.config = config;
		axios.defaults.paramsSerializer = (params: any): string => stringify(params, { encode: false });
	}

	private sendData = <T>(res: AxiosResponse<T>): T => res.data;

	public setAuthToken(token?: string | null): void {
		if (token) axios.defaults.headers.common.Authorization = `Bearer ${token}`;
		else delete axios.defaults.headers.common.Authorization;
	}

	public get<T>(url: string, params?: any): Promise<T> {
		return axios
			.get<T>(url, params)
			.catch(err => {
				if (err.response) {
					throw new ApiErrorEntity(err.response.status, err.response.data);
				}
				throw err;
			})
			.then(res => this.sendData<T>(res));
	}

	public delete<T>(url: string): Promise<T> {
		return axios
			.delete<T>(url)
			.catch(err => {
				if (err.response) {
					throw new ApiErrorEntity(err.response.status, err.response.data);
				}
				throw err;
			})
			.then(res => this.sendData<T>(res));
	}

	public download(url: string, method: string, data?: any): Promise<Blob> {
		return axios({ url: url, data: data, method: method, responseType: 'blob' })
			.catch(err => {
				if (err.response) {
					throw new ApiErrorEntity(err.response.status, err.response.data);
				}
				throw err;
			})
			.then(res => res.data);
	}

	public post<T, D = any>(url: string, data?: D): Promise<T> {
		return axios
			.post<T>(url, data)
			.catch(err => {
				if (err.response) {
					throw new ApiErrorEntity(err.response.status, err.response.data);
				}
				throw err;
			})
			.then(res => this.sendData<T>(res));
	}

	public put<T, D = any>(url: string, data?: D): Promise<T> {
		return axios
			.put<T>(url, data)
			.catch(err => {
				if (err.response) {
					throw new ApiErrorEntity(err.response.status, err.response.data);
				}
				throw err;
			})
			.then(res => this.sendData<T>(res));
	}
}
