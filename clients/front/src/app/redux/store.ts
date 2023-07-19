import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authApi from './api/auth/authApi';
import categoryApi from './api/categories/categoriesApi';
import citiesApi from './api/cities/citiesApi';
import servicesApi from './api/services/servicesApi';
import usersApi from './api/users/usersApi';
import rootReducer from './reducers';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(categoryApi.middleware)
      .concat(usersApi.middleware)
      .concat(citiesApi.middleware)
      .concat(servicesApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

/** Тип для диспатча. */
export type AppDispatch = typeof store.dispatch;
