import { User } from '../user.entity';

export type UserOmitPassword = Omit<User, 'password'>;
