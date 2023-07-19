import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../baseQuery';
import { ILoginResponse, ILoginUserDto, IRegisterResponse, IRegisterUserDto, TAuthTokens } from './authApi.types';

const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['Tokens', 'CurrentUser'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    /** Зарегистрироваться. */
    register: builder.mutation<IRegisterResponse, IRegisterUserDto>({
      query: (dto) => ({ url: 'auth/register', method: 'POST', body: dto }),
      invalidatesTags: () => ['CurrentUser'],
    }),
    /** Авторизоваться */
    login: builder.mutation<ILoginResponse, ILoginUserDto>({
      query: (dto) => ({ url: 'auth/login', method: 'POST', body: dto }),
      invalidatesTags: () => ['CurrentUser'],
    }),
    /** Разлогиниться */
    logout: builder.mutation<boolean, void>({
      query: () => ({ url: 'auth/logout', method: 'POST' }),
      invalidatesTags: () => ['CurrentUser'],
    }),
    /** Обновить токен */
    refreshToken: builder.query<TAuthTokens, void>({
      query: () => 'auth/refresh',
      providesTags: () => ['CurrentUser'],
    }),
  }),
});

export default authApi;
export const { useRegisterMutation, useLoginMutation, useRefreshTokenQuery, useLogoutMutation } = authApi;
