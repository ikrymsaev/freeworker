import { IUser } from '../users/usersApi.types';

interface ILoginUserDto {
  login: string;
  password: string;
}

interface IRegisterUserDto {
  login: string;
  password: string;
  first_name: string;
  city_id: number;
  email?: string;
  phone?: string;
  last_name?: string;
}

interface IRegisterResponse {
  user: IUser;
  access_token: string;
}

type ILoginResponse = IRegisterResponse;

type TAuthTokens = {
  access_token: string;
};

interface RequestError {
  status: number;
  data: {
    error: string;
    message?: string;
  };
}

export type { ILoginUserDto, IRegisterUserDto, IRegisterResponse, ILoginResponse, TAuthTokens, RequestError };
