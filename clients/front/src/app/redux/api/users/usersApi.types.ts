interface IUser {
  user_id: number;
  login: string;
  first_name: string;
  last_name?: string;
  email?: string;
  phone?: string;
  register_date: Date;
  city?: any;
}
interface ITestUser extends IUser {
  password: string;
}

export type { IUser, ITestUser };
