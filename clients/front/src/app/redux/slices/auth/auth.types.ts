import { IUser } from '../../api/users/usersApi.types';

/** Модель состояния стора главной страницы. */
interface IAuthState {
  isLogged: boolean;
  currentUser: IUser | null;
}

type TLoginPayload = {
  access_token: string;
  user: IUser;
};

export type { IAuthState, TLoginPayload };
