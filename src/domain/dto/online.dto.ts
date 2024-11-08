import { UserDto } from './user.dto';

export class OnlineDto {
	uuid?: string;
	ip?: string;
	user?: UserDto | null;
	createdAt?: Date;
}
