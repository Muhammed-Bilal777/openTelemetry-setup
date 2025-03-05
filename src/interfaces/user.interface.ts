export interface IUser {
  username: string;
  email: string;
  password: string;
}

export interface IUserService {
  createUser(user: IUser): Promise<IUser>;
  findUserByEmail(email: string): Promise<IUser | null>;
}
