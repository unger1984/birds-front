import { UserEntity } from 'domain/entities/user.entity';

export abstract class GoogleRepository {
	public abstract getProfile(access_token: string): Promise<UserEntity | null>;
}
