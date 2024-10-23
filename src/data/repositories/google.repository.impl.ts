import { GoogleRepository } from 'domain/repositories/google.repository';
import { ApiSource } from 'domain/datasources/api.source';
import { ApiErrorEntity } from 'domain/entities/api.error.entity';
import { UserEntity } from 'domain/entities/user.entity';

export class GoogleRepositoryImpl extends GoogleRepository {
	private readonly _api: ApiSource;

	constructor(api: ApiSource) {
		super();
		this._api = api;
	}

	public override async getProfile(access_token: string): Promise<UserEntity | null> {
		try {
			return await this._api.get<UserEntity>(
				`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
			);
		} catch (exc) {
			if (exc instanceof ApiErrorEntity) {
				// eslint-disable-next-line no-console
				console.error('ApiError', exc.statusCode, exc.data);
			} else {
				// eslint-disable-next-line no-console
				console.error(exc);
			}

			return null;
		}
	}
}
