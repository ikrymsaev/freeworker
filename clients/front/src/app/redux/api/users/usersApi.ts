import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../baseQuery';
import { ITestUser, IUser } from './usersApi.types';

const usersApi = createApi({
  reducerPath: 'usersApi',
  tagTypes: ['Users', 'CurrentUser', 'TestUsers'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    /** Получить все услуги */
    usersList: builder.query<IUser[], void>({
      query: () => `user`,
      providesTags: () => ['Users'],
    }),
    /** Получить все услуги */
    testUsers: builder.query<ITestUser[], void>({
      query: () => `user/test_users`,
      providesTags: () => ['TestUsers'],
    }),
    /** Получить услугу по id */
    userById: builder.query<IUser, number>({
      query: (user_id: IUser['user_id']) => `user/user_id/${user_id}`,
      providesTags: () => ['Users'],
    }),
    /** Получить услугу по id */
    currentUser: builder.query<IUser | null, void>({
      query: () => `user/current`,
      providesTags: () => ['CurrentUser'],
    }),
  }),
});

export default usersApi;
export const { useCurrentUserQuery, useUsersListQuery, useUserByIdQuery, useTestUsersQuery } = usersApi;
