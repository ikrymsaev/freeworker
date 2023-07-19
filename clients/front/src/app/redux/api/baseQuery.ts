import { jwtService } from '@/services/index';
import { BaseQueryFn, fetchBaseQuery, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { authActions } from '../slices/auth/auth.slice';
import { TAuthTokens } from './auth/authApi.types';

const baseQuery = fetchBaseQuery({
  baseUrl: '/stand',
  credentials: 'include',
  prepareHeaders: (headers: any): any => {
    if (jwtService.hasToken()) {
      headers.set('Authorization', `Bearer ${jwtService.getToken()}`);
      headers.set('Content-Type', 'application/json');
      headers.set('Access-Control-Allow-Origin', '*');
    }

    return headers;
  },
});

const mutex = new Mutex(); // TODO Вынести в один экземпляр

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401 && jwtService.hasToken()) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const { data } = (await baseQuery('auth/refresh', api, extraOptions)) as any;

        if (data.access_token) {
          const { access_token } = data as TAuthTokens;
          jwtService.setToken(access_token);
          /** Заново делаем запрос. */
          result = await baseQuery(args, api, extraOptions);
        } else {
          /** Если рефреш неудачный, разлогинимся на сервере NEXT. И диспатчим логаут в стор. */
          await baseQuery('auth/logout', api, extraOptions);
          api.dispatch(authActions.logout());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export { baseQuery, baseQueryWithReauth };
